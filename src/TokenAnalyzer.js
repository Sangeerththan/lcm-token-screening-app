import React, { useState } from 'react';
import axios from 'axios';

const TokenAnalyzer = () => {
    const [keywords, setKeywords] = useState('');
    const [results, setResults] = useState([]);

    const analyzeToken = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/analyze_token', { keywords });

            // Check if the "results" property exists in the response
            if (response.data.results && Array.isArray(response.data.results)) {
                setResults(response.data.results);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Error analyzing token:', error);
        }
    };

    return (
        <div>
            <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords (separated by commas)"
            />
            <button onClick={analyzeToken}>Analyze News</button>

            <div>
                {results.map((result, index) => (
                    <div key={index}>
                        <h2>{result.title}</h2>
                        <p><strong>Source:</strong> {result.source}</p>
                        <p><strong>Date:</strong> {result.date}</p>
                        <p><strong>Summary:</strong> {result.summary}</p>
                        <p><strong>Sentiment:</strong> {result.sentiment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TokenAnalyzer;
