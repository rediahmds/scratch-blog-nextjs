// * This component will wrap any component throughout the app.
// * Means this is the parent component. Also, it contains profile picture
import React, { ReactNode } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const ownerName = 'Redi Ahmad';
interface Props {
  children?: ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: Props) {
  const profilePicturePath = '/images/profile.png';

  return (
    <div
      className={`flex flex-col items-center text-black mx-6 md:mx-64 ${
        home ? 'my-16' : 'my-12'
      } ${inter.className} gap-y-5`}
    >
      <Head>
        {/* METADATA */}
        <title>{ownerName}</title>
      </Head>

      <header className="flex flex-col items-center gap-y-5">
        {/* CONTAINS IMAGE AND NAME */}
        {/* If rendered at home route, pic & text should be bigger */}
        {home ? (
          <>
            <Image
              className="rounded-full"
              src={profilePicturePath}
              alt={ownerName}
              height={150}
              width={150}
            />
            <h2 className="text-5xl font-bold">{ownerName}</h2>
          </>
        ) : (
          <>
            <Image
              className="rounded-full"
              src={profilePicturePath}
              alt={ownerName}
              height={100}
              width={100}
            />
            <h2 className="text-2xl font-semibold">{ownerName}</h2>
          </>
        )}
      </header>

      <main className={`flex flex-col gap-y-5`}>{children}</main>

      {/* If not at home route, render a button to go back */}
      {!home && (
        <div className="basis-8 bg-gray-300 hover:bg-gray-200 py-3 px-4 rounded-full self-start mt-10">
          <Link href={'/'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>{' '}
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
