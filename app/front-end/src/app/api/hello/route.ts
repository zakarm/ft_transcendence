import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name : 'dv1i5yh71',
  api_secret : 'wT60LS0kxMmvofHiCPVpvXYtuMs',
  api_key : '698329492731743',
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

    return new Response(JSON.stringify({ url : uploadedResponse.secure_url }))
  }
  catch (error) {
      console.log("Couldn't upload image : ", error)
  }
}