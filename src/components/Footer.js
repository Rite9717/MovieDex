import logo from "../assets/Glenn_Quagmire-removebg-preview.png"
import insta from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import github from "../assets/github-sign.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className=" font-caveat bg-gray-900 rounded-0 shadow dark:bg-gray-900 ">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                  <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                      <img src={logo} className="h-10 rounded-xl" alt="MovieFlix" />
                      <span className="self-center text-5xl text-teal-600 font-semibold whitespace-nowrap text- dark:text-white">MovieFlix</span>
                  </Link>
                  <ul className="flex flex-start items-center bg-gray-900 mb-6 text-1xl font-large text-white sm:mb-0 dark:text-gray-400">
                      <li className="flex flex-start">
                          <img src={ twitter } alt="twitter" className="h-6 w-6" />
                          <a href="https://x.com/Riteshkuma97619?t=lkWfEAKMHehkM9LqFu1_kw&s=09" target="_blank" rel="noreferrer" className="hover:underline me-4 md:me-6 ml-2 text-3xl">Twitter</a>
                      </li>
                      <li className="flex flex-start">
                          <img src={ insta } alt="instagram" className="h-6 w-6" />
                          <a href="https://www.instagram.com/rite_261?igsh=bzdubzNhbW1rcGM2" target="_blank" rel="noreferrer" className="hover:underline me-4 md:me-6 ml-2 text-3xl">Instagram</a>
                      </li>
                      <li className="flex flex-start">
                          <img src={ github } alt="github" className="h-7 w-7" />
                          <a href="https://github.com/Rite9717/Ritesh.git" target="_blank" rel="noreferrer" className="hover:underline ml-2 text-3xl">GitHub</a>
                      </li>
                  </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <span className="block text-3xl text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">MovieFlix™</a>. All Rights Reserved.</span>
          </div>
      </footer>
  )
}