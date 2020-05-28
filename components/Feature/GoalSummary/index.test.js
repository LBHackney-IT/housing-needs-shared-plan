import { render } from '@testing-library/react';
import GoalSummary from './index';

describe('GoalSummary', () => {
  it('renders the goal summary', () => {
    const text = 'this is a the goal';
    const targetReviewDate = '2022-10-20T00:00:00.000Z';
    const goal = {
      text,
      targetReviewDate
    };
    const { getByText } = render(<GoalSummary goal={goal} />);
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText('20/10/2022')).toBeInTheDocument();
  });
});
