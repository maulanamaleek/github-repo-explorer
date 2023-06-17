
import { useEffect, useState } from 'react';
import TextInput from '../../components/TextInput';
import './style.scss';
import Button from '../../components/Button';
import Accordion from '../../components/Accordion';
import { useQuery } from '@tanstack/react-query';
import { IUserSearchResponse } from '../../types';
import { handleApiRateLimit } from '../../utils/api';

const useDebounce = (val: string, timeout: number) => {
  const [value, setValue] = useState('')
  useEffect(() => {
    const t = setTimeout(() => {
      setValue(val)
    }, timeout)

    return () => clearTimeout(t)
  }, [val, timeout])

  return value
}

const Main = () => {
  const [username, setUsername] = useState('');
  const value = useDebounce(username, 500);
  const { data, isLoading, isError } = useQuery<IUserSearchResponse>({
    queryKey: ['github', value],
    queryFn: async ({ }) => {
      if (!value) {
        return {};
      }
      const res = await fetch(`https://api.github.com/search/users?q=${value}&page=1&per_page=5`, {
        headers: {
          'Authorization': import.meta.env.GITHUB_SECRET
        }
      })

      const data = await res.json();

      handleApiRateLimit(data, () => {
        throw new Error('Rate Limited')
      })

      return data
    }
  })


  if (isError) {
    return <h1>Error</h1>
  }

  console.log({ data })

  return (
    <div className="main main--flex">
      <TextInput
        value={username}
        placeholder='Enter Username'
        handleChange={setUsername}
      />

      <Button handleClick={() => { }}>
        Search
      </Button>

      {username ? <p>Showing Results for: "{username}"</p> : null}

      {isLoading && <h1>Loading...</h1>}

      {data?.items?.map((i) => (
        <Accordion
          key={i.id}
          title={i.login}
          repoUrl={i.repos_url}
        />

      ))}

    </div>
  )
}

export default Main