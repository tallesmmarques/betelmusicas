export interface IMusic {
  id: number;
  name: string;
  author: string;
  gender: string;
  linkCifra: string;
  linkYoutube: string;
  ministriesInfo: [
    {
      id: number;
      ministry: string;
      tone: string;
      lastPlayed: string;
      timesPlayed: number;
    }
  ];
}

export interface IEvent {
  id: number;
  title: string;
  date: string;
  ministry: string;
  musics: IMusic[];
}
