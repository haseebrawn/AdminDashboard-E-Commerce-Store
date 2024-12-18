import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
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

const socket = io(process.env.REACT_APP_PORT); // Update with your backend URL

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // Stores notifications
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Manages dropdown visibility
  const { i18n } = useTranslation();

  useEffect(() => {
    socket.on('newOrder', (data) => {
      setNotifications((prev) => {
        console.log('Previous notifications:', prev);
        console.log('New notification:', data);
        return [...prev, data];
      });
    });
  
    return () => {
      socket.off('newOrder');
    };
  }, []);
  
  useEffect(() => {
    console.log('Socket connected:', socket.connected);
  }, []);
  

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

          {/* Notifications */}
          <div
            className="item"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <NotificationsNoneOutlinedIcon className="icon" />
            {notifications.length > 0 && <div className="counter">{notifications.length}</div>}
          </div>
          {isNotificationOpen && (
            <div className="notificationsDropdown">
              {notifications.map((notification, index) => (
                <div className="notificationItem" key={index}>
                  Order ID: {notification.orderId} <br />
                  Subject: <strong>{notification.subject}</strong>  <br />
                  User Email: {notification.username}
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="notificationItem">No notifications</div>
              )}
            </div>
          )}

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
