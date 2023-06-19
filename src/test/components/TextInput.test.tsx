
import TextInput from '../../components/TextInput';
import { render, screen } from '../testingUtils';

describe('Component - TextInput', () => {
  it('Should render TextInput', async () => {
    render(
      <TextInput value="sample" handleChange={vi.fn()} />
    )

    const elem = screen.getByTestId('text-input');
    const text = await screen.findByDisplayValue('sample');
    screen.logTestingPlaygroundURL();

    expect(elem).toBeVisible();
    expect(text).toBeVisible();
  })
})