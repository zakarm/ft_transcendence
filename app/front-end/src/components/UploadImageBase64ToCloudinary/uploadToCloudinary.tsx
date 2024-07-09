import { toast } from 'react-toastify';
import { notificationStyle } from '@/components/ToastProvider';

const isBase64 = (str: string): boolean => {
  if (typeof str !== 'string') {
    return false;
  }
  try {
    btoa(str);
    return true;
  } catch (error) {
    return false;
  }
};

const handleImageUpload = async (file: string): Promise<string | null> => {
  if (!isBase64(file)) {
    toast.error('Error : image not valid', notificationStyle);
    return null;
  }

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file }),
    });

    const data = await response.json();
    if (data.url === undefined) {
      return null;
    }
    return data.url;
  } catch (error) {
    return null;
  }
};

export default handleImageUpload;
