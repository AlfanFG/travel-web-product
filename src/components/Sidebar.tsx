import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "./Navbar";

export default function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<SidebarTrigger />
				<Navbar />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
