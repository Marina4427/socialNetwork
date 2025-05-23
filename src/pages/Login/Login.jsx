import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fillUser } from "../../redux/reducers/userSlice";
import axios from "../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [passwordView, setPasswordView] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const loginUser = (data) => {
    const normalizedData = {
      ...data,
      email: data.email.trim().toLowerCase(), // нормализация email
    };

    axios
      .post("/login", normalizedData)
      .then(({ data }) => {
        dispatch(fillUser(data.user));
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: t("login.errMessage"),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "center-top",
        });
      });
  };

  return (
    <div className="register">
      <div className="register__content">
        <form
          className="register__form"
          noValidate
          onSubmit={handleSubmit(loginUser)}
        >
          <h1 className="register__title">{t("form.title2")}</h1>
          <label className="register__label">
            <h2 className="register__label-title">E-mail</h2>
            <input
              {...register("email", {
                required: "Field is required",
                minLength: {
                  message: "Minimum 6 characters",
                  value: 6,
                },
                pattern: {
                  message: "Enter correctly your email",
                  value: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
                },
              })}
              type="email"
              placeholder="email"
              autoComplete="username"
              className="register__field"
              style={{ border: errors.email && "#f5222d 1px solid" }}
            />
            <span className="register__error">
              {errors.email && <BiErrorCircle fill="#f5222d" />}
              <span className="register__error-text">
                {errors.email && errors.email.message}
              </span>
            </span>
          </label>

          <label className="register__label">
            <h2 className="register__label-title">{t("form.labelPassword")}</h2>

            <div className="register__label-wrapper">
              <input
                type={passwordView ? "text" : "password"}
                className="register__field"
                style={{ border: errors.password && "#f5222d 1px solid" }}
                {...register("password", {
                  required: "Field is required",
                  pattern: {
                    message:
                      "Password must contain at least 8 characters, a capital letter and a number!",
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/,
                  },
                })}
                placeholder={t("form.labelPassword")}
              />
              <span
                className="register__field-password-icon"
                onClick={() => setPasswordView((prev) => !prev)}
              >
                {passwordView ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            <span className="register__error">
              {errors.password && <BiErrorCircle fill="#f5222d" />}
              <span className="register__error-text">
                {errors.password && errors.password.message}
              </span>
            </span>
          </label>

          <button className="register__btn" type="submit">
            {t("form.btn2")}
          </button>
          <p className="register__text"> {t("form.question2")} </p>
          <Link className="register__question" to="/register">
            {t("form.btn1")}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
