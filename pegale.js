document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const contador = document.querySelector('#contador');
    grid.innerHTML = '';
    let currentIndex = 0;
    
    function actualizarContador() {
        contador.textContent = `Topos: ${currentIndex}/30`;
    }

    function getRandomPosition(usedPositions) {
        let position;
        do {
            position = {
                row: Math.floor(Math.random() * 5) + 1,
                column: Math.floor(Math.random() * 6) + 1
            };
        } while (usedPositions.some(pos => 
            pos.row === position.row && pos.column === position.column
        ));
        return position;
    }

    function createBases() {
        grid.innerHTML = '';
        
        if (currentIndex < 30) {
            const numBases = Math.min(2 + currentIndex, 30);
            const bases = [];
            const usedPositions = [];
            let gameTimeout;

            // Crear bases sin topo primero
            for(let i = 0; i < numBases; i++) {
                const container = document.createElement('div');
                container.className = 'container';
                
                // Obtener una posición única
                const position = getRandomPosition(usedPositions);
                usedPositions.push(position);
                
                container.style.gridRow = position.row;
                container.style.gridColumn = position.column;
                
                const base = document.createElement('img');
                base.src = 'base.png';
                base.alt = 'base';
                base.className = 'base';
                
                container.appendChild(base);
                bases.push(container);
                grid.appendChild(container);
            }

            console.log(`Nivel ${currentIndex + 1}: ${numBases} bases`);

            // Esperar 1 segundo y luego mostrar el topo
            setTimeout(() => {
                const topoIndex = Math.floor(Math.random() * numBases);
                const topoContainer = bases[topoIndex];
                
                const topo = document.createElement('img');
                topo.src = 'cara.png';
                topo.alt = 'topo';
                topo.className = 'topo';
                
                topoContainer.appendChild(topo);

                // Temporizador para terminar el juego si no se hace clic (1 segundo)
                gameTimeout = setTimeout(() => {
                    grid.innerHTML = '';
                    const mensaje = document.createElement('div');
                    mensaje.textContent = '¡Juego Terminado!\nFuiste muy lento';
                    mensaje.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 2rem;
                        color: white;
                        background-color: rgba(0,0,0,0.8);
                        padding: 1rem 2rem;
                        border-radius: 1rem;
                        text-align: center;
                        white-space: pre-line;
                    `;
                    grid.appendChild(mensaje);
                }, 1000); // 1 segundo para hacer clic

                topoContainer.addEventListener('click', () => {
                    clearTimeout(gameTimeout); // Cancelar el temporizador al hacer clic
                    currentIndex++;
                    actualizarContador();
                    createBases();
                });
            }, 1000); // 1 segundo de espera inicial
        } else {
            const mensaje = document.createElement('div');
            mensaje.textContent = '¡Juego Terminado!';
            mensaje.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 2rem;
                color: white;
                background-color: rgba(0,0,0,0.8);
                padding: 1rem 2rem;
                border-radius: 1rem;
            `;
            grid.appendChild(mensaje);
        }
    }

    actualizarContador();
    createBases();
});