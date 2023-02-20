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
  const users = useSelector((state) => state.users.users);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userName = useParams().username;
  const dispatch = useDispatch();

  let username = userName; // replace with the actual username you want to find
  let user = null;
  for (let _id in users) {
    if (users[_id].username === username) {
      user = users[_id];
      break;
    }
  }

  useEffect(() => {
    if (username) {
      dispatch(fetchPostUser(username));
      
    }
  }, [userName]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "post3.jpg"} alt="" />
              <img className="profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF + "self.png"} alt="" />
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
