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
    it('renders the goal summary if goal exists', () => {
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

    it('renders the add goal form if goal is falsy', () => {
      const plan = { id: '1', firstName: 'John', lastName: 'Musk' };
      const { getByLabelText } = render(<PlanSummary plan={plan} />);
      expect(getByLabelText('Goal')).toBeInTheDocument();
    });

    it('renders the legal text if useAsPhp is true', () => {
      const plan = {
        id: '1',
        firstName: 'John',
        lastName: 'Musk',
        goal: {
          useAsPhp: true
        }
      };
      const { container } = render(<PlanSummary plan={plan} />);
      expect(container.querySelector('.legal-text')).toBeInTheDocument();
    });

    it('does not render legal text if useAsPhp is false', () => {
      const plan = {
        id: '1',
        firstName: 'John',
        lastName: 'Musk',
        goal: {
          useAsPhp: false
        }
      };
      const { container } = render(<PlanSummary plan={plan} />);
      expect(container.querySelector('.legal-text')).not.toBeInTheDocument();
    });
  });

  describe('adding an action', () => {
    it('does not render an action if goal does not exist', () => {
      const plan = {
        id: '1',
        firstName: 'Mr',
        lastName: 'Don'
      };
      const { queryByText } = render(<PlanSummary plan={plan} />);

      expect(queryByText('Our Actions')).toBeNull();
    });

    it('renders the add action form if goal exists', () => {
      const plan = {
        id: '1',
        firstName: 'Mr',
        lastName: 'Don',
        goal: { text: 'text' }
      };

      const { getByText } = render(<PlanSummary plan={plan} />);
      expect(getByText('Our Actions')).toBeInTheDocument();
    });
  });
});
