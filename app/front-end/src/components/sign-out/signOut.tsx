import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { notificationStyle } from '../ToastProvider';

type RouterType = ReturnType<typeof useRouter>;

function signOut(router: RouterType) {
    const refresh = Cookies.get('refresh');
    const deleteTokensAndRedirect: () => void = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        router.push('/sign-in');
    };

    if (refresh) {
        try {
            const postSignOut = async () => {
                const csrftoken = Cookies.get('csrftoken') || '';
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/sign-out`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({ refresh: refresh }),
                });

                if (!response.ok) {
                    deleteTokensAndRedirect();
                    toast.warn('Bad Request: invalid token', notificationStyle);
                    toast.error('Try to sign-in again', notificationStyle);
                    return;
                }

                if (response.ok) {
                    deleteTokensAndRedirect();
                    toast.success(`Successfully logged out`);
                    return;
                }
            };

            postSignOut();
        } catch (error) {
            toast.warn(`Unexpected error ${error}`, notificationStyle);
            deleteTokensAndRedirect();
            toast.error('Try to sign-in again', notificationStyle);
        }
    } else {
        toast.warn('Token : no refresh token found', notificationStyle);
        deleteTokensAndRedirect();
        toast.error('Try to sign-in again', notificationStyle);
    }
}

export { signOut };
