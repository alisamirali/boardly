"use client";

import { Modal } from "@/components/modal";
import { EditTaskFormWrapper } from "@/features/tasks/components";
import { useEditTaskModal } from "@/features/tasks/hooks";

export function EditTaskModal() {
  const { taskId, close } = useEditTaskModal();

  return (
    <Modal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper onCancel={close} id={taskId} />}
    </Modal>
  );
}
