import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useUser } from "../../components/share/UserContext";

function StudentModal({ examSlotID, examRoomID }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studentID, setStudentID] = useState("");
  const { user, flag, setFlag, URL } = useUser();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  //  Thêm student thủ công
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddStudent(studentID, examRoomID);
    onClose();
  };

  const handleAddStudent = async (studentID, examRoomID) => {
    try {
      const response = await axios.post(`${URL}/exam-room/add-student`, {
        studentID: studentID,
        examRoomID: examRoomID,
      });

      if (response.status === 200) {
        console.log(response.data);
        alert("Thêm sinh viên thành công");
        setFlag(!flag);
      } else {
        console.error("Server returned an error:", response.status);
        alert("Mã sinh viên không tồn tại hoặc đã có sẵn trong phòng thi");
      }
    } catch (error) {
      console.error("POST request error:", error.message);
      alert("Mã sinh viên không tồn tại hoặc đã có sẵn trong phòng thi");
    }
  };

  const uploadData = (importedData, examRoomID, examSlotID) => {
    // Create a FormData object and append the data and other fields to it
    const formData = new FormData();

    // Append the Excel data as a blob
    const blob = new Blob([stringifyData(importedData)], {
      type: "application/json",
    });
    formData.append("excelFile", blob);
    formData.append("examRoomID", examRoomID);
    formData.append("examSlotID", examSlotID);
    console.log(formData);
    axios
      .post(`${URL}/exam-room/import-excel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      })
      .then((response) => {
        console.log("Data uploaded successfully:", response.data);
        alert("Upload file thành công");
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
        alert("Upload file thất bại");
      });
  };

  function stringifyData(data) {
    return JSON.stringify(data);
  }
  return (
    <>
      <Button bgColor="orange" marginRight="2%" onClick={onOpen}>
        Thêm sinh viên
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Nhập thông tin sinh viên</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Mã sinh viên</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="StudentID"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Mã ca thi</FormLabel>
                <Input value={examSlotID} readOnly placeholder="Mã ca thi" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Mã phòng</FormLabel>
                <Input value={examRoomID} readOnly placeholder="Mã phòng" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Thêm
              </Button>
              <Button onClick={onClose}>Hủy</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default StudentModal;
