import React from "react";
import { Link } from "react-router-dom";
import { IoLogoReact } from "react-icons/io5";

const PageHeader = () => {
  const listHeader = ["Home", "About", "Contact", "Login", "SignUp"];

  return (
    <div className="bg-purple-600 py-4">
      <div className="container mx-auto">
        <div className="flex grow justify-start items-center text-white font-semibold">
          <IoLogoReact className="text-5xl mr-2" />
          <span className="text-3xl">React Sample</span>
        </div>
        <div className="flex flex-1 flex-row grow justify-end">
          {listHeader.map((item) => {
            return (
              <Link to={`/${item}`} key={item}>
                <div className="px-4">
                  <p className="text-white capitalize">{item}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
