import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { FaBible, FaSearch } from 'react-icons/fa';

import Card from '../components/card';
import { fetcher } from '../services/api';
import { IMusic } from '../types';

interface Props {
  musics: IMusic[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const musics: IMusic[] = await fetcher('music');
  return {
    props: {
      musics,
    },
    revalidate: 10,
  };
};

const Home = ({ musics }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800 pb-12">
      <header className="pt-12 pb-20 px-6 sm:px-6 lg:px-8">
        <FaBible className="mx-auto text-6xl text-sky-600 dark:text-gray-50" />
        <h1 className="text-3xl mt-6 text-center font-extrabold text-gray-900 dark:text-gray-50">
          Betel Músicas
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-50">
          Você adora e a Som Livre toca
        </p>

        <div className="relative mt-8 rounded-md bg-white dark:bg-gray-700 border dark:border-none shadow-sm w-full sm:max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-200">
              <FaSearch />
            </span>
          </div>
          <input
            type="text"
            placeholder="Pesquisar por música"
            className="py-2 dark:text-gray-50 focus:ring-0 outline-none block dark:bg-gray-700 w-full pl-10 pr-3 rounded-md"
          />
        </div>
      </header>
      <main className="px-6 -mt-10">
        <div className="space-y-4 w-full sm:max-w-lg flex flex-col items-center mx-auto">
          {musics.map((music) => (
            <Card key={music.id} music={music} />
          ))}

          <Link href="/music/create" passHref>
            <button className="mt-8 p-4 btn btn-primary">Criar música</button>
          </Link>
          <Link href="/test" passHref>
            <button className="mt-8 p-4 btn btn-primary">Home Test</button>
          </Link>
          <Link href="/test2" passHref>
            <button className="mt-8 p-4 btn btn-primary">Home Test 2</button>
          </Link>
          <Link href="/" passHref>
            <button className="mt-8 p-4 btn btn-primary">Home</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
