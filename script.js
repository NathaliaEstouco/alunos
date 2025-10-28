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

// --------------------- Variáveis principais ---------------------
let alunos = [];
let editIndex = null;

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");
const relatoriosDiv = document.getElementById("relatorios");

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

  // Eventos dinâmicos dos botões
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

// Evento de cadastro
form.addEventListener("submit", (e) => {
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

// Editar aluno
const editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;
  editIndex = index;
};

// Excluir aluno
const excluirAluno = (index) => {
  if (confirm("Deseja realmente excluir este aluno?")) {
    alunos.splice(index, 1);
    alert("Aluno excluído!");
    renderTabela();
  }
};

// Relatórios

// Aprovados
document.getElementById("btnAprovados").addEventListener("click", () => {
  const aprovados = alunos.filter(a => a.isAprovado());
  const nomes = aprovados.map(a => a.nome).join(", ") || "Nenhum aluno aprovado.";
  relatoriosDiv.innerHTML = `<p><strong>Aprovados:</strong> ${nomes}</p>`;
});

// Média das notas
document.getElementById("btnMediaNotas").addEventListener("click", () => {
  if (alunos.length === 0) {
    relatoriosDiv.innerHTML = "<p>Sem alunos cadastrados.</p>";
    return;
  }
  const media = alunos.reduce((acc, a) => acc + a.notaFinal, 0) / alunos.length;
  relatoriosDiv.innerHTML = `<p><strong>Média das notas:</strong> ${media.toFixed(2)}</p>`;
});

// Média das idades
document.getElementById("btnMediaIdades").addEventListener("click", () => {
  if (alunos.length === 0) {
    relatoriosDiv.innerHTML = "<p>Sem alunos cadastrados.</p>";
    return;
  }
  const media = alunos.reduce((acc, a) => acc + a.idade, 0) / alunos.length;
  relatoriosDiv.innerHTML = `<p><strong>Média das idades:</strong> ${media.toFixed(2)}</p>`;
});

// Ordem alfabética
document.getElementById("btnOrdemAlfabetica").addEventListener("click", () => {
  if (alunos.length === 0) {
    relatoriosDiv.innerHTML = "<p>Sem alunos cadastrados.</p>";
    return;
  }
  const nomes = alunos.map(a => a.nome).sort().join(", ");
  relatoriosDiv.innerHTML = `<p><strong>Ordem alfabética:</strong> ${nomes}</p>`;
});

document.getElementById("btnQtdPorCurso").addEventListener("click", () => {
  if (alunos.length === 0) {
    relatoriosDiv.innerHTML = "<p>Sem alunos cadastrados.</p>";
    return;
  }

  const qtd = {};
  alunos.forEach(a => {
    qtd[a.curso] = (qtd[a.curso] || 0) + 1;
  });

  let html = "<ul>";
  for (const [curso, total] of Object.entries(qtd)) {
    html += `<li>${curso}: ${total} aluno(s)</li>`;
  }
  html += "</ul>";

  relatoriosDiv.innerHTML = `<p><strong>Quantidade por curso:</strong></p>${html}`;
});
