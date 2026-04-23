const template = document.getElementById("taskTemplate");

export function renderizar(list, tarefas, handlers) {
    list.innerHTML = "";

    if (tarefas.length === 0) {
        list.innerHTML = "<p>Nenhuma tarefa encontrada</p>";
        return;
    }

    tarefas.forEach(tarefa => {
        const clone = template.content.cloneNode(true);

        const li = clone.querySelector("li");
        const texto = clone.querySelector("span");
        const botoes = clone.querySelectorAll(".actions span");

        texto.textContent = tarefa.texto;

        if (tarefa.concluida) {
            li.classList.add("completed");
        }

        // ✔ concluir
        botoes[0].addEventListener("click", () => {
            handlers.onToggle(tarefa.id);
        });

        // 🗑 deletar
        botoes[1].addEventListener("click", () => {
            handlers.onDelete(tarefa.id);
        });

        list.appendChild(clone);
    });
}