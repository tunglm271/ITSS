import { Button, ToggleButtonGroup  } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CreateTagPopUp from "./CreateTagPopUp";
import { useState } from "react";
const TagHeader = ({order, setOrder}) => {

    const [togglePopup, setTooglePopUp] = useState(false)

    return (
        <div className='tag-header'>
            <h1>タグ</h1>
            <p>タグは、あなたの質問を他の同様の質問と分類するためのキーワードまたはラベルです。適切なタグを使用すると、他の人があなたの質問を見つけやすく、回答しやすくなります。</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SearchIcon sx={{ color: 'action.active', my: 0.5 }} />
                    <TextField id="input-with-sx" label="フィルター" variant="outlined" />

                    <Button startIcon={<AddIcon />} color="primary" variant="outlined" sx={{
                        height: '55px',
                        ml: 0.5
                    }}
                    onClick={() => setTooglePopUp(true)}
                    >
                            タグ作成
                    </Button>
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

            <CreateTagPopUp onClose={() => setTooglePopUp(false)} open={togglePopup} />
        </div>
    );
}

export default TagHeader;
