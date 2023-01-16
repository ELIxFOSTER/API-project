import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SpotsGetAll";
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import ManageListings from "./components/ManageListings";
import NewSpotForm from "./components/ManageListings/form";



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
      {isLoaded && <Switch></Switch>}
      <AllSpots />
      </Route>

      <Route exact path={'/spots/:spotId'} >
        <SpotDetails />
      </Route>

      <Route exact path={'/hosting/home'} >
        <CreateSpotForm />
      </Route>

      <Route exact path={`/listings`} >
        <ManageListings />
      </Route>

      <Route exact path={'/create-from'} >
        <NewSpotForm />
      </Route>

    </Switch>

    </>
  );
}

export default App;
