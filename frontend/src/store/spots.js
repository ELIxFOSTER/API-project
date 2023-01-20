import { csrfFetch } from './csrf'

const normalizer = (data) => {
    const normalData = {}
    data.forEach((element) => normalData[element.id] = element)
    return normalData
}

const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS'
const LOAD_CURRENT_USER_SPOTS = 'spots/LOAD_CURRENT_USER_SPOTS'



//* Action Creators *//
const loadSpots = (allSpots) => {
    return {
        type: LOAD_SPOTS,
        allSpots
    }
}

const loadSpotDetails = (spot) => {
    return {
        type: LOAD_SPOT_DETAILS,
        spot
    }
}

const loadCurrentUserSpots = (spots) => {
    return {
        type: LOAD_CURRENT_USER_SPOTS,
        spots
    }
}



//* Thunks *//
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')

    if (response.ok) {
        const spotsJson = await response.json()
        // const normalizedSpots = normalizer(spotsJson.Spots)
        dispatch(loadSpots(spotsJson.Spots))
        // console.log(spotsJson.Spots)
        // return spotsJson.Spots
    }
}

//?
export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spotDetailsJson = await response.json()
        dispatch(loadSpotDetails(spotDetailsJson))
    }
}

//?
export const getCurrentUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const currentUserSpotsJson = await response.json()
        const normalizedSpots = normalizer(currentUserSpotsJson.Spots)
        dispatch(loadCurrentUserSpots(normalizedSpots))
        return currentUserSpotsJson.Spots
    }
}

//?
export const CreateNewSpot = (spotData) => async () => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(spotData)
    })
        if (response.ok) {
            const newSpotData = await response.json()
            return newSpotData
        }

}

//?
export const EditSpot = (spotData, spotId) => async() => {
    const updatedSpot = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(spotData)
      }
      )

    const actualUpdatedSpot = await updatedSpot.json();
    return actualUpdatedSpot
  }

//?

export const deleteSpotThunk = (spotId) => async() => {
    return await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
}

//?
export const addSpotImages = (imageObj, spotId) => async(dispatch) => {
    console.log('thunk', imageObj)
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify(imageObj)
    })
    const newImage = await response.json()
    return newImage

}



const initialState = { AllSpots: {}, SpotDetails: {} }

const spotsReducer = (state = initialState, action) => {
    const spotsState = { ...state }
    switch (action.type) {
        case LOAD_SPOTS: {
            spotsState.AllSpots = action.allSpots
            return spotsState
        }
        case LOAD_SPOT_DETAILS: {
            spotsState.SpotDetails = action.spot
            return spotsState
        }
        case LOAD_CURRENT_USER_SPOTS: {
            spotsState.AllSpots = action.spots
            return spotsState
        }
        default:
            return state
    }
}

export default spotsReducer
