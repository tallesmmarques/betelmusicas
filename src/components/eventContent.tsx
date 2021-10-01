import React, { useState } from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MdCheck, MdEdit } from 'react-icons/md';

import api from '../services/api';
import { IEvent } from '../types';
import CardMinistry from './cardMinistry';
import Modal from './modal';

const EventContent: React.FC<{ event: IEvent }> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<{ [key: string]: boolean }>({
    defaultValues: {
      ...event.musics.reduce((p, c) => ({ ...p, [c.id]: true }), {}),
    },
  });
  const router = useRouter();

  const onPlayed = (data: { [key: string]: boolean }) => {
    const { id } = event;
    const exception = Object.entries(data)
      .filter(([_, value]) => !value)
      .map(([key]) => ({ id: Number(key) }));

    api.patch(`event/played/${id}`, { exception }).then(() => {
      api.delete(`event/${id}`).then(() => {
        router.push('/');
      });
    });
  };
  const onEdit = (id: number) => {
    router.push(`/event/update/${id}`);
  };

  return (
    <div>
      <div className="flex items-start">
        <div
          className={`text-sm flex-1 ${
            new Date() < new Date(event.date) ? 'text-gray-800' : 'text-red-500'
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
            onClick={() => setIsOpen(true)}
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
      <div className="bg-gray-300 dark:bg-gray-600 shadow-sm w-full h-px mt-8"></div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmar finalização de Evento"
      >
        <form onSubmit={handleSubmit(onPlayed)}>
          <h2 className="pb-4 text-gray-900 dark:text-gray-100">
            Selecione apenas as músicas que foram tocadas
          </h2>
          <div className="text-gray-800 dark:text-gray-200">
            {event.musics.map((music) => (
              <div key={music.id}>
                <label>
                  <input
                    type="checkbox"
                    {...register(`${music.id}`)}
                    className="mr-2"
                  />
                  <b>{music.name}</b> - {music.author}
                </label>
              </div>
            ))}
          </div>
          <div className="flex w-full space-x-3 pt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className={`btn btn-primary`}>
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventContent;
