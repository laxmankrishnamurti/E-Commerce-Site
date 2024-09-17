# KEY TAKEAWAYS

1. We can use the curtomError class in our controller to throw an error to the Global Error Handling Middleware. Let's go.....

```js
export const createUser = async (req, res, next) => {
  try {
    const newUser = new mongooseModel.create({}); // Sample text
    res.status(201).json({
      statusCode: 201,
      status: "created",
      message: "The account has been created successfully",
    });
  } catch (error) {
    const err = new CustomError(401, "Wrong Inputs");
    next(err);
  }
};
```

This is how typically we create controllers and send response and custom errors if something went wrong.

#### Does it make sense to write the same code snippets in all out of controllers to throw an error to the Global Error Handling Middleware?

OBVIOUSLY NOT.

So what we can do?

<code>SOLUTION :: Create a asyncHandler function that returns a Promise and pass the controller as a callback function and then handle the error if the Promise get rejected. Have a look on this code......</code>

```js
const asyncHandler = (func) => {
  func(req, res, next).catch((error) => next(error));
};

export default asyncHanler;
```

Now, use the asyncHandler in all controllers.

```js
import asyncHandler from "./utils/asyncHandler";
export const createUser = asyncHandler(async (req, res, next) => {
  //operations and send response
});
```

If there is any error occured in the controller it will automatically catched by catch block which we have written in Promise state if the promise will get rejected.

### <code>But, There was a problem with the asyncHandler is that it is not actually a function itself. Just watch carefully it is actually returning a Promise not a function and we know that express requires a function to run whenever route is matched.</code>

So, when express comes with createUser controller function it will give definetly gives an error that it is not a function. So, what is the solution.................?

<code>SOLUTION :: Return an anonymous function to make sure express will have a function to call whenever the router will match. So, the asyncHandler function will look like this :- </code>

```js
const asyncHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => next(error));
  };
};
```

<code>NOTE ===> When express take the function to run it will give these following arguments :: Request, Response, Next</code>

So that's why we have these paramerters in anonymous function.
