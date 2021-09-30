/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Divider from '../../../components/diver';
import { Meta } from '../../../layout/Meta';
import api, { fetcher } from '../../../services/api';
import { Main } from '../../../templates/Main';
import { IEvent } from '../../../types';
import { ministriesNames } from '../../../utils/definitions';

interface FormData {
  title: string;
  ministry: string;
  date: string;
  [key: string]: string;
}

interface Props {
  oldEvent: IEvent;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
}) => {
  const oldEvent: IEvent = await fetcher(`event/${params?.pid}`);

  if (!oldEvent)
    return {
      notFound: true,
    };

  if (query.l && !Array.isArray(query.l)) {
    const ids: string[] = query.l.split('-');
    const musics = await Promise.all(
      ids.map((id) => {
        return fetcher(`music/${id}`);
      })
    );
    return {
      props: {
        oldEvent: { ...oldEvent, musics },
      },
    };
  }
  return {
    props: {
      oldEvent,
    },
  };
};

const UpdateEvent = ({
  oldEvent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* -------------------------------------------------------------------------- */
  /*                            Hooks e Inicialização                           */
  /* -------------------------------------------------------------------------- */
  const getInitialValues = (event: IEvent): FormData => {
    return {
      title: event.title,
      ministry: event.ministry,
      date: event.date,
    };
  };

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: getInitialValues(oldEvent),
  });
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                            Funções e tratativas                            */
  /* -------------------------------------------------------------------------- */

  const onSubmit = (data: FormData) => {
    const event = {
      id: oldEvent.id,
      ...data,
      musics: oldEvent.musics,
    };
    api.patch(`event/${oldEvent.id}`, event).then(() => {
      router.push(`/event`);
    });
    // .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    if (confirm('Excluir lista? Está operação não poderá ser desfeita!')) {
      api.delete(`event/${oldEvent.id}`).then(() => {
        router.push('/event');
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Conteúdo Gerado                              */
  /* -------------------------------------------------------------------------- */
  return (
    <Main
      meta={
        <Meta
          title="Atualizar Evento"
          description="Coletânea de músicas e gerenciamento de eventos"
        />
      }
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <FaEdit className="mx-auto text-5xl text-sky-600" />
            <h2 className="font-extrabold text-3xl text-center mt-6 text-gray-900 dark:text-gray-100">
              Atualizar Evento
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
              após a confirmação as alterações não poderão ser desfeitas
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col bg-white dark:bg-gray-700 border dark:border-none shadow-md rounded-md p-6 sm:p-8 space-y-3 sm:space-y-5"
          >
            <div className="field">
              <label>
                Nome do evento
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

            <Divider text="Músicas Atuais" />
            <ul className="space-y-1">
              {oldEvent.musics.map((music) => (
                <li
                  key={music.id}
                  className="text-gray-700 dark:text-gray-200 space-x-2 text-sm"
                >
                  <b>{music.name}</b>
                  <span>- {music.author}</span>
                </li>
              ))}
            </ul>
            <Link
              href={{
                pathname: '/event/[m]',
                query: {
                  m: oldEvent.ministry,
                  c: oldEvent.musics.map((music) => music.id).join('-'),
                  a: `/event/update/${oldEvent.id}`,
                },
              }}
              passHref
            >
              <a className="dark:text-blue-300">Selecionar músicas...</a>
            </Link>

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

export default UpdateEvent;
