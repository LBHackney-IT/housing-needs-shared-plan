import Token from './token';
import { ArgumentError } from '.';

describe('Token', () => {
  it('sets the created date', async () => {
    const token = new Token({ token: 'TOKEN' });

    expect(token.sharedDate).toEqual(null);
  });

  it('throws an error if no token', () => {
    expect(() => new Token({})).toThrow(new ArgumentError('no token'));
  });

  it('gets the correct shared value', () => {
    const token = new Token({ token: 'TOKEN' });

    expect(token.shared).toEqual(false);
    token.sharedDate = new Date().toISOString();
    expect(token.shared).toEqual(true);
  });
});
