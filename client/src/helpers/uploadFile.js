const uploadFile = async (file) => {
    // Ensure that the environment variable is available
  
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;


;
    // If Cloudinary Cloud Name is not set in environment variables, throw an error
    if (!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) {
        throw new Error("Cloudinary cloud name is not defined. Please check your environment variables.");
    }

    try {
        // Prepare the form data for the upload request
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'chat-app-file'); // Ensure this preset exists in your Cloudinary account

        // Make the fetch request to Cloudinary API
        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData,
            headers: {
                
                // "Authorization": `Bearer ${yourToken}`, // Uncomment if authentication is required
            }
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorMessage = await response.text(); // Get the error message from the response body
            throw new Error(`Upload failed: ${response.status} - ${errorMessage}`);
        }

        // Parse the JSON response
        const responseData = await response.json();
        return responseData; // This should return the uploaded file's URL

    } catch (error) {
        console.error("Error uploading file:", error);
        // Optionally handle error in a specific way, or rethrow it for upstream handling
        throw error;
    }
};

export default uploadFile;
