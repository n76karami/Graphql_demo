import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';

const Navbar = () => {

  const [nav, SetNav] = useState(false);


  return (
    <>
      <div className="fixed z-50 w-full flex justify-center items-center h-[70px] px-4
        bg-[#24292f] text-white ">
        <div className='absolute left-[50px] top-[10px] w-[60px] h-[50px] rounded-[50%] overflow-hidden flex items-center'>
          <Link to='/'><img src='/graph.png' /></Link>
        </div>
        <div className="text-center w-[600px] ml-20 flex justify-end">
          <ul className="hidden md:flex">
            <li><Link to='authors' className='hover:text-gray-400'>Authors</Link></li>
            <li><Link to='books' className='hover:text-gray-400'>Books</Link></li>
            <li><Link to='author/create' className='hover:text-gray-400'>Create Author</Link></li>
            <li><Link to='book/create' className='hover:text-gray-400'>Create Book</Link></li>
          </ul>
        </div>
        <div onClick={() => {
          SetNav(!nav);
          }} className='md:hidden z-10 cursor-pointer'>

          {nav ? <AiOutlineClose  size={30} /> : <HiOutlineMenuAlt4 size={30} />}
        
        </div>
        <div className={nav ?
          'absolute text-white left-0 top-0  w-full h-screen opacity-[0.9] bg-[#24292f] px-4 py-7 flex flex-col md:hidden ease-in-out duration-500' :
          'absolute left-[-100%]'}>
          <ul className='mt-5'>
            {/* <h1 className='mt-[-8px] text-[#5651e5]'>Graph demo</h1> */}
            <li className='border-b border-gray-500 '>
              <Link to='/' className=" flex items-center gap-2">
                  {/* <ImHome /> */}
                <span>Home</span>
              </Link>
            </li>
            <li className='border-b border-gray-500'>
              <Link to='authors' className=" flex items-center gap-2">
                  {/* <ImBlog /> */}
                <span>Authors</span>
              </Link>
            </li>
            <li className='border-b border-gray-500'>
              <Link to='books' className=" flex items-center gap-1">
                <sapn>Books</sapn>
              </Link>
            </li>
            <li className='border-b border-gray-500'>
              <Link to='author/create' className=" flex items-center gap-1"> 
                <sapn>Create Author</sapn>
              </Link>
            </li>
            <li className='border-b border-gray-500'>
              <Link to='book/create' className=" flex items-center gap-1"> 
                <sapn>Create Book</sapn>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar;