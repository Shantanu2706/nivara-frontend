export const getToken = () => {
  return localStorage.getItem("token");
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now(); // check expiry
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
}

export const formatDate = (dateString: string) => {
  if(dateString){
    return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
  }
  
};

export const formatValue = (value: any, type?: string) => {
  if (type === "boolean") return value ? "Yes" : "No";
  
  if (!value) return "N/A";

  if (type === "date") {
    return formatDate(value);
  }

  return value;
};