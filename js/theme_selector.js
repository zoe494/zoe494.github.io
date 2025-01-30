// Function to select and apply the theme
function selectTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  setCookie("theme", theme); // Save the selected theme in a cookie
  console.log("Theme selected: " + theme);
}

document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = getCookie("theme");
  if (!savedTheme) {
    //Si no se encuentra la cookie, se verifica si el sistema operativo tiene un tema oscuro
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    savedTheme = prefersDarkScheme ? "dark" : "light";
    setCookie("theme", savedTheme);
  }
  selectTheme(savedTheme);
});
