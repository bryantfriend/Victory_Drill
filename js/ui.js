import { getWordMeaning } from './i18n.js';

export class UIManager {
    constructor(callbacks) {
        this.callbacks = callbacks; // { onSpeak, onSpeakWord, onChangeMode, onSelectCategory, onNextItem, onPrevItem, onRepeatItem, onTogglePause, onExit, onReplay }
        this.language = 'ru';
        this.targetLanguage = 'ru';
        this.text = {};
        this.showPronunciation = true;
        this.showMeanings = true;

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
        this.pronunciationToggleLabel = document.getElementById('pronunciation-toggle-label');
        this.pronunciationToggleHint = document.getElementById('pronunciation-toggle-hint');
        this.pronunciationToggleBtn = document.getElementById('pronunciation-toggle-btn');
        this.meaningToggleLabel = document.getElementById('meaning-toggle-label');
        this.meaningToggleHint = document.getElementById('meaning-toggle-hint');
        this.meaningToggleBtn = document.getElementById('meaning-toggle-btn');
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

        // Setup Event Listeners
        this.card.onclick = () => this.callbacks.onNextItem();
        this.prevBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onPrevItem(); };
        this.markDifficultBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onToggleDifficult(); };
        this.recordBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onRecord(); };
        this.playBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onRepeatItem(); };
        this.nextBtn.onclick = (e) => { e.stopPropagation(); this.callbacks.onNextItem(); };
        this.practiceDifficultBtn.onclick = () => this.callbacks.onPracticeDifficult();
        this.pronunciationToggleBtn.onclick = () => this.callbacks.onTogglePronunciation();
        this.meaningToggleBtn.onclick = () => this.callbacks.onToggleMeanings();
    }

    applyTranslations(language, text) {
        this.language = language;
        this.text = text;

        document.getElementById('app-title').innerText = text.appTitle;
        document.getElementById('language-prompt').innerText = text.languagePrompt;
        document.getElementById('target-language-prompt').innerText = text.targetLanguagePrompt;
        document.getElementById('category-prompt').innerText = text.categoryPrompt;
        this.pronunciationToggleLabel.innerText = text.pronunciationToggle;
        this.pronunciationToggleHint.innerText = text.pronunciationToggleHint;
        this.meaningToggleLabel.innerText = text.meaningToggle;
        this.meaningToggleHint.innerText = text.meaningToggleHint;
        document.getElementById('timer-label').innerText = text.timerLabel;
        document.getElementById('mode-letters').innerText = text.modeLetters;
        document.getElementById('mode-topic-words').innerText = text.modeTopicWords;
        document.getElementById('mode-sound-words').innerText = text.modeSoundWords;
        document.getElementById('mode-topic-phrases').innerText = text.modeTopicPhrases;
        document.getElementById('mode-sound-phrases').innerText = text.modeSoundPhrases;
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
        document.getElementById('menu-btn').innerText = text.menu;
        document.getElementById('replay-btn').innerText = text.replay;
        this.practiceDifficultBtn.innerText = text.difficult;
        this.updatePronunciationToggle(this.showPronunciation);
        this.updateMeaningToggle(this.showMeanings);
        this.updateRecordButton(false, true);
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
        this.recordBtn.innerHTML = `<i data-lucide="${isListening ? 'mic-off' : 'mic'}" class="w-6 h-6"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    updateSpeechFeedback(feedback) {
        if (!feedback?.visible) {
            this.speechFeedback.classList.add('hidden');
            this.speechFeedbackBadge.classList.add('hidden');
            this.speechFeedbackHeardWrap.classList.add('hidden');
            return;
        }

        this.speechFeedback.classList.remove('hidden');
        this.speechFeedbackStatus.innerText = feedback.status || '';
        this.speechFeedbackHeard.innerText = feedback.transcript || '';
        this.speechFeedbackHeardWrap.classList.toggle('hidden', !feedback.transcript);

        const toneMap = {
            success: ['bg-emerald-50', 'border-emerald-200', 'text-emerald-800'],
            warning: ['bg-amber-50', 'border-amber-200', 'text-amber-800'],
            listening: ['bg-sky-50', 'border-sky-200', 'text-sky-800'],
            processing: ['bg-violet-50', 'border-violet-200', 'text-violet-800'],
            unsupported: ['bg-slate-50', 'border-slate-200', 'text-slate-700'],
            'permission-denied': ['bg-rose-50', 'border-rose-200', 'text-rose-800'],
            'no-speech': ['bg-amber-50', 'border-amber-200', 'text-amber-800'],
            error: ['bg-rose-50', 'border-rose-200', 'text-rose-800']
        };
        const [bgClass, borderClass, textClass] = toneMap[feedback.tone] || toneMap.error;

        this.speechFeedback.className = `mt-5 rounded-2xl border px-4 py-3 text-left shadow-sm ${bgClass} ${borderClass}`;

        if (feedback.badge) {
            this.speechFeedbackBadge.innerText = feedback.badge;
            this.speechFeedbackBadge.className = `rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${bgClass} ${textClass}`;
            this.speechFeedbackBadge.classList.remove('hidden');
        } else {
            this.speechFeedbackBadge.classList.add('hidden');
        }
    }

    updatePauseUI(isPaused) {
        this.pauseOverlay.classList.toggle('hidden', !isPaused);
    }

    updateModeButtons(mode) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('selected', 'active');
            btn.classList.add('bg-slate-100', 'text-slate-600');
        });
        const activeBtn = document.getElementById(`mode-${mode}`);
        if (activeBtn) {
            activeBtn.classList.add('selected', 'active');
            activeBtn.classList.remove('bg-slate-100', 'text-slate-600');
        }
    }

    updateTimerButtons(seconds) {
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('selected'));
        let id = 'time-60';
        if (seconds === 120) id = 'time-120';
        if (seconds === -1) id = 'time-free';
        document.getElementById(id).classList.add('selected');
    }

    renderCategories(categories, colors) {
        this.categoryList.innerHTML = '';
        let colorIndex = 0;
        categories.forEach(cat => {
            const color = colors[colorIndex % colors.length];
            colorIndex += 1;
            const btn = document.createElement('button');
            btn.className = `w-full btn-3d ${color.bg} ${color.hover} text-white font-bold py-3 px-3 rounded-xl text-sm md:text-base border-b-6 flex items-center justify-center text-center h-16 transition-all`;
            btn.style.setProperty('--shadow-color', color.shadow);
            btn.innerText = cat.label;
            btn.onclick = () => this.callbacks.onSelectCategory(cat.key);
            this.categoryList.appendChild(btn);
        });
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
