import React from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Meta } from '../../layout/Meta';
import api, { fetcher } from '../../services/api';
import { Main } from '../../templates/Main';
import { IMusic } from '../../types';
import { genders, ministriesNames } from '../../utils/definitions';

interface FormData {
  name: string;
  author: string;
  gender: string;
  linkCifra: string;
  linkYoutube: string;
  [key: string]: string;
}

interface Props {
  oldMusic: IMusic;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const oldMusic: IMusic = await fetcher(`music/${params?.pid}`);

  if (!oldMusic)
    return {
      notFound: true,
    };

  return {
    props: {
      oldMusic,
    },
  };
};

const UpdateMusic = ({
  oldMusic,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* -------------------------------------------------------------------------- */
  /*                            Hooks e Inicialização                           */
  /* -------------------------------------------------------------------------- */
  const getInitialValues = (music: IMusic): FormData => {
    const ministriesTone: { [key: string]: string } =
      music.ministriesInfo.reduce(
        (p, info) => ({
          ...p,
          [`tone-${info.ministry}`]: info.tone,
        }),
        {}
      );
    const ministriesLast: { [key: string]: string } =
      music.ministriesInfo.reduce(
        (p, info) => ({
          ...p,
          [`last-${info.ministry}`]: info.lastPlayed,
        }),
        {}
      );
    const ministriesTimes: { [key: string]: string } =
      music.ministriesInfo.reduce(
        (p, info) => ({
          ...p,
          [`times-${info.ministry}`]: info.timesPlayed,
        }),
        {}
      );
    return {
      name: music.name,
      author: music.author,
      gender: music.gender,
      linkCifra: music.linkCifra,
      linkYoutube: music.linkYoutube,
      ...ministriesTone,
      ...ministriesLast,
      ...ministriesTimes,
    };
  };

  const { register, handleSubmit } = useForm({
    defaultValues: getInitialValues(oldMusic),
  });
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                            Funções e tratativas                            */
  /* -------------------------------------------------------------------------- */

  const onSubmit = (data: FormData) => {
    const ministriesInfo = ministriesNames.map((name) => ({
      ministry: name,
      tone: data[`tone-${name}`],
      lastPlayed: data[`last-${name}`],
      timesPlayed: data[`times-${name}`],
    }));
    const music = {
      id: oldMusic.id,
      ...data,
      ministriesInfo,
    };
    api.patch(`music/${oldMusic.id}`, music).then(() => {
      router.push(`/`);
    });
    // .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    api.delete(`music/${oldMusic.id}`).then(() => {
      router.push('/');
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Conteúdo Gerado                              */
  /* -------------------------------------------------------------------------- */
  return (
    <Main
      meta={
        <Meta
          title="Atualizar Música"
          description="Coletânia de músicas e gerenciamento de eventos"
        />
      }
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <FaEdit className="mx-auto text-5xl text-sky-600" />
            <h2 className="font-extrabold text-3xl text-center mt-6 text-gray-900">
              Atualizar {oldMusic.name}
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              após a confirmação as alterações não poderão ser desfeitas
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col bg-white border shadow-md rounded-md p-6 sm:p-8 space-y-3 sm:space-y-5"
          >
            <div className="field">
              <label>
                Música
                <input {...register('name')} type="text" />
              </label>
            </div>

            <div className="field">
              <label>
                Artista
                <input {...register('author')} type="text" />
              </label>
            </div>

            <div className="field">
              <label>
                Gênero
                <select {...register('gender')}>
                  <option value="" disabled selected hidden>
                    Selecionar Gênero
                  </option>
                  {genders.map((gender) => (
                    <option value={gender} key={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex space-x-3">
              <div className="field">
                <label className="field-label" htmlFor="linkCifra">
                  CifraClub
                  <input
                    type="url"
                    {...register(`linkCifra`)}
                    id="linkCifra"
                    className="field-input"
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Youtube
                  <input type="url" {...register(`linkYoutube`)} />
                </label>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-300 h-px flex-1 shadow-sm" />
                <p className="px-2 text-gray-500 font-medium text-sm">
                  Tonalidade da música
                </p>
                <div className="bg-gray-300 h-px flex-1 shadow-sm" />
              </div>
              <div className="flex space-x-3 mt-2">
                {ministriesNames.map((ministry) => (
                  <div className="field" key={ministry}>
                    <label>
                      {ministry}
                      <input type="text" {...register(`tone-${ministry}`)} />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-300 h-px flex-1 shadow-sm" />
                <p className="px-2 text-gray-500 font-medium text-sm">
                  Última vez tocada
                </p>
                <div className="bg-gray-300 h-px flex-1 shadow-sm" />
              </div>
              <div className="flex space-y-1 mt-2 flex-col">
                {ministriesNames.map((ministry) => (
                  <div className="field" key={ministry}>
                    <label>
                      {ministry}
                      <input type="date" {...register(`last-${ministry}`)} />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-300 h-px flex-1 shadow-sm" />
                <p className="px-2 text-gray-500 font-medium text-sm">
                  Vezes tocada
                </p>
                <div className="bg-gray-300 h-px flex-1 shadow-sm" />
              </div>
              <div className="flex space-x-3 mt-2">
                {ministriesNames.map((ministry) => (
                  <div className="field" key={ministry}>
                    <label>
                      {ministry}
                      <input type="number" {...register(`times-${ministry}`)} />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Link href="/" passHref>
                <button type="button" className="btn btn-secondary">
                  Cancelar
                </button>
              </Link>
              <button type="submit" className="btn btn-primary">
                Atualizar
              </button>
              <button onClick={handleDelete} className="btn-delete">
                <RiDeleteBin6Line />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default UpdateMusic;
