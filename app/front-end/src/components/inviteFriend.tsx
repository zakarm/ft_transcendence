"use client";

import styles from './styles/inviteFriend.module.css';
import React, { useState } from 'react';
import { InputGroup, Modal, Form, Button } from 'react-bootstrap';
import friends from './friends.json';
import Splayer from "./Splayer";

import { TiUserAdd } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";

interface Props{
    show: boolean;
    close: () => void;
}

export default function InviteFriend( {show, close}: Props) {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchedFriends, setSearchedFriends] = useState<{nickname: string, image_url: string, connected: boolean}[]>([]);
    const handle_search = () => {
        if (searchTerm === '')
            setSearchedFriends([]);
        else
        {
            const foundFriends = friends.filter(friend => friend.nickname.toLowerCase().startsWith(searchTerm.toLowerCase()));
            setSearchedFriends(foundFriends);
        }
    }

    return (
        <>
            <Modal contentClassName={`${styles.friend_modal}`} show={show} aria-labelledby="add_friend" centered>
                <Modal.Header className='d-flex flex-column'>
                  <Modal.Title>
                    <span style={{color:'#FFEBEB', fontFamily: 'itim'}}><ImUserPlus color="#FFEBEB"/> Add Friend</span>
                  </Modal.Title>
                  <InputGroup className="mb-3" >
                    <InputGroup.Text id="basic-addon1" style={{backgroundColor: '#2C3143'}}><IoIosSearch color='#FFEBEB'/></InputGroup.Text>
                    <Form.Control
                        className={`${styles.form_control}`}
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{backgroundColor: '#2C3143'}}
                        value={searchTerm}
                        onChange={(e) => {setSearchTerm(e.target.value)}}
                    />
                    <Button className='border' variant="dark" id="button-addon2" onClick={handle_search}>
                      Search..
                    </Button>
                  </InputGroup>
                </Modal.Header>
                <Modal.Body style={{height: '200px', overflow: 'auto'}}>
                    {
                        searchedFriends.map((user, index) => 
                            (
                                <div key={index} className='row d-flex flex-row d-flex align-items-center justify-content-between px-3 py-1 m-2' style={{ borderRadius: '25px', backgroundColor: '#161625' }}>
                                    <div className='col-3 text-start'><Splayer nickname={user.nickname} id={1} image={user.image_url} isConnected={user.connected} /></div>
                                    <div className='col-9 text-end'><Button variant="dark">Invite <TiUserAdd color="#FFEBEB" /></Button></div>
                                </div>
                            )
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                        <div className={`${styles.edit_btn} col-md-3 col-sm-5 valo-font text-center m-2 px-2`} onClick={close}><button onClick={close}>Close</button></div>
                </Modal.Footer>
            </Modal>
        </>
    );
}