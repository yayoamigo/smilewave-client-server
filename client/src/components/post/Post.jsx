import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchUser } from "../../redux/ducks/userSlice";
import {format} from "timeago.js"
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(post.userId));
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`profile/${user[post.userId]?.username}`}>
          <img
              className="postProfileImg"
              src={user[post.userId]?.profilePicture || PF+"self.png"}
              alt=""
            />
          </Link>
            <span className="postUsername">
              {user[post.userId]?.username || "user"}
            </span>
            <span className="postDate">{format(user[post.userId]?.createdAt || 22)}</span>
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