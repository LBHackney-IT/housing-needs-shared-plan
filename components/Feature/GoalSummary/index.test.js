import { render } from '@testing-library/react';
import GoalSummary from './index';
import { getUsername } from 'lib/utils/token';
jest.mock('lib/utils/token');

describe('GoalSummary', () => {
  it('renders the goal summary', () => {
    const username = 'Matt';
    getUsername.mockReturnValue(username);
    const token = 'TOKEN';
    const text = 'this is a the goal';
    const targetReviewDate = '2022-10-20T00:00:00.000Z';
    const plan = {
      goal: {
        text,
        targetReviewDate
      }
    };
    const { getByText } = render(
      <GoalSummary hackneyToken={token} plan={plan} />
    );
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(username)).toBeInTheDocument();
    expect(getByText('20/10/2022')).toBeInTheDocument();
    expect(getUsername).toHaveBeenCalledWith(token);
  });
});
