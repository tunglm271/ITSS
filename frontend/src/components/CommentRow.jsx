import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';

const CommentRow = ({comment}) => {
    return (
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h3>{comment.User.name}</h3>
                <p>{comment.content}</p>
            </div>
        </div>
    );
}

export default CommentRow;
