import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameReview = () => {
    const [reviews, setReviews] = useState([])
    const [game, setGame] = useState({})
    const tokenString = localStorage.getItem("rater_token");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;
    const gameId = useParams().gameId
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
        fetch(`http://localhost:8000/games/${gameId}/review`, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
            .then(res => res.json())
            .then((data) => {
                setReviews(data)
            })
    },[gameId])

    const handleReview = () => {
        // Function for review here

        navigate(`/games/${gameId}`)
    }

    return (
        <>
        <h1 className="text-3xl font-bold">
            Reviews for {game.title}
        </h1>
        <article>
            <div>
                <button 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
                onClick={handleReview}
                >
                    Leave a Review!
                </button>
            </div>
            <div>
                {/* map over reviews & create cards here for the reviews */}
            </div>
        </article>
        </>
    )
}