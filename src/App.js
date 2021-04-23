import "./App.css";
import { Row, Col, Typography } from "antd";
import Results from "./components/Results/Results";

const { Title } = Typography;
function App() {
  return (
    <div className="App">
      <Row className="App__header">
        <Col span={24}>
          {/* <div className="image">
            <img src="https://lh3.googleusercontent.com/proxy/b1wGY5L_AHu4PvFXyU2Z73pFmgNOChRGsvltudPKhV6ZSKISc1Rz_91-3MqmyIke4Hf3cMus3ibtjk4WUIz2pBjy1q68kpI" />
          </div> */}
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
