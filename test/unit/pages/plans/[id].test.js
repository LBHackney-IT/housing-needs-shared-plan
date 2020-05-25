import { enableFetchMocks } from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import PlanSummary from 'pages/plans/[id]';

describe('PlanSummary', () => {
  it('renders correct title', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Test',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary plan={plan} />);
    expect(getByText("Bob Test's shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names that end with "S"', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Tes',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary plan={plan} />);
    expect(getByText("Bob Tes' shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names that have special characters', () => {
    const plan = {
      id: '1',
      firstName: 'X Æ A-12',
      lastName: 'Musk',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary plan={plan} />);
    expect(getByText("X Æ A-12 Musk's shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names with an empty string for last Name', () => {
    const plan = {
      id: '1',
      firstName: 'Dan',
      lastName: '',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary plan={plan} />);
    expect(getByText("Dan's shared plan")).toBeInTheDocument();
  });

  it('fetches plan from the correct url and constructs correct props', async () => {
    enableFetchMocks();
    const expectedResponse = {
      id: '1',
      firstName: 'James',
      lastName: 'Bond',
      goal: { text: 'my goal' }
    };
    fetch.mockResponse(JSON.stringify(expectedResponse));
    const props = await PlanSummary.getInitialProps({ query: { id: '1' } });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/plans/1'));
    expect(props.plan).toStrictEqual(expectedResponse);
  });

  describe('adding a goal', () => {
    it('renders the add goal form if editGoal is true', () => {
      const plan = { id: '1', firstName: 'John', lastName: 'Musk', goal: {} };
      const { getByLabelText } = render(
        <PlanSummary plan={plan} editGoal={true} />
      );
      expect(getByLabelText('Goal')).toBeInTheDocument();
    });

    it('renders the goal summary if editGoal is falsy', () => {
      const goalText = 'Rule the world!';
      const plan = {
        id: '1',
        firstName: 'John',
        lastName: 'Musk',
        goal: { text: goalText }
      };
      const { getByText } = render(<PlanSummary plan={plan} />);
      expect(getByText(goalText)).toBeInTheDocument();
    });

    it('sets editGoal to true if goal is null', async () => {
      enableFetchMocks();
      const expectedResponse = {
        id: '1',
        firstName: 'James',
        lastName: 'Bond',
        goal: null
      };
      fetch.mockResponse(JSON.stringify(expectedResponse));
      const props = await PlanSummary.getInitialProps({ query: { id: '1' } });

      expect(props.editGoal).toBe(true);
    });
  });
});
