"use strict";
let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let urgencia = document.getElementById('check');
let buttonElement = document.querySelector("#app button");
let listaTarefa = localStorage.getItem("@listagem_tarefas");
let tarefas = listaTarefa !== null && JSON.parse(listaTarefa) || [];
let tarefasUrgentes = listaTarefa !== null && JSON.parse(listaTarefa) || [];
function listaTarefas() {
    listElement.innerHTML = "";
    tarefasUrgentes.map(valor => {
        let toDoElement = document.createElement("li");
        let tarefaText = document.createTextNode(valor);
        toDoElement.setAttribute("style", "color: red");
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        let posicao_urgentes = tarefasUrgentes.indexOf(valor);
        linkElement.setAttribute("onclick", `deletarTarefaUrgente(${posicao_urgentes})`);
        linkElement.setAttribute("style", "margin-left:15px");
        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);
        toDoElement.appendChild(tarefaText);
        toDoElement.appendChild(linkElement);
        listElement.appendChild(toDoElement);
    });
    tarefas.map(item => {
        let toDoElement = document.createElement("li");
        let tarefaText = document.createTextNode(item);
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        let posicao = tarefas.indexOf(item);
        linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);
        linkElement.setAttribute("style", "margin-left:15px");
        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);
        toDoElement.appendChild(tarefaText);
        toDoElement.appendChild(linkElement);
        listElement.appendChild(toDoElement);
    });
}
listaTarefas();
function adicionaTarefa() {
    if (inputElement.value === "") {
        alert("Ainda há algo faltando...");
        return false;
    }
    else {
        let tarefaDigitada = inputElement.value;
        if (urgencia.checked)
            tarefasUrgentes.push(tarefaDigitada);
        else
            tarefas.push(tarefaDigitada);
        inputElement.value = "";
        listaTarefas();
        salvarDados();
    }
}
buttonElement.onclick = adicionaTarefa;
function deletarTarefa(posicao) {
    tarefas.splice(posicao, 1);
    listaTarefas();
    salvarDados();
}
function deletarTarefaUrgente(posicao) {
    tarefasUrgentes.splice(posicao, 1);
    listaTarefas();
    salvarDados();
}
function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefasUrgentes));
}
