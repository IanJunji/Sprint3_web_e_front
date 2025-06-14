import "../styles/dashboard.scss";
import estoque from "../data/estoque.json";
import { useState } from "react";

function Dashboard() {
  const [filters, setFilters] = useState({
    local: "",
    medicamento: "",
  });

  const [filteredItems, setFilteredItems] = useState(estoque);

  // Get unique values for filters
  const locais = [...new Set(estoque.map((item) => item.gaveta))];
  const medicamentos = [...new Set(estoque.map((item) => item.nome))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(newFilters);

    // Apply filters
    const filtered = estoque.filter((item) => {
      const matchesLocal =
        !newFilters.local || item.gaveta === newFilters.local;
      const matchesMedicamento =
        !newFilters.medicamento ||
        item.nome.toLowerCase().includes(newFilters.medicamento.toLowerCase());
      return matchesLocal && matchesMedicamento;
    });

    setFilteredItems(filtered);
  };

  return (
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
      </div>

      <div className="spreadsheet">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantidade</th>
              <th>Localização</th>
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
