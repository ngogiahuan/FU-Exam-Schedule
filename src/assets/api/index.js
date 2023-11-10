const API_URL = "https://swp3191.onrender.com/";
export function DELETE_SLOT(id) {
  return {
    url: `${API_URL}examSlot/${id}`,
    options: {
      method: "DELETE",
    },
  };
}
