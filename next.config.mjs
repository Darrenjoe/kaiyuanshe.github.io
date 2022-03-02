import withLess from 'next-with-less';
import NextMDX from '@next/mdx';
import RemarkGFM from 'remark-gfm';
import RemarkFrontMatter from 'remark-frontmatter';

const withMDX = NextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [RemarkGFM, RemarkFrontMatter],
  },
});

/** @type {import('next').NextConfig} */
export default withMDX({
  ...withLess({ reactStrictMode: true }),
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
