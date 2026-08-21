/**
 * MICROSUN MANAGEMENT - Hub Features Translation Additions
 */
const hubFeaturesTranslations = {
    en: {
        hub_title: "Farmer Central Hub",
        hub_subtitle: "Select a module from the menu to manage your crop"
    },
    hi: {
        hub_title: "किसान सेंट्रल हब",
        hub_subtitle: "अपनी फसल का प्रबंधन करने के लिए मेनू से एक मॉड्यूल चुनें"
    }
};

if (typeof translations !== 'undefined') {
    for (const lang in hubFeaturesTranslations) {
        if (translations[lang]) {
            Object.assign(translations[lang], hubFeaturesTranslations[lang]);
        }
    }
}
