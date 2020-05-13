import { withLogging } from '../../../../lib/infrastructure/logging';

describe('withLogging', () => {
  class ExampleUseCase {
    execute() {
      return expectedResponse;
    }
  }

  const logger = {
    info: jest.fn(),
    error: jest.fn()
  };

  const expectedResponse = { some: 'value' };

  it('executes the use case and passes through the result', async () => {
    const execute = withLogging(new ExampleUseCase(), logger);
    const result = await execute();
    expect(result).toBe(expectedResponse);
  });

  it('logs the request and response from a use case', async () => {
    const expectedRequest = { my: 'request' };
    const execute = withLogging(new ExampleUseCase(), logger);

    await execute(expectedRequest);

    expect(logger.info).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        usecase: 'ExampleUseCase',
        arguments: [expectedRequest]
      }),
    );

    expect(logger.info).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        usecase: 'ExampleUseCase',
        result: expectedResponse
      })
    );
  });

  it('logs any errors and then rethrows them', async () => {
    const expectedError = new Error('Failed, because it is a test');

    class FailingUseCase {
      execute() {
        throw expectedError;
      }
    }

    const execute = withLogging(new FailingUseCase(), logger);
    await expect(execute()).rejects.toThrow(expectedError);

    expect(logger.error).toHaveBeenCalledWith(
      expectedError.message,
      expect.objectContaining({
        usecase: 'FailingUseCase',
        error: expectedError
      })
    );
  });
});
