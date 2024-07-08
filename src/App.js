import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Land from './features/auth/Land'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import LoginPlease from './features/auth/LoginPlease'

function App() {
  //please write a hook where it check for Auth, ok?

  const isAuth = true; // change to true to test DashLayout 
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        {!isAuth && <Route path="dash" element={<LoginPlease />} />}
        {isAuth && <Route path="dash" element={<DashLayout />} >

          <Route index element={<Land />} />

          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

        </Route>}{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;
