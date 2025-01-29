// Function to select and apply the theme
function selectTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  setCookie("theme", theme); // Save the selected theme in a cookie
  console.log("Theme selected: " + theme);
}

document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = getCookie("theme");
  if (!savedTheme) {
    savedTheme = "fresh"; // Default to fresh theme if no theme cookie is found
    setCookie("theme", savedTheme);
  }
  selectTheme(savedTheme);
});
