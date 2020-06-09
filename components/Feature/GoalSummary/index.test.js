import { render } from '@testing-library/react';
import GoalSummary from './index';

describe('GoalSummary', () => {
  it('renders the goal summary', () => {
    const username = 'Matt';
    const text = 'this is a the goal';
    const targetReviewDate = '2022-10-20T00:00:00.000Z';
    const plan = {
      goal: {
        text,
        targetReviewDate,
        agreedWithName: username
      }
    };
    const { getByText } = render(<GoalSummary plan={plan} />);
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(username)).toBeInTheDocument();
    expect(getByText('20/10/2022')).toBeInTheDocument();
  });
});
