const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static('public'));


class HardwareEngine {
    constructor() {
        this.status = {
            cpu: 0,
            ram: 0,
            temp: 0
        };
    }

    gerarDadosRealistas() {
      
        this.status.cpu = Math.floor(Math.random() * 101); 
        this.status.ram = parseFloat((Math.random() * 16).toFixed(1)); 
        this.status.temp = Math.floor(Math.random() * (90 - 30 + 1)) + 30; 
        return this.status;
    }
}


app.get('/api/status', (req, res) => {
    const engine = new HardwareEngine();
    const dados = engine.gerarDadosRealistas();
    res.json(dados);
});

app.listen(PORT, () => {
    console.log(`🚀 SkyNode Server rodando em http://localhost:${PORT}`);
});