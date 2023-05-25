import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import EmotionDropdown from '../components/EmotionDropdown';
import HelpfulLinks from './HelpfulLinks';

const Home = () => {
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [response, setResponse] = useState('');

  const handleFeelingSelect = async (feeling) => {
    setSelectedFeeling(feeling);

    try {
      // Send the selected feeling to the server for a pre-defined response
      const response = await axios.post('/api/generate-response', {
        userInput: feeling,
      });

      setResponse(response.data.response);
    } catch (error) {
      console.error('Error generating response:', error);
      // Handle the error condition
    }
  };

  return (
    <>
      <div fluid="true">
        <EmotionDropdown handleFeelingSelect={handleFeelingSelect} />
      </div>
      {/* <div fluid="true">
        <HelpfulLinks />
      </div> */}
    </>
  );
};

export default Home;
