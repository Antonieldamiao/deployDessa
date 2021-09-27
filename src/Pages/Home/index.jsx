
import React, { useState, useEffect, useRef } from "react";
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
  FieldTableButton,
  LogoutBT
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
import { Delete, Add, Create, Search, ExitToApp } from '@material-ui/icons';
import { TextField, Button, Table, Checkbox } from '@material-ui/core';
import logo from '../../assets/logo.png';
import MUIDataTable from "mui-datatables";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Adds from '@material-ui/icons/AddCircle';
import api from "../../services/api";
import { logout } from "../../services/auth";

let dados
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

const CustomBox = (props) => {
  return <Checkbox {...props} />
}
const Home = () => {

  console.log('fora do user', dados);
  let history = useHistory();
  const [contact, setContact] = useState([])
  const rootRef = React.useRef(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  let token

  setTimeout(() => {
    alert('Sua sessão expirou')
    Logout()
  }, 10800000);
  token = localStorage.getItem("Token")



  const init = async () => {
    await api.post("/contact/list", {

      token: token
    }).then((resp) => {
      setContact(resp.data)
      console.log(contact)
    }).catch((err) => {
      console.log(err);
    });
  }
  let dd = 0

  const nomeRef = useRef('');
  const nomeEditRef = useRef('');
  const telefoneEditRef = useRef('');
  const telefoneRef = useRef('');
  const [indexd, setIndex] = useState(0);
  const [nome, setnome] = useState('');
  const [telefone, setTelefone] = useState('');

  const options = {
    filter: true,
    filterType: 'checkbox',
    tableBodyHeight: '250px',
    tableBodyWidth: '1000px',
    print: false,
    download: false,
    pagination: false,
    serverSide: true,
    selectableRowsOnClick: false,
    selectableRows: 'single',
    onRowsDelete: (index) => {
      console.log("deletado", index.data[0].index)
      dd = index.data[0].index
      DeletContact(dd)
    },
    onRowSelectionChange: (index, dataIndex) => {
      dd = index[0].index
      console.log("selecionado", dd = index[0].index)
    
    },
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum contato cadastrado :(",
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

  useEffect(() => {
    init()
    console.log(contact)
  }, [1])




  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = async () => {
    setIndex(dd)
    await setnome(contact[dd].name)
    setTelefone(contact[dd].telephone)

    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  const handleCloseEdit = () => {
    setOpenEdit(false);

  };

  const components = {
    icons: {
      Adds
    }
  }


  function Logout() {
    localStorage.removeItem('Token');
    history.push('/')
  }

  function AddContact() {
    const data = {
      name: nomeRef.current.value,
      telephone: telefoneRef.current.value,
      token: token
    }
    if (data.nome === "" || data.telefone === "") {
      alert('preencha os campos')
    }
    else {
      api.post('/contact/add', data).then((resp) => {
        handleClose()
        alert('Adicionado com sucesso')
        window.location.reload()
      }).catch((err) => {
        console.log(err);
        alert(err)
      });
      
     

    }
  }

  function EditContact() {
    console.log(contact[dd].id)
    const data = {
      id: contact[dd].id,
      name: nomeEditRef.current.value,
      telephone: telefoneEditRef.current.value,
      token: token
    }
    if (data.nome === "" || data.telefone === "") {
      alert('preencha os campos')
    }
    else {
      console.log('essa merda', data)
      api.put('/contact/update', data).then((resp) => {
        handleClose()
        alert('editado com sucesso')
        window.location.reload()
      }).catch((err) => {
        console.log(err);
        alert(err)
      });
    }
  }

 async function DeletContact(index) {
    let id = contact[index].id
  
    console.log(index)
    await api.delete('/contact/delete/'+id).then((resp) => {
        handleClose()
        alert('deletado com sucesso')

      }).catch((err) => {
        console.log(err);
        alert(err)
      });
      window.location.reload()
  }
  const columns = ["Nome", "Telefone"];



  return (
    <Container>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <h2 id="server-modal-title" style={{ textAlign: 'center' }}>Adicionar Contato</h2>
          <FormContent noValidate autoComplete="off">
            <Field>
              <TextField className="input" style={{
                width: 377,
                height: 19

              }} label="nome" variant="outlined" inputRef={nomeRef} />
            </Field>
            <Field>
              <TextField className="input" style={{
                width: 377,
                height: 19
              }} label="(xx) xxxxx-xxxx" type="telephone" variant="outlined" inputRef={telefoneRef} />
            </Field>
            <FieldButton>
              <Button onClick={() => AddContact()} variant="contained" color="primary">Adicionar</Button>
              <Button variant="contained" onClick={handleClose} color="primary">Cancelar</Button>
            </FieldButton>
          </FormContent>
        </div>
      </Modal>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <h2 id="server-modal-title" style={{ textAlign: 'center' }}>Editar Contato</h2>
          <FormContent noValidate autoComplete="off">
            <Field>
              <TextField className="input" defaultValue={nome} inputRef={nomeEditRef} style={{
                width: 377,
                height: 19
              }} label="nome" variant="outlined" />
            </Field>
            <Field>
              <TextField className="input" defaultValue={telefone} inputRef={telefoneEditRef} style={{
                width: 377,
                height: 19
              }} label="(xx) xxxxx-xxxx" type="telephone" variant="outlined" />
            </Field>
            <FieldButton>
              <Button onClick={() => EditContact()} variant="contained" color="primary">Salvar</Button>
              <Button variant="contained" onClick={handleCloseEdit} color="primary">Cancelar</Button>
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
          <FieldTableButton>
            <Button onClick={() => handleOpen()} variant="contained" style={{
              marginRight: 20,
            }} color="primary">Adicionar</Button>
            <Button onClick={() => handleOpenEdit()} variant="contained" color="primary">Editar</Button>
          </FieldTableButton>
          <MUIDataTable
            style={{
              width: 377,
              height: 70
            }}
            title={"Lista de Contatos"}
            data={contact.map(contactd => { return [contactd.name, contactd.telephone] })}
            columns={columns}
            options={options}
            components={components}
          />
        </div>

      </SideRight>
    </Container>
  );
}

export default Home;