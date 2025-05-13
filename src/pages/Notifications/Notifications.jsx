import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification } from "../../redux/reducers/notificationSlice";
import { Image, Button, useToast } from "@chakra-ui/react";
import axios from "../../utils/axios";
import { fillUser } from "../../redux/reducers/userSlice";

const Notifications = () => {
  const user = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const { data } = useSelector((store) => store.notifications);

  useEffect(() => {
    if (user.notifications && user.notifications.length) {
      dispatch(getAllNotification(user.notifications));
    }
  }, [user, dispatch]);

  const acceptFriends = async (id) => {
    try {
      const { data: senderUser } = await axios.get(`/users/${id}`);

      // const updatedSender = await

      axios.patch(`/users/${id}`, {
        friendRequests: senderUser.friendRequests.filter(
          (id) => id !== user.id
        ),
        friends: [...senderUser.friends, user.id],
      });

      // Удаляем уведомление у текущего пользователя + добавляем в друзья
      const updatedNotifications = user.notifications.filter(
        (n) => n.from !== id
      );
      const updatedUser = await axios.patch(`/users/${user.id}`, {
        notifications: updatedNotifications,
        friends: [...user.friends, id],
      });

      dispatch(fillUser(updatedUser.data));
      toast({
        title: "Теперь вы друзья",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Ошибка при принятии",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "center-top",
      });
    }
  };


  const rejectFriends = async (id) => {
    try {      
      // Удаляем friendRequest у отправителя
      axios.patch(`/users/${id}`, {
        friendRequests: id.friendRequests.filter((id) => id !== user.id),
      });
      // Удаляем уведомление у текущего пользователя
      const updatedNotifications = user.notifications.filter(
        (n) => n.from !== id
      );
  
      const updatedUser = await axios.patch(`/users/${user.id}`, {
        notifications: updatedNotifications,
      });
  
      dispatch(fillUser(updatedUser.data));
  
      toast({
        title: "Запрос отклонён",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Ошибка при отклонении",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    <section className="notification">
      <div className="container">
        <div className="notification__content">
          <h2 className="notification__title"> Уведомления</h2>

          {(!user.notifications || !user.notifications.length) ? (
          <p>Нет новых уведомлений</p>
        ) : (



          <div className="notification__list">
            {data.map((item) => (
              <div key={item.id} className="notification__card">
                <div className="notification__card-left">
                  <Image
                    src={item.photo}
                    boxSize="75px"
                    borderRadius="full"
                    fit="cover"
                    alt={`${item.name} ${item.surname}`}
                    fallbackSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5CysVsiTDenCVvLYM6u2ElQnZST7jjmFdw&s"
                  />
                  <div className="notification__info">
                    <p className="notification__info-name">
                      {" "}
                      {item.name} {item.surname}
                    </p>
                    <p className="notification__info-action">
                      {" "}
                      хочет добавить вас в друзья
                    </p>
                    <p className="notification__info-city"> {item.city} </p>
                  </div>
                </div>

                <div className="notification-btns">
                  {" "}
                  <Button
                    onClick={() => rejectFriends(item.id)}
                    colorScheme="gray"
                    color="black"
                    size="sm"
                    variant="solid"
                  >
                    Отклонить
                  </Button>
                  <Button
                    onClick={() => acceptFriends(item.id)}
                    colorScheme="blue"
                    size="sm"
                    variant="solid"
                  >
                    Принять
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default Notifications;
