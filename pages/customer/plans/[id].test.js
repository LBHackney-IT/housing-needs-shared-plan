import { enableFetchMocks } from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import CustomerPlanSummary from 'pages/plans/[id]';

describe('CustomerPlanSummary', () => {
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

  it('fetches plan from the correct url and constructs correct props', async () => {
    const props = await CustomerPlanSummary.getInitialProps({
      query: { id: '1' }
    });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/plans/1'),
      expect.any(Object)
    );
    expect(props.initialPlan).toStrictEqual(expectedResponse);
  });

  describe('Goal summary', () => {
    it('renders a goal summary', () => {
      const text = 'text';
      const targetReviewDate = '2022-10-20T00:00:00.000Z';
      const plan = {
        id: '1',
        firstName: 'Mr',
        lastName: 'Don',
        goal: {
          text,
          targetReviewDate
        }
      };
      const { getByText } = render(<CustomerPlanSummary initialPlan={plan} />);

      expect(getByText('20/10/2022')).toBeInTheDocument();
      expect(getByText(text)).toBeInTheDocument();
    });
  });

  describe('Action list', () => {
    it('does not render an action list if there are no actions', () => {
      const plan = {
        id: '1',
        firstName: 'Mr',
        lastName: 'Don'
      };
      const { queryByText } = render(
        <CustomerPlanSummary initialPlan={plan} />
      );

      expect(queryByText('Show details')).toBeNull();
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
              id: 'PPBqWA9',
              dueDate: new Date(),
              summary: 'summary',
              description: 'description'
            }
          ]
        }
      };

      const { getByText, getAllByText } = render(
        <CustomerPlanSummary initialPlan={plan} />
      );
      expect(getByText('summary')).toBeInTheDocument();
      expect(getAllByText('Show details')[0]).toBeInTheDocument();
    });
  });
});
