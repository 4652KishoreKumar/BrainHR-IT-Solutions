export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
});

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      dispatch(fetchPostsSuccess(data));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
};
