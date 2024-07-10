import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from '../hooks/useLocalStorage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import http from '../config/http';
import { toast } from 'react-toastify';

export default function Perfil() {
  const [userData, setUserData] = useLocalStorage('user_data', {}); 
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [Foto, setFoto] = useState("")


  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  async function Save() {
    try {
      const formData = new FormData();
      formData.append('Foto', Foto);
  
      const authToken = localStorage.getItem('token'); // ou de onde você obtém o token
      const res = await http.post('/api/newFotoPerfil', formData, {
        headers: {
          authorization: authToken,
        },
      });
  
      toast.success("Foto atualizada com sucesso");
      router.push("/perfil");
    } catch (err) {
      toast.error(err.toString());
    }
    handleClose();
  }
  
  return (
    <div className="container-lg mt-4">
      <main className="container-fluid">
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <h1 className="text-center">Perfil</h1>
          <div className="text-center position-relative">
            <label htmlFor="fileInput">
            <img 
  src='images/IconePerfilDefault.png'
  alt="Imagem de Perfil" 
  className="rounded-circle" 
  width="150" 
  height="150"
  style={{ cursor: 'pointer' }}
/>
            </label>
            <EditIcon 
              onClick={handleOpen}
              style={{ 
                cursor: 'pointer', 
                position: 'absolute', 
                top: '10px', 
                right: '10px' 
              }} 
            />
          </div>
          {userData && 
            <div className="card-body">
              <h3 className="card-text">Nome:</h3>
              <p style={{ textTransform: 'capitalize' }}>{userData.user_name}</p>
              <h3 className="card-text">Email:</h3>
              <p style={{ textTransform: 'capitalize' }}>{userData.user_email}</p>
              <h3 className="card-text">Senha do email:</h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={userData.user_senha_email}
                  style={{ marginRight: '10px', width: '30%', background: 'transparent', color: 'black', border: 'none' }}
                  readOnly
                />
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
              <h3 className="card-text">Profissão:</h3>
              <p style={{ textTransform: 'capitalize' }}>{userData.user_access_name}</p>
            </div>
          }
          <div className="mt-4 text-center">
            <button 
              className="btn btn-primary"
              onClick={() => router.push("/senha/novo")}
            >
              Redefinir senha do site
            </button>
          </div>
        </div>
      </main>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 id="modal-title">Editar Foto de Perfil</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="text-center">
            <img 
              src='images/IconePerfilDefault.png'
              alt="Nova Imagem de Perfil" 
              className="rounded-circle" 
              width="150" 
              height="150"
            />
            <input 
              type="file" 
              onChange = {e=>setFoto(e.target.value)}
              className="form-control"
              id="formFile"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={Save}
              style={{ marginTop: '10px' }}
            >
              Salvar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}