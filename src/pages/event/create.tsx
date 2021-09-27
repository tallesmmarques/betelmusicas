import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Meta } from '../../layout/Meta';
import { fetcher } from '../../services/api';
import { Main } from '../../templates/Main';
import { IMusic } from '../../types';

interface Props {
  musics: IMusic[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const musics: IMusic[] = await fetcher('music');
  return {
    props: {
      musics,
    },
    revalidate: 10,
  };
};

const CreateEvent = ({
  musics,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main
      meta={
        <Meta
          title="Criar novo evento"
          description="Criar novo evento para Betel Músicas"
        />
      }
    >
      <div>
        Criar Evento
        {musics.map((music) => (
          <div key={music.id}>
            <p>{music.name}</p>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default CreateEvent;
