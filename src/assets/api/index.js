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

export function REGISTER_EXAM_SCHEDULE(body) {
  return {
    url: `${API_URL}register`,
    options: {
      method: "POST",
    },
    body: JSON.stringify(body),
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

// API EXPORT FILE EXCEL
export function EXPORT_FILE_EXCEL() {
  return {
    url: `${API_URL}api/excel/depart-examiner/download`,
    options: {
      method: "GET",
    },
  };
}
