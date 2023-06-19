import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Accordion from '../../components/Accordion';
import { IUserSearchResponse } from '../../types';
import { getUserList } from '../../utils/api';
import Loading from '../../components/Loading';

import './style.scss';
import ErrorBox from '../../components/ErrorBox';
import { QUERY_KEY } from '../../constants';
import SearchForm from './SearchForm';

const Main = () => {
  const [username, setUsername] = useState('');
  const { data, isLoading, isError, error } = useQuery<IUserSearchResponse>({
    queryKey: [QUERY_KEY.GITHUB_USER, username],
    queryFn: getUserList
  })

  return (
    <div className="main main--flex">
      <SearchForm onClick={setUsername} />

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