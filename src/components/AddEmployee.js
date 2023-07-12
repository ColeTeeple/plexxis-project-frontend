import { Modal, Form, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { usePlexxisPracticalContext } from "../context/PlexxisPracticalContext";
import Axios from "axios";

const AddEmployee = ({ show, handleClose }) => {
  const nameRef = useRef();
  const codeRef = useRef();
  const professionRef = useRef();
  const colorRef = useRef();
  const cityRef = useRef();
  const branchRef = useRef();
  const assignedRef = useRef();
  const { employees, setEmployees } = usePlexxisPracticalContext();

  const submit = async (e) => {
    e.preventDefault();
    const employee = {
      name: nameRef.current.value,
      code: codeRef.current.value,
      profession: professionRef.current.value,
      color: colorRef.current.value,
      city: cityRef.current.value,
      branch: branchRef.current.value,
      assigned: assignedRef.current.value,
    };
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
    try {
      await Axios.post("http://localhost:3001/employees/create", employee).then(
        (response) => {}
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show}>
      <Modal.Header style={{ background: "rgba(180, 203, 224, 0.8)" }}>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "rgba(180, 203, 224, 0.8)" }}>
        <Form onSubmit={submit} id="form">
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" ref={nameRef}></Form.Control>
          </Form.Group>
          <Form.Group controlId="code">
            <Form.Label>Code:</Form.Label>
            <Form.Control type="text" ref={codeRef}></Form.Control>
          </Form.Group>
          <Form.Group controlId="profession">
            <Form.Label>Profession:</Form.Label>
            <Form.Control type="text" ref={professionRef}></Form.Control>
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Color:</Form.Label>
            <Form.Control type="text" ref={colorRef}></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control type="text" ref={cityRef}></Form.Control>
          </Form.Group>
          <Form.Group controlId="branch">
            <Form.Label>Branch:</Form.Label>
            <Form.Control type="text" ref={branchRef}></Form.Control>
          </Form.Group>
          <Form.Group controlId="assigned">
            <Form.Label>Assigned:</Form.Label>
            <Form.Select type="boolean" ref={assignedRef}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" onClick={handleClose} variant="dark">
            Add
          </Button>
          <Button onClick={handleClose} variant="dark">
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployee;
