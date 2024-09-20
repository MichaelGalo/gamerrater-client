import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentUser } from "../services/userService"

export const GamePicture = () => {
    const gameId = useParams().gameId
    const [game, setGame] = useState({})
    const tokenString = localStorage.getItem("rater_token");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;
    const [currentUser, setCurrentUser] = useState({})
    const [imageFile, setImageFile] = useState("")
    const [uploadStatus, setUploadStatus] = useState("")

    useEffect(()=>{
        const fetchCurrentUser = async () => {
            const user = await getCurrentUser()
            setCurrentUser(user)
        }
        fetchCurrentUser()
    },[])

    useEffect(()=>{
    fetch(`http://localhost:8000/games/${gameId}`, {
        headers: {
            "Authorization": `Token ${token}`,
        }
    })
        .then(res => res.json())
        .then((data) => {
            setGame(data)
        })

    },[gameId])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setImageFile(base64ImageString)
        });
    }

    const handleUpload = () => {
        const formattedImageString = {
            game_id: game.id,
            game_image: imageFile
        }

        fetch(`http://localhost:8000/upload_image`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formattedImageString)
        }) 
        .then(res => {
            if (res.status === 201) {
                setUploadStatus("Image uploaded successfully!");
            } else {
                setUploadStatus("Image upload failed.");
            }
            return res.json();
        })
        .catch((error) => {
            console.error("Error uploading image:", error);
            setUploadStatus("Image upload failed.");
        });
    }

    return (
        <div className="image-form-container">
            <h1>Showcase Your Favorite Action Picture</h1>
            <form action="submit" onSubmit={(e) => e.preventDefault()}>
                <input type="file" id="game_image" onChange={createGameImageString} />
                <input type="hidden" name="game_id" value={game.id || ""}  />
                    <button 
                    onClick={handleUpload}>
                        Upload
                    </button>
            </form>
        </div>
    )
}