# KEY TAKEAWAYS

```js
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
```

Now, go to the controller and create and object and then pass the object into that next function so that the Global Error Handling Middleware can trigger.

```js
const err = new CustomError(`Can't find ${req.originalUrl} on the server`);
next(err);
```
