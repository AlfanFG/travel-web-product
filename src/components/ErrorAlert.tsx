import { AnimatePresence } from "motion/react";
import { FaExclamationCircle } from "react-icons/fa";
import { motion } from "motion/react";

interface IErrorAlert {
	message: string;
}

export default function ErrorAlert({ message }: IErrorAlert) {
	return (
		<AnimatePresence initial={false}>
			{message && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key="box"
					transition={{ duration: 0.4 }}
					className=" w-full flex gap-2 items-center shadow-[inset_4px_0_4px_-2px_rgba(200,0,0,0.5)] bg-red-100  p-4 rounded-md"
				>
					<span className="text-red-500">
						<FaExclamationCircle />{" "}
					</span>
					<p className="text-red-500 ">{message}</p>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
