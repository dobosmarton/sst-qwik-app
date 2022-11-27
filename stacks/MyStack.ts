import { Api, StackContext } from '@serverless-stack/resources';

export function MyStack({ stack }: StackContext) {
  // Create the HTTP API
  const api = new Api(stack, 'Api', {
    routes: {
      'POST /api/login': 'services/functions/login.go',
    },
  });

  // Show API endpoint in output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
