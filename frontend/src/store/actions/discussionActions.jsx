import axios from "axios";

export const listComments = () => async (dispatch) => {
  try {
    dispatch({ type: "COMMENTS_LIST_REQUEST" });
    const { data } = await axios.get("http://localhost:3000/api/comment/getcomment");
    const commentTexts = data.map((comment) => comment.text); // Extract comment text
    console.log("Fetched comment texts:", commentTexts); // Log only comment texts
    dispatch({ type: "COMMENTS_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "COMMENTS_LIST_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postComment = (text) => async (dispatch) => {
    try {
      dispatch({ type: "COMMENT_POST_REQUEST" });
      const { data } = await axios.post("http://localhost:3000/api/comment/postcomment", { text });
      dispatch({ type: "COMMENT_POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "COMMENT_POST_FAILURE",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };