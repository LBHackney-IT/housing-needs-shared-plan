import getPlanApi from '../../../pages/api/getPlanApi';

describe('getPlan Endpoint', () => {
  it('can get a plan', async () => {
    const req = {
      params: {
        id: ''
      }
    };

    const response = await getPlanApi(req, {});
  });
});
