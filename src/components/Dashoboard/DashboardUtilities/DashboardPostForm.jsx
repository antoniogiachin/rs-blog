// * Import React
import { useState, useRef, useEffect } from "react";
// * Imports Styles
import styles from "../../Login/RegisterForm.module.css";
// * Import Redux
import { useSelector } from "react-redux";
import { selectAllTags } from "../../../store/slicers/tagsSlice";

export const DashboardPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postMedia, setPostMedia] = useState([]);
  const [tags, setTags] = useState([]);

  const titleRef = useRef();

  const allTags = useSelector(selectAllTags);
  console.log(allTags);

  const handleCheckboxInput = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    if (checked) {
      setTags((prevTags) => [...prevTags, value]);
    } else {
      setTags((prevTags) => [...prevTags.filter((tag) => tag !== value)]);
    }
  };

  const tagsSelector = allTags.map((tag) => (
    <div key={tag._id} className="flex space-x-2">
      <span>{tag.name} </span>
      <input type="checkbox" value={tag.name} onChange={handleCheckboxInput} />
    </div>
  ));

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <form className="grid gap-4 grid-cols-1 px-2 ">
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
        <span>content: </span>
        <textarea
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
          multiple
          onChange={(e) => {
            setPostMedia(e.target.value);
          }}
        />
      </label>
      {/* tags  */}
      {tags}
      <label className="grid grid-cols-3 gap-2">
        <span className="col-span-3">tags: </span>
        {tagsSelector}
      </label>
    </form>
  );
};
