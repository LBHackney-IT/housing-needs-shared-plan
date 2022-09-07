// import defaultEndpoint, { endpoint } from './[actionId]';
// import { createMockResponse } from 'lib/api/utils/createMockResponse';
//
xit('re-enable this test suite', () => {
  expect(1).toEqual(1);
})
// describe('[PATCH|DELETE] /api/plans/[id]/actions/[actionid]', () => {
//   const updateAction = { execute: jest.fn() };
//   const deleteAction = { execute: jest.fn() };
//   const call = endpoint({ updateAction, deleteAction });
//
//   it('only accepts PATCH and DELETE requests', async () => {
//     const response = createMockResponse();
//     const methods = ['PUT', 'GET', 'POST', 'OPTIONS', 'HEAD'];
//
//     for (const method of methods) {
//       await call({ method }, response);
//       expect(response.statusCode).toBe(405);
//     }
//   });
//
//   it('has a default export', () => {
//     // without a default export Next cannot find the endpoint
//     expect(defaultEndpoint).toBeInstanceOf(Function);
//   });
//
//   describe('validation', () => {
//     describe('PATCH', () => {
//       it('returns 400 when parameters are missing', async () => {
//         const response = createMockResponse();
//         await call(
//           {
//             method: 'PATCH',
//             query: { id: '', actionId: '' },
//             body: { isCompleted: true }
//           },
//           response
//         );
//
//         expect(response.statusCode).toBe(400);
//         expect(JSON.parse(response.body).errors.length).toBe(2);
//       });
//
//       it('returns 400 when the body is missing', async () => {
//         const response = createMockResponse();
//         await call(
//           {
//             method: 'PATCH',
//             query: { id: 'd6BQiWGGhOrF8mFdPp4T', actionId: 'PPBqWA9' },
//             body: ''
//           },
//           response
//         );
//
//         expect(response.statusCode).toBe(400);
//         expect(JSON.parse(response.body).errors.length).toBe(1);
//       });
//     });
//
//     describe('DELETE', () => {
//       it('returns 400 when parameters are missing', async () => {
//         const response = createMockResponse();
//         await call(
//           {
//             method: 'DELETE',
//             query: { id: '', actionId: '' }
//           },
//           response
//         );
//
//         expect(response.statusCode).toBe(400);
//         expect(JSON.parse(response.body).errors.length).toBe(2);
//       });
//     });
//   });
//
//   describe('PATCH', () => {
//     it('returns 204 when action updated successfully', async () => {
//       const response = createMockResponse();
//       updateAction.execute.mockImplementation(() => Promise.resolve());
//
//       await call(
//         {
//           method: 'PATCH',
//           query: { id: 'd6BQiWGGhOrF8mFdPp4T', actionId: 'PPBqWA9' },
//           body: { isCompleted: true }
//         },
//         response
//       );
//
//       expect(updateAction.execute).toHaveBeenCalledWith({
//         planId: 'd6BQiWGGhOrF8mFdPp4T',
//         actionId: 'PPBqWA9',
//         updateFields: { isCompleted: true }
//       });
//
//       expect(response.statusCode).toBe(204);
//       expect(response.body).toBeUndefined();
//     });
//   });
//
//   describe('DELETE', () => {
//     it('returns 204 when action deleted successfully', async () => {
//       const response = createMockResponse();
//       deleteAction.execute.mockImplementation(() => Promise.resolve());
//
//       await call(
//         {
//           method: 'DELETE',
//           query: { id: 'd6BQiWGGhOrF8mFdPp4T', actionId: 'PPBqWA9' }
//         },
//         response
//       );
//
//       expect(deleteAction.execute).toHaveBeenCalledWith({
//         planId: 'd6BQiWGGhOrF8mFdPp4T',
//         actionId: 'PPBqWA9'
//       });
//
//       expect(response.statusCode).toBe(204);
//       expect(response.body).toBeUndefined();
//     });
//   });
// });
