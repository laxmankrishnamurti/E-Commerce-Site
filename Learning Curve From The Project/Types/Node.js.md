# Typescript with Node.js

Here’s a list of common types and interfaces used in backend development with Node.js, Express, and other related functionalities. These types will help us to ensure type safety in our TypeScript projects.

## Core Types for Node.js and Express

<code>1. Request and Response Types</code>

- express.Request: Represents an incoming HTTP request.
- express.Response: Represents the outgoing HTTP response.
- express.NextFunction: Represents the function to call the next middleware.

```js
import { Request, Response, NextFunction } from "express";
```

<code>2. Error Handling</code>

- Error: Base error class in TypeScript.
- Custom Error Types: Define your custom error classes to handle specific errors.

```js
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

- Middleware

  - express.RequestHandler: Middleware function type.

  ```js
  import { RequestHandler } from "express";
  const myMiddleware: RequestHandler = (req, res, next) => {
    // middleware logic
    next();
  };
  ```

## File Uploads

<code>1. Multer Types</code>

- multer.File: Represents an uploaded file.

```js
import { File } from "multer";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  const file: File = req.file;
  // handle the file
});
```

## Database Operations

<code>1. Mongoose Types (if using MongoDB)</code>

- mongoose.Document: Represents a document in MongoDB.
- mongoose.Model: Represents a Mongoose model.

```js
import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model < IUser > ("User", UserSchema);
```

## Type Safety for Requests

<code>1. Request Body, Params, and Query</code>

- express.Request with generic type parameters to specify types for body, params, and query.

```js
interface MyRequestBody {
  name: string;
  age: number;
}

app.post("/user", (req: Request<{}, {}, MyRequestBody>, res: Response) => {
  // req.body is of type MyRequestBody
});
```

<code>2. Type for Query Parameters</code>

```js
interface MyQueryParams {
  id: string;
}

app.get("/user", (req: Request<{}, {}, {}, MyQueryParams>, res: Response) => {
  const userId: string = req.query.id;
  // handle userId
});
```

## General Utility Types

<code>1. Partial, Required, Readonly</code>

- Partial<T>: Makes all properties in T optional.
- Required<T>: Makes all properties in T required.
- Readonly<T>: Makes all properties in T read-only.

```js
type PartialUser = Partial<IUser>;
type RequiredUser = Required<IUser>;
type ReadonlyUser = Readonly<IUser>;
```

<code>2. Custom Types for Configuration</code>

```js
interface Config {
  port: number;
  dbUri: string;
}

const config: Config = {
  port: 3000,
  dbUri: "mongodb://localhost:27017/mydatabase",
};
```

# Additional Types for Advanced Scenarios

1. Async Handlers

   - For handling asynchronous operations in Express routes or middleware:

   ```js
   type AsyncRequestHandler = (
     req: Request,
     res: Response,
     next: NextFunction
   ) => Promise<void>;
   ```

   ```js
   //Example
   const asyncHandler: AsyncRequestHandler = async (req, res, next) => {
     try {
       // async operation
       res.send("Success");
     } catch (error) {
       next(error);
     }
   };
   ```

2. Service Layer Types

   - For defining service methods and their types:

   ```js
   interface IUserService {
     getUserById(id: string): Promise<IUser | null>;
     createUser(user: IUser): Promise<IUser>;
   }
   ```

3. Validation and Schema Types

   - If using libraries like Joi or Yup for validation:

   ```js
   import Joi from "joi";
   const userSchema = Joi.object({
     name: Joi.string().required(),
     age: Joi.number().required(),
   });
   type UserSchema = Joi.InferType<typeof userSchema>;
   ```

4. Environment Variables

   - Typing environment variables for better type safety:

   ```js
   interface EnvConfig {
     PORT: string;
     DB_URI: string;
   }
   const envConfig: EnvConfig = {
     PORT: process.env.PORT || "3000",
     DB_URI: process.env.DB_URI || "mongodb://localhost:27017/mydatabase",
   };
   ```

5. Rate Limiting

   - For implementing rate limiting:

   ```js
   import rateLimit from "express-rate-limit";
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: "Too many requests, please try again later.",
   });
   ```

6. Custom Response Types

   - For standardized API responses:

   ```js
   interface ApiResponse<T> {
     success: boolean;
     data?: T;
     error?: string;
   }
   app.get("/data", (req: Request, res: Response) => {
     const response: ApiResponse<{ message: string }> = {
       success: true,
       data: { message: "Hello, world!" },
     };
     res.json(response);
   });
   ```

7. Session Management

   - For managing sessions with libraries like express-session:

   ```js
   import session from "express-session";
   app.use(
     session({
       secret: "your-secret-key",
       resave: false,
       saveUninitialized: true,
       cookie: { secure: false },
     })
   );
   ```

8. WebSocket Types

   - If using WebSocket libraries like ws:

   ```js
   import WebSocket from "ws";
   const wss = new WebSocket.Server({ port: 8080 });
   wss.on("connection", (ws: WebSocket) => {
     ws.on("message", (message: string) => {
       console.log(`Received message => ${message}`);
     });

     ws.send("Hello! Message from the server.");
   });
   ```

# Are you wandering or afraiding or fellng overwhelming by seeing these so many types? Let's make it simple.

It's natural to feel overwhelmed by the variety of types when starting out with TypeScript, but there are key concepts that will help us to understand it better.

## The Central Theme of TypeScript:

The central theme is type safety. TypeScript wants to help us to catch errors during development by ensuring that the types of variables, function parameters, and return values are consistent and correct. This prevents runtime errors and improves code quality.

### <code>Key Situations Where TypeScript Demands a Type:</code>

1. Function Parameters and Return Types:

   - When defining a function, TypeScript expects you to define the types for the parameters and return values. If you don't, it will often infer the type, but in cases where it can't, it will give us an error.

   ```js
   function greet(name: string): string {
     return `Hello, ${name}`;
   }
   ```

2. Variable Declarations:

   - If TypeScript cannot infer the type from an assigned value, it will give an error when we use it in an incompatible way.

   ```js
   let age: number = 30; // Type is explicitly defined
   ```

3. Implicit any Type:

   - If we forget to provide a type for a parameter or variable and TypeScript cannot infer it, we will see an error about "implicit any type."

   ```js
   function calculateTotal(price, quantity) {
     // error because no types
     return price * quantity;
   }
   ```

4. Object and Array Types:

   - When we work with complex structures (objects and arrays), you need to define the shape and types of the properties or elements.

   ```js
   type Product = {
     name: string,
     price: number,
   };
   const laptop: Product = { name: "Dell", price: 1000 };
   ```

### How to Approach TypeScript:

1. Start with Small Types:

   - Begin by adding types for function parameters, return types, and basic variables.
   - Gradually expand to objects, arrays, and more complex types.

2. Let TypeScript Infer Where Possible:

   - TypeScript is good at inferring types. We don't always have to declare them explicitly if it's clear from the context.

   ```js
   const message = "Hello"; // TypeScript infers it's a string
   ```

3. Use strict Mode:

   - Set "strict": true in your tsconfig.json to ensure TypeScript will be strict with type checks, helping you avoid mistakes.

<code>4. Central Point: TypeScript is all about ensuring type consistency. Every time we define a variable, function, or object, think about what kind of data is allowed. Once we've set a type, TypeScript will enforce it, catching mistakes before they become bugs.</code>

## Practice Regularly:

Writing TypeScript consistently is key to mastering it. The more we work with it, the more intuitive it will become to define types correctly.
