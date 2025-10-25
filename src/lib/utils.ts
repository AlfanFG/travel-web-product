import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import moment from "moment";
import ImageNotFound from "@/assets/image-notfound.png";
export const TOKEN_KEY = "authToken";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date | undefined) {
	return date ? moment(date).format("DD MMM YYYY") : "-";
}

export function getError(err: unknown) {
	let message = "Failed to fetch articles. Please try again.";
	if (err && typeof err === "object" && "response" in err) {
		const errorObj = err as {
			response?: { data?: { error?: { message?: string } } };
		};
		message =
			errorObj.response?.data?.error?.message ||
			"Failed to fetch articles. Please try again.";
	}

	return message;
}

export function getImageLink(link: string) {
	return link?.startsWith("https://") ? link : ImageNotFound;
}

export const setToken = (token: string, remember: boolean) => {
	const options = remember
		? { expires: 7 } // 7 days
		: undefined; // session cookie (deleted when browser closed)

	Cookies.set(TOKEN_KEY, token, options);
};

export const getToken = () => {
	return Cookies.get(TOKEN_KEY);
};

export const logout = () => {
	Cookies.remove(TOKEN_KEY);
};
