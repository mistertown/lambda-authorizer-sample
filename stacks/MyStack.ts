import { StackContext, Api, Function } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    authorizers: {
      myAuthorizer: {
        type: "lambda",
        function: new Function(stack, "Authorizer", {
          handler: "packages/functions/src/authorizer.handler",
        }),
        resultsCacheTtl: "30 seconds",
      },
    },
    routes: {
      "GET /restricted": {
        authorizer: "myAuthorizer",
        function: "packages/functions/src/restricted.handler",
      },
      "GET /unrestricted": "packages/functions/src/unrestricted.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
