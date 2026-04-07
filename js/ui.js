import { getLanguageName, getWordMeaning } from './i18n.js?v=20260407a';

export class UIManager {
    constructor(callbacks) {
        this.callbacks = callbacks; // { onSpeak, onSpeakWord, onChangeMode, onSelectCategory, onNextItem, onPrevItem, onRepeatItem, onTogglePause, onExit, onReplay }
        this.language = 'ru';
        this.targetLanguage = 'ru';
        this.practiceStyle = 'classic';
        this.listeningPauseSeconds = 5;
        this.selectedTime = 60;
        this.text = {};
        this.showPronunciation = true;
        this.showMeanings = true;
        this.allCategories = [];
        this.categoryLayout = 'rail';

        // Screens
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen')
        };
        this.splashScreen = document.getElementById('splash-screen');

        // DOM Elements
        this.appContainer = document.getElementById('app-container');
        this.languageGateScreen = document.getElementById('language-gate-screen');
        this.appLanguageList = document.getElementById('app-language-list');
        this.splashVideo = document.getElementById('splash-video');
        this.splashOverlay = document.getElementById('splash-overlay');
        this.startSplashBtn = document.getElementById('start-splash');
        this.skipSplashBtn = document.getElementById('skip-splash');
        this.splashBadge = document.getElementById('splash-badge');
        this.splashTitle = document.getElementById('splash-title');
        this.splashSubtitle = document.getElementById('splash-subtitle');
        this.splashPillBase = document.getElementById('splash-pill-base');
        this.splashPillTarget = document.getElementById('splash-pill-target');
        this.splashPillSupport = document.getElementById('splash-pill-support');
        this.startSplashLabel = document.getElementById('start-splash-label');
        this.splashActionHint = document.getElementById('splash-action-hint');
        this.skipSplashLabel = document.getElementById('skip-splash-label');
        this.languageList = document.getElementById('language-list');
        this.targetLanguageList = document.getElementById('target-language-list');
        this.categoryList = document.getElementById('category-list');
        this.categoryPrevBtn = document.getElementById('category-prev');
        this.categoryNextBtn = document.getElementById('category-next');
        this.categorySearch = document.getElementById('category-search');
        this.categoryCount = document.getElementById('category-count');
        this.categoryEmpty = document.getElementById('category-empty');
        this.openSettingsBtn = document.getElementById('open-settings');
        this.openSavedBtn = document.getElementById('open-saved-items');
        this.openTeacherBtn = document.getElementById('open-teacher-tools');
        this.openSettingsInlineBtn = document.getElementById('open-settings-inline');
        this.settingsModal = document.getElementById('settings-modal');
        this.settingsBackdrop = document.getElementById('settings-backdrop');
        this.closeSettingsBtn = document.getElementById('close-settings');
        this.settingsDoneBtn = document.getElementById('settings-done');
        this.settingsTriggerLabel = document.getElementById('settings-trigger-label');
        this.settingsInlineLabel = document.getElementById('settings-inline-label');
        this.settingsTitle = document.getElementById('settings-title');
        this.settingsSubtitle = document.getElementById('settings-subtitle');
        this.settingsDoneLabel = document.getElementById('settings-done-label');
        this.settingsSummaryTitle = document.getElementById('settings-summary-title');
        this.settingsSummarySubtitle = document.getElementById('settings-summary-subtitle');
        this.settingsSummaryPills = document.getElementById('settings-summary-pills');
        this.teacherModal = document.getElementById('teacher-modal');
        this.teacherBackdrop = document.getElementById('teacher-backdrop');
        this.closeTeacherBtn = document.getElementById('close-teacher');
        this.teacherDoneBtn = document.getElementById('teacher-done');
        this.teacherTriggerLabel = document.getElementById('teacher-trigger-label');
        this.teacherTitle = document.getElementById('teacher-title');
        this.teacherSubtitle = document.getElementById('teacher-subtitle');
        this.teacherHomeworkLabel = document.getElementById('teacher-homework-label');
        this.teacherHomeworkTitle = document.getElementById('teacher-homework-title');
        this.teacherCategoryLabel = document.getElementById('teacher-category-label');
        this.teacherCategorySelect = document.getElementById('teacher-category-select');
        this.teacherTaskLabel = document.getElementById('teacher-task-label');
        this.teacherTaskSelect = document.getElementById('teacher-task-select');
        this.teacherLimitLabel = document.getElementById('teacher-limit-label');
        this.teacherLimitSelect = document.getElementById('teacher-limit-select');
        this.teacherRepeatLabel = document.getElementById('teacher-repeat-label');
        this.teacherRepeatSelect = document.getElementById('teacher-repeat-select');
        this.teacherGoalLabel = document.getElementById('teacher-goal-label');
        this.teacherGoalSelect = document.getElementById('teacher-goal-select');
        this.teacherSpeakingLabel = document.getElementById('teacher-speaking-label');
        this.teacherSpeakingHint = document.getElementById('teacher-speaking-hint');
        this.teacherSpeakingBtn = document.getElementById('teacher-speaking-btn');
        this.teacherSummaryLabel = document.getElementById('teacher-summary-label');
        this.teacherSummaryPills = document.getElementById('teacher-summary-pills');
        this.teacherSummaryHint = document.getElementById('teacher-summary-hint');
        this.teacherLinkLabel = document.getElementById('teacher-link-label');
        this.teacherLinkOutput = document.getElementById('teacher-link-output');
        this.teacherLinkHint = document.getElementById('teacher-link-hint');
        this.teacherQrLabel = document.getElementById('teacher-qr-label');
        this.teacherQrHint = document.getElementById('teacher-qr-hint');
        this.teacherQrCode = document.getElementById('teacher-qr-code');
        this.copyTeacherLinkBtn = document.getElementById('copy-teacher-link');
        this.teacherDoneLabel = document.getElementById('teacher-done-label');
        this.savedModal = document.getElementById('saved-modal');
        this.savedBackdrop = document.getElementById('saved-backdrop');
        this.closeSavedBtn = document.getElementById('close-saved');
        this.savedDoneBtn = document.getElementById('saved-done');
        this.savedTriggerLabel = document.getElementById('saved-trigger-label');
        this.savedTitle = document.getElementById('saved-title');
        this.savedSubtitle = document.getElementById('saved-subtitle');
        this.savedEmpty = document.getElementById('saved-empty');
        this.savedGroups = document.getElementById('saved-groups');
        this.savedDoneLabel = document.getElementById('saved-done-label');
        this.voiceLabel = document.getElementById('voice-label');
        this.voiceSelect = document.getElementById('voice-select');
        this.speechSpeedLabel = document.getElementById('speech-speed-label');
        this.speechSpeedHint = document.getElementById('speech-speed-hint');
        this.speechSpeedRange = document.getElementById('speech-speed-range');
        this.speechSpeedValue = document.getElementById('speech-speed-value');
        this.listeningPauseLabel = document.getElementById('listening-pause-label');
        this.listeningPauseHint = document.getElementById('listening-pause-hint');
        this.listeningPauseRange = document.getElementById('listening-pause-range');
        this.listeningPauseValue = document.getElementById('listening-pause-value');
        this.autoPlayLabel = document.getElementById('auto-play-label');
        this.autoPlayHint = document.getElementById('auto-play-hint');
        this.autoPlayBtn = document.getElementById('auto-play-btn');
        this.splashToggleLabel = document.getElementById('splash-toggle-label');
        this.splashToggleHint = document.getElementById('splash-toggle-hint');
        this.splashToggleBtn = document.getElementById('splash-toggle-btn');
        this.setupStepLanguages = document.getElementById('setup-step-languages');
        this.setupStepMode = document.getElementById('setup-step-mode');
        this.setupStepCategory = document.getElementById('setup-step-category');
        this.pronunciationToggleLabel = document.getElementById('pronunciation-toggle-label');
        this.pronunciationToggleHint = document.getElementById('pronunciation-toggle-hint');
        this.pronunciationToggleBtn = document.getElementById('pronunciation-toggle-btn');
        this.meaningToggleLabel = document.getElementById('meaning-toggle-label');
        this.meaningToggleHint = document.getElementById('meaning-toggle-hint');
        this.meaningToggleBtn = document.getElementById('meaning-toggle-btn');
        this.practiceStyleLabel = document.getElementById('practice-style-label');
        this.timeDisplay = document.getElementById('time-display');
        this.scoreDisplay = document.getElementById('score-display');
        this.assignmentBanner = document.getElementById('assignment-banner');
        this.assignmentBannerLabel = document.getElementById('assignment-banner-label');
        this.assignmentBannerTitle = document.getElementById('assignment-banner-title');
        this.assignmentBannerPills = document.getElementById('assignment-banner-pills');
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
        this.visualGuideLabel = document.getElementById('visual-guide-label');
        this.listenQuizPanel = document.getElementById('listen-quiz-panel');
        this.listenQuizQuestion = document.getElementById('listen-quiz-question');
        this.listenQuizResult = document.getElementById('listen-quiz-result');
        this.listenQuizOptions = document.getElementById('listen-quiz-options');
        this.listeningPromptData = null;
        this.pronunciationLab = document.getElementById('pronunciation-lab');
        this.pronunciationLabActions = document.getElementById('pronunciation-lab-actions');
        this.pronunciationLabBody = document.getElementById('pronunciation-lab-body');
        this.visualGuideBtn = document.getElementById('visual-guide-btn');
        this.visualGuideModal = document.getElementById('visual-guide-modal');
        this.visualGuideBackdrop = document.getElementById('visual-guide-backdrop');
        this.closeVisualGuideBtn = document.getElementById('close-visual-guide');
        this.visualGuideDoneBtn = document.getElementById('visual-guide-done');
        this.visualGuideDoneLabel = document.getElementById('visual-guide-done-label');
        this.visualGuideTitle = document.getElementById('visual-guide-title');
        this.visualGuideSubtitle = document.getElementById('visual-guide-subtitle');
        this.visualGuideTargetLabel = document.getElementById('visual-guide-target-label');
        this.visualGuideTarget = document.getElementById('visual-guide-target');
        this.visualGuideProfile = document.getElementById('visual-guide-profile');
        this.visualGuideSvgWrap = document.getElementById('visual-guide-svg-wrap');
        this.visualGuideFocusLabel = document.getElementById('visual-guide-focus-label');
        this.visualGuideFocus = document.getElementById('visual-guide-focus');
        this.visualGuideLipsLabel = document.getElementById('visual-guide-lips-label');
        this.visualGuideLips = document.getElementById('visual-guide-lips');
        this.visualGuideTongueLabel = document.getElementById('visual-guide-tongue-label');
        this.visualGuideTongue = document.getElementById('visual-guide-tongue');
        this.visualGuideAirLabel = document.getElementById('visual-guide-air-label');
        this.visualGuideAir = document.getElementById('visual-guide-air');

        this.card = document.getElementById('drill-card');
        this.cardFront = document.getElementById('card-front');
        this.cardBack = document.getElementById('card-back');
        this.pauseOverlay = document.getElementById('pause-overlay');

        // Buttons
        this.prevBtn = document.getElementById('prev-btn');
        this.markDifficultBtn = document.getElementById('mark-difficult-btn');
        this.saveItemBtn = document.getElementById('save-item-btn');
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
        if (this.saveItemBtn) this.saveItemBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onToggleSaved?.(); };
        if (this.recordBtn) this.recordBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onRecord(); };
        if (this.playBtn) this.playBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onRepeatItem(); };
        if (this.nextBtn) this.nextBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onNextItem(); };
        if (this.practiceDifficultBtn) this.practiceDifficultBtn.onclick = () => this.callbacks.onPracticeDifficult();
        if (this.pronunciationToggleBtn) this.pronunciationToggleBtn.onclick = () => this.callbacks.onTogglePronunciation();
        if (this.meaningToggleBtn) this.meaningToggleBtn.onclick = () => this.callbacks.onToggleMeanings();
        if (this.categorySearch) this.categorySearch.oninput = () => this.applyCategoryFilter();
        if (this.categoryPrevBtn) this.categoryPrevBtn.onclick = () => this.scrollCategories(-1);
        if (this.categoryNextBtn) this.categoryNextBtn.onclick = () => this.scrollCategories(1);
        if (this.openSettingsBtn) this.openSettingsBtn.onclick = () => this.openSettings();
        if (this.openSavedBtn) this.openSavedBtn.onclick = () => this.callbacks.onOpenSavedItems?.();
        if (this.openTeacherBtn) this.openTeacherBtn.onclick = () => {
            this.openTeacherTools();
            this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect?.value || '');
        };
        if (this.openSettingsInlineBtn) this.openSettingsInlineBtn.onclick = () => this.openSettings();
        if (this.closeSettingsBtn) this.closeSettingsBtn.onclick = () => this.closeSettings();
        if (this.settingsDoneBtn) this.settingsDoneBtn.onclick = () => this.closeSettings();
        if (this.settingsBackdrop) this.settingsBackdrop.onclick = () => this.closeSettings();
        if (this.closeSavedBtn) this.closeSavedBtn.onclick = () => this.closeSavedItems();
        if (this.savedDoneBtn) this.savedDoneBtn.onclick = () => this.closeSavedItems();
        if (this.savedBackdrop) this.savedBackdrop.onclick = () => this.closeSavedItems();
        if (this.closeTeacherBtn) this.closeTeacherBtn.onclick = () => this.closeTeacherTools();
        if (this.teacherDoneBtn) this.teacherDoneBtn.onclick = () => this.closeTeacherTools();
        if (this.teacherBackdrop) this.teacherBackdrop.onclick = () => this.closeTeacherTools();
        if (this.teacherCategorySelect) this.teacherCategorySelect.onchange = () => this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect.value);
        if (this.teacherHomeworkTitle) this.teacherHomeworkTitle.oninput = () => this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect?.value || '');
        if (this.teacherTaskSelect) this.teacherTaskSelect.onchange = () => this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect?.value || '');
        if (this.teacherLimitSelect) this.teacherLimitSelect.onchange = () => this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect?.value || '');
        if (this.teacherRepeatSelect) this.teacherRepeatSelect.onchange = () => this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect?.value || '');
        if (this.teacherGoalSelect) this.teacherGoalSelect.onchange = () => this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect?.value || '');
        if (this.teacherSpeakingBtn) this.teacherSpeakingBtn.onclick = () => {
            const nextValue = !this.teacherSpeakingBtn.classList.contains('is-on');
            this.updateTeacherSpeakingToggle(nextValue);
            this.callbacks.onOpenTeacherTools?.(this.teacherCategorySelect?.value || '');
        };
        if (this.copyTeacherLinkBtn) this.copyTeacherLinkBtn.onclick = () => this.copyTeacherLink();
        if (this.voiceSelect) this.voiceSelect.onchange = () => this.callbacks.onChangeVoice(this.voiceSelect.value);
        if (this.speechSpeedRange) this.speechSpeedRange.oninput = () => this.callbacks.onChangeSpeechRate(Number(this.speechSpeedRange.value));
        if (this.listeningPauseRange) this.listeningPauseRange.oninput = () => this.callbacks.onChangeListeningPause?.(Number(this.listeningPauseRange.value));
        if (this.autoPlayBtn) this.autoPlayBtn.onclick = () => this.callbacks.onToggleAutoPlay();
        if (this.splashToggleBtn) this.splashToggleBtn.onclick = () => this.callbacks.onToggleSplashVideo();
        if (this.slowPlayBtn) this.slowPlayBtn.onclick = () => this.callbacks.onSlowPlay();
        if (this.shadowBtn) this.shadowBtn.onclick = () => this.callbacks.onShadow();
        if (this.listenQuizBtn) this.listenQuizBtn.onclick = () => this.callbacks.onStartListeningQuiz();
        if (this.minimalPairBtn) this.minimalPairBtn.onclick = () => this.callbacks.onPlayMinimalPair();
        if (this.visualGuideBtn) this.visualGuideBtn.onclick = () => this.callbacks.onOpenVisualGuide?.();
        if (this.closeVisualGuideBtn) this.closeVisualGuideBtn.onclick = () => this.closeVisualGuide();
        if (this.visualGuideDoneBtn) this.visualGuideDoneBtn.onclick = () => this.closeVisualGuide();
        if (this.visualGuideBackdrop) this.visualGuideBackdrop.onclick = () => this.closeVisualGuide();
        const bindLanguageGate = (container, callback) => {
            if (!container || !callback) return;
            const handle = (event) => {
                const btn = event.target?.closest?.('[data-language]');
                if (!btn) return;
                callback(btn.dataset.language);
            };
            container.addEventListener('click', handle);
            container.addEventListener('touchend', handle, { passive: false });
        };
        bindLanguageGate(this.appLanguageList, (code) => this.callbacks.onChooseAppLanguage?.(code));
        bindLanguageGate(this.languageList, (code) => this.callbacks.onChangeLanguage?.(code));
        bindLanguageGate(this.targetLanguageList, (code) => this.callbacks.onChangeTargetLanguage?.(code));
        this.practiceStyleButtons.forEach(btn => {
            btn.onclick = () => this.callbacks.onChangePracticeStyle(btn.id.replace('style-', ''));
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeSettings();
                this.closeSavedItems();
                this.closeTeacherTools();
                this.closeVisualGuide();
            }
        });
    }

    applyTranslations(language, text) {
        this.language = language;
        this.text = text;

        document.getElementById('app-title').innerText = text.appTitle;
        if (this.splashBadge) this.splashBadge.innerText = text.splashBadge || 'Pronunciation + Memory Practice';
        if (this.splashTitle) this.splashTitle.innerText = text.appTitle || 'Language Victory';
        if (this.splashSubtitle) this.splashSubtitle.innerText = text.splashSubtitle || 'Build confident pronunciation through letters, words, and useful everyday phrases.';
        if (this.splashPillBase) this.splashPillBase.innerText = text.splashPillBase || '5 base languages';
        if (this.splashPillTarget) this.splashPillTarget.innerText = text.splashPillTarget || '5 target languages';
        if (this.splashPillSupport) this.splashPillSupport.innerText = text.splashPillSupport || 'Meaning + sound support';
        if (this.startSplashLabel) this.startSplashLabel.innerText = text.splashStart || 'Start';
        if (this.splashActionHint) this.splashActionHint.innerText = text.splashTapHint || 'Tap anywhere to continue';
        if (this.skipSplashLabel) this.skipSplashLabel.innerText = text.skip || 'Skip';
        const versionEl = document.getElementById('app-version');
        if (versionEl) {
            versionEl.innerText = 'Build 2026.04.07g';
        }
        document.getElementById('language-prompt').innerText = text.languagePrompt;
        document.getElementById('target-language-prompt').innerText = text.targetLanguagePrompt;
        document.getElementById('category-prompt').innerText = text.categoryPrompt;
        if (this.setupStepLanguages) this.setupStepLanguages.innerText = text.setupStepLanguages || 'Step 1 · Languages';
        if (this.setupStepMode) this.setupStepMode.innerText = text.setupStepMode || 'Step 2 · Practice Type';
        if (this.setupStepCategory) this.setupStepCategory.innerText = text.setupStepCategory || 'Step 3 · Choose Category';
        if (this.settingsTriggerLabel) this.settingsTriggerLabel.innerText = text.settingsButton || 'Settings';
        if (this.savedTriggerLabel) this.savedTriggerLabel.innerText = text.savedButton || 'Saved';
        if (this.teacherTriggerLabel) this.teacherTriggerLabel.innerText = text.teacherToolsButton || 'Teacher';
        if (this.settingsInlineLabel) this.settingsInlineLabel.innerText = text.settingsOpenInline || 'Open Settings';
        if (this.settingsTitle) this.settingsTitle.innerText = text.settingsTitle || 'Settings';
        if (this.settingsSubtitle) this.settingsSubtitle.innerText = text.settingsSubtitle || 'Fine-tune how practice feels before you start.';
        if (this.settingsDoneLabel) this.settingsDoneLabel.innerText = text.settingsDone || 'Done';
        if (this.savedTitle) this.savedTitle.innerText = text.savedTitle || 'Saved Practice';
        if (this.savedSubtitle) this.savedSubtitle.innerText = text.savedSubtitle || 'Review the letters, words, and phrases you want to practice again.';
        if (this.savedEmpty) this.savedEmpty.innerText = text.savedEmpty || 'You have not saved any items yet.';
        if (this.savedDoneLabel) this.savedDoneLabel.innerText = text.settingsDone || 'Done';
        if (this.teacherTitle) this.teacherTitle.innerText = text.teacherToolsTitle || 'Teacher Assignment';
        if (this.teacherSubtitle) this.teacherSubtitle.innerText = text.teacherToolsSubtitle || 'Create a lesson QR code from the current setup.';
        if (this.teacherHomeworkLabel) this.teacherHomeworkLabel.innerText = text.teacherHomeworkLabel || 'Homework title';
        if (this.teacherHomeworkTitle) this.teacherHomeworkTitle.placeholder = text.teacherHomeworkPlaceholder || 'Week 1 pronunciation homework';
        if (this.teacherCategoryLabel) this.teacherCategoryLabel.innerText = text.teacherCategoryLabel || 'Category for assignment';
        if (this.teacherTaskLabel) this.teacherTaskLabel.innerText = text.teacherTaskLabel || 'Assignment focus';
        if (this.teacherLimitLabel) this.teacherLimitLabel.innerText = text.teacherLimitLabel || 'Cards to complete';
        if (this.teacherRepeatLabel) this.teacherRepeatLabel.innerText = text.teacherRepeatLabel || 'Repeats per card';
        if (this.teacherGoalLabel) this.teacherGoalLabel.innerText = text.teacherGoalLabel || 'Completion goal';
        if (this.teacherSpeakingLabel) this.teacherSpeakingLabel.innerText = text.teacherSpeakingLabel || 'Require speaking';
        if (this.teacherSpeakingHint) this.teacherSpeakingHint.innerText = text.teacherSpeakingHint || 'Students must use the microphone during this homework.';
        if (this.teacherSummaryLabel) this.teacherSummaryLabel.innerText = text.teacherSummaryLabel || 'Assignment summary';
        if (this.teacherSummaryHint) this.teacherSummaryHint.innerText = text.teacherSummaryHint || 'This assignment also uses your current timer, support, voice, and speed settings.';
        if (this.teacherLinkLabel) this.teacherLinkLabel.innerText = text.teacherLinkLabel || 'Assignment link';
        if (this.teacherLinkHint) this.teacherLinkHint.innerText = text.teacherLinkHint || 'Students who open this link go straight into the assigned lesson.';
        if (this.teacherQrLabel) this.teacherQrLabel.innerText = text.teacherQrLabel || 'QR code';
        if (this.teacherQrHint) this.teacherQrHint.innerText = text.teacherQrHint || 'Scan this on a student phone to open the assignment.';
        if (this.copyTeacherLinkBtn) this.copyTeacherLinkBtn.innerText = text.copy || 'Copy';
        if (this.teacherDoneLabel) this.teacherDoneLabel.innerText = text.settingsDone || 'Done';
        if (this.assignmentBannerLabel) this.assignmentBannerLabel.innerText = text.assignmentBannerLabel || 'Assigned Homework';
        this.renderTeacherTaskOptions();
        this.renderTeacherLimitOptions();
        this.renderTeacherRepeatOptions();
        this.renderTeacherGoalOptions();
        if (this.settingsSummaryTitle) this.settingsSummaryTitle.innerText = text.settingsSummaryTitle || 'Quick Setup';
        if (this.settingsSummarySubtitle) this.settingsSummarySubtitle.innerText = text.settingsSummarySubtitle || 'Open settings to change support, timer, or practice style.';
        if (this.voiceLabel) this.voiceLabel.innerText = text.voiceLabel || 'Voice';
        if (this.speechSpeedLabel) this.speechSpeedLabel.innerText = text.speechSpeedLabel || 'Speech speed';
        if (this.speechSpeedHint) this.speechSpeedHint.innerText = text.speechSpeedHint || 'Adjust how fast the model voice speaks';
        if (this.listeningPauseLabel) this.listeningPauseLabel.innerText = text.listeningPauseLabel || 'Listening pause';
        if (this.listeningPauseHint) this.listeningPauseHint.innerText = text.listeningPauseHint || 'Set how long students get to repeat before the model says it again';
        if (this.autoPlayLabel) this.autoPlayLabel.innerText = text.autoPlayLabel || 'Auto-play new cards';
        if (this.autoPlayHint) this.autoPlayHint.innerText = text.autoPlayHint || 'Play the word or phrase automatically when the card changes';
        if (this.splashToggleLabel) this.splashToggleLabel.innerText = text.splashToggleLabel || 'Opening video';
        if (this.splashToggleHint) this.splashToggleHint.innerText = text.splashToggleHint || 'Show the intro video when the app starts';
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
        if (this.visualGuideLabel) this.visualGuideLabel.innerText = text.visualGuideAction || 'Visual';
        if (this.visualGuideTitle) this.visualGuideTitle.innerText = text.visualGuideTitle || 'Visual Pronunciation Guide';
        if (this.visualGuideSubtitle) this.visualGuideSubtitle.innerText = text.visualGuideSubtitle || 'See how the mouth and tongue should move for this sound.';
        if (this.visualGuideTargetLabel) this.visualGuideTargetLabel.innerText = text.visualGuideTargetLabel || 'Target';
        if (this.visualGuideFocusLabel) this.visualGuideFocusLabel.innerText = text.visualGuideFocusLabel || 'What to do';
        if (this.visualGuideLipsLabel) this.visualGuideLipsLabel.innerText = text.visualGuideLipsLabel || 'Lips';
        if (this.visualGuideTongueLabel) this.visualGuideTongueLabel.innerText = text.visualGuideTongueLabel || 'Tongue';
        if (this.visualGuideAirLabel) this.visualGuideAirLabel.innerText = text.visualGuideAirLabel || 'Air';
        if (this.visualGuideDoneLabel) this.visualGuideDoneLabel.innerText = text.settingsDone || 'Done';
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
        this.renderVoiceOptions([], this.voiceSelect?.value || '');
        this.updateSettingsSummary();
        this.updateRecordButton(false, true);
        this.updateSavedButton(false);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    openSettings() {
        if (!this.settingsModal) return;
        this.settingsModal.classList.remove('hidden');
        this.settingsModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    closeSettings() {
        if (!this.settingsModal || this.settingsModal.classList.contains('hidden')) return;
        this.settingsModal.classList.add('hidden');
        this.settingsModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openTeacherTools() {
        if (!this.teacherModal) return;
        this.teacherModal.classList.remove('hidden');
        this.teacherModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    closeTeacherTools() {
        if (!this.teacherModal || this.teacherModal.classList.contains('hidden')) return;
        this.teacherModal.classList.add('hidden');
        this.teacherModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openSavedItems() {
        if (!this.savedModal) return;
        this.savedModal.classList.remove('hidden');
        this.savedModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    closeSavedItems() {
        if (!this.savedModal || this.savedModal.classList.contains('hidden')) return;
        this.savedModal.classList.add('hidden');
        this.savedModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openVisualGuide() {
        if (!this.visualGuideModal) return;
        this.visualGuideModal.classList.remove('hidden');
        this.visualGuideModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    closeVisualGuide() {
        if (!this.visualGuideModal || this.visualGuideModal.classList.contains('hidden')) return;
        this.visualGuideModal.classList.add('hidden');
        this.visualGuideModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    setTargetLanguage(language) {
        this.targetLanguage = language;
    }

    renderLanguages(languages, selectedLanguage) {
        this.renderLanguageSelector(this.languageList, 'language-btn', languages, selectedLanguage, (code) => this.callbacks.onChangeLanguage(code));
        this.updateLanguageButtons(selectedLanguage);
    }

    renderAppLanguages(languages, selectedLanguage) {
        if (this.appLanguageList?.children.length) {
            const labelMap = Object.fromEntries(languages.map(language => [language.code, language.label]));
            this.appLanguageList.querySelectorAll('[data-language]').forEach(btn => {
                const code = btn.dataset.language;
                if (labelMap[code]) btn.textContent = labelMap[code];
                if (btn.tagName === 'A') btn.setAttribute('href', `?appLang=${code}`);
            });
        } else {
            this.renderLanguageSelector(this.appLanguageList, 'app-language-btn', languages, selectedLanguage, (code) => this.callbacks.onChooseAppLanguage?.(code));
        }
        this.updateSelectorButtons(this.appLanguageList, selectedLanguage);
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
        if (!container) return;
        container.querySelectorAll('button').forEach(btn => {
            const isSelected = btn.dataset.language === selectedLanguage;
            btn.classList.toggle('selected', isSelected);
            btn.classList.toggle('bg-indigo-600', isSelected);
            btn.classList.toggle('text-white', isSelected);
            btn.classList.toggle('bg-slate-100', !isSelected);
            btn.classList.toggle('text-slate-700', !isSelected);
        });
    }

    showLanguageGate() {
        if (!this.languageGateScreen) return;
        this.languageGateScreen.style.display = 'flex';
        this.languageGateScreen.classList.remove('hidden');
    }

    hideLanguageGate() {
        if (!this.languageGateScreen) return;
        this.languageGateScreen.classList.add('hidden');
        this.languageGateScreen.style.display = 'none';
    }

    showScreen(name) {
        Object.values(this.screens).forEach(s => s.classList.add('hidden'));
        this.screens[name].classList.remove('hidden');
        if (name !== 'start') {
            this.closeSettings();
            this.closeSavedItems();
            this.closeTeacherTools();
        }
        if (name !== 'game') {
            this.closeVisualGuide();
        }
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

    updateSavedButton(isSaved) {
        if (!this.saveItemBtn) return;
        this.saveItemBtn.classList.toggle('bg-rose-100', !isSaved);
        this.saveItemBtn.classList.toggle('hover:bg-rose-200', !isSaved);
        this.saveItemBtn.classList.toggle('text-rose-700', !isSaved);
        this.saveItemBtn.classList.toggle('border-rose-300', !isSaved);
        this.saveItemBtn.classList.toggle('bg-rose-500', isSaved);
        this.saveItemBtn.classList.toggle('hover:bg-rose-600', isSaved);
        this.saveItemBtn.classList.toggle('text-white', isSaved);
        this.saveItemBtn.classList.toggle('border-rose-700', isSaved);
        this.saveItemBtn.style.setProperty('--shadow-color', isSaved ? '#be123c' : '#fb7185');
        this.saveItemBtn.title = isSaved
            ? (this.text.unsaveItem || 'Remove from saved')
            : (this.text.saveItem || 'Save this item');
        this.saveItemBtn.innerHTML = `<i data-lucide="${isSaved ? 'heart-off' : 'heart'}" class="w-6 h-6"></i>`;
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
        if (this.visualGuideBtn) {
            const shouldShowVisual = Boolean(data.visualGuideAvailable) && this.practiceStyle !== 'listening';
            this.visualGuideBtn.classList.toggle('hidden', !shouldShowVisual);
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
        this.updateSettingsSummary();
    }

    setPracticeStyle(style) {
        this.practiceStyle = style;
        if (!this.screens.game) return;
        this.screens.game.classList.remove('game-style-classic', 'game-style-coach', 'game-style-speaking', 'game-style-listening');
        this.screens.game.classList.add(`game-style-${style}`);
        if (style === 'listening') {
            this.closeVisualGuide();
        }
        this.updatePracticeStyleButtons(style);
    }

    renderListeningPrompt(element) {
        element.classList.remove('text-6xl', 'md:text-7xl');
        element.classList.add('text-4xl', 'md:text-5xl');

        const wrap = document.createElement('div');
        wrap.className = 'flex flex-col items-center justify-center gap-5 w-full h-full px-6 text-center';

        const iconWrap = document.createElement('div');
        iconWrap.className = 'w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-inner';
        iconWrap.innerHTML = '<i data-lucide="ear" class="w-10 h-10"></i>';

        const title = document.createElement('div');
        title.className = 'text-2xl md:text-3xl font-black tracking-tight text-indigo-800';
        title.innerText = this.text.practiceStyleListening || 'Listening';

        const prompt = document.createElement('div');
        prompt.className = 'text-sm md:text-base font-semibold text-slate-500 leading-relaxed max-w-sm';
        prompt.innerText = this.listeningPromptData?.prompt
            || this.text.listeningModePrompt
            || 'Listen, say it during the pause, then listen again.';

        wrap.appendChild(iconWrap);
        wrap.appendChild(title);
        wrap.appendChild(prompt);

        if (this.listeningPromptData?.meaning) {
            const meaningPill = document.createElement('div');
            meaningPill.className = 'bg-white/80 border border-indigo-100 text-slate-700 rounded-full px-4 py-2 text-sm md:text-base font-semibold max-w-sm';
            meaningPill.innerText = `${this.text.listeningMeaningLabel || this.text.meaning || 'Meaning'}: ${this.listeningPromptData.meaning}`;
            wrap.appendChild(meaningPill);
        }

        if (this.listeningPromptData?.languageLabel || this.listeningPromptData?.pauseLabel) {
            const helperRow = document.createElement('div');
            helperRow.className = 'flex flex-wrap items-center justify-center gap-2 max-w-sm';

            if (this.listeningPromptData?.languageLabel) {
                helperRow.appendChild(this.createMetaPill(this.text.targetLanguagePrompt || 'Language', this.listeningPromptData.languageLabel));
            }
            if (this.listeningPromptData?.pauseLabel) {
                helperRow.appendChild(this.createMetaPill(this.text.listeningPauseLabel || 'Listening pause', this.listeningPromptData.pauseLabel));
            }
            wrap.appendChild(helperRow);
        }
        element.appendChild(wrap);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    updateTimerButtons(seconds) {
        this.selectedTime = seconds;
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('selected'));
        let id = 'time-60';
        if (seconds === 120) id = 'time-120';
        if (seconds === -1) id = 'time-free';
        document.getElementById(id).classList.add('selected');
        this.updateSettingsSummary();
    }

    renderCategories(categories, colors, options = {}) {
        this.allCategories = categories.map((cat, index) => ({
            ...cat,
            color: colors[index % colors.length]
        }));
        this.categoryLayout = options.layout || 'rail';
        this.renderTeacherCategories(this.allCategories);
        this.categorySearch.value = '';
        this.applyCategoryFilter();
    }

    applyCategoryFilter() {
        const query = (this.categorySearch.value || '').trim().toLowerCase();
        const filtered = this.allCategories.filter(cat => cat.label.toLowerCase().includes(query));
        this.categoryList.innerHTML = '';
        this.categoryList.classList.toggle('category-rail--board', this.categoryLayout === 'board');
        filtered.forEach(cat => {
            const color = cat.color;
            const btn = document.createElement('button');
            btn.className = `category-option btn-3d ${color.bg} ${color.hover} text-white font-bold py-3 px-4 rounded-2xl text-sm md:text-base border-b-6 flex items-center justify-between text-left transition-all`;
            if (this.categoryLayout === 'board') btn.classList.add('category-option--board');
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

    renderSavedItems(groups = []) {
        if (!this.savedGroups || !this.savedEmpty) return;
        this.savedGroups.innerHTML = '';
        const hasItems = groups.some(group => (group.sections || []).some(section => (section.items || []).length));
        this.savedEmpty.classList.toggle('hidden', hasItems);
        if (!hasItems) return;

        groups.forEach(group => {
            const languageCard = document.createElement('section');
            languageCard.className = 'saved-language-card';

            const languageTitle = document.createElement('h3');
            languageTitle.className = 'saved-language-title';
            languageTitle.innerText = group.label;
            languageCard.appendChild(languageTitle);

            group.sections.forEach(section => {
                if (!section.items?.length) return;

                const sectionWrap = document.createElement('div');
                sectionWrap.className = 'saved-section';

                const header = document.createElement('div');
                header.className = 'saved-section-header';

                const titleWrap = document.createElement('div');
                const title = document.createElement('p');
                title.className = 'saved-section-title';
                title.innerText = section.label;
                const count = document.createElement('p');
                count.className = 'saved-section-count';
                count.innerText = `${section.items.length} ${this.text.savedItemsLabel || 'saved items'}`;
                titleWrap.appendChild(title);
                titleWrap.appendChild(count);

                const practiceBtn = document.createElement('button');
                practiceBtn.type = 'button';
                practiceBtn.className = 'saved-practice-btn';
                practiceBtn.innerText = this.text.savedPractice || 'Practice';
                practiceBtn.onclick = () => this.callbacks.onPracticeSaved?.(group.code, section.kind);

                header.appendChild(titleWrap);
                header.appendChild(practiceBtn);
                sectionWrap.appendChild(header);

                const list = document.createElement('div');
                list.className = 'saved-chip-list';
                section.items.forEach(item => {
                    const chip = document.createElement('button');
                    chip.type = 'button';
                    chip.className = 'saved-chip';
                    chip.onclick = () => this.callbacks.onRemoveSaved?.(item.storageKey);
                    chip.innerHTML = `
                        <span class="saved-chip-label">${item.label}</span>
                        <span class="saved-chip-remove">${this.text.savedRemove || 'Remove'}</span>
                    `;
                    list.appendChild(chip);
                });

                sectionWrap.appendChild(list);
                languageCard.appendChild(sectionWrap);
            });

            this.savedGroups.appendChild(languageCard);
        });
    }

    scrollCategories(direction) {
        if (!this.categoryList) return;
        const amount = Math.max(260, Math.round(this.categoryList.clientWidth * 0.94)) * direction;
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
        this.updateSettingsSummary();
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
        this.updateSettingsSummary();
    }

    updateAutoPlayToggle(enabled) {
        if (!this.autoPlayBtn) return;
        this.autoPlayBtn.innerText = enabled ? (this.text.on || 'On') : (this.text.off || 'Off');
        this.autoPlayBtn.classList.toggle('bg-cyan-500', enabled);
        this.autoPlayBtn.classList.toggle('hover:bg-cyan-600', enabled);
        this.autoPlayBtn.classList.toggle('border-cyan-700', enabled);
        this.autoPlayBtn.classList.toggle('bg-slate-300', !enabled);
        this.autoPlayBtn.classList.toggle('hover:bg-slate-400', !enabled);
        this.autoPlayBtn.classList.toggle('border-slate-500', !enabled);
        this.autoPlayBtn.style.setProperty('--shadow-color', enabled ? '#0f766e' : '#64748b');
        this.updateSettingsSummary();
    }

    updateSplashToggle(enabled) {
        if (!this.splashToggleBtn) return;
        this.splashToggleBtn.innerText = enabled ? (this.text.on || 'On') : (this.text.off || 'Off');
        this.splashToggleBtn.classList.toggle('bg-fuchsia-500', enabled);
        this.splashToggleBtn.classList.toggle('hover:bg-fuchsia-600', enabled);
        this.splashToggleBtn.classList.toggle('border-fuchsia-700', enabled);
        this.splashToggleBtn.classList.toggle('bg-slate-300', !enabled);
        this.splashToggleBtn.classList.toggle('hover:bg-slate-400', !enabled);
        this.splashToggleBtn.classList.toggle('border-slate-500', !enabled);
        this.splashToggleBtn.style.setProperty('--shadow-color', enabled ? '#a21caf' : '#64748b');
        this.updateSettingsSummary();
    }

    updateSpeechSpeed(rate) {
        if (this.speechSpeedRange) {
            this.speechSpeedRange.value = `${rate}`;
        }
        if (this.speechSpeedValue) {
            this.speechSpeedValue.innerText = `${rate.toFixed(2)}x`;
        }
        this.updateSettingsSummary();
    }

    updateListeningPause(seconds) {
        this.listeningPauseSeconds = seconds;
        if (this.listeningPauseRange) {
            this.listeningPauseRange.value = `${seconds}`;
        }
        if (this.listeningPauseValue) {
            this.listeningPauseValue.innerText = `${seconds.toFixed(1)}s`;
        }
        this.updateSettingsSummary();
    }

    setListeningPromptData(data) {
        this.listeningPromptData = data || null;
    }

    renderVoiceOptions(voices, selectedVoice) {
        if (!this.voiceSelect) return;
        this.voiceSelect.innerHTML = '';
        const autoOption = document.createElement('option');
        autoOption.value = '';
        autoOption.innerText = this.text.voiceAuto || 'Automatic best voice';
        this.voiceSelect.appendChild(autoOption);

        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.innerText = voice.label;
            this.voiceSelect.appendChild(option);
        });

        this.voiceSelect.value = selectedVoice || '';
        this.updateSettingsSummary();
    }

    renderTeacherCategories(categories) {
        if (!this.teacherCategorySelect) return;
        const previous = this.teacherCategorySelect.value;
        this.teacherCategorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.key;
            option.innerText = category.label;
            this.teacherCategorySelect.appendChild(option);
        });
        const nextValue = categories.some(category => category.key === previous)
            ? previous
            : (categories[0]?.key || '');
        this.teacherCategorySelect.value = nextValue;
    }

    renderTeacherTaskOptions() {
        if (!this.teacherTaskSelect) return;
        const previous = this.teacherTaskSelect.value || 'pronunciation';
        const options = [
            { value: 'vocab', label: this.text.teacherTaskVocab || 'Vocabulary review' },
            { value: 'pronunciation', label: this.text.teacherTaskPronunciation || 'Pronunciation coach' },
            { value: 'speaking', label: this.text.teacherTaskSpeaking || 'Speaking check' },
            { value: 'listening', label: this.text.teacherTaskListening || 'Listening quiz' },
            { value: 'mixed', label: this.text.teacherTaskMixed || 'Mixed practice' }
        ];
        this.teacherTaskSelect.innerHTML = '';
        options.forEach(({ value, label }) => {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = label;
            this.teacherTaskSelect.appendChild(option);
        });
        this.teacherTaskSelect.value = options.some(option => option.value === previous) ? previous : 'pronunciation';
    }

    renderTeacherLimitOptions() {
        if (!this.teacherLimitSelect) return;
        const previous = this.teacherLimitSelect.value || '0';
        const options = [
            { value: '0', label: this.text.teacherLimitAll || 'Whole category' },
            { value: '6', label: `6 ${this.text.teacherLimitCards || 'cards'}` },
            { value: '10', label: `10 ${this.text.teacherLimitCards || 'cards'}` },
            { value: '15', label: `15 ${this.text.teacherLimitCards || 'cards'}` },
            { value: '20', label: `20 ${this.text.teacherLimitCards || 'cards'}` }
        ];
        this.teacherLimitSelect.innerHTML = '';
        options.forEach(({ value, label }) => {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = label;
            this.teacherLimitSelect.appendChild(option);
        });
        this.teacherLimitSelect.value = options.some(option => option.value === previous) ? previous : '0';
    }

    renderTeacherRepeatOptions() {
        if (!this.teacherRepeatSelect) return;
        const previous = this.teacherRepeatSelect.value || '1';
        const times = this.text.teacherRepeatTimes || 'times';
        const options = [
            { value: '1', label: `1 ${times}` },
            { value: '2', label: `2 ${times}` },
            { value: '3', label: `3 ${times}` }
        ];
        this.teacherRepeatSelect.innerHTML = '';
        options.forEach(({ value, label }) => {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = label;
            this.teacherRepeatSelect.appendChild(option);
        });
        this.teacherRepeatSelect.value = options.some(option => option.value === previous) ? previous : '1';
    }

    renderTeacherGoalOptions() {
        if (!this.teacherGoalSelect) return;
        const previous = this.teacherGoalSelect.value || 'finish';
        const options = [
            { value: 'finish', label: this.text.teacherGoalFinish || 'Finish the lesson' },
            { value: '80', label: this.text.teacherGoal80 || 'Reach 80%' },
            { value: '90', label: this.text.teacherGoal90 || 'Reach 90%' },
            { value: '100', label: this.text.teacherGoal100 || 'Reach 100%' }
        ];
        this.teacherGoalSelect.innerHTML = '';
        options.forEach(({ value, label }) => {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = label;
            this.teacherGoalSelect.appendChild(option);
        });
        this.teacherGoalSelect.value = options.some(option => option.value === previous) ? previous : 'finish';
    }

    getTeacherAssignmentOptions() {
        return {
            title: (this.teacherHomeworkTitle?.value || '').trim(),
            task: this.teacherTaskSelect?.value || 'pronunciation',
            limit: Number(this.teacherLimitSelect?.value || 0),
            repeat: Number(this.teacherRepeatSelect?.value || 1),
            goal: this.teacherGoalSelect?.value || 'finish',
            speaking: this.teacherSpeakingBtn?.classList.contains('is-on') || false
        };
    }

    setTeacherAssignmentOptions(options = {}) {
        if (this.teacherHomeworkTitle) this.teacherHomeworkTitle.value = options.title || '';
        if (this.teacherTaskSelect && options.task) this.teacherTaskSelect.value = options.task;
        if (this.teacherLimitSelect && options.limit !== undefined) this.teacherLimitSelect.value = `${options.limit}`;
        if (this.teacherRepeatSelect && options.repeat !== undefined) this.teacherRepeatSelect.value = `${options.repeat}`;
        if (this.teacherGoalSelect && options.goal) this.teacherGoalSelect.value = options.goal;
        this.updateTeacherSpeakingToggle(Boolean(options.speaking));
    }

    updateTeacherSpeakingToggle(enabled) {
        if (!this.teacherSpeakingBtn) return;
        this.teacherSpeakingBtn.classList.toggle('is-on', enabled);
        this.teacherSpeakingBtn.innerText = enabled ? (this.text.on || 'On') : (this.text.off || 'Off');
        this.teacherSpeakingBtn.classList.toggle('bg-emerald-500', enabled);
        this.teacherSpeakingBtn.classList.toggle('hover:bg-emerald-600', enabled);
        this.teacherSpeakingBtn.classList.toggle('border-emerald-700', enabled);
        this.teacherSpeakingBtn.classList.toggle('text-white', enabled);
        this.teacherSpeakingBtn.classList.toggle('bg-slate-300', !enabled);
        this.teacherSpeakingBtn.classList.toggle('hover:bg-slate-400', !enabled);
        this.teacherSpeakingBtn.classList.toggle('border-slate-500', !enabled);
        this.teacherSpeakingBtn.classList.toggle('text-slate-700', !enabled);
        this.teacherSpeakingBtn.style.setProperty('--shadow-color', enabled ? '#047857' : '#64748b');
    }

    renderTeacherSummary(pills = []) {
        if (!this.teacherSummaryPills) return;
        this.teacherSummaryPills.innerHTML = '';
        pills.forEach(label => {
            const pill = document.createElement('div');
            pill.className = 'settings-summary-pill';
            pill.innerText = label;
            this.teacherSummaryPills.appendChild(pill);
        });
    }

    renderTeacherAssignment({ url = '', title = '', summary = [] } = {}) {
        if (this.teacherLinkOutput) {
            this.teacherLinkOutput.value = url;
            this.teacherLinkOutput.title = title || url;
        }
        this.renderTeacherSummary(summary);
        if (!this.teacherQrCode) return;
        this.teacherQrCode.innerHTML = '';
        if (!url) {
            return;
        }
        if (typeof QRCode !== 'undefined') {
            new QRCode(this.teacherQrCode, {
                text: url,
                width: 220,
                height: 220
            });
            return;
        }
        const fallback = document.createElement('div');
        fallback.className = 'teacher-qr-fallback';
        fallback.innerText = this.text.teacherQrFallback || 'QR preview is not available in this browser. Use the link above.';
        this.teacherQrCode.appendChild(fallback);
    }

    async copyTeacherLink() {
        const value = this.teacherLinkOutput?.value;
        if (!value) return;
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(value);
                this.copyTeacherLinkBtn.innerText = this.text.copied || 'Copied';
                setTimeout(() => {
                    if (this.copyTeacherLinkBtn) {
                        this.copyTeacherLinkBtn.innerText = this.text.copy || 'Copy';
                    }
                }, 1400);
            }
        } catch (error) {
            console.warn('Could not copy teacher link', error);
        }
    }

    updateAssignmentBanner(assignment) {
        if (!this.assignmentBanner || !this.assignmentBannerTitle || !this.assignmentBannerPills) return;
        if (!assignment) {
            this.assignmentBanner.classList.add('hidden');
            this.assignmentBannerPills.innerHTML = '';
            return;
        }
        this.assignmentBanner.classList.remove('hidden');
        this.assignmentBannerTitle.innerText = assignment.title || (this.text.assignmentDefaultTitle || 'Assigned practice');
        this.assignmentBannerPills.innerHTML = '';
        (assignment.pills || []).forEach(label => {
            const pill = document.createElement('div');
            pill.className = 'assignment-banner-pill';
            pill.innerText = label;
            this.assignmentBannerPills.appendChild(pill);
        });
    }

    renderVisualGuide(guide = {}) {
        if (!this.visualGuideTarget || !this.visualGuideSvgWrap) return;
        this.visualGuideTarget.innerText = guide.target || '';
        if (this.visualGuideProfile) {
            this.visualGuideProfile.innerText = guide.profileLabel || (this.text.visualGuideAction || 'Visual');
        }
        if (this.visualGuideFocus) {
            this.visualGuideFocus.innerText = guide.instruction || this.text.defaultMouthTip || 'Watch the shape of your mouth and keep the sound smooth.';
        }
        if (this.visualGuideLips) {
            this.visualGuideLips.innerText = guide.lipsLabel || '';
        }
        if (this.visualGuideTongue) {
            this.visualGuideTongue.innerText = guide.tongueLabel || '';
        }
        if (this.visualGuideAir) {
            this.visualGuideAir.innerText = guide.airLabel || '';
        }
        this.visualGuideSvgWrap.innerHTML = this.buildVisualGuideSvg(guide);
        this.openVisualGuide();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    buildVisualGuideSvg(guide = {}) {
        const escapeSvgText = (value = '') => String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        const lips = guide.lips || 'neutral';
        const tongue = guide.tongue || 'front';
        const caption = escapeSvgText(guide.caption || '');
        const profile = escapeSvgText(guide.profileLabel || '');
        const ariaLabel = escapeSvgText(guide.target || '');
        const toneArrow = guide.showToneArrow
            ? `<path d="M172 160 C188 136, 202 110, 214 78" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round" stroke-dasharray="10 10" />
               <path d="M208 80 L214 66 L224 78" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />`
            : '';
        const teeth = guide.showTeeth
            ? `<rect x="94" y="150" width="66" height="16" rx="7" fill="#f8fafc" opacity="0.96" />
               <rect x="95" y="169" width="64" height="12" rx="6" fill="#f8fafc" opacity="0.9" />`
            : '';
        const tongueBetween = guide.showBetweenTeeth
            ? `<path d="M120 168 C124 160, 132 156, 142 157 C146 162, 144 172, 137 178 C128 178, 122 174, 120 168 Z" fill="#fb7185" opacity="0.92" class="visual-tongue is-between" />`
            : '';

        return `
            <svg class="visual-guide-svg" viewBox="0 0 260 220" role="img" aria-label="${ariaLabel}">
                <defs>
                    <linearGradient id="visualFaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fde68a" />
                        <stop offset="100%" stop-color="#fdba74" />
                    </linearGradient>
                </defs>
                <ellipse cx="126" cy="112" rx="88" ry="78" fill="url(#visualFaceGradient)" class="visual-face" />
                <path d="M78 95 C88 88, 96 86, 106 88" fill="none" stroke="#7c2d12" stroke-width="5" stroke-linecap="round" />
                <path d="M138 88 C148 86, 158 88, 168 95" fill="none" stroke="#7c2d12" stroke-width="5" stroke-linecap="round" />
                <circle cx="98" cy="108" r="7" fill="#1f2937" />
                <circle cx="154" cy="108" r="7" fill="#1f2937" />
                <path d="M176 84 C205 98, 224 126, 224 158" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" stroke-dasharray="4 10" />
                ${teeth}
                <ellipse cx="126" cy="170" rx="28" ry="16" fill="#7f1d1d" opacity="0.92" class="visual-lips is-${lips}" />
                <path d="M106 176 C112 150, 138 144, 152 156 C161 164, 159 181, 144 190 C126 192, 111 188, 106 176 Z" fill="#fb7185" opacity="0.88" class="visual-tongue is-${tongue}" />
                ${tongueBetween}
                <path d="M194 164 C214 164, 230 162, 242 156" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" stroke-dasharray="8 10" class="visual-air-arrow" />
                <path d="M238 156 L246 152 L242 162" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="visual-air-arrow" />
                ${toneArrow}
                <text x="28" y="30" fill="#334155" font-size="12" font-weight="700" letter-spacing="1.2">${profile}</text>
                <text x="28" y="204" fill="#475569" font-size="11" font-weight="600">${caption}</text>
            </svg>
        `;
    }

    updateSettingsSummary() {
        if (!this.settingsSummaryPills) return;

        const styleMap = {
            classic: this.text.practiceStyleClassic || 'Classic',
            coach: this.text.practiceStyleCoach || 'Coach',
            speaking: this.text.practiceStyleSpeaking || 'Speaking',
            listening: this.text.practiceStyleListening || 'Listening'
        };
        const timerMap = {
            60: this.text.timeOneMin || '1 Min',
            120: this.text.timeTwoMin || '2 Min',
            '-1': this.text.timeFree || 'Free'
        };
        const supportBits = [];
        if (this.showPronunciation) supportBits.push(this.text.pronunciationShort || this.text.pronunciation || 'Pronunciation');
        if (this.showMeanings) supportBits.push(this.text.meaningShort || this.text.meaning || 'Meaning');
        const supportLabel = supportBits.length
            ? supportBits.join(' + ')
            : (this.text.settingsSupportOff || 'Support off');

        const pills = [
            `${this.text.practiceStyleLabel || 'Practice style'}: ${styleMap[this.practiceStyle] || styleMap.classic}`,
            `${this.text.timerLabel || 'Timer'}: ${timerMap[this.selectedTime] || timerMap[60]}`,
            `${this.text.settingsSupportLabel || 'Support'}: ${supportLabel}`,
            `${this.text.settingsVoiceLabel || 'Voice'}: ${this.voiceSelect?.selectedOptions?.[0]?.text || (this.text.voiceAuto || 'Automatic best voice')}`,
            `${this.text.speechSpeedLabel || 'Speech speed'}: ${this.speechSpeedRange ? `${Number(this.speechSpeedRange.value).toFixed(2)}x` : '1.00x'}`,
            `${this.text.settingsAutoPlayShort || 'Auto-play'}: ${this.autoPlayBtn?.innerText || (this.text.on || 'On')}`,
            `${this.text.settingsSplashShort || 'Opening video'}: ${this.splashToggleBtn?.innerText || (this.text.on || 'On')}`
        ];
        if (this.practiceStyle === 'listening') {
            pills.splice(5, 0, `${this.text.listeningPauseLabel || 'Listening pause'}: ${this.listeningPauseRange ? `${Number(this.listeningPauseRange.value).toFixed(1)}s` : '5.0s'}`);
        }

        this.settingsSummaryPills.innerHTML = '';
        pills.forEach(label => {
            const pill = document.createElement('div');
            pill.className = 'settings-summary-pill';
            pill.innerText = label;
            this.settingsSummaryPills.appendChild(pill);
        });
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

    getChineseToneEntries(pronunciation = '') {
        const normalized = (pronunciation || '').replace(/u:/gi, 'ü');
        const tokens = normalized.match(/[A-Za-züÜāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ]+[1-5]?/g) || [];
        const toneMarks = {
            ā: 1, ē: 1, ī: 1, ō: 1, ū: 1, ǖ: 1, Ā: 1, Ē: 1, Ī: 1, Ō: 1, Ū: 1, Ǖ: 1,
            á: 2, é: 2, í: 2, ó: 2, ú: 2, ǘ: 2, Á: 2, É: 2, Í: 2, Ó: 2, Ú: 2, Ǘ: 2,
            ǎ: 3, ě: 3, ǐ: 3, ǒ: 3, ǔ: 3, ǚ: 3, Ǎ: 3, Ě: 3, Ǐ: 3, Ǒ: 3, Ǔ: 3, Ǚ: 3,
            à: 4, è: 4, ì: 4, ò: 4, ù: 4, ǜ: 4, À: 4, È: 4, Ì: 4, Ò: 4, Ù: 4, Ǜ: 4
        };

        return tokens.map((token) => {
            const digitMatch = token.match(/([1-5])$/);
            const tone = digitMatch
                ? Number(digitMatch[1])
                : Array.from(token).reduce((found, char) => found || toneMarks[char] || 0, 0) || 5;
            return { syllable: token.replace(/[1-5]$/, ''), tone };
        });
    }

    getChineseToneHint(content) {
        if (this.targetLanguage !== 'zh' || !content) return '';
        const pronunciation = this.getPronunciationHint(content);
        const entries = this.getChineseToneEntries(pronunciation);
        if (!entries.length) return '';
        return entries
            .map(({ syllable, tone }) => `${syllable} (${this.text[`tone${tone}`] || `${tone}`})`)
            .join(' · ');
    }

    hasChineseToneMarkers(pronunciation = '') {
        return this.getChineseToneEntries(pronunciation).length > 0;
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
        const toneHint = this.getChineseToneHint(typeof source === 'object' ? source : null);
        if (toneHint) {
            stack.appendChild(this.createMetaPill(this.text.tone || 'Tone', toneHint));
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
        const toneHint = this.getChineseToneHint(content);
        if (toneHint) {
            stack.appendChild(this.createMetaPill(this.text.tone || 'Tone', toneHint));
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
        if (this.practiceStyle === 'listening') {
            this.renderListeningPrompt(element);
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
        const toneHint = this.getChineseToneHint(content);
        if (toneHint) {
            textWrap.appendChild(this.createMetaPill(this.text.tone || 'Tone', toneHint));
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
