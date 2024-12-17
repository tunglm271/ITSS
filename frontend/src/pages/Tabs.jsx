import { Avatar, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import TagHeader from '../components/TagHeader';
import TagCard from '../components/TagCard';
import { getTags } from '../services/api';

const Tabs = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const data = await getTags();
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    },[]);

    const [order, setOrder] = useState('popular');

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

            <TagHeader order={order} setOrder={setOrder}/>

            <div id="tag-grid">
                {tags.length && tags.map((tag,index) => <TagCard key={index} tag={tag}/>)}
            </div>

        </div>
    );
}

export default Tabs;
