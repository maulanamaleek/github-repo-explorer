
import { ERROR_MESSAGES } from '../../constants';
import { E_Error } from '../../types';

import './style.scss';

interface IErrorBoxProps {
  error?: unknown;
  customMessage?: string;
}

const ErrorBox = ({
  error,
  customMessage
}: IErrorBoxProps) => {
  if (customMessage) {
    return (
      <div data-testid="error-box" className="error-box">
        <p>{customMessage}</p>
      </div>
    )
  }

  // return null if error is unknown
  if (!error || !(error instanceof Error)) {
    return null;
  }

  const errKey = Object.keys(E_Error);

  if (!errKey.includes(error.message)) {
    return (
      <div data-testid="error-box" className="error-box">
        <p>{ERROR_MESSAGES.DEFAULT}</p>
      </div>
    )
  }

  return (
    <div data-testid="error-box" className="error-box">
      <p>{ERROR_MESSAGES[error.message as E_Error]}</p>
    </div>
  )
}

export default ErrorBox