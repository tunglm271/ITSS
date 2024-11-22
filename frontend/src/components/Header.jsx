import MenuIcon from "../assets/MenuIcon"
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
function Header() {
  return (
    <div id="header">
        <button id="menu-button">
        <MenuIcon size={"30px"}/>
        </button>
        <div>
            <Badge badgeContent={20} color="error" sx={{marginRight: "20px"}}>
                <NotificationsNoneIcon sx={{
                    fontSize: 30,
                }}/>
            </Badge>
            <div id="search-bar">
                <input type="text"/>
                <button><SearchIcon /></button>
            </div>
            <button className="header-button">グループに参加する</button>
            <button className="header-button">ログアウト</button>
        </div>
    </div>
  )
}

export default Header