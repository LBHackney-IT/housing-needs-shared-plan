import { createCustomerUrl } from 'lib/dependencies';
import { createEndpoint } from 'lib/api/createEndpoint';
import Response from 'lib/api/response';

export const endpoint = ({ createCustomerUrl }) => {
  return createEndpoint(
    {
      allowedMethods: ['POST'],
      validators: [
        {
          name: 'planId',
          failureMessage: 'planId is required',
          validate: ({ params }) => params.id?.length > 0
        }
      ]
    },
    async ({ params: { id: planId } }) => {
      const { customerPlanUrl } = await createCustomerUrl.execute({ planId });
      return Response.ok({ customerPlanUrl });
    }
  );
};

export default endpoint({ createCustomerUrl });
