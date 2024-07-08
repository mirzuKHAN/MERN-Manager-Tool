import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import api from '../../api/posts'


const NotesList = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/notes', { withCredentials: true });
                setNotes(response.data)
            } catch (err) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
        }
        fetchNotes();
    }, [])  


    const content = (
        <table className="table table--notes">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th note__status">Username</th>
                    <th scope="col" className="table__th note__created">Created</th>
                    <th scope="col" className="table__th note__updated">Updated</th>
                    <th scope="col" className="table__th note__title">Title</th>
                    <th scope="col" className="table__th note__username">Owner</th>
                    <th scope="col" className="table__th note__edit">Delete</th>
                </tr>
            </thead>
            <tbody>
                {notes.map(note => {
                    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
                    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
                    // const handleEdit = () => navigate(`/dash/notes/${noteId}`)
            
                    return (
                        <tr className="table__row">
                            <td className="table__cell note__status">
                                {note.completed
                                    ? <span className="note__status--completed">Completed</span>
                                    : <span className="note__status--open">Open</span>
                                }
                            </td>
                            <td className="table__cell note__created">{created}</td>
                            <td className="table__cell note__updated">{updated}</td>
                            <td className="table__cell note__title">{note.title}</td>
                            <td className="table__cell note__username">{note.username}</td>
            
                            <td className="table__cell">
                                <button
                                    className="icon-button table__button"
                                    // onClick={handleEdit}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    )    
                })}
            </tbody>
        </table>
    )

    return (
        <main>
            <h1>Notes List</h1>
            {/* {newItemSection} */}
            {content}
        </main>
    )
}
export default NotesList