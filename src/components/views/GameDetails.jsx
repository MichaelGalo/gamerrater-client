import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameDetails = () => {
    const gameId = useParams().gameId
    const [reviews, setReviews] = useState([])
    const [game, setGame] = useState({})
    const tokenString = localStorage.getItem("rater_token");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;
    const navigate = useNavigate()

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
    
    useEffect(()=>{
        fetch(`http://localhost:8000/reviews/${gameId}`, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
            .then(res => res.json())
            .then((data) => {
                setReviews(data)
            })
    },[gameId])

    return (
        <article className="justify-center flex content-center p-6 mx-auto">
            <div>
                <h1 className="text-3xl font-bold">{game.title}</h1>
                <p>{game.description}</p>
                <p><strong>Designer:</strong> {game.designer}</p>
                <p><strong>Year Released:</strong> {game.year_released}</p>
                <p><strong>Number of Players:</strong> {game.number_of_players}</p>
                <p><strong>Estimated Time to Play:</strong> {game.estimated_time_to_play}</p>
                <p><strong>Age Recommendation:</strong> {game.age_recommendation}</p>
                <p><strong>Categories:</strong> {game.categories?.map((category)=>{
                    return <li key={category.id}>{category.name}</li>
                })}</p>
                <br />
                <div>                
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
                    onClick={()=>{
                        navigate(`/games/${gameId}/review`)
                    }}
                    >Review this Game</button>
                </div>
            </div>
            {game.reviews && game.reviews.length > 0 && (
                <div>
                <h2>Reviews</h2>
                <ul>
                    {game.reviews.map((review) => (
                        <div key={review.id}>
                            <p><strong>{review.user.first_name} {review.user.last_name}:</strong> {review.content}</p>
                        </div>
                    ))}
                </ul>
            </div>
            )}
        </article>
    )
}