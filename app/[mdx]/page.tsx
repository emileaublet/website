import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export default async function Page({
  params: {mdx}
}: {params: {mdx: string}}) {
  const filePath = path.join(process.cwd(), 'content', `${mdx}.mdx`);

  let source;
    try {
      source = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      return notFound()
    }

  return <MDXRemote source={source} />;
};
