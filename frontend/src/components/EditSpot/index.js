import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const hisotry = useHistory()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        dispatch(spotsActions.getSpotDetails(spotId))
    }, [dispatch])

    const spot = useSelector((state) => state.spots)
    console.log('this', spot)

    useEffect(() => {
        setName(spot.name);
        setCity(spot.city);
        setState(spot.state);
        setCountry(spot.country);
        setAddress(spot.address);
        // setPrice(spot.price);
        setDescription(spot.description);
    }, [spot])

    let editedSpot;

    const handleSubmit = async (e) => {
        e.preventDefault()
        let spotData = {
            address,
            city,
            state,
            country,
            name,
            description,
            lat,
            lng,
            price
        }

        editedSpot = await dispatch(spotsActions.EditSpot(spotData, spotId))
        hisotry.push('/listings')
    }

    if (!Object.values(spot).length) return null
    return (
        <>
            <form
            onSubmit={handleSubmit}
            >
                <input
                    type='text'
                    value={name}
                    onChange={((e) => setName(e.target.value))}
                    placeholder='Name of spot'
                />
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Address'
                />
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                />
                <input
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='State'
                />
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder='Country'
                />
                <input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price per night'
                />
                <textarea
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description...'
                />
                <button>Submit</button>
            </form>
        </>
    )
}
