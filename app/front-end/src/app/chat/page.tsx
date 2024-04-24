"use client";
import styles from './style.module.css';
import ChatAbout from '../../components/chat_about';
import ChatFriends from '../../components/chat_friends';
import ChatMessages from '../../components/chat_messages';

export default function ()
{
    return (
        <>
            <div className="row vh-100 p-0 m-0 ">
              <div className="col-xl-4 col-md-6 col-sm-12">
                <ChatFriends />
              </div>
              <div className={`col-xl-5 col-md-6 p-0 m-0`}>
                <ChatMessages />
              </div>
              <div className={`${styles.about_container} ${styles.chat} col-xl-3 p-0 m-0`}>
                <ChatAbout />
              </div>
            </div>

        </>
    );
}