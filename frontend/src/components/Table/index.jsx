import { useNavigate, useLocation } from "react-router-dom";

import {
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Loading,
  CallToAction,
  Button,
  ButtonCrud,
  MenuBar,
  MenuBarContainer,
  MenuBarItem,
  MenuBarItemIcon,
  Container,
  Spacer,
} from "./styled.js";

import { Loading as LoadingComponent } from "./../Loading";
import { IoMdTrash, IoMdCreate } from "react-icons/io";

export const Table = (props) => {
  const {
    data = [],
    columns,
    loading,
    openModal,
    showOptions,
    actions,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const createContent = () => {
    if (loading) {
      return (
        <Loading>
          <LoadingComponent height={"50"} width={"50"} color="#e3e3e3" />
        </Loading>
      );
    }

    if (data.length === 0) {
      return (
        <Loading>
          <CallToAction>
            <h2>Nenhum Crud encontrado</h2>
            <Button onClick={() => openModal()}>Criar um Crud</Button>
          </CallToAction>
        </Loading>
      );
    }

    return data.map((row) => {
      return (
        <TableRow
          key={row.id}
          onClick={
            location.pathname.includes("/cruds")
              ? null
              : () => navigate(`/cruds/${row["label"]}`)
          }
        >
          {columns.map((column) => {
            if (column.title === "id")
              return (
                <TableCell key={column.title} width={actions ? "13%" : "16%"}>
                  {row[column.title]}
                </TableCell>
              );

            if (column.title === "Actions")
              return (
                <TableCell
                  key={column.title}
                  flexDirection="row"
                  justifyContent=""
                  width={"20%"}
                >
                  <ButtonCrud onClick={() => actions.onUpdateRow(columns, row)}>
                    <IoMdCreate />
                  </ButtonCrud>
                  <Spacer width={"10px"} />
                  <ButtonCrud
                    backgroundColor="#c0392b"
                    onClick={() => actions.onDeleteRow(row.id)}
                  >
                    <IoMdTrash />
                  </ButtonCrud>
                </TableCell>
              );

            return (
              <TableCell key={column.title} width={actions ? "50%" : "80%"}>
                {row[column.title] || "-"}
              </TableCell>
            );
          })}
        </TableRow>
      );
    }, []);
  };

  const createOptions = () => {
    return (
      <MenuBar>
        <MenuBarContainer>
          <MenuBarItem
            background="#c0392b"
            color="#ecf0f1"
            onClick={actions.onDelete}
          >
            <MenuBarItemIcon>
              <IoMdTrash title="Deletar tabela" height={50} width={50} />
            </MenuBarItemIcon>
            <span>Deletar tabela</span>
          </MenuBarItem>

          <MenuBarItem
            background="#3498db"
            color="#ecf0f1"
            onClick={actions.onCreateColumn}
          >
            <MenuBarItemIcon>
              <IoMdCreate title="Criar coluna" height={50} width={50} />
            </MenuBarItemIcon>
            <span>Criar coluna</span>
          </MenuBarItem>

          <MenuBarItem
            background="#3498db"
            color="#ecf0f1"
            onClick={actions.onCreateRow}
          >
            <MenuBarItemIcon>
              <IoMdCreate title="Criar linha" height={50} width={50} />
            </MenuBarItemIcon>
            <span>Criar Linha</span>
          </MenuBarItem>

          <MenuBarItem
            background="#c0392b"
            color="#ecf0f1"
            onClick={actions.onDeleteColumn}
          >
            <MenuBarItemIcon>
              <IoMdTrash title="Deletar colun" height={50} width={50} />
            </MenuBarItemIcon>
            <span>Deletar coluna</span>
          </MenuBarItem>
        </MenuBarContainer>
      </MenuBar>
    );
  };

  return (
    <Container>
      {showOptions && createOptions()}
      <TableContainer>
        <TableHeader>
          {columns?.map((column) => {
            if (column.title === "id")
              return (
                <TableHeaderCell key={column.id} width="20%">
                  {column.title}
                </TableHeaderCell>
              );

            if (column.title === "Actions")
              return (
                <TableHeaderCell key={column.id} width="35%">
                  {column.title}
                </TableHeaderCell>
              );

            return (
              <TableHeaderCell key={column.id} width="100%">
                {column.title}
              </TableHeaderCell>
            );
          })}
        </TableHeader>
        <TableBody>{createContent()}</TableBody>
      </TableContainer>
    </Container>
  );
};
