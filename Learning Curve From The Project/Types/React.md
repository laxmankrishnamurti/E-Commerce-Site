# Typescript with React

To handle React with TypeScript more effectively, understanding commonly used types and how to handle events, components, props, and other structures is crucial. Below is a list of types and concepts frequently used in React applications written with TypeScript:

## 1. Basic Types

- string: Used for text (e.g., const title: string = "Hello").
- number: For numeric values (e.g., const price: number = 20).
- boolean: For true/false values (e.g., const isVisible: boolean = true).
- null and undefined: For uninitialized or empty states.
- any: Accepts any type (use sparingly; weakens type checking).
- unknown: Similar to any, but forces type checking when accessing properties or methods.
- void: For functions that do not return a value.
- Array<T> or T[]: Represents an array of a certain type (e.g., string[] or Array<number>).

## 2. React Component Types

- jsxX.Element: Return type of most React components.

```jsx
const MyComponent: React.FC = (): jsxX.Element => {
  return <div>Hello</div>;
};
```

- React.FC (or React.FunctionComponent): Type for functional components.

```jsx
const MyComponent: React.FC = () => {
  return <div>Hello</div>;
};
```

- React.ReactNode: Represents any renderable React content, like elements, strings, numbers, etc. It’s used for child elements or dynamic content.

```jsx
const MyComponent: React.FC = ({ children }) => {
  return <div>{children}</div>;
};
```

## 3. Event Types

To handle events like click, input, change, etc., we use specific event types:

- React.ChangeEvent<T>: For handling input or select change events.

```jsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
```

- React.MouseEvent<T>: For handling mouse events like button clicks.

```jsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked");
};
```

- React.KeyboardEvent<T>: For handling keyboard events.

```jsx
const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  console.log(e.key);
};
```

- React.FormEvent<T>: For form submission events.

```jsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted");
};
```

## 4. Props Types

We can define the props that our component expects:

```jsx
interface MyComponentProps {
  title: string;
  count: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, count }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{count}</p>
    </div>
  );
};
```

- Optional Props: Use ? to mark props as optional.

```ts
interface MyComponentProps {
  title?: string;
  count?: number;
}
```

- Default Props: We can provide default values for props.

```ts
MyComponent.defaultProps = {
  title: "Default Title",
};
```

## 5. State Types

We need to type our useState hooks:

- Primitive Type:

```jsx
const [count, setCount] = useState < number > 0;
```

- Complex State:

```ts
interface Product {
  title: string;
  price: number;
}

const [product, setProduct] = useState<Product>({ title: "", price: 0 });
```

- Union State:

```ts
const [state, setState] = useState<string | number>("initial");
```

## 6. Refs

When working with refs in React, we use useRef:

- Basic Ref:

```ts
const inputRef = useRef<HTMLInputElement>(null);

const focusInput = () => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
```

- Callback Ref:

```ts
const setRef = (node: HTMLInputElement | null) => {
  if (node) {
    node.focus();
  }
};
```

## 7. React Hook Types

- useState Hook: Use for managing state.

```ts
const [state, setState] = useState<number>(0);
```

- useEffect Hook: Used for side effects, with optional dependencies.

```ts
useEffect(() => {
  // Effect code here
}, [dependency]); // Dependency array
```

- useContext Hook: Used for consuming context in components.

```ts
const value = useContext<MyContextType>(MyContext);
```

## 8. Higher-Order Component (HOC) Types

We might use these when creating HOCs that wrap other components:

```ts
function withLogger<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  return (props: P) => {
    console.log("Rendered with props:", props);
    return <WrappedComponent {...props} />;
  };
}
```

## 9. Type Guards

If we have union types, we can use type guards to ensure safe access to properties:

```ts
interface Product {
  title: string;
  price: number;
}

interface Book {
  title: string;
  author: string;
}

const isProduct = (item: Product | Book): item is Product => {
  return (item as Product).price !== undefined;
};
```

## 10. Utility Types

TypeScript provides utility types to transform and manipulate types:

- Partial<T>: Makes all properties of T optional.
- Required<T>: Makes all properties of T required.
- Pick<T, K>: Creates a new type by picking certain keys from T.
- Omit<T, K>: Creates a new type by omitting certain keys from T.
- Record<K, T>: Defines an object with keys of type K and values of type T.

```ts
const myRecord: Record<string, number> = {
  apples: 5,
  oranges: 10,
};
```

## Generics

Generics let you write reusable components and functions with type flexibility:

```ts
function useArray<T>(initialArray: T[]): [T[], (newElement: T) => void] {
  const [array, setArray] = useState(initialArray);

  const addElement = (newElement: T) => {
    setArray([...array, newElement]);
  };

  return [array, addElement];
}
```
