import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Accordion from '../../components/Accordion';
import { EError, IUserSearchResponse } from '../../types';
import { handleApiRateLimit } from '../../utils/api';
import Loading from '../../components/Loading';

import './style.scss';
import ErrorBox from '../../components/ErrorBox';
import { QUERY_KEY } from '../../constants';

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
  const { data, isLoading, isError, error, refetch } = useQuery<IUserSearchResponse>({
    queryKey: [QUERY_KEY.GITHUB_USER, value],
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

      if (!data) {
        throw new Error(EError.FETCH_ERROR);
      }

      handleApiRateLimit(data, () => {
        throw new Error(EError.RATE_LIMIT)
      })

      return data
    }
  })


  return (
    <div className="main main--flex">
      <TextInput
        value={username}
        placeholder='Enter Username'
        handleChange={setUsername}
      />

      <Button handleClick={refetch}>
        Search
      </Button>

      {username ? <p>Showing Results for: "{username}"</p> : null}

      {isLoading && <Loading />}

      {isError ? (
        <ErrorBox error={error} />
      ) : (
        data?.items?.map((i) => (
          <Accordion
            key={i.id}
            title={i.login}
            repoUrl={i.repos_url}
          />
        ))
      )}

    </div>
  )
}

export default Main