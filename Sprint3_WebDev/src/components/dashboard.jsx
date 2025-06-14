import '../styles/dashboard.css'
function Dashboard(){
    return(
        <>
        <div className="container">
            <div className="title">
                <h1>Dashboard de Controle</h1>
            </div>
            <div className="quadro">
                <div className="nav">
                    
                    <label htmlFor="local-select">Local: </label>
                    <select name="models" id="local-select">
                    <optgroup>
                        <option value="">Ambulatório 1</option>
                    </optgroup>
                    <optgroup>
                        <option value="gemini-2.5-pro-preview-05-06">Ambulatório 2</option>
                    </optgroup>
                    <optgroup>
                        <option value="gemini-2.5-pro-preview-05-06">Ambulatório 3</option>
                    </optgroup>
                    
                    </select>
                     
                     <label htmlFor="cam-select">Câmera: </label>
                    <select name="models" id="cam-select">
                    <optgroup>
                        <option value="">Câmera 1</option>
                    </optgroup>
                    <optgroup>
                        <option value="gemini-2.5-pro-preview-05-06">Câmera 2</option>
                    </optgroup>
                    <optgroup>
                        <option value="gemini-2.5-pro-preview-05-06">Câmera 3</option>
                    </optgroup>
                
                    </select>

                     <label htmlFor="medicine-select">Medicamento: </label>
                    <select name="models" id="medicine-select">
                    <optgroup>
                        <option value="">Dorflex</option>
                    </optgroup>
                    <optgroup>
                        <option value="gemini-2.5-pro-preview-05-06">Dipirona</option>
                    </optgroup>
                    <optgroup>
                        <option value="gemini-2.5-pro-preview-05-06">Buscopan</option>
                    </optgroup>
                
                    </select>

                    

                    
                </div>
                <div className="result">
                        
                    </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;