const input = document.getElementById("tarefaInput");
const botao = document.getElementById("addBtn");
const lista = document.getElementById("listaTarefas");


function getTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {

  lista.innerHTML = "";
  const tarefas = getTarefas();

  tarefas.forEach((tarefa, index) => {

    const li = document.createElement("li");

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    li.textContent = tarefa.texto;

   
    const actions = document.createElement("div");
    actions.classList.add("actions");

  
    li.addEventListener("click", () => {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvarTarefas(tarefas);
      renderizar();
    });

    const editarBtn = document.createElement("button");
    editarBtn.textContent = "✏️";

    editarBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const novoTexto = prompt("Editar tarefa:", tarefa.texto);

      if (novoTexto) {
        tarefas[index].texto = novoTexto;
        salvarTarefas(tarefas);
        renderizar();
      }
    });

    const removerBtn = document.createElement("button");
    removerBtn.textContent = "🗑️";

    removerBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      tarefas.splice(index, 1);
      salvarTarefas(tarefas);
      renderizar();
    });

    actions.appendChild(editarBtn);
    actions.appendChild(removerBtn);

    li.appendChild(actions);
    lista.appendChild(li);
  });
}


botao.addEventListener("click", () => {

  const texto = input.value.trim();

  if (!texto) {
    alert("Digite uma tarefa!");
    return;
  }

  const tarefas = getTarefas();

  tarefas.push({
    texto,
    concluida: false
  });

  salvarTarefas(tarefas);

  input.value = "";
  renderizar();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    botao.click();
  }
});

renderizar();
