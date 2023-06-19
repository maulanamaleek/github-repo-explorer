import Button from '../../components/Button';
import { render, screen } from '../testingUtils';

describe('Component - Button', () => {
  it('Should render Button', async () => {
    render(
      <Button>
        Click Me!
      </Button>
    )

    const elem = screen.getByTestId('button');
    const text = await screen.findByText('Click Me!');

    expect(elem).toBeVisible();
    expect(text).toBeVisible();

  })

  it('Should click button correctly', () => {
    const mockFn = vi.fn();
    render(
      <Button handleClick={mockFn}>
        Click Me!
      </Button>
    )
    const elem = screen.getByTestId('button');
    elem.click();
    expect(mockFn).toBeCalled();
  })
})