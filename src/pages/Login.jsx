// * Components Imports
import { LoginForm } from "../components/Login/LoginForm";
// * React Imports
import { useState } from "react";
import { RegisterForm } from "../components/Login/RegisterForm";

export const Login = () => {
  // formType
  const [isLogin, setIsLogin] = useState(true);
  const changeFormType = () => {
    setIsLogin((prevstate) => !prevstate);
  };

  return (
    <div className="flex flex-col space-y-5 items-center justify-center ">
      <h1 className="uppercase text-xl">{isLogin ? "Login" : "Register"}</h1>
      <div
        className={`${
          isLogin ? "w-full md:w-1/3" : "w-full"
        } p-5 border rounded-md border-slate-800 shadow-lg bg-purple-800 text-slate-300`}
      >
        {isLogin && (
          <LoginForm changeFormType={changeFormType} isLogin={isLogin} />
        )}
        {!isLogin && (
          <RegisterForm changeFormType={changeFormType} isLogin={isLogin} />
        )}
      </div>
    </div>
  );
};
