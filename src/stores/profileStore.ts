import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUserProfile {
	id: string;
	documentId: string;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: Date | undefined;
	updatedAt: Date | undefined;
	publishedAt: Date | undefined;
	locale: string | undefined;
}

interface IUserProfileStore {
	profile: IUserProfile;
	setProfile: (profile: IUserProfile) => void;
}

const useProfileStore = create<IUserProfileStore>()(
	persist(
		(set) => ({
			profile: {
				id: "",
				documentId: "",
				username: "",
				email: "",
				provider: "",
				confirmed: false,
				blocked: false,
				createdAt: undefined,
				updatedAt: undefined,
				publishedAt: undefined,
				locale: undefined,
			},

			setProfile: (profile: IUserProfile) =>
				set((state) => ({
					profile: { ...state.profile, ...profile },
				})),
		}),
		{
			name: "profile-storage",
		}
	)
);

export const useProfile = () => useProfileStore((state) => state.profile);

export const useProfileActions = () =>
	useProfileStore((state) => state.setProfile);
