# Step-By-Step Guide

1. Create a state that hold the selected option value
2. Create a span element that will identify the width of the selected option or selected content.
3. Pass a reference into the span element using "useRef" hook.
4. Handle change event of the select option.
5. Set the selected value into the select element.
6. Use "useEffect" hook to track the width of the selected option continuously and add some padding into it.

```ts
useEffect(() => {
  if (textRef.current) {
    setSelectWidth(`${textRef.current.offsetWidth + 50}px`); // Adding some padding (50px)
  }
}, [selectedOption]);
```

<code>Take care about the type of useRef hook and all state values, like this :- </code>

```ts
const [selectedOption, setSelectedOption] = useState<string>("");
const [selectWidth, setSelectWidth] = useState<string>("");
const textRef = useRef<HTMLSpanElement | null>(null);
```
