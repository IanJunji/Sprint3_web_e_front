import "../styles/dashboard.scss";
// import estoque from "../data/estoque.json"; // <<< MUDANÇA: Não vamos mais importar dados estáticos
import { useState, useEffect } from "react";

function Dashboard() {
  // --- Estados Principais ---

  // Estado para armazenar a lista "mestra" de itens vinda da API
  const [masterEstoque, setMasterEstoque] = useState([]); 
  
  // Estado para os itens filtrados e ordenados que serão exibidos na tabela
  const [filteredItems, setFilteredItems] = useState([]);
  
  // Estados para o formulário da API e controle de UI
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para filtros e ordenação
  const [filters, setFilters] = useState({
    local: "",
    busca: "",
  });
  
  const [sortConfig, setSortConfig] = useState({
    key: "nome",
    direction: "ascending"
  });

  // --- Cálculos e Valores Derivados ---

  // Calcula os totais e locais dinamicamente a partir dos dados da API
  const totalItens = filteredItems.length;
  const totalQuantidade = filteredItems.reduce((sum, item) => sum + parseInt(item.quantidade || 0), 0);
  const locais = [...new Set(masterEstoque.map((item) => item.gaveta))];

  // --- Efeitos (useEffect) ---

  // Efeito para aplicar filtros e ordenação SEMPRE que a lista mestra ou os filtros mudarem
  useEffect(() => {
    // Começa com a lista mestra atual (que pode estar vazia ou populada pela API)
    let result = [...masterEstoque]; 
    
    // Aplicar filtros
    if (filters.local) {
      result = result.filter(item => item.gaveta === filters.local);
    }
    
    if (filters.busca) {
      const buscaLower = filters.busca.toLowerCase();
      result = result.filter(item => 
        item.nome.toLowerCase().includes(buscaLower) ||
        item.gaveta.toLowerCase().includes(buscaLower)
      );
    }
    
    // Aplicar ordenação
    if (sortConfig.key) {
      result.sort((a, b) => {
        // Trata a quantidade como número para ordenação correta
        const valA = sortConfig.key === 'quantidade' ? parseInt(a[sortConfig.key]) : a[sortConfig.key];
        const valB = sortConfig.key === 'quantidade' ? parseInt(b[sortConfig.key]) : b[sortConfig.key];

        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredItems(result);
  }, [filters, sortConfig, masterEstoque]); // <<< MUDANÇA: Depende agora da masterEstoque

  // --- Funções Handler ---

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: 
        prevConfig.key === key && prevConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending'
    }));
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'sortable';
    return sortConfig.direction === 'ascending' ? 'sort-asc' : 'sort-desc';
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Por favor, insira um URL de imagem válido.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Usando o proxy configurado no Vite
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl })
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar a imagem na API.');
      }
      
      // Valida se a resposta é um array, como esperado
      if (!Array.isArray(data)) {
        throw new Error("A resposta da API não retornou um formato de dados válido.");
      }

      // <<< MUDANÇA CRÍTICA: Atualiza a lista mestra, não a filtrada
      setMasterEstoque(data);
      setImageUrl(''); // Limpa o campo após o sucesso
      
    } catch (err) {
      console.error('Erro ao enviar imagem:', err);
      setError(`Falha na comunicação com a API: ${err.message}`);
      setMasterEstoque([]); // Limpa dados antigos em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  // --- Renderização ---

  return (
    <div className="spreadsheet-container">
      <h1>Controle de Estoque</h1>
      
      {/* Formulário de envio de imagem (sempre visível) */}
      <div className="api-form-container">
        <form onSubmit={handleImageSubmit} className="api-form">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Cole o URL da imagem aqui..."
            className="search-input"
            disabled={isLoading}
          />
          <button type="submit" className="api-button" disabled={isLoading}>
            {isLoading ? 'Analisando...' : 'Analisar Imagem'}
          </button>
        </form>
        {error && <div className="api-message error">{error}</div>}
      </div>

      {/* Renderização condicional do Dashboard */}
      {/* O dashboard só aparece se houver itens na lista mestra */}
      {masterEstoque.length > 0 ? (
        <>
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
            <input
              type="text"
              name="busca"
              value={filters.busca}
              onChange={handleFilterChange}
              placeholder="Buscar por nome ou localização..."
              className="search-input"
            />
            <select
              name="local"
              value={filters.local}
              onChange={handleFilterChange}
              className="select-input"
            >
              <option value="">Todas as Gavetas</option>
              {locais.map((local) => (
                <option key={local} value={local}>
                  {local.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Tabela de Dados */}
          <div className="spreadsheet">
            <table>
              <thead>
                <tr>
                  <th className={getSortIcon('nome')} onClick={() => handleSort('nome')}>
                    Item <span className="sort-indicator"></span>
                  </th>
                  <th className={getSortIcon('quantidade')} onClick={() => handleSort('quantidade')}>
                    Quantidade <span className="sort-indicator"></span>
                  </th>
                  <th className={getSortIcon('gaveta')} onClick={() => handleSort('gaveta')}>
                    Localização <span className="sort-indicator"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <tr key={`${item.nome}-${index}`}>
                      <td>{item.nome}</td>
                      <td className="number">{item.quantidade}</td>
                      <td className="capitalize">{item.gaveta.replace(/_/g, " ")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-results">
                      Nenhum item encontrado com os filtros atuais.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Mensagem inicial antes de qualquer dado ser carregado
        !isLoading && !error && (
            <div className="initial-message">
                <p>Para começar, envie o URL de uma imagem para análise.</p>
            </div>
        )
      )}
    </div>
  );
}

export default Dashboard;