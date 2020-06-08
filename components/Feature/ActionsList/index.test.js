import ActionsList from './index';
import { render } from '@testing-library/react';

describe('<ActionsList />', () => {
  const component = (
    <ActionsList
      actions={[
        {
          summary: 'Run a test',
          description: 'This will check if it works',
          dueDate: '2020-05-26T09:00:00+0000'
        }
      ]}
    />
  );

  it('displays the title of the action', () => {
    const { getByText } = render(component);
    expect(getByText('Run a test')).toBeInTheDocument();
  });

  it('displays the due date of the action', () => {
    const { getAllByText } = render(component);
    expect(getAllByText('26 May 2020')[0]).toBeInTheDocument();
  });

  it('shows the description if there is one', () => {
    const { container } = render(component);
    expect(container.querySelector('Details')).toBeInTheDocument();
  });

  it('hides the description if there is none', () => {
    const { container } = render(
      <ActionsList
        actions={[
          {
            summary: 'Run a test',
            dueDate: '2020-05-26T09:00:00+0000'
          }
        ]}
      />
    );
    expect(container.querySelector('Details')).not.toBeInTheDocument();
  });
});
