import { cloudinaryConfig } from './config';

type UploadType = 'poster' | 'backdrop' | 'trailer';

const UPLOAD_PRESETS = {
  poster: 'moveek-poster',
  backdrop: 'moveek-backdrop',
  trailer: 'moveek-trailer'
};

const MEDIA_TYPES = {
  poster: 'image',
  backdrop: 'image',
  trailer: 'video'
};

export async function uploadToCloudinary(file: File, type: UploadType): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESETS[type]);
  
  // Debug logging
//   console.log('Upload Type:', type);
//   console.log('File details:', {
//     name: file.name,
//     type: file.type,
//     size: file.size  
//   });
//   console.log('Upload Preset:', UPLOAD_PRESETS[type]);
  
  console.log('FormData contents:');
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/${MEDIA_TYPES[type]}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload error:', errorData);
      throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
} 