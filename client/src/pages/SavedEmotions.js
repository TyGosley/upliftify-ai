import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_EMOTION_HISTORY,
} from "../utils/queries";
import { DELETE_EMOTION_HISTORY, SAVE_EMOTION, SAVE_FEELING } from "../utils/mutations"; // Import the mutation for saving an emotion
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const SavedEmotions = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const { data: emotionHistoryData } = useQuery(QUERY_EMOTION_HISTORY);
  const [deleteEmotionHistory] = useMutation(DELETE_EMOTION_HISTORY);
  const [saveFeeling] = useMutation(SAVE_FEELING); // Initialize the saveEmotion mutation

  const userData = data?.me || {};
  const emotionHistory = emotionHistoryData?.emotionHistory || [];

  const handleDeleteEmotionHistory = async () => {
    try {
      await deleteEmotionHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEmotion = async (emotionId) => {
    try {
      await saveFeeling({
        variables: { emotionId }, // Pass the emotionId as a variable to the mutation
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true">
        <Container>
          <h1>Here are your saved emotions!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {emotionHistory.length
            ? `Viewing ${emotionHistory.length} saved ${
                emotionHistory.length === 1 ? "emotion" : "emotions"
              }:`
            : "You have no saved emotions!"}
        </h2>
        <Row>
          {emotionHistory.map((emotion) => {
            return (
              <Col md="4" key={emotion._id}>
                <Card border="dark">
                  <Card.Body>
                    <Card.Title>{emotion.emotion}</Card.Title>
                    <Card.Text>{emotion.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteEmotionHistory(emotion._id)}
                    >
                      Delete this Emotion!
                    </Button>
                    <Button
                      className="btn-block btn-success"
                      onClick={() => handleSaveEmotion(emotion._id)}
                    >
                      Save this Emotion
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedEmotions;
