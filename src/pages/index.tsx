import React, { useState } from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { FaArrowUp, FaBible } from 'react-icons/fa';

import Card from '../components/card';
import SearchBar from '../components/searchBar';
import { Meta } from '../layout/Meta';
import { fetcher } from '../services/api';
import { Main } from '../templates/Main';
import { IMusic } from '../types';
import { genders } from '../utils/definitions';

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
  const [filterGenders, setFilterGenders] = useState<string[]>(genders);
  const [search, setSearch] = useState('');

  const filter = (allMusics: IMusic[]): IMusic[] => {
    return allMusics
      .filter(
        (music) =>
          music.name.toLowerCase().includes(search.toLowerCase()) ||
          music.author.toLowerCase().includes(search.toLowerCase())
      )
      .filter((m) => filterGenders.includes(m.gender));
  };

  return (
    <Main
      meta={
        <Meta
          title="Betel Músicas"
          description="Coletânea de músicas e gerenciamento de eventos para a Batista Betel"
        />
      }
    >
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800 pb-12">
        <header className="bg-sky-600 dark:bg-gray-900 pt-12 pb-20 px-6 sm:px-6 lg:px-8 rounded-b-lg shadow-sm">
          <FaBible className="mx-auto text-6xl text-gray-100" />
          <h1 className="text-3xl mt-6 text-center font-extrabold text-gray-100">
            Betel Músicas
          </h1>
          <p className="text-center text-sm text-gray-200 dark:text-gray-50">
            Mais de {musics.length} músicas e tons
          </p>

          <SearchBar setFilter={setFilterGenders} setSearch={setSearch} />
        </header>
        <main className="px-6 -mt-10">
          <div className="space-y-4 w-full sm:max-w-lg flex flex-col items-center mx-auto">
            {filter(musics).map((music) => (
              <Card key={music.id} music={music} />
            ))}
          </div>
        </main>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="fixed bottom-20 right-4 p-3 rounded shadow btn-primary dark:bg-gray-900"
        >
          <FaArrowUp />
        </button>
      </div>
    </Main>
  );
};

export default Home;
