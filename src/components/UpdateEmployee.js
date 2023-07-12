import React, { useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { usePlexxisPracticalContext } from "../context/PlexxisPracticalContext";
import Axios from "axios";

const UpdateEmployee = ({ show, handleClose, id }) => {
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
    let employeeId = employees.find(
      (employee) => employee.name == nameRef.current.value
    ).id;
    let updatedEmployee = {
      id: employeeId,
      name: nameRef.current.value,
      code: codeRef.current.value,
      profession: professionRef.current.value,
      color: colorRef.current.value,
      city: cityRef.current.value,
      branch: branchRef.current.value,
      assigned: assignedRef.current.value,
    };
    let newArr = [...employees];
    const index = newArr.findIndex((employee) => employee.id === employeeId);
    newArr[index] = updatedEmployee;
    setEmployees(newArr);
    try {
      await Axios.put(
        `http://localhost:3001/employees/update/${employeeId}`,
        updatedEmployee
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show}>
      <Modal.Header style={{ background: "rgba(180, 203, 224, 0.8)" }}>
        <Modal.Title>Update Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "rgba(180, 203, 224, 0.8)" }}>
        <Form onSubmit={submit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Select type="text" ref={nameRef}>
              {employees.map((employee, key) => {
                return <option value={employee.name}>{employee.name}</option>;
              })}
            </Form.Select>
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
            Update
          </Button>
          <Button onClick={handleClose} variant="dark">
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateEmployee;
