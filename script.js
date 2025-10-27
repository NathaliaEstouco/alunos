class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = parseInt(idade);
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome} (${this.curso}) - Nota: ${this.notaFinal}`;
  }
}

// --------------------- Lógica principal ---------------------
let alunos = [];
let editIndex = null;

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");

const renderTabela = () => {
  tabela.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>${aluno.isAprovado() ? "Aprovado" : "Reprovado"}</td>
      <td>
        <button class="btnEditar" data-index="${index}">Editar</button>
        <button class="btnExcluir" data-index="${index}">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  });

  document.querySelectorAll(".btnEditar").forEach(btn => {
    btn.addEventListener("click", function() {
      const index = this.getAttribute("data-index");
      editarAluno(index);
    });
  });

  document.querySelectorAll(".btnExcluir").forEach(btn => {
    btn.addEventListener("click", function() {
      const index = this.getAttribute("data-index");
      excluirAluno(index);
    });
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  const aluno = new Aluno(nome, idade, curso, notaFinal);

  if (editIndex === null) {
    alunos.push(aluno);
    alert("✅ Aluno cadastrado com sucesso!");
  } else {
    alunos[editIndex] = aluno;
    alert("✏️ Aluno editado com sucesso!");
    editIndex = null;
  }

  console.log("Lista atualizada:", alunos);
  form.reset();
  renderTabela();
});

// Função para editar aluno
const editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;
  editIndex = index;
  console.log(`🖊️ Editando aluno: ${aluno.toString()}`);
};

// Função para excluir aluno
const excluirAluno = (index) => {
  if (confirm("Deseja realmente excluir este aluno?")) {
    const removido = alunos.splice(index, 1);
    alert(`🗑️ Aluno ${removido[0].nome} excluído!`);
    console.log(`Aluno excluído: ${removido[0].toString()}`);
    renderTabela();
  }
};
