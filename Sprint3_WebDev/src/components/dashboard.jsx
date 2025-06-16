import "../styles/dashboard.scss";
import estoque from "../data/estoque.json";
import { useState, useEffect, useMemo } from "react";
import Upload from "./upload";

function Dashboard() {
  const [filters, setFilters] = useState({
    local: "",
    medicamento: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filteredItems, setFilteredItems] = useState(estoque);

  // Get unique values for filters
  const locais = useMemo(() => [...new Set(estoque.map((item) => item.gaveta))], []);
  const medicamentos = useMemo(() => [...new Set(estoque.map((item) => item.nome))], []);

  // Calculate total items
  const totalItems = useMemo(() => filteredItems.length, [filteredItems]);
  const totalQuantity = useMemo(() => 
    filteredItems.reduce((sum, item) => sum + item.quantidade, 0), 
    [filteredItems]
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let result = estoque;

    // Apply filters
    if (filters.local) {
      result = result.filter(item => item.gaveta === filters.local);
    }
    if (filters.medicamento) {
      result = result.filter(item => 
        item.nome.toLowerCase().includes(filters.medicamento.toLowerCase())
      );
    }
    if (searchTerm) {
      result = result.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.gaveta.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredItems(result);
  }, [filters, searchTerm, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className="dashboard-layout">
      <div className="spreadsheet-container">
        <h1>Controle de Estoque</h1>

        <div className="filters">
          <div className="filter-group">
            <select
              name="local"
              value={filters.local}
              onChange={handleFilterChange}
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
            <select
              name="medicamento"
              value={filters.medicamento}
              onChange={handleFilterChange}
            >
              <option value="">Todos os Itens</option>
              {medicamentos.map((med) => (
                <option key={med} value={med}>
                  {med}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <input
              type="text"
              placeholder="Buscar por nome ou localização..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-label">Total de Itens:</span>
            <span className="stat-value">{totalItems}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Quantidade Total:</span>
            <span className="stat-value">{totalQuantity}</span>
          </div>
        </div>

        <div className="spreadsheet">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('nome')} className="sortable">
                  Item {getSortIcon('nome')}
                </th>
                <th onClick={() => handleSort('quantidade')} className="sortable">
                  Quantidade {getSortIcon('quantidade')}
                </th>
                <th onClick={() => handleSort('gaveta')} className="sortable">
                  Localização {getSortIcon('gaveta')}
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

      <Upload />
    </div>
  );
}

export default Dashboard;
