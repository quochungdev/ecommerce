import React from "react";
import { Link } from "react-router-dom";

export default function CustomNavUser({ nav }) {
  return (
    <div class="group inline-block z-30 px-3">
      <Link
        to={nav.link}
        className="decoration-transparent text-black justify-center flex items-center w-full h-full"
      >
        <button class="outline-none focus:outline-none  bg-white rounded-sm flex items-center min-w-32">
          <span class="pr-1 font-semibold flex-1">{nav.navName}</span>
          {nav.parent ? (
            <span>
              <svg
                class="fill-current h-4 w-4 transform group-hover:-rotate-180
                                                    transition duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
          ) : null}
        </button>
      </Link>
      <ul style={{ top: '85px' }}
        class="z-30 px-0 bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                                        transition duration-150 ease-in-out origin-top min-w-32"
      >
        {nav.parent
          ? nav.parent.map((nav) =>
              nav.children ? <LiNotNull nav={nav} /> : <LiNull nav={nav} />
            )
          : null}
      </ul>
    </div>
  );
}

function LiNull({ nav }) {
  return (
    <li onClick={nav.action} class="rounded-sm px-3 py-1 hover:bg-gray-100 ">
      <Link className="decoration-transparent text-black" to={nav.link}>{nav.navParentName}</Link>
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
