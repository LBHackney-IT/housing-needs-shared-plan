import { render } from '@testing-library/react';
import AddGoal from './index';

describe('AddGoal', () => {
  it('renders the add goal form', () => {
    const { getByLabelText } = render(<AddGoal />);

    expect(getByLabelText('Goal')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
    expect(getByLabelText('Use as a PHP')).toBeInTheDocument();
  });
});
