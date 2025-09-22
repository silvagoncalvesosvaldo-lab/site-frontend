document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnQueroParticipar");
  const cadastro = document.querySelector(".cadastro");

  if (btn && cadastro) {
    btn.addEventListener("click", () => {
      cadastro.scrollIntoView({ behavior: "smooth" });
    });
  }
});
