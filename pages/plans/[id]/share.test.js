import { enableFetchMocks } from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Share from 'pages/plans/[id]/share';

describe('Share', () => {
  //   const expectedResponse = {
  //     id: '1',
  //     firstName: 'James',
  //     lastName: 'Bond',
  //     goal: { text: 'my goal' }
  //   };

  //   beforeEach(() => {
  //     enableFetchMocks();
  //     fetch.mockResponse(JSON.stringify(expectedResponse));
  //   });

  it('renders correct title', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Test',
      goal: { text: 'my goal' },
      numbers: [],
      emails: []
    };
    const { getByText } = render(<Share plan={plan} />);
    expect(getByText("Bob Test's shared plan")).toBeInTheDocument();
  });

  it('does renders share table', async () => {
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
      },
      numbers: ['sample_nr'],
      emails: ['sample_email']
    };
    const { getByText } = render(<Share plan={plan} />);

    expect(getByText('Share with collaborators')).toBeInTheDocument();
    expect(getByText('Collaborators')).toBeInTheDocument();
    expect(getByText('Share by SMS')).toBeInTheDocument();
    expect(getByText('sample_nr')).toBeInTheDocument();
    expect(getByText('sample_email')).toBeInTheDocument();
    expect(getByText('Edit plan')).toBeInTheDocument();
  });
});
