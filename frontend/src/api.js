import { getToken } from "./auth.js";

const API_URL = "http://127.0.0.1:8000/tarefas";

function getHeaders() {
    const token = getToken();

    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
    };
}

async function handleResponse(res) {
    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login.html";
        return;
    }

    return res.json();
}

export async function getTarefas() {
    const res = await fetch(API_URL, {
        headers: getHeaders()
    });
    return handleResponse(res);
}

export async function criarTarefaAPI(texto) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ texto })
    });

    return handleResponse(res);
}

export async function toggleTarefaAPI(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders()
    });

    return handleResponse(res);
}

export async function deletarTarefaAPI(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    return handleResponse(res);
}