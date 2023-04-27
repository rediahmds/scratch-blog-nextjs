import { Inter } from 'next/font/google';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Home() {
  const ownerDescription = `Hello, I'm Redi Ahmad, a Computer System student who wants to be a software engineer.`;
  return (
    <Layout home>
      <Head>
        <title>Reday Blogs</title>
      </Head>
      <p>{ownerDescription}</p>
    </Layout>
  );
}
