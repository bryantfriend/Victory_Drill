import { getWordMeaning } from './i18n.js';

export class UIManager {
    constructor(callbacks) {
        this.callbacks = callbacks; // { onSpeak, onSpeakWord, onChangeMode, onSelectCategory, onNextItem, onPrevItem, onRepeatItem, onTogglePause, onExit, onReplay }
        this.language = 'ru';
        this.targetLanguage = 'ru';
        this.text = {};
        this.showPronunciation = true;
        this.showMeanings = true;
        this.allCategories = [];

        // Screens
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen')
        };
        this.splashScreen = document.getElementById('splash-screen');

        // DOM Elements
        this.appContainer = document.getElementById('app-container');
        this.splashVideo = document.getElementById('splash-video');
        this.splashOverlay = document.getElementById('splash-overlay');
        this.startSplashBtn = document.getElementById('start-splash');
        this.skipSplashBtn = document.getElementById('skip-splash');
        this.languageList = document.getElementById('language-list');
        this.targetLanguageList = document.getElementById('target-language-list');
        this.categoryList = document.getElementById('category-list');
        this.categoryPrevBtn = document.getElementById('category-prev');
        this.categoryNextBtn = document.getElementById('category-next');
        this.categorySearch = document.getElementById('category-search');
        this.categoryCount = document.getElementById('category-count');
        this.categoryEmpty = document.getElementById('category-empty');
        this.pronunciationToggleLabel = document.getElementById('pronunciation-toggle-label');
        this.pronunciationToggleHint = document.getElementById('pronunciation-toggle-hint');
        this.pronunciationToggleBtn = document.getElementById('pronunciation-toggle-btn');
        this.meaningToggleLabel = document.getElementById('meaning-toggle-label');
        this.meaningToggleHint = document.getElementById('meaning-toggle-hint');
        this.meaningToggleBtn = document.getElementById('meaning-toggle-btn');
        this.practiceStyleLabel = document.getElementById('practice-style-label');
        this.timeDisplay = document.getElementById('time-display');
        this.scoreDisplay = document.getElementById('score-display');
        this.finalScore = document.getElementById('final-score');
        this.difficultSummary = document.getElementById('difficult-summary');
        this.speechFeedback = document.getElementById('speech-feedback');
        this.speechFeedbackLabel = document.getElementById('speech-feedback-label');
        this.speechFeedbackStatus = document.getElementById('speech-feedback-status');
        this.speechFeedbackBadge = document.getElementById('speech-feedback-badge');
        this.speechFeedbackHeardWrap = document.getElementById('speech-feedback-heard-wrap');
        this.speechFeedbackHeardLabel = document.getElementById('speech-feedback-heard-label');
        this.speechFeedbackHeard = document.getElementById('speech-feedback-heard');
        this.labTitle = document.getElementById('lab-title');
        this.labSubtitle = document.getElementById('lab-subtitle');
        this.masteryChip = document.getElementById('mastery-chip');
        this.syllableHighlightLabel = document.getElementById('syllable-highlight-label');
        this.syllableHighlight = document.getElementById('syllable-highlight');
        this.mouthTipLabel = document.getElementById('mouth-tip-label');
        this.mouthTip = document.getElementById('mouth-tip');
        this.intonationLabel = document.getElementById('intonation-label');
        this.intonationTip = document.getElementById('intonation-tip');
        this.minimalPairPanelLabel = document.getElementById('minimal-pair-panel-label');
        this.minimalPairText = document.getElementById('minimal-pair-text');
        this.slowPlayLabel = document.getElementById('slow-play-label');
        this.shadowLabel = document.getElementById('shadow-label');
        this.listenQuizLabel = document.getElementById('listen-quiz-label');
        this.minimalPairLabel = document.getElementById('minimal-pair-label');
        this.listenQuizPanel = document.getElementById('listen-quiz-panel');
        this.listenQuizQuestion = document.getElementById('listen-quiz-question');
        this.listenQuizResult = document.getElementById('listen-quiz-result');
        this.listenQuizOptions = document.getElementById('listen-quiz-options');
        this.pronunciationLab = document.getElementById('pronunciation-lab');
        this.pronunciationLabActions = document.getElementById('pronunciation-lab-actions');
        this.pronunciationLabBody = document.getElementById('pronunciation-lab-body');

        this.card = document.getElementById('drill-card');
        this.cardFront = document.getElementById('card-front');
        this.cardBack = document.getElementById('card-back');
        this.pauseOverlay = document.getElementById('pause-overlay');

        // Buttons
        this.prevBtn = document.getElementById('prev-btn');
        this.markDifficultBtn = document.getElementById('mark-difficult-btn');
        this.recordBtn = document.getElementById('record-btn');
        this.playBtn = document.getElementById('play-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.practiceDifficultBtn = document.getElementById('practice-difficult-btn');
        this.slowPlayBtn = document.getElementById('slow-play-btn');
        this.shadowBtn = document.getElementById('shadow-btn');
        this.listenQuizBtn = document.getElementById('listen-quiz-btn');
        this.minimalPairBtn = document.getElementById('minimal-pair-btn');
        this.practiceStyleButtons = Array.from(document.querySelectorAll('.practice-style-btn'));

        // Setup Event Listeners
        if (this.card) this.card.onclick = () => this.callbacks.onNextItem();
        if (this.prevBtn) this.prevBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onPrevItem(); };
        if (this.markDifficultBtn) this.markDifficultBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onToggleDifficult(); };
        if (this.recordBtn) this.recordBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onRecord(); };
        if (this.playBtn) this.playBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onRepeatItem(); };
        if (this.nextBtn) this.nextBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onNextItem(); };
        if (this.practiceDifficultBtn) this.practiceDifficultBtn.onclick = () => this.callbacks.onPracticeDifficult();
        if (this.pronunciationToggleBtn) this.pronunciationToggleBtn.onclick = () => this.callbacks.onTogglePronunciation();
        if (this.meaningToggleBtn) this.meaningToggleBtn.onclick = () => this.callbacks.onToggleMeanings();
        if (this.categorySearch) this.categorySearch.oninput = () => this.applyCategoryFilter();
        if (this.categoryPrevBtn) this.categoryPrevBtn.onclick = () => this.scrollCategories(-1);
        if (this.categoryNextBtn) this.categoryNextBtn.onclick = () => this.scrollCategories(1);
        if (this.slowPlayBtn) this.slowPlayBtn.onclick = () => this.callbacks.onSlowPlay();
        if (this.shadowBtn) this.shadowBtn.onclick = () => this.callbacks.onShadow();
        if (this.listenQuizBtn) this.listenQuizBtn.onclick = () => this.callbacks.onStartListeningQuiz();
        if (this.minimalPairBtn) this.minimalPairBtn.onclick = () => this.callbacks.onPlayMinimalPair();
        this.practiceStyleButtons.forEach(btn => {
            btn.onclick = () => this.callbacks.onChangePracticeStyle(btn.id.replace('style-', ''));
        });
    }

    applyTranslations(language, text) {
        this.language = language;
        this.text = text;

        document.getElementById('app-title').innerText = text.appTitle;
        const versionEl = document.getElementById('app-version');
        if (versionEl) {
            versionEl.innerText = 'Build 2026.03.22c';
        }
        document.getElementById('language-prompt').innerText = text.languagePrompt;
        document.getElementById('target-language-prompt').innerText = text.targetLanguagePrompt;
        document.getElementById('category-prompt').innerText = text.categoryPrompt;
        this.categorySearch.placeholder = text.categorySearchPlaceholder || 'Search categories';
        this.categoryEmpty.innerText = text.categoryEmpty || 'No categories match your search.';
        this.pronunciationToggleLabel.innerText = text.pronunciationToggle;
        this.pronunciationToggleHint.innerText = text.pronunciationToggleHint;
        this.meaningToggleLabel.innerText = text.meaningToggle;
        this.meaningToggleHint.innerText = text.meaningToggleHint;
        if (this.practiceStyleLabel) this.practiceStyleLabel.innerText = text.practiceStyleLabel || 'Practice style';
        document.getElementById('timer-label').innerText = text.timerLabel;
        document.getElementById('mode-letters').innerHTML = `<i data-lucide="type" class="w-4 h-4"></i><span>${text.modeLetters}</span>`;
        document.getElementById('mode-topic-words').innerHTML = `<i data-lucide="tag" class="w-4 h-4"></i><span>${text.modeTopicWords}</span>`;
        document.getElementById('mode-sound-words').innerHTML = `<i data-lucide="volume-2" class="w-4 h-4"></i><span>${text.modeSoundWords}</span>`;
        document.getElementById('mode-topic-phrases').innerHTML = `<i data-lucide="message-square" class="w-4 h-4"></i><span>${text.modeTopicPhrases}</span>`;
        document.getElementById('mode-sound-phrases').innerHTML = `<i data-lucide="radio" class="w-4 h-4"></i><span>${text.modeSoundPhrases}</span>`;
        document.getElementById('time-60').innerText = text.timeOneMin;
        document.getElementById('time-120').innerText = text.timeTwoMin;
        document.getElementById('time-free').innerText = text.timeFree;
        document.getElementById('tap-hint').innerText = text.tapHint;
        document.getElementById('pause-title').innerText = text.pause;
        document.getElementById('resume-game').innerText = text.resume;
        document.getElementById('quit-game').innerText = text.quit;
        document.getElementById('end-title').innerText = text.excellent;
        document.getElementById('read-count-label').innerText = text.readCount;
        document.getElementById('words-label').innerText = text.wordsLabel;
        this.speechFeedbackLabel.innerText = text.speechFeedback || 'Speech check';
        this.speechFeedbackHeardLabel.innerText = text.speechHeard || 'What I heard';
        if (this.labTitle) this.labTitle.innerText = text.labTitle || 'Pronunciation Lab';
        if (this.labSubtitle) this.labSubtitle.innerText = text.labSubtitle || 'Practice the sound, rhythm, and contrast of this card.';
        if (this.syllableHighlightLabel) this.syllableHighlightLabel.innerText = text.syllableLabel || 'Syllables';
        if (this.mouthTipLabel) this.mouthTipLabel.innerText = text.mouthTipLabel || 'Mouth Tip';
        if (this.intonationLabel) this.intonationLabel.innerText = text.intonationLabel || 'Rhythm';
        if (this.minimalPairPanelLabel) this.minimalPairPanelLabel.innerText = text.minimalPairPanelLabel || 'Minimal Pair';
        if (this.slowPlayLabel) this.slowPlayLabel.innerText = text.slowPlay || 'Slow';
        if (this.shadowLabel) this.shadowLabel.innerText = text.shadowMode || 'Shadow';
        if (this.listenQuizLabel) this.listenQuizLabel.innerText = text.listenQuiz || 'Listen';
        if (this.minimalPairLabel) this.minimalPairLabel.innerText = text.minimalPairAction || 'Contrast';
        if (this.listenQuizQuestion) this.listenQuizQuestion.innerText = text.listenQuizQuestion || 'Which one did you hear?';
        const classicBtn = document.getElementById('style-classic');
        const coachBtn = document.getElementById('style-coach');
        const speakingBtn = document.getElementById('style-speaking');
        const listeningBtn = document.getElementById('style-listening');
        if (classicBtn) classicBtn.innerText = text.practiceStyleClassic || 'Classic';
        if (coachBtn) coachBtn.innerText = text.practiceStyleCoach || 'Coach';
        if (speakingBtn) speakingBtn.innerText = text.practiceStyleSpeaking || 'Speaking';
        if (listeningBtn) listeningBtn.innerText = text.practiceStyleListening || 'Listening';
        document.getElementById('menu-btn').innerText = text.menu;
        document.getElementById('replay-btn').innerText = text.replay;
        this.practiceDifficultBtn.innerText = text.difficult;
        this.updatePronunciationToggle(this.showPronunciation);
        this.updateMeaningToggle(this.showMeanings);
        this.updateRecordButton(false, true);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    setTargetLanguage(language) {
        this.targetLanguage = language;
    }

    renderLanguages(languages, selectedLanguage) {
        this.renderLanguageSelector(this.languageList, 'language-btn', languages, selectedLanguage, (code) => this.callbacks.onChangeLanguage(code));
        this.updateLanguageButtons(selectedLanguage);
    }

    renderTargetLanguages(languages, selectedLanguage) {
        this.renderLanguageSelector(this.targetLanguageList, 'target-language-btn', languages, selectedLanguage, (code) => this.callbacks.onChangeTargetLanguage(code));
        this.updateTargetLanguageButtons(selectedLanguage);
    }

    renderLanguageSelector(container, className, languages, selectedLanguage, onClick) {
        container.innerHTML = '';
        languages.forEach(language => {
            const btn = document.createElement('button');
            btn.className = `${className} btn-3d bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-3 rounded-xl text-sm border-b-4 border-slate-300`;
            btn.dataset.language = language.code;
            btn.style.setProperty('--shadow-color', '#cbd5e1');
            btn.innerText = language.label;
            btn.onclick = () => onClick(language.code);
            container.appendChild(btn);
        });
        this.updateSelectorButtons(container, selectedLanguage);
    }

    updateLanguageButtons(selectedLanguage) {
        this.updateSelectorButtons(this.languageList, selectedLanguage);
    }

    updateTargetLanguageButtons(selectedLanguage) {
        this.updateSelectorButtons(this.targetLanguageList, selectedLanguage);
    }

    updateSelectorButtons(container, selectedLanguage) {
        container.querySelectorAll('button').forEach(btn => {
            const isSelected = btn.dataset.language === selectedLanguage;
            btn.classList.toggle('selected', isSelected);
            btn.classList.toggle('bg-indigo-600', isSelected);
            btn.classList.toggle('text-white', isSelected);
            btn.classList.toggle('bg-slate-100', !isSelected);
            btn.classList.toggle('text-slate-700', !isSelected);
        });
    }

    showScreen(name) {
        Object.values(this.screens).forEach(s => s.classList.add('hidden'));
        this.screens[name].classList.remove('hidden');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    updateTimer(timeString, isAlert) {
        this.timeDisplay.innerText = timeString;
        this.timeDisplay.classList.toggle('text-red-600', isAlert);
    }

    updateScore(score) {
        this.scoreDisplay.innerText = score;
        this.finalScore.innerText = score;
    }

    updateDifficultSummary(count) {
        this.difficultSummary.innerText = `${this.text.difficultCards || 'Сложных карточек'}: ${count}`;
        this.difficultSummary.classList.toggle('hidden', count === 0);
        this.practiceDifficultBtn.classList.toggle('hidden', count === 0);
    }

    updateDifficultButton(isMarked) {
        this.markDifficultBtn.classList.toggle('bg-amber-100', !isMarked);
        this.markDifficultBtn.classList.toggle('hover:bg-amber-200', !isMarked);
        this.markDifficultBtn.classList.toggle('text-amber-700', !isMarked);
        this.markDifficultBtn.classList.toggle('border-amber-300', !isMarked);

        this.markDifficultBtn.classList.toggle('bg-amber-500', isMarked);
        this.markDifficultBtn.classList.toggle('hover:bg-amber-600', isMarked);
        this.markDifficultBtn.classList.toggle('text-white', isMarked);
        this.markDifficultBtn.classList.toggle('border-amber-700', isMarked);

        const iconName = isMarked ? 'bookmark-check' : 'bookmark-plus';
        this.markDifficultBtn.innerHTML = `<i data-lucide="${iconName}" class="w-6 h-6"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    updateRecordButton(isListening, isSupported) {
        this.recordBtn.classList.toggle('is-listening', isListening);
        this.recordBtn.classList.toggle('is-disabled', !isSupported);
        this.recordBtn.classList.toggle('bg-sky-100', !isListening && isSupported);
        this.recordBtn.classList.toggle('hover:bg-sky-200', !isListening && isSupported);
        this.recordBtn.classList.toggle('text-sky-700', !isListening && isSupported);
        this.recordBtn.classList.toggle('border-sky-300', !isListening && isSupported);
        this.recordBtn.classList.toggle('bg-rose-500', isListening);
        this.recordBtn.classList.toggle('hover:bg-rose-600', isListening);
        this.recordBtn.classList.toggle('text-white', isListening);
        this.recordBtn.classList.toggle('border-rose-700', isListening);
        this.recordBtn.classList.toggle('bg-slate-200', !isSupported);
        this.recordBtn.classList.toggle('text-slate-400', !isSupported);
        this.recordBtn.classList.toggle('border-slate-300', !isSupported);
        this.recordBtn.disabled = !isSupported;
        this.recordBtn.title = isListening
            ? (this.text.speechStop || 'Stop recording')
            : (this.text.speechRecord || 'Record your voice');
        this.recordBtn.style.setProperty('--shadow-color', isListening ? '#9f1239' : (isSupported ? '#38bdf8' : '#94a3b8'));
        this.recordBtn.innerHTML = `<span class="record-btn-ring" aria-hidden="true"></span><i data-lucide="${isListening ? 'mic-off' : 'mic'}" class="w-6 h-6"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    updateSpeechFeedback(feedback) {
        if (!feedback?.visible) {
            this.speechFeedback.classList.add('hidden');
            this.speechFeedbackBadge.classList.add('hidden');
            this.speechFeedbackHeardWrap.classList.add('hidden');
            this.speechFeedback.dataset.tone = '';
            return;
        }

        this.speechFeedback.classList.remove('hidden');
        this.speechFeedback.dataset.tone = feedback.tone || 'default';
        this.speechFeedbackStatus.innerText = feedback.status || '';
        this.speechFeedbackHeard.innerText = feedback.transcript || '';
        this.speechFeedbackHeardWrap.classList.toggle('hidden', !feedback.transcript);
        this.speechFeedbackHeardWrap.title = feedback.analysis || '';

        const toneMap = {
            success: ['rgba(236, 253, 245, 0.98)', 'rgba(110, 231, 183, 0.9)', '#047857'],
            warning: ['rgba(255, 251, 235, 0.98)', 'rgba(253, 230, 138, 0.95)', '#b45309'],
            listening: ['rgba(240, 249, 255, 0.98)', 'rgba(125, 211, 252, 0.95)', '#0369a1'],
            processing: ['rgba(245, 243, 255, 0.98)', 'rgba(196, 181, 253, 0.95)', '#6d28d9'],
            unsupported: ['rgba(248, 250, 252, 0.98)', 'rgba(203, 213, 225, 0.95)', '#475569'],
            'permission-denied': ['rgba(255, 241, 242, 0.98)', 'rgba(253, 164, 175, 0.95)', '#be123c'],
            'no-speech': ['rgba(255, 251, 235, 0.98)', 'rgba(253, 230, 138, 0.95)', '#b45309'],
            error: ['rgba(255, 241, 242, 0.98)', 'rgba(253, 164, 175, 0.95)', '#be123c']
        };
        const [panelBg, borderColor, accentColor] = toneMap[feedback.tone] || toneMap.error;
        this.speechFeedback.style.background = `linear-gradient(145deg, rgba(255,255,255,0.96), ${panelBg})`;
        this.speechFeedback.style.borderColor = borderColor;
        this.speechFeedbackLabel.style.color = accentColor;
        this.speechFeedbackStatus.style.color = feedback.tone === 'unsupported' ? '#334155' : '#0f172a';
        this.speechFeedbackHeardWrap.style.borderColor = borderColor;

        if (feedback.badge) {
            this.speechFeedbackBadge.innerText = feedback.badge;
            this.speechFeedbackBadge.style.background = panelBg;
            this.speechFeedbackBadge.style.color = accentColor;
            this.speechFeedbackBadge.style.border = `1px solid ${borderColor}`;
            this.speechFeedbackBadge.classList.remove('hidden');
        } else {
            this.speechFeedbackBadge.classList.add('hidden');
        }
    }

    setActiveSyllable(index = -1) {
        if (!this.syllableHighlight) return;
        this.syllableHighlight.querySelectorAll('.syllable-chip').forEach((chip, chipIndex) => {
            chip.classList.toggle('active', chipIndex === index);
        });
    }

    renderPronunciationLab(data = {}) {
        if (!this.masteryChip || !this.mouthTip || !this.intonationTip || !this.minimalPairText || !this.syllableHighlight) {
            return;
        }
        this.masteryChip.innerText = data.masteryLabel || `${this.text.mastery || 'Mastery'} 0%`;
        this.mouthTip.innerText = data.mouthTip || this.text.defaultMouthTip || 'Watch the shape of your mouth and keep the sound smooth.';
        this.intonationTip.innerText = data.intonationTip || this.text.defaultRhythmTip || 'Keep the phrase even and clear.';
        this.minimalPairText.innerText = data.minimalPairText || this.text.noMinimalPair || 'No contrast partner yet.';

        this.syllableHighlight.innerHTML = '';
        (data.syllables || []).forEach((syllable) => {
            const chip = document.createElement('span');
            chip.className = 'syllable-chip';
            chip.innerText = syllable;
            this.syllableHighlight.appendChild(chip);
        });
        this.setActiveSyllable(data.activeSyllable ?? -1);

        if (!this.listenQuizPanel || !this.listenQuizResult || !this.listenQuizQuestion || !this.listenQuizOptions) {
            return;
        }
        this.listenQuizPanel.classList.toggle('hidden', !data.listenQuiz?.visible);
        this.listenQuizResult.innerText = data.listenQuiz?.result || '';
        this.listenQuizQuestion.innerText = data.listenQuiz?.question || this.text.listenQuizQuestion || 'Which one did you hear?';
        this.listenQuizOptions.innerHTML = '';
        (data.listenQuiz?.options || []).forEach((option, index) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'listen-quiz-option';
            btn.innerText = option.label;
            if (option.state === 'correct') btn.classList.add('is-correct');
            if (option.state === 'wrong') btn.classList.add('is-wrong');
            btn.onclick = () => this.callbacks.onChooseListeningOption(index);
            this.listenQuizOptions.appendChild(btn);
        });
    }

    updatePauseUI(isPaused) {
        this.pauseOverlay.classList.toggle('hidden', !isPaused);
    }

    updateModeButtons(mode) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('selected', 'active');
            btn.setAttribute('aria-pressed', 'false');
        });
        const activeBtn = document.getElementById(`mode-${mode}`);
        if (activeBtn) {
            activeBtn.classList.add('selected', 'active');
            activeBtn.setAttribute('aria-pressed', 'true');
        }
    }

    updatePracticeStyleButtons(style) {
        this.practiceStyleButtons.forEach(btn => {
            const isSelected = btn.id === `style-${style}`;
            btn.classList.toggle('selected', isSelected);
        });
    }

    setPracticeStyle(style) {
        if (!this.screens.game) return;
        this.screens.game.classList.remove('game-style-classic', 'game-style-coach', 'game-style-speaking', 'game-style-listening');
        this.screens.game.classList.add(`game-style-${style}`);
        this.updatePracticeStyleButtons(style);
    }

    updateTimerButtons(seconds) {
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('selected'));
        let id = 'time-60';
        if (seconds === 120) id = 'time-120';
        if (seconds === -1) id = 'time-free';
        document.getElementById(id).classList.add('selected');
    }

    renderCategories(categories, colors) {
        this.allCategories = categories.map((cat, index) => ({
            ...cat,
            color: colors[index % colors.length]
        }));
        this.categorySearch.value = '';
        this.applyCategoryFilter();
    }

    applyCategoryFilter() {
        const query = (this.categorySearch.value || '').trim().toLowerCase();
        const filtered = this.allCategories.filter(cat => cat.label.toLowerCase().includes(query));
        this.categoryList.innerHTML = '';
        filtered.forEach(cat => {
            const color = cat.color;
            const btn = document.createElement('button');
            btn.className = `category-option btn-3d ${color.bg} ${color.hover} text-white font-bold py-3 px-4 rounded-2xl text-sm md:text-base border-b-6 flex items-center justify-between text-left transition-all`;
            btn.style.setProperty('--shadow-color', color.shadow);
            const tags = (cat.tags || [])
                .map(tag => `<span class="category-option__tag category-option__tag--${tag.tone || 'default'}">${tag.label || tag}</span>`)
                .join('');
            btn.innerHTML = `
                <span class="category-option__content">
                    <span class="category-option__label">${cat.label}</span>
                    <span class="category-option__tags">${tags}</span>
                </span>
                <span class="category-option__hint">${this.text.categoryOpen || 'Open'}</span>
            `;
            btn.onclick = () => this.callbacks.onSelectCategory(cat.key);
            this.categoryList.appendChild(btn);
        });
        this.categoryCount.innerText = `${filtered.length} ${this.text.categoryCountLabel || 'categories'}`;
        this.categoryEmpty.classList.toggle('hidden', filtered.length !== 0);
        this.updateCategoryRailState(filtered.length);
    }

    scrollCategories(direction) {
        if (!this.categoryList) return;
        const amount = Math.max(220, Math.round(this.categoryList.clientWidth * 0.75)) * direction;
        this.categoryList.scrollBy({ left: amount, behavior: 'smooth' });
    }

    updateCategoryRailState(count) {
        const hasItems = count > 0;
        if (this.categoryPrevBtn) this.categoryPrevBtn.disabled = !hasItems;
        if (this.categoryNextBtn) this.categoryNextBtn.disabled = !hasItems;
    }

    createMetaPill(label, value) {
        const pill = document.createElement('div');
        pill.className = 'bg-indigo-50 text-indigo-800 rounded-full px-3 py-1 text-xs md:text-sm font-semibold';
        pill.innerText = `${label}: ${value}`;
        return pill;
    }

    createPronunciationCard(value) {
        const box = document.createElement('div');
        box.className = 'w-full max-w-md rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 px-4 py-3 text-left shadow-sm';

        const label = document.createElement('div');
        label.className = 'text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-emerald-700 mb-1';
        label.innerText = this.text.pronunciation || 'Произношение';

        const tip = document.createElement('div');
        tip.className = 'text-sm md:text-base font-semibold text-emerald-950 leading-snug';
        tip.innerText = value;

        box.appendChild(label);
        box.appendChild(tip);
        return box;
    }

    updatePronunciationToggle(showPronunciation) {
        this.showPronunciation = showPronunciation;
        this.pronunciationToggleBtn.innerText = showPronunciation ? (this.text.on || 'On') : (this.text.off || 'Off');
        this.pronunciationToggleBtn.classList.toggle('bg-emerald-500', showPronunciation);
        this.pronunciationToggleBtn.classList.toggle('hover:bg-emerald-600', showPronunciation);
        this.pronunciationToggleBtn.classList.toggle('border-emerald-700', showPronunciation);
        this.pronunciationToggleBtn.classList.toggle('bg-slate-300', !showPronunciation);
        this.pronunciationToggleBtn.classList.toggle('hover:bg-slate-400', !showPronunciation);
        this.pronunciationToggleBtn.classList.toggle('border-slate-500', !showPronunciation);
        this.pronunciationToggleBtn.style.setProperty('--shadow-color', showPronunciation ? '#047857' : '#64748b');
    }

    updateMeaningToggle(showMeanings) {
        this.showMeanings = showMeanings;
        this.meaningToggleBtn.innerText = showMeanings ? (this.text.on || 'On') : (this.text.off || 'Off');
        this.meaningToggleBtn.classList.toggle('bg-indigo-500', showMeanings);
        this.meaningToggleBtn.classList.toggle('hover:bg-indigo-600', showMeanings);
        this.meaningToggleBtn.classList.toggle('border-indigo-700', showMeanings);
        this.meaningToggleBtn.classList.toggle('bg-slate-300', !showMeanings);
        this.meaningToggleBtn.classList.toggle('hover:bg-slate-400', !showMeanings);
        this.meaningToggleBtn.classList.toggle('border-slate-500', !showMeanings);
        this.meaningToggleBtn.style.setProperty('--shadow-color', showMeanings ? '#4338ca' : '#64748b');
    }

    hasCyrillic(text) {
        return /[А-Яа-яЁё]/.test(text || '');
    }

    transliterateWithMap(text, map) {
        return (text || '')
            .normalize('NFD')
            .replace(/\u0301/g, '')
            .split('')
            .map(char => {
                const lower = char.toLowerCase();
                if (!(lower in map)) return char;
                const latin = map[lower];
                return char === lower ? latin : `${latin.charAt(0).toUpperCase()}${latin.slice(1)}`;
            })
            .join('');
    }

    transliterateRussian(text) {
        const map = {
            а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y',
            к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
            х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
        };

        return this.transliterateWithMap(text, map);
    }

    transliterateKyrgyz(text) {
        const map = {
            а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y',
            к: 'k', л: 'l', м: 'm', н: 'n', ң: 'ng', о: 'o', ө: 'oe', п: 'p', р: 'r', с: 's', т: 't',
            у: 'u', ү: 'ue', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y',
            ь: '', э: 'e', ю: 'yu', я: 'ya'
        };

        return this.transliterateWithMap(text, map);
    }

    getRussianStressLetterIndex(stressText) {
        if (!stressText) return -1;

        let letterIndex = 0;
        let previousLetterIndex = -1;
        for (const char of stressText.normalize('NFD')) {
            if (char === '\u0301') {
                return previousLetterIndex;
            }
            if (/[А-Яа-яЁё]/.test(char)) {
                if (char === 'ё' || char === 'Ё') {
                    return letterIndex;
                }
                previousLetterIndex = letterIndex;
                letterIndex += 1;
            }
        }

        return -1;
    }

    buildRussianWordPronunciation(content) {
        if (!content?.stress || !content?.syllables?.length) return '';

        const stressedLetterIndex = this.getRussianStressLetterIndex(content.stress);
        let traversedLetters = 0;

        return content.syllables
            .map(syllable => {
                const cleanSyllable = syllable.normalize('NFD').replace(/\u0301/g, '');
                const syllableLetterCount = [...cleanSyllable].filter(char => /[А-Яа-яЁё]/.test(char)).length;
                const isStressed = stressedLetterIndex >= traversedLetters
                    && stressedLetterIndex < traversedLetters + syllableLetterCount;
                traversedLetters += syllableLetterCount;

                const transliterated = this.transliterateRussian(cleanSyllable);
                return isStressed ? transliterated.toUpperCase() : transliterated;
            })
            .join('-');
    }

    buildRussianPhrasePronunciation(text) {
        if (!this.hasCyrillic(text)) return '';
        return this.transliterateRussian(text).replace(/\s+/g, ' ').trim();
    }

    buildKyrgyzWordPronunciation(content) {
        if (!content?.syllables?.length) return '';

        return content.syllables
            .map(syllable => this.transliterateKyrgyz(syllable))
            .join('-');
    }

    buildKyrgyzPhrasePronunciation(text) {
        if (!this.hasCyrillic(text)) return '';
        return this.transliterateKyrgyz(text).replace(/\s+/g, ' ').trim();
    }

    buildFrenchPronunciation(content) {
        if (!content) return '';

        if (content.syllables?.length) {
            return content.syllables.join('-');
        }

        if (content.kind === 'phrase' && content.t) {
            return this.splitPhraseIntoChunks(content.t).join(' / ');
        }

        return '';
    }

    buildChinesePronunciation(content) {
        if (!content) return '';

        if (content.syllables?.length) {
            return content.syllables.join(' ');
        }

        if (content.kind === 'phrase' && content.t) {
            const chunks = this.splitPhraseIntoChunks(content.t);
            if (chunks.length > 1) {
                return chunks.join(' / ');
            }
        }

        return '';
    }

    getMeaning(contentOrText) {
        if (typeof contentOrText === 'object' && contentOrText?.meanings) {
            return contentOrText.meanings[this.language] || contentOrText.meanings.ru || '';
        }
        const text = typeof contentOrText === 'string' ? contentOrText : contentOrText?.t || contentOrText?.w;
        return getWordMeaning(text, this.language);
    }

    getPronunciationHint(content) {
        if (!content || typeof content !== 'object') return '';
        if (content.pronunciation) return content.pronunciation;

        if (this.targetLanguage === 'ru' && content.stress && content.syllables?.length && this.hasCyrillic(content.stress)) {
            return this.buildRussianWordPronunciation(content);
        }

        if (this.targetLanguage === 'ky' && content.syllables?.length && this.hasCyrillic(content.t || content.w || content.l || '')) {
            return content.kind === 'phrase'
                ? this.buildKyrgyzPhrasePronunciation(content.t)
                : this.buildKyrgyzWordPronunciation(content);
        }

        if (this.targetLanguage === 'fr') {
            const frenchHint = this.buildFrenchPronunciation(content);
            if (frenchHint) return frenchHint;
        }

        if (this.targetLanguage === 'zh') {
            const chineseHint = this.buildChinesePronunciation(content);
            if (chineseHint) return chineseHint;
        }

        if (content.syllables?.length) {
            return content.syllables.join('-');
        }

        if (content.kind === 'phrase' && content.t) {
            if (this.targetLanguage === 'ru' && this.hasCyrillic(content.t)) {
                return this.buildRussianPhrasePronunciation(content.t);
            }
            const words = content.t.split(/\s+/).filter(Boolean);
            if (words.length > 1) {
                return words.join(' / ');
            }
        }

        if (content.l && content.n !== undefined && content.s !== undefined) {
            return [content.n, content.s].filter(Boolean).join(' -> ');
        }

        return '';
    }

    splitPhraseIntoChunks(text) {
        return text
            .split(/([,?!])/)
            .map(part => part.trim())
            .filter(Boolean)
            .reduce((chunks, part) => {
                if (/^[,?!]$/.test(part) && chunks.length) {
                    chunks[chunks.length - 1] = `${chunks[chunks.length - 1]}${part}`;
                } else {
                    chunks.push(part);
                }
                return chunks;
            }, []);
    }

    createImageBlock(content, text) {
        const mediaWrap = document.createElement('div');
        mediaWrap.className = 'w-32 h-32 md:w-40 md:h-40 mb-4 relative flex items-center justify-center';

        const fallback = document.createElement('div');
        fallback.className = 'hidden w-full h-full rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-500 p-3 flex-col items-center justify-center text-center';

        const fallbackLabel = document.createElement('div');
        fallbackLabel.className = 'text-xs uppercase tracking-[0.2em] font-bold mb-2';
        fallbackLabel.innerText = this.text.noImage || 'Нет картинки';

        const fallbackWord = document.createElement('div');
        fallbackWord.className = 'text-lg md:text-xl font-black tracking-tight';
        fallbackWord.innerText = content.w || content.t || text;

        fallback.appendChild(fallbackLabel);
        fallback.appendChild(fallbackWord);

        if (content.i) {
            const imgEl = document.createElement('img');
            imgEl.src = content.i;
            imgEl.alt = text;
            imgEl.className = 'w-full h-full object-contain transition-transform hover:scale-110 duration-300 cursor-pointer relative';
            imgEl.onclick = (e) => {
                e.stopPropagation();
                this.callbacks.onSpeakWord(content);
            };
            imgEl.onerror = () => {
                imgEl.remove();
                fallback.classList.remove('hidden');
                fallback.classList.add('flex');
            };
            mediaWrap.appendChild(imgEl);
        } else {
            fallback.classList.remove('hidden');
            fallback.classList.add('flex');
        }

        mediaWrap.appendChild(fallback);
        return mediaWrap;
    }

    renderPhraseContent(element, text, source = text) {
        element.classList.remove('text-6xl', 'md:text-7xl');
        element.classList.add('text-4xl', 'md:text-5xl');

        const stack = document.createElement('div');
        stack.className = 'flex flex-col items-center justify-center gap-4 w-full h-full px-4';

        const phraseEl = document.createElement('div');
        phraseEl.className = 'leading-tight tracking-tight text-center';
        phraseEl.innerText = text;
        stack.appendChild(phraseEl);

        const chunks = this.splitPhraseIntoChunks(text);
        if (chunks.length > 1) {
            const chunkRow = document.createElement('div');
            chunkRow.className = 'flex flex-wrap items-center justify-center gap-2 max-w-full';
            chunks.forEach(chunk => {
                const chunkPill = document.createElement('div');
                chunkPill.className = 'bg-white/80 border border-indigo-100 text-slate-700 rounded-full px-3 py-1 text-sm md:text-base font-semibold';
                chunkPill.innerText = chunk;
                chunkRow.appendChild(chunkPill);
            });
            stack.appendChild(chunkRow);
        }

        const words = text.split(/\s+/).filter(Boolean);
        if (words.length > 1) {
            const helperRow = document.createElement('div');
            helperRow.className = 'flex flex-wrap items-center justify-center gap-2 max-w-full';
            helperRow.appendChild(this.createMetaPill(this.text.wordCount || 'Слов', words.length));
            helperRow.appendChild(this.createMetaPill(this.text.readInChunks || 'Читай по частям', words.join(' | ')));
            stack.appendChild(helperRow);
        }

        const pronunciation = this.getPronunciationHint(typeof source === 'object' ? source : null);
        if (this.showPronunciation && pronunciation) {
            stack.appendChild(this.createPronunciationCard(pronunciation));
        }

        const meaning = this.getMeaning(source);
        if (this.showMeanings && meaning) {
            stack.appendChild(this.createMetaPill(this.text.meaning || 'Значение', meaning));
        }

        element.appendChild(stack);
    }

    renderLetterContent(element, content, text) {
        element.classList.remove('text-6xl', 'md:text-7xl');
        element.classList.add('text-4xl', 'md:text-5xl');

        const stack = document.createElement('div');
        stack.className = 'flex flex-col items-center justify-center gap-3 w-full h-full';

        stack.appendChild(this.createImageBlock(content, text));

        const textEl = document.createElement('div');
        textEl.className = 'leading-none tracking-tight';
        textEl.innerText = text;
        stack.appendChild(textEl);

        if (content.w) {
            const exampleEl = document.createElement('div');
            exampleEl.className = 'text-base md:text-lg font-bold text-slate-500';
            exampleEl.innerText = content.w;
            stack.appendChild(exampleEl);
        }

        const metaRow = document.createElement('div');
        metaRow.className = 'flex flex-wrap items-center justify-center gap-2 max-w-full px-2';
        if (content.n) {
            metaRow.appendChild(this.createMetaPill(this.text.letterName || 'Название', content.n));
        }
        metaRow.appendChild(this.createMetaPill(this.text.sound || 'Звук', content.s || this.text.noSound || 'нет'));
        stack.appendChild(metaRow);

        const pronunciation = this.getPronunciationHint(content);
        if (this.showPronunciation && pronunciation) {
            stack.appendChild(this.createPronunciationCard(pronunciation));
        }

        const meaning = this.getMeaning(content);
        if (this.showMeanings && meaning) {
            stack.appendChild(this.createMetaPill(this.text.meaning || 'Значение', meaning));
        }

        element.appendChild(stack);
    }

    // Helper to render content (handles string or object with image)
    renderContentInto(element, content) {
        element.innerHTML = '';
        if (!content) {
            const emptyEl = document.createElement('div');
            emptyEl.className = 'text-2xl md:text-3xl text-slate-400';
            emptyEl.innerText = 'No content';
            element.appendChild(emptyEl);
            return;
        }
        const text = typeof content === 'string' ? content : (content.t || content.l);
        const isObject = typeof content === 'object' && content !== null;
        const hasRichContent = isObject && (content.i || content.stress || content.syllables || content.sound || content.w || content.meanings);

        if (typeof content === 'string' || content.kind === 'phrase') {
            this.renderPhraseContent(element, text, content);
            return;
        }

        if (content.l && content.n !== undefined) {
            this.renderLetterContent(element, content, text);
            return;
        }

        if (!hasRichContent) {
            element.classList.add('text-6xl', 'md:text-7xl');
            element.classList.remove('text-4xl', 'md:text-5xl');

            const textEl = document.createElement('div');
            textEl.innerText = text;
            element.appendChild(textEl);
            return;
        }

        element.classList.remove('text-6xl', 'md:text-7xl');
        element.classList.add('text-4xl', 'md:text-5xl');

        const stack = document.createElement('div');
        stack.className = 'flex flex-col items-center justify-center gap-3 w-full h-full';

        stack.appendChild(this.createImageBlock(content, text));

        const textWrap = document.createElement('div');
        textWrap.className = 'flex flex-col items-center gap-2';

        const textEl = document.createElement('div');
        textEl.className = 'leading-none tracking-tight';
        textEl.innerText = text;
        textWrap.appendChild(textEl);

        if (content.w && content.l) {
            const exampleEl = document.createElement('div');
            exampleEl.className = 'text-base md:text-lg font-bold text-slate-500';
            exampleEl.innerText = content.w;
            textWrap.appendChild(exampleEl);
        }

        if (content.stress || content.syllables || content.sound) {
            const metaRow = document.createElement('div');
            metaRow.className = 'flex flex-wrap items-center justify-center gap-2 max-w-full px-2';

            if (content.stress) {
                metaRow.appendChild(this.createMetaPill(this.text.stress || 'Ударение', content.stress));
            }

            if (content.syllables?.length) {
                metaRow.appendChild(this.createMetaPill(this.text.syllables || 'Слоги', content.syllables.join('-')));
            }

            if (content.sound) {
                metaRow.appendChild(this.createMetaPill(this.text.sound || 'Звук', content.sound));
            }

            textWrap.appendChild(metaRow);
        }

        const pronunciation = this.getPronunciationHint(content);
        if (this.showPronunciation && pronunciation) {
            textWrap.appendChild(this.createPronunciationCard(pronunciation));
        }

        const meaning = this.getMeaning(content);
        if (this.showMeanings && meaning) {
            textWrap.appendChild(this.createMetaPill(this.text.meaning || 'Значение', meaning));
        }

        stack.appendChild(textWrap);
        element.appendChild(stack);
    }

    setInitialContent(content) {
        this.renderContentInto(this.cardFront, content);
        this.renderContentInto(this.cardBack, content);
        this.card.classList.remove('is-flipped');
    }

    updateCard(content, currentlyFlipped) {
        this.card.classList.toggle('is-flipped');
        // Update BOTH faces to ensure the hidden face doesn't retain old data/audio handlers
        this.renderContentInto(this.cardFront, content);
        this.renderContentInto(this.cardBack, content);
    }
}
