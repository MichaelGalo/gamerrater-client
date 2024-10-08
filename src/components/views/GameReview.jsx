import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentUser } from "../services/userService"

export const GameReview = () => {
    const [user, setUser] = useState({})
    const [game, setGame] = useState({})
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const tokenString = localStorage.getItem("rater_token");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;
    const gameId = useParams().gameId
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8000/games/${gameId}`, {
            method: "GET",
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
        getCurrentUser()
            .then((user) => {
                setUser(user)
            })
    }
    ,[])

    const handleReview = (e) => {
        e.preventDefault()
        

        // submit review fetch call
        let new_review = {
            user: user.id,
            content: reviewText,
            game: gameId,
        }

        fetch(`http://localhost:8000/reviews`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_review)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            navigate(`/games/${gameId}`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


        // Submit Rating Fetch Call
        let new_rating = {
            user: user.id,
            game: gameId,
            score: rating
        }

        fetch(`http://localhost:8000/rating`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_rating)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            navigate(`/games/${gameId}`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        navigate(`/games/${gameId}`)
    }

    return (
        <>
        <div className="review-container mx-auto">
        <h1 className="text-3xl font-bold mx-auto flex items-center justify-center p-5">
            Reviews for {game.title}
        </h1>
        <article>
        <form onSubmit={handleReview} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
                    <div className="mb-4">
                        <label htmlFor="review" className="block text-gray-700 text-sm font-bold mb-2">
                            Your Review
                        </label>
                        <textarea
                            id="review"
                            name="review"
                            rows="4"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        />
                        <div className="rating-container">
                        <label htmlFor="rating" className="flex mx-0 block text-gray-700 text-sm font-bold mb-2">Rate on a scale of 1-5</label>
                        <select 
                        name="rating" 
                        id="rating" 
                        className="flex mx-0 w-20 text-center text-lg font-bold border-blue-400 border-solid"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
        </article>
        </div>
        </>
    )
}