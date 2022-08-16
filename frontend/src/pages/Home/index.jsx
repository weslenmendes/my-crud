import { useState, useEffect } from "react";

import {
  Container,
  Subtitle,
  ModalSubtitle,
  Header,
  Button,
  ButtonCrud,
} from "./styled.js";

import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";

import { getCruds, createCrud } from "../../services/crudServices.js";

import { notify } from "../../utils/notifyUtils.js";
import { IoMdClose } from "react-icons/io";

import { CreateCrudSchema } from "../../schemas/crudSchema.js";

const initialTable = {
  columns: [
    { id: 0, title: "id" },
    { id: 1, title: "label" },
  ],
  data: [],
  loading: true,
};

export const Home = (props) => {
  const [cruds, setCruds] = useState([]);
  const [table, setTable] = useState(initialTable);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [label, setLabel] = useState("");

  const handleOpenModal = () => {
    setLabel("");
    setModalOpen(!modalOpen);
  };

  const reloadTable = () => {
    setReload(!reload);
  };

  const handleChange = (e) => {
    setLabel(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = CreateCrudSchema.validate({ label });

    if (data.error) {
      notify(data.error.message, "error");
      setLoading(false);
      return;
    }

    try {
      await createCrud(label);
      handleOpenModal();
      reloadTable();
    } catch (e) {
      notify(e.response.data.message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getCruds();
        const { data } = response;

        setTable({ ...table, loading: false, data });
        setCruds(data);
      } catch (e) {
        notify(e.response.data.message, "error");
      }
    })();
  }, [reload]);

  return (
    <>
      <Subtitle>Seus Cruds</Subtitle>
      <Container>
        {table.data && (
          <ButtonCrud onClick={handleOpenModal}>Criar um crud</ButtonCrud>
        )}
        <Table
          columns={table.columns}
          data={table.data}
          loading={table.loading}
          openModal={handleOpenModal}
        />
      </Container>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleOpenModal}
        contentLabel={"Modal"}
      >
        <Header>
          <ModalSubtitle>Criar um crud</ModalSubtitle>
          <IoMdClose
            width={50}
            height={50}
            title="Fechar"
            onClick={handleOpenModal}
          />
        </Header>

        <form onSubmit={handleSubmit}>
          <Input
            id="label"
            type="text"
            value={label}
            onChange={handleChange}
            name="label"
            label="Label"
            disabled={loading}
            placeholder="Label"
            required={true}
            showRequired={true}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loading width={"50"} height={"50"} color={"#e3e3e3"} />
            ) : (
              <span>Criar</span>
            )}
          </Button>
        </form>
      </Modal>
    </>
  );
};
