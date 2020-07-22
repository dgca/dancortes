---
title: When does an assigned React element rerender? A deep dive into element rerendering
excerpt: When working with React, we often just plop JSX tags down and call it a day, but those tags are function calls that return React elements, and those elements rerender differently than you might expect.
ogImage: 2020-07-14-use-dispatch-methods-a-simpler-react-use-reducer.jpg
---

Before diving in, I want to point out that in this post, when I say 'element', I don't mean a React component, but the _stuff_ that components return.

The impetus for this post was an issue I ran into with React Router. In short, I had a route component whose children weren't rerendering despite the fact that the parent was rerendering. "The heck is this?" I asked myself. After a whole lot of digging, I found [the underlying cause](https://github.com/facebook/react/issues/4067#issuecomment-110646627).

> It seems React skips re-rendering for elements that pass `prev === next`.
>
> <cite>Andreas Svensson</cite>

So, what does this mean? Let's unpack this!

## Index

- Elements and strict equality
- Can we rerender assigned elements?
- State changes and forceUpdate
- Context

## Elements and strict equality

Let's look at what that means in practice. In the following code, we have two components:

- `<Demo />` - A demo component that has some state (`count`), a button to update the state and trigger a rerender, and two `RenderCountLogger` elements.
- `<RenderCountLogger />` - A component that displays how many times it has rendered.

```js
import React, { useState, useRef, useEffect } from "react";

function RenderCountLogger() {
  const renderCountRef = useRef(1);
  useEffect(() => {
    renderCountRef.current += 1;
  });
  return <span>I've rendered {renderCountRef.current} times</span>;
}

const renderCountLoggerElement = <RenderCountLogger />;

export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>The count is {count}</p>
      <p>Assigned element: {renderCountLoggerElement}</p>
      <p>
        Inlined element: <RenderCountLogger />
      </p>
      <button onClick={() => setCount((count) => count + 1)}>Bump Count</button>
    </>
  );
}
```

We're rendering two instances of `<RenderCountLogger />`, one on line 18 (we're calling this one the "assigned element") and one on line 20 (aka the "inlined element"). When we click the button and cause the `<Demo />` to rerender, what happens to the assigned element and inlined element? Turns out that only the inlined element rerenders. You can see this behavior below.

```dangerouslySetInnerHTML
<iframe
  src="https://codesandbox.io/embed/01-strict-comparison-9w4nr?fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="01-strict-comparison"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
```

<br />

Why is this? As Andreas pointed out, React won't rerender elements who pass a strict equality check. Since we're assigning the element to the `renderCountLoggerElement` variable on line 11, when the parent's state updates and React starts doing its reconciliation, it encounters this element on line 19, sees that `renderCountLoggerElement === renderCountLoggerElement`, and just moves on without rerendering it.

How is this different with the inlined element? Well, JSX is just an abstraction over `React.createElement`, which returns a _new_ element. When React encounters this element on line

As you may know...

```js
const foo = {};
console.log(foo === foo); // true
console.log({} === {}); // false
```

...and the same principle is at play here.
