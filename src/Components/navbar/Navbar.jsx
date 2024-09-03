import React, { useState } from 'react';
import './Navbar.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div
            className="item"
            onMouseEnter={() => setLanguageMenuOpen(true)}
            onMouseLeave={() => setLanguageMenuOpen(false)}
          >
            <LanguageOutlinedIcon className="icon" />
            {languageMenuOpen && (
              <div className="languageMenu">
                <div onClick={() => changeLanguage('en')}>English</div>
                <div onClick={() => changeLanguage('es')}>Español</div>
                <div onClick={() => changeLanguage('fr')}>Français</div>
                <div onClick={() => changeLanguage('nl')}>Nederlands</div>
                <div onClick={() => changeLanguage('it')}>Italiano</div>
              </div>
            )}
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: 'TOGGLE' })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img src="/haseeb.jpg" alt="profile" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;








// import React, { useState } from 'react';
// import "./Navbar.css";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

// const Navbar = () => {
//   const { dispatch } = useContext(DarkModeContext);
//   const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

//   return (
//     <div className="navbar">
//       <div className="wrapper">
//         <div className="search">
//           <input type="text" placeholder="Search..." />
//           <SearchOutlinedIcon />
//         </div>
//         <div className="items">
//           <div
//             className="item"
//             onMouseEnter={() => setLanguageMenuOpen(true)}
//             onMouseLeave={() => setLanguageMenuOpen(false)}
//           >
//             <LanguageOutlinedIcon className="icon" />
//             {languageMenuOpen && (
//               <div className="languageMenu">
//                 <div onClick={() => setLanguageMenuOpen(false)}>English</div>
//                 <div onClick={() => setLanguageMenuOpen(false)}>Español</div>
//                 <div onClick={() => setLanguageMenuOpen(false)}>Français</div>
//                 <div onClick={() => setLanguageMenuOpen(false)}>Nederlands</div>
//                 <div onClick={() => setLanguageMenuOpen(false)}>Italiano</div>
//               </div>
//             )}
//           </div>
//           <div className="item">
//             <DarkModeOutlinedIcon
//               className="icon"
//               onClick={() => dispatch({ type: "TOGGLE" })}
//             />
//           </div>
//           <div className="item">
//             <FullscreenExitOutlinedIcon className="icon" />
//           </div>
//           <div className="item">
//             <NotificationsNoneOutlinedIcon className="icon" />
//             <div className="counter">1</div>
//           </div>
//           <div className="item">
//             <ChatBubbleOutlineOutlinedIcon className="icon" />
//             <div className="counter">2</div>
//           </div>
//           <div className="item">
//             <ListOutlinedIcon className="icon" />
//           </div>
//           <div className="item">
//             <img
//               src="/haseeb.jpg"
//               alt="profile"
//               className="avatar"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
