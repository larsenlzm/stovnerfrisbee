import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const STATIC_DIR = new URL('../static/', import.meta.url).pathname;

const HERO_IMAGES = new Set([
	'bane.jpg',
	'rocker.jpg',
	'sponsor.jpg',
	'wulf.jpg',
	'homepagebanner.jpg',
	'ncmaster.jpg',
]);

const AVATAR_IMAGES = new Set([
	'Mundo.jpg',
	'Sebbe.jpg',
	'riky.jpg',
	'jesman.jpg',
	'mansverk.jpg',
	'meg.jpg',
	'stovnerlogo.jpg',
]);

async function formatBytes(bytes) {
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function compressImage(filename) {
	const filePath = join(STATIC_DIR, filename);
	const before = (await stat(filePath)).size;

	const isAvatar = AVATAR_IMAGES.has(filename);
	const isHero = HERO_IMAGES.has(filename);

	if (!isAvatar && !isHero) {
		console.log(`  skip  ${filename} (not in target list)`);
		return;
	}

	const tmpPath = filePath + '.tmp';

	if (isAvatar) {
		await sharp(filePath)
			.resize(400, 400, { fit: 'inside', withoutEnlargement: true })
			.jpeg({ quality: 85, mozjpeg: true })
			.toFile(tmpPath);
	} else {
		await sharp(filePath)
			.resize(1920, null, { fit: 'inside', withoutEnlargement: true })
			.jpeg({ quality: 82, mozjpeg: true })
			.toFile(tmpPath);
	}

	const after = (await stat(tmpPath)).size;

	const { rename } = await import('fs/promises');
	await rename(tmpPath, filePath);

	const saved = ((before - after) / before * 100).toFixed(0);
	console.log(`  ✓  ${filename}: ${await formatBytes(before)} → ${await formatBytes(after)} (−${saved}%)`);
}

async function main() {
	const files = await readdir(STATIC_DIR);
	const jpgs = files.filter(f => extname(f).toLowerCase() === '.jpg');

	console.log(`Compressing images in ${STATIC_DIR}\n`);

	for (const file of jpgs) {
		await compressImage(file);
	}

	console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
