# KEY TAKEAWAYS

<code>Don't be afraid or stat panic when you see any kind of error in your application. First read this error, that's the only way to take charges on Errors and understand the system well in which you are working right now. Error is like a friend(joking), but not lesser because it gives insights about the system, how it manage the code. So, let's start.........</code>

Applications running in Node.js will generally experience four categories of errors:

1. Standard JavaScript Errors

- Ex::
  - EvalError,
  - SyntaxError,
  - RangeError,
  - ReferenceError,
  - TypeError, and,
  - URIError

2. System Errors :: Triggered by underlying operating system constraints such as attempting to open a file that does not exist or attempting to send data over a closed socket.

3. User Specified Errors :: Triggered by application code.

4. AssertionError :: This is a special class of error that can be triggered when Node.js detects an exceptional logic violation that should never occur. These are raised typically by the node:assert module.

<code>Note :: All JavaScript and system errors raised by Node.js inherit from, or are instances of, the standard JavaScript <Error> class and are guaranteed to provide at least the properties available on that class.</code>

- All JavaScript errors are handled as exceptions that immediately generate and throw an error using the standard JavaScript throw mechanism. These are handled using the try…catch construct provided by the JavaScript language.

- Any use of the JavaScript throw mechanism will raise an exception that must be handled or the Node.js process will exit immediately.

### 1. Error Propagation in Express:

- Whether the error is thrown by our application logic (in controllers, middleware, etc.) or by an external source (like a database error from MongoDB or Mongoose), Express will pass that error to the global error handler (if one exists).

- Express doesn’t care where the error comes from. It just forwards the error down the middleware chain.

### 2. Global Error Handler Role:

- In the global error handler, we are responsible for inspecting the error to determine its source.

- Based on this inspection (e.g., checking error properties like err.name, err.code, or custom properties we might define), we can classify whether the error comes from our application (controller/middleware) or an external source (like the database).

### 3. Appropriate Response:

- Once we’ve identified the type of error, we need to send the appropriate response to the client as an API response. This could include:
  - Setting the correct HTTP status code (e.g., 400 for validation errors, 500 for internal server errors).
  - Sending a meaningful error message that helps the client understand what went wrong (e.g., Invalid input data, Database connection failed).
