import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaMusic } from 'react-icons/fa';
import { IoFlash } from 'react-icons/io5';

import Divider from '../../components/diver';
import SearchMusic from '../../components/searchMusic';
import { Meta } from '../../layout/Meta';
import api from '../../services/api';
import { Main } from '../../templates/Main';
import { genders, ministriesNames } from '../../utils/definitions';

type FormData = {
  name: string;
  author: string;
  gender: string;
  linkCifra: string;
  linkYoutube: string;
  [key: string]: string;
};

const CreateMusic = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const ministriesInfo = ministriesNames.map((name) => ({
      ministry: name,
      tone: data[`tone-${name}`],
    }));
    const music = {
      ...data,
      ministriesInfo,
    };
    api.post(`music`, music).then(() => {
      router.push(`/`);
    });
    // .catch((err) => console.log(err));
  };
  const closeSearch = () => {
    setIsSearch(false);
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };
  const openSearch = () => {
    setIsSearch(true);
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
  };

  return (
    <Main
      meta={
        <Meta
          title="Criar Música"
          description="Coletânea de músicas e gerenciamento de eventos"
        />
      }
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <FaMusic className="mx-auto text-5xl text-sky-600" />
            <h2 className="font-extrabold text-3xl text-center mt-6 text-gray-900 dark:text-gray-100">
              Criar Nova Música
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center dark:text-gray-300">
              por favor verifique se a música já não foi criada
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col bg-white dark:bg-gray-700 border dark:border-none shadow-md rounded-md p-6 sm:p-8 space-y-3 sm:space-y-5"
          >
            <div className="field">
              <label>
                Música
                <div className="flex space-x-3">
                  <input {...register('name')} type="text" />
                  <button
                    type="button"
                    onClick={openSearch}
                    className="btn-info group mt-1 relative flex justify-center items-center px-3 rounded-md"
                  >
                    <IoFlash className="text-lg" />
                  </button>
                </div>
              </label>
            </div>

            <div className="field">
              <label>
                Artista
                <input {...register('author')} type="text" />
              </label>
            </div>

            <div className="field">
              <label>
                Gênero
                <select {...register('gender')}>
                  <option value="" disabled selected hidden>
                    Selecionar Gênero
                  </option>
                  {genders.map((gender) => (
                    <option value={gender} key={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex space-x-3">
              <div className="field">
                <label className="field-label" htmlFor="linkCifra">
                  CifraClub
                  <input
                    type="url"
                    {...register(`linkCifra`)}
                    id="linkCifra"
                    className="field-input"
                  />
                </label>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="linkYoutube">
                  Youtube
                  <input
                    type="url"
                    {...register(`linkYoutube`)}
                    id="linkYoutube"
                    className="field-input"
                  />
                </label>
              </div>
            </div>

            <div>
              <Divider text="Tonalidade da música" />
              <div className="flex space-x-3 mt-4">
                {ministriesNames.map((ministry) => (
                  <div className="field" key={ministry}>
                    <label className="field-label" htmlFor={ministry}>
                      {ministry}
                      <input
                        type="text"
                        {...register(`tone-${ministry}`)}
                        id={ministry}
                        className="field-input"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Link href="/" passHref>
                <button type="button" className="btn btn-secondary">
                  Cancelar
                </button>
              </Link>
              <button type="submit" className="btn btn-primary">
                Criar
              </button>
            </div>
          </form>
        </div>
        <SearchMusic
          close={closeSearch}
          setValue={setValue}
          isOpen={isSearch}
        />
      </div>
    </Main>
  );
};

export default CreateMusic;
