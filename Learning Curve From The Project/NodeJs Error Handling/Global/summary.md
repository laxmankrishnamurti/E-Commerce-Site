# Global Error Handling Middleware

There are two types of error that can happen in our express app.

1. Operation Errors

Operational errors are the problems that we can predict that will happen at some point in future. We need to handle them in advance.

- Example
  - User tyring to access invalid route
  - Inputting invalid data.
  - Application failed to connect to database server.
  - Request timeout.

<code>We need to handle these operational errors in order to prepare our application for these cases. These operational errors are also called Exceptions.</code>

2. Programming Errors

Programming errors are simply bugs that we programmers, by mistake, introduces them in out code.

- Example
  - Trying to read property of an undefined variable
  - Using await without async
  - Accidently using req.query instead of req.body
  - Passing a number where an object is expected
  - ..............etc

<code>SOLUTION :: USE TYPESCRIPT</code>

#### So, when we are talking about error handling with express we mainly just mean Operational Errors. Because these are the ones which are to catch and handle with our express application. And the best part is express comes with error handling out of the box.

So, all we have to do is we have to write Global error handling middleware to handle such kind of operations.

### Global Error Handling Middleware ===> This will catch and handle all the errors happening in the application. No matter if the error is happening on the route handler or the model validator, there could be some other reasons.

Now, the beauty of having a Global error handling middleware is that it provides a nice seperation of concern. So, in this way we do not have to worry about error handling write in our business logic or in our controller or in anywhere else in our application.

We can simply send the error to the Global error handling middleware where it will be processed and handled. Let's go..........

```js
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});
```

In Global Error Handling Middleware the first agrument should always be an error that will catch all the Global errors. And the interesting part is when we define these four parameters in a middleware express will automatically recognize it as a Global Error Handling Middleware. Hence, express will only call the middleware where there is an error in the application.

From the middleware we can send response in the form of json data to the client agent.

<code>Important ===> Whenever we want to call the Global Error Handling Middleware from any part of our application code there first we need to create an Error Object.</code>

```js
app.all("*", (req, res, next) => {
  //We can going to pass the object into gloabl error handling function as an agrument.
  const err = new Error();
  err.message = `Can't find ${req.originalUrl} on the server`;
  err.status = "fail";
  err.statusCode = 404;
  //now the qustion is how we can pass the object into the gloabl error handling middleware?
  //Ans :- call the next function and the object as an agrument
  next(err);
});
```

### Does the next(err) function has some special feature?

YES, so when we pass an argument to the next() function, no matter what the argument is, express will automatically know that there was an error occured in the application.

In that case express will skip all other middleware function which is currently present in the middleware stack and it will directly call the Global Error Handling Middleware function.

<code>Now, we can also call the Global Error Handling Middleware from the controller. But this is not a good practice we can make an Error Class to handle controller error in more efficient way. </code>
