import React from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { ministriesNames } from '../../utils/definitions';

const SelectMinistry = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: { ministry: string }) => {
    router.push({ pathname: '/event/[m]', query: { m: data.ministry } });
  };

  return (
    <Main
      meta={
        <Meta
          title="Selecionar Ministrante"
          description="Selecionar músicas para criação de um evento"
        />
      }
    >
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800 pb-12">
        <div className="flex flex-col items-center justify-center min-h-full w-full absolute">
          <div>
            <BsFillPersonLinesFill className="mx-auto text-5xl text-sky-600" />
            <h2 className="font-extrabold text-3xl text-center mt-6 text-gray-900 dark:text-gray-100 px-4">
              Selecionar Ministrante
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
              Quem irá cantar neste evento
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-x-2 w-lg flex"
          >
            <select
              required
              {...register('ministry')}
              className="px-4 py-2 rounded-md bg-white dark:bg-gray-600 border dark:border-none shadow
                text-gray-800 dark:text-gray-200 w-full focus:border-sky-500 focus:outline-none"
            >
              <option value="" disabled selected hidden>
                Selecionar ministrante
              </option>
              {ministriesNames.map((mi) => (
                <option key={mi} value={mi}>
                  {mi}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="btn-primary group relative flex justify-center items-center p-3 rounded-md"
            >
              <FaCheck className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default SelectMinistry;
