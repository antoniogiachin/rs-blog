// * Imports React
import { useState, useRef, useEffect } from "react";

// * Imports Styles
import styles from "./RegisterForm.module.css";

// * Import Components
import { TheButton } from "../UI/TheButton";

// * Import Hooks
import { useAuth } from "../../hooks/useAuth";

// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const RegisterForm = ({ isLogin, changeFormType }) => {
  // is auth hook
  const { isLoading, user, userData, errors, setErrors, handleRegister } =
    useAuth();

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
      setErrors("Password must be at least 6 character");
      return;
    }

    if (!isValidEmail) {
      setErrors("Please provide a valid email");
      return;
    }

    await handleRegister({
      name,
      surname,
      username,
      email,
      password,
      isAuthor,
      aka,
      birthDate,
    });
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

      {errors && (
        <p className="text-red-500 uppercase col-span-2 text-right mt-2">
          {errors}
        </p>
      )}
    </form>
  );
};
