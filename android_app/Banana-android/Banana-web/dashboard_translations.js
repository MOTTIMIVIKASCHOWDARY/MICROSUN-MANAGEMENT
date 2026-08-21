const dashboardTranslations = {
    en: {
        dashboardTitle: "Select Banana Variant",
        dashboardSubtitle: "Choose the crop variant you are farming",
        continueBtn: "Continue"
    },
    hi: {
        dashboardTitle: "केला किस्म का चयन करें",
        dashboardSubtitle: "वह फसल किस्म चुनें जिसकी आप खेती कर रहे हैं",
        continueBtn: "आगे बढ़ें"
    }
};

if (typeof translations !== 'undefined') {
    for (const lang in dashboardTranslations) {
        if (translations[lang]) {
            Object.assign(translations[lang], dashboardTranslations[lang]);
        }
    }
}
