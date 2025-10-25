import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useState } from "react";

export default function useConfirmationModal(description: string) {
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);
  const createConfirmationModal = (confirm: () => void) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <AlertDialogTrigger>{button}</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirm()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return { createConfirmationModal, showModal, hideModal };
}
