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
    document.cookie = `language=${language}; path=/; max-age=${60 * 60 * 24 * 30}`; // Expira en 30 días

    // Iterar sobre las claves de las traducciones
    Object.keys(translations).forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = translations[id][language];
        }
    });
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

// Cargar las traducciones al iniciar
document.addEventListener("DOMContentLoaded", () => {
    loadTranslations(() => {
        const savedLanguage = getCookie('language');
        selectLanguage(savedLanguage);
    });
});
