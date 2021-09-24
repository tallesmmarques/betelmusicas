import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { RiFileList3Line } from 'react-icons/ri';

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
    <div className="min-h-screen flex flex-col bg-gray-100 pb-12">
      <header className="bg-gray-900 pt-12 pb-20 px-6 sm:px-6 lg:px-8 space-y-4 rounded-b-lg shadow-sm">
        <RiFileList3Line className="mx-auto text-6xl text-gray-100" />
        <h1 className="text-3xl pb-8 text-center font-extrabold text-gray-100">
          Betel Músicas
        </h1>

        <div className="relative rounded-md bg-white border shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">
              <FaSearch />
            </span>
          </div>
          <input
            type="text"
            placeholder="Pesquisar por música"
            className="py-2 focus:ring-0 outline-none block w-full pl-10 pr-3 rounded-md"
          />
        </div>
      </header>
      <main className="px-6 -mt-10">
        <div className="space-y-4">
          {musics.map((music) => (
            <Card key={music.id} music={music} />
          ))}
        </div>

        <Link href="/music/create" passHref>
          <button className="mt-8 p-4 btn btn-primary">Criar música</button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
