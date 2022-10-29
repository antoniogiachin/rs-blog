// * Import React
import { useState, useRef, useEffect } from "react";
// * Imports Styles
import styles from "../../Login/RegisterForm.module.css";
// * Import Components
import { TheButton } from "../../UI/TheButton";
import { TheBadge } from "../../UI/TheBadge";
// * Import Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAllTags } from "../../../store/slicers/tagsSlice";
import { useSaveNewPostMutation } from "../../../api/modules/postApiSlice";
import {
  SET_ERROR,
  RESET_ERROR,
  errorMessage,
} from "../../../store/slicers/errorSlice";
import { SET_LOADING } from "../../../store/slicers/loadingSlice";
import { useLazyGetAllUserPostsQuery } from "../../../api/modules/postApiSlice";
import { userInfosBatch } from "../../../store/slicers/authSlice";
// * Import Font Awasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export const DashboardPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postMedia, setPostMedia] = useState([]);
  const [tags, setTags] = useState([]);

  const titleRef = useRef();

  //redux
  const allTags = useSelector(selectAllTags);
  const [saveNewPost, { isLoading }] = useSaveNewPostMutation();
  const [getAllUserPosts, { isLoading: isLoadingUserPosts }] =
    useLazyGetAllUserPostsQuery();
  const dispatch = useDispatch();
  const userInfos = useSelector(userInfosBatch);
  const error = useSelector(errorMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tags.length) {
      dispatch(
        SET_ERROR({
          status: 400,
          message: "Your post should include at lest one tag",
        })
      );
      return;
    }

    const payloadSave = {
      title,
      content,
      tags,
    };

    if (postMedia) {
      payloadSave.postMedia = postMedia;
    }

    const form = new FormData();
    for (const [key, val] of Object.entries(payloadSave)) {
      if (key === "postMedia") {
        for (const [index, media] of postMedia.entries()) {
          form.append(index, media, `${title}-${index}`);
        }
      } else {
        form.append(key, val);
      }
    }

    try {
      dispatch(SET_LOADING(true));
      await saveNewPost(form).unwrap();
      await getAllUserPosts(userInfos.email);
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

  const handleShowInfo = () => {
    console.log("info su come caricare immagini");
  };

  const handleCheckboxInput = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setTags((prevTags) => [...prevTags, value]);
    } else {
      setTags((prevTags) => [...prevTags.filter((tag) => tag !== value)]);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.value === "") return;
    setPostMedia((prevPostMedia) => [...prevPostMedia, e.target.files[0]]);
  };

  const handleFileRemove = (name) => {
    setPostMedia((prevPostMedia) => {
      return [...prevPostMedia.filter((media) => media.name != name)];
    });
  };

  const tagsSelector = allTags.map((tag) => (
    <div key={tag._id} className="flex space-x-2">
      <span>{tag.name} </span>
      <input type="checkbox" value={tag.name} onChange={handleCheckboxInput} />
    </div>
  ));

  const fileUploadedRender = postMedia.map((file) => (
    <div key={file?.lastModified} className="flex space-x-2 items-center">
      <p>{file?.name}</p>
      <FontAwesomeIcon
        className="text-red-500 cursor-pointer hover:underline"
        onClick={() => {
          handleFileRemove(file?.name);
        }}
        icon={faXmark}
      />
    </div>
  ));

  const tagsChosenRender = tags.map((tag) => (
    <TheBadge key={tag} severity="info" label={tag} shape="rounded" />
  ));

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 px-2 ">
      {/* title  */}
      <label className={styles.ms_label}>
        <span>title: </span>
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      {/* content  */}
      <label className={styles.ms_label}>
        <div className="flex  items-center justify-between">
          <span>content: </span>
          <div className="group hover:flex hover:space-x-2 hover:items-center">
            <div className="hidden group-hover:block">
              Learn how to insert images
            </div>
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faInfoCircle}
              onClick={handleShowInfo}
            />
          </div>
        </div>
        <textarea
          className="p-2"
          rows="10"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </label>
      {/* media  */}
      <label className={styles.ms_label}>
        <span>files: </span>
        <input
          type="file"
          onChange={handleFileUpload}
          disabled={postMedia.length === 3}
        />
        {postMedia.length > 3 && (
          <TheBadge label={"Max three files for post!"} severity={"danger"} />
        )}
        <p>File uploaded: {postMedia.length} files</p>
        <div className="mt-2">{fileUploadedRender}</div>
      </label>
      {/* tags  */}
      <label className="grid grid-cols-3 gap-2">
        {tags && (
          <div className="my-2 col-span-3 flex space-x-2 flex-wrap">
            {tagsChosenRender}
          </div>
        )}
        <span className="col-span-3">tags: </span>
        {tagsSelector}
      </label>

      <div className="col-span-1 flex items-center  justify-end space-x-5 mt-2">
        <TheButton
          disabled={!title || !content || !tags.length || postMedia.length > 3}
          label="Save"
          icon={faSave}
          type="warning"
          // isLoading={isLoading}
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
