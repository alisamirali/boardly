"use client";

import { Modal } from "@/components/modal";
import { CreateTaskFormWrapper } from "@/features/tasks/components";
import { useCreateTaskModal } from "@/features/tasks/hooks";

export function CreateTaskModal() {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </Modal>
  );
}
