import InputText from "@/components/input/InputText";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "@/components/input/InputPassword";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import API from "@/api/api";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { useProfileActions, type IUserProfile } from "@/stores/profileStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "@/lib/utils";

const schema = z.object({
	email: z.string().min(1, { message: "Email is required!" }),
	password: z.string().min(1, { message: "Password is required!" }),
});

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const setProfile = useProfileActions();
	const navigate = useNavigate();
	const [rememberMe, setRememberMe] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(schema),
	});

	const handleCheck = (checked: boolean) => {
		setRememberMe(checked);
	};

	const login = async (data: ILogin) => {
		try {
			const response: AxiosResponse<AuthResponse> = await API.post(
				"/auth/local",
				{
					identifier: data.email,
					password: data.password,
				}
			);

			return { success: true, data: response.data };
		} catch (err: any) {
			const message =
				err.response?.data?.error?.message || "Login failed. Please try again.";
			return { success: false, error: message };
		}
	};

	const onSubmit: SubmitHandler<ILogin> = async (data) => {
		setLoading(true); // clear loading
		setError(""); // clear existing error first
		const result = await login(data);
		setLoading(false);

		if (!result.success) {
			setError(result.error);
		} else {
			if (rememberMe) {
				Cookies.set(TOKEN_KEY, result?.data?.jwt ?? "", { expires: 7 });
			} else {
				sessionStorage.setItem("access_token", result?.data?.jwt ?? "");
			}
			setProfile(result?.data?.user as IUserProfile);
			navigate("/");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-8 ">
				<InputText
					hook
					id="email"
					className="w-full"
					control={control}
					name="email"
					label="Email"
					placeholder="Enter your email"
					error={errors?.email?.message}
				/>
				<InputPassword
					control={control}
					name="password"
					label="Password"
					placeholder="Enter your password"
					error={errors?.password?.message}
				/>
				<div className="flex gap-2">
					<Checkbox id="rememberMe" onCheckedChange={handleCheck} />
					<Label htmlFor="rememberMe">Remember Me</Label>
				</div>
				<ErrorAlert message={error} />
				<div className="flex flex-col gap-4">
					<Button type="submit" disabled={loading} className="w-full">
						Login
					</Button>
					<Link to={"/register"} className="self-center">
						<p className="text-sm">Didn't have any account?</p>
					</Link>
				</div>
			</div>
		</form>
	);
}
