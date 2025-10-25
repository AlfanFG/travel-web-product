import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface IDropdown {
  button: string | ReactNode;
  label: string;
  className: string;
  items: {
    label: string;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  }[];
}

export default function Dropdown({
  button,
  label,
  items,
  className,
}: Readonly<IDropdown>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>{button}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items?.map((item) => (
          <DropdownMenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
