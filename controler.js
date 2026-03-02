export const uselogin = (req, res) => {
  res.send("Login Page");
};

export const useregister = (req, res) => {
  res.send("Register Page");
};

export const getcars = (req, res) => {
  res.send("Cars Page");
};  
export const getcar = (req, res) => {
  const { id } = req.params;
  res.send(`Car Page with ID: ${id}`);
};
export const addcar = (req, res) => {
  res.send("Add Car Page");
};
export const updatecar = (req, res) => {
  res.send("Update Car Page");
};
export const deletecar = (req, res) => {
  res.send("Delete Car Page");
};
