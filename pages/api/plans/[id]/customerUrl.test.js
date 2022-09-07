// import { endpoint } from 'pages/api/plans/[id]/customerUrl';
// import { createMockResponse } from 'lib/api/utils/createMockResponse';
//
xit('re-enable this test suite', () => {
  expect(1).toEqual(1);
})
// describe('Get customer Url API', () => {
//   let json;
//   let res;
//
//   beforeEach(() => {
//     json = jest.fn();
//     res = {
//       status: jest.fn(() => {
//         return { json };
//       }),
//       end: jest.fn()
//     };
//   });
//
//   const planId = '1';
//
//   const req = {
//     method: 'POST',
//     query: {
//       id: planId
//     }
//   };
//
//   const createCustomerUrl = { execute: jest.fn() };
//   const call = endpoint({ createCustomerUrl });
//
//   it('returns customerUrl when the url is generated successfully', async () => {
//     const response = createMockResponse();
//     createCustomerUrl.execute.mockImplementation(
//       jest.fn(() => {
//         return { customerPlanUrl: '12' };
//       })
//     );
//     await call(
//       {
//         method: 'POST',
//         query: { id: 'd6BQiWGGhOrF8mFdPp4T' }
//       },
//       response
//     );
//
//     expect(createCustomerUrl.execute).toHaveBeenCalledWith({
//       planId: 'd6BQiWGGhOrF8mFdPp4T'
//     });
//
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toBe(JSON.stringify({ customerPlanUrl: '12' }));
//   });
//
//   it('returns 400 when id is missing', async () => {
//     const response = createMockResponse();
//     await call(
//       {
//         method: 'POST',
//         query: { id: '' }
//       },
//       response
//     );
//
//     expect(response.statusCode).toBe(400);
//     expect(JSON.parse(response.body).errors.length).toBe(1);
//   });
// });
