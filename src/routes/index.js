import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from '../components/router/privateRoute';


import Tasks from "../views/tasks";



const RoutePages = (props) => {
  return (
    <Routes>
      <Route exact path='/' element={<PrivateRoute />}>
      <Route index path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  )
}

export default RoutePages;
