import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import http from '../../config/http';

export default function CadastroUsuario() {
  const router = useRouter();

  useEffect(()=>{
    if(router.query.id != 'novo')
      if(Number(router.query.id))
        getClient()
  },[]);

  async function getClient(){
    const resData = await http.get(`/api/usuario/${router.query.id}`);
    setFormData(resData);
  }

  const [formData, setFormData] = useState({
    id: 0,
    tipo_usuario: '',
    senha: '',
    usuario: '',
    status: '',
    email: '',
    senha_email: '',
    foto_perfil: ''
  });

  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false); 

  const placeholders: { [key: string]: string } = {
    tipo_usuario: 'Digite o tipo de usuário',
    senha: 'Digite a senha',
    usuario: 'Digite o nome de usuário',
    status: 'Digite o status',
    email: 'Digite o email',
    senha_email: 'Digite a senha do email',
    foto_perfil: 'Insira a URL da foto de perfil'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    let newValue;
    if (e.target instanceof HTMLInputElement && e.target.files) {
      newValue = e.target.files[0]; 
    } else {
      newValue = value; 
    }
  
    setFormData({ ...formData, [id]: newValue });
  };

  const handleFocus = (id: string) => {
    setFocused({ ...focused, [id]: true });
  };

  const handleBlur = (id: string) => {
    setFocused({ ...focused, [id]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="d-flex flex-column align-items-center py-5" style={{ minHeight: '75vh' }}>
      <div className="shadow p-4 rounded">
        <button className="btn btn-outline-primary border-end-0 border-start-0 rounded-4" onClick={() => router.push('/lista_usuarios')}>Voltar</button>

        <h2 className="mb-4 text-center">Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit} className="bg-white" style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {Object.entries(formData).map(([key, value]) => (
            <div className="form-group position-relative" key={key} style={{ flex: '1 1 calc(50% - 20px)', minWidth: '230px' }}>
              {key === 'senha' || key === 'senha_email' ? (
                <div className="d-flex align-items-center position-relative">
                  <input
                    type={key === 'senha' ? (showPassword ? 'text' : 'password') : (showEmailPassword ? 'text' : 'password')}
                    value={value as string}
                    onChange={handleChange}
                    id={key}
                    placeholder={focused[key] ? placeholders[key] : ''}
                    onFocus={() => handleFocus(key)}
                    onBlur={() => handleBlur(key)}
                    required
                    className="form-control border-0 border-bottom"
                  />
                  <span
                    onClick={() => key === 'senha' ? setShowPassword(!showPassword) : setShowEmailPassword(!showEmailPassword)}
                    className="position-absolute"
                    style={{ right: '10px', cursor: 'pointer' }}
                  >
                    {key === 'senha' ? (showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />) : (showEmailPassword ? <VisibilityOffIcon /> : <VisibilityIcon />)}
                  </span>
                </div>
              ) : key === 'foto_perfil' ? (
                <div className="position-relative">
                  <input
                    type="file"
                    onChange={handleChange}
                    id={key}
                    className="form-control border-0"
                  />
                  <label
                    htmlFor={key}
                    className="position-absolute top-0 left-1 text-primary"
                    style={{
                      transform: 'translateY(-50%)',
                      cursor: 'auto',
                      padding: '0 5px',
                      transition: 'all 0.3s ease',
                      color: '#007bff',
                      fontSize: '12px'
                    }}
                  >
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </label>
                </div>
              ) : key === 'tipo_usuario' ? (
                <div className="position-relative">
                  <select
                    onChange={handleChange}
                    id={key}
                    className="form-control border-0"
                    defaultValue=""
                  >
                    <option value="" disabled selected>
                      Selecione uma opção
                    </option>
                    <option value="opcao1">Advogado</option>
                    <option value="opcao2">Estagiário</option>
                    <option value="opcao3">Sócio</option>
                    <option value="opcao4">Desenvolvedor</option>
                    <option value="opcao5">Recepcionista</option>
                  </select>
                  <label
                    htmlFor={key}
                    className="position-absolute top-0 left-1 text-primary"
                    style={{
                      transform: 'translateY(-50%)',
                      cursor: 'auto',
                      padding: '0 5px',
                      transition: 'all 0.3s ease',
                      color: '#007bff',
                      fontSize: '12px'
                    }}
                  >
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </label>
                </div>
              ) : (
                <InputMask
                  value={value as string}
                  onChange={handleChange}
                  id={key}
                  placeholder={focused[key] ? placeholders[key] : ''}
                  onFocus={() => handleFocus(key)}
                  onBlur={() => handleBlur(key)}
                  required={['tipo_usuario', 'usuario', 'email'].includes(key)}
                  className="form-control border-0 border-bottom"
                />
              )}
              {key !== 'foto_perfil' && key !== 'tipo_usuario' && (
                <label
                  htmlFor={key}
                  className={`position-absolute ${key === 'id' || focused[key] || (value && value.toString().length > 0) ? 'top-0 left-1 text-primary' : 'top-50 left-2'}`}
                  style={{
                    transform: 'translateY(-50%)',
                    cursor: 'auto',
                    padding: '0 5px',
                    transition: 'all 0.3s ease',
                    color: key === 'id' || focused[key] || (value && value.toString().length > 0) ? '#007bff' : '#555555',
                    fontSize: key === 'id' || focused[key] || (value && value.toString().length > 0) ? '12px' : 'inherit'
                  }}
                >
                  {key.replace(/_/g, ' ').toUpperCase()} {['senha', 'usuario', 'email'].includes(key) && '*'}
                </label>
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100 mt-3">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}