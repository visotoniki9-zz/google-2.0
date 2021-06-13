import { XIcon, MicrophoneIcon, SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import Avatar from './Avatar';

function Header() {
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = (e) => {
    e.preventDefault();

    const term = searchInputRef.current.value;

    if (!term) return;

    router.push(`/search=${term}`);
  };
  return (
    <header
      className="sticky bg-white"
    >
      <div className="flex w-full p-6 items-center">
        <Image
          className="cursor-pointer"
          src="/google.svg"
          width={120}
          height={40}
          onClick={() => { router.push('/'); }}
        />
        <form
          className="flex flex-grow  px-6 py-3 ml-10 mr-5 border border-gray-200 rounded-full shadow-lg max-w-3xl items-center "
        >
          <input
            className="flex-grow w-full focus:outline-none"
            type="text"
            ref={searchInputRef}
          />
          <XIcon
            className="h-7 sm:mr-3 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-125"
            onClick={() => (searchInputRef.current.value = '')}
          />
          <div
            className="h-6 hidden sm:inline-flex border-l-2 border-gray-300 "
          />
          <MicrophoneIcon
            className=" ml-3 mr-3 h-6 hidden sm:inline-flex text-blue-500 p-l-4 cursor-pointer transition duration-100 transform hover:scale-125"
          />
          <SearchIcon
            className=" mr-3 h-6 hidden sm:inline-flex text-blue-500 p-l-4 cursor-pointer transition duration-100 transform hover:scale-125"
          />
          <button
            hidden
            type="submit"
            onClick={search}
          >
            Search
          </button>
        </form>
        <Avatar
          className="ml-auto"
          url="/user.jpeg"
        />
      </div>
    </header>
  );
}

export default Header;
