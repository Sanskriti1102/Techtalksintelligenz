window.googleTranslateInit = function () {
    if (!window.google?.translate?.TranslateElement) {
        setTimeout(window.googleTranslateInit, 100);
    } else {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,pa,sa,mr,ur,bn,es,ja,ko,zh-CN,nl,fr,de,it,ta,te,gu',
                layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                defaultLanguage: 'en',
                autoDisplay: false,
            },
            'google_element'
        );
    }
    cleanUpGadgetText();
};

function loadGoogleTranslateScript() {
    if (!document.getElementById('google_translate_script')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
        script.id = 'google_translate_script';
        script.onerror = () => console.error('Error loading Google Translate script');
        document.body.appendChild(script);
    }
}

function cleanUpGadgetText() {
    const gadgetElement = document.querySelector('.goog-te-gadget');
    if (gadgetElement) {
        const textNodes = gadgetElement.childNodes;
        textNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = ''; // Clear text content
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadGoogleTranslateScript();
});
