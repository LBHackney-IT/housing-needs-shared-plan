import CheckAuth from '../../../lib/use-cases/check-auth';

describe('Check Auth Use Case', () => {
  it('should decode a token', () => {
    const jwt = { decode: jest.fn(() => ({ groups: [] })) };
    const token = 'xyz';
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    checkAuth.execute({ token });

    expect(jwt.decode).toHaveBeenCalledWith(token);
  });

  it('should return true if a user is in the allowed groups', () => {
    const allowedGroups = ['theGroup'];
    const jwt = { decode: jest.fn(() => ({ groups: ['theGroup'] })) };
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(true);
  });

  it('should return false if a user in not in the allowed groups', () => {
    const allowedGroups = ['theGroup'];
    const jwt = { decode: jest.fn(() => ({ groups: ['otherGroup'] })) };
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('a user can have more than one group', () => {
    const allowedGroups = ['firstGroup'];
    const jwt = {
      decode: jest.fn(() => ({ groups: ['firstGroup', 'secondGroup'] })),
    };
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(true);
  });

  it('should return false if decoded token is null', () => {
    const jwt = { decode: jest.fn(() => null) };
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('should return false if decoded token does not contain groups', () => {
    const jwt = { decode: jest.fn(() => ({})) };
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });
});
