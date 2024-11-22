import MenuIcon from "../assets/MenuIcon"
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
MenuIcon
function Header() {
  return (
    <div id="header">
        <MenuIcon size={"30px"}/>
        <Badge badgeContent={20} color="error">
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
  )
}

export default Header