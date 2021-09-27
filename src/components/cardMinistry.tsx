import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IoClose } from 'react-icons/io5';

import { IMusic } from '../types';
import { gendersColors } from '../utils/definitions';

interface Props {
  music: IMusic;
  ministry: string;
  register?: any;
  setValue?: (name: string, value: boolean) => void;
  isInput?: boolean;
  showTimesPlayed?: boolean;
}

const Content: React.FC<Props> = ({
  music,
  ministry,
  isInput,
  register,
  setValue,
  showTimesPlayed,
}) => {
  const info = music.ministriesInfo.find((c) => c.ministry === ministry);

  if (!info) return <></>;

  const lastPlayed =
    info.lastPlayed === null ? new Date() : new Date(info.lastPlayed);
  return (
    <div
      className="bg-white dark:bg-gray-700 active:bg-gray-100 
        dark:active:bg-gray-800 overflow-hidden flex items-center 
        rounded relative shadow"
    >
      <div
        className={`absolute w-2 h-full ${
          gendersColors[music.gender][0]
            ? gendersColors[music.gender][0]
            : 'bg-gray-500'
        }`}
      ></div>
      <div className="flex-1 p-1 pl-6">
        <p
          className={`text-xs font-bold ${
            gendersColors[music.gender][1]
              ? gendersColors[music.gender][1]
              : 'text-gray-500'
          }`}
        >
          {music.gender}
        </p>
        <h2 className="font-semibold text-gray-900 dark:text-gray-50 text-lg">
          {music.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm">
          {music.author}
        </p>
        <p className="text-gray-800 dark:text-gray-200 mt-1 text-sm font-semibold flex flex-wrap">
          {ministry}
          <div className="badge badge-blue">
            {info.tone ? `tom ${info.tone}` : 'sem tom'}
          </div>
          {showTimesPlayed && (
            <div className="badge badge-blue">
              {info.lastPlayed
                ? `tocada há ${formatDistanceToNow(lastPlayed, {
                    locale: ptBR,
                  })}`
                : 'não tocada'}
            </div>
          )}
        </p>
        {showTimesPlayed && (
          <p className="text-gray-800 dark:text-gray-200 mt-1 text-sm font-semibold flex flex-wrap">
            Vezes tocadas
            <div className="badge badge-red">
              {info.timesPlayed ? `${info.timesPlayed}` : 'não tocada'}
            </div>
          </p>
        )}
      </div>
      <div className="pr-4">
        <div
          className={`text-xl text-gray-800 dark:text-gray-200 p-2 
            rounded-full focus:outline-none`}
        >
          {isInput && register ? (
            <input type="checkbox" {...register(`${music.id}`)} />
          ) : (
            setValue && (
              <button
                type="button"
                onClick={() => setValue(`${music.id}`, false)}
              >
                <IoClose />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const CardMinistry: React.FC<Props> = ({
  music,
  ministry,
  register,
  isInput = false,
  setValue,
  showTimesPlayed = true,
}) => {
  if (isInput)
    return (
      <label className="w-full">
        <Content
          isInput={isInput}
          register={register}
          ministry={ministry}
          music={music}
          setValue={setValue}
          showTimesPlayed={showTimesPlayed}
        />
      </label>
    );
  return (
    <div className="w-full">
      <Content
        isInput={isInput}
        register={register}
        ministry={ministry}
        music={music}
        setValue={setValue}
        showTimesPlayed={showTimesPlayed}
      />
    </div>
  );
};

export default CardMinistry;
