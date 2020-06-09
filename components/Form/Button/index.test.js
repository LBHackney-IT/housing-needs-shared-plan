import { render, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders a button', () => {
    const buttonText = 'My Button';
    const { getByText } = render(<Button text={buttonText} />);
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('performs an action onClick', () => {
    const buttonText = 'My Button';
    const myAction = jest.fn();
    const { getByText } = render(
      <Button text={buttonText} onClick={myAction} />
    );
    fireEvent(
      getByText(buttonText),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(myAction).toHaveBeenCalled();
  });

  it('can render a secondary button', () => {
    const buttonText = 'My Button';
    const myAction = jest.fn();
    const { getByText } = render(
      <Button text={buttonText} onClick={myAction} isSecondary={true} />
    );
    expect(getByText(buttonText).className).toContain(
      'govuk-button--secondary'
    );
  });
});
