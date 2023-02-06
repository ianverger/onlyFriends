import { Link } from "react-router-dom";
import './NotFound.css'

function NotFound() {
    return (
        <div id="not-found-body">
            <h1>Oops! You seem to be lost.</h1>
            <br></br>
            <Link id="nf-home-button" to='/'>Return Home</Link>
        </div>
    )
}

export default NotFound;