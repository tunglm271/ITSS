import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { useLocation } from 'react-router-dom';

function isActive(pathname, path) {
  return pathname === path;
}
function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="sidebar">
      <ul>
        <li id={isActive(pathname, '/') ? 'active' : ''}>
          <button>
            <HomeIcon />
          </button>
        </li>
        <li>
          <button>
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