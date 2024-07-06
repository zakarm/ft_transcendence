'use client';

import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Si42 } from 'react-icons/si';
import { toast } from 'react-toastify';

interface Props {
    className?: string;
    platform?: string;
}

export default function SocialAuth({ className, platform }: Props) {
    const handleAuthRedirect = async () => {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/social/${platform}/redirect`;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (
        <button className={className} onClick={handleAuthRedirect} type="button">
            {platform === 'google' && <FaGoogle />}
            {platform === 'github' && <FaGithub />}
            {platform === '42' && <Si42 />}
        </button>
    );
}
