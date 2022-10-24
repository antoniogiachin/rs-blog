// * Imports React
import { useState, useRef, useEffect, useCallback } from "react";

// * Import React Router
import { useNavigate } from "react-router-dom";

// * Imports Styles
import styles from "./RegisterForm.module.css";

// * Import Components
import { TheButton } from "../UI/TheButton";
import { TheBadge } from "../UI/TheBadge";

// * Import Redux
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../api/modules/userApiSlice";
import { useLoginMutation } from "../../api/modules/authApiSlice";
import {
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
  SET_TOKEN,
  RESET,
} from "../../store/slicers/authSlice";
import {
  SET_ERROR,
  RESET_ERROR,
  errorMessage,
} from "../../store/slicers/errorSlice";

// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const RegisterForm = ({ changeFormType }) => {
  //navigate
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const error = useSelector(errorMessage);
  const [register, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

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
  const [profilePicture, setProfilePicture] = useState(null);

  const subtractYears = useCallback((numOfYears, date = new Date()) => {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const minYear = subtractYears(100);

    if (new Date(birthDate) < minYear) {
      setBirthDate("");
      dispatch(
        SET_ERROR({
          status: 400,
          message: "Invalid date! (Or maybe you're to old :(  !)",
        })
      );
      return;
    }

    if (!isValidPassword) {
      dispatch(
        SET_ERROR({
          status: 400,
          message: "Password must be at least 6 character",
        })
      );
      return;
    }

    if (!isValidEmail) {
      dispatch(
        SET_ERROR({ status: 400, message: "Please provide a valid email" })
      );
      return;
    }

    const payload = {
      name,
      surname,
      username,
      email,
      password,
      birthDate,
      isAuthor,
    };

    if (profilePicture) {
      payload.profilePicture = profilePicture;
    }

    const form = new FormData();
    for (const [key, val] of Object.entries(payload)) {
      if (key === "profilePicture") {
        form.append(key, val, val.name);
      } else {
        form.append(key, val);
      }
    }

    try {
      const reg = await register(form).unwrap();
      const res = await login({
        email: payload.email,
        password: payload.password,
      }).unwrap();

      dispatch(SET_IS_LOGGED(res.success));
      dispatch(SET_IS_AUTHOR(res.user.isAuthor));
      dispatch(SET_USER_INFOS({ ...res.user }));
      dispatch(SET_TOKEN(res.accessToken));
      navigate("/");
    } catch (err) {
      dispatch(
        SET_ERROR({ status: err.data.status, message: err.data.message })
      );
      setTimeout(() => {
        dispatch(RESET_ERROR({}));
      }, 5000);
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
    if (error) {
      setTimeout(() => {
        dispatch(RESET_ERROR());
      }, 5000);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-2">
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
      {/* profilePicture  */}
      <label className="flex items-center justify-between  space-x-3">
        <span>profile picture: </span>
        <input
          type="file"
          onChange={(e) => {
            setProfilePicture(e.target.files[0]);
          }}
        />
      </label>
      {/* author checkbox  */}
      <label className="flex items-center justify-end  space-x-3">
        <span>Are you an author? </span>
        <input
          type="checkbox"
          value={isAuthor}
          onChange={(e) => {
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
          isLoading={isLoading || isLoginLoading}
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
