let translations = {};

// Cargar el CSV y convertirlo en un objeto de traducciones usando PapaParse
function loadTranslations(callback) {
  fetch("translations.csv")
    .then((response) => response.text())
    .then((text) => {
      // Usar PapaParse para convertir el texto CSV en un objeto
      Papa.parse(text, {
        header: true, // Usar la primera fila como encabezados
        dynamicTyping: true, // Hacer que los valores se conviertan automáticamente en tipos de datos apropiados
        skipEmptyLines: true, // Ignorar líneas vacías
        complete: (result) => {
          // Procesar cada fila del CSV
          result.data.forEach((row) => {
            const key = row.key; // Usar la clave (primera columna) de cada fila
            translations[key] = {};

            // Para cada idioma (columna), asignar su valor en el objeto de traducciones
            Object.keys(row).forEach((lang) => {
              if (lang !== "key") {
                translations[key][lang] = row[lang];
              }
            });
          });

          callback(translations); // Ejecutar lógica con las traducciones cargadas
        },
      });
    });
  console.log(translations);
}

// Cambiar el idioma dinámicamente
function selectLanguage(language) {
  setCookie("language", language); // Guardar el idioma seleccionado en una cookie

  // Iterar sobre las claves de las traducciones
  Object.keys(translations).forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = translations[id][language];
    }
  });
}
// Cargar las traducciones al iniciar
window.onload = () => {
  loadTranslations(() => {
    let savedLanguage = getCookie("language");
    if (!savedLanguage) {
      savedLanguage = "en"; // Default to English if no language cookie is found
      setCookie("language", savedLanguage);
    }
    selectLanguage(savedLanguage);
  });
};
