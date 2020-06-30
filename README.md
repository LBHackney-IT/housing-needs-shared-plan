# Shared Plan
A tool that helps create a shared plan of action between a Hackney resident and the professionals supporting them.

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
  Install Java if you don't already have it
  Install dynamodb:
  ```bash
  sls dynamodb install
  ```

4. Create local DynamoDB plans table:
  ```bash
  aws dynamodb create-table --cli-input-json file://./config/tables/plans.json --endpoint-url http://localhost:8000
  ```

5. Run the development server:
  ```bash
  yarn dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

## Unit tests

Run jest tests:

```bash
yarn unit-test
```

## Integration tests

Set these env vars in .env file:

  NEXT_PUBLIC_API_URL=http://localhost:3000/api  
  SMS_API_URL=http://localhost:8080


#### Run cypress integration tests headlessly:
1. Set these env vars to the same values as your local aws cli config:

  CYPRESS_AWS_ACCESS_KEY_ID  
  CYPRESS_AWS_SECRET_ACCESS_KEY  
  CYPRESS_AWS_REGION  


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
