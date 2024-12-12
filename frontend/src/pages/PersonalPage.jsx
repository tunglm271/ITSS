import React, { useEffect } from 'react';
import { getUserInfor } from '../services/api';
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
        <div>
            
        </div>
    );
}

export default PersonalPage;
