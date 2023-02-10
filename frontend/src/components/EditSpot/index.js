import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./EditSpot.css";

export default function EditSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user)

  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(spotsActions.getSpotDetails(spotId));
  }, [dispatch, spotId]);

  const spot = useSelector((state) => state.spots);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let spotData = {
      address,
      city,
      state,
      country,
      name,
      description,
      lat,
      lng,
      price,
    };

    if (price <= 0) alert('Price must be greater than 0')

    const newSpot = await dispatch(
      spotsActions.EditSpot(spotData, spotId)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(Object.values(data.errors));
        console.log("yo this error", errors);
      } else {
      }
    });

    if (newSpot) {
      history.push("/");
    }
  };

  if (!Object.values(spot).length) return null;

  return (
    <>
      <div className="edit-page-wrapper">
        <div className="edit-page-container">
          <div className="edit-text-box">
            <div className='edit-text-container'>
              <h1>Hello, {sessionUser.username}</h1>
              <h4>Please update the requested inputs</h4>
            </div>
          </div>
          <div className="edit-form-box">
            <form onSubmit={handleSubmit} className="edit-form">
              {errors.length > 0
                ? errors.map((error, idx) => {
                    return <li key={idx}>{error}</li>;
                  })
                : null}
              {errors.length > 0 ? (
                <ul>
                  {errors.map((error, idx) => {
                    return <li key={idx}>{error}</li>;
                  })}
                </ul>
              ) : null}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of spot"
                required
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                requried
              />
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                required
              />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                required
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price per night"
                required
              />
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
                required
              />
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
