# Shared Plan

A tool that helps create a shared plan of action between a Hackney resident and the professionals supporting them.

![Architecture diagram](docs/diagram.png)

| Dependencies       | What it's used for                   |
|--------------------|--------------------------------------|
| Gov Notify         | Used for sharing the plans via email |
| Proto Collab Tools | Used for sharing plans via sms       |


## Getting Started

1. Install dependencies:

```bash
yarn
```

2. Create a .env file, based on the .env.sample file:

```bash
touch .env # then go fill it in!
```

3. Set up DynamoDB local:

```bash
docker-compose up
```

For Linux desktop users make sure you're running **rootless** Docker Engine and
do `docker compose up` (no dash) or install `docker-compose` explicitly otherwise you will face permissions issues.

4. Create local DynamoDB plans table:

```bash
aws dynamodb create-table --cli-input-json file://./config/tables/plans.json --endpoint-url http://localhost:8000
```

5. Run the development server:

```bash
yarn dev
```

````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

## AWS permissions

In order to schedule reminders, the user running `sls deploy` requires AWS EventBridge permissions. These may not be set already if the user was created prior to EventBridge being generally available.

You can add these permissions to the policy assigned to the IAM user or group in the AWS console.

## Unit tests

Run jest tests:

```bash
yarn unit-test
````

## Integration tests

Set these env vars in .env file:

```
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
ENV=dev

# must match the name of the DynamoDB table
PLANS_TABLE_NAME=plans

# for authentication, any values are fine
JWT_SECRET=secret
ALLOWED_GROUPS=any_value_is_fine
SMS_API_URL=http://localhost:8080
# for Google Tag Manager, can be left blank
NEXT_PUBLIC_GTM_ID=
```

#### Run cypress integration tests headlessly:

1. Set these env vars to the same values as your local aws cli config:

```
CYPRESS_AWS_ACCESS_KEY_ID
CYPRESS_AWS_SECRET_ACCESS_KEY
CYPRESS_AWS_REGION
```

2. Run the tests:

```bash
yarn run int-test
```

#### Run tests in cypress test runner:

1. Start shared-plan and mock-sms servers:

```bash
yarn start-cypress-servers
```

2. Open the test runner:

```bash
yarn cypress-open
```

## Pages

Home page:  
 /

Plan summary:  
 /plans/[id]

Sharing page of the plan:  
 /plan/[id]/share

## Api routes

Create a shared plan:  
 /plans

Get the shared plan:  
 /plans/[id]

Add goals to the shared plan:  
 /plans/[id]/goals

Add actions to the shared plan:  
 /plans/[id]/actions

Update and delete an action:  
 /plans/[id]/actions/[actionId]

Share the plan with collaborator:  
 /plans/[id]/share

Create/get shareable customer url:  
 /plans/[id]/customerUrl

Find the shared plan with correct name and system IDs:  
 /plans/[id]/find

## Controlling Access

- Access to the front end is controlled using the HackneyToken cookie. To modify what groups are permitted to access the project,
  modify the environment variable ALLOWED_GROUPS using the syntax 'group1,group2'.

- Access to the API is controlled using an API key. This is sent on the 'x-api-key' header and accessed through the environment variable NEXT_PUBLIC_API_KEY.

## Creating A Shared Plan From A Different Service

Shared Plan can be integrated with another service, allowing plans to be created for a customer for any topic.

To do this, a POST request should be made to the /api/plans endpoint with the following parameters:

- An 'x-api-key' header. The value of this can be read from AWS Parameter store (account Housing Needs) - /shared-plan/{environment}/API_KEY

- A body in the following format:

```
{
    "firstName": "Test",
    "lastName": "User",
    "systemIds": "test data",
    "numbers": ["string"],
    "emails": ["string"],
    "hasPhp": false
}
```

Note that the numbers and emails array will be used to communicate the shared plan to the customer.

The API will respond with a 201 Created and the following body:

```
{
    "id": "ZNXHO4",
    "firstName": "Test",
    "lastName": "User"
}
```

This id can be used to redirect to the front end of the application at the endpoint /plans/{id}. From here the shared plan can be added to and shared.
