// Função para registrar um novo usuário
export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Verifica se o email já existe
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email já cadastrado');
  }

  // Adiciona o novo usuário
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
};

// Função para fazer login
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Procura o usuário pelo email e senha
  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    // Salva o usuário logado
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  
  return false;
};

// Função para verificar se o usuário está logado
export const isLoggedIn = () => {
  return localStorage.getItem('currentUser') !== null;
};

// Função para fazer logout
export const logout = () => {
  localStorage.removeItem('currentUser');
}; 