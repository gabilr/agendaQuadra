let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

window.onload = function () {
  atualizarLista();
  removerHorariosReservados();
};

function reservarHorario() {
  const nome = document.getElementById("nome").value;
  const horario = document.getElementById("horario").value;

  if (nome === "" || horario === "") {
    alert("Preencha seu nome e escolha um horário.");
    return;
  }

  const horarioJaReservado = reservas.some(
    (reserva) => reserva.horario === horario
  );

  if (horarioJaReservado) {
    alert("Esse horário já foi reservado.");
    return;
  }

  const novaReserva = {
    nome: nome,
    horario: horario,
  };

  reservas.push(novaReserva);

  localStorage.setItem("reservas", JSON.stringify(reservas));

  atualizarLista();
  removerHorarioDoSelect(horario);

  document.getElementById("nome").value = "";
  document.getElementById("horario").value = "";
}

function atualizarLista() {
  const listaReservas = document.getElementById("listaReservas");

  listaReservas.innerHTML = "";

  reservas.forEach((reserva) => {
    const item = document.createElement("li");
    item.textContent = `${reserva.nome} reservou a quadra às ${reserva.horario}`;
    listaReservas.appendChild(item);
  });
}

function removerHorarioDoSelect(horario) {
  const opcaoSelecionada = document.querySelector(
    `#horario option[value="${horario}"]`
  );

  if (opcaoSelecionada) {
    opcaoSelecionada.remove();
  }
}

function removerHorariosReservados() {
  reservas.forEach((reserva) => {
    removerHorarioDoSelect(reserva.horario);
  });
}