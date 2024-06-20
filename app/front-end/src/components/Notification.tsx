import Toast from 'react-bootstrap/Toast';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { FaCheck, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { normalize } from 'path';
import { Color } from 'three';

interface Notif {
    notification_id: number;
    image_url: string;
    message: string;
    title: string;
    link: string;
    count: number;
    is_chat_notif: boolean;
    is_friend_notif: boolean;
    is_tourn_notif: boolean;
    is_match_notif: boolean;
    action_by: string;
}

interface User {
    id: number;
    username: string;
    image_url: string;
}

interface Friend_ {
    user: User;
    is_accepted: boolean;
    is_user_from: boolean;
    blocked: boolean;
}

interface Props {
    notification: Notif;
}

function Notification({ notification }: Props) {
    const router = useRouter();
    const [user, setUser] = useState<Friend_ | undefined>(undefined);
    function goToLink() {
        router.push(notification.link);
    }

    const deleteNotification = async (notification_id: number) => {
        const access = Cookies.get('access');
        if (access)
        {
            const notif = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notification-delete/${notification_id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${access}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            const notif_data = await notif.json();
            if (notif.ok) {
                toast.success('Notification deleted');
            } else {
                const errors = notif_data;
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        errors[key].forEach((errorMessage: string) => {
                            toast.error(`${key}: ${errorMessage}`);
                        });
                    }
                }
            }

        } else {
            toast.error('error: Unauthorized. Invalid credentials provided.');
        }
        
    }

    const fetchUserState = async (api: string, message: string, username: string, notification_id: number) => {
        const access = Cookies.get('access');
        if (access) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/${api}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access}`,
                    },

                    body: JSON.stringify({ username: username }),
                });

                const data = await res.json();
                deleteNotification(notification_id);
                if (!res.ok) {
                    if (res.status === 400) {
                        return toast.error('Action not allowed : ' + data.error);
                    } else throw new Error('Failed to fetch data');
                }

                if (data) {
                    if (api === 'friends-remove' || api === 'friends-add') {
                        if (api === 'friends-remove' && user) setUser(undefined);
                        else {
                            setUser({
                                user: {
                                    id: 0,
                                    username: '',
                                    image_url: '',
                                },
                                is_user_from: true,
                                is_accepted: false,
                                blocked: false,
                            });
                        }
                    } else if (api === 'friends-accept' && user) {
                        setUser({
                            user: {
                                id: user.user.id,
                                username: user.user.username,
                                image_url: user.user.image_url,
                            },
                            is_user_from: false,
                            is_accepted: true,
                            blocked: false,
                        });
                    }
                    toast.success(message);
                }
            } catch (error) {
                toast.error('No response received from server.');
            }
        } else {
            toast.error('error: Unauthorized. Invalid credentials provided.');
        }
    };

    return (
        <Toast className="border" onClose={() => deleteNotification(notification.notification_id)} >
            <Toast.Header style={{ background: '#161625', color: 'white', borderBottom: '1px solid white' }}>
                <Image
                    src={notification.image_url}
                    width={30}
                    height={30}
                    className="rounded me-2"
                    alt=""
                    style={{ height: '30px', width: '30px' }}
                    onClick={goToLink}
                />
                <strong className="me-auto link-secondary" onClick={goToLink}>
                    {notification.title}
                </strong>
            </Toast.Header>
            <Toast.Body
                className="d-flex justify-content-between align-items-center"
                style={{ background: '#161625', borderRadius: '0 0 5px 5px' }}>
                <marquee className="text-white me-2">{notification.message}</marquee>
                {notification.is_friend_notif == true && (
                    <>
                        <Button
                            variant="success"
                            className="me-2"
                            onClick={() =>
                                fetchUserState(
                                    'friends-accept',
                                    'Added to friends',
                                    notification.action_by,
                                    notification.notification_id,
                                )
                            }>
                            <FaCheck />
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() =>
                                fetchUserState(
                                    'friends-remove',
                                    'Removed from friends',
                                    notification.action_by,
                                    notification.notification_id,
                                )
                            }>
                            <FaTimes />
                        </Button>
                    </>
                )}
            </Toast.Body>
        </Toast>
    );
}

export default Notification;
