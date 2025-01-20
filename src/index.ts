const listElement = document.querySelector('#app ul') as HTMLUListElement;
const inputElement = document.querySelector('#app input') as HTMLInputElement;
const buttonElement = document.querySelector('#app button') as HTMLElement;

const listaSalva: string | null = localStorage.getItem('@listagem_tarefas');
let tarefas: string[] = listaSalva ? JSON.parse(listaSalva) : [];

function atualizarTarefas(){
    listarTarefas(); 
    salvarDados(); 
}

function listarTarefas(): void {
    listElement.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const todoElement = document.createElement('li');
        const tarefaText = document.createTextNode(tarefa);

        const linkElement = document.createElement('a');
        linkElement.href = '#';
        linkElement.textContent = 'Excluir';
        linkElement.style.marginLeft = "20px";
        linkElement.addEventListener('click', () => deletarTarefa(index));

        const editElement = document.createElement('a');
        editElement.href = '#';
        editElement.textContent = 'Editar';
        editElement.style.marginLeft = "20px";
        editElement.addEventListener('click', () => editarTarefas(todoElement, index));

        todoElement.appendChild(tarefaText);
        todoElement.appendChild(linkElement);
        todoElement.appendChild(editElement);
        listElement.appendChild(todoElement);
    });
}

function editarTarefas(tarefa: HTMLLIElement, index: number): void {
    const textoDaTarefa = tarefa.firstChild?.textContent as string;
    tarefa.textContent = '';

    const caixaDeEdicao = document.createElement('input');
    caixaDeEdicao.type = 'text';
    caixaDeEdicao.placeholder = "Editar tarefa...";
    tarefa.appendChild(caixaDeEdicao);

    const botaoDeConfirmar = document.createElement('a');
    botaoDeConfirmar.href = '#';
    botaoDeConfirmar.style.marginLeft = "20px";
    botaoDeConfirmar.textContent = 'Confirmar';

    const botaoDeCancelar = document.createElement('a');
    botaoDeCancelar.href = '#';
    botaoDeCancelar.style.marginLeft = "20px";
    botaoDeCancelar.textContent = 'Cancelar';

    tarefa.appendChild(botaoDeConfirmar);
    tarefa.appendChild(botaoDeCancelar);

    botaoDeConfirmar.addEventListener('click', () => {
        tarefas[index] = caixaDeEdicao.value; 
        atualizarTarefas(); 
    });

    botaoDeCancelar.addEventListener('click', () => {
        tarefa.textContent = textoDaTarefa;
        atualizarTarefas(); 
    });
}

function adicionarTarefa(): void {
    const tarefaDigitada = inputElement.value.trim();

    if (!tarefaDigitada) {
        alert('Digite alguma tarefa');
        return;
    }

    tarefas.push(tarefaDigitada);
    inputElement.value = '';

    atualizarTarefas();
}

function deletarTarefa(index: number): void {
    tarefas.splice(index, 1);
    atualizarTarefas();
}

function salvarDados(): void {
    localStorage.setItem('@listagem_tarefas', JSON.stringify(tarefas));
}

buttonElement.addEventListener('click', adicionarTarefa);
listarTarefas();
