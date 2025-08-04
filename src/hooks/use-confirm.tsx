import { Modal } from "@/components/modal";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export function useConfirm(
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "primary"
): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const close = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    close();
  };

  const cancel = () => {
    promise?.resolve(false);
    close();
  };

  const ConfirmationDialog = () => (
    <Modal open={promise !== null} onOpenChange={close}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>

          <div className="pt-4 w-full flex flex-col gap-3 md:flex-row items-center justify-end">
            <Button
              onClick={cancel}
              variant="outline"
              className="w-full lg:w-auto"
              size="sm"
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirm}
              variant={variant}
              className="w-full lg:w-auto"
              size="sm"
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );

  return [ConfirmationDialog, confirm];
}
