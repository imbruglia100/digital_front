import { useState, useEffect, useRef } from 'react';
import './DropDownMenu.css'

function DropdownMenu({ items, icon }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const ulClassName = "dropdown-items" + (showMenu ? "" : " hidden");

  return (
    <div className='dropdown-container'>
      <a className='dropdown-icon' onClick={toggleMenu}>
        { icon }
      </a>
      <ul className={ulClassName} ref={ulRef}> {/* <-- Attach it here */}
        {items && items.map((item, i)=> <li key={i} className='dropdown-item'>{item}</li>)}
      </ul>
    </div>
  );
}

export default DropdownMenu;
