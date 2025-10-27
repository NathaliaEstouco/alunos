let alunos = [];
let editIndex = null;

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");

// Renderiza a tabela
function renderTabela() {
  tabela.innerHTML = "";

  alunos.forEach((aluno, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>
        <button type="button" onclick="editarAluno(${i})">Editar</button>
        <button type="button" onclick="excluirAluno(${i})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// Envia o formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  const novoAluno = { nome, idade, curso, notaFinal };

  if (editIndex === null) {
    alunos.push(novoAluno);
    alert("Aluno cadastrado com sucesso!");
  } else {
    alunos[editIndex] = novoAluno;
    alert("Aluno editado com sucesso!");
    editIndex = null;
  }

  form.reset();
  renderTabela();
});

// Editar aluno
function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;
  editIndex = index;
}

// Excluir aluno
function excluirAluno(index) {
  if (confirm("Deseja realmente excluir este aluno?")) {
    alunos.splice(index, 1);
    alert("Aluno excluído!");
    renderTabela();
  }
}
