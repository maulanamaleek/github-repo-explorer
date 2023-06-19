import ErrorBox from '../../components/ErrorBox';
import { ERROR_MESSAGES } from '../../constants';
import { E_Error } from '../../types';
import { render, screen } from '../testingUtils';

describe('Component - ErrorBox', () => {
  it('Should render ErrorBox', async () => {
    const errMsg = 'Error Sample';
    render(
      <ErrorBox customMessage={errMsg} />
    )

    const elem = screen.getByTestId('error-box');
    const text = await screen.findByText(errMsg);

    expect(elem).toBeVisible();
    expect(text).toBeVisible();
  })

  it('Should return correct error message', async () => {
    const errMsg = new Error(E_Error.FETCH_ERROR);
    render(
      <ErrorBox error={errMsg} />
    )

    const elem = screen.getByTestId('error-box');
    const text = await screen.findByText(ERROR_MESSAGES[E_Error.FETCH_ERROR]);

    expect(elem).toBeVisible();
    expect(text).toBeVisible();
  })
})