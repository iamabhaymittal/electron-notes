import { useState } from "react";
import { Button } from "./components/ui/button";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <h1 className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex gap-2 ">
        <Button onClick={() => setCount(count + 1)}>Increament</Button>
        <Button onClick={() => setCount(count - 1)}>Decreament</Button>
      </div>

      <p className="text-2xl">{count}</p>
    </h1>
  );
}
