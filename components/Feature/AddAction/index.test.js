import { render } from '@testing-library/react';
import AddAction from './index';
import { enableFetchMocks } from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { getHackneyToken } from 'lib/utils/cookie';
jest.mock('lib/utils/cookie');

describe('AddAction', () => {
  it('renders the add action form', () => {
    const { getByLabelText } = render(<AddAction />);

    expect(getByLabelText('Summary')).toBeInTheDocument();
    expect(getByLabelText('Full description(optional)')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
  });
});

describe('OnClick', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('Adds an action', async () => {
    enableFetchMocks();
    const token = 'blah';
    getHackneyToken.mockReturnValue(token);
    const expectedRequest = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        summary: 'summary',
        description: 'description',
        dueDate: { day: 1, month: 1, year: 1991 }
      })
    };
    const expectedResponse = { id: '1', firstName: 'James', lastName: 'Bond' };
    fetch.mockResponse(JSON.stringify(expectedResponse));
    const { getByLabelText, getByText } = render(
      <AddAction updatePlan={jest.fn()} id="1" />
    );
    await userEvent.type(getByLabelText('Summary'), 'summary');
    await userEvent.type(
      getByLabelText('Full description(optional)'),
      'description'
    );
    await userEvent.type(getByLabelText('Day'), '01');
    await userEvent.type(getByLabelText('Month'), '01');
    await userEvent.type(getByLabelText('Year'), '1991');
    await getByText('Add to plan').click();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/plans/1/action'),
      expect.objectContaining(expectedRequest)
    );
  });
});
