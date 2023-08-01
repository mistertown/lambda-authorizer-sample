import type { APIGatewayAuthorizerResult } from "aws-lambda";

export const handler = async (
  event: any
): Promise<APIGatewayAuthorizerResult> => {
  try {
    // Perform your authentication logic here
    // eg: const authorizationToken = event.authorizationToken;
    // For simplicity, we'll just set isAuthorized to true here and assume everything is authorised.
    // In a real scenario, you would validate the token and extract necessary information.
    const isAuthorized = true;

    if (isAuthorized) {
      // user ID here would probably come from the token
      return generatePolicy("user_id", "Allow", event.methodArn);
    } else {
      return generatePolicy("user_id", "Deny", event.methodArn);
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return generatePolicy("user_id", "Deny", event.methodArn);
  }
};

const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
) => {
  const authResponse: APIGatewayAuthorizerResult = {
    principalId: principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
  return authResponse;
};
