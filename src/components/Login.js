import React from "react";
import Card from "./Card";
import { navigate } from "@reach/router";
import { css } from "@emotion/core";
import GlobalText from "../../localization";

import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../utils/authContext";

const textData = GlobalText.english.pages.login;

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const FormInput = ({ ariaLabel, name, type, placeholder }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <input
        className="rounded-md shadow-inner w-full h-12 pl-2"
        {...field}
        ariaLabel={ariaLabel}
        name={field.name}
        type={type}
        placeholder={placeholder}
      />
      {meta.touched && meta.error && (
        <h1 className="text-purple-800" text={meta.error}>
          {meta.error}
        </h1>
      )}
    </>
  );
};

const Login = () => {
  const { setUserInfo } = React.useContext(AuthContext);
  const [loginStatus, setLoginStatus] = React.useState("");
  const onSubmit = (credentials) => {
    const { password, email } = credentials;

    if (email !== "123@gmail.com" || password !== "123") {
      setLoginStatus("failed");
      return;
    }

    setTimeout(() => {
      setUserInfo({ username: email });
      navigate("admin");
    }, 1500);
  };

  return (
    <div
      className="h-screen w-screen bg-white flex justify-center items-center"
      css={css`
        background-image: url(${require("../images/gradient.jpg")});
        background-size: cover;
        background-repeat: no-repeat;
      `}
    >
      <Card
        className="bg-white shadow-2xl"
        css={css`
          background-color: hsla(0, 100%, 100%, 0.5);
          backdrop-filter: blur(20px);
        `}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
        >
          {({ handleSubmit }) => (
            <Form
              className="bg-transparent"
              css={css`
                width: 300px;
              `}
              onSubmit={handleSubmit}
            >
              {/* {loginSuccess && <FormSuccess text={loginSuccess} />}
              {loginError && <FormError text={loginError} />} */}
              <div>
                <h1 className="text-2xl text-purple-900">{textData.title}</h1>
                <div className="my-6">
                  <div className="mb-1">
                    <label htmlFor="email">Email</label>
                  </div>
                  <FormInput
                    id="email"
                    ariaLabel="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <div className="mb-1">
                    <label htmlFor="password">Password</label>
                  </div>
                  <FormInput
                    id="password"
                    ariaLabel="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              {loginStatus === "failed" && (
                <h1 className="text-pink-800">Wrong username or password.</h1>
              )}
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full h-12 bg-purple-700 rounded-lg text-pink-100 bold tracking-widerf"
                >
                  Log in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
