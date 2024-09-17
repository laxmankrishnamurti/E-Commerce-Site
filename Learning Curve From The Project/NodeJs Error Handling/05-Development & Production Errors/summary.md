# KEY TAKEAWAYS

We should make sure that we are only sending the errors that is usedful for the user so that it can aware about the error and easily know what's going wrong. And also make sure to leak as little information possible to avoid any misuse of the error messages to secure our web-application from Hackers or other bas-intentent user.

But on the other hand when we are in the development we want to get as much information about the error that has occure as possible. That's because in the development, we can easily know what's going wrong with the application so that we can fix the issue before it becomes bug for the application.

```json
{
  "script": {
    "start": "SET NODE_ENV=production& nodemon ./src/server.ts",
    "dev": "SET NODE_ENV=development& nodemon ./src/server.ts"
  }
}
```

```js
const developmentError = (error, res) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const productionError = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail";

  if (process.env.NODE_ENV === "development") {
    developmentError(error, res);
  } else if (process.env.NODE_ENV === "production") {
    productionError(error, res);
  }
};
```

```js
//app.js
import globalErrorHandlerMiddleware from "./utils/globalErrorHandlerMiddlewar";

app.use(globalErrorHandlerMiddleware);
```

Most of the errors which we are going to create in our app is going to create using the CustomError Class so in that case it will help this "isOperational" property and that will be set to true. So in that case we want to send the productionError Response.

But for other errors(which is created by mongoose) this "isOperational" is not to set. So, in that case we'll not have "isOperational" property on the error object. In that case we want to send another response.

```js
const productionError = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "someting went wrong! Please try again later.",
    });
  }
};
```

Other error like mongoose, is not treated as Operational errors(Non-Operational errors) and because of that when such errors occurs for example some validation error occurs it is going to send this generic response to the client.

```js
else {
    res.status(500).json({
      status: "error",
      message: "someting went wrong! Please try again later.",
    });
  }
```

But we need to mark these validation errors or other errors which mongoose is going to throw as Operational errors. So that we can send that appropriate errors back to the client.

- Example
  - Missing required fields
  - Password format is not satisfied with the given conditions(Generally done with regex)
  - Email format
  - ...............etc

## Now, the question is how to set these mongoose errors(Non-Operational) error to Operational Error?

In order to do that we'll have to set the "isOperational" property to "true" for those mongoose errors.

<code>There are three types of errors that might be created by mongoose and these errors we need to mark as Operational errors. So that we can send the actual error message to the client when the error occurs.</code>

### <code>1. Cast Error</code>

```js
import CustomError from "./utils/CustomError";

const developmentError = (error, res) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (error) => {
  const message = `Invalid value ${error.path} for field ${error.value}`;
  return new CustomError(message, 400);
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail";

  if (process.env.NODE_ENV === "development") {
    developmentError(error, res);
  } else if (process.env.NODE_ENV === "production") {
    // let err = { ...error };
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    productionError(error, res);
  }
};
```

For checking the error response in production mode set the NODE_ENV to "production"

<code>SET NODE_ENV=production& npm run dev</code>

### <code>Why the destructuring method is not working?</code>

When we are creating a copy of an object using the <code>{...sourceObj}</code> syntax, we have to keep in mind two things. They are :-

1. We are creating a shallow copy and
2. We will copy only enumerable attributs.
   - <code>Error.prototype.name</code> is not enumerable therefore it will not be copied into the new object.

### <code>2. Duplicate Error</code>

For this error object we do not have the name property as we are getting in Cast Error that's because this error is not something which is cause by mongoose but instead the underlyne mongodb driver and that's why we do not have the name property.

Mongoose is build up on top of the MongoDB Drivers and it allow us to communicate with mongodb database with ease.

SOLUTION :: By Identifying Error Code. (Handle it same as Cast Error)

### <code>3. Mongoose Validation Error (Errors can be an array of errors)</code>

### <code>Handle Rejected Promises Error</code>

### <code>Handle Uncaught_exceptions Error</code>
