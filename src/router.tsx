import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Article from "./pages/article";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { PrivateRoute, AuthRoute } from "./middleware";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
import Category from "./pages/category";
import Comment from "./pages/comment";
import Profile from "./pages/Profile";

const route = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<MainLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "article",
				element: <Article />,
			},
			{
				path: "category",
				element: <Category />,
			},
			{
				path: "comment",
				element: <Comment />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{ path: "*", element: <NotFound /> },
		],
	},
	{
		path: "/",
		element: (
			<AuthRoute>
				<AuthLayout />
			</AuthRoute>
		),
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
		],
	},
]);

export default route;
