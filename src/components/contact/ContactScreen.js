import React, { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import "../../assets/css/main.css";
import "../../assets/css/util.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../assets/img/river.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import Alert, {
  msjConfirmacion,
  msjError,
  msjExito,
  titleConfirmacion,
  titleError,
  titleExito,
} from "../../shared/plugins/alert";
import axios from "../../shared/plugins/axios";

export const ContactScreen = () => {
  const bg = {
    backgroundImage: `url(${img})`,
  };

  useEffect(() => {
    document.title = "MP | Contacto";
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      comments: "",
    },
    validationSchema: yup.object().shape({
      fullname: yup
        .string()
        .required("Campo obligatorio")
        .min(4, "Mínimo cuatro caracteres"),
      email: yup
        .string()
        .email("Ingresar un correo correcto")
        .required("Campo obligatorio"),
      comments: yup
        .string()
        .required("Campo obligatorio")
        .min(4, "Mínimo cuatro caracteres"),
    }),
    onSubmit: (values) => {
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
        preConfirm: () => {
          return axios({
            url: "/contact/",
            method: "POST",
            data: JSON.stringify(values),
          })
            .then((response) => {
              console.log(response);
              if (!response.error) {
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonColor: "#198754",
                  confirmButtonText: "Aceptar",
                });
              }
              return response;
            })
            .catch((error) => {
              Alert.fire({
                title: titleError,
                text: msjError,
                confirmButtonColor: "#198754",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            });
        },
        backdrop: true,
        allowOutsideClick: !Alert.isLoading,
      });
    },
  });

  return (
    <div className="container-contact100">
      <div className="wrap-contact100">
        <Form className="contact100-form" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="">Nombre completo</Form.Label>
            <Form.Control
              name="fullname"
              placeholder="Mike Moreno"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name ? (
              <span className="error-text">{formik.errors.name}</span>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="">Correo electrónico</Form.Label>
            <Form.Control
              name="email"
              placeholder="mikemoreno@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <span className="error-text">{formik.errors.email}</span>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="">Comentarios</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comments"
              placeholder="Comentarios"
              value={formik.values.comments}
              onChange={formik.handleChange}
            />
            {formik.errors.comments ? (
              <span className="error-text">{formik.errors.comments}</span>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-4">
            <Row>
              <Col className="text-end">
                <Button variant="outline-success" type="submit">
                  <FeatherIcon icon="send" /> Enviar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <div className="contact100-more flex-col-c-m" style={bg}>
          <div className="flex-w size1 p-b-47">
            <div className="txt1 p-r-25">
              <span className="lnr lnr-map-marker"></span>
            </div>
            <div className="flex-col size2">
              <span className="txt1 p-b-20">Dirección</span>
              <span className="txt2">
                Av. Universidad Tecnológica 1, Palo Escrito, 62765 Emiliano
                Zapata, Mor. México
              </span>
            </div>
          </div>
          <div className="flex-w size1 p-b-47">
            <div className="txt1 p-r-25">
              <span className="lnr lnr-phone-handset"></span>
            </div>
            <div className="flex-col size2">
              <span className="txt1 p-b-20">Teléfono</span>
              <span className="txt2">+52 7773681165</span>
            </div>
          </div>
          <div className="flex-w size1 p-b-47">
            <div className="txt1 p-r-25">
              <span className="lnr lnr-envelope"></span>
            </div>
            <div className="flex-col size2">
              <span className="txt1 p-b-20">Correo electrónico</span>
              <span className="txt2">utez@utez.edu.mx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
