const regionTranslations = {
    en: {
        regionTitle: "Select Your Farming Region",
        regionSubtitle: "We will check if your selected variant suits this climate.",
        stateLabel: "State",
        statePlaceholder: "Select State",
        districtLabel: "District",
        districtPlaceholder: "Select District",
        monthLabel: "Planting Month",
        monthPlaceholder: "Select Month",
        analyzeBtn: "Analyze Suitability",
        reportTitle: "Suitability Report",
        climateProfile: "Climate Profile:",
        cropReq: "Crop Note:",
        suggestion: "Final Suggestion:",
        disclaimer: "Note: This is a climate-based suggestion. You may still proceed with this crop using proper agricultural management.",
        proceedBtn: "Proceed to Next Step"
    },
    hi: {
        regionTitle: "अपना कृषि क्षेत्र चुनें",
        regionSubtitle: "हम जांचेंगे कि आपकी चुनी गई किस्म इस जलवायु के लिए अनुकूल है या नहीं।",
        stateLabel: "राज्य",
        statePlaceholder: "राज्य चुनें",
        districtLabel: "जिला",
        districtPlaceholder: "जिला चुनें",
        monthLabel: "रोपण का महीना",
        monthPlaceholder: "महीना चुनें",
        analyzeBtn: "अनुकूलता का विश्लेषण करें",
        reportTitle: "अनुकूलता रिपोर्ट",
        climateProfile: "जलवायु प्रोफ़ाइल:",
        cropReq: "फसल टिप्पणी:",
        suggestion: "अंतिम सुझाव:",
        disclaimer: "नोट: यह जलवायु-आधारित सुझाव है। आप उचित कृषि प्रबंधन के साथ आगे बढ़ सकते हैं।",
        proceedBtn: "अगले चरण पर बढ़ें"
    }
};

if (typeof translations !== 'undefined') {
    for (const lang in regionTranslations) {
        if (translations[lang]) {
            Object.assign(translations[lang], regionTranslations[lang]);
        }
    }
}
