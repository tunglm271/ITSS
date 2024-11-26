import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
function Header() {
  return (
    <div id="header">
            <div id='badge-div'>
                <Badge badgeContent={20} color="error">
                    <NotificationsNoneIcon sx={{
                        fontSize: 30,
                    }}/>
                </Badge>
            </div>
            <div id="search-bar">
                <input type="text"/>
                <button><SearchIcon /></button>
            </div>
            <button className="header-button" id="language-btn">
                <PublicIcon sx={{
                        fontSize: 25,
                    }}/>
            </button>
            <p>EN</p>
            <button className="header-button">
                <LogoutIcon sx={{
                        fontSize: 25,
                    }}/>
            </button>
    </div>
  )
}

export default Header