import React from "react";
import Card from "./Card";
import { navigate } from "@reach/router";

import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const FormInput = ({ ariaLabel, name, type, placeholder }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <input
        field={field}
        ariaLabel={ariaLabel}
        name={field.name}
        type={type}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <h1 className="text-red-600" text={meta.error}>
          {meta.error}
        </h1>
      ) : null}
    </>
  );
};

const Login = () => {
  //   const [loginStatus, setLoginStatus] = React.useState("");

  const onSubmit = (e) => {
    console.log(e);
    setTimeout(() => {
      //   setLoginStatus("success");
      navigate("admin");
    }, 2000);
  };

  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Card className="bg-teal-100 shadow-lg">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            onSubmit(values);
          }}
          validationSchema={LoginSchema}
        >
          {() => (
            <Form className="w-56 h-56">
              {/* {loginSuccess && <FormSuccess text={loginSuccess} />}
              {loginError && <FormError text={loginError} />} */}
              <div>
                <div className="mb-2">
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
              <div className="mt-6">
                <button type="submit">Log in</button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
