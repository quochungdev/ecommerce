import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function CustomSideNav({ nav }) {
  const location = useLocation();

  return (
    <div class="group inline-block z-50 px-3">
      <Link
        to={nav.link}
        className="decoration-transparent text-black justify-center flex items-center w-full h-full"
      >
        <button
          class={`outline-none focus:outline-none rounded-sm flex items-center min-w-32  ${
            location.pathname === nav.link ? "bg-blue-300" : ""
          }
        `}
        >
          <span class="pr-1 font-semibold text-xs ">{nav.navName}</span>
        </button>
      </Link>
      <ul
        class="z-30 px-0 bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
         transition duration-150 ease-in-out origin-top min-w-32"
      >
      </ul>
    </div>
  );
}

function LiNull({ nav }) {
  return (
    <li onClick={nav.action} class="rounded-sm px-3 py-1 hover:bg-gray-100">
      <Link className="decoration-transparent text-black" to={nav.link}>
        {nav.navParentName}
      </Link>
    </li>
  );
}

function LiNotNull({ nav }) {
  return (
    <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
      <button class="w-full text-left flex items-center outline-none focus:outline-none">
        <span class="pr-1 flex-1">{nav.navParentName}</span>
        <span class="mr-auto">
          <svg
            class="fill-current h-4 w-4
                                                    transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </button>
      <ul
        class="bg-white px-0 border rounded-sm absolute top-0 right-0 
                                        transition duration-150 ease-in-out origin-top-left
                                        min-w-32
                                        "
      >
        {nav.children.map((nav) => (
          <li class="px-3 py-1 hover:bg-gray-100">{nav.navChildName}</li>
        ))}
      </ul>
    </li>
  );
}
