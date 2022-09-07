import { render } from '@testing-library/react';
import PlanHeader from './index';
/**
 * @jest-environment jsdom
 */
describe('Plan Header', () => {
  it('renders a plan header', () => {
    const { getByText } = render(
      <PlanHeader firstName="Carl" lastName="the intern" />
    );

    expect(getByText("Carl the intern's shared plan")).toBeInTheDocument();
  });
});
