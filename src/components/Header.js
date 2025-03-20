import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/Glenn_Quagmire-removebg-preview.png";
import mylogo from "../assets/moon.png";

export const Header = () => {
  const [hidden, setHidden] = useState(true);
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")) || false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const activeClass = "block text-2xl py-2 px-3 bg-teal-700 rounded md:bg-transparent md:text-teal-600 md:p-0 md:dark:text-teal-600";
  const inactiveClass = "block text-2xl py-2 px-3 text-white rounded hover:bg-teal-600 md:hover:bg-transparent md:hover:text-teal-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  const handleSubmit=(event)=>{
    event.preventDefault();
    const queryTerm=event.target.search.value;
    event.target.reset();
    return navigate(`/search?q=${queryTerm}`)
  }

  return (
    <header>
      <nav className="font-caveat bg-gray-900 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-12 w-11 rounded-lg" alt="Movieflix Logo" />
            <span className="self-center text-5xl text-teal-600 font-semibold whitespace-nowrap dark:text-white">MovieDex</span>
          </Link>
          <div className="flex md:order-2">
            <button onClick={() => setHidden(!hidden)} type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="flex justify-between">
              <button onClick={() => setDark(!dark)} type="button" className="px-1 bg-gray-600 border border-white hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                <img src={mylogo} alt="Light Mode icon" className="w-10 h-6" />
              </button>
              <div className="relative hidden md:block">
                <div className="absolute inset-y--0.1 start--1 flex items-center ps-4 pointer-events-none h-12 w-12">
                  <svg className="w-5 h-10 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <input type="text" id="search-navbar" name="search" className="block w-full h-12 p-2 ps-10 text-m text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                </form>
                </div>
            </div>
            <button onClick={() => setHidden(!hidden)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false" >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between ${hidden ? "hidden" : ""} w-full md:flex md:w-auto md:order-1`} id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <form onSubmit={handleSubmit}>
                <input type="text" id="search-navbar" name="search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
              </form>
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Home</NavLink>
              </li>
              <li>
                <NavLink to="movie/popular" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Popular</NavLink>
              </li>
              <li>
                <NavLink to="movie/top" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Top-Rated</NavLink>
              </li>
              <li>
                <NavLink to="movie/upcoming" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Upcoming</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-t-4 border-gray-200 dark:border-gray-700 w-50" />
      </nav>
    </header>
  );
};
