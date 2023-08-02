import { FiRefreshCcw } from "react-icons/fi";
import styled from "styled-components";

const Button = styled.div`
  background-color: #4b4949;
  color: white;
  display: flex; 
  margin-top: 20px;
  margin-left: 5px;
  font-size: 30px;
  border:none;
`;

const Right = () => {
    const Refresh = () => {
        window.location.reload();
    };

  return (
    <>
     <aside>
     <Button onClick={Refresh}><FiRefreshCcw/></Button> 
     </aside>
    </>
  );
};

export default Right;