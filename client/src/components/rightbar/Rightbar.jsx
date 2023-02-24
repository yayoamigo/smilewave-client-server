import "./rightbar.css";
import Online from "../online/Online";
import { fetchFriends } from "../../redux/ducks/friendsSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";
import { fetchAdmin } from "../../redux/ducks/adminSlice";



export default function Rightbar({ user }) {
  const friends = useSelector((state) => state.friends.friendsByUserId);
  const currentUser = useSelector((state) => state.login.user);
  const admin = useSelector((state) => state.admin.admin);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(false);
  const filteredUsers = Object.values(users).filter(
    (u) => !friends[currentUser._id]?.find((f) => f._id === u._id)
  );

  
  useEffect(() => {
    if (user) {
      dispatch(fetchFriends(user._id));
    }
    
    async function fetchAdminData() {
      await dispatch(fetchAdmin(currentUser._id));
    }
    fetchAdminData();
    
    setFollowed(admin?.followings?.includes(user?._id));
  }, [dispatch, user]);
  
 
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8000/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        
      } else {
        await axios.put(`http://localhost:8000/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Eros smanis</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}kfc.jpg`} alt="" />
        <h4 className="rightbarTitle">meet new people</h4>
        <ul className="rightbarFriendList">
          {filteredUsers?.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  
  
  const ProfileRightbar = () => {
    return (
      <div className="profileDiv">
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user?.relationship || "single"}</span>
          </div>
        </div>
        {friends[user._id] && (
          <>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
              {friends[user._id].map((friend) => (
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "self.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}