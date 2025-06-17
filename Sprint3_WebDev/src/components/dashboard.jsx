import "../styles/dashboard.scss";
import estoque from "../data/estoque.json";
import { useState, useEffect } from "react";

function Dashboard() {
  // Estado para controle de erros
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  
  // Verificador de erros no ciclo de vida do componente
  useEffect(() => {
    const errorHandler = (error) => {
      console.error('Erro capturado:', error);
      setHasError(true);
      setError(error.toString());
    };
    
    // Captura erros de renderização
    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  if (hasError) {
    return (
      <div className="error-container">
        <h2>Ocorreu um erro ao carregar o dashboard</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Recarregar Página</button>
      </div>
    );
  }
  // Estados para filtros e ordenação
  const [filters, setFilters] = useState({
    local: "",
    busca: "",
  });
  
  const [sortConfig, setSortConfig] = useState({
    key: "nome",
    direction: "ascending"
  });

  // Estados para itens e totais
  const [filteredItems, setFilteredItems] = useState(estoque);
  const [totalItens, setTotalItens] = useState(0);
  const [totalQuantidade, setTotalQuantidade] = useState(0);
  
  // Estado para upload de imagem
  const [imageUrl, setImageUrl] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  // Valores únicos para os filtros
  const locais = [...new Set(estoque.map((item) => item.gaveta))];
  
  // Efeito para aplicar filtros e calcular totais
  useEffect(() => {
    let result = [...estoque];
    
    // Aplicar filtros
    if (filters.local) {
      result = result.filter(item => item.gaveta === filters.local);
    }
    
    if (filters.busca) {
      const busca = filters.busca.toLowerCase();
      result = result.filter(item => 
        item.nome.toLowerCase().includes(busca) ||
        item.gaveta.toLowerCase().includes(busca)
      );
    }
    
    // Aplicar ordenação
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    // Atualizar totais
    setTotalItens(result.length);
    setTotalQuantidade(result.reduce((sum, item) => sum + parseInt(item.quantidade), 0));
    
    setFilteredItems(result);
  }, [filters, sortConfig]);
  
  // Função para lidar com a ordenação
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: 
        prevConfig.key === key && prevConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending'
    }));
  };
  
  // Função para obter a classe de ordenação
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'sortable';
    return sortConfig.direction === 'ascending' ? 'sort-asc' : 'sort-desc';
  };
  
  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para lidar com o envio da imagem para a API
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setApiMessage('Por favor, insira um URL de imagem válido');
      return;
    }
    
    try {
      setApiMessage('Enviando imagem...');
      
      // Usando o proxy configurado no Vite
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ image_url: imageUrl })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao processar a imagem');
      }
      
      const data = await response.json();
      setApiMessage('Imagem processada com sucesso!');
      
      // Se a API retornar uma nova lista de itens, atualizamos o estado
      if (Array.isArray(data)) {
        setFilteredItems(data);
        // Atualizar outros estados conforme necessário
      } else if (data.items && Array.isArray(data.items)) {
        setFilteredItems(data.items);
        // Atualizar outros estados conforme necessário
      }
      
      // Limpar o campo de URL após o envio bem-sucedido
      setImageUrl('');
      
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      setApiMessage(`Erro: ${error.message || 'Falha ao processar a imagem'}`);
    }
  };

  return (
    <div className="spreadsheet-container">
      <h1>Controle de Estoque</h1>
      
      {/* Seção de Totais */}
      <div className="totals-container">
        <div className="total-card">
          <span className="total-label">Itens Diferentes</span>
          <span className="total-value">{totalItens}</span>
        </div>
        <div className="total-card">
          <span className="total-label">Total de Itens</span>
          <span className="total-value">{totalQuantidade}</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            name="busca"
            value={filters.busca}
            onChange={handleFilterChange}
            placeholder="Buscar por nome ou localização..."
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select
            name="local"
            value={filters.local}
            onChange={handleFilterChange}
            className="select-input"
          >
            <option value="">Todas as Gavetas</option>
            {locais.map((local) => (
              <option key={local} value={local}>
                {local.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <form onSubmit={handleImageSubmit} className="api-form">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="URL da imagem..."
              className="search-input"
            />
            <button type="submit" className="api-button">
              Enviar Imagem
            </button>
          </form>
          {apiMessage && <div className="api-message">{apiMessage}</div>}
        </div>
      </div>

      <div className="spreadsheet">
        <table>
          <thead>
            <tr>
              <th 
                className={getSortIcon('nome')}
                onClick={() => handleSort('nome')}
              >
                Item
                <span className="sort-indicator"></span>
              </th>
              <th 
                className={getSortIcon('quantidade')}
                onClick={() => handleSort('quantidade')}
              >
                Quantidade
                <span className="sort-indicator"></span>
              </th>
              <th 
                className={getSortIcon('gaveta')}
                onClick={() => handleSort('gaveta')}
              >
                Localização
                <span className="sort-indicator"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td className="number">{item.quantidade}</td>
                  <td className="capitalize">
                    {item.gaveta.replace("_", " ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  Nenhum item encontrado com os filtros atuais
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
