import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tag from './Tag';
import LogoutIcon from "@mui/icons-material/Logout";
import PublicIcon from "@mui/icons-material/Public";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { deepOrange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { createComment, getUserInfor } from '../services/api';
import CommentRow from './CommentRow';
import { getComments } from '../services/api';
function PostDetail({post, id}) {

    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const fetchComments = async () => {
        console.log(post);
        try {
            const comments = await getComments(id);
            setComments(comments);  
        } catch(error) {
            console.error('Error:', error);
        }
    }


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserInfor();
                setUser(user);
            } catch(error) {
                console.error('Error:', error);
            }
        }

        fetchComments();
        fetchUser();
    },[])

    useEffect(() => {
        console.log(like);
    }, [like])

    const [myComment, setMyComment] = useState('');
    const fileServer = 'http://localhost:5000';

    const tagList = ['ITSS', "Nice", "PHP", "React"];

    console.log(post);

    const sendComment = () => {
        const commentData = {
            content: myComment,
            postId: post.id,
            userId: user.id,
        };
        console.log(JSON.stringify(commentData));
        createComment(commentData)
            .then(() => {
                setMyComment('');
            })
            .then(() => {
                fetchComments();
            })
            .catch((error) => {
            console.error('Error sending comment:', error);
            });
            
    }


    return (
        <div className="post-layout">
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
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{width: '10%', display: 'flex', flexDirection: 'column', fontSize: '50px'}}>
                            <ArrowCircleUpIcon sx={{
                                fontSize: '50px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}/>
                            <ArrowCircleDownIcon sx={{
                                fontSize: '50px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}/>
                    </div>

                    <div className='post-detail'>
                        <div style={{marginBottom: '10px', display: 'flex', justifyContent: 'space-between', zIndex: '50'}}>
                            <div className='tag-list'>
                                {post.Tags && post.Tags.map((tag, index) => <Tag key={index} tag={tag.name} />)}
                                <VisibilityIcon />
                                9
                            </div>
                        </div>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <Link to={post.formUrl} style={{display: 'inline-block', marginBottom: '20px', color: 'white', textDecoration: 'none', background: '#FFA500', padding: '5px 20px', borderRadius: '5px'}}>Link</Link>
                        <br />

                        <span><img width="40px" height="40px" src="../src/assets/pdfIcon.svg" /><Link to={fileServer + post.fileUrl}>demo.pdf</Link></span>

                        <div id='action-list'>
                            <div className='action-btn' style={{width: '34%', justifyContent: 'center', padding: '3px 0', display: 'flex', alignItems: 'center'}}>
                            {like ? 
                                <StarIcon onClick={() => setLike(!like)} /> : 
                                <StarBorderIcon onClick={() => setLike(!like)} color='yellow' />
                            }
                            </div>

                            <div className='action-btn' style={{width: '34%', justifyContent: 'center', padding: '3px 0', display: 'flex', alignItems: 'center'}}>
                                <ChatBubbleOutlineIcon />
                            </div>

                            <div className='action-btn' style={{width: '34%', justifyContent: 'center', padding: '3px 0', display: 'flex', alignItems: 'center'}}>
                                <ReplyIcon />
                            </div>
                        </div>
                    </div>
            </div>
            
            <div id='comment-section'>
                    <h1>Answers</h1>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        {comments.map((comment, index) => (
                            <CommentRow key={index} comment={comment}/>
                        ))}
                    </div>


                    <Divider sx={{
                        color: 'black',
                        height: '2px',
                    }}/>

                    <h1>Your answer</h1>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>                        
                        <input 
                            type="text" 
                            style={{borderRadius: '5px', padding: '5px', width: '80%'}} 
                            placeholder='add your answer here'
                            value={myComment}
                            onChange={(e) => setMyComment(e.target.value)}
                        />
                        <button 
                            style={{ 
                                backgroundColor: '#2c8aaa', 
                                borderRadius: '50%', 
                                border: 'none', 
                                padding: '10px', 
                                color: 'white', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                cursor: 'pointer'
                                }}
                            onClick={() => sendComment()}
                            >
                            <SendIcon />
                        </button>
                    </div>
            </div>

        </div>
    );
}

PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostDetail;