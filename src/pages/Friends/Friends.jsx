import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Image, useToast } from "@chakra-ui/react";
import { findAllUsers } from "../../redux/reducers/findUsersSlice";
import { RiUserAddLine } from "react-icons/ri";
import { changeSearch } from "../../redux/reducers/findUsersSlice";
import { MdOutlineDone } from "react-icons/md";
import axios from "../../utils/axios";
import { fillUser } from "../../redux/reducers/userSlice";

const Friends = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user.user);
  const { data, filter } = useSelector((store) => store.findUsers);
  const [search, setSearch] = useState(filter.search || "");
  const toast = useToast();

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
        .then(({ data }) => dispatch(fillUser(data)));

      const receiverRes = await axios.get(`/users/${receiverId}`);
      const notifications = receiverRes.data.notifications || [];
      const newNotification = {
        type: "friend_request",
        from: user.id,
      };

      await axios.patch(`/users/${receiverId}`, {
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

  return (
    <section className="friends">
      <div className="friends__row">
        <div className="friends__follow">
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
                    ""
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
        <div className="friends__filter"></div>
      </div>
    </section>
  );
};

export default Friends;
