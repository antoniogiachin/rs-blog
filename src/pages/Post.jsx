import { useLoaderData } from "react-router-dom";

export const Post = () => {
  const post = useLoaderData();
  const placeholder = JSON.stringify(post);

  const contentArray = post.content.split("INSERT");
  console.log(contentArray);
  let contentRender;
  if (post.media.length) {
    contentRender = post.media.map((media, index) => (
      <>
        {/* gestire inserimento video  */}
        <img
          className={`w-40 px-2 ${
            index % 2 === 0 ? "float-left" : "float-right"
          } rounded`}
          src={`${import.meta.env.VITE_BASE_URL}/${media}`}
        />
        <p className="font-Times">{contentArray[index]}</p>
      </>
    ));
  } else {
    contentRender = post.content;
  }

  return (
    <article>
      {placeholder} <h2 className={`text-9xl font-Lobster`}>{post.title}</h2>
      <div className="flex space-x-3 items-center text-xl px-2">
        <h4>
          Written by <span className="font-bold">{post.author.username}</span>
        </h4>
        <span> on {new Date(post.createdAt).toDateString()}</span>
      </div>
      <div className="text-lg font-Times mt-10">
        {contentRender}
        {contentArray[contentArray.length - 1]}
      </div>
    </article>
  );
};
