# SST Lambda Authorizer Sample

## Summary

This is a sample API showing how to integrate a lambda authorizer with SST.

It deploys two endpoints:

- `/restricted` which is auth'd via the lambda authorizer.
- `/unrestricted` which is open.

## Testing

For these test requests, replace `API_GATEWAY_ID` and `AWS_REGION` with the ID and Region for your deployed stack.

**Test `/unrestricted`**

`curl https://{API_GATEWAY_ID}.execute-api.{AWS_REGION}.amazonaws.com/unrestricted`

Expected response: `This is the unrestricted endpoint, hi there! 👋`

**Test `/restricted` _without_ Authorization Header**

`curl https://{API_GATEWAY_ID}.execute-api.{AWS_REGION}.amazonaws.com/restricted`

Expected response: `{"message":"Unauthorized"}`

**Test `/restricted` _with_ Authorization Header**

`curl -H "Authorization:Test" https://{API_GATEWAY_ID}.execute-api.{AWS_REGION}.amazonaws.com/restricted`

Expected response: `Hello! You've reached the restricted endpoint! 😎`