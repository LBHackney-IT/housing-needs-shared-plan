import ActionsList from './index';
import { render } from '@testing-library/react';

describe('<ActionsList />', () => {
  const onActionToggled = jest.fn();

  const component = (
    <ActionsList
      actions={[
        {
          id: 'PPBqWA9',
          summary: 'Run a test',
          description: 'This will check if it works',
          dueDate: '2020-05-26T09:00:00+0000',
          isCompleted: true
        },
        {
          id: '23TplPdS',
          summary: 'Complete this action',
          dueDate: '2020-05-26T09:00:00+0000',
          isCompleted: false
        }
      ]}
      onActionToggled={onActionToggled}
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

  it('displays a checkbox with the "isCompleted" state', () => {
    const { getAllByTestId } = render(component);
    expect(getAllByTestId('action-checkbox')[0]).toHaveAttribute('checked');
    expect(getAllByTestId('action-checkbox')[1]).not.toHaveAttribute('checked');
  });

  it('triggers "onActionToggled" when checkbox toggled', () => {
    const { getAllByTestId } = render(component);
    const checkbox = getAllByTestId('action-checkbox')[0];

    checkbox.click();

    expect(onActionToggled).toHaveBeenCalledWith({
      actionId: 'PPBqWA9',
      isCompleted: false
    });
  });
});
