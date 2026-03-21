export class RecognitionManager {
    constructor(onUpdate) {
        this.onUpdate = onUpdate;
        this.currentLang = 'ru-RU';
        this.isListening = false;
        this.recognition = null;
        this.finalTranscript = '';
        this.abortRequested = false;
        this.lastError = '';
        this.supported = typeof window !== 'undefined'
            && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    }

    setLanguage(lang) {
        this.currentLang = lang;
        if (this.recognition) {
            this.recognition.lang = lang;
        }
    }

    stop() {
        if (!this.recognition || !this.isListening) return;
        this.abortRequested = true;
        this.recognition.stop();
    }

    start(expectedText) {
        if (!this.supported) {
            this.onUpdate({
                state: 'unsupported',
                expectedText
            });
            return;
        }

        if (this.isListening) {
            this.stop();
            return;
        }

        const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new RecognitionCtor();
        this.finalTranscript = '';
        this.abortRequested = false;
        this.lastError = '';
        this.isListening = true;

        this.recognition.lang = this.currentLang;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.continuous = false;

        this.onUpdate({
            state: 'listening',
            expectedText
        });

        this.recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0]?.transcript || '')
                .join(' ')
                .trim();

            if (transcript) {
                this.finalTranscript = transcript;
            }

            this.onUpdate({
                state: event.results[event.results.length - 1]?.isFinal ? 'processing' : 'listening',
                expectedText,
                transcript
            });
        };

        this.recognition.onerror = (event) => {
            this.isListening = false;
            this.lastError = event.error || 'error';
            this.onUpdate({
                state: event.error === 'not-allowed' ? 'permission-denied' : 'error',
                expectedText,
                error: event.error,
                transcript: this.finalTranscript
            });
        };

        this.recognition.onend = () => {
            const transcript = this.finalTranscript.trim();
            this.isListening = false;

            if (this.abortRequested) {
                this.abortRequested = false;
                this.onUpdate({
                    state: 'idle',
                    expectedText
                });
                return;
            }

             if (this.lastError) {
                this.lastError = '';
                return;
            }

            this.onUpdate({
                state: transcript ? 'result' : 'no-speech',
                expectedText,
                transcript
            });
        };

        this.recognition.start();
    }
}
