import React, { useState } from "react";
import { SlPencil } from "react-icons/sl";
import {
  Avatar,
  Button,
  useToast,
  CloseButton,
  IconButton,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import bgUser from "../../assets/bg.svg";
import { IoCameraOutline } from "react-icons/io5";
import { LuSmilePlus } from "react-icons/lu";
import axios from "../../utils/axios";
import { fillUser } from "../../redux/reducers/userSlice";
import { v4 as uuidv4 } from "uuid";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { PiShareFat, PiShareFatFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";

const MyProfile = () => {
  const user = useSelector((store) => store.user.user);
  const [post, setPost] = useState("");
  const [selectEmoji, setSelectEmoji] = useState();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const addPost = async () => {
    try {
      const { data: updatedUser } = await axios.patch(`/users/${user.id}`, {
        posts: [
          ...(user.posts || []),
          {
            content: post,
            createdAt: new Date().toISOString(),
            likes: [],
            comments: [],
            id: uuidv4(),
            autor: user.id,
          },
        ],
      });

      dispatch(fillUser(updatedUser));
      setPost("");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить пост",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deletePost = async (postId) => {
    try {
      const updatedPosts = user.posts.filter((post) => post.id !== postId);
      const { data: updatedUser } = await axios.patch(`/users/${user.id}`, {
        posts: updatedPosts,
      });
      dispatch(fillUser(updatedUser));
    } catch (error) {
      console.error("Ошибка удаления:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пост",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__info">
          <div
            className="profile__info-top"
            style={{ backgroundImage: `url(${bgUser}` }}
          >
            <button className="profile__info-cover">
              <SlPencil />
              Change cover
            </button>
            <div className="profile__info-avatar">
              {user.photo ? (
                <img src={user.photo} alt={`${user.name}'s profile`} />
              ) : (
                <IoCameraOutline />
              )}
            </div>
          </div>

          <div className="profile__info-bottom">
            <div className="profile__info-columns">
              <div className="profile__info-left">
                <button
                  onClick={() => navigate("/editprofile")}
                  className="profile__info-change"
                >
                  <SlPencil />
                </button>
                <h3 className="profile__info-name">
                  {user.name} {user.surname}
                </h3>
                <p className="profile__info-city"> {user.city} </p>

                {user.info.family ? (
                  <p className="profile__info-city">
                    Семейное положение: {user.info.family}
                  </p>
                ) : null}

                {user.info?.showBirthday === "show" ? (
                  <p className="profile__info-city">
                    Дата рождения: {user.birthday}{" "}
                  </p>
                ) : user.info?.showBirthday === "notshowyear" ? (
                  <p className="profile__info-city">
                    День рождения:{" "}
                    {user.birthday.split(" ").slice(0, 2).join(" ")}{" "}
                  </p>
                ) : null}

                {user.info.language ? (
                  <p className="profile__info-city">
                    Языки:{" "}
                    {user.info?.language.map((item) => item.label).join(",")}
                  </p>
                ) : null}
              </div>

              {user.info.about ? (
                <p className="profile__info-aboutUser">
                  О себе: {user.info.about}
                </p>
              ) : null}
            </div>

            <NavLink to="/editprofile" className="profile__info-about">
              Enter information about yourself <span>{">"}</span>
            </NavLink>
          </div>
        </div>

        <div className="profile__addPost">
          <div className="profile__addPost-top">
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Что у вас нового ?"
              className="profile__addPost-field"
            />

            {selectEmoji ? (
              <div
                className="profile__emoji-block"
                onMouseLeave={() => setSelectEmoji(false)}
              >
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setPost((prev) => prev + emoji.emoji);
                  }}
                />
              </div>
            ) : (
              <span
                onMouseEnter={() => setSelectEmoji(true)}
                className="profile__addPost-emoji"
              >
                <LuSmilePlus />
              </span>
            )}
          </div>

          <Button onClick={addPost} bg="gray.300" size="sm" variant="solid">
            Опубликовать
          </Button>
        </div>

        {!user?.posts?.length ? null : (
          <div className="profile__posts">
            <div className="profile__posts-top">
              <Button size="sm" variant="ghost" >
                Все записи
              </Button>
              <Button size="sm" variant="ghost">
                Мои записи
              </Button>
              <Button size="sm" variant="ghost">
                Архив записей
              </Button>
            </div>

            <div className="profile__posts-row">
              {user.posts.map((item) => (
                <div key={item.id} className="profile__posts-card ">
                  <div className="profile__posts-card-top">
                    <div className="profile__posts-card-top-autor">
                      <Avatar src={user.photo} />
                      <div>
                        <p>
                          {user.name} {user.surname}
                        </p>
                        <p className="profile__posts-card-date">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    <CloseButton onClick={() => deletePost(item.id)} />
                  </div>
                  <p className="profile__posts-card-text">{item.content}</p>
                  <div className="profile__posts-card-icons">
                    <IconButton size="xs" bgColor="gray.800" variant="surface">
                      <FaRegHeart />
                    </IconButton>
                    <IconButton size="xs" bgColor="gray.800" variant="surface">
                      <GoComment />
                    </IconButton>
                    <IconButton size="xs" bgColor="gray.800" variant="surface">
                      <PiShareFat />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
