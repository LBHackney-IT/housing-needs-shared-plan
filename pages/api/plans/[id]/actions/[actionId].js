import Response from 'lib/api/response';
import { createEndpoint } from 'lib/api/createEndpoint';

export const endpoint = ({ updateAction }) =>
  createEndpoint(
    {
      allowedMethods: ['PATCH'],
      validators: [
        {
          name: 'actionId',
          failureMessage: 'actionId is required',
          validate: ({ params }) => params.actionId?.length > 0
        },
        {
          name: 'planId',
          failureMessage: 'planId is required',
          validate: ({ params }) => params.id?.length > 0
        },
        {
          name: 'body',
          failureMessage: 'no updated fields were found in the body',
          validate: ({ body }) => Object.keys(body ?? {}).length > 0
        }
      ]
    },
    async ({ params: { id: planId, actionId }, body: updateFields }) => {
      await updateAction.execute({ planId, actionId, updateFields });
      return Response.noContent();
    }
  );
