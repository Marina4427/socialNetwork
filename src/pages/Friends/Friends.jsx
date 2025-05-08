import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "@chakra-ui/react";
import { findAllUsers } from "../../redux/reducers/findUsersSlice";
import {RiUserAddLine} from "react-icons/ri"

const Friends = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { data, filter } = useSelector((store) => store.findUsers);
  const [search, setSearch] = useState( filter.search || '' )

  useEffect(() => {
    dispatch(findAllUsers({email: user.email}));
  }, []);

//   useEffect(() => {

//   }, [search])

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
                  fallbackSrc="https://media.istockphoto.com/id/1300845620/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-icon-flat-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0.jpg?s=612x612&w=0&k=20&c=Po5TTi0yw6lM7qz6yay5vUbUBy3kAEWrpQmDaUMWnek="
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
