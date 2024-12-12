import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
const PostBigCard = () => {
    const tagList = ['ITSS', "Nice", "PHP", "React"];

    return (
        <div className='post-big-card'>
            <div className='row'>
                <div style={{display: 'flex', gap: '20px', alignItems: 'center', width: '100%'}}>
                    {tagList.map((tag, index) => <div key={index} className='tag'>{tag}</div> )}
                    9
                    <VisibilityIcon />
                    <button style={{marginLeft: 'auto', border: 'none'}} className='edit-btn'>
                        <EditIcon/>
                    </button>
                </div>
            </div>

            <h1>JLPT N3のレベルの書き方</h1>
            <p>fasdfasdfaskdfjasdkfjkaskdfkaskjdfkasdkfkasdjfkasfd</p>
            <div className='row'>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <img width="20px" height="20px" src="../src/assets/pdfIcon.svg" />
                    <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">demo.pdf</a>
                </div>

                <span style={{display: 'flex', alignItems: 'center', gap: '3px'}}>2024年3月9日 <UploadIcon /></span>
            </div>
        </div>
    );
}

export default PostBigCard;
