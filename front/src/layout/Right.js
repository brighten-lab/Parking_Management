import { FiRefreshCcw } from "react-icons/fi";
import styled from "styled-components";

const Button = styled.div`
  background-color: rgb(255, 255, 255);;
  color: black;
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