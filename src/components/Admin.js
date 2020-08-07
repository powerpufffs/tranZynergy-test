/* eslint-disable */

import React from "react";
import { css } from "@emotion/core";
import {
  FaEnvelope,
  FaPhone,
  FaUserAlt,
  FaSignOutAlt,
  FaLongArrowAltUp,
} from "react-icons/fa";
import { MdGridOn, MdViewHeadline } from "react-icons/md";
import { motion } from "framer-motion";
import randomUserAxios from "../api/random-user";
import { useQuery } from "react-query";
import GlobalText from "../../localization";
import Card from "../components/Card";
import { navigate } from "@reach/router";
import { AuthContext } from "../utils/authContext";

const textData = GlobalText.english.pages.admin;

const getUsers = (number = 10) => {
  return useQuery(
    "users",
    () =>
      randomUserAxios.get(`?results=${number}`).then((res) => {
        const { results } = res.data;
        return results.map((datum) => {
          const { name, location, email, phone, registered, picture } = datum;
          return { name, location, email, phone, registered, picture };
        });
      }),
    { staleTime: 50000 }
  );
};

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { logout } = React.useContext(AuthContext);
  const menuOptions = [
    {
      icon: FaUserAlt,
      title: "Users",
      action: () => navigate("admin"),
    },
    {
      icon: FaSignOutAlt,
      title: "Log out",
      action: logout,
    },
  ];
  return (
    <section className="relative w-64 mt-4 text-gray-900">
      {menuOptions.map(({ icon: Icon, title, action }, i) => {
        return (
          <motion.a
            key={Math.random() * i}
            className="h-16 rounded-md mr-2 text-xl flex items-center pl-4 mt-2"
            animate={{
              opacity: 1,
              backgroundColor:
                i === selectedIndex
                  ? "rgba(192, 92, 255, 1.0)"
                  : "rgba(20%, 0%, 53%, 0)",
            }}
            whileHover={{ backgroundColor: "rgba(192, 92, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedIndex(i);
              action && action();
            }}
          >
            <Icon />
            <h1 className="ml-4">{title}</h1>
          </motion.a>
        );
      })}
    </section>
  );
};

const Layout = ({ children }) => {
  return (
    <div
      className="flex min-w-full min-h-screen p-2"
      css={css`
        background-image: url(${require("../images/gradient.jpg")});
        background-size: cover;
        background-repeat: no-repeat;
      `}
    >
      <SideBar />
      <section
        className="w-full flex rounded-md pb-4"
        css={css`
          backdrop-filter: 20px;
          background-color: hsla(0, 0%, 80%, 0.3);
        `}
      >
        {children}
      </section>
    </div>
  );
};

const TableView = ({ users }) => {
  return (
    <table className="w-full mt-4">
      <tbody>
        <tr className="text-left">
          <th>Name</th>
          <th>Country</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Age</th>
        </tr>
        {users.map((user, i) => (
          <UserRow key={i} user={user} />
        ))}
      </tbody>
    </table>
  );
};

const UserRow = ({ user }) => {
  const { name, location, email, phone, registered } = user;

  return (
    <tr className="border-t border-purple-900 h-12 rounded-md">
      <td>{`${name.first} ${name.last}`}</td>
      <td>{location.country}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{registered.age}</td>
    </tr>
  );
};

const CardView = ({ users }) => (
  <div className="flex flex-wrap">
    {users.map((user, i) => (
      <>
        <UserCard key={i} user={user} />
        <div className="w-4 h-4" />
      </>
    ))}
  </div>
);

const UserCard = ({ user }) => {
  const { name, location, email, phone, registered, picture } = user;

  return (
    <Card
      className="mt-4 py-5 px-6 shadow-lg break-all"
      css={css`
        backdrop-filter: blur(10px);
        background-color: hsla(0, 0%, 100%, 0.3);
      `}
    >
      <div className="w-64 flex flex-col items-center">
        <img src={picture.medium} className="rounded-full shadow-lg" />
        <h1 className="font-semibold mt-4">{`${name.first} ${name.last}`}</h1>
        <h1 className="italic text-center">{`${location.city}, ${location.country}`}</h1>
        <div className="flex flex-col mt-4 text-gray-700">
          <div className="flex items-center">
            <FaEnvelope className="flex-shrink-0" />
            <h1 className="ml-3">{email}</h1>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="flex-shrink-0" />
            <h1 className="ml-3">{phone}</h1>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="flex-shrink-0" />
            <h1 className="ml-3">{registered.age}</h1>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ViewType = {
  Card: "card",
  Line: "line",
};

const ViewSwitcher = ({ selected = ViewType.Card, changeView = (_) => _ }) => {
  return (
    <div className="flex justify-between items-center border-gray-500 w-12">
      <motion.div
        className={selected === ViewType.Line ? "opacity-50" : undefined}
        onClick={() => {
          console.log("clicked card");
          changeView(ViewType.Card);
        }}
        whileTap={{ scale: 0.9 }}
      >
        <MdGridOn />
      </motion.div>
      <motion.div
        className={selected === ViewType.Card ? "opacity-50" : undefined}
        onClick={() => {
          console.log("clicked line");
          changeView(ViewType.Line);
        }}
        whileTap={{ scale: 0.9 }}
      >
        <MdViewHeadline />
      </motion.div>
    </div>
  );
};

const Admin = () => {
  const { status, data: users } = getUsers();
  const [viewType, setViewType] = React.useState(ViewType.Card);

  return (
    <Layout>
      {
        <div className="flex flex-col px-8 pt-8 w-full">
          <div className="flex justify-between">
            <h1 className=" font-semibold mb-2 text-xl text-gray-900 w-full">
              {textData.title}
            </h1>
            <ViewSwitcher selected={viewType} changeView={setViewType} />
          </div>
          <div className="border-t-2 border-pink-900">
            {status === "loading" ? (
              <div>Loading...</div>
            ) : viewType === ViewType.Card ? (
              <CardView users={users} />
            ) : (
              <TableView users={users} />
            )}
          </div>
        </div>
      }
    </Layout>
  );
};

export default Admin;
