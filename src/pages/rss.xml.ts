import rss from '@astrojs/rss';
import type { AstroConfig } from 'astro';
import { getCollection } from 'astro:content';
import sanitize from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export async function get(context: AstroConfig) {
	const blog = await getCollection('blog');

	return rss({
		title: 'The Sndwch Blog',
		description: 'All Sandwiches, All the Time',
		site: context.site!,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			link: `/blog/${post.slug}`,
			content: sanitize(md.render(post.body)),
		})),
	});
}
