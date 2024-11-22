import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';

function Sidebar() {
  return (
    <div id="sidebar">
        <ul>
          <li>
            <button className='sidebar-tab'>
              <HomeIcon />
              ホーム
              </button>
          </li>
          <li>
            <button className='sidebar-tab'>
              <AddIcon sx={{
                background: '#88D0B1',
                borderRadius: '50%',
              }}/>
              グループ作成
              </button>
            </li>
          <li>
            <PeopleIcon sx={{
                background: '#88D0B1',
                borderRadius: '50%',
              }} />
            グループ
          </li>
        </ul>
    </div>
  )
}

export default Sidebar