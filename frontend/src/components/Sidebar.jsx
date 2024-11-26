import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
function Sidebar() {
  return (
    <div className="sidebar">
    <ul>
      <li>
        <button className="sidebar-tab">
          <HomeIcon /> {/* Thay thế với icon thực tế */}
        </button>
      </li>
      <li>
        <button className="sidebar-tab">
          <AddIcon /> {/* Thay thế với icon thực tế */}
        </button>
      </li>
      <li>
        <button className="sidebar-tab">
          <LocalOfferIcon /> {/* Thay thế với icon thực tế */}
        </button>
      </li>
    </ul>
  </div>

  )
}

export default Sidebar