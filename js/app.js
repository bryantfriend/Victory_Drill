import { TARGET_LANGUAGES, getCategoryItems, learningContent } from './content.js';
import { LANGUAGES, getCategoryLabel, getUIText } from './i18n.js';
import { RecognitionManager } from './recognition.js';
import { VoiceManager } from './voice.js';
import { Timer } from './timer.js';
import { UIManager } from './ui.js';

class App {
    constructor() {
        this.mode = 'letters';
        this.baseLanguage = 'en';
        this.targetLanguage = 'ru';
        this.selectedTime = 60;
        this.showPronunciation = true;
        this.showMeanings = true;
        this.currentCategory = null;
        this.currentList = [];
        this.currentIndex = 0;
        this.score = 0;
        this.difficultItems = [];
        this.practiceSourceList = null;
        this.isPaused = false;
        this.isFlipped = false;
        this.speechFeedback = null;

        this.russianAlphabetVariations = [
            "Следующая буква {n}. Она дает звук {s}.",
            "А вот и буква {n}! Она звучит как {s}.",
            "Посмотри, это буква {n}. У неё звук {s}.",
            "Встречай букву {n}. Она произносится как {s}.",
            "Давай выучим букву {n}. Она поет звук {s}.",
            "Это буква {n}, а её звук — {s}.",
            "Вот буква {n}. Она издает звук {s}.",
            "Знакомься, это буква {n}. Она говорит {s}.",
            "Перед нами буква {n}. Она звучит {s}.",
            "Угадай, что за буква? Это {n}! И её звук {s}."
        ];

        this.russianSignVariations = [
            "Следующая буква {n}. Она не имеет своего звука.",
            "А это буква {n}. У неё нет своего звука.",
            "Смотри, это {n}. Эта буква молчит.",
            "Вот пришла буква {n}. Звука у неё нет.",
            "Это буква {n}. Она помогает другим буквам, но сама молчит.",
            "Знакомься, это {n}. Своего звука у неё не бывает.",
            "Перед нами {n}. Она не произносится сама по себе.",
            "Буква {n} — особенная, она не издает звука.",
            "А вот и {n}. Это беззвучная буква.",
            "Посмотри на {n}. Она стоит в словах, но звука не дает."
        ];

        this.colors = [
            { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', shadow: '#059669' },
            { bg: 'bg-indigo-500', hover: 'hover:bg-indigo-600', shadow: '#4f46e5' },
            { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', shadow: '#ea580c' },
            { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', shadow: '#9333ea' },
            { bg: 'bg-rose-500', hover: 'hover:bg-rose-600', shadow: '#e11d48' },
            { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', shadow: '#0d9488' }
        ];
        this.modeConfig = {
            letters: { contentMode: 'letters', categoryGroup: null },
            'topic-words': { contentMode: 'words', categoryGroup: 'topics' },
            'sound-words': { contentMode: 'words', categoryGroup: 'sounds' },
            'topic-phrases': { contentMode: 'phrases', categoryGroup: 'topics' },
            'sound-phrases': { contentMode: 'phrases', categoryGroup: 'sounds' }
        };

        this.voice = new VoiceManager();
        this.recognition = new RecognitionManager((payload) => this.handleRecognitionUpdate(payload));
        this.timer = new Timer(
            (time, isAlert) => this.ui.updateTimer(time, isAlert),
            () => this.endGame()
        );
        this.ui = new UIManager({
            onSpeak: (text) => this.voice.speak(text),
            onSpeakWord: (item) => this.speakWord(item),
            onChangeMode: (mode) => this.setMode(mode),
            onChangeLanguage: (language) => this.setLanguage(language),
            onChangeTargetLanguage: (language) => this.setTargetLanguage(language),
            onSelectCategory: (cat) => this.startGame(cat),
            onNextItem: () => this.nextItem(),
            onPrevItem: () => this.prevItem(),
            onRepeatItem: () => this.repeatItem(),
            onToggleDifficult: () => this.toggleDifficultItem(),
            onTogglePause: () => this.togglePause(),
            onExit: () => this.exitToMenu(),
            onReplay: () => this.startGame(this.currentCategory),
            onPracticeDifficult: () => this.startDifficultPractice()
            ,
            onTogglePronunciation: () => this.togglePronunciation(),
            onToggleMeanings: () => this.toggleMeanings(),
            onRecord: () => this.toggleRecording()
        });

        this.init();
        this.handleSplash();
    }

    handleSplash() {
        const video = this.ui.splashVideo;
        const skipBtn = this.ui.skipSplashBtn;
        const splash = this.ui.splashScreen;
        const overlay = this.ui.splashOverlay;
        const startBtn = this.ui.startSplashBtn;
        let hasEnded = false;
        let safetyTimeout = null;
        let hasStarted = false;

        const endSplash = () => {
            if (hasEnded) return;
            hasEnded = true;
            video.onended = null;
            video.onerror = null;
            video.oncanplay = null;
            skipBtn.onclick = null;
            startBtn.onclick = null;
            clearTimeout(safetyTimeout);
            splash.classList.add('pointer-events-none');
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.classList.add('hidden');
                this.ui.appContainer.classList.remove('opacity-0');
                this.ui.appContainer.classList.add('opacity-100');
                this.ui.appContainer.style.pointerEvents = 'auto';
            }, 600);
        };

        const tryPlay = () => {
            if (hasEnded || !hasStarted) return;
            splash.classList.add('intro-playing');
            overlay.classList.add('hidden');
            const playAttempt = video.play();
            if (playAttempt?.catch) {
                playAttempt.catch(() => endSplash());
            }
        };

        skipBtn.onclick = endSplash;
        startBtn.onclick = () => {
            if (hasStarted) return;
            hasStarted = true;

            video.onended = endSplash;
            video.onerror = endSplash;
            safetyTimeout = setTimeout(() => {
                if (!hasEnded) endSplash();
            }, 5000);

            if (video.readyState >= 2) {
                tryPlay();
            } else {
                video.oncanplay = tryPlay;
                video.load();
            }
        };
    }

    init() {
        document.getElementById('mode-letters').onclick = () => this.setMode('letters');
        document.getElementById('mode-topic-words').onclick = () => this.setMode('topic-words');
        document.getElementById('mode-sound-words').onclick = () => this.setMode('sound-words');
        document.getElementById('mode-topic-phrases').onclick = () => this.setMode('topic-phrases');
        document.getElementById('mode-sound-phrases').onclick = () => this.setMode('sound-phrases');

        document.getElementById('time-60').onclick = () => this.setTimer(60);
        document.getElementById('time-120').onclick = () => this.setTimer(120);
        document.getElementById('time-free').onclick = () => this.setTimer(-1);

        document.getElementById('exit-game').onclick = () => this.exitToMenu();
        document.getElementById('quit-game').onclick = () => this.exitToMenu();
        document.getElementById('toggle-pause').onclick = () => this.togglePause();
        document.getElementById('resume-game').onclick = () => this.togglePause();

        document.getElementById('menu-btn').onclick = () => this.exitToMenu();
        document.getElementById('replay-btn').onclick = () => this.startGame(this.currentCategory);
        document.getElementById('practice-difficult-btn').onclick = () => this.startDifficultPractice();

        this.ui.renderLanguages(LANGUAGES, this.baseLanguage);
        this.ui.renderTargetLanguages(TARGET_LANGUAGES, this.targetLanguage);
        this.setLanguage(this.baseLanguage);
        this.setTargetLanguage(this.targetLanguage);
        this.setMode('letters');
    }

    setLanguage(language) {
        this.baseLanguage = language;
        this.ui.updateLanguageButtons(language);
        this.ui.applyTranslations(language, {
            appTitle: getUIText(language, 'appTitle'),
            languagePrompt: getUIText(language, 'languagePrompt'),
            targetLanguagePrompt: getUIText(language, 'targetLanguagePrompt'),
            categoryPrompt: getUIText(language, 'categoryPrompt'),
            timerLabel: getUIText(language, 'timerLabel'),
            modeLetters: getUIText(language, 'modeLetters'),
            modeTopicWords: getUIText(language, 'modeTopicWords'),
            modeSoundWords: getUIText(language, 'modeSoundWords'),
            modeTopicPhrases: getUIText(language, 'modeTopicPhrases'),
            modeSoundPhrases: getUIText(language, 'modeSoundPhrases'),
            timeOneMin: getUIText(language, 'timeOneMin'),
            timeTwoMin: getUIText(language, 'timeTwoMin'),
            timeFree: getUIText(language, 'timeFree'),
            tapHint: getUIText(language, 'tapHint'),
            pause: getUIText(language, 'pause'),
            resume: getUIText(language, 'resume'),
            quit: getUIText(language, 'quit'),
            excellent: getUIText(language, 'excellent'),
            readCount: getUIText(language, 'readCount'),
            wordsLabel: getUIText(language, 'wordsLabel'),
            menu: getUIText(language, 'menu'),
            replay: getUIText(language, 'replay'),
            difficult: getUIText(language, 'difficult'),
            difficultCards: getUIText(language, 'difficultCards'),
            noImage: getUIText(language, 'noImage'),
            meaning: getUIText(language, 'meaning'),
            pronunciation: getUIText(language, 'pronunciation'),
            letterName: getUIText(language, 'letterName'),
            sound: getUIText(language, 'sound'),
            stress: getUIText(language, 'stress'),
            syllables: getUIText(language, 'syllables'),
            wordCount: getUIText(language, 'wordCount'),
            readInChunks: getUIText(language, 'readInChunks'),
            noSound: getUIText(language, 'noSound'),
            pronunciationToggle: getUIText(language, 'pronunciationToggle'),
            pronunciationToggleHint: getUIText(language, 'pronunciationToggleHint'),
            meaningToggle: getUIText(language, 'meaningToggle'),
            meaningToggleHint: getUIText(language, 'meaningToggleHint'),
            categoryGroupTopics: getUIText(language, 'categoryGroupTopics'),
            categoryGroupSounds: getUIText(language, 'categoryGroupSounds'),
            speechFeedback: getUIText(language, 'speechFeedback'),
            speechHeard: getUIText(language, 'speechHeard'),
            speechIdle: getUIText(language, 'speechIdle'),
            speechListening: getUIText(language, 'speechListening'),
            speechProcessing: getUIText(language, 'speechProcessing'),
            speechUnsupported: getUIText(language, 'speechUnsupported'),
            speechPermissionDenied: getUIText(language, 'speechPermissionDenied'),
            speechTryAgain: getUIText(language, 'speechTryAgain'),
            speechGreat: getUIText(language, 'speechGreat'),
            speechClose: getUIText(language, 'speechClose'),
            speechNoSpeech: getUIText(language, 'speechNoSpeech'),
            speechRecord: getUIText(language, 'speechRecord'),
            speechStop: getUIText(language, 'speechStop'),
            on: getUIText(language, 'on'),
            off: getUIText(language, 'off')
        });
        this.ui.updatePronunciationToggle(this.showPronunciation);
        this.ui.updateMeaningToggle(this.showMeanings);
        this.renderCategories();
        if (this.currentList.length) {
            this.ui.setInitialContent(this.getCurrentItem());
            this.ui.updateDifficultSummary(this.difficultItems.length);
            this.ui.updateDifficultButton(this.isCurrentItemDifficult());
        }
    }

    setTargetLanguage(language) {
        this.targetLanguage = language;
        const speechLang = learningContent[language]?.speechLang || 'ru-RU';
        this.voice.setLanguage(speechLang);
        this.recognition.setLanguage(speechLang);
        this.ui.setTargetLanguage(language);
        this.ui.updateTargetLanguageButtons(language);
        this.resetSpeechFeedback();
        this.currentCategory = null;
        this.currentList = [];
        this.difficultItems = [];
        this.renderCategories();
        this.ui.showScreen('start');
    }

    setMode(mode) {
        this.mode = mode;
        this.ui.updateModeButtons(mode);
        this.renderCategories();
    }

    setTimer(seconds) {
        this.selectedTime = seconds;
        this.ui.updateTimerButtons(seconds);
    }

    togglePronunciation() {
        this.showPronunciation = !this.showPronunciation;
        this.ui.updatePronunciationToggle(this.showPronunciation);
        if (this.currentList.length) {
            this.ui.setInitialContent(this.getCurrentItem());
            if (this.isFlipped) {
                this.ui.card.classList.add('is-flipped');
            }
        }
    }

    toggleMeanings() {
        this.showMeanings = !this.showMeanings;
        this.ui.updateMeaningToggle(this.showMeanings);
        if (this.currentList.length) {
            this.ui.setInitialContent(this.getCurrentItem());
            if (this.isFlipped) {
                this.ui.card.classList.add('is-flipped');
            }
        }
    }

    renderCategories() {
        const { contentMode, categoryGroup } = this.getModeConfig();
        const categories = (learningContent[this.targetLanguage]?.modes?.[contentMode] || [])
            .filter(category => !categoryGroup || this.getCategoryGroup(category.key) === categoryGroup)
            .map(category => ({
            key: category.key,
            label: category.labels?.[this.baseLanguage] || getCategoryLabel(category.key, this.baseLanguage)
        }));
        this.ui.renderCategories(categories, this.colors);
    }

    getModeConfig() {
        return this.modeConfig[this.mode] || this.modeConfig.letters;
    }

    getCategoryGroup(key) {
        const soundPatterns = [
            'long-e',
            'r-sound',
            'rounded-vowel',
            'zh-sh',
            'third-tone',
            'nasal',
            'vowel-sounds',
            'special-sounds',
            'special-letters',
            'tone-practice',
            'common-characters',
            'Гласный',
            'Буква',
            'Правило',
            'Мягкий',
            'Твердый',
            'Пары',
            'Ь в середине',
            'Удвоенные'
        ];

        return soundPatterns.some(pattern => key.includes(pattern)) ? 'sounds' : 'topics';
    }

    startGame(category) {
        this.practiceSourceList = null;
        this.difficultItems = [];
        this.startRound(this.getCategoryList(category), false);
    }

    getCategoryList(category) {
        this.currentCategory = category;
        return [...getCategoryItems(this.targetLanguage, this.getModeConfig().contentMode, category)];
    }

    startRound(list, preserveDifficult = false) {
        this.score = 0;
        this.currentIndex = 0;
        this.isPaused = false;
        this.isFlipped = false;
        this.resetSpeechFeedback();
        if (!preserveDifficult) {
            this.difficultItems = [];
        }

        this.currentList = [...list];
        if (!this.currentList.length) {
            this.timer.stop();
            this.ui.showScreen('start');
            return;
        }
        this.shuffle(this.currentList);

        const firstItem = this.currentList[0];
        this.ui.updateScore(0);
        this.ui.updatePauseUI(false);
        this.ui.updateDifficultSummary(this.difficultItems.length);
        this.ui.updateDifficultButton(this.isCurrentItemDifficult());
        this.ui.setInitialContent(firstItem);
        this.ui.showScreen('game');

        this.voice.speak(this.getText(firstItem));
        this.timer.start(this.selectedTime);
    }

    speakWord(item) {
        if (this.isPaused) return;
        const wordToSpeak = item.w || (typeof item === 'string' ? item : item.t);
        this.voice.speak(wordToSpeak);
    }

    getText(item) {
        if (typeof item === 'string') return item;

        if (item.speak) return item.speak;

        // Handle alphabet items with conversational phrasing variety
        if (this.targetLanguage === 'ru' && item.l && item.n !== undefined && item.s !== undefined) {
            if (item.s) {
                const template = this.russianAlphabetVariations[Math.floor(Math.random() * this.russianAlphabetVariations.length)];
                return template.replace('{n}', item.n).replace('{s}', item.s);
            } else {
                const template = this.russianSignVariations[Math.floor(Math.random() * this.russianSignVariations.length)];
                return template.replace('{n}', item.n);
            }
        }

        if (item.l && item.n !== undefined && item.s !== undefined) {
            return [item.n, item.s, item.w].filter(Boolean).join('. ');
        }

        return item.t || item.l;
    }

    nextItem() {
        if (this.isPaused) return;

        this.resetSpeechFeedback();
        this.currentIndex++;
        if (this.currentIndex >= this.currentList.length) {
            this.currentIndex = 0;
        }

        this.score++;
        this.ui.updateScore(this.score);

        const nextItem = this.currentList[this.currentIndex];
        this.ui.updateCard(nextItem, this.isFlipped);
        this.isFlipped = !this.isFlipped;
        this.ui.updateDifficultButton(this.isCurrentItemDifficult());

        this.voice.speak(this.getText(nextItem));
    }

    prevItem() {
        if (this.isPaused || this.currentIndex === 0) return;

        this.resetSpeechFeedback();
        this.currentIndex--;

        const prevItem = this.currentList[this.currentIndex];
        this.ui.updateCard(prevItem, this.isFlipped);
        this.isFlipped = !this.isFlipped;
        this.ui.updateDifficultButton(this.isCurrentItemDifficult());

        this.voice.speak(this.getText(prevItem));
    }

    repeatItem() {
        if (this.isPaused) return;
        this.voice.speak(this.getText(this.currentList[this.currentIndex]));
    }

    toggleRecording() {
        if (this.isPaused || !this.currentList.length) return;
        this.recognition.start(this.getSpeechTargetText(this.getCurrentItem()));
    }

    getCurrentItem() {
        return this.currentList[this.currentIndex];
    }

    getItemKey(item) {
        if (typeof item === 'string') return `phrase:${item}`;
        if (item.t) return `word:${item.t}`;
        if (item.l) return `letter:${item.l}`;
        return JSON.stringify(item);
    }

    isCurrentItemDifficult() {
        const item = this.getCurrentItem();
        if (!item) return false;
        const currentKey = this.getItemKey(item);
        return this.difficultItems.some(entry => this.getItemKey(entry) === currentKey);
    }

    toggleDifficultItem() {
        if (this.isPaused) return;

        const item = this.getCurrentItem();
        if (!item) return;

        const key = this.getItemKey(item);
        const existingIndex = this.difficultItems.findIndex(entry => this.getItemKey(entry) === key);

        if (existingIndex >= 0) {
            this.difficultItems.splice(existingIndex, 1);
        } else {
            this.difficultItems.push(item);
        }

        this.ui.updateDifficultButton(this.isCurrentItemDifficult());
        this.ui.updateDifficultSummary(this.difficultItems.length);
    }

    startDifficultPractice() {
        if (!this.difficultItems.length) return;
        this.practiceSourceList = [...this.difficultItems];
        this.startRound(this.practiceSourceList, true);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.recognition.stop();
        }
        if (this.isPaused) {
            this.timer.stop();
        } else {
            this.timer.start(this.timer.seconds);
        }
        this.ui.updatePauseUI(this.isPaused);
    }

    endGame() {
        this.recognition.stop();
        this.ui.updateDifficultSummary(this.difficultItems.length);
        this.ui.showScreen('end');
    }

    exitToMenu() {
        this.recognition.stop();
        this.resetSpeechFeedback();
        this.timer.stop();
        this.practiceSourceList = null;
        this.ui.showScreen('start');
    }

    getSpeechTargetText(item) {
        if (!item) return '';
        if (typeof item === 'string') return item;
        return item.t || item.w || item.l || '';
    }

    normalizeForSpeechCompare(text) {
        const raw = (text || '').toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (this.targetLanguage === 'zh') {
            return raw.replace(/[^\p{Script=Han}\p{Number}]+/gu, '');
        }

        return raw
            .replace(/['’]/g, '')
            .replace(/[^\p{L}\p{Number}\s]+/gu, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    isSpeechMatch(expectedText, heardText) {
        const expected = this.normalizeForSpeechCompare(expectedText);
        const heard = this.normalizeForSpeechCompare(heardText);

        if (!expected || !heard) return false;
        if (expected === heard) return true;

        if (this.targetLanguage === 'zh') {
            return expected.includes(heard) || heard.includes(expected);
        }

        const expectedWords = expected.split(' ').filter(Boolean);
        const heardWords = heard.split(' ').filter(Boolean);

        if (expectedWords.length <= 1 || heardWords.length <= 1) {
            return expected.includes(heard) || heard.includes(expected);
        }

        let matches = 0;
        expectedWords.forEach(word => {
            if (heardWords.includes(word)) {
                matches += 1;
            }
        });

        return matches / expectedWords.length >= 0.7;
    }

    buildSpeechFeedback(state, transcript = '', expectedText = '') {
        const isMatch = state === 'result' && this.isSpeechMatch(expectedText, transcript);
        const isClose = state === 'result' && !isMatch && transcript;
        const statusMap = {
            idle: this.ui.text.speechIdle || 'Tap the mic and say the card.',
            listening: this.ui.text.speechListening || 'Listening...',
            processing: this.ui.text.speechProcessing || 'Checking what I heard...',
            unsupported: this.ui.text.speechUnsupported || 'Speech recognition is not available in this browser.',
            'permission-denied': this.ui.text.speechPermissionDenied || 'Microphone permission was blocked.',
            error: this.ui.text.speechTryAgain || 'Try again.',
            'no-speech': this.ui.text.speechNoSpeech || 'I did not hear anything. Try again.',
            result: isMatch
                ? (this.ui.text.speechGreat || 'Great pronunciation!')
                : (this.ui.text.speechClose || 'Close. Compare what I heard and try again.')
        };

        return {
            visible: state !== 'idle',
            status: statusMap[state] || statusMap.error,
            transcript: transcript || '',
            tone: isMatch ? 'success' : (isClose ? 'warning' : state),
            badge: isMatch
                ? (this.ui.text.speechGreat || 'Great pronunciation!')
                : (isClose ? (this.ui.text.speechTryAgain || 'Try again') : '')
        };
    }

    handleRecognitionUpdate({ state, transcript = '', expectedText = '' }) {
        this.speechFeedback = this.buildSpeechFeedback(state, transcript, expectedText);
        this.ui.updateRecordButton(this.recognition.isListening, this.recognition.supported);
        this.ui.updateSpeechFeedback(this.speechFeedback);
    }

    resetSpeechFeedback() {
        this.recognition.stop();
        this.speechFeedback = this.buildSpeechFeedback('idle');
        this.ui.updateRecordButton(false, this.recognition.supported);
        this.ui.updateSpeechFeedback(this.speechFeedback);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new App();
});
