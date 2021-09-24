import React from 'react';

import { FaAngleDown } from 'react-icons/fa';

import { IMusic } from '../types';
import { gendersColors } from '../utils/definitions';

const Card: React.FC<{ music: IMusic }> = ({ music }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <div className="bg-white active:bg-gray-100 overflow-hidden flex items-center rounded relative shadow-sm">
        <div
          className={`absolute w-2 h-full ${
            gendersColors[music.gender][0]
              ? gendersColors[music.gender][0]
              : 'bg-gray-500'
          }`}
        ></div>
        <div className="flex-1 p-3 pl-6">
          <p
            className={`text-sm font-bold ${
              gendersColors[music.gender][1]
                ? gendersColors[music.gender][1]
                : 'text-gray-500'
            }`}
          >
            {music.gender}
          </p>
          <h2 className="font-semibold text-gray-900 text-lg">{music.name}</h2>
          <p className="text-gray-500 text-sm">{music.author}</p>
        </div>
        <div className="pr-4">
          <div
            className={`text-xl text-gray-800 p-2 rounded-full focus:outline-none
            ${isOpen && 'transition rotate-180 duration-300'}`}
          >
            <FaAngleDown />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50 border shadow-sm rounded-b-lg">
          {music.ministriesInfo.map((info, index) => {
            const badgeColor = ['badge-blue', 'badge-green', 'badge-red'];
            return (
              <p
                key={info.id}
                className="text-gray-800 mt-1 text-sm font-semibold flex"
              >
                {info.ministry}
                <div className={`badge ${badgeColor[index]}`}>
                  {info.tone ? `tone ${info.tone}` : 'sem tom'}
                </div>
                <div className={`badge ${badgeColor[index]}`}>
                  {info.lastPlayed
                    ? `tocada há ${info.lastPlayed}`
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
      )}
    </div>
  );
};

export default Card;
