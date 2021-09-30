import React, { useState } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { RiFileList3Line } from 'react-icons/ri';

import Divider from '../../components/diver';
import { Meta } from '../../layout/Meta';
import api, { fetcher } from '../../services/api';
import { Main } from '../../templates/Main';
import { IMusic } from '../../types';
import { ministriesNames } from '../../utils/definitions';

interface Props {
  musics: IMusic[];
  ministry: string;
}
interface FormData {
  ministry: string;
  title: string;
  date: Date | '';
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  if (!query.l || Array.isArray(query.l) || !query.m || Array.isArray(query.m))
    return {
      notFound: true,
    };
  const ids: string[] = query?.l.split('-');
  const musics = await Promise.all(
    ids.map((id) => {
      const data = fetcher(`music/${id}`);
      return data;
    })
  );
  return {
    props: {
      musics,
      ministry: query.m,
    },
  };
};

const CreateEvent = ({ musics, ministry }: Props) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      ministry,
      title: '',
      date: '',
    },
  });
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    setIsSending(true);
    api
      .post('event', { ...data, musics })
      .then(() => {
        setIsSending(false);
        router.push('/');
      })
      .catch(() => {
        setIsSending(false);
      });
  };

  return (
    <Main
      meta={
        <Meta
          title="Criar novo evento"
          description="Criar novo evento para Betel Músicas"
        />
      }
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <RiFileList3Line className="mx-auto text-6xl text-sky-600" />
            <h2 className="font-extrabold text-3xl text-center mt-4 text-gray-900">
              Criar Novo Evento
            </h2>
            {/* <p className="mt-2 text-sm text-gray-600 text-center">
              por favor verifique se a música já não foi criada
            </p> */}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col bg-white border shadow-md rounded-md p-6 sm:p-8 space-y-3 sm:space-y-5"
          >
            <div className="field">
              <label>
                Nome do Evento
                <input {...register('title')} type="text" />
              </label>
            </div>

            <div className="field">
              <label>
                Data
                <input {...register('date')} type="date" />
              </label>
            </div>

            <div className="field">
              <label>
                Ministério
                <select {...register('ministry')}>
                  {ministriesNames.map((name) => (
                    <option value={name} key={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <Divider text="Músicas adicionadas" />
            <ul className="space-y-1">
              {musics.map((music) => (
                <li key={music.id} className="text-gray-700 space-x-2 text-sm">
                  <b>{music.name}</b>
                  <span>- {music.author}</span>
                </li>
              ))}
            </ul>

            <div className="flex space-x-3 pt-4">
              <Link
                href={{
                  pathname: '/event/[m]',
                  query: {
                    m: ministry,
                    c: musics.map((music) => music.id).join('-'),
                  },
                }}
                passHref
              >
                <button type="button" className="btn btn-secondary">
                  Voltar
                </button>
              </Link>
              <button
                disabled={isSending}
                type="submit"
                className={`btn ${isSending ? 'btn-none' : 'btn-primary'}`}
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default CreateEvent;
