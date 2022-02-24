import React, { useEffect, useState } from "react";
import axios from "../../../shared/plugins/axios";
import DataTable from "react-data-table-component";
import { Row, Col, Badge, Card, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { CategoryForm } from "./CategoryForm";

export const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getCategories = () => {
    axios({ url: "/category/", method: "GET" })
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getCategories();
  }, []);

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Categoría",
      cell: (row) => <div>{row.description}</div>,
    },
    {
      name: "Estado",
      cell: (row) =>
        row.status.description === "Activo" ? (
          <Badge pill bg="success">
            {row.status.description}
          </Badge>
        ) : (
          <Badge pill bg="danger">
            {row.status.description}
          </Badge>
        ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
  };

  return (
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col>Categorías</Col>
              <Col className="text-end">
                <CategoryForm
                  isOpen={isOpen}
                  handleClose={() => setIsOpen(false)}
                />
                <Button variant="success" onClick={() => setIsOpen(true)}>
                  <FeatherIcon icon="plus" />
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <DataTable
                title="Listado"
                columns={columns}
                data={categories}
                pagination
                paginationComponentOptions={paginationOptions}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
