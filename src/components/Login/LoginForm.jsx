import { useState } from "react";
import { TheButton } from "../UI/TheButton";
// styles
import "./LoginForm.css";
// custom hooks
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = ({ isLogin, changeFormType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, handleLogin, errors } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <form
      className="flex flex-col space-y-3 item-center justify-center"
      onSubmit={handleSubmit}
    >
      {/* email  */}
      <label className="ms_label">
        <span>email: </span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      {/* password */}
      <label className="ms_label">
        <span>password: </span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            console.log(e);
            setPassword(e.target.value);
          }}
        />
      </label>

      <div className="flex items-center  justify-between space-x-2 mt-2">
        <span
          onClick={changeFormType}
          className="hover:underline cursor-pointer text-xs"
        >
          {isLogin ? "Not Registered yet?" : "Already registered?"}
        </span>
        <TheButton
          label={isLogin ? "Login" : "Register"}
          isLoading={isLoading}
        />
      </div>

      {errors && (
        <p className="text-red-500 uppercase col-span-2 text-right mt-2">
          {errors}
        </p>
      )}
    </form>
  );
};
