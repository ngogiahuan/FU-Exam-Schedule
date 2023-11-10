const API_URL = "https://swp3191.onrender.com/";
export function DELETE_SLOT(id) {
  return {
    url: `${API_URL}examSlot/${id}`,
    options: {
      method: "DELETE",
    },
  };
}

export function GET_ALL_EXAMNIER() {
  return {
    url: `${API_URL}examiner`,
    options: {
      method: "GET",
    },
  };
}

export function LOGIN_API(mail) {
  return {
    url: `${API_URL}auth/login`,
    options: {
      method: "POST",
    },
    body: JSON.stringify(mail),
  };
}

export function GET_ALL_EXAM_SCHEDULE() {
  return {
    url: `${API_URL}exam-schedule`,
    options: {
      method: "GET",
    },
  };
}

export function REGISTER_EXAM_SCHEDULE(examinerID, examSlotID) {
  return {
    url: `${API_URL}register`,
    options: {
      method: "POST",
    },
    body: JSON.stringify({ examinerID: examinerID, examSlotID: examSlotID }),
  };
}

export function DELETE_EXAMSLOT_BY_ID(id) {
  return {
    url: `${API_URL}examSlot/${id}`,
    options: {
      method: "DELETE",
    },
  };
}

export function GET_ALL_EXAMROOM() {
  return {
    url: `${API_URL}examRoom`,
    options: {
      method: "GET",
    },
  };
}

export function GET_ALL_EXAMSLOT() {
  return {
    url: `${API_URL}examSlot`,
    options: {
      method: "GET",
    },
  };
}

// API EXPORT FILE EXCEL
export function EXPORT_FILE_EXCEL() {
  return {
    url: `${API_URL}api/excel/depart-examiner/download`,
    options: {
      method: "GET",
    },
  };
}

// Student Route
export function VIEW_ALL_EXAMROOM() {
  return {
    url: `${API_URL}student/viewExamSlot/all?StudentId=SE171018&&SemesterCode=Fall_2023`,
    options: {
      method: "GET",
    },
  };
}
