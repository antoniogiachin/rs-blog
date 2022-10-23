import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// * Import Components
import { TheButton } from "../UI/TheButton";
import { TheBadge } from "../UI/TheBadge";

// * Import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogin,
  authStatus,
  authErrorBatch,
  SET_ERROR,
} from "../../store/slicers/authSlice";

// styles
import "./LoginForm.css";

export const LoginForm = ({ isLogin, changeFormType }) => {
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const error = useSelector(authErrorBatch);
  const isLoading = useSelector(authStatus);

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
      dispatch(SET_ERROR("Password must be at least 6 character"));
      return;
    }

    if (!isValidEmail) {
      dispatch(SET_ERROR("Please provide a valid email"));
      return;
    }

    const { payload } = await dispatch(handleLogin({ email, password }));
    if (payload.success) navigate("/");
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

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(SET_ERROR(null));
      }, 5000);
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-3 item-center justify-center"
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

      {error && (
        <div className="col-span-1 col-start-2  mt-2">
          <TheBadge label={error} severity={"danger"} />
        </div>
      )}
    </form>
  );
};
