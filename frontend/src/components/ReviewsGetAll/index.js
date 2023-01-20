import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewEditForm from "../ReviewEditForm";
import ReviewCreateForm from "../ReviewCreateForm";
import DeleteReview from "../ReviewDelete";

export default function Reviews({ reviews, spot }) {
    const sessionUser = useSelector((state) => state.session.user)
    const reviewSelectors = useSelector((state) => state.reviews.allReviews)
    const allReviews = Object.values(reviews)
const [showMenu, setShowMenu] = useState(false)
console.log('xxx', spot)

console.log('ayo', sessionUser)
console.log('ayo2', allReviews)

const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true)
}

const closeMenu = () => setShowMenu(false)

useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

if (!allReviews.length) return null

let flag = false
if (allReviews.length) {
    allReviews.forEach((review) => {
        if (review.userId === sessionUser.id) flag = true
    })
}

    return (
        <>
            <h1>Reviews</h1>
            {allReviews.map((review) => {
                return (
                    <>
                        <li>{review.review}</li>
                        {review && sessionUser.id === review.userId ? (
                            <>
                                <OpenModalMenuItem
                                    itemText='Edit'
                                    onItemClick={closeMenu}
                                    modalComponent={<ReviewEditForm userReview={review} spotById={spot} />}
                                />
                                <DeleteReview userReview={review} />
                            </>
                        ): (null)}
                    </>
                )
            })}
            {sessionUser.id !== spot.ownerId && flag === false ? (
                <OpenModalMenuItem
                itemText='Create A Review'
                onItemClick={closeMenu}
                modalComponent={<ReviewCreateForm spot={spot} />} />
            ): (null)}
        </>
    )
}
