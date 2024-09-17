# KEY TAKEAWAYS

We should make sure that we are only sending the errors that is usedful for the user so that it can aware about the error and easily know what's going wrong. And also make sure to leak as little information possible to avoid any misuse of the error messages to secure our web-application from Hackers or other bas-intentent user.

But on the other hand when we are in the development we want to get as much information about the error that has occure as possible. That's because in the development, we can easily know what's going wrong with the application so that we can fix the issue before it becomes bug for the application.

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
