import { render } from '@testing-library/react';
import AddAction, { onClick } from './index';
import { enableFetchMocks } from 'jest-fetch-mock';

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
  it('Adds an action', async () => {
    enableFetchMocks();
    Object.defineProperty(global, 'document', {
      getElementById: jest.fn(id => {
        return 'text';
      })
    });

    const expectedResponse = { id: '1', firstName: 'James', lastName: 'Bond' };
    fetch.mockResponse(JSON.stringify(expectedResponse));

    const action = await onClick({ id: '1' });
    // expect(fetch).toHaveBeenCalledWith(
    //   expect.stringContaining('/plans/1/action')
    // );
    expect(action).toStrictEqual(expectedResponse);
  });
});
