import { Link } from "react-router-dom"

export const Navbar = ({ currentUser }) => {
    return (
        <nav>
            <ul>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/games">Games</Link>
                </div>
                <div>
                    <Link to="/reviews">Reviews</Link>
                </div>
                <div>
                    {localStorage.getItem("rater_token") && (
                    <Link
                        to=""
                        onClick={() => {
                        localStorage.removeItem("rater_token");
                        navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                )}
                </div>
            </ul>
        </nav>
    )
}