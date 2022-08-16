import { useNavigate } from "react-router-dom";

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
  MenuBar,
  MenuBarItem,
  MenuBarItemIcon,
} from "./styled.js";

import { Loading as LoadingComponent } from "./../Loading";
import { IoMdTrash } from "react-icons/io";

export const Table = (props) => {
  const {
    data = [],
    columns,
    loading,
    openModal,
    showOptions,
    onDelete,
  } = props;
  const navigate = useNavigate();

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
          onClick={() => navigate(`/cruds/${row["label"]}`)}
        >
          {columns.map((column) => {
            if (column.title === "id")
              return (
                <TableCell key={column.title} width={"20%"}>
                  {row[column.title]}
                </TableCell>
              );

            return (
              <TableCell key={column.id} width={"100%"}>
                {row[column.title]}
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
        <MenuBarItem background="#c0392b" color="#ecf0f1" onClick={onDelete}>
          <MenuBarItemIcon>
            <IoMdTrash title="Deletar tabela" height={50} width={50} />
          </MenuBarItemIcon>
          <span>Deletar tabela</span>
        </MenuBarItem>
      </MenuBar>
    );
  };

  return (
    <>
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

            return (
              <TableHeaderCell key={column.id} width="100%">
                {column.title}
              </TableHeaderCell>
            );
          })}
        </TableHeader>
        <TableBody>{createContent()}</TableBody>
      </TableContainer>
    </>
  );
};
