import { getTarefas, criarTarefaAPI, toggleTarefaAPI, deletarTarefaAPI } from "./api.js";
import { renderizar } from "./ui.js";
import { getToken } from "./auth.js";

if (!getToken()) {
    window.location.href = "/login.html";
}

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("taskCounter");
const filterButtons = document.querySelectorAll(".filters button");

let tarefas = [];

async function init() {
    tarefas = await getTarefas();
    atualizar();
}
document.getElementById("addTaskBtn").onclick = async () => {
    const texto = input.value.trim();
    if (!texto) return;

    await criarTarefaAPI(texto);

    input.value = "";
    tarefas = await getTarefas();
    atualizar();
};

let filtroAtual = "todas";

// FILTRO
function filtrar(tarefas) {
    if (filtroAtual === "pendentes") {
        return tarefas.filter(t => !t.concluida);
    }
    if (filtroAtual === "concluidas") {
        return tarefas.filter(t => t.concluida);
    }
    return tarefas;
}

filterButtons.forEach(btn => {
    btn.onclick = () => {
        filtroAtual = btn.dataset.filter;

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        atualizar();
    };
});
filterButtons[0].classList.add("active");

// ATUALIZAR (CORE DO APP)
function atualizar() {
    const tarefasFiltradas = filtrar(tarefas);

    renderizar(list, tarefasFiltradas, {
        onToggle: async (id) => {
            await toggleTarefaAPI(id);
            tarefas = await getTarefas();
            atualizar();
        },
        onDelete: async (id) => {
            await deletarTarefaAPI(id);
            tarefas = await getTarefas();
            atualizar();
        
        }
    });
    atualizarContador();
}
init();

// CONTADOR
function atualizarContador() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;

    counter.textContent = `Total: ${total} | Concluídas: ${concluidas}`;
}

// EVENTOS
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("addTaskBtn").click();
    }
});
import { logout } from "./auth.js";

document.getElementById("logoutBtn").onclick = () => {
    logout();
    window.location.href = "login.html";
};