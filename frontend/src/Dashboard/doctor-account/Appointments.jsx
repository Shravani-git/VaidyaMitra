import DataTable from "../../componenets/Doctors/DataTable";
import { columns } from "../../componenets/Doctors/TableColumn";
import StatCard from "../../componenets/Doctors/StatCard";

const Appointments=(doctorData)=> {
   console.log("doctorData:", doctorData);
  
    return (
     
      <div className="mx-auto flex max-w-7xl flex-col  p-4">
         
       < div>
        <main >
        

          <DataTable columns={columns} data={doctorData?.doctorData?.bookedSlots} doctorId={doctorData?.doctorData?._id} />        </main>
        </div>
         
      </div>
    );
  }
    

export default Appointments;