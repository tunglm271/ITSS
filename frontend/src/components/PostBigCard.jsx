import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate } from 'react-router-dom';

const PostBigCard = ({post}) => {
   const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Tháng trong JS bắt đầu từ 0
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    };

    return (
        <div className='post-big-card' onClick={() => navigate(`/posts/${post._id}`)}>
            <div className='row'>
                <div style={{display: 'flex', gap: '20px', alignItems: 'center', width: '100%'}}>
                    {post.tags.map((tag, index) => <div key={index} className='tag'>{tag}</div> )}
                    9
                    <VisibilityIcon />
                    <button style={{marginLeft: 'auto', border: 'none'}} className='edit-btn'>
                        <EditIcon/>
                    </button>
                </div>
            </div>

            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div className='row'>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <img width="20px" height="20px" src="../src/assets/pdfIcon.svg" />
                    <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">demo.pdf</a>
                </div>

                <span style={{display: 'flex', alignItems: 'center', gap: '3px'}}>{formatDate(post.createdAt)} <UploadIcon /></span>
            </div>
        </div>
    );
}

export default PostBigCard;
