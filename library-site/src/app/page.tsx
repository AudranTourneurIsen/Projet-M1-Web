'use client';

import { FC, ReactElement } from 'react';

const Home: FC = (): ReactElement => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="container h-full mx-auto flex justify-center items-center m-4">
      <div className="space-y-2 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400 glitch">
          The Great Library
        </h1>
        <div className="h-6" />
        <h2 className="dark:text-gray-200 text-2xl">
          A blazingly-fast, no non-sense <br />
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-300">
            library management system
          </span>{' '}
          <br /> built for the 21st century{' '}
        </h2>
      </div>
    </div>
  </main>
);

export default Home;
