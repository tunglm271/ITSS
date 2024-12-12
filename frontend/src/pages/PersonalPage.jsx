import React, { useEffect } from 'react';
import { getUserInfor } from '../services/api';
import Header from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import PostBigCard from '../components/PostBigCard';
const PersonalPage = () => {


    useEffect(() => {
        const fetchPersonalData = async () => {
            try {
                const user = await getUserInfor();
                console.log(user);
            } catch(error) {
                console.error('Error:', error);
            }
        }

        fetchPersonalData();
    })

    return (
        <div className="layout">
           <div className="pix" style={{maxHeight: '450px'}}>
                <Header />
           </div>
           <div id='personal-title'>
                <div>
                    <h1>あなたのポスト</h1>
                    <h3>ここでは、あなたの作成したポストを見直される</h3>
                </div>

                <button style={{background: '#f1c3cd', border: 0, borderRadius: '5px', padding: '10px 20px'}}>
                    <AddIcon />
                </button>
           </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px'}}> 
                 <PostBigCard />
                 <PostBigCard />
                 <PostBigCard />
            </div>

        </div>

    );
}

export default PersonalPage;
