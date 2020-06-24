This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies using yarn:

```bash
yarn
```

Using npm:

```bash
npm install
```

Create a .env file, based on the .env.sample file

```bash
touch .env # then go fill it in!
```

Then, we need to set up DynamoDB local

```bash
brew cask install java # if you don't already have Java
npm run dynamo-install
```

Create local DynamoDB plans table

```bash
aws dynamodb create-table --cli-input-json file://./config/tables/plans.json --endpoint-url http://localhost:8000
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

## Unit tests

Run jest tests:

```bash
npm run unit-test
# or
yarn unit-test
```

## Integration tests

Set these env vars in .env file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
SMS_API_URL=http://localhost:8080
```

Run cypress integration tests headlessly:
Set these env vars to the same values as your local aws cli config:

```bash
CYPRESS_AWS_ACCESS_KEY_ID
CYPRESS_AWS_SECRET_ACCESS_KEY
CYPRESS_AWS_REGION
```

Run the tests:

```bash
yarn run int-test
```

Run tests in cypress test runner:
Start shared-plan and mock-sms servers:

```bash
yarn start-cypress-servers
# or
npm run start-cypress-servers
```

Open the test runner:

```bash
yarn cypress-open
# or
npm run cypress-open
```

## Routes/pages?

/
home page

/plans/[id]
Plan summary

/plan/[id]/share
Sharing page of the plan

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
