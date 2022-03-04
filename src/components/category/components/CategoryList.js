import React, { useEffect, useState } from "react";
import axios from "../../../shared/plugins/axios";
import DataTable from "react-data-table-component";
import { Row, Col, Badge, Card } from "react-bootstrap";
import { CategoryForm } from "./CategoryForm";
import { ButtonCircle } from "../../../shared/components/ButtonCircle";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import Alert, {
  msjConfirmacion,
  msjError,
  msjExito,
  titleConfirmacion,
  titleError,
  titleExito,
} from "../../../shared/plugins/alert";
import { CategoryFormEdit } from "./CategoryFormEdit";

export const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categorySelected, setCategorySelected] = useState({});

  const filteredItems = categories.filter(
    (item) =>
      item.description &&
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );

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

  const statusChange = (category) => {
    Alert.fire({
      title: titleConfirmacion,
      text: msjConfirmacion,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#198754",
      cancelButtonColor: "#dc3545",
      showCancelButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      icon: "warning",
      backdrop: true,
      allowOutsideClick: !Alert.isLoading,
      preConfirm: () => {
        let categoryUpdate = {};
        if (category.status.description === "Activo") {
          categoryUpdate = {
            ...category,
            status: { id: 2, description: "Inactivo" },
          };
        } else {
          categoryUpdate = {
            ...category,
            status: { id: 1, description: "Activo" },
          };
        }
        return axios({
          url: "/category/",
          method: "PUT",
          data: JSON.stringify(categoryUpdate),
        })
          .then((response) => {
            if (response.error) {
              Alert.fire({
                title: titleError,
                text: msjError,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#198754",
              });
            } else {
              let categoriesTemp = categories.filter(
                (it) => it.id !== category.id
              );
              console.log(categoriesTemp);
              setCategories([...categoriesTemp, categoryUpdate]);
              Alert.fire({
                title: titleExito,
                text: msjExito,
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#198754",
              });
            }
            return response;
          })
          .catch((error) => {
            console.log(error);
          });
      },
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
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <ButtonCircle
            icon="edit"
            size={16}
            type="btn btn-warning btn-circle me-2"
            onClickFunct={() => {
              setCategorySelected(row);
              setIsEditing(true);
            }}
          />
          {row.status.description === "Activo" ? (
            <ButtonCircle
              icon="trash-2"
              size={16}
              type="btn btn-danger btn-circle"
              onClickFunct={() => statusChange(row)}
            />
          ) : (
            <ButtonCircle
              icon="check-circle"
              size={16}
              type="btn btn-success btn-circle"
              onClickFunct={() => statusChange(row)}
            />
          )}
        </>
      ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
  };

  const searchComponent = React.useMemo(() => {
    const clear = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        filterText={filterText}
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={clear}
      />
    );
  }, [filterText]);

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
                  setCategories={setCategories}
                />
                <CategoryFormEdit
                  isOpen={isEditing}
                  onClose={() => setIsEditing(false)}
                  setCategories={setCategories}
                  {...categorySelected}
                />
                <ButtonCircle
                  type={"btn btn-success btn-circle"}
                  onClickFunct={() => setIsOpen(true)}
                  icon="plus"
                  size={20}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              title="Listado"
              columns={columns}
              data={filteredItems}
              pagination
              paginationComponentOptions={paginationOptions}
              progressPending={isLoading}
              progressComponent={<CustomLoader />}
              subHeader
              subHeaderComponent={searchComponent}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
