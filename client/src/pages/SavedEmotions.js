import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_EMOTION_HISTORY,
} from "../utils/queries";
import { DELETE_EMOTION_HISTORY } from "../utils/mutations";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const SavedEmotions = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const { data: emotionHistoryData } = useQuery(QUERY_EMOTION_HISTORY);
  const [deleteEmotionHistory] = useMutation(DELETE_EMOTION_HISTORY);

  const userData = data?.me || {};
  const emotionHistory = emotionHistoryData?.emotionHistory || [];

  const handleDeleteEmotionHistory = async () => {
    try {
      await deleteEmotionHistory();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved emotions!</h1>
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
              <Col md="4">
                <Card key={emotion._id} border="dark">
                  <Card.Body>
                    <Card.Title>{emotion.emotion}</Card.Title>
                    <Card.Text>{emotion.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={handleDeleteEmotionHistory}
                    >
                      Delete this Emotion!
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
