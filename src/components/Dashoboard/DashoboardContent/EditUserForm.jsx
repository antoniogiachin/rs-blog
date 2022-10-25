// * Imports React
import { useState, useRef, useEffect } from "react";

// * Import React Router
import { useNavigate } from "react-router-dom";

// * Imports Styles
import styles from "../../Login/RegisterForm.module.css";

// * Import Components
import { TheButton } from "../../UI/TheButton";
import { TheBadge } from "../../UI/TheBadge";

// * Import Redux
import { useDispatch, useSelector } from "react-redux";
import { userInfosBatch } from "../../../store/slicers/authSlice";
import { SET_ERROR, errorMessage } from "../../../store/slicers/errorSlice";

// * Import FontAwasome
import { faSave } from "@fortawesome/free-solid-svg-icons";

export const EditUserForm = () => {
  // hook
  // const { handleRegister } = useRegister();

  //navigate
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const userInfos = useSelector(userInfosBatch);
  const error = useSelector(errorMessage);

  // regex email e password
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const usernameRef = useRef();

  const [email, setEmail] = useState(userInfos.email);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [username, setUsername] = useState(userInfos.username);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      dispatch(
        SET_ERROR({ status: 400, message: "Please provide a valid email" })
      );
      return;
    }

    // const res = await handleRegister({
    //   name,
    //   surname,
    //   username,
    //   email,
    //   password,
    //   isAuthor,
    //   birthDate,
    //   profilePicture,
    // });

    // if (res && res.success) {
    //   navigate("/");
    // } else {
    //   SET_IS_LOADING(false);
    // }
  };

  // al [] focus su nameRef
  useEffect(() => {
    usernameRef.current.focus();
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
    if (error) {
      setTimeout(() => {
        dispatch(SET_ERROR(null));
      }, 5000);
    }
  }, [error]);

  return (
    <form className="grid gap-4 grid-cols-2" onSubmit={handleSubmit}>
      {/* username  */}
      <label className={styles.ms_label}>
        <span>username: </span>
        <input
          ref={usernameRef}
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
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

      <div className="col-span-2 flex items-center  justify-end space-x-5 mt-2">
        <TheButton
          disabled={!username || !isValidEmail}
          label="Save"
          icon={faSave}
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
