import React from 'react';
// import { FaSearch } from "react-icons/fa";

const QuestionSearch = ({ setSearchTerm }) => {
  return (
    <div>
      <div className=' flex'>
        <div className='bg-white flex items-center rounded-full shadow-md max-w-sm mx-auto w-full'>
          <input
            className='rounded-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none '
            id='search'
            type='text'
            placeholder='Search'
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />

          {/* <div className="p-2">
            <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
              <FaSearch />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default QuestionSearch;
