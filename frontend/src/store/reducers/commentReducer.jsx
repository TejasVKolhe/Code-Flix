export const commentListReducer = (state = { comments: [], loading: false, error: null }, action) => {
    switch (action.type) {
      case "COMMENTS_LIST_REQUEST": {
        return { ...state, loading: true, error: null };
      }
      case "COMMENTS_LIST_SUCCESS": {
        return { ...state, loading: false, comments: action.payload };
      }
      case "COMMENTS_LIST_FAILURE": {
        return { ...state, loading: false, error: action.payload };
      }
      default: {
        return state;
      }
    }
  };
  