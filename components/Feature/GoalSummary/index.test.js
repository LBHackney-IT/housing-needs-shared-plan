import { render } from '@testing-library/react';
import GoalSummary from './index';
import { getUsername } from 'lib/utils/cookie';
jest.mock('lib/utils/cookie');

describe('GoalSummary', () => {
  it('renders the goal summary', () => {
    const username = 'Matt';
    getUsername.mockReturnValue(username);
    const text = 'this is a the goal';
    const targetReviewDate = '2022-10-20T00:00:00.000Z';
    const plan = {
      goal: {
        text,
        targetReviewDate
      }
    };
    const { getByText } = render(<GoalSummary plan={plan} />);
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(username)).toBeInTheDocument();
    expect(getByText('20/10/2022')).toBeInTheDocument();
  });
});
