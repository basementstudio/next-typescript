import { AppProps } from 'next/app'
import 'css/global.css'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
