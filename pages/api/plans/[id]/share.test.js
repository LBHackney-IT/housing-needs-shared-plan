// import { endpoint } from 'pages/api/plans/[id]/share';
// import { ArgumentError } from 'lib/domain';
//
xit('re-enable this test suite', () => {
  expect(1).toEqual(1);
})
// describe('Share plan', () => {
//   const planId = '2';
//   const number = '000000';
//
//   let json;
//   let res;
//
//   beforeEach(() => {
//     json = jest.fn();
//     res = {
//       status: jest.fn(() => {
//         return { json };
//       })
//     };
//   });
//
//   const req = {
//     method: 'GET',
//     query: { id: planId },
//     body: {
//       collaborator: {
//         number
//       },
//       customerPlanUrl: 'url'
//     },
//     headers: { authorization: 'Bearer token' }
//   };
//
//   it('can share a plan', async () => {
//     const planToken = 'random_string';
//     const expectedResponse = expect.objectContaining({ planToken });
//
//     const sharePlan = {
//       execute: jest.fn(() => expectedResponse)
//     };
//
//     await endpoint({ sharePlan })(req, res);
//
//     expect(sharePlan.execute).toHaveBeenCalledWith({
//       planId,
//       collaborator: { number },
//       customerPlanUrl: 'url',
//       authHeader: req.headers.authorization
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(json).toHaveBeenCalledWith(expectedResponse);
//   });
//
//   it('handles bad requests', async () => {
//     const expectedResponse = { error: 'could not share a plan' };
//
//     const sharePlan = {
//       execute: jest.fn()
//     };
//
//     sharePlan.execute.mockImplementation(() => {
//       throw new ArgumentError('something is missing');
//     });
//
//     await endpoint({ sharePlan })(req, res);
//
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(json).toHaveBeenCalledWith(expectedResponse);
//   });
//
//   it('handles general errors', async () => {
//     const expectedResponse = {
//       error: `could not share a plan with plan id=${planId}`
//     };
//
//     const sharePlan = {
//       execute: jest.fn()
//     };
//     sharePlan.execute.mockImplementation(() => {
//       throw new Error('error!');
//     });
//
//     await endpoint({ sharePlan })(req, res);
//
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(json).toHaveBeenCalledWith(expectedResponse);
//   });
// });
