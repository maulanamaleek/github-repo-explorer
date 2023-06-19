import { useEffect, useState } from 'react';

import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import './style.scss';

interface ISearchFormProps {
  onClick: (val: string) => void;
}

const SearchForm = ({
  onClick
}: ISearchFormProps) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log({ username })
  }, [username])
  return (
    <div className="search-form">
      <TextInput
        value={username}
        placeholder='Enter Username'
        handleChange={setUsername}
      />

      <Button handleClick={() => onClick(username)}>
        Search
      </Button>
    </div>
  )
}

export default SearchForm