import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewEditForm from "../ReviewEditForm";
import ReviewCreateForm from "../ReviewCreateForm";
import DeleteReview from "../ReviewDelete";
import "./ReviewsGetAll.css";

export default function Reviews({ reviews, spot }) {
  const sessionUser = useSelector((state) => state.session.user);
  const reviewSelectors = useSelector((state) => state.reviews.allReviews);
  const allReviews = Object.values(reviews);
  const [showMenu, setShowMenu] = useState(false);
  console.log("xxx", spot);

  console.log("ayo", sessionUser);
  console.log("ayo2", allReviews);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  let flag = false;
  if (allReviews.length && sessionUser) {
    allReviews.forEach((review) => {
      if (review.userId === sessionUser.id) flag = true;
    });
  }

  return (
    <>
      <div className="all-reviews-wrapper">
        <div className="reviews-title-wrapper">
          <div className="reviews-title-container">
            <i class="fa-solid fa-star" id="star"></i>
            {spot.avgRating === "No ratings yet" ? (
              <span className="sub-title-avgrating">New</span>
            ) : (
              <span className="sub-title-avgrating">{spot.avgRating}</span>
            )}
            <i class="fa-solid fa-circle" id="review-dot"></i>
            <span className="sub-title-reviews">{spot.numReviews} reviews</span>
          </div>
          <div className='create-reviews-button-container'>
            {sessionUser &&
            sessionUser?.id !== spot.ownerId &&
            flag === false ? (
              <OpenModalMenuItem
                itemText="Create A Review"
                onItemClick={closeMenu}
                modalComponent={<ReviewCreateForm spot={spot} />}
              />
            ) : null}
          </div>
        </div>
        <div className="all-reviews-container">
          {allReviews.map((review) => {
            if (review) {
              return (
                <div className="review-wrapper">
                  <div className="review-top-container">
                    <div className="profile-icon-box">
                      <i
                        id="review-profile-icon"
                        class="fa-regular fa-circle-user"
                      ></i>
                    </div>
                    <div className="name-date-container">
                      <div className="review-name-box">
                        <span>{review.User.firstName}</span>
                      </div>
                      <div className="review-date-box">
                        <span>January 2022</span>
                      </div>
                    </div>
                    {sessionUser?.id === review.userId ? (
                      <div className="edit-delete-container">
                        <div className="edit-modal-button-box">
                          <OpenModalMenuItem
                            itemText="Edit"
                            onItemClick={closeMenu}
                            modalComponent={
                              <ReviewEditForm
                                userReview={review}
                                spotById={spot}
                              />
                            }
                          />
                        </div>
                        <div className="delete-button-box">
                          <DeleteReview userReview={review} spot={spot} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="review-bottom-container">
                    <div className="review-text-box">
                      <span>{review.review}</span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

    </>
  );
}

// {allReviews.map((review) => {
//     return (
//         <>
//             <span>{review.review}</span>
//             {review && sessionUser?.id === review.userId ? (
//                 <>
//                     <OpenModalMenuItem
//                         itemText='Edit'
//                         onItemClick={closeMenu}
//                         modalComponent={<ReviewEditForm userReview={review} spotById={spot} />}
//                     />
//                     <DeleteReview userReview={review} spot={spot} />
//                 </>
//             ): (null)}
//         </>
//     )
// })}
// {sessionUser && sessionUser?.id !== spot.ownerId && flag === false ? (
//     <OpenModalMenuItem
//     itemText='Create A Review'
//     onItemClick={closeMenu}
//     modalComponent={<ReviewCreateForm spot={spot} />} />
// ): (null)}
