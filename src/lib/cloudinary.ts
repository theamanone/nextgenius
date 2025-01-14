export async function uploadToCloudinary(file: File) {
  try {
    const preparedFile = await prepareFileForUpload(file);
    const formData = new FormData();
    formData.append('file', preparedFile.base64);
    formData.append('upload_preset', 'webgeniuscraft'); // Replace with your upload preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

export const prepareFileForUpload = async (file: File): Promise<{ base64: string; type: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve({
          base64: reader.result,
          type: file.type
        });
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
