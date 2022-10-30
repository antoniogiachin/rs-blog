// * Import Router
import { useLoaderData } from "react-router-dom";
// * Imports Components
import { PostDisplay } from "../components/Post/PostDisplay";
import { PostReviews } from "../components/Post/PostReviews";

export const Post = () => {
  const post = useLoaderData();
  const contentArray = post.content.split("INSERT");

  const reviews = [
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
    {
      id: 1,
      title:
        "Excepteur elit deserunt cupidatat nulla cillum pariatur laborum consectetur cupidatat id quis.",
    },
  ];

  return (
    <section>
      {/* post  */}
      <PostDisplay post={post} contentArray={contentArray} />
      {/* comments */}
      <PostReviews reviews={reviews} />
    </section>
  );
};
