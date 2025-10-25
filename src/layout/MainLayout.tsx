import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	return (
		<div className="flex min-h-screen w-full bg-gray-50">
			<main className="flex-1 flex flex-col bg-white">
				<Sidebar>
					<Outlet />
				</Sidebar>
			</main>
		</div>
	);
}
