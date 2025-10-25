import { FaCheckCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
interface ISuccessAlert {
	message: string;
}

export default function SuccessAlert({ message }: ISuccessAlert) {
	return (
		<AnimatePresence initial={false}>
			{message && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key="box"
					transition={{ duration: 0.4 }}
					className=" w-full flex gap-2 items-center shadow-[inset_4px_0_4px_-2px_#5cb85c] bg-green-100  p-4 rounded-md"
				>
					<span className="text-green-500">
						<FaCheckCircle />{" "}
					</span>
					<p className="text-green-500 ">{message}</p>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
