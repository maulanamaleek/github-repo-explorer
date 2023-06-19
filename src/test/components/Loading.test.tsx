import Loading from '../../components/Loading'
import { render, screen } from '../testingUtils';

describe('Component - Loading', () => {
  it('Should render Loading', () => {
    render(<Loading />)

    const elem = screen.getByTestId('loader')
    expect(elem).toBeVisible();
  })
})