const API_BASE = "http://127.0.0.1:8000";

let isLogin = true;

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const toggleMode = document.getElementById("toggleMode");
const title = document.getElementById("title");
const errorMsg = document.getElementById("errorMsg");

// 🔁 Alternar login/register
toggleMode.onclick = () => {
    isLogin = !isLogin;

    if (isLogin) {
        title.textContent = "Login";
        submitBtn.textContent = "Entrar";
        toggleMode.textContent = "Não tem conta? Registrar";
    } else {
        title.textContent = "Registro";
        submitBtn.textContent = "Registrar";
        toggleMode.textContent = "Já tem conta? Login";
    }

    errorMsg.textContent = "";
};

// 🚀 Enviar formulário
submitBtn.onclick = async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        errorMsg.textContent = "Preencha todos os campos";
        return;
    }

    const url = isLogin
        ? `${API_BASE}/auth/login`
        : `${API_BASE}/auth/register`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            errorMsg.textContent = data.detail || "Erro";
            return;
        }

        // 👉 LOGIN
        if (isLogin) {
            localStorage.setItem("token", data.access_token);

            // redireciona para app
            window.location.href = "index.html";
        } else {
            errorMsg.style.color = "green";
            errorMsg.textContent = "Conta criada! Faça login.";
        }

    } catch (err) {
        errorMsg.textContent = "Erro de conexão com servidor";
    }
};

// ENTER funciona também
passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        submitBtn.click();
    }
});