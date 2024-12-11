import { ToggleButtonGroup  } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
const TagHeader = ({order, setOrder}) => {
    return (
        <div className='tag-header'>
            <h1>タグ</h1>
            <p>タグは、あなたの質問を他の同様の質問と分類するためのキーワードまたはラベルです。適切なタグを使用すると、他の人があなたの質問を見つけやすく、回答しやすくなります。</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="フィルター" variant="outlined" />
                </Box>

                <ToggleButtonGroup
                    value={order}
                    exclusive
                    color="primary"
                    onChange={(event, newOrder) => setOrder(newOrder)}
                    aria-label="text alignment"
                >
                    <ToggleButton value="popular" aria-label="left aligned">
                        人気順
                    </ToggleButton>
                    <ToggleButton value="name" aria-label="centered">
                        名前順
                    </ToggleButton>
                    <ToggleButton value="newest" aria-label="right aligned">
                        新規順
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
}

export default TagHeader;
