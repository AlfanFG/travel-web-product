import { Button } from "@/components/ui/button";
import ProfileContainer from "@/feature/profile/ProfileContainer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const navigate = useNavigate();
	return (
		<div className="h-full w-full p-4 rounded-md">
			<div className="flex justify-between">
				<p className="text-2xl font-bold ml-6">Profile</p>
				<Button variant={"ghost"} onClick={() => navigate(-1)}>
					<ArrowLeft />
				</Button>
			</div>
			<ProfileContainer />
		</div>
	);
}
