import getPlanApi from '../../../pages/api/getPlanApi';
import getPlan from '../../../lib/libDependencies';

describe('getPlan Endpoint', () => {
  it('Can get a plan', async () => {
    const res = {
      json: jest.fn(x => {
        return x;
      })
    };

    const req = {
      params: {
        id: '1'
      }
    };

    const config = {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'foo',
      secretAccessKey: 'bar'
    };

    getPlan.execute = jest.fn();

    const response = await getPlanApi(req, res);

    expect(getPlan.execute).toEqual(200);

    expect(res.json).toHaveBeenCalledWith({
      firstName: 'Name',
      id: 1,
      lastName: 'Too'
    });
    expect(res.statusCode).toEqual(200);
  });
});
//errros
