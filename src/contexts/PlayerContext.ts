//importando createContext de react
import { createContext } from 'react'

//tipagem somente do que será utilizado do episódio no player
type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

//tipagem da lista de episódios
type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    play: (episode: Episode) => void;
}

//criando e exportando o PlayerContext e atribuindo a este contexto o formato de PlayerContextData
export const PlayerContext = createContext({} as PlayerContextData);