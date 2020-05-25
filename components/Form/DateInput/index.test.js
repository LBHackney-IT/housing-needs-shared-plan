import { render } from '@testing-library/react';
import DateInput from './index';

describe('DateInput', () => {
  const inputName = 'my-date';

  it('renders the day input', () => {
    const { getByLabelText } = render(<DateInput name={inputName} />);
    const dayInput = getByLabelText(/\s*Day\s*/);

    expect(dayInput).toBeInTheDocument();
    expect(dayInput.id).toEqual(`${inputName}-day`);
    expect(dayInput.name).toEqual(`${inputName}-day`);
  });

  it('renders the month input', () => {
    const { getByLabelText } = render(<DateInput name={inputName} />);
    const dayInput = getByLabelText(/\s*Month\s*/);

    expect(dayInput).toBeInTheDocument();
    expect(dayInput.id).toEqual(`${inputName}-month`);
    expect(dayInput.name).toEqual(`${inputName}-month`);
  });

  it('renders the year input', () => {
    const { getByLabelText } = render(<DateInput name={inputName} />);
    const dayInput = getByLabelText(/\s*Year\s*/);

    expect(dayInput).toBeInTheDocument();
    expect(dayInput.id).toEqual(`${inputName}-year`);
    expect(dayInput.name).toEqual(`${inputName}-year`);
  });

  it('renders a title', () => {
    const inputTitle = 'My Date';
    const { getByText } = render(
      <DateInput name={inputName} title={inputTitle} />
    );
    const title = getByText(inputTitle);

    expect(title).toBeInTheDocument();
  });

  it('renders a hint if showHint is true', () => {
    const { container } = render(
      <DateInput name={inputName} showHint={true} />
    );
    const hint = container.querySelector(`#${inputName}-hint`);

    expect(hint).toBeInTheDocument();
  });

  it('does not render a hint if showHint is falsy', () => {
    const { container } = render(<DateInput name={inputName} />);
    const hint = container.querySelector(`#${inputName}-hint`);

    expect(hint).not.toBeInTheDocument();
  });
});
