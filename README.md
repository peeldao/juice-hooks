# juice-hooks

[Wagmi](https://wagmi.sh/) hooks for [Juicebox](https://docs.juicebox.money/).

## Install

```
npm install juice-hooks
```

## Usage

```jsx
import { useJbProjectsOwnerOf } from "juice-hooks";


export function MyComponent() {
  const { data } = useJbProjectsOwnerOf({
    args: [1],
  });
  

  return <div>Owner: {data}</div>;
}
```



### Dev

1. install deps

   ```
   npm install
   ```

1. Generate hooks

   ```
   npm run generate
   ```
