import "./App.css";
import { Row, Col, Typography } from "antd";
import Results from "./components/Results/Results";

function App() {
  return (
    <div className="App">
      <Row className="App__results">
        <Col span={24}>
          <Results />
        </Col>
      </Row>
    </div>
  );
}

export default App;
