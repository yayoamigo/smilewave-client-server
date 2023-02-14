import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchPost } from "../../redux/postSlice";
import { fetchPostUser } from "../../redux/userPostSlice";

export default function Feed({username}) {

  const post = useSelector((state) => state.post.post);
  const postUser = useSelector((state) => state.postUser.postUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if(username){
    dispatch(fetchPostUser(username)) } else {
    dispatch(fetchPost());}
  }, [username]);
  console.log(postUser);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {username ? (
          postUser.map((p) => <Post key={p._id} post={p} />)
        ) : (
          post.map((p) => <Post key={p._id} post={p} />)
        )}
      </div>
    </div>
  );
}