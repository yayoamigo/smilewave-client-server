import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchUser } from "../../redux/ducks/userSlice";
import {format} from "timeago.js"
import { Link } from "react-router-dom";
import axios from "axios";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const user = useSelector((state) => state.user.user);
  const userlog = useSelector((state) => state.login.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(post.userId));
  }, [dispatch]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    setIsLiked(post.likes.includes(userlog._id));
  }, [userlog._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("api/posts/" + post._id + "/like", { userId: userlog._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`profile/${user[post.userId]?.username}`}>
          <img
              className="postProfileImg"
              src={PF + user[post.userId]?.profilePicture || PF+"self.png"}
              alt=""
            />
          </Link>
            <span className="postUsername">
              {user[post.userId]?.username || "user"}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}