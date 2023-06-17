
import Main from './pages/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 500
    }
  }
});

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Main />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
