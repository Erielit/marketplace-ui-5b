import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

export const ProductDetails = ({
  isOpen,
  handleClose,
  name,
  brand,
  description,
  images,
  quantity,
  price,
  subcategory,
  status,
}) => {
  return (
    <Modal
      size="lg"
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>Detalles del producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label className="form-label">Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Label className="form-label">Marca</Form.Label>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Descripción</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Imágenes</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label className="form-label">Existencias</Form.Label>
            </Col>
            <Col>
              <Form.Label className="form-label">Precio</Form.Label>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label className="form-label">Categoría</Form.Label>
            </Col>
            <Col>
              <Form.Label className="form-label">Subcategorías</Form.Label>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row className="text-end">
            <Col>
              <Button variant="success">
                <FeatherIcon icon="x" />
                &nbsp; Cerrar
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
};
