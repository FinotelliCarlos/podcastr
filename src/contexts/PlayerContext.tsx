//importando createContext de react
import { createContext, ReactNode, useState } from "react";

//tipagem somente do que será utilizado do episódio no player
type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

//tipagem da lista de episódios
type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  playNext: () => void;
  playPrevious: () => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  tooglePlay: () => void;
  setPlayingState: (state: boolean) => void;
};

//criando e exportando o PlayerContext e atribuindo a este contexto o formato de PlayerContextData
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext(){
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if(nextEpisodeIndex < episodeList.length){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious(){
    if(currentEpisodeIndex > 0){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    //envolvendo o PlayerContext em toda a aplicação
    //é Obrigatório passar o valor a ser acessado por toda aplicação
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playNext,
        playPrevious,
        playList,
        isPlaying,
        tooglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
