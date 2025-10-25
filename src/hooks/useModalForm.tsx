import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";

export default function useModalForm(title: string) {
	const [isOpen, setIsOpen] = useState(false);
	const showModal = () => setIsOpen(true);
	const hideModal = () => setIsOpen(false);
	const createModalForm = (form: ReactNode) => {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px] bg-white">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					<div className="overflow-auto max-h-[35rem] pb-6">{form}</div>
				</DialogContent>
			</Dialog>
		);
	};
	return { createModalForm, showModal, hideModal };
}
