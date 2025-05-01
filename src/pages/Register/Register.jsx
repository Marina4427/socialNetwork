import React, { useState } from "react";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { BiErrorCircle } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();

  const [passwordView, setPasswordView] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const passwordValue = watch("password");

  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(!!e.target.value);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="register__content" >
          <form
            className="register__form"
            noValidate
            // onSubmit={handleSubmit(registerUser)}
          >
            <h1 className="register__title">Register</h1>
            <div className="register__block">
              <label className="register__label">
                <h2 className="register__label-title">Name</h2>
                <input
                  style={{ border: errors.name && "#f5222d 1px solid" }}
                  placeholder="Enter name"
                  type="text"
                  {...register("name", {
                    required: {
                      message: "Enter your name",
                      value: true,
                    },
                    maxLength: {
                      message: "Maximum length 20 characters",
                      value: 20,
                    },
                    minLength: {
                      message: "Minimum length 2 characters",
                      value: 2,
                    },
                  })}
                  className="register__field"
                />
                <span className="register__error">
                  {errors.name && <BiErrorCircle fill="#f5222d" />}
                  <span className="register__error-text">
                    {errors.name && errors.name.message}
                  </span>
                </span>
              </label>
              <label className="register__label">
                <h2 className="register__label-title">Last Name</h2>
                <input
                  type="text"
                  style={{ border: errors.surname && "#f5222d 1px solid" }}
                  {...register("surname", {
                    required: {
                      message: "Enter your last name",
                      value: true,
                    },
                    maxLength: {
                      message: "Maximum length 20 characters",
                      value: 20,
                    },
                    minLength: {
                      message: "Minimum length 2 characters",
                      value: 2,
                    },
                  })}
                  className="register__field"
                  placeholder="Enter last name"
                />
                <span className="register__error">
                  {errors.surname && <BiErrorCircle fill="#f5222d" />}
                  <span className="register__error-text">
                    {errors.surname && errors.surname.message}
                  </span>
                </span>
              </label>
            </div>
            <label className="register__label">
              <h2 className="register__label-title">Login</h2>
              <input
                {...register("email", {
                  required: "Field is required",
                  minLength: {
                    message: "Minimum 7 characters",
                    value: 7,
                  },
                  pattern: {
                    message: "Enter correctly your email",
                    value: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
                  },
                })}
                type="email"
                placeholder="Enter email"
                autoComplete="username"
                className="register__field"
                style={{ border: errors.login && "#f5222d 1px solid" }}
              />
              <span className="register__error">
                {errors.email && <BiErrorCircle fill="#f5222d" />}
                <span className="register__error-text">
                  {errors.email && errors.email.message}
                </span>
              </span>
            </label>
            <label className="register__label">
              <h2 className="register__label-title">Phone</h2>

              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Field is required",
                  pattern: {
                    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: "Enter correctly your phone",
                  },
                }}
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask="+7 (000) 000-00-00"
                    unmask={false}
                    inputRef={field.ref}
                    lazy={false}
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    onAccept={(value) => field.onChange(value)}
                    className="register__field"
                  />
                )}
              />
              <span className="register__error">
                {errors.phone && <BiErrorCircle fill="#f5222d" />}
                <span className="register__error-text">
                  {errors.phone && errors.phone.message}
                </span>
              </span>
            </label>

            <div className="register__block">
              <label className="register__label">
                <h2 className="register__label-title">Password</h2>

                <div className="register__label-wrapper" >
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
                    placeholder="Enter password"
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

              <label className="register__label">
                <h2 className="register__label-title">Password Again</h2>
                <div className="register__label-wrapper">
                  <input
                    type={passwordView ? "text" : "password"}
                    className="register__field"
                    placeholder="Enter password"
                    style={{
                      border: errors.confirmPwd && "#f5222d 1px solid",
                    }}
                    {...register("confirmPwd", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "The passwords do not match!",
                    })}
                  />
                  <span
                    className="register__field-password-icon"
                    onClick={() => setPasswordView((prev) => !prev)}
                  >
                    {passwordView ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                <span className="register__error">
                  {errors.confirmPwd && <BiErrorCircle fill="#f5222d" />}
                  <span className="register__error-text">
                    {errors.confirmPwd && errors.confirmPwd.message}
                  </span>
                </span>
              </label>






            </div>
            <div className="register__block">
              <label className="register__label">
                <h2 className="register__label-title">Gender</h2>
                <div className="register__gender">
                  <div className="register__gender-item">
                    <input
                      {...register("gender", {
                        required: { value: true, message: "Specify gender" },
                      })}
                      id="men"
                      value="men"
                      className="register__gender-input"
                      type="radio"
                    />
                    <label htmlFor="men">Men</label>
                  </div>
                  <div className="register__gender-item">
                    <input
                      {...register("gender", {
                        required: { value: true, message: "Specify gender" },
                      })}
                      id="women"
                      className="register__gender-input"
                      type="radio"
                      value="women"
                    />
                    <label htmlFor="women">Women</label>
                  </div>
                </div>
                <span className="register__error">
                  {errors.gender && <BiErrorCircle fill="#f5222d" />}
                  <span className="register__error-text">
                    {errors.gender && errors.gender.message}
                  </span>
                </span>
              </label>
            </div>
            {/* <DownLoadBtn images={images} setImages={setImages} t={t} /> */}
            <div className="register__block">
              <label className="register__label">
                <h2 className="register__label-title">Birthday</h2>
                <input
                  type="date"
                  {...register("birthday", {
                    required: { value: true, message: "Enter a date" },
                  })}
                  style={{
                    border: errors.birthday && "#f5222d 1px solid",
                  }}
                  className={`custom-date register__field ${
                    hasValue ? "has-value" : ""
                  }`}
                  onChange={handleChange}
                />
                <span className="register__error">
                  {errors.birthday && <BiErrorCircle fill="#f5222d" />}
                  <span className="register__error-text">
                    {errors.birthday && errors.birthday.message}
                  </span>
                </span>
              </label>

              <label className="register__label">
                <h2 className="register__label-title">City</h2>
                <input
                  type="text"
                  {...register("city", {
                    required: { value: true, message: "Enter a city" },
                  })}
                  style={{
                    border: errors.city && "#f5222d 1px solid",
                  }}
                  className="register__field"
                  placeholder="Enter a city"
                />
                <span className="register__error">
                  {errors.city && <BiErrorCircle fill="#f5222d" />}
                  <span className="register__error-text">
                    {errors.city && errors.city.message}
                  </span>
                </span>
              </label>
            </div>
            <button className="register__btn" type="submit">
              Sign Up
            </button>
            <p className="register__text"> If you've already had an account </p>
            <Link className="register__question" to="/login">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
