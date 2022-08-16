import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert2";

import { getCrud, deleteCrud } from "../../services/crudServices.js";

import { Table } from "../../components/Table";

import {
  Container,
  Subtitle,
  ModalSubtitle,
  Header,
  Button,
  ButtonCrud,
} from "./styled.js";

import { formatColumns } from "../../utils/formatUtils.js";
import { notify } from "../../utils/notifyUtils.js";

const initialCrud = {
  data: [],
  columns: [],
  loading: true,
};

export const Cruds = (props) => {
  const [crud, setCrud] = useState(initialCrud);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { label } = useParams();

  useEffect(() => {
    if (label) {
      (async () => {
        try {
          const crud = await getCrud(label);
          const columns = crud.data[0]
            ? formatColumns(Object.keys(crud.data[0]))
            : [];

          setCrud({
            ...crud,
            data: [...crud.data],
            loading: false,
            columns: columns,
          });
        } catch (e) {
          notify(e.response.data.message, "error");
        }
      })();
    }
  }, [label]);

  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDelete = async () => {
    try {
      const confirm = await swal.fire({
        title: "Você tem certeza?",
        text: `Você quer deletar o crud ${label}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (confirm.isConfirmed) {
        await deleteCrud(label);
        notify("Crud deletado com sucesso!", "success");
        navigate("/");
      }
    } catch (e) {
      notify(e.response.data.message, "error");
    }
  };

  return (
    <>
      <Subtitle>{label}</Subtitle>
      <Container>
        <Table
          columns={crud.columns}
          data={crud.data}
          loading={crud.loading}
          openModal={handleOpenModal}
          showEdit={true}
          showDelete={true}
          showOptions={true}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
};
