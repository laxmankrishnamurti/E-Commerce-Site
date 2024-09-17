# KEY TAKEAWAYS

```js
async function sayHello() {
  try {
    throw new Error("sayHello fun :: Program failed");
  } catch (error) {
    console.log("Error : ", error);
    console.log("Error name : ", error.name);
    console.log("Error message : ", error.message);
    console.log("Error stack : ", error.stack);
  }
}

sayHello();
```

If Try-Block generates any kind of error, it is automatically fetched by Catch-Block. It means while creating REST APIs if the error lies on catch block it means this is not an error, which is specified by User itself, it lies into these kind of following errors ::

- Standard JavaScript Errors
- System Error
- AssertionError

At the end, our application will crash. Because we are actually sending the User Specified Errors as an API Response.
