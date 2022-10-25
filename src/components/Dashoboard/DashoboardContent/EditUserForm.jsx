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
import {
  SET_ERROR,
  RESET_ERROR,
  errorMessage,
} from "../../../store/slicers/errorSlice";
import {
  SET_TOKEN,
  SET_USER_INFOS,
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
} from "../../../store/slicers/authSlice";
import { SET_LOADING } from "../../../store/slicers/loadingSlice";
import { useUpdateUserMutation } from "../../../api/modules/userApiSlice";

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

  // update redux
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // regex email e password
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const usernameRef = useRef();

  const [email, setEmail] = useState(userInfos.email);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [username, setUsername] = useState(userInfos.username);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(SET_LOADING(true));

    if (!isValidEmail) {
      dispatch(
        SET_ERROR({ status: 400, message: "Please provide a valid email" })
      );
      return;
    }

    const payloadUpdate = {
      username,
      email,
    };

    if (profilePicture) {
      payloadUpdate.profilePicture = profilePicture;
    }

    const form = new FormData();
    for (const [key, val] of Object.entries(payloadUpdate)) {
      if (key === "profilePicture") {
        form.append(key, val, val.name);
      } else {
        form.append(key, val);
      }
    }

    try {
      const { data, success, accessToken } = await updateUser({
        id: userInfos.id,
        body: form,
      }).unwrap();

      dispatch(SET_IS_LOGGED(success));
      dispatch(SET_IS_AUTHOR(data.isAuthor));
      dispatch(SET_USER_INFOS({ ...data }));
      dispatch(SET_TOKEN(accessToken));
      dispatch(SET_LOADING(false));
    } catch (err) {
      dispatch(SET_LOADING(false));

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
        dispatch(RESET_ERROR());
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
          type="warning"
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
