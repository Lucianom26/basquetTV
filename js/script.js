document.addEventListener('DOMContentLoaded', () => {

    // ======= PARPADEO DEL BOTÓN =======
    const btn = document.getElementById('auto-toggle-btn');
    let toggleInterval;

    if (btn) {
        const startBlinking = () => toggleInterval = setInterval(() => btn.classList.toggle('active'), 1000);
        const stopBlinking = () => { clearInterval(toggleInterval); btn.classList.add('active'); };
        startBlinking();
        btn.addEventListener('mouseenter', stopBlinking);
        btn.addEventListener('focus', stopBlinking);
        btn.addEventListener('mouseleave', startBlinking);
        btn.addEventListener('blur', startBlinking);
    }

    // ======= BUSCADOR =======
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', buscarTexto);
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') buscarTexto(); });

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function buscarTexto() {
        const texto = searchInput.value.trim();
        if (!texto) return;

        document.querySelectorAll('.highlight').forEach(el => el.replaceWith(el.textContent));

        const regex = new RegExp(escapeRegExp(texto), "gi");
        const articles = document.querySelectorAll('article');
        let encontrado = false;

        articles.forEach(article => highlightText(article, regex, () => { encontrado = true; }));

        if (encontrado) {
            const first = document.querySelector('.highlight');
            first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert("No se encontró ninguna coincidencia.");
        }
    }

    function highlightText(element, regex, callback) {
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (regex.test(node.textContent)) {
                    const frag = document.createDocumentFragment();
                    let lastIndex = 0;
                    regex.lastIndex = 0;
                    let match;
                    while ((match = regex.exec(node.textContent)) !== null) {
                        frag.appendChild(document.createTextNode(node.textContent.substring(lastIndex, match.index)));
                        const span = document.createElement('span');
                        span.className = 'highlight';
                        span.textContent = match[0];
                        frag.appendChild(span);
                        callback();
                        lastIndex = match.index + match[0].length;
                    }
                    frag.appendChild(document.createTextNode(node.textContent.substring(lastIndex)));
                    node.replaceWith(frag);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                highlightText(node, regex, callback);
            }
        });
    }

});
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('liga-select');

    if (menu) {
        menu.addEventListener('change', function () {
            const sectionId = this.value;
            if (sectionId) {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});