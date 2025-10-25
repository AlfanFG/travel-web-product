import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex justify-center  bg-linear-to-r from-[#11998e] to-[#38ef7d] items-center w-full h-screen">
      <Outlet />
    </div>
  );
}
