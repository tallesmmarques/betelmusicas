import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoClose, IoSearch } from 'react-icons/io5';

import ResultsList from './resultsList';

interface Props {
  isOpen: boolean;
  close: () => void;
  setValue: (name: string, value: any) => void;
}
interface FormData {
  search: string;
}

const SearchMusic: React.FC<Props> = ({ isOpen, close, setValue }) => {
  const [isReady, setIsReady] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [results, setResults] = useState<
    {
      id: number;
      name: string;
      link: string;
    }[]
  >();
  const [selected, setSelected] = useState<number>();
  const { register, handleSubmit } = useForm<FormData>();
  const apiCifra = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CIFRA_URL,
  });

  useEffect(() => {
    setIsSearch(false);
    setIsReady(false);
    setIsFilling(false);
  }, []);

  const onSubmit = (data: FormData) => {
    setIsSearch(true);
    apiCifra
      .get('search', {
        params: { q: data.search },
      })
      .then((res) => {
        setResults(res.data.data);
        setIsSearch(false);
        setIsReady(true);
      });
  };
  const handleFill = () => {
    setIsFilling(true);
    const selectedMusic = results?.find((r) => r.id === selected);
    apiCifra
      .get('getmusic', { params: { link: selectedMusic?.link } })
      .then(({ data }) => {
        setValue('name', data.name);
        setValue('author', data.author);
        setValue('linkCifra', data.linkCifra);
        setValue('linkYoutube', data.linkYoutube);
        setIsFilling(false);
        close();
      })
      .catch(() => {
        setIsFilling(false);
      });
  };

  return isOpen ? (
    <div className=" h-screen w-full fixed left-0 top-0">
      <div
        className="bg-black bg-opacity-50 h-screen w-full flex items-start
        justify-center overflow-y-scroll pt-12 pb-24"
      >
        <div className="bg-white rounded-md shadow-lg mx-auto w-11/12 md:w-1/3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold flex-1 text-gray-900 px-4 py-4 text-xl">
              Pesquisar por Música
            </h3>
            <button className="text-gray-900 text-xl p-2" onClick={close}>
              <IoClose />
            </button>
          </div>
          <div className="p-4 text-gray-900">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="field">
                <label>
                  Digite o nome da música
                  <div className="flex space-x-1">
                    <input {...register('search')} required type="text" />
                    <button
                      type="submit"
                      className="btn-primary group mt-1 relative flex justify-center items-center px-3 rounded-md"
                    >
                      {isSearch ? (
                        <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                      ) : (
                        <IoSearch className="text-lg" />
                      )}
                    </button>
                  </div>
                </label>
              </div>
            </form>

            {results !== undefined && results.length > 0 && (
              <ResultsList
                results={results}
                setSelected={(data) => {
                  setSelected(data);
                  setIsReady(true);
                }}
              />
            )}
          </div>
          <div className="flex w-full space-x-3 p-4">
            <button onClick={close} className="btn btn-secondary">
              Cancelar
            </button>
            <button
              onClick={handleFill}
              className={`btn ${isReady ? 'btn-primary' : 'btn-none'}`}
              disabled={!isReady}
            >
              {isFilling ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 self-center" />
                  Preenchendo...
                </>
              ) : (
                'Preencher'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default SearchMusic;
