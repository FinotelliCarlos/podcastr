import '../styles/global.scss'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import styles from '../styles/app.module.scss'
import { PlayerContext } from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }) {
  return (
    //envolvendo o PlayerContext em toda a aplicação
    //é Obrigatório passar o valor a ser acessado por toda aplicação
    <PlayerContext.Provider value={'Carlos'}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
