// Espera o HTML carregar completamente para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS DOS EVENTOS ---
    const eventos = [
        { nome: 'Conselho de Classe', data: '2025-12-05', descricao: 'Reunião dos professores para fechamento das notas.' },
        { nome: 'Feira do Empredorismo', data: '2025-11-29', descricao: ''},
        { nome: 'Feira de Matheus Ganem', data: '2025-11-11', descricao: 'Alunos dos 3⁰ Ano de Informática.' },
        { nome: 'Feira de Matheus Ganem', data: '2025-11-12', descricao: 'Alunos dos 2⁰ de Informática.' },
        { nome: 'Espotec', data: '2025-12-05', descricao: ''},
        { nome: 'Jornada Pedagógica', data: '2025-02-03', descricao: ''},
        { nome: 'Projeto Artísticos Culturais', data: '2025-06-02', descricao: 'Primeiras Semanas.' },
        { nome: 'Projetos Artísticos Culturais', data: '2025-07-01', descricao: 'Continuação Dos Projetos Artísticos culturais.' },
        // CORREÇÃO DE DIGITAÇÃO: "Projetoa" corrigido para "Projetos"
        { nome: 'Projetos Artísticos Culturais', data: '2025-08-04', descricao: 'Continuação Dos Projetos artísticos culturais.' },
        { nome: 'Sao João', data: '2025-06-18', descricao: 'Festa do são João, comidas Típicas e Apresentação da Quadrilha.' },
        { nome: 'Matriculas', data: '2025-11-24', descricao: 'Ultimas Semanas de Novembro até o meio de Dezembro.' },
        { nome: 'Inicio Das aulas', data: '2025-02-10', descricao: 'Inicio Das aulas.' },
        { nome: 'Interclasse', data: '2025-06-16', descricao: 'Inicio dos Jogos.' },
        { nome: 'Interclasse', data: '2025-06-18', descricao: 'Continuação Dos Jogos' },
        { nome: 'Setembro Amarelo', data: '2025-09-01', descricao: 'Projeto Da Área Da Saude e Projeto Da Área De Linguagem.' }
    ];

    // --- SELEÇÃO DOS ELEMENTOS DO HTML ---
    const meses = document.querySelectorAll('.mes');
    const listaEventosDiv = document.getElementById('lista-eventos');

    // --- FUNÇÕES ---

    /**
     * **FUNÇÃO CORRIGIDA**
     * Cria um objeto Date em UTC a partir de uma string 'YYYY-MM-DD' para evitar erros de fuso horário.
     * @param {string} dateString - A data no formato 'YYYY-MM-DD'.
     * @returns {Date}
     */
    function parseDateAsUTC(dateString) {
        const parts = dateString.trim().split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Mês é 0-indexado (0 = Janeiro)
        const day = parseInt(parts[2], 10);
        return new Date(Date.UTC(year, month, day));
    }

    /**
     * Filtra e ordena os eventos para um mês específico.
     * @param {string} numeroMes - O número do mês (1 a 12).
     */
    function exibirEventosDoMes(numeroMes) {
        const mesInt = parseInt(numeroMes);

        const eventosDoMes = eventos
          .filter(evento => {
                const dataDoEvento = parseDateAsUTC(evento.data);
                // getUTCMonth() retorna 0-11, por isso somamos 1.
                return dataDoEvento.getUTCMonth() + 1 === mesInt;
            })
          .sort((a, b) => {
                // Ordena os eventos pela data
                return parseDateAsUTC(a.data) - parseDateAsUTC(b.data);
            });

        renderizarEventos(eventosDoMes);
    }

    /**
     * Cria o HTML para a lista de eventos e o insere na página.
     * @param {Array} eventosDoMes - A lista de eventos filtrada e ordenada.
     */
    function renderizarEventos(eventosDoMes) {
        listaEventosDiv.innerHTML = '';

        if (eventosDoMes.length === 0) {
            listaEventosDiv.innerHTML = '<p>Nenhum evento agendado para este mês.</p>';
            return;
        }

        eventosDoMes.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.className = 'evento-item';

            const nomeH3 = document.createElement('h3');
            nomeH3.textContent = evento.nome.trim();

            const dataP = document.createElement('p');
            const dataObj = parseDateAsUTC(evento.data);
            
            // Usamos os métodos UTC para garantir que a data exibida seja a correta.
            const dia = String(dataObj.getUTCDate()).padStart(2, '0');
            const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
            const ano = dataObj.getUTCFullYear();
            dataP.textContent = `Data: ${dia}/${mes}/${ano}`;

            const descricaoP = document.createElement('p');
            descricaoP.textContent = evento.descricao.trim();

            eventoDiv.appendChild(nomeH3);
            eventoDiv.appendChild(dataP);
            eventoDiv.appendChild(descricaoP);

            listaEventosDiv.appendChild(eventoDiv);
        });
    }

    // --- EVENT LISTENERS (OUVINTES DE EVENTOS) ---
    meses.forEach(mes => {
        mes.addEventListener('click', (event) => {
            meses.forEach(m => m.classList.remove('ativo'));
            const mesClicado = event.currentTarget;
            mesClicado.classList.add('ativo');
            const mesSelecionado = mesClicado.dataset.month;
            exibirEventosDoMes(mesSelecionado);
        });
    });
});
