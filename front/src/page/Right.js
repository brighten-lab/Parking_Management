import { FiRefreshCcw } from "react-icons/fi";

const Right = () => {
    const Refresh = () => {
        window.location.reload();
    };

  return (
    <>
     <aside>
     <button onClick={Refresh}><FiRefreshCcw/></button> 
     </aside>
    </>
  );
};

export default Right;
