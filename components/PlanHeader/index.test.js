/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import PlanHeader from './index';

describe('Plan Header', () => {
  it('renders a plan header', () => {
    const { getByText } = render(
      <PlanHeader firstName="Carl" lastName="the intern" />
    );

    expect(getByText("Carl the intern's shared plan")).toBeInTheDocument();
  });
});
