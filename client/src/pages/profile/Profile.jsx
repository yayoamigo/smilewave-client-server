import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPostUser } from "../../redux/ducks/userPostSlice";
import { useParams } from "react-router-dom";

export default function Profile() {
  const users = useSelector((state) => state.user.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userName = useParams().username;
  const dispatch = useDispatch();

  let username = userName; // replace with the actual username you want to find
  let user = null;
  for (let id in users) {
    if (users[id].username === username) {
      user = users[id];
      break;
    }
  }

  useEffect(() => {
    if (username) {
      dispatch(fetchPostUser(username));
      
    }
  }, [dispatch]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={`${PF}post.jpg`} alt="" />
              <img className="profileUserImg" src={`${PF}self.png`} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user?.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
