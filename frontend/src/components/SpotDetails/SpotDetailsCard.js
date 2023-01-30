import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSpotDetails } from "../../store/spots";
import { NavLink, useParams } from "react-router-dom";
import DeleteSpot from "../DeleteSpot";
import { useSelector } from "react-redux";
import selfCheckIn from "../../images/selfCheckIn.png";
import Reviews from "../ReviewsGetAll";
import "./SpotDetails.css";

export default function SpotDetailsCard({ spot, reviews }) {
  const sessionUser = useSelector((state) => state.session.user);

  const editRoute = 'edit'

  console.log("yoo", spot);
  let previewImageUrl;
  //
  const imageHandler = () => {
    spot.SpotImages.forEach((image) => {
      console.log("yup", image);
      if (image.preview === true) previewImageUrl = image.url;
    });
  };

  imageHandler();

  return (
    <div className="details-page-wrapper">
      <div className="title-container">
        <div>
          <h1 className="spot-name">{spot.name}</h1>
        </div>
        <div className="sub-title-wrapper">
          <div className="sub-title-container">
            <i class="fa-solid fa-star" id="star"></i>
            {spot.avgRating === "No ratings yet" ? (
              <span className="sub-title-avgrating">New</span>
            ) : (
              <span className="sub-title-avgrating">{spot.avgRating}</span>
            )}
            <i class="fa-solid fa-circle" id="dot-1"></i>
            <span className="sub-title-reviews">{spot.numReviews} reviews</span>
            <i class="fa-solid fa-circle" id="dot-2"></i>
            <i class="fa-solid fa-medal" id="medal"></i>
            <span className="sub-title-superhost">Superhost</span>
            <i class="fa-solid fa-circle" id="dot-3"></i>
            <span className="sub-title-location">
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>
          <div>
            <div className="edit-delete-wrapper">
              {sessionUser && spot.ownerId === sessionUser.id ? (
                <>
                  <div className="edit-button-container">
                    <NavLink
                      to={`/${editRoute}/${spot.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <i class="fa-regular fa-pen-to-square" id="edit"></i>
                      <span className="edit-button">Edit</span>
                    </NavLink>
                  </div>
                  <div className="delete-button-container">
                    <i class="fa-solid fa-trash-can" id="delete"></i>
                    <DeleteSpot />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>{/* //* Reviews here and SUPER HOST */}</div>
      <div>
        <div className="other-images-container">
          {spot.SpotImages.map((image, idx) => {
            if (image.preview === true)
              return (
                <img
                  className="other-images-container-col-2 other-images-container-row-2"
                  src={image.url}
                ></img>
              );
          })}
          {spot.SpotImages.map((image, idx) => {
            if (image.preview === false)
              return (
                <img className={`other-image-${idx}`} src={image.url}></img>
              );
          })}
        </div>
      </div>
      <div className="hosted-by-wrapper">
        <div className="hosted-by-fit-wrapper">
          <div className="hosted-by-container">
            <span className="hosted-by-title">
              Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}
            </span>
          </div>
          <div className="house-specs-container">
            <span>16+ guests</span>
            <i class="fa-solid fa-circle"></i>
            <span>8 bedrooms</span>
            <i class="fa-solid fa-circle"></i>
            <span>10 beds</span>
            <i class="fa-solid fa-circle"></i>
            <span>6.5 baths</span>
          </div>
        </div>
      </div>
      {/* <div className="details-wrapper">
        <div className="details-fit-wrapper">
          <div className="checkin-details-container">
            <div className='checkin-box'>
            <i class="fa-solid fa-door-open" id='door' ></i>
            <password className='self-checkin' >Self check-in</password>
            <p className='self-checkin-description'>Check yourself in with the keypad.</p>
            </div>
          </div>
          <div className="superhost-details-container">
            <div className='superhost-box'>
            <i class="fa-solid fa-award" id='award'></i>
            <span>{spot.Owner.firstName} is a Superhost</span>
            <p>
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </p>
            </div>
          </div>
          <div className='cancellation-details-container' >
            <i class="fa-regular fa-calendar-check" id='calendar' ></i>
            <span>Free 7 day cancellation</span>
          </div>
        </div>
      </div> */}

      <div className='badge-wrapper'>
        <div className='checkin-main-container'>
            <div className='door-icon-box'>
            <i class="fa-solid fa-door-open" id='door' ></i>
            </div>
            <div className='checkin-text-container'>
                <div className='checkin-title-box'>
                    <span>Self check-in</span>
                </div>
                <div className='checkin-text-box'>
                    <span>Check yourself in with the lockbox.</span>
                </div>
            </div>
        </div>
        <div className='superhost-main-container'>
            <div className='award-icon-box'>
            <i class="fa-regular fa-handshake" id='handshake' ></i>
            </div>
            <div className='superhost-text-container'>
                <div className='superhost-title-box'>
                    <span>{spot.Owner.firstName} is a Superhost</span>
                </div>
                <div className='superhost-text-box'>
                    <span>
                    Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                    </span>
                </div>
            </div>
        </div>
        <div className='calendar-main-container'>
            <div className='calendar-icon-box'>
                <i class="fa-regular fa-calendar-check" id='calendar' ></i>
            </div>
            <div className='calendar-text-box'>
                <span>Free 7 day cancellation</span>
            </div>
        </div>
      </div>

      <div className='aircover-wrapper'>
        {/* <img src={"frontend/src/images/air-cover-real.png"}></img> */}
        <div className='aircover-image-box'>
            <img className='aircover-image' src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' ></img>
        </div>
        <div className='aircover-text-box'>
        <span>
          Every booking includes free protection from Host cancellations,
          listing inaccuracies, and other issues like trouble checking in.
        </span>
        </div>
      </div>
      <div className='spot-description-container'>
        <div className='spot-description-box'>
            <span>{spot.description}</span>
        </div>
      </div>
        <Reviews reviews={reviews} spot={spot} />
    </div>
  );
}
