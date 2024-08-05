# Instructions

Use Node v18

```bash
npm i
npm run test
```

in `contentstack.ts`, you will see the retry logic is just "5 seconds between retries":

```javascript
this.client = contentstack.client({
    retryLimit: 4,
    timeout: 60 * this.SEC_TO_MS,
    /**
     * 5 second retry logic
     */
    retryDelayOptions: {
        customBackoff: (_retryCount, _error) =>
            5 * this.SEC_TO_MS,
    },
});
```

The test results show we are only waiting ~1200ms for all 4 retries (300ms each). The printouts also say we are only waiting 300ms even though the retry delay options are setup for 5 seconds between retries

```
> content-stack-client-tester@1.0.0 test
> JEST_JUNIT_SUITE_NAME=${npm_package_name} jest --roots=./src --passWithNoTests

  console.log
    [warning] Error with status: 429 error occurred. Waiting for 300 ms before retrying...

      at Object.logHandler (node_modules/@contentstack/management/dist/node/contentstack-management.js:2:481669)

  console.log
    [warning] Error with status: 429 error occurred. Waiting for 300 ms before retrying...

      at Object.logHandler (node_modules/@contentstack/management/dist/node/contentstack-management.js:2:481669)

  console.log
    [warning] Error with status: 429 error occurred. Waiting for 300 ms before retrying...

      at Object.logHandler (node_modules/@contentstack/management/dist/node/contentstack-management.js:2:481669)

  console.log
    [warning] Error with status: 429 error occurred. Waiting for 300 ms before retrying...

      at Object.logHandler (node_modules/@contentstack/management/dist/node/contentstack-management.js:2:481669)

  console.time
    time to get locales: : 1293 ms

      at Object.<anonymous> (src/src/contentstack.spec.ts:46:15)
```