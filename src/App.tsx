
import Main from './pages/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ONE_MINUTE, isDev } from './constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      staleTime: 5 * ONE_MINUTE
    }
  }
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
      {isDev && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}

export default App
