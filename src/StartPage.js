import { Link } from "react-router-dom"
const StartPage = () => {
  return (
    <div>
        <p>Start</p>
        <Link to="/login">Login</Link>
        <Link to="/register">Signup</Link>
    </div>
  )
}

export default StartPage