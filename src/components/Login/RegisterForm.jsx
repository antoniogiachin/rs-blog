// * Imports React
import { useState, useRef, useEffect } from "react";

// * Import React Router
import { useNavigate } from "react-router-dom";

// * Imports Styles
import styles from "./RegisterForm.module.css";

// * Import Components
import { TheButton } from "../UI/TheButton";
import { TheBadge } from "../UI/TheBadge";

// * Import Hooks
import { useRegister } from "../../hooks/useRegister";

// * Import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ERROR,
  authStatus,
  authErrorBatch,
  SET_IS_LOADING,
} from "../../store/slicers/authSlice";

// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const RegisterForm = ({ isLogin, changeFormType }) => {
  // hook
  const { handleRegister } = useRegister();

  //navigate
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const isLoading = useSelector(authStatus);
  const error = useSelector(authErrorBatch);

  // regex email e password
  const PWD_REGEX = /[0-9a-zA-Z]{6,}/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const nameRef = useRef();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [aka, setAka] = useState("");

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

    const res = await handleRegister({
      name,
      surname,
      username,
      email,
      password,
      isAuthor,
      birthDate,
    });

    if (res.success) {
      navigate("/");
    } else {
      SET_IS_LOADING(false);
    }
  };

  // al [] focus su nameRef
  useEffect(() => {
    nameRef.current.focus();
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
    if (!isAuthor) {
      setAka("");
    }
  }, [isAuthor]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(SET_ERROR(null));
      }, 2000);
    }
  }, [error]);

  return (
    <form className="grid gap-4 grid-cols-2" onSubmit={handleSubmit}>
      {/* name  */}
      <label className={styles.ms_label}>
        <span>name: </span>
        <input
          ref={nameRef}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      {/* surname  */}
      <label className={styles.ms_label}>
        <span>surname: </span>
        <input
          type="text"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />
      </label>
      {/* username  */}
      <label className={styles.ms_label}>
        <span>username: </span>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
      {/* birthdate  */}
      <label className={styles.ms_label}>
        <span>birth date: </span>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
          }}
        />
      </label>
      {/* email  */}
      <label className={styles.ms_label}>
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
      <label className={styles.ms_label}>
        <span>password: </span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className={!isValidPassword && password ? "block mt-2" : "hidden"}>
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
          <span>
            Password must be at least 6 characters (letters, numbers or simbols)
          </span>
        </div>
      </label>
      {/* aka  */}
      {isAuthor && (
        <label className={styles.ms_label}>
          <span>aka: </span>
          <input
            type="text"
            value={aka}
            onChange={(e) => {
              setAka(e.target.value);
            }}
          />
        </label>
      )}
      {/* author checkbox  */}
      <label
        className={`${
          !isAuthor ? "col-span-2 items-center" : "items-end"
        } flex space-x-5 justify-end `}
      >
        <span>Are you an author? </span>
        <input
          type="checkbox"
          value={isAuthor}
          onChange={(e) => {
            console.log(e.target.value);
            setIsAuthor((prevState) => !prevState);
          }}
        />
      </label>

      <div className="col-span-2 flex items-center  justify-end space-x-5 mt-2">
        <span
          onClick={changeFormType}
          className="hover:underline cursor-pointer text-xs"
        >
          Already registered?
        </span>
        <TheButton
          disabled={
            !name ||
            !surname ||
            !username ||
            !isValidEmail ||
            !isValidPassword ||
            !birthDate
          }
          label="Register"
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
