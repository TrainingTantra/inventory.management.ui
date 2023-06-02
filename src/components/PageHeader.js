import React from "react";
import { Link } from "react-router-dom";

const PageHeader = () => {
  const listHeader = ["Home", "About", "Contact", "Login", "SignUp"];

  return (
    <div className="bg-[#2d2b57] py-4">
      <div className="container mx-auto">
        <div className="flex flex-row justify-end">
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
