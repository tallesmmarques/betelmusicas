import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { FaBible, FaSearch } from 'react-icons/fa';

import Card from '../components/card';
import { Meta } from '../layout/Meta';
import { fetcher } from '../services/api';
import { Main } from '../templates/Main';
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
    revalidate: 5,
  };
};

const Home = ({ musics }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main
      meta={
        <Meta
          title="Betel Músicas"
          description="Coletânia de músicas e gerenciamento de eventos"
        />
      }
    >
      <div className="min-h-screen flex flex-col bg-gray-50 pb-12">
        <header className="bg-sky-600 pt-12 pb-20 px-6 sm:px-6 lg:px-8 rounded-b-lg shadow-sm">
          <FaBible className="mx-auto text-6xl text-gray-100" />
          <h1 className="text-3xl mt-6 text-center font-extrabold text-gray-100">
            Betel Músicas
          </h1>
          <p className="text-center text-sm text-gray-200 dark:text-gray-50">
            Você adora e a Som Livre toca
          </p>

          <div className="relative mt-8 rounded-md bg-white border shadow-sm w-full sm:max-w-lg mx-auto">
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
          <div className="space-y-4 w-full sm:max-w-lg flex flex-col items-center mx-auto">
            {musics.map((music) => (
              <Card key={music.id} music={music} />
            ))}
          </div>
        </main>
      </div>
    </Main>
  );
};

export default Home;
