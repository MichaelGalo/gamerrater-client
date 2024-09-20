import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Games = () => {
    const [games, setGames] = useState([]);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const tokenString = localStorage.getItem("rater_token");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = (query = "") => {
        const url = query ? `http://localhost:8000/games?q=${query}` : "http://localhost:8000/games";
        fetch(url, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
            .then(res => res.json())
            .then((data) => {
                setGames(data);
            });
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            fetchGames(searchText);
        }
    };

    const newGameView = () => {
        navigate("/new-game");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Games List</h1>
            <button 
                onClick={newGameView} 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
            >
                Add New Game
            </button>
            <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search games..."
                className="border p-2 rounded mb-4 w-full"
            />
            <ul className="space-y-2">
                {games.map((game) => (
                    <div 
                        key={game.id} 
                        className="p-4 border rounded shadow hover:bg-gray-100"
                    >
                        <Link 
                            to={`/games/${game.id}`} 
                            className="text-blue-500 hover:underline"
                        >
                            {game.title}
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    );
};