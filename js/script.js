// Espera o HTML carregar completamente para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS DOS EVENTOS ---
    // Este é o seu "banco de dados". Adicione ou edite os eventos aqui.
    // A lista de eventos DEVE estar dentro de colchetes [ ]
    const eventos = [{ nome: 'Conselho de Classe', data: '2025-12-05', descricao: 'Reunião dos professores para fechamento das notas.' }];

    // --- SELEÇÃO DOS ELEMENTOS DO HTML ---
    const meses = document.querySelectorAll('.mes');
    const listaEventosDiv = document.getElementById('lista-eventos');

    // --- FUNÇÕES ---

    /**
     * Filtra e ordena os eventos para um mês específico.
     * @param {string} numeroMes - O número do mês (1 a 12).
     */
    function exibirEventosDoMes(numeroMes) {
        const mesInt = parseInt(numeroMes);

        const eventosDoMes = eventos
          .filter(evento => {
                const dataDoEvento = new Date(evento.data);
                // getMonth() retorna 0-11, por isso somamos 1.
                return dataDoEvento.getMonth() + 1 === mesInt;
            })
          .sort((a, b) => {
                // Ordena os eventos pela data
                return new Date(a.data) - new Date(b.data);
            });

        renderizarEventos(eventosDoMes);
    }

    /**
     * Cria o HTML para a lista de eventos e o insere na página.
     * @param {Array} eventosDoMes - A lista de eventos filtrada e ordenada.
     */
    function renderizarEventos(eventosDoMes) {
        // 1. Limpa o conteúdo anterior
        listaEventosDiv.innerHTML = '';

        // 2. Verifica se há eventos para exibir
        if (eventosDoMes.length === 0) {
            listaEventosDiv.innerHTML = '<p>Nenhum evento agendado para este mês.</p>';
            return; // Encerra a função
        }

        // 3. Cria e anexa os novos elementos de evento
        eventosDoMes.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.className = 'evento-item';

            const nomeH3 = document.createElement('h3');
            nomeH3.textContent = evento.nome;

            const dataP = document.createElement('p');
            // Formata a data para um formato amigável (DD/MM/YYYY)
            const dataObj = new Date(evento.data);
            const dia = String(dataObj.getUTCDate()).padStart(2, '0');
            const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
            const ano = dataObj.getUTCFullYear();
            dataP.textContent = `Data: ${dia}/${mes}/${ano}`;

            const descricaoP = document.createElement('p');
            descricaoP.textContent = evento.descricao;

            eventoDiv.appendChild(nomeH3);
            eventoDiv.appendChild(dataP);
            eventoDiv.appendChild(descricaoP);

            listaEventosDiv.appendChild(eventoDiv);
        });
    }

    // --- EVENT LISTENERS (OUVINTES DE EVENTOS) ---

    // Adiciona um 'ouvinte de clique' para cada um dos meses
    meses.forEach(mes => {
        mes.addEventListener('click', (event) => {
            // Remove a classe 'ativo' de todos os meses
            meses.forEach(m => m.classList.remove('ativo'));

            // Adiciona a classe 'ativo' apenas ao mês que foi clicado
            const mesClicado = event.currentTarget;
            mesClicado.classList.add('ativo');

            // Pega o número do mês do atributo 'data-month'
            const mesSelecionado = mesClicado.dataset.month;
            
            // Chama a função para exibir os eventos
            exibirEventosDoMes(mesSelecionado);
        });
    });
});