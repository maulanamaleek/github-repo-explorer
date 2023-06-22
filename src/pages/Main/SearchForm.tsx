import { useState } from 'react';

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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onClick(username)
  }


  return (
    <form className="search-form" onSubmit={onSubmit}>
      <TextInput
        value={username}
        placeholder='Enter Username'
        handleChange={setUsername}
      />

      <Button type="submit">
        Search
      </Button>
    </form>
  )
}

export default SearchForm