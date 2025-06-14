function Dashboard(){
    return(
        <>
        <div className="container">
            <div className="title">
                <h1>Painel de Controle</h1>
            </div>
            <div className="quadro">
                <div className="nav">
                    <label for="model-select">Escolha um modelo:</label>

                    <select name="models" id="model-select">
                    <optgroup label="GEMINI 2.5">
                        <option value="gemini-2.5-pro-preview-06-05">Gemini 2.5 Pro Preview</option>
                    </optgroup>
                    <optgroup label="GEMINI 2.0">
                        <option value="gemini-2.5-pro-preview-05-06">Gemini 2.5 Pro Preview 05-06</option>
                    </optgroup>
                    <optgroup label="GEMMA">
                        
                    </optgroup>
                    <optgroup label="OTHER">
                        
                    </optgroup>
                    </select>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;