import AppContext from 'context/appContext'
import '../styles/globals.css'
import useInitialState from '@hooks/useInitialState'

function MyApp({ Component, pageProps }) {
  const initialState = useInitialState()
  return (
    <AppContext.Provider value={initialState}>
      <Component {...pageProps}/>
    </AppContext.Provider>
  )
}

export default MyApp
