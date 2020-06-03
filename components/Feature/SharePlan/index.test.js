import { render } from '@testing-library/react';
import SharePlan from './index';

describe('Share plan', () => {
  it('renders the share plan options', () => {
    const plan = {
      goal: {},
      numbers: ['test_number'],
      emails: ['test_email']
    };
    const { getByText } = render(<SharePlan plan={plan} />);

    expect(getByText('Share with collaborators')).toBeInTheDocument();
    expect(getByText('Collaborators')).toBeInTheDocument();
    expect(getByText('Share by SMS')).toBeInTheDocument();
    expect(getByText('test_number')).toBeInTheDocument();
    expect(getByText('test_email')).toBeInTheDocument();
  });
});
