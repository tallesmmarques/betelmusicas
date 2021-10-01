import React, { useEffect, useState } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { BiSelectMultiple } from 'react-icons/bi';
import { FaArrowUp } from 'react-icons/fa';

import CardMinistry from '../../components/cardMinistry';
import SearchBar from '../../components/searchBar';
import { Meta } from '../../layout/Meta';
import { fetcher } from '../../services/api';
import { Main } from '../../templates/Main';
import { IMusic } from '../../types';
import { fastGenders, genders, slowGenders } from '../../utils/definitions';

interface Props {
  musics: IMusic[];
  ministry: string;
}

export const getServerSideProps: GetServerSideProps<Props, { m: string }> =
  async ({ params }) => {
    const musics: IMusic[] = await fetcher('music');
    return {
      props: {
        musics,
        ministry: params?.m ? params.m : '',
      },
    };
  };

const SelectMusics = ({
  musics,
  ministry,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [selecteds, setSelecteds] = useState<{ [key: string]: boolean }>({});
  const [filterGenders, setFilterGenders] = useState<string[]>(genders);
  const [search, setSearch] = useState('');

  const router = useRouter();

  useEffect(() => {
    const subscription = watch((values) => {
      setSelecteds(values);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    if (router.query.c && !Array.isArray(router.query.c)) {
      router.query.c.split('-').map((id) => setValue(id, true));
    }
  }, [router.query.c, setValue]);

  const filter = (
    allMusics: IMusic[],
    localFilterGenders: string[]
  ): IMusic[] => {
    return allMusics
      .filter(
        (music) =>
          music.name.toLowerCase().includes(search.toLowerCase()) ||
          music.author.toLowerCase().includes(search.toLowerCase())
      )
      .filter((m) => localFilterGenders.includes(m.gender));
  };
  const onSubmit = (data: { [key: string]: boolean }[]) => {
    const musicsString = Object.entries(data)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
      .join('-');
    if (router.query.a && !Array.isArray(router.query.a)) {
      router.push({
        pathname: router.query.a,
        query: { l: musicsString, m: ministry },
      });
    } else {
      router.push({
        pathname: '/event/create',
        query: { l: musicsString, m: ministry },
      });
    }
  };
  // const clearList = () => {
  //   Object.keys(musics).forEach((key) => setValue(key, false));
  // };
  const getRandomInt = (min: number, max: number): number => {
    const intmin = Math.ceil(min);
    const intmax = Math.floor(max);
    return Math.floor(Math.random() * (intmax - intmin)) + intmin;
  };
  const randomItem = () => {
    const fast: IMusic[] = filter(musics, fastGenders);
    const slow: IMusic[] = filter(musics, slowGenders);
    const randomMusics: IMusic[] = [];

    let i = getRandomInt(0, fast.length - 1);
    let m = fast[i];
    if (m !== undefined) {
      randomMusics.push(m);
    }
    i = getRandomInt(0, slow.length - 1);
    m = slow[i];
    if (m !== undefined) {
      randomMusics.push(m);
    }
    i = getRandomInt(0, fast.length - 1);

    if (randomMusics.length > 0) {
      randomMusics.forEach((music) => setValue(`${music.id}`, true));
    }
  };

  return (
    <Main
      meta={
        <Meta
          title="Selecionar Músicas"
          description="Selecionar músicas para criação de um evento"
        />
      }
    >
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800 pb-12">
        <header className="bg-sky-600 dark:bg-gray-900 pt-12 pb-8 px-6 sm:px-6 lg:px-8 rounded-b-lg shadow-sm">
          <BiSelectMultiple className="mx-auto text-6xl text-gray-100" />
          <h1 className="text-3xl mt-6 text-center font-extrabold text-gray-100">
            Selecionar Músicas
          </h1>
          <p className="text-center mt-1 text-sm text-gray-200 dark:text-gray-50">
            Primeiro selecione as músicas que serão tocadas no evento
          </p>

          <SearchBar setFilter={setFilterGenders} setSearch={setSearch} />
        </header>
        <main className="px-6 mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full sm:max-w-lg flex flex-col items-center mx-auto"
          >
            {Object.entries(selecteds)
              .filter(([_, value]) => value)
              .reduce((p, c) => p || c[1], false) && (
              <div className="w-full space-y-3 flex flex-col mb-8">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Selecionadas
                </h1>
                {musics
                  .filter((music) => watch(`${music.id}`))
                  .map((music) => (
                    <CardMinistry
                      key={music.id}
                      music={music}
                      ministry={ministry}
                      isInput={false}
                      setValue={setValue}
                    />
                  ))}
                <button className="btn btn-primary" type="submit">
                  Confirmar
                </button>
              </div>
            )}
            <div className="flex flex-col w-full space-y-3">
              <button
                className="btn btn-info"
                type="button"
                onClick={() => randomItem()}
              >
                Sugerir duas músicas
              </button>
            </div>
            {filter(musics, filterGenders).map((music) => (
              <CardMinistry
                key={music.id}
                register={register}
                music={music}
                ministry={ministry}
                isInput={true}
                setValue={setValue}
              />
            ))}
          </form>
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

export default SelectMusics;
