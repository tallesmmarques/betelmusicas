import React, { useState } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { FaYoutube, FaGuitar, FaAngleDown } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';

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
  const [isOpen, setIsOpen] = useState(false);
  const info = music.ministriesInfo.find((c) => c.ministry === ministry);

  if (!info) return <></>;

  const lastPlayed =
    info.lastPlayed === null ? new Date() : new Date(info.lastPlayed);

  return (
    <div className="w-full">
      <div
        onClick={() => !setValue && setIsOpen(!isOpen)}
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
                {info.timesPlayed ? `${info.timesPlayed} vezes` : 'não tocada'}
              </div>
            </p>
          )}
        </div>
        <div className="pr-4">
          {!((isInput && register) || setValue) ? (
            <div
              className={`text-xl text-gray-800 dark:text-gray-200 p-2 rounded-full focus:outline-none ${
                isOpen && 'transition rotate-180 duration-300'
              }`}
            >
              <FaAngleDown />
            </div>
          ) : (
            <div
              className={`text-xl text-gray-800 dark:text-gray-200 p-2 
            rounded-full focus:outline-none`}
            >
              {!isInput && setValue ? (
                <button
                  type="button"
                  onClick={() => setValue(`${music.id}`, false)}
                >
                  <IoClose />
                </button>
              ) : (
                <input type="checkbox" {...register(`${music.id}`)} />
              )}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="px-4 pr-10 bg-gray-50 dark:bg-gray-600 border 
          dark:border-gray-700 shadow-sm rounded-b-lg flex relative items-stretch"
        >
          <div className="flex items-center justify-around w-full">
            <Link href={`/music/${music.id}`} passHref>
              <button
                className="px-5 py-3 h-1/3 text-xl hover:bg-transparent
                text-blue-500 active:bg-true-gray-200 outline-none focus:bg-transparent flex items-center justify-center"
              >
                <MdEdit />
              </button>
            </Link>
            <Link
              href={music.linkYoutube === null ? '/' : music.linkYoutube}
              passHref
            >
              <button
                className="px-5 py-3 h-1/3 text-xl hover:bg-transparent
              text-red-500 active:bg-true-gray-200 outline-none focus:bg-transparent flex items-center justify-center"
              >
                <FaYoutube />
              </button>
            </Link>
            <Link
              href={music.linkCifra === null ? '/' : music.linkCifra}
              passHref
            >
              <button
                className="px-5 py-3 h-1/3 text-xl hover:bg-transparent
              text-orange-500 active:bg-true-gray-200 outline-none focus:bg-transparent flex items-center justify-center"
              >
                <FaGuitar />
              </button>
            </Link>
          </div>
        </div>
      )}
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
