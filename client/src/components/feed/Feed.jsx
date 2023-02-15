import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { fetchPost } from "../../redux/postSlice";
import { fetchPostUser } from "../../redux/userPostSlice";
import { setPostUser } from "../../redux/userPostSlice";

export default function Feed({username}) {

  const post = useSelector((state) => state.post.post);
  const postUser = useSelector((state) => state.postUser.postUser);
  const postLoading =  useSelector((state) => state.post.isLoading);
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (username) {
      const localData = localStorage.getItem('postUser');
      if (localData) {
        const posts = JSON.parse(localData);
        dispatch(setPostUser(posts));
      } else {
        dispatch(fetchPostUser(username));
      }
    } else {
      dispatch(fetchPost())
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('postUser', JSON.stringify(postUser));
  }, [postUser]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {postLoading ? (
          <div className="loading">Loading...</div>
        ) : username ? (
          postUser.map((p) => <Post key={p._id} post={p} />)
        ) : (
          post.map((p) => <Post key={p._id} post={p} />)
        )}
      </div>
    </div>
  );
}
