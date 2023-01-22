import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import { useSelector } from "react-redux";
import "./NewSpotForm.css";
import detailslogo from '../../images/navlogo.png'
export default function NewSpotForm() {
  const dispatch = useDispatch();
  let history = useHistory();
  const sessionUser = useSelector((state) => state.session.user)

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [spotId, setSpotId] = useState("");
  const [hasSubmit, setHasSubmit] = useState(false);

  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");
  const [imageFive, setImageFive] = useState("");
  const imageArr = [imageOne, imageTwo, imageThree, imageFour, imageFive];

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const spotData = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    };

    const previewImage = { url: imageOne, preview: true };

    let newSpot = await dispatch(spotsActions.CreateNewSpot(spotData)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    );

    if (newSpot) {
      console.log("PLEASE FKN WORK", newSpot);
      setSpotId(newSpot.id);
      console.log('preview image', previewImage)
      await dispatch(spotsActions.addSpotImages(previewImage, newSpot.id));

      for (let imageUrl of imageArr) {
        if (imageUrl !== previewImage.url) {
          const imageObj = { url: imageUrl, preview: false };
          console.log('false images', imageUrl)
          await dispatch(spotsActions.addSpotImages(imageObj, newSpot.id));
        }
      }
      await history.push("/listings");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="page-content-container">
          <div className='detail-box'>
            <div className='welcome-text-box'>
            <h1>Welcome, {sessionUser.username} </h1>
            <h4 id='this'>Please enter valid information and provide all image urls</h4>
            </div>
          </div>
          <div className='form-box'>
            <form className="create-form" onSubmit={handleSubmit}>
              {errors.length > 0
                ? errors.map((error, idx) => {
                    return <span key={idx}>{error}</span>;
                  })
                : null}
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
                required
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
              <input
                type="url"
                value={imageOne}
                onChange={(e) => setImageOne(e.target.value)}
                placeholder="Preview Image"
                required
              />
              <input
                type="url"
                value={imageTwo}
                onChange={(e) => setImageTwo(e.target.value)}
                placeholder="Image Url"
                required
              />
              <input
                type="url"
                value={imageThree}
                onChange={(e) => setImageThree(e.target.value)}
                placeholder="Image Url"
                required
              />
              <input
                type="url"
                value={imageFour}
                onChange={(e) => setImageFour(e.target.value)}
                placeholder="Image Url"
                required
              />
              <input
                type="url"
                value={imageFive}
                onChange={(e) => setImageFive(e.target.value)}
                placeholder="Image Url"
                required
              />
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
              <button className='create-submit-button' >Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //     <>
  //         <form
  //         onSubmit={handleSubmit}
  //         >
  //             <ul>
  //             {errors.length > 0 ? (
  //         errors.map((error, idx) => {
  //           return (
  //             <li key={idx}>{error}</li>
  //           )
  //         })
  //       ) : ( null )}
  //             </ul>
  //             <input
  //                 type='text'
  //                 value={name}
  //                 onChange={((e) => setName(e.target.value))}
  //                 placeholder='Name of spot'
  //                 required
  //             />
  //             <input
  //                 type='text'
  //                 value={address}
  //                 onChange={(e) => setAddress(e.target.value)}
  //                 placeholder='Address'
  //                 required
  //             />
  //             <input
  //                 type='text'
  //                 value={city}
  //                 onChange={(e) => setCity(e.target.value)}
  //                 placeholder='City'
  //                 required
  //             />
  //             <input
  //                 type='text'
  //                 value={state}
  //                 onChange={(e) => setState(e.target.value)}
  //                 placeholder='State'
  //                 required
  //             />
  //             <input
  //                 type='text'
  //                 value={country}
  //                 onChange={(e) => setCountry(e.target.value)}
  //                 placeholder='Country'
  //                 required
  //             />
  //             <input
  //                 type='number'
  //                 value={price}
  //                 onChange={(e) => setPrice(e.target.value)}
  //                 placeholder='Price per night'
  //                 required
  //             />
  //             <input
  //                 type='url'
  //                 value={imageOne}
  //                 onChange={(e) => setImageOne(e.target.value)}
  //                 placeholder='Image One Url'
  //                 required
  //             />
  //             <input
  //                 type='url'
  //                 value={imageTwo}
  //                 onChange={(e) => setImageTwo(e.target.value)}
  //                 placeholder='Image One Url'
  //                 required
  //             />
  //             <input
  //                 type='url'
  //                 value={imageThree}
  //                 onChange={(e) => setImageThree(e.target.value)}
  //                 placeholder='Image One Url'
  //                 required
  //             />
  //             <input
  //                 type='url'
  //                 value={imageFour}
  //                 onChange={(e) => setImageFour(e.target.value)}
  //                 placeholder='Image One Url'
  //                 required
  //             />
  //             <input
  //                 type='url'
  //                 value={imageFive}
  //                 onChange={(e) => setImageFive(e.target.value)}
  //                 placeholder='Image One Url'
  //                 required
  //             />
  //             <textarea
  //                 type='text'
  //                 value={description}
  //                 onChange={(e) => setDescription(e.target.value)}
  //                 placeholder='Description...'
  //                 required
  //             />
  //             <button>Submit</button>
  //         </form>
  //     </>

  // )
}
