// * Imports React
import { useState } from "react";

// * Imports Styles
import styles from "./RegisterForm.module.css";

// * Import Components
import { TheButton } from "../UI/TheButton";

// * Import Hooks
import { useAuth } from "../../hooks/useAuth";

export const RegisterForm = ({ isLogin, changeFormType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [aka, setAka] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({
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

  const { isLoading, user, userData, errors, handleRegister } = useAuth();

  return (
    <form className="grid gap-4 grid-cols-2" onSubmit={handleSubmit}>
      {/* name  */}
      <label className={styles.ms_label}>
        <span>name: </span>
        <input
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
            console.log(e);
            setPassword(e.target.value);
          }}
        />
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
        <TheButton label="Register" isLoading={isLoading} />
      </div>

      {errors && (
        <p className="text-red-500 uppercase col-span-2 text-right mt-2">
          {errors}
        </p>
      )}
    </form>
  );
};
