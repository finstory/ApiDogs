import { useNavigate } from 'react-router-dom';


export const useNav = () => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home/1");
  }

  const goPageById = (id) => {
    navigate(`/home/${id}`);
  }

  const goBack = () => {
    navigate(-1);
  }

  const goDetails = (name) => {
    navigate(`./details/${name}`);
  }

  return ({ goHome,goBack, goDetails,goPageById })
}
