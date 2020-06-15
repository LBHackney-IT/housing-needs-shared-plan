import Response from 'lib/api/response';
import { createEndpoint } from 'lib/api/createEndpoint';
import { updateAction } from 'lib/dependencies';

export const endpoint = ({ updateAction, deleteAction }) =>
  createEndpoint(
    {
      allowedMethods: ['PATCH', 'DELETE'],
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
          validate: ({ body, method }) =>
            method === 'DELETE' || Object.keys(body ?? {}).length > 0
        }
      ]
    },
    async ({
      method,
      params: { id: planId, actionId },
      body: updateFields
    }) => {
      if (method === 'DELETE') {
        await deleteAction.execute({ planId, actionId });
        return Response.noContent();
      }

      await updateAction.execute({ planId, actionId, updateFields });
      return Response.noContent();
    }
  );

export default endpoint({ updateAction });
