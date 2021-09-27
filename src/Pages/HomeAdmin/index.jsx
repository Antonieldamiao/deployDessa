import {
  Container,
  SideLeft,
  SideRight,
  Box,
  Title,
  Component,
  Text,
  Logo,
  LogoIcon,
  Field,
  FormContent,
  TitlePartner,
  FieldButton,
  FieldTableButton
} from "./styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Delete, Add, Create, Search, ExitToApp } from '@material-ui/icons';
import { TextField, Button, Table } from '@material-ui/core';
import logo from '../../assets/logo.png';
import MUIDataTable from "mui-datatables";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Adds from '@material-ui/icons/AddCircle';
import api from  '../../services/api';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function HomeAdmin() {
  let history = useHistory();
  const columns = ["Id", "Email", "Username", "Active"];
  const [IsValidation, setValidation] = useState(false)
  const rootRef = React.useRef(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [users, setUsers] = useState([]);

  const render = async () => {
    await api.get('/user/list').then((resp) => {
      console.log(resp.data);
      setUsers(resp.data);      
    }).catch((err)=>{
      console.log(err);
    })
  }
  const removeUser = async (id) =>{
    await api.delete(`/user/delete/${id}`).then((resp)=>{
      alert('USUÁRIO EXCLUIDO');
      window.location.reload();
    }).catch((err)=>{
      alert('ERRO AO EXCLUIR');
    })
  }
  useEffect(()=>{
    render();
  }, [0])
 

  const handleClose = () => {
    setOpenEdit(false);
    
  };


  const components = {
    icons: {
      Adds
  }
}
  const options = {
    filter: true,
    filterType: 'checkbox',
    tableBodyHeight: '250px',
    tableBodyWidth: '1000px',
    print: false,
    download: false,
    pagination: false,
    onRowsDelete: (index) => {removeUser(users[index.data[0].index].id)},
    onRowClick:(index ,rowIndex) => console.log("teds", rowIndex),
    onRowSelectionChange:(index ,rowIndex) => console.log("teste", rowIndex),
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum usuário cadastrado :(",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      selectedRows: {
        text: "linha(s) selecionada(s)",
        delete: "Deletar",
        deleteAria: "deletar todas a linhas selecionadas",
      },
    }
  };

  function Logout() {
    localStorage.removeItem('Token');
    history.push('/')
  }


  return (
    <Container>
     
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <h2 id="server-modal-title" style={{ textAlign: 'center' }}>Editar Contato</h2>
          <FormContent noValidate autoComplete="off">
            <Field>
              <TextField className="input" style={{
                width: 377,
                height: 19
              }} label="nome" variant="outlined" />
            </Field>
            <Field>
              <TextField className="input" style={{
                width: 377,
                height: 19
              }} label="(xx) xxxxx-xxxx" type="telephone" variant="outlined" />
            </Field>
            <FieldButton>
              <Button variant="contained" color="primary">Salvar</Button>
              <Button variant="contained" onClick={handleClose} color="primary">Cancelar</Button>
            </FieldButton>
          </FormContent>
        </div>
      </Modal>
      <SideLeft>
      <div onClick={ () => Logout()}>
        <ExitToApp />
      
          <TitlePartner>Logout</TitlePartner>
          </div>
      </SideLeft>
      <SideRight>
        <div>
          <Logo>
            <LogoIcon src={logo} alt="logo" />
          </Logo>
          <MUIDataTable
           style={{
            width: 377,
            height: 19
          }}
            title={"Lista de Usuários"}
            data={users.map(d => { return  [d.id, d.email, d.username, String(d.active)] })}
            columns={columns}
            options={options}
            components={components}
          />
        </div>
      </SideRight>
    </Container>
  );
}
export default HomeAdmin;