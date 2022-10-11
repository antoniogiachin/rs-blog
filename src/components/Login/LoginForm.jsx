import { useState } from "react";
import { TheButton } from "../UI/TheButton";
// styles
import "./LoginForm.css";

export const LoginForm = ({ isLogin, changeFormType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending Form");
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
        <TheButton label={isLogin ? "Login" : "Register"} />
      </div>
    </form>
  );
};
