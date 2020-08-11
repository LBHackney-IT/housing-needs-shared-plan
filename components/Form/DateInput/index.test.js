import { fireEvent, render } from '@testing-library/react';
import DateInput from './index';

describe('DateInput', () => {
  const inputName = 'my-date';

  it('renders the day input', () => {
    const { getByTestId } = render(<DateInput name={inputName} />);
    const dayInput = getByTestId('day-test');
    expect(dayInput).toBeInTheDocument();
    expect(dayInput.id).toEqual(`${inputName}-day`);
    expect(dayInput.name).toEqual(`${inputName}-day`);
  });

  it('renders the month input', () => {
    const { getByTestId } = render(<DateInput name={inputName} />);
    const monthInput = getByTestId('month-test');

    expect(monthInput).toBeInTheDocument();
    expect(monthInput.id).toEqual(`${inputName}-month`);
    expect(monthInput.name).toEqual(`${inputName}-month`);
  });

  it('renders the year input', () => {
    const { getByTestId } = render(<DateInput name={inputName} />);
    const yearInput = getByTestId('year-test');

    expect(yearInput).toBeInTheDocument();
    expect(yearInput.id).toEqual(`${inputName}-year`);
    expect(yearInput.name).toEqual(`${inputName}-year`);
  });

  it('renders a title', () => {
    const inputTitle = 'My Date';
    const { getByText } = render(
      <DateInput name={inputName} title={inputTitle} />
    );
    const title = getByText(inputTitle);

    expect(title).toBeInTheDocument();
  });

  it('renders a hint if a hint was provided', () => {
    const { container } = render(
      <DateInput name={inputName} hint="Agreed date" />
    );
    const hint = container.querySelector(`#${inputName}-hint`);

    expect(hint).toBeInTheDocument();
  });

  it('does not render a hint if hint was not provided', () => {
    const { container } = render(<DateInput name={inputName} />);
    const hint = container.querySelector(`#${inputName}-hint`);

    expect(hint).not.toBeInTheDocument();
  });

  it('performs an action onChange', () => {
    let day = -1;
    let month = -1;
    let year = -1;
    const myAction = jest.fn(e => {
      if (e.target.name.includes('day')) day = e.target.value;
      if (e.target.name.includes('month')) month = e.target.value;
      if (e.target.name.includes('year')) year = e.target.value;
    });
    const { getByTestId } = render(
      <DateInput name={inputName} onChange={myAction} />
    );

    fireEvent.change(getByTestId('day-test'), {
      target: { value: 12 }
    });
    fireEvent.change(getByTestId('month-test'), {
      target: { value: 10 }
    });
    fireEvent.change(getByTestId('year-test'), {
      target: { value: 2021 }
    });

    expect(day).toEqual('12');
    expect(month).toEqual('10');
    expect(year).toEqual('2021');
  });

  it('shows an error message if hasError is set to true', () => {
    const { container, getByTestId } = render(
      <DateInput name={inputName} hasError={true} />
    );

    expect(container.querySelector('.govuk-error-message')).toBeInTheDocument();
  });

  it('sets the day input value', () => {
    const { getByTestId } = render(<DateInput day={20} />);
    expect(getByTestId('day-test').value).toEqual('20');
  });

  it('sets the month input value', () => {
    const { getByTestId } = render(<DateInput month={10} />);
    expect(getByTestId('month-test').value).toEqual('10');
  });

  it('sets the year input value', () => {
    const { getByTestId } = render(<DateInput year={2030} />);
    expect(getByTestId('year-test').value).toEqual('2030');
  });
});
