import auth from "../utils/auth"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()

    if (!auth.loggedIn()) {
        navigate('/login')
    }
    return children
}
export default ProtectedRoute