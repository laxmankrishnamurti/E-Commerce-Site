# Learning from Errors

## Event Type Error

<code>Error :- Parameter "e" has explicitly any type</code>

```ts
const handleSelectChange = (e) => {
  setSelectedOption(e.target.value);
};
```

Solution ===> We need to explicitly define the type of the event object (e). Since we're working with a <"select"> element, the event type should be "React.ChangeEvent< HTMLSelectElement >".

```ts
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedOption(e.target.value);
};
```

<code>"e": React.ChangeEvent< HTMLSelectElement >: This ensures TypeScript knows that the e object is an event triggered by a < select > element. "e.target.value": This is the value of the selected option.</code>

## useRef Error

<code>Error :- offsetWidth does not exist in type never.</code>

```ts
useEffect(() => {
  if (textRef.current) {
    setSelectWidth(`${textRef.current.offsetWidth + 50}px`); // Adding some padding (50px)
  }
}, [selectedOption]);
```

Solution :: The issue we're encountering with TypeScript (offsetWidth does not exist on type never) is related to how we're handling the textRef in React. By default, TypeScript doesn't know what kind of element textRef is referring to, and it infers the type as never.

To resolve this, we need to explicitly tell TypeScript that textRef is a reference to an HTML element, such as an HTMLDivElement or HTMLSpanElement, depending on what you're targeting.

- Here's how we can fix it:
  - Define the correct type for textRef.
  - Check if the current element exists before accessing offsetWidth.

```ts
const textRef = useRef<HTMLDivElement | null>(null);
```

- Key Changes :
  - Typed <code>textRef</code>
  - <code>const textRef = useRef<HTMLDivElement | null>(null) : </code> tells TypeScript that textRef is a reference to a HTMLDivElement. If we're using a different element like a span, we can change it to HTMLSpanElement.
