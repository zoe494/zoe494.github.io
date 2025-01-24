let translations = {};

// Cargar el CSV y convertirlo en un objeto de traducciones
function loadTranslations(callback) {
    fetch("translations.csv")
        .then((response) => response.text())
        .then((text) => {
            const rows = text.split("\n");
            const headers = rows[0].split(",").map((header) => header.trim()); // Limpia encabezados

            // Procesar filas del CSV
            rows.slice(1).forEach((row) => {
                const cells = row.split(",").map((cell) => cell.trim()); // Limpia cada celda
                const key = cells[0]; // Primera columna como clave (ID del elemento)
                translations[key] = {};

                headers.slice(1).forEach((lang, index) => {
                    translations[key][lang] = cells[index + 1];
                });
            });

            callback(); // Ejecutar lógica una vez que las traducciones están cargadas
        });
}


// Cambiar el idioma dinámicamente
function selectLanguage(language) {
    document.cookie = `language=${language}; path=/; max-age=${60 * 60 * 24 * 30}`; // Expira en 30 días

    // Iterar sobre las claves de las traducciones
    Object.keys(translations).forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = translations[id][language];
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
