import Response from 'lib/api/response';
import { createEndpoint } from 'lib/api/createEndpoint';
import { getPlan, updatePlan } from 'lib/dependencies';
import { createPlanModel } from 'lib/api/models';

export const endpoint = ({ getPlan, updatePlan }) =>
  createEndpoint(
    {
      allowedMethods: ['GET', 'PATCH'],
      validators: [
        {
          name: 'planId',
          failureMessage: 'planId is required',
          validate: ({ params }) => params.id?.length > 0
        },
        {
          name: 'body',
          failureMessage: 'no updated fields were found in the body',
          validate: ({ body, method }) =>
            method === 'GET' || Object.keys(body ?? {}).length > 0
        }
      ]
    },
    async ({ method, params: { id }, body: updateFields }) => {
      if (method === 'GET') {
        const result = await getPlan.execute({ id });
        if (!result) {
          return Response.notFound();
        }
        return Response.ok(createPlanModel(result));
      }

      await updatePlan.execute({ planId: id, updateFields });
      return Response.noContent();
    }
  );

export default endpoint({ getPlan, updatePlan });
