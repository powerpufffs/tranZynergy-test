/* eslint-disable */

import React from "react";
import { FaEnvelope, FaPhone, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { MdGridOn, MdViewHeadline } from "react-icons/md";
import { motion } from "framer-motion";
// import { useQuery } from "react-query";
import randomUserAxios from "../api/random-user";
import { useQuery } from "react-query";
import GlobalText from "../../localization";

const textData = GlobalText.english.pages.admin;

const getUsers = (number = 10) => {
  return useQuery("users", () =>
    randomUserAxios.get(`?results=${number}`).then((res) => {
      const { results } = res.data;
      return results.map((datum) => {
        const { name, location, email, phone, registered, picture } = datum;
        return { name, location, email, phone, registered, picture };
      });
    })
  );
};

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selected = "hsla(215, 42%, 50%, 100%)";
  const hover = "hsla(215, 42%, 50%, 50%)";
  // This would probably be in a config file somewhere in production. This is for the sake of time
  const menuOptions = [
    {
      icon: FaUserAlt,
      title: "Users",
    },
    {
      icon: FaSignOutAlt,
      title: "Log Out",
    },
  ];
  return (
    <section className="relative bg-blue-900 w-64 mt-4">
      {menuOptions.map(({ icon: Icon, title }, i) => (
        <motion.div
          key={i}
          className="h-16 bg-white rounded-md mr-2 text-white text-xl flex items-center ml-1 pl-4"
          animate={{
            opacity: 1,
            backgroundColor: i === selectedIndex ? selected : "transparent",
          }}
          whileHover={{ backgroundColor: hover }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedIndex(i)}
        >
          <Icon />
          <h1 className="ml-4">{title}</h1>
        </motion.div>
      ))}
    </section>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex min-w-full min-h-screen bg-blue-900 p-2">
      <SideBar />
      <section className="bg-gray-100 w-full flex rounded-md">
        {children}
      </section>
    </div>
  );
};

const UserRow = ({ user }) => {
  const { name, location, email, phone, registered, picture } = user;

  return (
    <div className="py-4 border-gray-300 border-t flex">
      <img src={picture.medium} className="rounded-full shadow-lg" />
      <div className="ml-6 h-full flex flex-col justify-start w-full">
        <h1 className="font-semibold">{`${name.first} ${name.last}`}</h1>
        <h1 className="italic">{`${location.city}, ${location.country}`}</h1>
      </div>
    </div>
  );
};

const ViewType = {
  Card: "card",
  Line: "line",
};

const ViewSwitcher = ({ selected = ViewType.Card, changeView = (_) => _ }) => {
  console.log(selected);
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

  React.useEffect(() => {
    console.log(viewType);
  }, [viewType]);

  return (
    <Layout>
      {
        <div className="flex flex-col px-8 pt-8 w-full">
          <div className="flex justify-between">
            <h1 className=" font-semibold pb-4 text-xl">{textData.title}</h1>
            <ViewSwitcher selected={viewType} changeView={setViewType} />
          </div>
          {status === "loading" ? (
            <div>Loading...</div>
          ) : (
            users.map((user, i) => <UserRow key={i} user={user} />)
          )}
        </div>
      }
    </Layout>
  );
};

export default Admin;
