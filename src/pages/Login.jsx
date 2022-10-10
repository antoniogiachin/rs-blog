import { LoginForm } from "../components/Login/LoginForm";

export const Login = () => {
  return (
    <div className="flex flex-col space-y-5 items-center justify-center ">
      <h1 className="uppercase text-xl">Login</h1>
      <div className="w-1/2 p-5 border rounded-md border-black bg-purple-800 text-slate-300">
        <LoginForm />
      </div>
    </div>
  );
};
