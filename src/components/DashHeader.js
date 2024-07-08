import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import api from '../api/posts'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [isSuccess, setIsSuccess] = useState(false)

    const logout = async () => {
        try {
            const response = await api.post('/auth/logout', { data:{username: "", password: ""} }, { withCredentials: true });
            setIsSuccess(true)
            return response.data
        } catch (err) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } 
    }

    const sendLogout = async () => {
        try {
            const response = await logout()
            console.log(response)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    <button
                        className="icon-button"
                        title="Logout"
                        onClick={sendLogout}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader