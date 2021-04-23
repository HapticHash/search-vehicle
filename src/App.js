import "./App.css";
import { Row, Col, Typography } from "antd";
import SearchBar from "./components/SearchBar/SearchBar";
import Results from "./components/Results/Results";

const { Title } = Typography;
function App() {
  return (
    <div className="App">
      <Row className="App__header">
        <Col span={24}>
          <Title className="App__header__title">Search your car</Title>
        </Col>
      </Row>
      <Row className="App__results">
        <Col span={24}>
          <Results />
        </Col>
      </Row>
    </div>
  );
}

export default App;
