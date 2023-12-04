// import React, { useEffect, useState } from "react";
// import { VIEW_ALL_EXAMROOM } from "assets/api";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { VIEW_ALL_EXAMROOM } from "assets/api";
import { Card } from "primereact/card";
import { format } from "date-fns";

function ViewSchedule() {
  const [dataExamRoom, setDataExamRoom] = useState([]);


  useEffect(() => {
    const getAllExamRoom = async () => {
      try {
        const { url, options } = VIEW_ALL_EXAMROOM();
        const response = await fetch(url, options);
        const json = await response.json();

        // Sort the data by the "startTime" field in ascending order
        const sortedData = json.result.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );

        setDataExamRoom(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllExamRoom();
    console.log(dataExamRoom);
  }, []);

  return (
    <div className="view-schedule-container mt-6 max-w-screen-lg mx-auto" style={{display: "flex", flexWrap: "wrap"}}>
      {dataExamRoom.map((rowData, index) => (
        <Card key={index} style={{width: "250px", margin: "10px"}} >
          <div className="p-grid p-align-center">
            <div className="p-col-2">
              <span className="font-semibold">{index + 1}</span>
            </div>
            <div className="p-col">
              <span className="font-semibold">{rowData.subjectCode}</span>
            </div>
            <div className="p-col">
              <span>{rowData.subjectName}</span>
            </div>
            <div className="p-col">
              <span className="font-semibold">
                {format(new Date(rowData.startTime), "dd/MM/yyyy")}
              </span>
            </div>
            <div className="p-col">
              <span className="font-semibold">
                {`${format(new Date(rowData.startTime), "HH:mm")} - ${format(
                  new Date(rowData.endTime),
                  "HH:mm"
                )}`}
              </span>
            </div>
            <div className="p-col">
              <span>{rowData.classRoom}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}


export default ViewSchedule;
