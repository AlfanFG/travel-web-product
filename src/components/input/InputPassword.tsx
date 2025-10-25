import {
	Controller,
	type Control,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface IInputPassword<T extends FieldValues> {
	control: Control<T>;
	label: string;
	name: Path<T>;
	error: string | undefined;
	placeholder: string;
	onChange?: (value: string) => void;
}

export default function InputPassword<T extends FieldValues>({
	control,
	label,
	placeholder,
	name,
	error,
}: IInputPassword<T>) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor={name}>{label} </Label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							placeholder={placeholder}
							id={name}
							{...field}
						/>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
							onClick={() => setShowPassword(!showPassword)}
							aria-label={showPassword ? "Hide Password" : "Show Password"}
						>
							{showPassword ? (
								<EyeOffIcon
									className="h-4 w-4 text-muted-foreground"
									aria-hidden="true"
								/>
							) : (
								<EyeIcon
									className="h-4 w-4 text-muted-foreground"
									aria-hidden="true"
								/>
							)}
						</Button>
					</div>
				)}
			/>
			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
