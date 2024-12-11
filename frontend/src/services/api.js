import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
};
  
export const createPost = async (postData) => {
try {
    const response = await api.post('/api/posts', postData);
    return response.data;
} catch (error) {
    console.error('Error creating post:', error);
    throw error;
}
};
  
export const uploadSlide = async (slideData) => {
try {
    const response = await api.post('/slides', slideData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    return response.data;
} catch (error) {
    console.error('Error uploading slide:', error);
    throw error;
}
};

export default api;