import { useState, useRef, useEffect } from "react";
// * Import Components
import { TheButton } from "../UI/TheButton";
import { TheBadge } from "../UI/TheBadge";

// styles
import "./LoginForm.css";
// custom hooks
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = ({ isLogin, changeFormType }) => {
  const { isLoading, handleLogin, errors, setErrors } = useAuth();

  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  // regex email e password
  const PWD_REGEX = /[0-9a-zA-Z]{6,}/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPassword) {
      setErrors("Password must be at least 6 character");
      return;
    }

    if (!isValidEmail) {
      setErrors("Please provide a valid email");
      return;
    }

    await handleLogin({ email, password });
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const validation = EMAIL_REGEX.test(email);
    if (validation && email) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }, [email]);

  useEffect(() => {
    const validation = PWD_REGEX.test(password);
    if (validation && password) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [password]);

  return (
    <form
      className="flex flex-col space-y-3 item-center justify-center"
      onSubmit={handleSubmit}
    >
      {/* email  */}
      <label className="ms_label">
        <span>email: </span>
        <input
          ref={emailRef}
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
          disabled={!isValidEmail || !isValidPassword}
          label="Login"
          isLoading={isLoading}
        />
      </div>

      {errors && (
        <div className="col-span-1 col-start-2  mt-2">
          <TheBadge label={errors} severity={"danger"} />
        </div>
      )}
    </form>
  );
};
