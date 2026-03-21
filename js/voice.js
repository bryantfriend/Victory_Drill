export class VoiceManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentLang = 'ru-RU';
        this.currentVoice = null;

        // Initialize voices
        this._initVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this._initVoices();
        }
    }

    _initVoices() {
        this.voices = this.synth.getVoices();
        this.currentVoice = this._findVoice(this.currentLang);
    }

    _findVoice(lang) {
        const base = lang.split('-')[0];
        return this.voices.find(v => v.lang.startsWith(base) && (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Premium') || v.name.includes('Enhanced')))
            || this.voices.find(v => v.lang.startsWith(base))
            || null;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        this.currentVoice = this._findVoice(lang);
    }

    speak(text, rate = 0.9) {
        if (!text) return;

        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.currentLang;
        utterance.rate = rate;

        if (this.currentVoice) {
            utterance.voice = this.currentVoice;
        }

        this.synth.speak(utterance);
    }
}
