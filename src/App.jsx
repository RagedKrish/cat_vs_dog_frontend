import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setResult(null);  // Reset result on new file selection
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://cat-vs-dog-backend.onrender.com', formData);
            setResult(response.data);
        } catch (error) {
            setError('Error predicting the image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Cat vs Dog Classifier</h1>
            <p className="mb-4 text-center">
                This model is specifically trained to classify cats and dogs. 
                Any other image will also be classified as either cat or dog.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="mb-4 bg-gray-800 text-white p-2 rounded border border-aqua focus:outline-none"
                />
                {selectedFile && (
                    <div className="mb-4">
                        <img 
                            src={URL.createObjectURL(selectedFile)} 
                            alt="Preview" 
                            className="w-64 h-64 object-cover rounded"
                        />
                    </div>
                )}
                <button 
                    type="submit" 
                    className="bg-aqua hover:bg-aqua-light text-white font-bold py-2 px-4 rounded transition duration-300">
                    Classify
                </button>
            </form>
            {loading && <p className="mt-4">Loading...</p>}
            {result && (
                <div className="mt-4 text-center">
                    <p className="text-xl">{`Result: ${result.result}`}</p>
                    <p className="text-lg">{`Confidence: ${result.confidence}%`}</p>
                </div>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default App;

