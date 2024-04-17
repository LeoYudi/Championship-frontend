import { NotificationProvider } from '@/contexts/notification'
import type { AppProps } from 'next/app'

import './global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  )
}