// Cargar header y footer correctamente
fetch("header.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("header").innerHTML = html;
  })
  .catch((err) => console.error("Error al cargar el header:", err));

fetch("footer.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("footer").innerHTML = html;
  })
  .catch((err) => console.error("Error al cargar el footer:", err));
