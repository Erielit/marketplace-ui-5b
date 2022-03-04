import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import { DataTableCustom } from "../../shared/components/DataTableCustom";
import axios from "../../shared/plugins/axios";

export const ProductScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios({ url: "/product/", method: "GET" })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, []);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col>Productos</Col>
              <Col className="text-end">
                <ButtonCircle
                  type={"btn btn-success btn-circle"}
                  onClickFunct={() => {}}
                  icon="plus"
                  size={20}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTableCustom
              columns={columns}
              data={products}
              isLoading={isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
