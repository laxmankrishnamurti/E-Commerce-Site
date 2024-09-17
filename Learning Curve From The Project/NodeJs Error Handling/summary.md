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
