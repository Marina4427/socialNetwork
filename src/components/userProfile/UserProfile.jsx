import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { Avatar, Button, IconButton, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { FaRegHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { LuSmilePlus } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";

const UserProfile = () => {
  const { id } = useParams(); // id пользователя из URL
  const [userData, setUserData] = useState(null);
  const currentUser = useSelector((store) => store.user.user);
  const [postText, setPostText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const toast = useToast();

  const isFriend = currentUser?.friends?.includes(id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/users/${id}`);
        setUserData(data);
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить профиль пользователя",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchUser();
  }, [id]);

  const handleAddPost = async () => {
    try {
      const newPost = {
        id: Date.now().toString(),
        autor: currentUser.id,
        content: postText,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
      };

      const updatedPosts = [...(userData.posts || []), newPost];

      const { data: updatedUser } = await axios.patch(`/users/${id}`, {
        posts: updatedPosts,
      });

      setUserData(updatedUser);
      setPostText("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оставить запись",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!userData) return <p>Загрузка...</p>;

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__info">
          <div
            className="profile__info-top"
            style={{ backgroundImage: `url(${userData.bgPhoto || ""})` }}
          >
            <div className="profile__info-avatar">
              {userData.photo ? (
                <img src={userData.photo} alt={`${userData.name}'s avatar`} />
              ) : (
                <span>Нет фото</span>
              )}
            </div>
          </div>

          <div className="profile__info-bottom">
            <h3 className="profile__info-name">
              {userData.name} {userData.surname}
            </h3>
            <p className="profile__info-city">{userData.city}</p>
            {userData.info?.family && (
              <p>Семейное положение: {userData.info.family}</p>
            )}
            {userData.info?.language && (
              <p>
                Языки:{" "}
                {userData.info.language.map((lang) => lang.label).join(", ")}
              </p>
            )}
            {userData.info?.about && (
              <p className="profile__info-aboutUser">
                О себе: {userData.info.about}
              </p>
            )}
          </div>
        </div>

        {isFriend && (
          <div className="profile__addPost">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Оставить сообщение"
              className="profile__addPost-field"
            />
            {showEmoji && (
              <div
                className="profile__emoji-block"
                onMouseLeave={() => setShowEmoji(false)}
              >
                <EmojiPicker
                  onEmojiClick={(emoji) =>
                    setPostText((prev) => prev + emoji.emoji)
                  }
                />
              </div>
            )}
            <span
              onMouseEnter={() => setShowEmoji(true)}
              className="profile__addPost-emoji"
            >
              <LuSmilePlus />
            </span>
            <Button onClick={handleAddPost}>Оставить запись</Button>
          </div>
        )}

        <div className="profile__posts">
          <h4>Записи</h4>
          <div className="profile__posts-row">
            {(userData.posts || []).map((post) => (
              <div key={post.id} className="profile__posts-card">
                <div className="profile__posts-card-top">
                  <div className="profile__posts-card-top-autor">
                    <Avatar src={userData.photo} />
                    <div>
                      <p>
                        {userData.name} {userData.surname}
                      </p>
                      <p className="profile__posts-card-date">
                        {format(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="profile__posts-card-text">{post.content}</p>
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
      </div>
    </section>
  );
};

export default UserProfile;
