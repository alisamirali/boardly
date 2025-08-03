import { Loader } from "lucide-react";

export default function DashboardLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="size-10 animate-spin text-muted-foreground" />
    </div>
  );
}
