/*
Lista de tarefas
[x] Saber quando o botão for clicado
[x] Pegar o valor do input
[x] Criar um elemento li
[x] Colocar o valor do input dentro do li
[x] Colocar o li dentro da ul
*/
function adicionarTarefa(){
    let valorDoInput = document.querySelector("input").value

    let li = document.createElement("li")
    li.innerHTML = valorDoInput + "<span onclick='deletarTarefa(this)'>❌</span>"

    document.querySelector("ul").appendChild(li)
   
    document.querySelector("input").value = ""
}

function deletarTarefa(li){
    li.parentElement.remove()
}