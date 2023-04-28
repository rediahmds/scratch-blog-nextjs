import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import getSortedPost from '../lib/posts.utils';

export default function Home({
  postMetadata,
}: {
  postMetadata: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
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
          {postMetadata.map(({ id, date, title }) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const postMetadata = getSortedPost();
  return {
    props: { postMetadata },
  };
};
