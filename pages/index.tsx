import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import getSortedPost from '../lib/posts.utils';
import DateTime from '@/components/DateTime';

export default function Home({
  postMetadata,
}: {
  postMetadata: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const ownerIntroduction = `Hello, I'm Redi Ahmad, a student who taught himself to be a software engineer.`;
  const ownerDescription = `I am currently learning front-end web development and will soon expand my skills to include back-end development as well. `;
  return (
    <Layout home>
      <Head>
        <title>Reday Blogs</title>
      </Head>
      <article className="flex flex-col gap-y-5 text-xl">
        <p>{ownerIntroduction}</p>
        <p>{ownerDescription}</p>
      </article>
      <section>
        <h2 className="text-3xl font-bold">Blogs</h2>
        <ul className="flex flex-col gap-y-5 py-5 list-none">
          {postMetadata.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`posts/${id}`} className="text-blue-500/100">
                <h2 className="text-xl">{title}</h2>
              </Link>
              <DateTime dateStr={date} home />
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
