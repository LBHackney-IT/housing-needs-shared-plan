import { enableFetchMocks } from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import PlanSummary from 'pages/plans/[id]';

describe('PlanSummary', () => {
  const expectedResponse = {
    id: '1',
    firstName: 'James',
    lastName: 'Bond',
    goal: { text: 'my goal' }
  };

  beforeEach(() => {
    enableFetchMocks();
    fetch.mockResponse(JSON.stringify(expectedResponse));
  });

  it('renders correct title', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Test',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("Bob Test's shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names that end with "S"', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Tes',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("Bob Tes' shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names that have special characters', () => {
    const plan = {
      id: '1',
      firstName: 'X Æ A-12',
      lastName: 'Musk',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("X Æ A-12 Musk's shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names with an empty string for last Name', () => {
    const plan = {
      id: '1',
      firstName: 'Dan',
      lastName: '',
      goal: { text: 'my goal' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("Dan's shared plan")).toBeInTheDocument();
  });

  it('fetches plan from the correct url and constructs correct props', async () => {
    const props = await PlanSummary.getInitialProps({ query: { id: '1' } });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/plans/1'),
      expect.any(Object)
    );
    expect(props.initialPlan).toStrictEqual(expectedResponse);
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
      const { getByText } = render(<PlanSummary initialPlan={plan} />);
      expect(getByText(goalText)).toBeInTheDocument();
    });

    it('renders the add goal form if goal is falsy', () => {
      const plan = { id: '1', firstName: 'John', lastName: 'Musk' };
      const { getByLabelText } = render(<PlanSummary initialPlan={plan} />);
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
      const { container } = render(<PlanSummary initialPlan={plan} />);
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
      const { container } = render(<PlanSummary initialPlan={plan} />);
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
      const { queryByText } = render(<PlanSummary initialPlan={plan} />);

      expect(queryByText('Full description(optional)')).not.toBeInTheDocument();
    });

    it('renders the add action form', async () => {
      const plan = {
        id: '1',
        firstName: 'Mr',
        lastName: 'Don',
        goal: { text: 'text' }
      };

      const { getByText } = render(<PlanSummary initialPlan={plan} />);
      await getByText('Add action').click();
      expect(getByText('Full description(optional)')).toBeInTheDocument();
    });
  });

  describe('Action list', () => {
    it('does not render an action list if there are no actions', () => {
      const plan = {
        id: '1',
        firstName: 'Mr',
        lastName: 'Don'
      };
      const { queryByText } = render(<PlanSummary initialPlan={plan} />);

      expect(queryByText('Show details')).not.toBeInTheDocument();
    });

    it('renders an action list if there is an action', () => {
      const plan = {
        id: '1',
        firstName: 'Mr',
        lastName: 'Don',
        goal: {
          text: 'text',
          actions: [
            {
              dueDate: new Date(),
              summary: 'summary',
              description: 'description'
            }
          ]
        }
      };

      const { getByText, getAllByText } = render(
        <PlanSummary initialPlan={plan} />
      );
      expect(getByText('summary')).toBeInTheDocument();
      expect(getAllByText('Show details')[0]).toBeInTheDocument();
    });
  });
});
