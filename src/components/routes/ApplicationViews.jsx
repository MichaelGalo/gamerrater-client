import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Home } from "../views/Home";
import { Games } from "../views/Games";
import { GameDetails } from "../views/GameDetails";
import { NewGame } from "../views/NewGame";
import { GameReview } from "../views/GameReview";
import { UpdateGame } from "../views/EditGame";
import { GamePicture } from "../views/GamePicture";

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
        <Route index element={<Games />} />
        <Route path="games" element={<Games />} />
        <Route path="games/:gameId" element={<GameDetails />} />
        <Route path="games/:gameId/image-form" element={<GamePicture/>} />
        <Route path="games/:gameId/update" element={<UpdateGame />} />
        <Route exact path="/games/:gameId/review" element={<GameReview />}/>
        <Route path="new-game" element={<NewGame />} />
    </Route>
    </Routes>
    )
}

// removed "(\d+)" from <Route exact path=`/games/:gameId(\d+)/review` element={<GameReview/>}/>