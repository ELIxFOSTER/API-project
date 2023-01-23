import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SpotsGetAll";
import SpotDetails from "./components/SpotDetails";
import ManageListings from "./components/ManageListings";
import NewSpotForm from "./components/ManageListings/form";
import EditSpot from "./components/EditSpot";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Switch>

      <Route exact path={'/'} >
      <Navigation isLoaded={isLoaded} />

      <AllSpots />
      </Route>

      <Route exact path={'/spots/:spotId'} >
      <Navigation isLoaded={isLoaded} />
        <SpotDetails />
      </Route>

      <Route exact path={'/:hosting/home'} >
        <Navigation isLoaded={isLoaded} />
        <NewSpotForm />
      </Route>

      <Route exact path={`/:listings`} >
        <Navigation isLoaded={isLoaded} />
        <ManageListings />
      </Route>

      <Route exact path={'/create-from'} >
        <NewSpotForm />
      </Route>

      <Route exact path={'/:edit/:spotId'} >
        <Navigation />
        <EditSpot />
      </Route>

    </Switch>

    </>
  );
}

export default App;
