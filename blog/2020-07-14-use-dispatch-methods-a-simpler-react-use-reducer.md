---
title: useDispatchMethods - a simpler abstraction over React's useReducer
excerpt: useReducer is great, but the standard way of using it clunky. Here's my stab at a simpler interface.
ogImage: 2020-07-14-use-dispatch-methods-a-simpler-react-use-reducer.jpg
---

TL;DR - I wrote a custom hook to make `useReducer` easier to use. Wanna try it out? It's available on [npm](https://www.npmjs.com/package/@dgca/react-use-dispatch-methods).

```
npm install --save @dgca/react-use-dispatch-methods
```

Wanna jump to the demo? <a href="#demo">I got you</a>.

---

For a long time, I wasn't a huge fan of Redux. The learning curve felt bigger than it needed to be, the `switch` statements felt unnatural (I _still_ have to look up the syntax for those since I use them so sparingly), and I just wasn't a fan of the API. [Redux Toolkit](https://redux-toolkit.js.org/) addressed most of my issues, but the original way of using Redux wasn't my cup of tea.

Because of this, when React introduced hooks, I was a bit apprehensive of `useReducer`. I appreciate what it does, but again with the `switch` statements, and having to write a lot of the boilerplate yourself.

That's why I decided to wrap `useReducer` in a custom hook that implements what I believe is a simpler way of using it. Meet [`useDispatchMethods`](https://github.com/dgca/react-use-dispatch-methods)!

So, how does it work?

```js
const [state, dispatch] = useDispatchMethods(
  methods,
  initialState, // optional
  init, // optional
  dependencyArray // optional
);
```

## Arguments

- `methods (Object<string, function>)` - This is an object where each value is a function that returns the updated state, and each key is the name of the dispatch method you'll use later on. Each function will receive an object of `{state, payload}` as its single argument. `state` is the current state, and `payload` is the argument that was passed to the dispatch method (more on this in a bit).
- `initialState (?*)` - The initial state, same as `useState` or `useReducer`.
- `init (?function)` - A function to lazily initialize the initial state, same as `useReducer` (see: [React's docs on this](https://reactjs.org/docs/hooks-reference.html#lazy-initialization)).
- `dependencyArray (?Array<*>)` - In order to prevent recreating some internal objects on subsequent rerenders, `useDispatchMethods` uses React's `useCallback` and `useMemo`. If you need to change the functions in the methods object, you can pass a `dependencyArray` and we'll forward those onto `useCallback` and `useMemo`. Odds are, you won't have to worry about this.

## Return value

- `state (*)` - The current state, same as `useState` or `useReducer`.
- `dispatch (Object<string, function>)` - Alright, here's the fun part. Remember the `methods` object you passed in earlier? `dispatch` is an object that has the same keys. In order to update your state, just call `dispatch.someUpdateFunction(optionalPayload)`. When you call a dispatch method (eyy, there's where the hook's name comes from), you're actually dispatching an action and the underlying `useReducer`'s reducer function figures out which update function it needs to use to modify the state!

## <span id="demo">Demo</span>

So, let's see this in action. First, a demo of our custom hook in use. We're using `useDispatchMethods` to modify the state that controls the component's background color, and the width of the border. It's ugly, I know.

```dangerouslySetInnerHTML
<iframe
  src="https://codesandbox.io/embed/dgcareact-use-dispatch-methods-demo-6349k?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="@dgca/react-use-dispatch-methods demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
```

<br />

So, in short, we're defining our update functions by passing an object of functions the first argument. Each function receives an object of `{state, payload}` as its argument, and it returns the new state.

The color input shows that you can call a dispatch method with a payload (in this example, it's the input's `e.target.value`). That's the `payload` that gets passed to the update function. If you don't need to use the payload, you don't have to pass one.

One thing to note is that the update functions must return the entire new state object. In this example, that means cloning the state object by spreading it onto a new object and updating only the property we need to update. You could also use a library like [Immer](https://github.com/immerjs/immer) to facilitate this.

```js
export default function App() {
  const [state, dispatch] = useDispatchMethods(
    {
      setColor: ({ state, payload }) => ({
        ...state,
        color: payload,
      }),
      increaseBorderWidth: ({ state }) => ({
        ...state,
        borderWidth: state.borderWidth + 1,
      }),
      decreaseBorderWidth: ({ state }) => ({
        ...state,
        borderWidth: state.borderWidth - 1,
      }),
    },
    {
      color: "#fff",
      borderWidth: 10,
    }
  );
  return (
    <div
      className="App"
      style={{
        backgroundColor: state.color,
        borderWidth: `${state.borderWidth}px`,
      }}
    >
      <h1>
        <code>useDispatchMethods</code> demo:
      </h1>
      <label>
        Change background color:&nbsp;&nbsp;
        <input
          value={state.color}
          type="color"
          onChange={(e) => dispatch.setColor(e.target.value)}
        />
      </label>
      <br />
      <br />
      <button onClick={dispatch.increaseBorderWidth}>
        Increase border width
      </button>
      &nbsp;
      <button onClick={dispatch.decreaseBorderWidth}>
        Decrease border width
      </button>
    </div>
  );
}
```

Neat, right? If you're into this, and you want to use it, it's available on [npm](https://www.npmjs.com/package/@dgca/react-use-dispatch-methods), or just grab the code from this [Gist](https://gist.github.com/dgca/b5e0578dbd2694363885cf7d22bf6270) and paste it into your project.
