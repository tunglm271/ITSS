import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getPost = async (id) => {
  try {
    const response = await api.get('/api/posts/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

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

export const searchPosts = async (query) => {
  if (!query.trim()) {
    throw new Error('Query parameter is required');
  }

  try {
    const { data } = await api.get('/api/posts/search', {
      params: { query },
    });
    return data;  // Trả về dữ liệu bài viết từ API
  } catch (error) {
    console.error('Error searching posts:', error.message || error);
    throw error;  // Ném lỗi lên để có thể xử lý tại nơi gọi hàm
  }
};

export const loginRequest = async (loginData) => {
  try {
    console.log('loginData:', loginData.get('email'), loginData.get('password'));
    const response = await api.post('/api/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


export const registerRequest = async (registerData) => {
  try {
    console.log('registerData:', registerData);
    const response = await api.post('/api/auth/register', registerData);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
}


export const createComment = async (commentData) => {
  try {
    const response = await api.post(`api/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}


export const getUserInfor = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw error;
  }
}

export const getComments = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}


export const getMyPost = async (userId) => {
  try {
    const response = await api.get(`/api/post/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my posts:', error);
    throw error;
  }
}

export default api;