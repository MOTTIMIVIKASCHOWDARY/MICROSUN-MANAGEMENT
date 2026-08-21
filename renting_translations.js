/**
 * MICROSUN MANAGEMENT - Rentrox AI Rental Translations
 */
const rentingTranslations = {
    en: {
        rentingTitle: "Rentrox AI - Machinery & Labor Booking",
        rentingSubtitle: "On-demand modern farm equipment and skilled agricultural crews"
    },
    hi: {
        rentingTitle: "रेन्ट्रोक्स एआई - मशीनरी और श्रम बुकिंग",
        rentingSubtitle: "मांग पर आधुनिक कृषि उपकरण और कुशल कृषि दल"
    }
};

if (typeof translations !== 'undefined') {
    for (const lang in rentingTranslations) {
        if (translations[lang]) {
            Object.assign(translations[lang], rentingTranslations[lang]);
        }
    }
}
