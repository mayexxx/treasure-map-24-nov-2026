import { chmod, copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryDir = dirname(fileURLToPath(import.meta.url));
const source = join(repositoryDir, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const destination = join(outputDir, 'entry.png');

await mkdir(outputDir, { recursive: true });
const sourceInfo = await stat(source);
await copyFile(source, destination);
await chmod(destination, 0o644);
const outputInfo = await stat(destination);
if (outputInfo.size === 0) throw new Error('Copied entry.png is empty');
if (outputInfo.size !== sourceInfo.size) throw new Error('Copied entry.png size differs from the source');
if (outputInfo.size > 1048576) throw new Error('Copied entry.png exceeds the 1048576-byte limit');
