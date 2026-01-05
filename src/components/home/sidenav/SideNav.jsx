import React, { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import Logout from "../../portals/Logout";

const SideNav = () => {
  const { globalState } = useUserContext();
  const [showPortal, setShowPortal] = useState(false);

  const handelLogout = (e) => {
    e.stopPropagation();
    setShowPortal(true);
  };

  console.log(showPortal);

  // Destructuring user data from globalState
  const {
    email,
    name,
    college,
    mobile,
    positionApplyingFor,
    skills,
    yearOfPassout,
    appliedCompanies,
  } = globalState.user;

  return (
    <div className="w-full h-9/10 rounded-2xl shadow-[0px_0px_25px_1px_#0005] p-5 flex-col flex gap-5">
      {/* User Header Section with Avatar */}
      <div className="flex gap-2 items-center font-extrabold capitalize">
        <div
          className="size-20 bg-gray-300 rounded-2xl text-6xl font-extrabold flex justify-center items-center pb-3.5 cursor-pointer"
          onClick={handelLogout}
        >
          {name.slice(0, 1)}
        </div>
        <div>
          <div>{name}</div>
          <div>{mobile}</div>
          <div>{yearOfPassout}</div>
        </div>
      </div>

      {/* Email Section */}
      <div className="bg-gray-300 rounded-2xl p-2 font-bold">
        <span>{email}</span>
      </div>

      {/* College Section */}
      <div className="bg-gray-300 p-2 rounded-2xl">
        <span className="capitalize font-bold">College : </span>
        <span>{college}</span>
      </div>

      {/* Position Section */}
      <div>
        <div className="bg-gray-300 p-2 rounded-2xl">
          <span className="capitalize font-bold">Position Applying For</span>
        </div>
        <div className="p-2 rounded-2xl">
          <span className="pl-5 capitalize font-bold">{positionApplyingFor}</span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="flex gap-3 flex-wrap">
        {skills.map((skill, index) => (
          <div
            key={index + 1}
            className="bg-green-50 rounded-xl border-green-400 p-2 border-2"
          >
            <span>{skill}</span>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="grow items-center justify-end flex flex-col gap-5">
        <div className="text-[12px] font-bold flex justify-center">
          TOTAL NUMBER OF COMPANIES APPLIED
        </div>
        <div className="flex justify-center text-5xl">
          {appliedCompanies.length}
        </div>
      </div>

      {/* Logout Portal */}
      {showPortal && <Logout setShowPortal={setShowPortal}></Logout>}
    </div>
  );
};

export default SideNav;