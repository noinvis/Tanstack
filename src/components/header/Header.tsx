import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='w-full sticky top-0 z-10 bg-white shadow-lg'>
        <nav className='h-[80px] flex justify-center items-center container'>
          <ul className='flex items-center gap-[30px]'>
            <li>
              <NavLink to={"/"} className={"link text-[24px] font-medium"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/phone"} className={"link text-[24px] font-medium"}>About</NavLink>
            </li>
          </ul>
        </nav>
    </header>
  );
};

export default memo(Header);