import { render } from '@testing-library/react';
import Share from 'pages/plans/[id]/share';

describe('Share', () => {
  it('renders correct title', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Test',
      goal: { text: 'my goal' },
      numbers: [],
      emails: []
    };
    const { getByText } = render(<Share initialPlan={plan} />);
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
    const { getByText } = render(<Share initialPlan={plan} />);

    expect(getByText('sample_nr')).toBeInTheDocument();
    expect(getByText('sample_email')).toBeInTheDocument();
  });
});
