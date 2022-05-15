// import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import UserProvider from '../utils/context/userContext';
import {
  QueryClient,
  QueryClientProvider,
  // ReactQueryDevtools,
} from 'react-query';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import 'antd/dist/antd.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const progress = new ProgressBar({
  size: 4,
  color: '#2563eb',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);

Router.events.on('routeChangeComplete', progress.finish);

Router.events.on('routeChangeError', progress.finish);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
