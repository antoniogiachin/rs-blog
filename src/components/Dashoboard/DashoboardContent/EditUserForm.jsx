// * Imports React
import { useState, useRef, useEffect } from "react";

// * Import React Router
import { useNavigate } from "react-router-dom";

// * Imports Styles
import styles from "../../Login/RegisterForm.module.css";

// * Import Components
import { TheButton } from "../../UI/TheButton";
import { TheBadge } from "../../UI/TheBadge";

// * Import Hooks
// import { useRegister } from "../../hooks/useRegister";

// * Import Redux
import { useDispatch, useSelector } from "react-redux";
import { userInfosBatch } from "../../../store/slicers/authSlice";

// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const EditUserForm = () => {
  // hook
  // const { handleRegister } = useRegister();

  //navigate
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const userInfos = useSelector(userInfosBatch);

  // regex email e password
  const PWD_REGEX = /[0-9a-zA-Z]{6,}/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const nameRef = useRef();

  const [name, setName] = useState(userInfos.name);

  const [email, setEmail] = useState(userInfos.email);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState(userInfos.password);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [surname, setSurname] = useState(userInfos.surname);
  const [username, setUsername] = useState(userInfos.username);
  const [birthDate, setBirthDate] = useState(userInfos.birthDate.split("T")[0]);
  const [isAuthor, setIsAuthor] = useState(userInfos.isAuthor);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword) {
      // dispatch(SET_ERROR("Password must be at least 6 character"));
      return;
    }

    if (!isValidEmail) {
      // dispatch(SET_ERROR("Please provide a valid email"));
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
      profilePicture,
    });

    if (res && res.success) {
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

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       dispatch(SET_ERROR(null));
  //     }, 5000);
  //   }
  // }, [error]);

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
        />
      </div>

      {/* {error && (
        <div className="col-span-1 col-start-2  mt-2">
          <TheBadge label={error} severity={"danger"} />
        </div>
      )} */}
    </form>
  );
};
