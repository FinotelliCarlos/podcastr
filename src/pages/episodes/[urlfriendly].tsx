import { GetStaticPaths, GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useRouter } from 'next/router'
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

type Episode = {
    id: String,
    title: String,
    thumbnail: String,
    members: String,
    duration: Number,
    durationAsString: String,
    url: String,
    description: String,
    publishedAt: String,
}

type EpisodeProps = {
    episode: Episode
}


export default function Episode({episode}: EpisodeProps){
    return (
        <h1>{episode.title}</h1>
    )
}

export const getStaticPaths:GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { urlfriendly } = ctx.params

    const { data } = await api.get(`/episodes/${urlfriendly}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration:Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
      };
    
    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, //atualização da pagina a cada 24 Horas
    }
}