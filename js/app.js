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
        this.practiceStyle = 'classic';
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
        this.itemStats = new Map();
        this.activeSyllableTimer = null;
        this.shadowTimeout = null;
        this.listeningQuiz = null;

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
            onRecord: () => this.toggleRecording(),
            onSlowPlay: () => this.playSlowAudio(),
            onShadow: () => this.startShadowing(),
            onStartListeningQuiz: () => this.startListeningQuiz(),
            onPlayMinimalPair: () => this.playMinimalPair(),
            onChooseListeningOption: (index) => this.chooseListeningOption(index),
            onChangePracticeStyle: (style) => this.setPracticeStyle(style)
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
        this.setPracticeStyle('classic');
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
            practiceStyleLabel: getUIText(language, 'practiceStyleLabel'),
            practiceStyleClassic: getUIText(language, 'practiceStyleClassic'),
            practiceStyleCoach: getUIText(language, 'practiceStyleCoach'),
            practiceStyleSpeaking: getUIText(language, 'practiceStyleSpeaking'),
            practiceStyleListening: getUIText(language, 'practiceStyleListening'),
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
            speechMissed: getUIText(language, 'speechMissed'),
            speechExtra: getUIText(language, 'speechExtra'),
            speechScore: getUIText(language, 'speechScore'),
            labTitle: getUIText(language, 'labTitle'),
            labSubtitle: getUIText(language, 'labSubtitle'),
            syllableLabel: getUIText(language, 'syllableLabel'),
            mouthTipLabel: getUIText(language, 'mouthTipLabel'),
            intonationLabel: getUIText(language, 'intonationLabel'),
            minimalPairPanelLabel: getUIText(language, 'minimalPairPanelLabel'),
            slowPlay: getUIText(language, 'slowPlay'),
            shadowMode: getUIText(language, 'shadowMode'),
            listenQuiz: getUIText(language, 'listenQuiz'),
            minimalPairAction: getUIText(language, 'minimalPairAction'),
            listenQuizQuestion: getUIText(language, 'listenQuizQuestion'),
            listenCorrect: getUIText(language, 'listenCorrect'),
            listenWrong: getUIText(language, 'listenWrong'),
            mastery: getUIText(language, 'mastery'),
            noMinimalPair: getUIText(language, 'noMinimalPair'),
            defaultMouthTip: getUIText(language, 'defaultMouthTip'),
            defaultRhythmTip: getUIText(language, 'defaultRhythmTip'),
            on: getUIText(language, 'on'),
            off: getUIText(language, 'off')
        });
        this.ui.updatePronunciationToggle(this.showPronunciation);
        this.ui.updateMeaningToggle(this.showMeanings);
        this.ui.setPracticeStyle(this.practiceStyle);
        this.renderCategories();
        if (this.currentList.length) {
            this.ui.setInitialContent(this.getCurrentItem());
            this.ui.updateDifficultSummary(this.difficultItems.length);
            this.ui.updateDifficultButton(this.isCurrentItemDifficult());
            this.updatePracticeLab();
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

    setPracticeStyle(style) {
        this.practiceStyle = style;
        this.ui.setPracticeStyle(style);
        if (this.currentList.length) {
            if (style === 'listening') {
                this.startListeningQuiz();
            } else {
                this.listeningQuiz = null;
                this.updatePracticeLab();
            }
        }
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
            this.updatePracticeLab();
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
            this.updatePracticeLab();
        }
    }

    renderCategories() {
        const { contentMode, categoryGroup } = this.getModeConfig();
        const categories = (learningContent[this.targetLanguage]?.modes?.[contentMode] || [])
            .filter(category => !categoryGroup || this.getCategoryGroup(category.key) === categoryGroup)
            .map(category => ({
            key: category.key,
            label: category.labels?.[this.baseLanguage] || getCategoryLabel(category.key, this.baseLanguage),
            tags: this.getCategoryTags(contentMode, categoryGroup)
        }));
        this.ui.renderCategories(categories, this.colors);
    }

    getCategoryTags(contentMode, categoryGroup) {
        if (contentMode === 'letters') {
            return [
                { label: getUIText(this.baseLanguage, 'tagLetters'), tone: 'letters' },
                { label: getUIText(this.baseLanguage, 'tagBeginner'), tone: 'beginner' }
            ];
        }

        if (categoryGroup === 'sounds') {
            return [
                { label: getUIText(this.baseLanguage, 'tagSound'), tone: 'sound' },
                { label: getUIText(this.baseLanguage, 'tagPronunciation'), tone: 'pronunciation' }
            ];
        }

        return [
            { label: getUIText(this.baseLanguage, 'tagTopic'), tone: 'topic' },
            { label: getUIText(this.baseLanguage, 'tagBeginner'), tone: 'beginner' }
        ];
    }

    getModeConfig() {
        return this.modeConfig[this.mode] || this.modeConfig.letters;
    }

    getCategoryGroup(key) {
        const soundPatterns = [
            'long-e',
            'th-sound',
            'short-i',
            'l-blend',
            'v-w',
            'r-sound',
            'rounded-vowel',
            'ng-sound',
            'zh-sh',
            'x-q-j',
            'third-tone',
            'nasal',
            'u-vs-ou',
            'eu-sound',
            'liaison',
            'ou-sound',
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
        this.listeningQuiz = null;

        const firstItem = this.currentList[0];
        this.ui.updateScore(0);
        this.ui.updatePauseUI(false);
        this.ui.updateDifficultSummary(this.difficultItems.length);
        this.ui.updateDifficultButton(this.isCurrentItemDifficult());
        this.ui.setInitialContent(firstItem);
        this.updatePracticeLab();
        this.ui.showScreen('game');
        this.ui.setPracticeStyle(this.practiceStyle);
        this.timer.start(this.selectedTime);

        if (this.practiceStyle === 'listening') {
            setTimeout(() => this.startListeningQuiz(), 200);
        } else {
            this.speakCurrentItem();
        }
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

    getDisplayText(item) {
        if (!item) return '';
        return typeof item === 'string' ? item : (item.t || item.w || item.l || '');
    }

    getNormalizedText(item) {
        return this.normalizeForSpeechCompare(this.getDisplayText(item));
    }

    getItemStats(item) {
        const key = this.getItemKey(item);
        if (!this.itemStats.has(key)) {
            this.itemStats.set(key, { attempts: 0, successes: 0, listens: 0, misses: 0 });
        }
        return this.itemStats.get(key);
    }

    getMasteryPercent(item) {
        const stats = this.getItemStats(item);
        if (!stats.attempts) return 0;
        return Math.max(0, Math.min(100, Math.round((stats.successes / stats.attempts) * 100)));
    }

    getSyllableParts(item) {
        if (!item) return [];
        if (typeof item === 'object' && item.syllables?.length) {
            return [...item.syllables];
        }
        const text = this.getDisplayText(item);
        if (!text) return [];
        if (typeof item === 'object' && item.kind === 'phrase') {
            return text.split(/\s+/).filter(Boolean);
        }
        if (text.length <= 4) {
            return [text];
        }
        return text.split(/[-\s]+/).filter(Boolean);
    }

    getMouthTip(item) {
        const text = this.getDisplayText(item).toLowerCase();
        const sound = typeof item === 'object' ? `${item.sound || ''} ${item.pronunciation || ''}`.toLowerCase() : text;

        if (this.targetLanguage === 'en') {
            if (/th/.test(text)) return 'Keep your tongue lightly between your teeth for TH.';
            if (/r/.test(text)) return 'Pull the tongue back slightly and avoid tapping for the English R.';
            if (/ee|ea|e\b|i\b/.test(text)) return 'Spread your lips slightly and keep the long E sound bright.';
        }

        if (this.targetLanguage === 'fr') {
            if (/r/.test(text)) return 'Use a gentle throat R instead of rolling the tongue.';
            if (/ou|u\b/.test(text) || /rounded/.test(sound)) return 'Round your lips tightly and keep the tongue forward.';
            if (/nasal|an|on|in/.test(sound + text)) return 'Let the sound resonate through the nose and do not pronounce the final N.';
        }

        if (this.targetLanguage === 'zh') {
            if (/[34]/.test(sound)) return 'Keep the tone shape clear: third tone dips, fourth tone falls strongly.';
            if (/x|q|j|zh|sh|ch/.test(sound + text)) return 'Keep the tongue high and the airflow narrow for these consonants.';
        }

        if (this.targetLanguage === 'ky') {
            if (/[өү]/.test(text)) return 'Round your lips and keep the vowel pure from start to finish.';
            if (/ң/.test(text)) return 'Finish with the back of the tongue raised for NG.';
        }

        if (this.targetLanguage === 'ru') {
            if (/ь|мяг/.test(sound + text)) return 'Soften the consonant by lifting the middle of the tongue toward the palate.';
            if (/р/.test(text)) return 'Tap the Russian R clearly and keep it energetic.';
            if (/ё|ю|я/.test(text)) return 'Open the vowel clearly and lean into the stressed syllable.';
        }

        return this.ui.text.defaultMouthTip || 'Watch the shape of your mouth and keep the sound smooth.';
    }

    getIntonationTip(item) {
        const text = this.getDisplayText(item);
        if (!text) {
            return this.ui.text.defaultRhythmTip || 'Keep the phrase even and clear.';
        }
        const words = text.split(/\s+/).filter(Boolean);
        if (typeof item === 'object' && item.kind === 'phrase') {
            const focusWord = words.reduce((best, word) => word.length > best.length ? word : best, words[0] || '');
            const endsQuestion = /[?？]$/.test(text);
            const contour = endsQuestion ? 'Let your voice rise a little at the end.' : 'Finish with a calm falling tone.';
            return focusWord
                ? `Stress "${focusWord}" a little more. ${contour}`
                : contour;
        }
        if (words.length === 1 && words[0]) {
            return `Keep the strongest energy on "${words[0]}".`;
        }
        return this.ui.text.defaultRhythmTip || 'Keep the phrase even and clear.';
    }

    scoreSpeechAttempt(expectedText, heardText) {
        const expected = this.normalizeForSpeechCompare(expectedText);
        const heard = this.normalizeForSpeechCompare(heardText);
        const expectedWords = expected ? expected.split(' ').filter(Boolean) : [];
        const heardWords = heard ? heard.split(' ').filter(Boolean) : [];
        const missed = expectedWords.filter(word => !heardWords.includes(word));
        const extra = heardWords.filter(word => !expectedWords.includes(word));
        const matches = expectedWords.filter(word => heardWords.includes(word)).length;
        const score = expectedWords.length ? Math.round((matches / expectedWords.length) * 100) : 0;
        return { missed, extra, score };
    }

    getMinimalPairCandidate(item) {
        const currentText = this.getNormalizedText(item);
        if (!currentText || !this.currentList.length) return null;
        const sound = typeof item === 'object' ? (item.sound || '') : '';

        const scored = this.currentList
            .filter(candidate => this.getItemKey(candidate) !== this.getItemKey(item))
            .map(candidate => {
                const candidateText = this.getNormalizedText(candidate);
                if (!candidateText) return null;
                let score = 0;
                if (candidateText.length === currentText.length) score += 3;
                if (candidateText[0] === currentText[0]) score += 2;
                if (candidateText.slice(-1) === currentText.slice(-1)) score += 2;
                if (sound && typeof candidate === 'object' && candidate.sound === sound) score += 4;
                if (Math.abs(candidateText.length - currentText.length) <= 2) score += 2;
                return { candidate, score };
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score);

        return scored[0]?.score > 0 ? scored[0].candidate : null;
    }

    buildListeningOptions(item) {
        const target = this.getDisplayText(item);
        const distractors = this.currentList
            .filter(candidate => this.getItemKey(candidate) !== this.getItemKey(item))
            .map(candidate => this.getDisplayText(candidate))
            .filter(Boolean)
            .filter(text => text !== target)
            .slice(0, 6);
        const selected = [target];
        while (selected.length < 3 && distractors.length) {
            const next = distractors.splice(Math.floor(Math.random() * distractors.length), 1)[0];
            if (!selected.includes(next)) selected.push(next);
        }
        const options = [...selected];
        this.shuffle(options);
        return options;
    }

    buildPracticeLabData() {
        const item = this.getCurrentItem();
        const stats = item ? this.getItemStats(item) : { attempts: 0, successes: 0 };
        const mastery = item ? this.getMasteryPercent(item) : 0;
        const minimalPair = item ? this.getMinimalPairCandidate(item) : null;
        return {
            masteryLabel: `${this.ui.text.mastery || 'Mastery'} ${mastery}%`,
            syllables: this.getSyllableParts(item),
            activeSyllable: -1,
            mouthTip: this.getMouthTip(item),
            intonationTip: this.getIntonationTip(item),
            minimalPairText: minimalPair
                ? `${this.getDisplayText(item)} / ${this.getDisplayText(minimalPair)}`
                : (this.ui.text.noMinimalPair || 'No contrast partner yet.'),
            listenQuiz: this.listeningQuiz
                ? {
                    visible: true,
                    question: this.ui.text.listenQuizQuestion || 'Which one did you hear?',
                    result: this.listeningQuiz.result || '',
                    options: this.listeningQuiz.options.map((option, index) => ({
                        label: option,
                        state: this.listeningQuiz.revealed
                            ? (option === this.listeningQuiz.correct
                                ? 'correct'
                                : (index === this.listeningQuiz.selectedIndex ? 'wrong' : ''))
                            : ''
                    }))
                }
                : { visible: false }
        };
    }

    updatePracticeLab(activeSyllable = -1) {
        const data = this.buildPracticeLabData();
        data.activeSyllable = activeSyllable;
        this.ui.renderPronunciationLab(data);
    }

    clearSyllableHighlightTimer() {
        if (this.activeSyllableTimer) {
            clearInterval(this.activeSyllableTimer);
            this.activeSyllableTimer = null;
        }
    }

    highlightSyllablesForPlayback(item, rate = 0.7) {
        this.clearSyllableHighlightTimer();
        const parts = this.getSyllableParts(item);
        if (!parts.length) {
            this.updatePracticeLab(-1);
            return;
        }
        let index = 0;
        this.updatePracticeLab(index);
        const duration = Math.max(260, Math.round((900 / Math.max(rate, 0.55))));
        this.activeSyllableTimer = setInterval(() => {
            index += 1;
            if (index >= parts.length) {
                this.clearSyllableHighlightTimer();
                this.updatePracticeLab(-1);
                return;
            }
            this.updatePracticeLab(index);
        }, duration);
    }

    speakCurrentItem(rate = null, onEnd = null) {
        const item = this.getCurrentItem();
        if (!item) return;
        const speechText = this.getText(item);
        this.highlightSyllablesForPlayback(item, rate ?? 0.9);
        this.voice.speak(speechText, rate, {
            onEnd: () => {
                this.clearSyllableHighlightTimer();
                this.updatePracticeLab(-1);
                if (onEnd) onEnd();
            }
        });
    }

    playSlowAudio() {
        if (this.isPaused || !this.currentList.length) return;
        this.speakCurrentItem(0.62);
    }

    startShadowing() {
        if (this.isPaused || !this.currentList.length) return;
        clearTimeout(this.shadowTimeout);
        this.resetSpeechFeedback();
        this.speakCurrentItem(0.72, () => {
            this.shadowTimeout = setTimeout(() => {
                this.toggleRecording();
            }, 500);
        });
    }

    startListeningQuiz() {
        if (this.isPaused || !this.currentList.length) return;
        const item = this.getCurrentItem();
        const options = this.buildListeningOptions(item);
        this.listeningQuiz = {
            correct: this.getDisplayText(item),
            options,
            result: '',
            revealed: false,
            selectedIndex: -1
        };
        this.updatePracticeLab();
        this.voice.speak(this.getDisplayText(item), 0.88);
        const stats = this.getItemStats(item);
        stats.listens += 1;
    }

    chooseListeningOption(index) {
        if (!this.listeningQuiz) return;
        this.listeningQuiz.selectedIndex = index;
        this.listeningQuiz.revealed = true;
        const chosen = this.listeningQuiz.options[index];
        const correct = chosen === this.listeningQuiz.correct;
        this.listeningQuiz.result = correct
            ? (this.ui.text.listenCorrect || 'Correct')
            : (this.ui.text.listenWrong || 'Listen again');
        if (!correct) {
            this.voice.speak(this.listeningQuiz.correct, 0.88);
        }
        this.updatePracticeLab();
    }

    playMinimalPair() {
        if (this.isPaused || !this.currentList.length) return;
        const item = this.getCurrentItem();
        const pair = this.getMinimalPairCandidate(item);
        if (!pair) {
            this.updatePracticeLab();
            return;
        }
        this.voice.speak(`${this.getDisplayText(item)} ... ${this.getDisplayText(pair)}`, 0.78);
    }

    reinforceCurrentItem(success = false) {
        const item = this.getCurrentItem();
        if (!item || !this.currentList.length) return;
        const key = this.getItemKey(item);
        this.currentList = this.currentList.filter((entry, index) => {
            if (index === this.currentIndex) return true;
            return this.getItemKey(entry) !== key;
        });
        const insertAt = Math.min(this.currentList.length, this.currentIndex + (success ? 4 : 2));
        this.currentList.splice(insertAt, 0, item);
    }

    nextItem() {
        if (this.isPaused) return;

        this.resetSpeechFeedback();
        this.listeningQuiz = null;
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
        this.updatePracticeLab();
        if (this.practiceStyle === 'listening') {
            this.startListeningQuiz();
        } else {
            this.speakCurrentItem();
        }
    }

    prevItem() {
        if (this.isPaused || this.currentIndex === 0) return;

        this.resetSpeechFeedback();
        this.listeningQuiz = null;
        this.currentIndex--;

        const prevItem = this.currentList[this.currentIndex];
        this.ui.updateCard(prevItem, this.isFlipped);
        this.isFlipped = !this.isFlipped;
        this.ui.updateDifficultButton(this.isCurrentItemDifficult());
        this.updatePracticeLab();
        if (this.practiceStyle === 'listening') {
            this.startListeningQuiz();
        } else {
            this.speakCurrentItem();
        }
    }

    repeatItem() {
        if (this.isPaused) return;
        this.speakCurrentItem();
    }

    toggleRecording() {
        if (this.isPaused || !this.currentList.length) return;
        if (this.practiceStyle === 'classic' || this.practiceStyle === 'listening') return;
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
        this.updatePracticeLab();
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
            clearTimeout(this.shadowTimeout);
            this.clearSyllableHighlightTimer();
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
        clearTimeout(this.shadowTimeout);
        this.clearSyllableHighlightTimer();
        this.ui.updateDifficultSummary(this.difficultItems.length);
        this.ui.showScreen('end');
    }

    exitToMenu() {
        this.recognition.stop();
        clearTimeout(this.shadowTimeout);
        this.clearSyllableHighlightTimer();
        this.resetSpeechFeedback();
        this.timer.stop();
        this.practiceSourceList = null;
        this.listeningQuiz = null;
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
        const analysis = state === 'result' ? this.scoreSpeechAttempt(expectedText, transcript) : null;
        const analysisText = analysis
            ? [
                `${this.ui.text.speechScore || 'Score'}: ${analysis.score}%`,
                analysis.missed.length ? `${this.ui.text.speechMissed || 'Missed'}: ${analysis.missed.join(', ')}` : '',
                analysis.extra.length ? `${this.ui.text.speechExtra || 'Extra'}: ${analysis.extra.join(', ')}` : ''
            ].filter(Boolean).join(' | ')
            : '';
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
            analysis: analysisText,
            badge: isMatch
                ? (this.ui.text.speechGreat || 'Great pronunciation!')
                : (isClose ? (this.ui.text.speechTryAgain || 'Try again') : '')
        };
    }

    handleRecognitionUpdate({ state, transcript = '', expectedText = '' }) {
        if (state === 'result') {
            const item = this.getCurrentItem();
            const stats = this.getItemStats(item);
            stats.attempts += 1;
            if (this.isSpeechMatch(expectedText, transcript)) {
                stats.successes += 1;
                this.reinforceCurrentItem(true);
            } else {
                stats.misses += 1;
                this.reinforceCurrentItem(false);
            }
        }
        this.speechFeedback = this.buildSpeechFeedback(state, transcript, expectedText);
        this.ui.updateRecordButton(this.recognition.isListening, this.recognition.supported);
        this.ui.updateSpeechFeedback(this.speechFeedback);
        this.updatePracticeLab();
    }

    resetSpeechFeedback() {
        this.recognition.stop();
        this.speechFeedback = this.buildSpeechFeedback('idle');
        this.ui.updateRecordButton(false, this.recognition.supported);
        this.ui.updateSpeechFeedback(this.speechFeedback);
        this.updatePracticeLab();
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
