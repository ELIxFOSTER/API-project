import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import { useSelector } from "react-redux";
import SpotCard from "../SingleSpotCard";
import "./ManageListings.css";

export default function ManageListings() {
  const dispatch = useDispatch();
  const [spots, setSpots] = useState([]);

  const currUserSpots = useSelector((state) =>
    Object.values(state.spots.AllSpots)
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(spotsActions.getCurrentUserSpots());
      setSpots(response);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="listing-page-wrapper">
      <div>
        <span>Listings</span>
      </div>
      {currUserSpots.length > 0 ? (
        currUserSpots.map((spot) => {
          return (
            <div>
              <div>
                <SpotCard key={spot.name} spot={spot} />
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div>
            <span>No Listings</span>
          </div>
          <div>
            <span>List your home</span>
          </div>
        </div>
      )}
    </div>
  );
}
