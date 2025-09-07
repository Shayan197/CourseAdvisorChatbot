import axios from "axios";

const getVoiceResponse = async (formData) => {
    try {
        const res = await axios.post(`http://localhost:5000/voiceResponse`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (err) {
        throw new Error(err.message || 'Something went wrong while processing voice');
    }
};

export default getVoiceResponse;
