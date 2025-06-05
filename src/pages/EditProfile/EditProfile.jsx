import { useTranslation } from "react-i18next";
import { days, months, years } from "../../utils/birthday";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { fillUser } from "../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import {
  languageOptions,
  maleStatusOptions,
  femaleStatusOptions,
} from "../../const/const";

const EditProfile = () => {
  const user = useSelector((store) => store.user.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      about: user?.info?.about || "",
      gender: user?.gender || "",
      family: user?.info?.family || "",
      showBirthday: user?.info?.showBirthday || "show",
      language: user?.info?.language || [],
      city: user?.city || "",
      day: "",
      month: "",
      year: "",
    },
  });

  // Парсим дату при загрузке
  useEffect(() => {
    if (user?.birthday) {
      const [d, m, y] = user.birthday.split(" ");
      setValue("day", d);
      setValue("month", m);
      setValue("year", y);
    }
  }, [user, setValue]);

  const updateUserInfo = async (data) => {
    const { day, month, year, about, family, showBirthday, language, ...rest } =
      data;
    const birthday = `${day} ${month} ${year}`;

    const updatedUser = {
      ...rest,
      birthday,
      info: {
        about,
        family,
        showBirthday,
        language,
      },
    };

    await axios
      .patch(`/users/${user.id}`, updatedUser)
      .then(({ data }) => {
        dispatch(fillUser(data));
        toast({
          title: "Данные обновлены",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "center-top",
        });
        navigate('/myprofile')
      })
      .catch((err) => {
        toast({
          title: "Ошибка при сохранении",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "center-top",
        });
      });
  };

  const { i18n } = useTranslation();
  const [gender, setGender] = useState(user.gender);
  const currentStatusOptions =
    gender === "women" ? femaleStatusOptions : maleStatusOptions;

  return (
    <section className="editMyProfile">
      <div className="container">
        <h1 className="editMyProfile__title"> Редактирование профиля</h1>
        <div className="editMyProfile__info">
          <form
            noValidate
            onSubmit={handleSubmit(updateUserInfo)}
            className="editMyProfile__content"
          >
            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="name">
                Имя:
              </label>
              <input
                {...register("name")}
                className="editMyProfile__field width"
                id="name"
              />
            </div>
            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="surname">
                Фамилия:
              </label>
              <input
                {...register("surname")}
                className="editMyProfile__field width"
                id="surname"
              />
            </div>

            <div className="editMyProfile__card">
              <label className="editMyProfile__label " htmlFor="info">
                Краткая информация:
              </label>
              <textarea
                {...register("about")}
                className="editMyProfile__field width"
                id="info"
              />
            </div>

            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="gender">
                Пол:
              </label>
              <select
                {...register("gender")}
                className="editMyProfile__field width custom-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                id="family"
              >
                <option value="">Не выбрано</option>
                <option value="man">Мужской</option>
                <option value="women">Женский</option>
              </select>
            </div>

            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="family">
                Семейное положение:
              </label>
              <select
                className="editMyProfile__field width custom-select"
                id="family"
                onChange={(e) => e.target.value}
                {...register("family")}
              >
                <option value="">Не выбрано</option>
                {currentStatusOptions.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="birthday">
                День рождения:
              </label>
              <select
                {...register("day")}
                className="editMyProfile__field"
                id="birthday"
              >
                {days.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select {...register("month")} className="editMyProfile__field">
                {months.map((item) => (
                  <option key={item.en} value={item.en}>
                    {i18n.language === "ru" ? item.ru : item.en}
                  </option>
                ))}
              </select>

              <select {...register("year")} className="editMyProfile__field">
                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="show"></label>
              <select
                {...register("showBirthday")}
                className="editMyProfile__field width custom-select"
                id="show"
              >
                <option value="notshow">Не показывать дату рождения</option>
                <option value="show">Показывать дату рождения</option>
                <option value="notshowyear">Не показывать год рождения</option>
              </select>
            </div>

            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="birthday">
                Языки:
              </label>

              <Controller
                control={control}
                name="language"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={languageOptions}
                    isMulti
                    placeholder="Выберите языки"
                    value={field.value}
                    classNamePrefix="select"
                    className="width"
                  />
                )}
              />
            </div>

            <div className="editMyProfile__card">
              <label className="editMyProfile__label" htmlFor="city">
                Город:
              </label>
              <input
                {...register("city")}
                className="editMyProfile__field width"
                id="city"
              ></input>
            </div>
            <button className="editMyProfile-btn-save" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
