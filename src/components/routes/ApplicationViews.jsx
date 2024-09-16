import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Home } from "../views/Home";

export const ApplicationsViews = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
      const localRecipeUser = localStorage.getItem("rater_token");
      setCurrentUser(JSON.parse(localRecipeUser));
    }, []);

    return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {<Navbar currentUser={currentUser} />}
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
    </Route>
    </Routes>
    )
}