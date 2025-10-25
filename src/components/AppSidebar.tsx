import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import menu from "@/data/menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="self-center">
            <img
              className="object-center"
              width={100}
              height={50}
              src="/favicon.ico"
            />
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    className={cn(
                      "hover:bg-[#F5F5F5] h-12",
                      pathname === item.link &&
                        "bg-[#F5F5F5] text-secondary hover:text-secondary"
                    )}
                    asChild
                  >
                    <Link to={item.link}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
