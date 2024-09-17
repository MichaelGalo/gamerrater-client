import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const GameDetails = () => {
    const gameId = useParams().gameId
    const [game, setGame] = useState({})
    const tokenString = localStorage.getItem("rater_token");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;

    useEffect(() => {
        fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
            .then(res => res.json())
            .then((data) => {
                setGame(data)
            })
    }, [gameId])

    return (
        <div>
        <h1>{game.title}</h1>
        <p>{game.description}</p>
        <p><strong>Designer:</strong> {game.designer}</p>
        <p><strong>Year Released:</strong> {game.year_released}</p>
        <p><strong>Number of Players:</strong> {game.number_of_players}</p>
        <p><strong>Estimated Time to Play:</strong> {game.estimated_time_to_play}</p>
        <p><strong>Age Recommendation:</strong> {game.age_recommendation}</p>
        <p><strong>Categories:</strong> {game.categories?.map((category)=>{
            return <li key={category.id}>{category.name}</li>
        })}</p>
        
    </div>
    )
}