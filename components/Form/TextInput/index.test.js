import { render } from '@testing-library/react';
import TextInput from './index';

describe('TextInput', () => {
  it('renders a text input', () => {
    const inputName = 'my-text-input';
    const inputLabel = 'My Input';
    const { getByLabelText } = render(
      <TextInput name={inputName} label={inputLabel} />
    );

    const labelRegex = new RegExp(`\s*${inputLabel}\s*`);
    const input = getByLabelText(labelRegex);

    expect(input).toBeInTheDocument();
    expect(input.id).toEqual(inputName);
    expect(input.name).toEqual(inputName);
  });
});
