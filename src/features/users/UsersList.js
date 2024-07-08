import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload, faSave } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import api from '../../api/posts'

const ROLES = {
    Employee: 'Employee',
    Manager: 'Manager',
    Admin: 'Admin'
}

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const UsersList = () => {
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users', { withCredentials: true });
                setUsers(response.data)
            } catch (err) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
        }
        fetchUsers();
    }, [])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, 
            (option) => option.value
        )
        setRoles(values)
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const canSave = [roles.length, validUsername, validPassword, password].every(Boolean) 

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (canSave) {
            const newUser = {username: username, password: password, roles: roles}
            try {
                const response = await api.post('/users', newUser, { withCredentials: true})
                const allUsers = [...users, response.data]
                setUsers(allUsers)
                window.location.reload()
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await api.delete('/users', {
                data: { id: id },
                withCredentials: true
              });

            const allUsers = users.filter(user => user.id != id)
            setUsers(allUsers)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }


    const content = (
        <>
        <table className="table table--users">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th user__username">Username</th>
                    <th scope="col" className="table__th user__roles">Roles</th>
                    <th scope="col" className="table__th user__edit">Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    const userRolesString = user.roles.toString().replaceAll(',', ', ')
                    const cellStatus = user.active ? '' : 'table__cell--inactive'
                    return (
                        <tr className="table__row user">
                            <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                            <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                            <td className={`table__cell ${cellStatus}`}>
                                <button
                                    className="icon-button table__button"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    )
                })}
                
            </tbody>
        </table>


        <form className="form" onSubmit={handleSubmit}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

        </form>
        </>
    )

    return (
        <main>
            <h1>Users List</h1>
            {content}
        </main>
    )
}
export default UsersList