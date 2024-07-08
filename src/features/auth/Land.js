import { Link } from 'react-router-dom'

const Land = () => {

    const content = (
        <section className="land">
            <p><Link to="/dash/notes">techNotes</Link></p>

            <p><Link to="/dash/users">User Settings</Link></p>

        </section>
    )

    return content
}
export default Land