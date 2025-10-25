import Loading from "@/components/ui/loading";
import { useGetProfile } from "./hooks/useGetProfile";
import InputText from "@/components/input/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const profileSchema = z.object({
	username: z.string().min(1, { message: "Username is required!" }),
	email: z.string().min(1, { message: "Email is required!" }),
	lastUpdated: z.date().optional(),
});

export default function ProfileContainer() {
	const { data, isLoading, isError } = useGetProfile();

	const { control, formState } = useForm({
		values: {
			username: data?.data?.username || "",
			email: data?.data?.email || "",
			lastUpdated: data?.data?.updatedAt,
		},
		resolver: zodResolver(profileSchema),
	});

	const { errors } = formState;

	return (
		<div className="flex flex-col gap-2 w-full px-6 py-6">
			<div className="flex gap-4 items-end bg-white w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md">
				{isError && (
					<p className="text-red-500">Failed to load profile data.</p>
				)}
				{isLoading ? (
					<Loading />
				) : (
					<div className="flex flex-col gap-6 w-full px-6 pb-12 pt-4 relative">
						<InputText
							control={control}
							label="Username"
							name="username"
							id="username"
							placeholder="yourname"
							readonly
							hook
							error={errors?.username?.message}
						/>
						<InputText
							control={control}
							type="email"
							label="Email"
							name="email"
							id="email"
							readonly
							placeholder="you@example.com"
							error={errors?.email?.message}
							hook
						/>
						<InputText
							control={control}
							label="Last Updated"
							name="lastUpdated"
							id="lastUpdated"
							placeholder="-"
							readonly
							hook
						/>
					</div>
				)}
			</div>
		</div>
	);
}
