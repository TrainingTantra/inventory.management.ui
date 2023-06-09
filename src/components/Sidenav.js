import React, { useEffect, useState } from "react";
import { BsArrowLeftShort, BsChevronDown, BsFillImageFill, BsPerson, BsReverseLayoutTextSidebarReverse, BsSearch } from "react-icons/bs";
import { AiFillEnvironment, AiOutlineBarChart, AiOutlineFileText, AiOutlineLogout, AiOutlineSetting, AiOutlineMail } from "react-icons/ai";
import {FaUsers} from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import useCheckIsMobileView from '../utils/checkisMobile';

const Sidenav = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const { isMobileView } = useCheckIsMobileView();
  const Menus = [
    { title: "Dashboard" },
    { title: "User", icon: <FaUsers /> },
    { title: "Pages", icon: <AiOutlineFileText /> },
    { title: "Media", spacing: true, icon: <BsFillImageFill /> },
    {
      title: "Projects",
      icon: <BsReverseLayoutTextSidebarReverse />,
      submenu: true,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" },
      ],
    },
    { title: "Analytics", icon: <AiOutlineBarChart /> },
    { title: "Inbox", icon: <AiOutlineMail /> },
    { title: "Profile", spacing: true, icon: <BsPerson /> },
    { title: "Setting", icon: <AiOutlineSetting /> },
    { title: "Logout", icon: <AiOutlineLogout /> },
  ];
  useEffect(()=>{
    setOpen(!isMobileView);
  },[isMobileView])

  return (
    <div className="flex">
      <div
        className={`bg-dark-purple p-5 pt-8 ${open ? "w-72" : "w-20"
          } duration-300 relative`}
      >
        <BsArrowLeftShort
          onClick={() => {
            setOpen(!open);
          }}
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"
            }`}
        />

        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"
              }`}
          >
            Inventory
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${!open ? "px-2.5" : "px-4"
            } py-2`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"
              }`}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"
              }`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <div key={`menuitem_${menu?.title}_${index}`}>
              <Link to={`/admin/${menu.title}`}>
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"
                    }`}
                >
                  <span className="text-2xl block float-left">
                    {menu.icon ? menu.icon : <MdDashboard />}
                  </span>
                  <span
                    className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"
                      }`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && (
                    <BsChevronDown
                      className={`${subMenuOpen && "rotate-180"}`}
                      onClick={() =>
                        setSubMenuOpen(!subMenuOpen)
                      }
                    />
                  )}
                </li>
              </Link>
              {menu.submenu && subMenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <li
                      key={`sumenu__item_${menu?.title}_${index}`}
                      className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidenav