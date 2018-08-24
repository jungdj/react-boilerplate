import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import Li from "./i18next-react-li-postprocessor"
import ReactPostProcessor from "./i18next-react-react-postprocessor"

i18n.on("languageChanged", function(lng) {
	if (!lng.split("-")) return
	if (lng.split("-")[0] !== lng) return i18n.changeLanguage(lng.split("-")[0])
})

i18n.use(LanguageDetector)
	.use(new Li())
	.use(new ReactPostProcessor())
	.init({
		fallbackLng: "en",
		debug: true,
		resources: {},
		whitelist: ["en", "ko", "id"],
		nonExplicitWhitelist: true,
		updateMissing: true,
		ns: ["translation"],
		fallbackNS: "translation",
		// react i18next special options (optional)
		postProcess: ["React"],
		interpolation: {
			escapeValue: false, // not needed for react!!
			format: (value, format, lng) => {
				if (format === "uppercase") return value.toUpperCase()
				return value
			},
			formatSeparator: "|",
		},
		react: {
			wait: true,
			bindI18n: "languageChanged loaded",
			bindStore: "added removed",
			nsMode: "default",
		},
	})

export default i18n
