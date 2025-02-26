import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="flex flex-col items-center max-w-md space-y-6 text-center text-primary-foreground">
        <img src="/Flauntify-logo.svg" alt="Flauntify Logo" className="size-20" />
          <h1 className="text-3xl font-normal tracking-wider mb-2">
            Welcome to <span className="font-extrabold italic text-4xl underline">Flauntify!</span>
          </h1>
          <span className="text-xl font-normal tracking-tight">Shop Smart, Live Stylish.</span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
