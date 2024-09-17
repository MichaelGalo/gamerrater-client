import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Games = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate(); // Move useNavigate to the top level of the component

    useEffect(() => {
        const tokenString = localStorage.getItem("rater_token");
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
            .then(res => res.json())
            .then((data) => {
                setGames(data);
            });
    }, []);

    const newGameView = () => {
        navigate("/new-game");
    }

    return (
        <div>
            <h1>Games List</h1>
            <button onClick={newGameView}>Add New Game</button>
            <ul>
                {games.map((game) => (
                    <div key={game.id}>
                        <Link to={`/games/${game.id}`}>{game.title}</Link>
                    </div>
                ))}
            </ul>
        </div>
    );
};