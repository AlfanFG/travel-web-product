import { useProfile } from "@/stores/profileStore";

export default function Home() {
	const profile = useProfile();
	return (
		<div className=" w-full p-4 my-6  rounded-md">
			<p className="text-2xl font-bold ml-6 bg-white p-4 rounded-md">
				Selamat Datang di Travel Article App {profile.username}
			</p>
		</div>
	);
}
