import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchPost } from "../../redux/postSlice";

export default function Feed() {
  const post = useSelector((state) => state.post.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost());
  }, [post]);
console.log(post);
  return (
    <div className="feed">
      
      <div className="feedWrapper">
        <Share />
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}