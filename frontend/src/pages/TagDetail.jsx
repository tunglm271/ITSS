import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import { getPostInTag } from "../services/api";
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar,Badge, Box, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PostBigCard from '../components/PostBigCard';

const TagDetail = () => {

    const { tagName } = useParams();
    const [tag, seTag] = useState({});
    const [posts, setPosts] = useState([]);
    const [order, setOrder] = useState('popular');
    useEffect(() => {
        console.log(tagName);
        getPostInTag(tagName).then((data) => {
            seTag(data.tags);
            setPosts(data.post);
            console.log(data);
        });
    }, []);


    return (
        <div className="tab-layout">
        <div id='navigation-bar'>
            <h2>HespiDaotao</h2>
            
            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <Avatar alt='avatar' src='https://s3-alpha-sig.figma.com/img/7725/9698/379a6812cb19259fb7ef359b6da622f2?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RKSYIxbTGWdeQoMO8Zikm3VqB3TuCutSdWRh2hGpHIC0e3R0kYK2tAMmStkhbVFM9DLaPj3lb44X-SROk4ksVtslgpWwaWwWs18Cr~Ukp-JFKJcCxOTBSNZ2olFtUnNUufLdc-o7RDqjdWfZvCR0yy6KDudX71jJ-zLj2XhmvdRi1Gq8MrgefkbwSct2JZ-vMrfZxdBZFio7ZOKIFCPJnRCt-5UsETm5bLtWbKqhp3LBa5TZESffNc4l2S3IJ~oZiWRhsr2wV2mS2qj7PYuhNWy62PWDhF1BsuO34AYvKzVHXrhV~MAMDYYlL2dyuVQN9-qT9-O5JbLVc0YGe1I5-A__' />


                <div id="badge-div">
                <Badge badgeContent={20} color="error">
                    <NotificationsNoneIcon sx={{ fontSize: 30 }} />
                </Badge>
                </div>

                <button className="header-button" id="language-btn">
                    <PublicIcon sx={{ fontSize: 25 }} />
                </button>
                <p>EN</p>
                <button className="header-button">
                    <LogoutIcon sx={{ fontSize: 25 }} />
                </button>
            </div>
            




        </div>

        <div className='tag-header'>
            <h1>{tag.name}</h1>
            <p>{tag.description}</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SearchIcon sx={{ color: 'action.active', my: 0.5 }} />
                    <TextField id="input-with-sx" label="フィルター" variant="outlined" onChange={(e) => handleSearchTags(e)}/>
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

            <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px',}}> 
                 {posts && posts.length > 0 && posts.map((post, index) => (
                    <PostBigCard key={index} post={post} />
                 ))}
            </div>
    </div>
    );
}

export default TagDetail;
