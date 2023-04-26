// * This component will wrap any component throughout the app.
// * Means this is the parent component. Also, it contains profile picture
import React, { ReactNode } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const ownerName = 'Redi Ahmad';

interface Props {
  children?: ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: Props) {
  const profilePicturePath = '/images/profile.png';

  return (
    <div className={`flex flex-col items-center text-black mx-64`}>
      <Head>
        {/* METADATA */}
        <title>{ownerName}</title>
      </Head>

      <header className="flex flex-col items-center">
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
            <h2 className="text-4xl font-semibold">{ownerName}</h2>
            <h3 className="text-xl font-semibold">Ganteng bet gweh</h3>
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
            <h2 className="text-3xl font-semibold">{ownerName}</h2>
          </>
        )}
      </header>

      <main>{children}</main>

      {/* If not at home route, render a button to go back */}
      {!home && (
        <div className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-full self-start">
          <Link href={'/'}>← Back to Home</Link>
        </div>
      )}
    </div>
  );
}
