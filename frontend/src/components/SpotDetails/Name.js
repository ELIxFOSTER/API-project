import React, { useEffect, useState } from 'react'


export default function SpotName({ spot }) {
    return (
        <>
            <h1>This Spot's Details</h1>
            {/* <h1>{spot.name}</h1> */}
            <h1>{spot.price}</h1>
        </>
    )
}
