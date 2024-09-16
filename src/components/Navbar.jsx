import { Link } from "react-router-dom"

export const Navbar = ({ currentUser }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/games">Games</Link>
                </li>
                <li>
                    <Link to="/reviews">Reviews</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}

// TODO: actually build this out with some functionality (especially to the logout)