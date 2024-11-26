import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useLocation } from 'react-router-dom';
import { globalContext } from '../App';
import { useContext } from 'react';

function isActive(pathname, path) {
  return pathname === path;
}
function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  const {setTogglePopup} = useContext(globalContext);



  return (
    <div className="sidebar">
      <ul>
        <li id={isActive(pathname, '/') ? 'active' : ''}>
          <button>
            <HomeIcon />
          </button>
        </li>
        <li>
          <button onClick={() => setTogglePopup(true)}>
            <AddIcon />
          </button>
        </li>
        <li>
          <button>
            <LocalOfferIcon />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar