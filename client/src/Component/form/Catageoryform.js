import React from "react";
import { Form, Button } from "react-bootstrap";

const Catageoryform = ( {handleSubmit,setValue,value}) => {
  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex">

        <Form.Control
          type="text"
          placeholder="Enter New Catageory"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Catageoryform;
