import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

const ResultsList: React.FC<{
  results: { id: number; name: string; link: string }[];
  setSelected: (data: number) => void;
}> = ({ results, setSelected }) => {
  const { register, watch } = useForm();

  useEffect(() => {
    const subscription = watch((value) => setSelected(Number(value.music)));
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setSelected]);

  return (
    <form className="mt-6 space-y-2">
      {results.map((music) => {
        const [title, author] = music.name.split(' - ');
        return (
          <div
            key={music.id}
            className="p-2 border dark:border-none dark:bg-gray-600 shadow-sm rounded"
          >
            <label className="flex items-center">
              <input
                type="radio"
                {...register('music')}
                className="mr-3"
                value={music.id}
              />
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {author}
                </p>
              </div>
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default ResultsList;
