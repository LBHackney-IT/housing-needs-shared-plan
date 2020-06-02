import { render } from '@testing-library/react';
import SharePlan from './index';

describe('Share plan', () => {
  it('renders the share plan options', () => {
    const plan = {
      goal: {}
    };
    const { getByText } = render(
      <SharePlan plan={plan} number="test_number" email="test_email" />
    );

    expect(getByText('Share with collaborators')).toBeInTheDocument();
    expect(getByText('Collaborators')).toBeInTheDocument();
    expect(getByText('Share by SMS')).toBeInTheDocument();
    expect(getByText('test_number')).toBeInTheDocument();
    expect(getByText('test_email')).toBeInTheDocument();
  });
});
