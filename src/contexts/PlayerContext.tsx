//importando createContext de react
import { createContext, ReactNode, useContext, useState } from "react";

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
  hasPrevious: boolean;
  hasNext: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  isShuffling: boolean;
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  clearPlayerState : () => void;
  playNext: () => void;
  playPrevious: () => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
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
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);


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

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  
  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

  function playNext(){
    if(isShuffling){
      const nextEpisodeRamdomIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextEpisodeRamdomIndex);
    } else if(hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious(){
    if(hasPrevious){
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
        isLooping,
        isShuffling,
        togglePlay,
        toggleShuffle,
        toggleLoop,
        hasPrevious,
        setPlayingState,
        hasNext,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}