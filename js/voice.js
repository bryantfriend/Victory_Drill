const VOICE_PREFERENCES = {
    'ru-RU': {
        fallbackLangs: ['ru-RU', 'ru', 'uk-UA'],
        preferredNames: ['Microsoft Irina', 'Microsoft Svetlana', 'Google русский', 'Google Russian', 'Russian']
    },
    'en-US': {
        fallbackLangs: ['en-US', 'en-GB', 'en-AU', 'en'],
        preferredNames: ['Microsoft Aria', 'Microsoft Jenny', 'Google US English', 'Google UK English', 'Samantha', 'English']
    },
    'ky-KG': {
        fallbackLangs: ['ky-KG', 'ky', 'kk-KZ', 'tr-TR', 'ru-RU'],
        preferredNames: ['Kyrgyz', 'Кыргыз', 'Kazakh', 'Turkish', 'Russian']
    },
    'zh-CN': {
        fallbackLangs: ['zh-CN', 'zh-Hans', 'cmn-CN', 'zh'],
        preferredNames: ['Microsoft Xiaoxiao', 'Microsoft Yunxi', 'Google 普通话', 'Google Mandarin', 'Chinese']
    },
    'fr-FR': {
        fallbackLangs: ['fr-FR', 'fr-CA', 'fr'],
        preferredNames: ['Microsoft Denise', 'Microsoft Hortense', 'Google français', 'Google French', 'French']
    }
};

const DEFAULT_VENDORS = ['Microsoft', 'Google', 'Premium', 'Enhanced', 'Natural'];

export class VoiceManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentLang = 'ru-RU';
        this.currentVoice = null;

        this._initVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this._initVoices();
        }
    }

    _initVoices() {
        this.voices = this.synth.getVoices();
        this.currentVoice = this._findVoice(this.currentLang);
    }

    _getVoiceConfig(lang) {
        return VOICE_PREFERENCES[lang] || {
            fallbackLangs: [lang, lang.split('-')[0]],
            preferredNames: []
        };
    }

    _langMatches(voiceLang, targetLang) {
        if (!voiceLang || !targetLang) return false;
        const normalizedVoice = voiceLang.toLowerCase();
        const normalizedTarget = targetLang.toLowerCase();
        return normalizedVoice === normalizedTarget
            || normalizedVoice.startsWith(`${normalizedTarget}-`)
            || normalizedTarget.startsWith(`${normalizedVoice}-`);
    }

    _scoreVoice(voice, config) {
        const name = (voice.name || '').toLowerCase();
        const lang = (voice.lang || '').toLowerCase();
        let score = 0;

        config.fallbackLangs.forEach((candidate, index) => {
            if (this._langMatches(lang, candidate)) {
                score += 100 - index * 10;
            }
        });

        config.preferredNames.forEach((preferred, index) => {
            if (name.includes(preferred.toLowerCase())) {
                score += 40 - index * 2;
            }
        });

        if (DEFAULT_VENDORS.some(vendor => name.includes(vendor.toLowerCase()))) {
            score += 15;
        }

        if (voice.localService) {
            score += 8;
        }

        if (voice.default) {
            score += 5;
        }

        return score;
    }

    _findVoice(lang) {
        if (!this.voices.length) return null;

        const config = this._getVoiceConfig(lang);
        const ranked = this.voices
            .map(voice => ({ voice, score: this._scoreVoice(voice, config) }))
            .filter(entry => entry.score > 0)
            .sort((a, b) => b.score - a.score);

        if (ranked.length) {
            return ranked[0].voice;
        }

        const base = lang.split('-')[0].toLowerCase();
        return this.voices.find(voice => voice.lang?.toLowerCase().startsWith(base)) || null;
    }

    _getSpeechRate(lang) {
        const rates = {
            'ru-RU': 0.86,
            'en-US': 0.9,
            'ky-KG': 0.84,
            'zh-CN': 0.78,
            'fr-FR': 0.86
        };

        return rates[lang] || 0.88;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        this.currentVoice = this._findVoice(lang);
    }

    speak(text, rate = null) {
        if (!text) return;

        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.currentLang;
        utterance.rate = rate ?? this._getSpeechRate(this.currentLang);

        if (this.currentVoice) {
            utterance.voice = this.currentVoice;
            utterance.lang = this.currentVoice.lang || this.currentLang;
        }

        this.synth.speak(utterance);
    }
}
