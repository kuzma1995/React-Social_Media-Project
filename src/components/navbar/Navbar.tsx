import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import './navbar.css';

const Navbar = () => {

  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  }

  return (
    <div className='navbar'>
      <div className='navbar__links'>
          <Link to="/">Home</Link>
          {!user ? <Link to="/login">Login</Link> :
          <Link to="/createpost">Create Post</Link> }
      </div>

      <div className='navbar__user-info'>
        {user && (
          <>
          <p>{user?.displayName}</p>
          <img src={user?.photoURL || ""} alt='google'/>
          <button onClick={signUserOut}>Log Out</button>
          </>
        )}
          </div>
    </div>
  )
}

export default Navbar;