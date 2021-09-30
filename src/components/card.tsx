import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { FaAngleDown, FaGuitar, FaYoutube } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import { IMusic } from '../types';
import { gendersColors } from '../utils/definitions';

const Card: React.FC<{ music: IMusic }> = ({ music }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
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
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            {music.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            {music.author}
          </p>
        </div>
        <div className="pr-4">
          <div
            className={`text-xl text-gray-800 dark:text-gray-200 p-2 
            rounded-full focus:outline-none
            ${isOpen && 'transition rotate-180 duration-300'}`}
          >
            <FaAngleDown />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="p-4 pr-10 bg-gray-50 dark:bg-gray-600 border 
          dark:border-gray-700 shadow-sm rounded-b-lg flex relative items-stretch"
        >
          <div>
            {music.ministriesInfo.map((info, index) => {
              const badgeColor = ['badge-blue', 'badge-green', 'badge-red'];
              const lastPlayed =
                info.lastPlayed === null
                  ? new Date()
                  : new Date(info.lastPlayed);
              return (
                <p
                  key={info.id}
                  className="text-gray-800 dark:text-gray-200 mt-1 text-sm font-semibold flex flex-wrap"
                >
                  {info.ministry}
                  <div className={`badge ${badgeColor[index]}`}>
                    {info.tone ? `tom ${info.tone}` : 'sem tom'}
                  </div>
                  <div className={`badge ${badgeColor[index]}`}>
                    {info.lastPlayed
                      ? `tocada há ${formatDistanceToNow(lastPlayed, {
                          locale: ptBR,
                        })}`
                      : 'não tocada'}
                  </div>
                  {/* {info.timesPlayed !== 0 && (
                    <div className={`badge ${badgeColor[index]}`}>
                      {`tocada ${info.timesPlayed} vezes`}
                    </div>
                  )} */}
                </p>
              );
            })}
          </div>
          <div className="absolute top-0 right-0 h-full">
            <Link href={`/music/${music.id}`} passHref>
              <button
                className="px-5 h-1/3 text-xl hover:bg-transparent
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
                className="px-5 h-1/3 text-xl hover:bg-transparent
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
                className="px-5 h-1/3 text-xl hover:bg-transparent
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

export default Card;
