import React from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { BiSelectMultiple } from 'react-icons/bi';

import EventContent from '../../components/eventContent';
import { Meta } from '../../layout/Meta';
import { fetcher } from '../../services/api';
import { Main } from '../../templates/Main';
import { IEvent } from '../../types';

interface Props {
  events: IEvent[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const events: IEvent[] = await fetcher('event');
  return {
    props: {
      events,
    },
  };
};

const EventList = ({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            <EventContent key={event.id} event={event} />
          ))}
        </main>
      </div>
    </Main>
  );
};
export default EventList;
