import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIDs, getPostByID } from '@/lib/posts.utils';
import DateTime from '@/components/DateTime';

export default function Post({
  post,
}: {
  post: {
    id: string;
    title: string;
    date: string;
    content: string;
  };
}) {
  // Set class of ul, cuz tailwind removes the list style by default
  const HTMLcontent = post.content.replace(
    `<ul>`,
    `<ul class="list-disc ml-8">`
  );
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <DateTime dateStr={post.date} />
        <main
          dangerouslySetInnerHTML={{ __html: HTMLcontent }}
          className="flex flex-col gap-y-5 py-8 list-disc"
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // An array of nested object. The array looks like this [{ params: { id: <id> } }]
  // Each of that id represent individual routes /posts/<id>
  const paths = getAllPostIDs();

  // Return a list of possible value for id
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const post = await getPostByID(params?.id as string);

  return {
    props: {
      post,
    },
  };
};
