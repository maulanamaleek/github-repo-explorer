
import { ERROR_MESSAGES } from '../../constants';
import { EError } from '../../types';

import './style.scss';

interface IErrorBoxProps {
  error: unknown;
}

const ErrorBox = ({
  error
}: IErrorBoxProps) => {
  // return null if error is unknown
  if (!(error instanceof Error)) {
    return null;
  }

  const errKey = Object.keys(EError);

  if (!errKey.includes(error.message)) {
    return (
      <div className="error-box">
        <p>{ERROR_MESSAGES.DEFAULT}</p>
      </div>
    )
  }


  return (
    <div className="error-box">
      <p>{ERROR_MESSAGES[error.message as EError]}</p>
    </div>
  )
}

export default ErrorBox