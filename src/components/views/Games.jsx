import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Games = () => {
    const [games, setGames] = useState([]);

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

    return (
        <div>
            <h1>Games List</h1>
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