import { AlertTriangle } from "lucide-react";

type Props = {
  message: string;
};

export function PageError({ message = "Something went wrong!" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AlertTriangle className="size-8 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );
}
