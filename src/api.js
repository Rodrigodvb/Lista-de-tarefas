const API_URL = "http://127.0.0.1:8000/tarefas";

export async function getTarefas() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function criarTarefaAPI(texto) {
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ texto })
    });
}

export async function toggleTarefaAPI(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT"
    });
}

export async function deletarTarefaAPI(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}