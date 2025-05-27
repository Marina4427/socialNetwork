import React, { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { Avatar, Button, useToast } from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import bgUser from "../../assets/bg.svg";
import { IoCameraOutline } from "react-icons/io5";
import { LuSmilePlus } from "react-icons/lu";
import axios from "../../utils/axios";
import { fillUser } from "../../redux/reducers/userSlice";
import { v4 as uuidv4 } from "uuid";

const MyProfile = () => {
  const user = useSelector((store) => store.user.user);
  const [post, setPost] = useState("");
  const [selectEmoji, setSelectEmoji] = useState();
  const dispatch = useDispatch();
  const toast = useToast();

  const addPost = async () => {
    try {
      const { data: updatedUser } = await axios.patch(
        `/users/${user.id}`,
        {
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
        }
      );

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
          </div>
          <div className="profile__info-bottom">
            <div className="profile__info-avatar">
              {user.photo ? (
                <img src={user.photo} alt={`${user.name}'s profile`} />
              ) : (
                <IoCameraOutline />
              )}
            </div>
            <div className="profile__info-user">
              <h3 className="profile__info-name">
                {user.name} {user.surname}
              </h3>
              <p className="profile__info-city"> {user.city} </p>
              <a href="#!" className="profile__info-about">
                Enter information about yourself <span>{">"}</span>
              </a>
            </div>
            <button className="profile__info-change">
              <SlPencil />
            </button>
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

        <div className="profile__posts">
          <div className="profile__posts-top">
            <Button size="sm" variant="ghost" colorPalette="white">
              Все записи
            </Button>
            <Button size="sm" variant="ghost">
              Мои записи
            </Button>
            <Button  size="sm" variant="ghost">
              Архив записей
            </Button>
          </div>

          <div className="profile__posts-row">
            {user.posts?.map((item) => (
              <div key={item.id} className="profile__posts-card ">
                <div className="profile__posts-card-top">
                  <Avatar 
                    src={user.photo}
                  />
                  <div>
                    <p>{user.name} {user.surname} </p>
                  <p className="profile__posts-card-date">{format(item.createdAt)}</p> </div>
                  
                </div>
                <p className="profile__posts-card-text">{item.content}</p>
                <div className="profile__posts-card-icons"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile__news">
        <h2 className="profile__title"> News </h2>
      </div>
    </section>
  );
};

export default MyProfile;
