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

let alunos = [];
let editIndex = null;

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");

// Renderizar tabela
function renderTabela() {
  tabela.innerHTML = "";

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>${aluno.isAprovado() ? "Aprovado" : "Reprovado"}</td>
      <td>
        <button onclick="editarAluno(${i})">Editar</button>
        <button onclick="excluirAluno(${i})">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  }
}

// Evento de envio do formulário
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  const aluno = new Aluno(nome, idade, curso, notaFinal);

  if (editIndex === null) {
    alunos.push(aluno);
    alert("Aluno cadastrado com sucesso!");
  } else {
    alunos[editIndex] = aluno;
    alert("Aluno editado com sucesso!");
    editIndex = null;
  }

  form.reset();
  renderTabela();
});

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;
  editIndex = index;
}

function excluirAluno(index) {
  if (confirm("Deseja realmente excluir este aluno?")) {
    alunos.splice(index, 1);
    alert("Aluno excluído!");
    renderTabela();
  }
}
