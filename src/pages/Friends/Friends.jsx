import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Image, useToast } from "@chakra-ui/react";
import { findAllUsers } from "../../redux/reducers/findUsersSlice";
import { RiUserAddLine } from "react-icons/ri";
import { changeSearch } from "../../redux/reducers/findUsersSlice";
import { MdOutlineDone } from "react-icons/md";
import axios from "../../utils/axios";
import { fillUser } from "../../redux/reducers/userSlice";

const Friends = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const { data, filter } = useSelector((store) => store.findUsers);
  const [search, setSearch] = useState(filter.search || "");
  const toast = useToast();
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      dispatch(findAllUsers({ email: user.email, search }));
      dispatch(changeSearch(search));
    }
  }, [search]);

  const sendRequest = async (receiverId) => {
    try {
      const senderUser = await axios.get(`/users/${user.id}`);
      const existingRequests = senderUser.data.friendRequests || [];

      if (existingRequests.includes(receiverId)) {
        toast({
          title: "Запрос уже отправлен",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      await axios
        .patch(`/users/${user.id}`, {
          friendRequests: [...existingRequests, receiverId],
        })
        .then((res) => {
          dispatch(fillUser(res.data));
        });

      const receiverRes = await axios.get(`/users/${receiverId}`);
      const notifications = receiverRes.data.notifications || [];
      const newNotification = {
        type: "friend_request",
        from: user.id,
      };

      await axios.patch(`http://localhost:4444/users/${receiverId}`, {
        notifications: [...notifications, newNotification],
      });

      toast({
        title: "Запрос отправлен",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Ошибка при отправке запроса",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
  const fetchFriends = async () => {
    try {
      if (!user.friends || user.friends.length === 0) return;
      const responses = await Promise.all(
        user.friends.map((id) => axios.get(`/users/${id}`))
      );

      const friends = responses.map((res) => res.data);
      setFriendsData(friends);
    } catch (error) {
      console.error("Ошибка при загрузке друзей:", error);
    }
  };

  fetchFriends();
}, [user.friends]);

  return (
    <section className="friends">
      <div className="friends__row">
        <div className="friends__follow">
          <h2 className="friends__title">My friends</h2>
          {
          
          friendsData.length > 0 ? (
            friendsData.map((item, idx) => (
              <div key={idx} className="friends__list-item">
                <Avatar
                  alt="photo"
                  className="friends__card-img"
                  src={item.photo}
                  fallbackSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5CysVsiTDenCVvLYM6u2ElQnZST7jjmFdw&s"
                />
                {/* <div className="friends__card-bottom"> */}
                  <div className="friends__card-name">
                    <a href="#!" className="friends__card-link">
                      {item.name} {item.surname}
                    </a>
                  </div>
                </div>
              // </div>
            ))
          ) : (
            <p>Найди своих друзей</p>
          )}
        </div>

        <div className="friends__filter">
          <div className="friends__top">
            <h2 className="friends__title">Search friends</h2>
          </div>
          <div className="friends__search">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="friends__search-input"
              placeholder={"Search"}
            />
            <button className="friends__search-btn">
              <AiOutlineSearch />
            </button>
          </div>
          <div className="friends__cards">
            {data.map((item) => (
              <div key={item.id} className="friends__card">
                <Image
                  alt="photo"
                  className="friends__card-img"
                  src={item.photo}
                  fallbackSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5CysVsiTDenCVvLYM6u2ElQnZST7jjmFdw&s"
                />

                <div className="friends__card-bottom">
                  <div className="friends__card-info">
                    <a href="#!" className="friends__card-link">
                      {item.name} {item.surname}
                    </a>
                    <p className="friends__card-friends">Нет общих друзей</p>
                  </div>

                  {user.friendRequests?.includes(item.id) ? (
                    <MdOutlineDone />
                  ) : (
                    <button
                      className="friends__card-btn"
                      onClick={() => sendRequest(item.id)}
                    >
                      <RiUserAddLine />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Friends;
