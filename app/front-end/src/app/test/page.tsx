"use client";

import Image from 'next/image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {    CategoryScale, 
            LinearScale, 
            Title, 
            Legend, 
            Tooltip, 
            LineController, 
            PointElement, 
            LineElement 
        } from 'chart.js';
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { FaUserEdit } from "react-icons/fa";
import { SlUser } from "react-icons/sl";
import { GrFlag } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { GiPodiumWinner, GiLaurelsTrophy } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import { SiRepublicofgamers } from "react-icons/si";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";
import { MdRoundaboutRight } from "react-icons/md";

export default function ()
{
    const [modalShow, setModalShow] = useState<boolean>(false);

    const [country, setCountry] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    const selectCountry = (val: string) => {
        setCountry(val);
        setRegion('');
      }
    
    const selectRegion = (val: string) => {
      setRegion(val);
    }

    const [validated, setValidated] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);
    };

    return (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal show={true} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" scrollable animation>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title id="contained-modal-title-vcenter">
                  <span style={{color: '#FFEBEB', fontFamily: 'itim'}}><FaUserEdit color='#7aa6d6'/> Edit Profile</span>
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <InputGroup hasValidation>
                    <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    defaultValue="Mark"
                    />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>
                <InputGroup hasValidation>
                    <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    defaultValue="Otto"
                    />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text >@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                    />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              {/* <Button type="submit">Submit form</Button> */}
            <Modal.Footer className='row pb-1 m-0'>
              <div className={`col-md-3 col-sm-5 valo-font text-center`} ><button type="submit" >Save</button></div>
            </Modal.Footer>
            </Modal.Body>
            </Modal>
            </Form>
  );
}