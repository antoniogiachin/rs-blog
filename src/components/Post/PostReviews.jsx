import { useState, useEffect } from "react";
// * Import Components
import { TheButton } from "../UI/TheButton";
import { TheContainer } from "../UI/TheContainer";
// * Import FontAwasome
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

export const PostReviews = ({ reviews }) => {
  const [displayReviews, setDisplayReviews] = useState(5);

  const reviewsToRender = reviews.slice(0, displayReviews);
  const renderReviews = reviewsToRender.map((review, index) => (
    <TheContainer key={index} output={review} mode="review" />
  ));

  return (
    <article>
      <h5 className="text-4xl text-bold font-Lobster my-6">Reviews:</h5>
      <div className="grid grid-cols-1 gap-4 my-6">{renderReviews}</div>
      {reviews.length > displayReviews && (
        <TheButton
          functionToExecute={() => {
            setDisplayReviews((prevDisplay) => prevDisplay + 5);
          }}
          icon={faPlusCircle}
          label="Show More"
          type="success"
        />
      )}
      {displayReviews > 5 && (
        <TheButton
          functionToExecute={() => {
            setDisplayReviews((prevDisplay) => prevDisplay - 5);
          }}
          icon={faMinusCircle}
          label="Show Less"
          type="danger"
        />
      )}
    </article>
  );
};
