const listElement = document.querySelector('#app ul') as HTMLUListElement;
const inputElement = document.querySelector('#app input') as HTMLInputElement;
const buttonElement = document.querySelector('#app button') as HTMLElement;

const listaSalva: string | null = localStorage.getItem('@listagem_tarefas');
let tarefas: string[] = listaSalva ? JSON.parse(listaSalva) : [];

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

        todoElement.appendChild(tarefaText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
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

    listarTarefas();
    salvarDados();
}

function deletarTarefa(index: number): void {
    tarefas.splice(index, 1);
    listarTarefas();
    salvarDados();
}

function salvarDados(): void {
    localStorage.setItem('@listagem_tarefas', JSON.stringify(tarefas));
}

buttonElement.addEventListener('click', adicionarTarefa);
listarTarefas();
