import { useEffect, useState } from "react";

export const NewGame = () => {
    const [game, setGame] = useState({
        title: "",
        designer: "",
        year_released: 0,
        number_of_players: 0,
        estimated_time_to_play: 0,
        age_recommendation: 0,
        categories: []
    })
    const [categories, setCategories] = useState([])
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
                setCategories(data)
            })
    }, [])

    const handleControlledInputChange = (event) => {
        const newGame = { ...game }
        newGame[event.target.id] = event.target.value
        setGame(newGame)
    }

    const handleClickSaveGame = (event) => {
        event.preventDefault()

        const newGame = {
            title: game.title,
            designer: game.designer,
            year_released: parseInt(game.year_released),
            number_of_players: parseInt(game.number_of_players),
            estimated_time_to_play: parseInt(game.estimated_time_to_play),
            age_recommendation: parseInt(game.age_recommendation),
            categories: game.categories.map(category => parseInt(category))
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(newGame)
        }

        fetch("http://localhost:8000/games", fetchOptions)
            .then(() => {
                setGame({
                    title: "",
                    designer: "",
                    year_released: 0,
                    number_of_players: 0,
                    estimated_time_to_play: 0,
                    age_recommendation: 0,
                    categories: []
                })
            })
    }

    const handleCategoryChange = (event) => {
        const newGame = { ...game }
        const categoryId = parseInt(event.target.id)
        if (newGame.categories.includes(categoryId)) {
            newGame.categories = newGame.categories.filter(category => category !== categoryId)
        } else {
            newGame.categories.push(categoryId)
        }
        setGame(newGame)
    }

    return (
        <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <fieldset>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input type="text" id="title" value={game.title} onChange={handleControlledInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="designer" className="block text-gray-700 font-bold mb-2">Designer:</label>
                    <input type="text" id="designer" value={game.designer} onChange={handleControlledInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="year_released" className="block text-gray-700 font-bold mb-2">Year Released:</label>
                    <input type="number" id="year_released" value={game.year_released} onChange={handleControlledInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="number_of_players" className="block text-gray-700 font-bold mb-2">Number of Players:</label>
                    <input type="number" id="number_of_players" value={game.number_of_players} onChange={handleControlledInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="estimated_time_to_play" className="block text-gray-700 font-bold mb-2">Estimated Time to Play:</label>
                    <input type="number" id="estimated_time_to_play" value={game.estimated_time_to_play} onChange={handleControlledInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="age_recommendation" className="block text-gray-700 font-bold mb-2">Age Recommendation:</label>
                    <input type="number" id="age_recommendation" value={game.age_recommendation} onChange={handleControlledInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Categories:</label>
                    {categories.map(category => (
                        <div key={category.id} className="flex items-center mb-2">
                            <input type="checkbox" id={category.id} onChange={handleCategoryChange} className="mr-2" />
                            <label htmlFor={category.id} className="text-gray-700">{category.name}</label>
                        </div>
                    ))}
                </div>
                <button onClick={handleClickSaveGame} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Save Game</button>
            </fieldset>
        </form>
    )
}