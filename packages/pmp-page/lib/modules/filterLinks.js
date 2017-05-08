import _ from 'lodash';

export default function filterLinks(args, done = _.noop) {
	const { links } = args;

	const exts = ['jpg', 'jpeg', 'png'];

	done(null, {
		links: _.filter(links, link => {
			return _.isString(link) && _.some(exts, ext => link.indexOf('.' + ext) > 0);
		})
	});
}
