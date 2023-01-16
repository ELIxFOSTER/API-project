import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";

export default function NewSpotForm() {
    const dispatch = useDispatch()
    let history = useHistory()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [spotId, setSpotId] = useState('')
    const [hasSubmit, setHasSubmit] = useState(false)

    const [errors, setErrors] = useState([])

    let newSpot;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const spotData = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        }

        newSpot = await dispatch(spotsActions.CreateNewSpot(spotData))
        if (newSpot) {
            setSpotId(newSpot.id)
        }
        history.push('/listings')
    }


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
