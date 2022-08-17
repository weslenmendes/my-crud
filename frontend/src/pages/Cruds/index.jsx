import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import swal from "sweetalert2";

import {
  getCrud,
  deleteCrud,
  createColumn,
  deleteColumn,
  createRow,
} from "../../services/crudServices.js";

import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";

import {
  CreateColumnSchema,
  CreateRowSchema,
} from "../../schemas/crudSchema.js";

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
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
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
  }, [label, reload]);

  const handleOpenModal = () => {
    setName("");
    setModalOpen(!modalOpen);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const reloadTable = () => {
    setReload(!reload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = CreateColumnSchema.validate({ columnName: name });

    if (data.error) {
      notify(data.error.message, "error");
    } else {
      if (modalType === "Deletar coluna") {
        await confirmDeleteColumn();
        return;
      }

      try {
        await createColumn(label, name);

        notify("Coluna criada com sucesso.", "success");

        setLoading(false);
        handleOpenModal();
        reloadTable(!reload);
      } catch (e) {
        setLoading(false);
        notify(e.response.data.message, "error");
      }
    }
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

  const confirmDeleteColumn = async () => {
    try {
      const confirm = await swal.fire({
        title: "Você tem certeza?",
        text: `Você quer deletar a coluna ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (confirm.isConfirmed) {
        await deleteColumn(label, name);
        notify("Coluna deletada com sucesso!", "success");
        setLoading(false);
        handleOpenModal();
        reloadTable();
      }
    } catch (e) {
      setLoading(false);
      notify(e.response.data.message, "error");
    }
  };

  const handleDeleteColumn = async (columnName) => {
    try {
      setModalType("Deletar coluna");
      handleOpenModal();
    } catch (e) {
      notify(e.response.data.message, "error");
    }
  };

  const handleCreateColumn = async () => {
    setModalType("Criar coluna");
    handleOpenModal();
  };

  const handleCreateRow = async () => {
    try {
      await createRow(label);

      notify("Linha criada com sucesso!", "success");

      setLoading(false);
      reloadTable();
    } catch (e) {
      notify(e.response.data.message, "error");
    }
  };

  const generateLabel = (typeModal) => {
    if (typeModal === "Criar coluna") {
      return "Nome da coluna";
    }

    if (typeModal === "Criar linha") {
      return "Nome da linha";
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
          actions={{
            onDelete: handleDelete,
            onCreateColumn: handleCreateColumn,
            onDeleteColumn: handleDeleteColumn,
            onCreateRow: handleCreateRow,
          }}
        />
      </Container>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleOpenModal}
        contentLabel={"Modal"}
      >
        <Header>
          <ModalSubtitle>{modalType}</ModalSubtitle>
          <IoMdClose
            width={50}
            height={50}
            title="Fechar"
            onClick={handleOpenModal}
          />
        </Header>

        <form onSubmit={(e) => handleSubmit(e, modalType)}>
          <Input
            id="label"
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
            label={generateLabel(modalType)}
            disabled={loading}
            placeholder={generateLabel(modalType)}
            required={true}
            showRequired={true}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loading width={"50"} height={"50"} color={"#e3e3e3"} />
            ) : (
              <span>
                {modalType === "Deletar coluna" ? "Deletar" : "Criar"}
              </span>
            )}
          </Button>
        </form>
      </Modal>
    </>
  );
};
