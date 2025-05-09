import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "@chakra-ui/react";
import { findAllUsers } from "../../redux/reducers/findUsersSlice";
import {RiUserAddLine} from "react-icons/ri";
import { changeSearch } from "../../redux/reducers/findUsersSlice";


const Friends = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user.user);
  const { data, filter } = useSelector((store) => store.findUsers);
  const [search, setSearch] = useState( filter.search || '' )

 
  useEffect(() => {
    if (user?.id) {
      dispatch(findAllUsers({ email: user.email, search }))
      dispatch(changeSearch(search))
    }
  }, [search]);



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
                  <button className="friends__card-btn">
                  <RiUserAddLine />
                  </button>
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
