import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./lib/utils";

export function PrivateRoute({ children }: Readonly<{ children: ReactNode }>) {
	if (!getToken()) {
		return <Navigate to={"/login"} />;
	}

	return children;
}

export function AuthRoute({ children }: { children: ReactNode }) {
	if (sessionStorage.getItem("access_token") || getToken()) {
		<Navigate to={"/login"} />;
	}
	return children;
}
