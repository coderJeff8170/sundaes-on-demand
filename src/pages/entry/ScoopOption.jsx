import { useState } from "react";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(false);
    const handleChange = (event) => {
        if(event.target.value < 0 || event.target.value > 10 || event.target.value % 1 !== 0) {
          setIsValid(true)
          updateItemCount(name, '0');
        }else{
          setIsValid(false);
          updateItemCount(name, event.target.value);
        }
        
    }
  //need a form to accept the input for number of each item
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control type="number" isInvalid={isValid} defaultValue={0}  onChange={handleChange}/>
        </Col>
      </Form.Group>
    </Col>
  );
}
