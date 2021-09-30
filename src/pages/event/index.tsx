import React from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { BiSelectMultiple } from 'react-icons/bi';
import { MdCheck, MdEdit } from 'react-icons/md';

import CardMinistry from '../../components/cardMinistry';
import { Meta } from '../../layout/Meta';
import api, { fetcher } from '../../services/api';
import { Main } from '../../templates/Main';
import { IEvent } from '../../types';

interface Props {
  events: IEvent[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events: IEvent[] = await fetcher('event');
  return {
    props: {
      events,
    },
    revalidate: 5,
  };
};

const EventList = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const onPlayed = (id: number) => {
    api.patch(`event/played/${id}`).then(() => {
      api.delete(`event/${id}`).then(() => {
        router.push('/');
      });
    });
  };
  const onEdit = (id: number) => {
    router.push(`/event/update/${id}`);
  };

  return (
    <Main
      meta={
        <Meta
          title="Eventos Betel"
          description="Selecionar músicas para criação de um evento"
        />
      }
    >
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800 pb-12">
        <header className="bg-sky-600 dark:bg-gray-900 pt-12 pb-8 px-6 sm:px-6 lg:px-8 rounded-b-lg shadow-sm">
          <BiSelectMultiple className="mx-auto text-6xl text-gray-100" />
          <h1 className="text-3xl mt-6 text-center font-extrabold text-gray-100">
            Eventos e Cultos
          </h1>
          <p className="text-center mt-1 text-sm text-gray-200 dark:text-gray-50">
            Datas e músicas possíveis para cultos
          </p>
        </header>
        <main className="px-6 mt-6 w-full mx-auto sm:max-w-lg space-y-6">
          {events.map((event) => (
            <div key={event.id} className="">
              <div className="flex items-start">
                <div
                  className={`text-sm flex-1 ${
                    new Date() < new Date(event.date)
                      ? 'text-gray-800'
                      : 'text-red-500'
                  }`}
                >
                  <h2 className="text-xl font-semibold dark:text-gray-100">
                    {event.ministry} - {event.title}
                  </h2>
                  <p className="text-sm dark:text-gray-300">
                    {format(new Date(event.date), 'PPPP', { locale: ptBR })}
                  </p>
                </div>
                <div className="space-x-2 flex flex-row">
                  <button
                    onClick={() => onPlayed(event.id)}
                    className="btn-green p-2 rounded-md"
                  >
                    <MdCheck />
                  </button>
                  <button
                    onClick={() => onEdit(event.id)}
                    className="btn-info p-2 rounded-md"
                  >
                    <MdEdit />
                  </button>
                </div>
              </div>

              <div className="flex flex-col mt-4 space-y-4">
                {event.musics.map((music) => (
                  <CardMinistry
                    ministry={event.ministry}
                    music={music}
                    showTimesPlayed={false}
                    key={music.id}
                  />
                ))}
              </div>
              <div className="bg-gray-300 shadow-sm w-full h-px mt-8"></div>
            </div>
          ))}
        </main>
      </div>
    </Main>
  );
};
export default EventList;
