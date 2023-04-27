import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { getAllPostIDs, getPostByID } from '@/lib/posts.utils';

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
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1>{post.title}</h1>
        <h4>{post.date}</h4>
        <main dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // An array of nested object. The array looks like this [{ params: { id: <id> } }]
  // Each of that id represent individual routes /posts/<id>
  const paths = getAllPostIDs();

  // Return a list of possible value for id
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const post = await getPostByID(params.id);

  return {
    props: {
      post,
    },
  };
}
