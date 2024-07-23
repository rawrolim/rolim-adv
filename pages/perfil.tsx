import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from '../hooks/useLocalStorage';
import http from '../config/http';
import { toast } from 'react-toastify';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Perfil() {
  const [userData, setUserData] = useLocalStorage('user_data', '');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [Foto, setFoto] = useState<FileList>()
  const [fotoBase64, setFotoBase64] = useState<any>();

  useEffect(() => {
    if (userData.user_foto_perfil == "") {
      setFotoBase64('images/IconePerfilDefault.png')
    } else {
      setFotoBase64(userData.user_foto_perfil)
    }
  }, [])

  async function Save() {
    const reader = new FileReader();
    if (Foto.length) {
      reader.readAsDataURL(Foto.item(0));
      reader.onload = async () => {
        const authToken = localStorage.getItem('token'); // ou de onde você obtém o token
        const res = await http.post('/api/newFotoPerfil', { Foto: reader.result }, {
          headers: {
            authorization: authToken,
          },
        });
        userData.user_foto_perfil = reader.result;
        setUserData(userData);
        setFotoBase64(reader.result);
        toast.success("Foto atualizada com sucesso");
      }
    } else {
      toast.error("Foto não carregada.")
    }
  }

  return (
    <div className="container-lg mt-4">
      <main className="container-fluid">
        <div className="card p-3 mb-5 bg-white rounded">
          <h1 className="text-center">Perfil</h1>
          <div className="text-center position-relative">
            <label htmlFor="fileInput">
              <img
                src={fotoBase64}
                alt="Imagem de Perfil"
                className="rounded-circle border"
                width="150"
                height="150"
                style={{ cursor: 'pointer' }}
              />
            </label>
            <button className='btn' data-bs-toggle="modal" data-bs-target="#modal-foto">
              <FaEdit />
            </button>
          </div>
          {userData &&
            <div className="card-body">
              <h5>Nome</h5>
              <p style={{ textTransform: 'capitalize' }}>{userData.user_name}</p>

              <h5>E-mail:</h5>
              <p style={{ textTransform: 'capitalize' }}>{userData.user_email}</p>

              <h5>Senha do email:</h5>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={userData.user_senha_email}
                  style={{ marginRight: '10px', width: '30%', background: 'transparent', color: 'black', border: 'none' }}
                  readOnly
                />
                <button className="btn" onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <h5 className="card-text">Cargo:</h5>
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

      <div className="modal fade" id="modal-foto" style={{ marginTop: '100px' }} tabIndex={-1} aria-labelledby="modal-foto" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-foto">Editar Foto de Perfil</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className='col-12 text-center'>
                  <img
                    src={fotoBase64}
                    alt="Nova Imagem de Perfil"
                    className="rounded-circle"
                    width="150"
                    height="150"
                  />
                </div>
                <input
                  type="file"
                  onChange={e => setFoto(e.target.files)}
                  className="form-control mt-3"
                  id="formFile"
                  accept='image/png, image/jpeg'
                />
              </div>
            </div>
            <div className='modal-footer justify-content-center pt-0 pb-1'>
              <button className='btn btn-primary' onClick={Save} style={{ marginTop: '10px' }}>
                Salvar
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}