---
title: Why don't cached React elements rerender when their parents rerender?
excerpt: When working with React, we often just plop JSX tags down and call it a day, but those tags are function calls that return React elements, and if you're caching those elements, they might behave differently than you'd expect.
ogImage: 2020-08-05-cached-react-elements-not-rerendering.jpg
---

TL;DR: When a React component instance rerenders, React compares the elements in the previous element tree with the next one. If it finds that two elements have referential equality, React will skip rerendering that element.

---

For some background, the impetus for this post is an issue we encountered at work a while back. We were running into an issue with React Router 3.x where a route component would rerender, but its children route components wouldn't. In other words...

```js
<Router history={hashHistory}>
  <Route
    path="/"
    component={Parent} // This was rerendering due to a state change
  >
    <Route
      path="demo"
      component={Child} // But this was not
    />
  </Route>
</Router>
```

If you'd like to see the behavior yourself, I put together [a little demo](https://codesandbox.io/s/00-react-router-3-child-rerendering-issue-04rgr?file=/src/App.js). To reproduce:

- Load the sandbox, this will load the root '/' route
- Click 'Go to demo'
- Notice that the parent and child components are rendering the same message
- Change the background using the color picker
- Result: The parent updates to show the correct background color, but the child does not
- Expected behavior: Both the parent and child show the correct background color

Why did I expect that behavior? My mental model of React told me that when a parent rerenders, the children rerender (unless they explicitly choose not to via PureComponent, React.memo, etc).

So, what's going on? After a whole lot of digging, I found [the underlying cause](https://github.com/facebook/react/issues/4067#issuecomment-110646627).

> It seems React skips re-rendering for elements that pass `prev === next`.
>
> <cite>Andreas Svensson</cite>

Turns out that React Router v3 caches the React elements it builds. And when React is rendering part of the tree, when it encounteres an element whose reference hasn't changed, **it skips rerendering it.**

Let's unpack this a bit more.

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
  return <span>I&apos;ve rendered {renderCountRef.current} times</span>;
}

const renderCountLoggerElement = <RenderCountLogger />;

export default function Demo() {
  const [bool, setBool] = useState(false);
  return (
    <>
      <p>Cached element: {renderCountLoggerElement}</p>
      <p>
        Inlined element: <RenderCountLogger />
      </p>
      <button onClick={() => setBool((currentState) => !currentState)}>
        Rerender parent
      </button>
    </>
  );
}
```

We're rendering two instances of `<RenderCountLogger />`, one on line 17 (aka the "cached element") and one on line 19 (aka the "inlined element"). When we click the button and cause the `<Demo />` to rerender, what happens to the cached element and inlined element? Turns out that only the inlined element rerenders. You can see this behavior below.

```dangerouslySetInnerHTML
<iframe
  src="https://codesandbox.io/embed/01-strict-comparison-9w4nr?fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
  title="01-strict-comparison"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
```

<br />

Why is this? As Andreas pointed out, React won't rerender elements who pass a strict equality check. Since we're assigning the element to the `renderCountLoggerElement` variable on line 11, when the parent's state updates and React starts doing its reconciliation, it encounters this element on line 19, sees that `renderCountLoggerElement === renderCountLoggerElement`, and just moves on without rerendering it.

This is unlike when we use JSX, which is an abstraction over `React.createElement`, which returns a _new_ object. As you probably know `{} === {} // false`, so the strict equality check doesn't pass, and the component rerenders normally.

## Can we rerender cached elements?

Yes! While rerenders that happen up the element tree won't cause our cached element, if a cached element rerenders itself via a `setState` or `forceUpdate`, it'll rerender normally.

It will also rerender normally if it's consuming context and the context provider's value changes. We can see this behavior below.

```js
import React, { useState, useContext, createContext } from "react";

const TextContext = createContext();

function TextContextProvider({ children }) {
  const [text, setText] = useState("");
  return (
    <TextContext.Provider value={text}>
      <label>
        <div>Change the text to update the context value</div>
        <br />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <br />
      {children}
    </TextContext.Provider>
  );
}

function TextContextLogger({ label }) {
  const textContextValue = useContext(TextContext);
  return (
    <p>
      The {label} says the value is: {textContextValue}
    </p>
  );
}

const cachedTextContextLogger = <TextContextLogger label="cached element" />;

export default function Demo() {
  return (
    <TextContextProvider>
      <TextContextLogger label="inlined element" />
      {cachedTextContextLogger}
    </TextContextProvider>
  );
}
```

In this example, we're once again using an inlined element and a cached element but, unlike before, _both_ elements rerender when we change the value of the context provider.

```dangerouslySetInnerHTML
<iframe
  src="https://codesandbox.io/embed/02-context-ey056?fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
  title="02-context"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
```

<br />

## Workarounds

So, say you find yourself in a scenario where you're working with cached React elements and you need them to rerender when their parents rerender. What can you do? Simple, just wrap your cached element with `React.cloneElement(el)`. This will clone the element, causing the equality check to return `false`, and your component will rerender normally.
