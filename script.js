const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

let tarefas = [];
// Adicionar tarefa
button.addEventListener("click", () => {
    const texto = input.value.trim();
    if (texto === "") return;
    const tarefa = {
        id:Date.now(),
        texto: texto,
        concluida: false
    };
    tarefas.push(tarefa);
    renderizarTarefas();
    input.value = "";
})

//Renderizar lista
function renderizarTarefas(){
    list.innerHTML = "";
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        if (tarefa.concluida) {
            li.classList.add("completed");
        }
        const spanTexto = document.createElement("span");
        spanTexto.textContent = tarefa.texto;

        // marcar como concluída
        spanTexto.addEventListener("click", () => {
            tarefa.concluida = !tarefa.concluida;
            renderizarTarefas();
        });
        const actions = document.createElement("div");
        actions.classList.add("actions");
        const btnDelete = document.createElement("span");
        btnDelete.textContent = "🗑";
        btnDelete.addEventListener("click", () => {
            tarefas = tarefas.filter(t => t.id !== tarefa.id);
            renderizarTarefas();
        });
        actions.appendChild(btnDelete);
        li.appendChild(spanTexto);
        li.appendChild(actions);
        list.appendChild(li);
    });
}

function salvarNoLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarDoLocalStorage() {
    const dados = localStorage. getItem("tarefas");
    if (dados) {
        tarefas = JSON.parse(dados);
        renderizarTarefas();
    }
}