import { toast } from "sonner";
import { Button } from "./components/ui/button";

export default function App() {
  const ipc = () => {
    window.ipcRenderer.send("ping");
    toast.success("IPC Message Sent");
  };
  return (
    <h1 className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex gap-2 ">
        <Button onClick={ipc}>Send IPC</Button>
      </div>
    </h1>
  );
}
