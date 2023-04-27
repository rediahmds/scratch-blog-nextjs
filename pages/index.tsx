import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
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
              <Link href={`posts/${id}`}>
                <h2>{title}</h2>
              </Link>
              <h3>{date}</h3>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
