import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewGame = () => {
    const [title, setTitle] = useState("");
    const [designer, setDesigner] = useState("");
    const [yearReleased, setYearReleased] = useState(0);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [estimatedTimeToPlay, setEstimatedTimeToPlay] = useState(0);
    const [ageRecommendation, setAgeRecommendation] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const navigate = useNavigate();

    const tokenString = localStorage.getItem("rater_token");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;

    useEffect(() => {
        fetch(`http://localhost:8000/categories`, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
            .then(res => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);


    const handleClickSaveGame = (event) => {
        event.preventDefault();

        const newGame = {
            title,
            designer,
            yearReleased,
            numberOfPlayers,
            estimatedTimeToPlay,
            ageRecommendation,
            categories: selectedCategory
        };

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(newGame)
        };

        fetch("http://localhost:8000/games", fetchOptions)
            .then(response => response.json())
            .then(() => {
                // Handle successful save
            });


        navigate("/games");
    };

    return (
        <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <fieldset>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="designer" className="block text-gray-700 font-bold mb-2">Designer:</label>
                    <input 
                        type="text" 
                        id="designer" 
                        value={designer} 
                        onChange={(e) => setDesigner(e.target.value)} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="year_released" className="block text-gray-700 font-bold mb-2">Year Released:</label>
                    <input 
                        type="number" 
                        id="year_released" 
                        value={yearReleased} 
                        onChange={(e) => setYearReleased(parseInt(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="number_of_players" className="block text-gray-700 font-bold mb-2">Number of Players:</label>
                    <input 
                        type="number" 
                        id="number_of_players" 
                        value={numberOfPlayers} 
                        onChange={(e) => setNumberOfPlayers(parseInt(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="estimated_time_to_play" className="block text-gray-700 font-bold mb-2">Estimated Time to Play:</label>
                    <input 
                        type="number" 
                        id="estimated_time_to_play" 
                        value={estimatedTimeToPlay} 
                        onChange={(e) => setEstimatedTimeToPlay(parseInt(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age_recommendation" className="block text-gray-700 font-bold mb-2">Age Recommendation:</label>
                    <input 
                        type="number" 
                        id="age_recommendation" 
                        value={ageRecommendation} 
                        onChange={(e) => setAgeRecommendation(parseInt(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categories" className="block text-gray-700 font-bold mb-2">Categories:</label>
                    <select 
                        id="categories" 
                        onChange={(e) => setSelectedCategory(parseInt(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="0" disabled>Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button 
                    onClick={handleClickSaveGame} 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save Game
                </button>
            </fieldset>
        </form>
    )
}