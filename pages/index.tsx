import { Inter } from 'next/font/google';
import Head from 'next/head';
import Layout from '@/components/Layout';
import getSortedPost, { PostsData } from '../lib/posts.utils';

export async function getStaticProps() {
  const postMetadata: PostsData[] = getSortedPost();
  return {
    props: { postMetadata },
  };
}

export default function Home({ postMetadata }) {
  const ownerDescription = `Hello, I'm Redi Ahmad, a Computer System student who wants to be a software engineer.`;
  console.log(postMetadata);
  return (
    <Layout home>
      <Head>
        <title>Reday Blogs</title>
      </Head>
      <p>{ownerDescription}</p>
      <section>
        <h2>Blogs</h2>
        <ul>
          {postMetadata.map(({ id, date, title }: PostsData) => (
            <li key={id}>
              <h2>{title}</h2>
              <h3>{id}</h3>
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
