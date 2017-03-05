import url from 'url';
import path from 'path';
import crypto from 'crypto';

export default function generateFilename(args, done) {
	const { sourceId, url: imageUrl } = args;

	const parsed = url.parse(imageUrl);

	const filename = sourceId + '_' + path.basename(parsed.pathname);

	const encrypted_filename = crypto
	.createHash('md5')
	.update(filename)
	.digest('hex');

	done(null, {
		filename: encrypted_filename + path.extname(parsed.pathname)
	});
}
