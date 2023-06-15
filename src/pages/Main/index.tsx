
import { useState } from 'react';
import TextInput from '../../components/TextInput';
import './style.scss';
import Button from '../../components/Button';
import Accordion from '../../components/Accordion';

const Main = () => {
  const [username, setUsername] = useState('');

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

      <Accordion title={username} child={[]} />
    </div>
  )
}

export default Main