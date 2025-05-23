import { useDispatch, useSelector } from "react-redux";
import { useGetRequestsQuery } from "../../redux/reducers/requestSlice";
import { Button, Image } from "@chakra-ui/react";
import axios from "../../utils/axios";
import { fillUser } from "../../redux/reducers/userSlice";
import { userSelector } from "../../redux/reselect";

const Requests = () => {
  const user = useSelector(userSelector);
  const { data = [], isLoading } = useGetRequestsQuery(user.friendRequests);
  const dispatch = useDispatch();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const cancelRequest= async (id) => {
    try {
      const { data: updatedUser } = await axios.patch(`/users/${user.id}`, {
      friendRequests: user.friendRequests.filter((requestId ) => requestId  !== id)
    }) 
    dispatch(fillUser(updatedUser));

    await  axios.patch(`/users/${id}`, {
      notifications: id.notifications.filter((notificationId ) => notificationId  !== user.id)
    });
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  }


  return (
    <section className="requests">
      <div className="container">
        <div className="notification__list">
          {data.map((item) => (
            <div key={item._id} className="notification__card">
              <div className="notification__card-left">
                <Image
                  fallbackSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5CysVsiTDenCVvLYM6u2ElQnZST7jjmFdw&s"
                  borderRadius="full"
                  boxSize="85px"
                  src={item.photo}
                  alt={`${item.name} ${item.surname}`}
                  objectFit="cover" 
                />

                <div className="notification__info">
                  <p className="notification__info-name">
                    {item.name} {item.surname}{" "}
                  </p>
                  <p className="notification__info-action">
                    Вы отправили заявку в друзья
                  </p>
                  <p className="notification__info-city">{item.city}</p>
                </div>
              </div>

              <div>
                <div className="notification__btns">
             
                  <Button onClick={() => cancelRequest(item.id)}  color="black" colorScheme="gray" size='sm'>
                    Отклонить
                  </Button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Requests;
