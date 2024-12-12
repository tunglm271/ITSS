import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate, useLocation } from 'react-router-dom';
import { globalContext } from '../App';
import { useContext } from 'react';
import { Avatar } from '@mui/material';

function isActive(pathname, path) {
  return pathname === path;
}
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const {setTogglePopup} = useContext(globalContext);



  return (
    <div className="sidebar">
      <ul>
        <li id={isActive(pathname, '/') ? 'active' : ''}>
          <button onClick={() => navigate("/")}>
            <HomeIcon />
          </button>
        </li>
        <li>
          <button onClick={() => setTogglePopup(true)}>
            <AddIcon />
          </button>
        </li>
        <li id={pathname.startsWith('/tabs') ? 'active' : ''}>
          <button onClick={() => navigate("/tabs")}>
            <LocalOfferIcon />
          </button>
        </li>
        <li id={isActive(pathname, '/personal') ? 'active' : ''}>
          <button onClick={() => navigate("/personal")} style={{padding: 0}}>
            <Avatar alt="User" src="https://mui.com/static/images/avatar/1.jpg" sx={{
              width: '40px',
              height: '40px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}/>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar