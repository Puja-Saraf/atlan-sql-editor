import React, { useEffect, useState } from "react";

export default function Sidebar({ Queries, query, setQuery, setShowTable }) {
  const [open, setOpen] = useState(true);

  const handleResize = () => {
    setOpen(window.innerWidth > 970);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        open ? " md:w-68" : "w-12 md:w-16"
      } h-[screen] p-3 md:p-5 pt-0 relative duration-300 shadow-xl bg-[#9BBEC8] bg-opacity-50`}
    >
      <div className="pt-8">
        <i
          className={`fa-solid fa-bars absolute cursor-pointer text-2xl font-bold -right-10 text-[#164863]`}
          onClick={() => setOpen(!open)}
        ></i>
        <div className="flex gap-x-4 items-center">
          <h1 className={`font-medium text-[#164863] text-lg md:text-2xl ${!open && "hidden"}`}>
            Available Queries
          </h1>
        </div>
      </div>
      <ul className="pt-6">
        {Queries.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-[#427D9D] hover:bg-opacity-40 text-sm md:text-lg items-center gap-x-4 
              mt-2 ${
                Menu.title === query.title && "bg-[#427D9D] text-white hover:bg-opacity-90" 
              } `}
            onClick={() =>{
              setQuery(Menu);
              setShowTable(false);
            }}
          >
            <span>{Menu.title}</span>
            <span className={`${!open && "hidden"}`}>
              <i className="fa-solid fa-circle-arrow-right"></i>
            </span>
            <span className={`${!open && "hidden"}`}>{Menu.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
