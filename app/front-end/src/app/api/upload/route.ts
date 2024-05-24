import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name : process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_secret : process.env.CLOUDINARY_API_SECRET,
  api_key : process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  secure : true
});

type Data = {
    url?: string;
    error?: string;
};

export async function POST(req : Request) {
  if (req == null || req.body == null) return ;

  const   { file }  = await req.json();
  
  try {
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      upload_preset : 'ml_default',
      invalidate: true,
      resource_type: "auto",
      folder: "profile",
      use_filename: true
    })

    return new Response(JSON.stringify({ url : uploadedResponse.secure_url }), {
      status : 201
    })
  }
  catch (error) {
      return new Response(JSON.stringify({}), {})
  }
}