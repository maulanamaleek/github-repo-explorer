
import Accordion from '../../components/Accordion';
import { Wrapper, render, screen } from '../testingUtils';

describe('Component - Accordion', () => {
  it('Should render Accordion & expand children', async () => {
    render(
      <Wrapper>
        <Accordion
          title="maulanamaleek"
          repoUrl="https://api.github.com/users/maulanamaleek/repos"
        />
      </Wrapper>
    )

    await new Promise((r) => setTimeout(r, 2000))

    const elem = screen.getByTestId('accordion');
    const expand = screen.getByTestId('accordion-icon');

    expand.click();
    await new Promise((r) => setTimeout(r, 2000))
    screen.logTestingPlaygroundURL();
    screen.debug();

    const children = screen.getByTestId('accordion-children');

    expect(elem).toBeVisible();
    expect(children).toBeVisible();
  })
})