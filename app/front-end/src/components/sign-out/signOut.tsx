import { NextRouter } from 'next/router';
import Cookies from 'js-cookie';


function    signOut(router : NextRouter) {
    const access = Cookies.get("access");
    const refresh = Cookies.get("refresh");

    if (refresh) {
        try {
            const   postSignOut = async () => {
                const   promise = await fetch('http://localhost:8000/api/sign-out', {
                    method : "POST",
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify({refresh : refresh})
                });
    
                const   data = await promise.json();
    
                if (!data.ok) {
                    console.log(promise);
                }
                if (data.ok) {
                    Cookies.remove("access");
                    Cookies.remove("refresh");
                    // console.log(access, refresh);
                    router.push('/sign-in');
                }
            }
            postSignOut();
        } catch (error) {
            console.log("Error : ", error);
        }
    }
}

export  {signOut};