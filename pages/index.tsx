import { Inter } from 'next/font/google';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Reday Blogs</title>
      </Head>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        inventore consequuntur vel, autem saepe quis soluta tempora? Maxime
        vitae, officiis reprehenderit nisi ut perferendis odio hic voluptate
        repellendus natus dolorum quia consectetur rem, nesciunt incidunt
        magnam. Ad eos libero ullam temporibus itaque quis consequuntur ut! Vel
        facere officiis autem corporis!
      </p>
    </Layout>
  );
}
