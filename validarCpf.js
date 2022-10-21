class ValidadadorDeCpf {
  constructor(cpf) {
    this.cpf = cpf.replace(/\D+/g, "");
  }

  validaCpf() {
    if (typeof this.cpf === "undefined") return false;
    if (this.cpf.length !== 11) return false;
    if (this.isSequencia()) return false;

    let cpfLimpo = this.cpf.slice(0, -2);
    let digito1 = this.criaDigito(cpfLimpo);
    let digito2 = this.criaDigito(cpfLimpo + digito1);

    let cpf = cpfLimpo + digito1 + digito2;

    return cpf === this.cpf;
  }

  isSequencia() {
    let sequencia = this.cpf[0].repeat(this.cpf.length);
    return sequencia === this.cpf;
  }

  criaDigito(cpfLimpo) {
    let cpfArray = Array.from(cpfLimpo);
    let regressivo = cpfArray.length + 1;

    let total = cpfArray.reduce((ac, cur) => {
      ac += regressivo * Number(cur);
      regressivo--;
      return ac;
    }, 0);

    let digito = 11 - (total % 11);
    return digito > 9 ? "0" : String(digito);
  }
}

const userCpf = () => {
  let userCpfNumber = document.querySelector(".userCpf");

  let message = document.querySelector(".message");

  const newCpf = new ValidadadorDeCpf(userCpfNumber.value);

  if (newCpf.validaCpf()) {
    message.style.color = "green";
    message.innerHTML = "Cpf Válido";
    setInterval(() => {
      message.innerHTML = "";
      userCpfNumber.value = "";
      userCpfNumber.focus();
    }, 3000);
  } else {
    message.style.color = "red";
    message.innerHTML = "Cpf Inválido";
    setInterval(() => {
      message.innerHTML = "";
      userCpfNumber.value = "";
      userCpfNumber.focus();
    }, 3000);
  }
};
