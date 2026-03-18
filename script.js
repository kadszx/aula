
class ComponenteMonitor {
    constructor(idElemento) {
        this.elemento = document.getElementById(idElemento);
    }
}


class CardHardware extends ComponenteMonitor {
   
    atualizarInterface(valor, tipo) {
        const span = this.elemento.querySelector('span');
        if (span) span.innerText = valor;

       
        const ehCritico = (tipo === 'temp' && valor > 75) || (tipo === 'cpu' && valor > 90);
        
        if (ehCritico) {
            this.elemento.classList.add('alerta-critico');
        } else {
            this.elemento.classList.remove('alerta-critico');
        }
    }
}


const cards = {
    cpu: new CardHardware('cpu-card'),
    ram: new CardHardware('ram-card'),
    temp: new CardHardware('temp-card')
};


function fetchStatus() {
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            cards.cpu.atualizarInterface(data.cpu, 'cpu');
            cards.ram.atualizarInterface(data.ram, 'ram');
            cards.temp.atualizarInterface(data.temp, 'temp');
        })
        .catch(err => console.error("Erro ao buscar dados:", err));
}

setInterval(fetchStatus, 2000);
fetchStatus(); 