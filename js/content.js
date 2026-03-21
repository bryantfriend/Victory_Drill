import { alphabetData, wordsData, phrasesData } from './data.js';

const meanings = (en, zh, ky, ru, fr) => ({ en, zh, ky, ru, fr });

const letter = (l, n, s, w, glosses, extras = {}) => ({
    l,
    n,
    s,
    w,
    meanings: glosses,
    kind: 'letter',
    ...extras
});

const word = (t, glosses, extras = {}) => ({
    t,
    meanings: glosses,
    ...extras
});

const phrase = (t, glosses, extras = {}) => ({
    t,
    meanings: glosses,
    kind: 'phrase',
    ...extras
});

const category = (key, labels, items) => ({ key, labels, items });

const starterLabel = {
    letters: { en: 'Starter Letters', zh: '入门字母', ky: 'Баштапкы тамгалар', ru: 'Стартовые буквы', fr: 'Lettres de base' },
    words: { en: 'Starter Words', zh: '入门词汇', ky: 'Баштапкы сөздөр', ru: 'Стартовые слова', fr: 'Mots de base' },
    phrases: { en: 'Starter Phrases', zh: '入门短语', ky: 'Баштапкы фразалар', ru: 'Стартовые фразы', fr: 'Phrases de base' },
    pinyin: { en: 'Starter Pinyin', zh: '入门拼音', ky: 'Баштапкы пиньинь', ru: 'Стартовый пиньинь', fr: 'Pinyin de base' },
    characters: { en: 'Starter Characters', zh: '入门汉字', ky: 'Баштапкы иероглифтер', ru: 'Стартовые иероглифы', fr: 'Caracteres de base' },
    everydayWords: { en: 'Everyday Words', zh: '日常词汇', ky: 'Күнүмдүк сөздөр', ru: 'Повседневные слова', fr: 'Mots du quotidien' },
    classroomWords: { en: 'Classroom Words', zh: '课堂词汇', ky: 'Класс сөздөрү', ru: 'Школьные слова', fr: 'Mots de la classe' },
    greetings: { en: 'Greetings', zh: '问候', ky: 'Саламдашуу', ru: 'Приветствия', fr: 'Salutations' },
    classroomPhrases: { en: 'Classroom Phrases', zh: '课堂短语', ky: 'Класс фразалары', ru: 'Фразы для урока', fr: 'Phrases de classe' },
    feelings: { en: 'Feelings', zh: '感受', ky: 'Сезимдер', ru: 'Чувства', fr: 'Sentiments' },
    tonePractice: { en: 'Tone Practice', zh: '声调练习', ky: 'Тон машыгуусу', ru: 'Практика тонов', fr: 'Pratique des tons' },
    commonCharacters: { en: 'Common Characters', zh: '常用汉字', ky: 'Көп колдонулган иероглифтер', ru: 'Частые иероглифы', fr: 'Caracteres courants' },
    usefulPhrases: { en: 'Useful Phrases', zh: '实用短语', ky: 'Пайдалуу фразалар', ru: 'Полезные фразы', fr: 'Phrases utiles' }
};

Object.assign(starterLabel, {
    familyWords: { en: 'Family Words', zh: '家庭词汇', ky: 'Үй-бүлө сөздөрү', ru: 'Слова о семье', fr: 'Mots de la famille' },
    foodWords: { en: 'Food and Drink', zh: '食物和饮料', ky: 'Тамак жана суусундук', ru: 'Еда и напитки', fr: 'Nourriture et boissons' },
    travelWords: { en: 'Travel Words', zh: '出行词汇', ky: 'Жол сөздөрү', ru: 'Слова о поездках', fr: 'Mots de voyage' },
    colorsWords: { en: 'Colors', zh: '颜色词汇', ky: 'Түс сөздөрү', ru: 'Слова о цветах', fr: 'Mots des couleurs' },
    bodyWords: { en: 'Body Words', zh: '身体词汇', ky: 'Дене сөздөрү', ru: 'Слова о теле', fr: 'Mots du corps' },
    actionWords: { en: 'Action Words', zh: '动作词汇', ky: 'Аракет сөздөрү', ru: 'Слова о действиях', fr: 'Mots d action' },
    helpPhrases: { en: 'Help Phrases', zh: '求助短语', ky: 'Жардам фразалары', ru: 'Фразы помощи', fr: 'Phrases d aide' },
    travelPhrases: { en: 'Travel Phrases', zh: '出行短语', ky: 'Жол фразалары', ru: 'Фразы для поездок', fr: 'Phrases de voyage' },
    foodPhrases: { en: 'Food Phrases', zh: '点餐短语', ky: 'Тамак фразалары', ru: 'Фразы о еде', fr: 'Phrases pour manger' },
    shoppingPhrases: { en: 'Shopping Phrases', zh: '购物短语', ky: 'Соода фразалары', ru: 'Фразы для покупок', fr: 'Phrases pour acheter' },
    weatherPhrases: { en: 'Weather Phrases', zh: '天气短语', ky: 'Аба ырайы фразалары', ru: 'Фразы о погоде', fr: 'Phrases sur le temps' },
    dailyPhrases: { en: 'Daily Routine', zh: '日常短语', ky: 'Күнүмдүк фразалар', ru: 'Ежедневные фразы', fr: 'Phrases du quotidien' }
});

const russianContent = {
    speechLang: 'ru-RU',
    modes: {
        letters: [
            category('Русский Алфавит', null, alphabetData.map(item => ({ ...item, kind: 'letter' })))
        ],
        words: Object.entries(wordsData).map(([key, items]) => category(key, null, items)),
        phrases: Object.entries(phrasesData).map(([key, items]) => category(key, null, items.map(item => ({ t: item, kind: 'phrase' }))))
    }
};

const englishContent = {
    speechLang: 'en-US',
    modes: {
        letters: [
            category('english-starter-letters', starterLabel.letters, [
                letter('A a', 'A', 'a', 'Apple', meanings('apple', '苹果', 'алма', 'яблоко', 'pomme'), { pronunciation: 'say AY for the letter name, short a in apple' }),
                letter('B b', 'B', 'b', 'Book', meanings('book', '书', 'китеп', 'книга', 'livre'), { pronunciation: 'say BEE for the letter name, lips pop for b' }),
                letter('C c', 'C', 'c', 'Cat', meanings('cat', '猫', 'мышык', 'кот', 'chat'), { pronunciation: 'say SEE for the letter name, hard c like k in cat' }),
                letter('D d', 'D', 'd', 'Dog', meanings('dog', '狗', 'ит', 'собака', 'chien'), { pronunciation: 'say DEE for the letter name, tap tongue for d' }),
                letter('E e', 'E', 'e', 'Egg', meanings('egg', '鸡蛋', 'жумуртка', 'яйцо', 'oeuf'), { pronunciation: 'say EE for the letter name, short e in egg' }),
                letter('F f', 'F', 'f', 'Fish', meanings('fish', '鱼', 'балык', 'рыба', 'poisson'), { pronunciation: 'say EF for the letter name, bite lip lightly for f' }),
                letter('G g', 'G', 'g', 'Game', meanings('game', '游戏', 'оюн', 'игра', 'jeu'), { pronunciation: 'say JEE for the letter name, hard g in game' }),
                letter('H h', 'H', 'h', 'House', meanings('house', '房子', 'үй', 'дом', 'maison'), { pronunciation: 'say AITCH for the letter name, breathe out for h' })
            ]),
            category('english-vowel-sounds', { en: 'Vowel Sounds', zh: '元音发音', ky: 'Үндүү үндөр', ru: 'Гласные звуки', fr: 'Sons voyelles' }, [
                letter('A', 'long a', 'ei', 'cake', meanings('cake', '蛋糕', 'торт', 'торт', 'gateau'), { pronunciation: 'say AY, like in cake' }),
                letter('E', 'short e', 'e', 'pen', meanings('pen', '钢笔', 'калем', 'ручка', 'stylo'), { pronunciation: 'short E, like in pen' }),
                letter('I', 'long i', 'ai', 'bike', meanings('bike', '自行车', 'велосипед', 'велосипед', 'velo'), { pronunciation: 'say EYE, like in bike' }),
                letter('O', 'short o', 'o', 'box', meanings('box', '盒子', 'куту', 'коробка', 'boite'), { pronunciation: 'short O, like in box' }),
                letter('U', 'long u', 'yu', 'music', meanings('music', '音乐', 'музыка', 'музыка', 'musique'), { pronunciation: 'say YOO, like in music' })
            ])
        ],
        words: [
            category('english-starter-words', starterLabel.words, [
                word('apple', meanings('apple', '苹果', 'алма', 'яблоко', 'pomme'), { syllables: ['ap', 'ple'], sound: 'a', pronunciation: 'AP-uhl' }),
                word('water', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['wa', 'ter'], sound: 'w', pronunciation: 'WAW-ter' }),
                word('teacher', meanings('teacher', '老师', 'мугалим', 'учитель', 'professeur'), { syllables: ['teach', 'er'], sound: 't', pronunciation: 'TEE-cher' }),
                word('student', meanings('student', '学生', 'окуучу', 'студент', 'etudiant'), { syllables: ['stu', 'dent'], sound: 'st', pronunciation: 'STYOO-dent' }),
                word('family', meanings('family', '家庭', 'үй-бүлө', 'семья', 'famille'), { syllables: ['fa', 'mi', 'ly'], sound: 'f', pronunciation: 'FA-muh-lee' }),
                word('friend', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { syllables: ['friend'], sound: 'fr', pronunciation: 'blend the FR sound' })
            ]),
            category('english-everyday-words', starterLabel.everydayWords, [
                word('food', meanings('food', '食物', 'тамак', 'еда', 'nourriture'), { syllables: ['food'], sound: 'f', pronunciation: 'long OO sound' }),
                word('school', meanings('school', '学校', 'мектеп', 'школа', 'ecole'), { syllables: ['school'], sound: 'sk', pronunciation: 'blend SK at the start' }),
                word('house', meanings('house', '房子', 'үй', 'дом', 'maison'), { syllables: ['house'], sound: 'h', pronunciation: 'open with a soft H breath' }),
                word('sun', meanings('sun', '太阳', 'күн', 'солнце', 'soleil'), { syllables: ['sun'], sound: 's', pronunciation: 'short U sound' }),
                word('book', meanings('book', '书', 'китеп', 'книга', 'livre'), { syllables: ['book'], sound: 'b', pronunciation: 'short U like in good' }),
                word('milk', meanings('milk', '牛奶', 'сүт', 'молоко', 'lait'), { syllables: ['milk'], sound: 'm', pronunciation: 'short I sound' })
            ]),
            category('english-classroom-words', starterLabel.classroomWords, [
                word('pen', meanings('pen', '钢笔', 'калем', 'ручка', 'stylo'), { syllables: ['pen'], sound: 'p', pronunciation: 'short E sound' }),
                word('desk', meanings('desk', '课桌', 'парта', 'парта', 'bureau'), { syllables: ['desk'], sound: 'd', pronunciation: 'end with clear SK' }),
                word('board', meanings('board', '黑板', 'такта', 'доска', 'tableau'), { syllables: ['board'], sound: 'b', pronunciation: 'long OR sound' }),
                word('lesson', meanings('lesson', '课程', 'сабак', 'урок', 'lecon'), { syllables: ['les', 'son'], sound: 'l', pronunciation: 'LESS-un' }),
                word('question', meanings('question', '问题', 'суроо', 'вопрос', 'question'), { syllables: ['ques', 'tion'], sound: 'kw', pronunciation: 'KWES-chun' }),
                word('answer', meanings('answer', '答案', 'жооп', 'ответ', 'reponse'), { syllables: ['an', 'swer'], sound: 'a', pronunciation: 'AN-ser, w is silent' })
            ]),
            category('english-family-words', starterLabel.familyWords, [
                word('mother', meanings('mother', '妈妈', 'эне', 'мать', 'mere'), { syllables: ['mo', 'ther'], sound: 'm', pronunciation: 'MUH-ther' }),
                word('father', meanings('father', '爸爸', 'ата', 'отец', 'pere'), { syllables: ['fa', 'ther'], sound: 'f', pronunciation: 'FAH-ther' }),
                word('brother', meanings('brother', '哥哥；弟弟', 'ага; ини', 'брат', 'frere'), { syllables: ['bro', 'ther'], sound: 'br', pronunciation: 'BRUH-ther' }),
                word('sister', meanings('sister', '姐姐；妹妹', 'эже; карындаш', 'сестра', 'soeur'), { syllables: ['sis', 'ter'], sound: 's', pronunciation: 'SIS-ter' }),
                word('baby', meanings('baby', '婴儿', 'бөбөк', 'ребенок', 'bebe'), { syllables: ['ba', 'by'], sound: 'b', pronunciation: 'BAY-bee' }),
                word('parents', meanings('parents', '父母', 'ата-эне', 'родители', 'parents'), { syllables: ['pa', 'rents'], sound: 'p', pronunciation: 'PAIR-ents' })
            ]),
            category('english-food-words', starterLabel.foodWords, [
                word('bread', meanings('bread', '面包', 'нан', 'хлеб', 'pain'), { syllables: ['bread'], sound: 'br', pronunciation: 'blend BR smoothly' }),
                word('milk', meanings('milk', '牛奶', 'сүт', 'молоко', 'lait'), { syllables: ['milk'], sound: 'm', pronunciation: 'short I sound' }),
                word('tea', meanings('tea', '茶', 'чай', 'чай', 'the'), { syllables: ['tea'], sound: 't', pronunciation: 'long EE sound' }),
                word('rice', meanings('rice', '米饭', 'күрүч', 'рис', 'riz'), { syllables: ['rice'], sound: 'r', pronunciation: 'long I sound' }),
                word('soup', meanings('soup', '汤', 'шорпо', 'суп', 'soupe'), { syllables: ['soup'], sound: 's', pronunciation: 'long OO sound' }),
                word('juice', meanings('juice', '果汁', 'шире', 'сок', 'jus'), { syllables: ['juice'], sound: 'j', pronunciation: 'JOOSE' })
            ]),
            category('english-travel-words', starterLabel.travelWords, [
                word('bus', meanings('bus', '公交车', 'автобус', 'автобус', 'bus'), { syllables: ['bus'], sound: 'b', pronunciation: 'short U sound' }),
                word('train', meanings('train', '火车', 'поезд', 'поезд', 'train'), { syllables: ['train'], sound: 'tr', pronunciation: 'long A sound' }),
                word('ticket', meanings('ticket', '票', 'билет', 'билет', 'billet'), { syllables: ['ti', 'cket'], sound: 't', pronunciation: 'TIK-it' }),
                word('hotel', meanings('hotel', '旅馆', 'мейманкана', 'отель', 'hotel'), { syllables: ['ho', 'tel'], sound: 'h', pronunciation: 'hoh-TEL' }),
                word('street', meanings('street', '街道', 'көчө', 'улица', 'rue'), { syllables: ['street'], sound: 'str', pronunciation: 'blend STR together' }),
                word('airport', meanings('airport', '机场', 'аэропорт', 'аэропорт', 'aeroport'), { syllables: ['air', 'port'], sound: 'air', pronunciation: 'AIR-port' })
            ]),
            category('english-colors-words', starterLabel.colorsWords, [
                word('red', meanings('red', '红色', 'кызыл', 'красный', 'rouge'), { syllables: ['red'], sound: 'r', pronunciation: 'short E sound' }),
                word('blue', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { syllables: ['blue'], sound: 'bl', pronunciation: 'blend BL together' }),
                word('green', meanings('green', '绿色', 'жашыл', 'зеленый', 'vert'), { syllables: ['green'], sound: 'gr', pronunciation: 'long EE sound' }),
                word('black', meanings('black', '黑色', 'кара', 'черный', 'noir'), { syllables: ['black'], sound: 'bl', pronunciation: 'short A sound' }),
                word('white', meanings('white', '白色', 'ак', 'белый', 'blanc'), { syllables: ['white'], sound: 'wh', pronunciation: 'start with a light WH' }),
                word('yellow', meanings('yellow', '黄色', 'сары', 'желтый', 'jaune'), { syllables: ['yel', 'low'], sound: 'y', pronunciation: 'YEL-oh' })
            ]),
            category('english-body-words', starterLabel.bodyWords, [
                word('head', meanings('head', '头', 'баш', 'голова', 'tete'), { syllables: ['head'], sound: 'h', pronunciation: 'short E sound' }),
                word('hand', meanings('hand', '手', 'кол', 'рука', 'main'), { syllables: ['hand'], sound: 'h', pronunciation: 'short A sound' }),
                word('eye', meanings('eye', '眼睛', 'көз', 'глаз', 'oeil'), { syllables: ['eye'], sound: 'i', pronunciation: 'long I sound' }),
                word('ear', meanings('ear', '耳朵', 'кулак', 'ухо', 'oreille'), { syllables: ['ear'], sound: 'ear', pronunciation: 'long EER sound' }),
                word('mouth', meanings('mouth', '嘴巴', 'ооз', 'рот', 'bouche'), { syllables: ['mouth'], sound: 'm', pronunciation: 'use the TH at the end' }),
                word('foot', meanings('foot', '脚', 'бут', 'ступня', 'pied'), { syllables: ['foot'], sound: 'f', pronunciation: 'short OO as in good' })
            ]),
            category('english-action-words', starterLabel.actionWords, [
                word('read', meanings('read', '读', 'окуу', 'читать', 'lire'), { syllables: ['read'], sound: 'r', pronunciation: 'long EE sound' }),
                word('write', meanings('write', '写', 'жаз', 'писать', 'ecrire'), { syllables: ['write'], sound: 'wr', pronunciation: 'RITE, w is silent' }),
                word('speak', meanings('speak', '说', 'сүйлө', 'говорить', 'parler'), { syllables: ['speak'], sound: 'sp', pronunciation: 'long EE sound' }),
                word('listen', meanings('listen', '听', 'ук', 'слушать', 'ecouter'), { syllables: ['lis', 'ten'], sound: 'l', pronunciation: 'LISS-en, t is silent' }),
                word('walk', meanings('walk', '走', 'бас', 'ходить', 'marcher'), { syllables: ['walk'], sound: 'w', pronunciation: 'WAWK, l is silent' }),
                word('run', meanings('run', '跑', 'чурка', 'бежать', 'courir'), { syllables: ['run'], sound: 'r', pronunciation: 'short U sound' })
            ])
        ],
        phrases: [
            category('english-starter-phrases', starterLabel.phrases, [
                phrase('Hello', meanings('hello', '你好', 'салам', 'привет', 'bonjour'), { pronunciation: 'heh-LOH' }),
                phrase('How are you?', meanings('how are you?', '你好吗？', 'кандайсың?', 'как дела?', 'comment ca va ?'), { pronunciation: 'HOW ar yoo?' }),
                phrase('Thank you', meanings('thank you', '谢谢', 'рахмат', 'спасибо', 'merci'), { pronunciation: 'TH sound in thank' }),
                phrase('Please', meanings('please', '请', 'сураныч', 'пожалуйста', 's il vous plait'), { pronunciation: 'long EE sound' }),
                phrase('My name is...', meanings('my name is...', '我叫……', 'менин атым...', 'меня зовут...', 'je m appelle...'), { pronunciation: 'my NAME iz...' }),
                phrase('I am learning English', meanings('I am learning English', '我在学英语', 'мен англис тилин үйрөнүп жатам', 'я учу английский', 'j apprends l anglais'), { pronunciation: 'stress LEARN and ENG' })
            ]),
            category('english-classroom-phrases', starterLabel.classroomPhrases, [
                phrase('Please repeat', meanings('please repeat', '请重复', 'кайталаңызчы', 'повторите, пожалуйста', 'repetez, s il vous plait'), { pronunciation: 'long EE in please, stress PEAT' }),
                phrase('I do not understand', meanings('I do not understand', '我不明白', 'түшүнгөн жокмун', 'я не понимаю', 'je ne comprends pas'), { pronunciation: 'un-der-STAND' }),
                phrase('How do you say this?', meanings('how do you say this?', '这个怎么说？', 'муну кантип айтасыз?', 'как это сказать?', 'comment dit-on cela ?'), { pronunciation: 'stress SAY and THIS' }),
                phrase('Can you help me?', meanings('can you help me?', '你能帮我吗？', 'мага жардам бересизби?', 'вы можете мне помочь?', 'pouvez-vous m aider ?'), { pronunciation: 'clear L in help' }),
                phrase('Open your book', meanings('open your book', '打开书', 'китебиңди ач', 'открой книгу', 'ouvre ton livre'), { pronunciation: 'OH-pen your book' }),
                phrase('Listen carefully', meanings('listen carefully', '认真听', 'жакшылап ук', 'слушай внимательно', 'ecoute bien'), { pronunciation: 'LISS-en CARE-fuhl-lee' })
            ]),
            category('english-feelings', starterLabel.feelings, [
                phrase('I am happy', meanings('I am happy', '我很高兴', 'мен бактылуумун', 'я счастлив', 'je suis content'), { pronunciation: 'stress HAP in happy' }),
                phrase('I am tired', meanings('I am tired', '我累了', 'мен чарчадым', 'я устал', 'je suis fatigue'), { pronunciation: 'TAI-erd' }),
                phrase('I am ready', meanings('I am ready', '我准备好了', 'мен даярмын', 'я готов', 'je suis pret'), { pronunciation: 'RED-ee' }),
                phrase('I am nervous', meanings('I am nervous', '我很紧张', 'мен тынчсызданып жатам', 'я волнуюсь', 'je suis nerveux'), { pronunciation: 'NER-vus' }),
                phrase('This is easy', meanings('this is easy', '这很简单', 'бул оңой', 'это легко', 'c est facile'), { pronunciation: 'TH sound in this' }),
                phrase('This is difficult', meanings('this is difficult', '这很难', 'бул кыйын', 'это трудно', 'c est difficile'), { pronunciation: 'DI-fi-kult' })
            ]),
            category('english-help-phrases', starterLabel.helpPhrases, [
                phrase('Can you repeat that?', meanings('can you repeat that?', '你能再说一遍吗？', 'ушуну кайталап бересизби?', 'можете повторить это?', 'pouvez-vous repeter cela ?'), { pronunciation: 'stress PEAT in repeat' }),
                phrase('Please speak slowly', meanings('please speak slowly', '请说慢一点', 'жай сүйлөңүзчү', 'пожалуйста, говорите медленнее', 'parlez lentement, s il vous plait'), { pronunciation: 'stretch SPEAK and SLOW' }),
                phrase('What does this mean?', meanings('what does this mean?', '这是什么意思？', 'бул эмнени билдирет?', 'что это значит?', 'qu est-ce que cela veut dire ?'), { pronunciation: 'stress MEAN' }),
                phrase('I need help', meanings('I need help', '我需要帮助', 'мага жардам керек', 'мне нужна помощь', 'j ai besoin d aide'), { pronunciation: 'long EE in need' }),
                phrase('Where is the classroom?', meanings('where is the classroom?', '教室在哪里？', 'класс кайда?', 'где класс?', 'ou est la salle de classe ?'), { pronunciation: 'start with WH air' }),
                phrase('Can I ask a question?', meanings('can I ask a question?', '我可以问问题吗？', 'суроо берсем болобу?', 'можно задать вопрос?', 'puis-je poser une question ?'), { pronunciation: 'blend SK in ask' })
            ]),
            category('english-travel-phrases', starterLabel.travelPhrases, [
                phrase('Where is the station?', meanings('where is the station?', '车站在哪里？', 'бекет кайда?', 'где станция?', 'ou est la gare ?'), { pronunciation: 'STAY-shun' }),
                phrase('I need a ticket', meanings('I need a ticket', '我需要一张票', 'мага билет керек', 'мне нужен билет', 'j ai besoin d un billet'), { pronunciation: 'stress TIK in ticket' }),
                phrase('How much is this?', meanings('how much is this?', '这个多少钱？', 'бул канча турат?', 'сколько это стоит?', 'combien ca coute ?'), { pronunciation: 'blend CH in much' }),
                phrase('I am going to the hotel', meanings('I am going to the hotel', '我要去旅馆', 'мейманканага бара жатам', 'я еду в отель', 'je vais a l hotel'), { pronunciation: 'stress GO and TEL' }),
                phrase('Please show me the way', meanings('please show me the way', '请告诉我路', 'жолду көрсөтүңүзчү', 'покажите мне дорогу', 'montrez-moi le chemin'), { pronunciation: 'long O in show' }),
                phrase('I am lost', meanings('I am lost', '我迷路了', 'адашып калдым', 'я потерялся', 'je suis perdu'), { pronunciation: 'short O in lost' })
            ]),
            category('english-food-phrases', starterLabel.foodPhrases, [
                phrase('I would like tea', meanings('I would like tea', '我想喝茶', 'чай каалайм', 'я хотел бы чай', 'je voudrais du the'), { pronunciation: 'contract would like smoothly' }),
                phrase('Can I have water?', meanings('can I have water?', '可以给我水吗？', 'суу бересизби?', 'можно мне воды?', 'puis-je avoir de l eau ?'), { pronunciation: 'HAVE with clear V' }),
                phrase('This is delicious', meanings('this is delicious', '这个很好吃', 'бул даамдуу', 'это вкусно', 'c est delicieux'), { pronunciation: 'di-LISH-us' }),
                phrase('I do not eat meat', meanings('I do not eat meat', '我不吃肉', 'эт жебейм', 'я не ем мясо', 'je ne mange pas de viande'), { pronunciation: 'long EE in eat and meat' }),
                phrase('The bill, please', meanings('the bill, please', '请给我账单', 'эсепти бериңизчи', 'счет, пожалуйста', 'l addition, s il vous plait'), { pronunciation: 'short I in bill' }),
                phrase('I am hungry', meanings('I am hungry', '我饿了', 'ачкамын', 'я голоден', 'j ai faim'), { pronunciation: 'HUNG-gree' })
            ]),
            category('english-shopping-phrases', starterLabel.shoppingPhrases, [
                phrase('I want to buy this', meanings('I want to buy this', '我想买这个', 'мен муну сатып алгым келет', 'я хочу купить это', 'je veux acheter ceci'), { pronunciation: 'stress BUY and THIS' }),
                phrase('Do you have a smaller size?', meanings('do you have a smaller size?', '你们有小一点的吗？', 'кичине өлчөмү барбы?', 'у вас есть размер поменьше?', 'avez-vous une taille plus petite ?'), { pronunciation: 'SMAW-ler size' }),
                phrase('Where can I pay?', meanings('where can I pay?', '我在哪里付款？', 'кайдан төлөйм?', 'где я могу заплатить?', 'ou puis-je payer ?'), { pronunciation: 'long A in pay' }),
                phrase('I am just looking', meanings('I am just looking', '我只是看看', 'мен жөн гана көрүп жатам', 'я просто смотрю', 'je regarde seulement'), { pronunciation: 'JUST LOOK-ing' }),
                phrase('It is too expensive', meanings('it is too expensive', '这个太贵了', 'бул өтө кымбат', 'это слишком дорого', 'c est trop cher'), { pronunciation: 'ik-SPEN-siv' }),
                phrase('Can I use a card?', meanings('can I use a card?', '我可以刷卡吗？', 'карта колдонсом болобу?', 'можно оплатить картой?', 'puis-je utiliser une carte ?'), { pronunciation: 'long AR in card' })
            ]),
            category('english-weather-phrases', starterLabel.weatherPhrases, [
                phrase('It is sunny today', meanings('it is sunny today', '今天天气晴朗', 'бүгүн күн ачык', 'сегодня солнечно', 'il fait beau aujourd hui'), { pronunciation: 'SUN-ee to-DAY' }),
                phrase('It is raining', meanings('it is raining', '下雨了', 'жамгыр жаап жатат', 'идет дождь', 'il pleut'), { pronunciation: 'RAIN-ing' }),
                phrase('It is cold outside', meanings('it is cold outside', '外面很冷', 'тышта суук', 'на улице холодно', 'il fait froid dehors'), { pronunciation: 'long O in cold' }),
                phrase('It is very hot', meanings('it is very hot', '天气很热', 'аба аябай ысык', 'очень жарко', 'il fait tres chaud'), { pronunciation: 'short O in hot' }),
                phrase('I need a jacket', meanings('I need a jacket', '我需要一件外套', 'мага күрмө керек', 'мне нужна куртка', 'j ai besoin d une veste'), { pronunciation: 'JAK-it' }),
                phrase('The wind is strong', meanings('the wind is strong', '风很大', 'шамал катуу', 'ветер сильный', 'le vent est fort'), { pronunciation: 'strong final NG' })
            ]),
            category('english-daily-phrases', starterLabel.dailyPhrases, [
                phrase('I wake up early', meanings('I wake up early', '我起得很早', 'мен эрте турам', 'я встаю рано', 'je me reveille tot'), { pronunciation: 'WAKE up ER-lee' }),
                phrase('I go to school', meanings('I go to school', '我去学校', 'мен мектепке барам', 'я иду в школу', 'je vais a l ecole'), { pronunciation: 'GO to school' }),
                phrase('I do my homework', meanings('I do my homework', '我做作业', 'мен үй тапшырмамды жасайм', 'я делаю домашнее задание', 'je fais mes devoirs'), { pronunciation: 'HOME-work' }),
                phrase('I am going home', meanings('I am going home', '我要回家', 'мен үйгө бара жатам', 'я иду домой', 'je rentre a la maison'), { pronunciation: 'GO-ing home' }),
                phrase('See you tomorrow', meanings('see you tomorrow', '明天见', 'эртең көрүшөбүз', 'увидимся завтра', 'a demain'), { pronunciation: 'to-MOR-row' }),
                phrase('Good night', meanings('good night', '晚安', 'кайырлуу түн', 'спокойной ночи', 'bonne nuit'), { pronunciation: 'long I in night' })
            ])
        ]
    }
};

const kyrgyzContent = {
    speechLang: 'ky-KG',
    modes: {
        letters: [
            category('kyrgyz-starter-letters', starterLabel.letters, [
                letter('А а', 'а', 'а', 'Алма', meanings('apple', '苹果', 'алма', 'яблоко', 'pomme'), { pronunciation: 'open A sound, like ah' }),
                letter('Б б', 'бэ', 'б', 'Бала', meanings('child', '孩子', 'бала', 'ребенок', 'enfant'), { pronunciation: 'say BEH for the letter name, lips pop for b' }),
                letter('Ө ө', 'ө', 'ө', 'Өрдөк', meanings('duck', '鸭子', 'өрдөк', 'утка', 'canard'), { pronunciation: 'front rounded vowel, lips forward' }),
                letter('Ү ү', 'ү', 'ү', 'Үй', meanings('house', '房子', 'үй', 'дом', 'maison'), { pronunciation: 'front rounded vowel, between ee and oo' }),
                letter('Ң ң', 'ң', 'ң', 'Жаңы', meanings('new', '新的', 'жаңы', 'новый', 'nouveau'), { pronunciation: 'ng sound, tongue stays back' }),
                letter('Ч ч', 'чэ', 'ч', 'Чай', meanings('tea', '茶', 'чай', 'чай', 'the'), { pronunciation: 'clear CH sound like in church' })
            ]),
            category('kyrgyz-special-letters', { en: 'Special Letters', zh: '特殊字母', ky: 'Өзгөчө тамгалар', ru: 'Особые буквы', fr: 'Lettres speciales' }, [
                letter('Ө ө', 'ө', 'ө', 'Өнөр', meanings('art', '艺术', 'өнөр', 'искусство', 'art'), { pronunciation: 'front rounded vowel, like German ö' }),
                letter('Ү ү', 'ү', 'ү', 'Үмүт', meanings('hope', '希望', 'үмүт', 'надежда', 'espoir'), { pronunciation: 'front rounded vowel, lips forward' }),
                letter('Ң ң', 'ң', 'ң', 'Миң', meanings('thousand', '一千', 'миң', 'тысяча', 'mille'), { pronunciation: 'ng sound at the end of sing' }),
                letter('Ж ж', 'жэ', 'ж', 'Жол', meanings('road', '路', 'жол', 'дорога', 'route'), { pronunciation: 'like s in vision' }),
                letter('Ш ш', 'ша', 'ш', 'Шамал', meanings('wind', '风', 'шамал', 'ветер', 'vent'), { pronunciation: 'soft sh sound' })
            ])
        ],
        words: [
            category('kyrgyz-starter-words', starterLabel.words, [
                word('алма', meanings('apple', '苹果', 'алма', 'яблоко', 'pomme'), { syllables: ['ал', 'ма'], sound: 'а', pronunciation: 'AL-ma' }),
                word('суу', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['суу'], sound: 'с', pronunciation: 'long UU sound' }),
                word('китеп', meanings('book', '书', 'китеп', 'книга', 'livre'), { syllables: ['ки', 'теп'], sound: 'к', pronunciation: 'ki-TEP' }),
                word('мектеп', meanings('school', '学校', 'мектеп', 'школа', 'ecole'), { syllables: ['мек', 'теп'], sound: 'м', pronunciation: 'mek-TEP' }),
                word('дос', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { syllables: ['дос'], sound: 'д', pronunciation: 'clear O sound' }),
                word('нан', meanings('bread', '面包', 'нан', 'хлеб', 'pain'), { syllables: ['нан'], sound: 'н', pronunciation: 'short and strong N' })
            ]),
            category('kyrgyz-everyday-words', starterLabel.everydayWords, [
                word('үй', meanings('house', '房子', 'үй', 'дом', 'maison'), { syllables: ['үй'], sound: 'ү', pronunciation: 'single rounded Ү sound' }),
                word('күн', meanings('sun; day', '太阳；天', 'күн', 'солнце; день', 'soleil; jour'), { syllables: ['күн'], sound: 'к', pronunciation: 'rounded Ү in the middle' }),
                word('тоо', meanings('mountain', '山', 'тоо', 'гора', 'montagne'), { syllables: ['тоо'], sound: 'т', pronunciation: 'hold the long OO' }),
                word('жол', meanings('road', '路', 'жол', 'дорога', 'route'), { syllables: ['жол'], sound: 'ж', pronunciation: 'zh sound like in vision' }),
                word('сүт', meanings('milk', '牛奶', 'сүт', 'молоко', 'lait'), { syllables: ['сүт'], sound: 'с', pronunciation: 'rounded Ү vowel' }),
                word('оюн', meanings('game', '游戏', 'оюн', 'игра', 'jeu'), { syllables: ['о', 'юн'], sound: 'о', pronunciation: 'o-YUN' })
            ]),
            category('kyrgyz-classroom-words', starterLabel.classroomWords, [
                word('калем', meanings('pen', '钢笔', 'калем', 'ручка', 'stylo'), { syllables: ['ка', 'лем'], sound: 'к', pronunciation: 'ka-LEM' }),
                word('такта', meanings('board', '黑板', 'такта', 'доска', 'tableau'), { syllables: ['так', 'та'], sound: 'т', pronunciation: 'TAK-ta' }),
                word('сабак', meanings('lesson', '课程', 'сабак', 'урок', 'lecon'), { syllables: ['са', 'бак'], sound: 'с', pronunciation: 'sa-BAK' }),
                word('суроо', meanings('question', '问题', 'суроо', 'вопрос', 'question'), { syllables: ['су', 'роо'], sound: 'с', pronunciation: 'su-ROO with long OO' }),
                word('жооп', meanings('answer', '答案', 'жооп', 'ответ', 'reponse'), { syllables: ['жооп'], sound: 'ж', pronunciation: 'JOOP with long OO' }),
                word('мугалим', meanings('teacher', '老师', 'мугалим', 'учитель', 'professeur'), { syllables: ['му', 'га', 'лим'], sound: 'м', pronunciation: 'mu-ga-LIM' })
            ]),
            category('kyrgyz-family-words', starterLabel.familyWords, [
                word('эне', meanings('mother', '妈妈', 'эне', 'мать', 'mere'), { syllables: ['э', 'не'], sound: 'э', pronunciation: 'e-NE' }),
                word('ата', meanings('father', '爸爸', 'ата', 'отец', 'pere'), { syllables: ['а', 'та'], sound: 'а', pronunciation: 'a-TA' }),
                word('ага', meanings('older brother', '哥哥', 'ага', 'старший брат', 'grand frere'), { syllables: ['а', 'га'], sound: 'а', pronunciation: 'a-GA' }),
                word('эже', meanings('older sister', '姐姐', 'эже', 'старшая сестра', 'grande soeur'), { syllables: ['э', 'же'], sound: 'э', pronunciation: 'e-JE' }),
                word('бала', meanings('child', '孩子', 'бала', 'ребенок', 'enfant'), { syllables: ['ба', 'ла'], sound: 'б', pronunciation: 'ba-LA' }),
                word('үй-бүлө', meanings('family', '家庭', 'үй-бүлө', 'семья', 'famille'), { syllables: ['үй', 'бү', 'лө'], sound: 'ү', pronunciation: 'front rounded vowels in үй and бү' })
            ]),
            category('kyrgyz-food-words', starterLabel.foodWords, [
                word('чай', meanings('tea', '茶', 'чай', 'чай', 'the'), { syllables: ['чай'], sound: 'ч', pronunciation: 'chai' }),
                word('сүт', meanings('milk', '牛奶', 'сүт', 'молоко', 'lait'), { syllables: ['сүт'], sound: 'с', pronunciation: 'rounded Ү vowel' }),
                word('шорпо', meanings('soup', '汤', 'шорпо', 'суп', 'soupe'), { syllables: ['шор', 'по'], sound: 'ш', pronunciation: 'shor-PO' }),
                word('эт', meanings('meat', '肉', 'эт', 'мясо', 'viande'), { syllables: ['эт'], sound: 'э', pronunciation: 'short open E' }),
                word('жемиш', meanings('fruit', '水果', 'жемиш', 'фрукты', 'fruit'), { syllables: ['же', 'миш'], sound: 'ж', pronunciation: 'je-MISH' }),
                word('суу', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['суу'], sound: 'с', pronunciation: 'hold the long UU' })
            ]),
            category('kyrgyz-travel-words', starterLabel.travelWords, [
                word('автобус', meanings('bus', '公交车', 'автобус', 'автобус', 'bus'), { syllables: ['ав', 'то', 'бус'], sound: 'а', pronunciation: 'av-to-BUS' }),
                word('поезд', meanings('train', '火车', 'поезд', 'поезд', 'train'), { syllables: ['по', 'езд'], sound: 'п', pronunciation: 'po-YEZD' }),
                word('билет', meanings('ticket', '票', 'билет', 'билет', 'billet'), { syllables: ['би', 'лет'], sound: 'б', pronunciation: 'bi-LET' }),
                word('жол', meanings('road', '路', 'жол', 'дорога', 'route'), { syllables: ['жол'], sound: 'ж', pronunciation: 'soft zh sound' }),
                word('шаар', meanings('city', '城市', 'шаар', 'город', 'ville'), { syllables: ['ша', 'ар'], sound: 'ш', pronunciation: 'two AA vowels together' }),
                word('бекет', meanings('station', '车站', 'бекет', 'станция', 'gare'), { syllables: ['бе', 'кет'], sound: 'б', pronunciation: 'be-KET' })
            ]),
            category('kyrgyz-colors-words', starterLabel.colorsWords, [
                word('кызыл', meanings('red', '红色', 'кызыл', 'красный', 'rouge'), { syllables: ['кы', 'зыл'], sound: 'к', pronunciation: 'ky-ZYL' }),
                word('көк', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { syllables: ['көк'], sound: 'к', pronunciation: 'rounded Ө sound' }),
                word('жашыл', meanings('green', '绿色', 'жашыл', 'зеленый', 'vert'), { syllables: ['жа', 'шыл'], sound: 'ж', pronunciation: 'zha-SHYL' }),
                word('кара', meanings('black', '黑色', 'кара', 'черный', 'noir'), { syllables: ['ка', 'ра'], sound: 'к', pronunciation: 'ka-RA' }),
                word('ак', meanings('white', '白色', 'ак', 'белый', 'blanc'), { syllables: ['ак'], sound: 'а', pronunciation: 'short AK' }),
                word('сары', meanings('yellow', '黄色', 'сары', 'желтый', 'jaune'), { syllables: ['са', 'ры'], sound: 'с', pronunciation: 'sa-RY' })
            ]),
            category('kyrgyz-body-words', starterLabel.bodyWords, [
                word('баш', meanings('head', '头', 'баш', 'голова', 'tete'), { syllables: ['баш'], sound: 'б', pronunciation: 'bash' }),
                word('кол', meanings('hand', '手', 'кол', 'рука', 'main'), { syllables: ['кол'], sound: 'к', pronunciation: 'kol' }),
                word('көз', meanings('eye', '眼睛', 'көз', 'глаз', 'oeil'), { syllables: ['көз'], sound: 'к', pronunciation: 'rounded Ө vowel' }),
                word('кулак', meanings('ear', '耳朵', 'кулак', 'ухо', 'oreille'), { syllables: ['ку', 'лак'], sound: 'к', pronunciation: 'ku-LAK' }),
                word('ооз', meanings('mouth', '嘴巴', 'ооз', 'рот', 'bouche'), { syllables: ['ооз'], sound: 'о', pronunciation: 'long OO sound' }),
                word('бут', meanings('foot', '脚', 'бут', 'ступня', 'pied'), { syllables: ['бут'], sound: 'б', pronunciation: 'but' })
            ]),
            category('kyrgyz-action-words', starterLabel.actionWords, [
                word('окуу', meanings('read; study', '读；学习', 'окуу', 'читать; учиться', 'lire; etudier'), { syllables: ['о', 'куу'], sound: 'о', pronunciation: 'o-KUU' }),
                word('жаз', meanings('write', '写', 'жаз', 'писать', 'ecrire'), { syllables: ['жаз'], sound: 'ж', pronunciation: 'zhaz' }),
                word('сүйлө', meanings('speak', '说', 'сүйлө', 'говорить', 'parler'), { syllables: ['сүй', 'лө'], sound: 'с', pronunciation: 'rounded vowels in both syllables' }),
                word('ук', meanings('listen', '听', 'ук', 'слушать', 'ecouter'), { syllables: ['ук'], sound: 'у', pronunciation: 'uk' }),
                word('бас', meanings('walk; step', '走', 'бас', 'идти; шагать', 'marcher'), { syllables: ['бас'], sound: 'б', pronunciation: 'bas' }),
                word('чурка', meanings('run', '跑', 'чурка', 'бежать', 'courir'), { syllables: ['чур', 'ка'], sound: 'ч', pronunciation: 'chur-KA' })
            ])
        ],
        phrases: [
            category('kyrgyz-starter-phrases', starterLabel.phrases, [
                phrase('Салам', meanings('hello', '你好', 'салам', 'привет', 'bonjour'), { pronunciation: 'sa-LAM' }),
                phrase('Кандайсың?', meanings('how are you?', '你好吗？', 'кандайсың?', 'как дела?', 'comment ca va ?'), { pronunciation: 'kan-DAY-sing' }),
                phrase('Рахмат', meanings('thank you', '谢谢', 'рахмат', 'спасибо', 'merci'), { pronunciation: 'rahkh-MAT' }),
                phrase('Сураныч', meanings('please', '请', 'сураныч', 'пожалуйста', 's il vous plait'), { pronunciation: 'su-ra-NYCH' }),
                phrase('Менин атым...', meanings('my name is...', '我叫……', 'менин атым...', 'меня зовут...', 'je m appelle...'), { pronunciation: 'me-NIN a-TIM' }),
                phrase('Мен кыргызча үйрөнүп жатам', meanings('I am learning Kyrgyz', '我在学吉尔吉斯语', 'мен кыргызча үйрөнүп жатам', 'я учу кыргызский', 'j apprends le kirghiz'), { pronunciation: 'stress GYZ and RO' })
            ]),
            category('kyrgyz-classroom-phrases', starterLabel.classroomPhrases, [
                phrase('Кайталаңызчы', meanings('please repeat', '请重复', 'кайталаңызчы', 'повторите, пожалуйста', 'repetez, s il vous plait'), { pronunciation: 'kai-ta-LA-nyz-chy' }),
                phrase('Мен түшүнгөн жокмун', meanings('I do not understand', '我不明白', 'мен түшүнгөн жокмун', 'я не понимаю', 'je ne comprends pas'), { pronunciation: 'men ty-SHUN-gon zhok-MUN' }),
                phrase('Бул эмне?', meanings('what is this?', '这是什么？', 'бул эмне?', 'что это?', 'qu est-ce que c est ?'), { pronunciation: 'bul em-NE' }),
                phrase('Мага жардам бериңизчи', meanings('please help me', '请帮助我', 'мага жардам бериңизчи', 'помогите мне, пожалуйста', 'aidez-moi, s il vous plait'), { pronunciation: 'ma-GA zhar-DAM be-RI-ngi-zchi' }),
                phrase('Китебиңди ач', meanings('open your book', '打开书', 'китебиңди ач', 'открой книгу', 'ouvre ton livre'), { pronunciation: 'ki-te-BING-di ach' }),
                phrase('Жакшылап ук', meanings('listen carefully', '认真听', 'жакшылап ук', 'слушай внимательно', 'ecoute bien'), { pronunciation: 'zhak-shy-LAP uk' })
            ]),
            category('kyrgyz-feelings', starterLabel.feelings, [
                phrase('Мен бактылуумун', meanings('I am happy', '我很高兴', 'мен бактылуумун', 'я счастлив', 'je suis content'), { pronunciation: 'bak-ty-LUU-mun' }),
                phrase('Мен чарчадым', meanings('I am tired', '我累了', 'мен чарчадым', 'я устал', 'je suis fatigue'), { pronunciation: 'char-cha-DYM' }),
                phrase('Мен даярмын', meanings('I am ready', '我准备好了', 'мен даярмын', 'я готов', 'je suis pret'), { pronunciation: 'da-YAR-myn' }),
                phrase('Бул оңой', meanings('this is easy', '这很简单', 'бул оңой', 'это легко', 'c est facile'), { pronunciation: 'front rounded Ө' }),
                phrase('Бул кыйын', meanings('this is difficult', '这很难', 'бул кыйын', 'это трудно', 'c est difficile'), { pronunciation: 'KY-yyn' }),
                phrase('Мен кубанычтамын', meanings('I am glad', '我很开心', 'мен кубанычтамын', 'я рад', 'je suis heureux'), { pronunciation: 'ku-ba-NYCH-ta-myn' })
            ]),
            category('kyrgyz-help-phrases', starterLabel.helpPhrases, [
                phrase('Кайталап бериңизчи', meanings('please repeat that', '请再说一遍', 'кайталап бериңизчи', 'повторите, пожалуйста', 'repetez encore, s il vous plait'), { pronunciation: 'kai-ta-LAP be-RI-ngi-zchi' }),
                phrase('Жай сүйлөңүзчү', meanings('please speak slowly', '请说慢一点', 'жай сүйлөңүзчү', 'говорите медленнее, пожалуйста', 'parlez lentement, s il vous plait'), { pronunciation: 'front rounded Ө in сүйлө' }),
                phrase('Бул эмнени билдирет?', meanings('what does this mean?', '这是什么意思？', 'бул эмнени билдирет?', 'что это значит?', 'qu est-ce que cela veut dire ?'), { pronunciation: 'bul em-NE-ni bil-DI-ret' }),
                phrase('Мага жардам керек', meanings('I need help', '我需要帮助', 'мага жардам керек', 'мне нужна помощь', 'j ai besoin d aide'), { pronunciation: 'ma-GA zhar-DAM ke-REK' }),
                phrase('Класс кайда?', meanings('where is the classroom?', '教室在哪里？', 'класс кайда?', 'где класс?', 'ou est la salle de classe ?'), { pronunciation: 'KAI-da' }),
                phrase('Суроо берсем болобу?', meanings('can I ask a question?', '我可以问问题吗？', 'суроо берсем болобу?', 'можно задать вопрос?', 'puis-je poser une question ?'), { pronunciation: 'su-ROO ber-SEM bo-LO-bu' })
            ]),
            category('kyrgyz-travel-phrases', starterLabel.travelPhrases, [
                phrase('Бекет кайда?', meanings('where is the station?', '车站在哪里？', 'бекет кайда?', 'где станция?', 'ou est la gare ?'), { pronunciation: 'be-KET KAI-da' }),
                phrase('Мага билет керек', meanings('I need a ticket', '我需要一张票', 'мага билет керек', 'мне нужен билет', 'j ai besoin d un billet'), { pronunciation: 'ma-GA bi-LET ke-REK' }),
                phrase('Бул канча турат?', meanings('how much is this?', '这个多少钱？', 'бул канча турат?', 'сколько это стоит?', 'combien ca coute ?'), { pronunciation: 'bul kan-CHA tu-RAT' }),
                phrase('Мейманканага бара жатам', meanings('I am going to the hotel', '我要去旅馆', 'мейманканага бара жатам', 'я иду в гостиницу', 'je vais a l hotel'), { pronunciation: 'mei-man-ka-NA-ga ba-RA zha-TAM' }),
                phrase('Жолду көрсөтүңүзчү', meanings('please show me the way', '请告诉我路', 'жолду көрсөтүңүзчү', 'покажите мне дорогу', 'montrez-moi le chemin'), { pronunciation: 'rounded Ө in көрсө' }),
                phrase('Адашып калдым', meanings('I am lost', '我迷路了', 'адашып калдым', 'я потерялся', 'je suis perdu'), { pronunciation: 'a-da-SHIP kal-DYM' })
            ]),
            category('kyrgyz-food-phrases', starterLabel.foodPhrases, [
                phrase('Чай каалайм', meanings('I would like tea', '我想喝茶', 'чай каалайм', 'я хочу чай', 'je voudrais du the'), { pronunciation: 'chai kaa-LAI-ym' }),
                phrase('Суу бересизби?', meanings('can I have water?', '可以给我水吗？', 'суу бересизби?', 'можно мне воды?', 'puis-je avoir de l eau ?'), { pronunciation: 'SUU be-re-SIZ-bi' }),
                phrase('Бул даамдуу', meanings('this is delicious', '这个很好吃', 'бул даамдуу', 'это вкусно', 'c est delicieux'), { pronunciation: 'daaM-DUU with long vowels' }),
                phrase('Эт жебейм', meanings('I do not eat meat', '我不吃肉', 'эт жебейм', 'я не ем мясо', 'je ne mange pas de viande'), { pronunciation: 'et zhe-BEIM' }),
                phrase('Эсепти бериңизчи', meanings('the bill, please', '请给我账单', 'эсепти бериңизчи', 'счет, пожалуйста', 'l addition, s il vous plait'), { pronunciation: 'e-SEP-ti be-RI-ngi-zchi' }),
                phrase('Ачкамын', meanings('I am hungry', '我饿了', 'ачкамын', 'я голоден', 'j ai faim'), { pronunciation: 'ach-KA-myn' })
            ]),
            category('kyrgyz-shopping-phrases', starterLabel.shoppingPhrases, [
                phrase('Мен муну сатып алгым келет', meanings('I want to buy this', '我想买这个', 'мен муну сатып алгым келет', 'я хочу купить это', 'je veux acheter ceci'), { pronunciation: 'men mu-NU sa-TYP al-GYM ke-LET' }),
                phrase('Кичине өлчөмү барбы?', meanings('do you have a smaller size?', '你们有小一点的吗？', 'кичине өлчөмү барбы?', 'у вас есть размер поменьше?', 'avez-vous une taille plus petite ?'), { pronunciation: 'rounded Ө in өлчө' }),
                phrase('Кайдан төлөйм?', meanings('where can I pay?', '我在哪里付款？', 'кайдан төлөйм?', 'где я могу заплатить?', 'ou puis-je payer ?'), { pronunciation: 'KAI-dan to-LÖYM' }),
                phrase('Мен жөн гана көрүп жатам', meanings('I am just looking', '我只是看看', 'мен жөн гана көрүп жатам', 'я просто смотрю', 'je regarde seulement'), { pronunciation: 'men jön ga-NA кө-RYP zha-TAM' }),
                phrase('Бул өтө кымбат', meanings('it is too expensive', '这个太贵了', 'бул өтө кымбат', 'это слишком дорого', 'c est trop cher'), { pronunciation: 'rounded Ө in өтө' }),
                phrase('Карта колдонсом болобу?', meanings('can I use a card?', '我可以刷卡吗？', 'карта колдонсом болобу?', 'можно оплатить картой?', 'puis-je utiliser une carte ?'), { pronunciation: 'kar-TA kol-don-SOM bo-LO-bu' })
            ]),
            category('kyrgyz-weather-phrases', starterLabel.weatherPhrases, [
                phrase('Бүгүн күн ачык', meanings('it is sunny today', '今天天气晴朗', 'бүгүн күн ачык', 'сегодня солнечно', 'il fait beau aujourd hui'), { pronunciation: 'by-GÜN күн a-CHYK' }),
                phrase('Жамгыр жаап жатат', meanings('it is raining', '下雨了', 'жамгыр жаап жатат', 'идет дождь', 'il pleut'), { pronunciation: 'zham-GYR zha-AP zha-TAT' }),
                phrase('Тышта суук', meanings('it is cold outside', '外面很冷', 'тышта суук', 'на улице холодно', 'il fait froid dehors'), { pronunciation: 'TYSH-ta SUUK' }),
                phrase('Аба аябай ысык', meanings('it is very hot', '天气很热', 'аба аябай ысык', 'очень жарко', 'il fait tres chaud'), { pronunciation: 'a-BA a-ya-BAI Y-syk' }),
                phrase('Мага күрмө керек', meanings('I need a jacket', '我需要一件外套', 'мага күрмө керек', 'мне нужна куртка', 'j ai besoin d une veste'), { pronunciation: 'ma-GA kür-MÖ ke-REK' }),
                phrase('Шамал катуу', meanings('the wind is strong', '风很大', 'шамал катуу', 'ветер сильный', 'le vent est fort'), { pronunciation: 'sha-MAL ka-TUU' })
            ]),
            category('kyrgyz-daily-phrases', starterLabel.dailyPhrases, [
                phrase('Мен эрте турам', meanings('I wake up early', '我起得很早', 'мен эрте турам', 'я встаю рано', 'je me reveille tot'), { pronunciation: 'men er-TE tu-RAM' }),
                phrase('Мен мектепке барам', meanings('I go to school', '我去学校', 'мен мектепке барам', 'я иду в школу', 'je vais a l ecole'), { pronunciation: 'men mek-TEP-ke ba-RAM' }),
                phrase('Мен үй тапшырмамды жасайм', meanings('I do my homework', '我做作业', 'мен үй тапшырмамды жасайм', 'я делаю домашнее задание', 'je fais mes devoirs'), { pronunciation: 'rounded Ү in үй, zha-SAIM at end' }),
                phrase('Мен үйгө бара жатам', meanings('I am going home', '我要回家', 'мен үйгө бара жатам', 'я иду домой', 'je rentre a la maison'), { pronunciation: 'rounded Ү and Ө vowels' }),
                phrase('Эртең көрүшөбүз', meanings('see you tomorrow', '明天见', 'эртең көрүшөбүз', 'увидимся завтра', 'a demain'), { pronunciation: 'er-TENG кө-rü-SHÖ-büz' }),
                phrase('Кайырлуу түн', meanings('good night', '晚安', 'кайырлуу түн', 'спокойной ночи', 'bonne nuit'), { pronunciation: 'kai-YR-luu tün' })
            ])
        ]
    }
};

const chineseContent = {
    speechLang: 'zh-CN',
    modes: {
        letters: [
            category('chinese-starter-pinyin', starterLabel.pinyin, [
                letter('ma', 'ma', 'ma', '妈', meanings('mom', '妈妈', 'апа', 'мама', 'maman'), { pronunciation: 'plain pinyin ma' }),
                letter('ba', 'ba', 'ba', '爸', meanings('dad', '爸爸', 'ата', 'папа', 'papa'), { pronunciation: 'plain pinyin ba' }),
                letter('ni', 'ni', 'ni', '你', meanings('you', '你', 'сен', 'ты', 'toi'), { pronunciation: 'NEE' }),
                letter('hao', 'hao', 'hao', '好', meanings('good', '好', 'жакшы', 'хорошо', 'bien'), { pronunciation: 'like how without w' }),
                letter('xie', 'xie', 'xie', '谢', meanings('thanks', '谢', 'ыраазычылык', 'благодарность', 'merci'), { pronunciation: 'soft sh + yeh' }),
                letter('shui', 'shui', 'shui', '水', meanings('water', '水', 'суу', 'вода', 'eau'), { pronunciation: 'shway' })
            ]),
            category('chinese-tone-practice', starterLabel.tonePractice, [
                letter('mā', 'first tone', 'high level', '妈', meanings('mom', '妈妈', 'апа', 'мама', 'maman'), { pronunciation: 'Tone 1: keep your voice high and flat' }),
                letter('má', 'second tone', 'rising', '麻', meanings('hemp', '麻', 'кендир', 'конопля', 'chanvre'), { pronunciation: 'Tone 2: rise up like a question' }),
                letter('mǎ', 'third tone', 'falling-rising', '马', meanings('horse', '马', 'ат', 'лошадь', 'cheval'), { pronunciation: 'Tone 3: dip down then rise' }),
                letter('mà', 'fourth tone', 'falling', '骂', meanings('scold', '骂', 'урушуу', 'ругать', 'gronder'), { pronunciation: 'Tone 4: sharp and falling' }),
                letter('ma', 'neutral tone', 'light', '吗', meanings('question particle', '吗', 'суроо бөлүкчөсү', 'вопросительная частица', 'particule interrogative'), { pronunciation: 'Neutral tone: short and light' })
            ])
        ],
        words: [
            category('chinese-starter-characters', starterLabel.characters, [
                word('你好', meanings('hello', '你好', 'салам', 'привет', 'bonjour'), { syllables: ['ni', 'hao'], sound: 'n-h', pronunciation: 'ni3 hao3' }),
                word('水', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['shui'], sound: 'sh', pronunciation: 'shui3' }),
                word('茶', meanings('tea', '茶', 'чай', 'чай', 'the'), { syllables: ['cha'], sound: 'ch', pronunciation: 'cha2' }),
                word('朋友', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { syllables: ['peng', 'you'], sound: 'p', pronunciation: 'peng2 you3' }),
                word('学生', meanings('student', '学生', 'окуучу', 'студент', 'etudiant'), { syllables: ['xue', 'sheng'], sound: 'x', pronunciation: 'xue2 sheng1' }),
                word('老师', meanings('teacher', '老师', 'мугалим', 'учитель', 'professeur'), { syllables: ['lao', 'shi'], sound: 'l', pronunciation: 'lao3 shi1' })
            ]),
            category('chinese-common-characters', starterLabel.commonCharacters, [
                word('书', meanings('book', '书', 'китеп', 'книга', 'livre'), { syllables: ['shu'], sound: 'sh', pronunciation: 'shu1' }),
                word('家', meanings('home; family', '家', 'үй', 'дом; семья', 'maison; famille'), { syllables: ['jia'], sound: 'j', pronunciation: 'jia1' }),
                word('人', meanings('person', '人', 'адам', 'человек', 'personne'), { syllables: ['ren'], sound: 'r', pronunciation: 'ren2' }),
                word('日', meanings('sun; day', '日', 'күн', 'солнце; день', 'soleil; jour'), { syllables: ['ri'], sound: 'r', pronunciation: 'ri4' }),
                word('月', meanings('moon; month', '月', 'ай', 'луна; месяц', 'lune; mois'), { syllables: ['yue'], sound: 'y', pronunciation: 'yue4' }),
                word('学', meanings('study', '学', 'окуу', 'учить', 'etudier'), { syllables: ['xue'], sound: 'x', pronunciation: 'xue2' })
            ]),
            category('chinese-everyday-words', starterLabel.everydayWords, [
                word('水', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['shui'], sound: 'sh', pronunciation: 'shui3' }),
                word('饭', meanings('rice; meal', '饭', 'тамак', 'еда; рис', 'repas; riz'), { syllables: ['fan'], sound: 'f', pronunciation: 'fan4' }),
                word('学校', meanings('school', '学校', 'мектеп', 'школа', 'ecole'), { syllables: ['xue', 'xiao'], sound: 'x', pronunciation: 'xue2 xiao4' }),
                word('朋友', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { syllables: ['peng', 'you'], sound: 'p', pronunciation: 'peng2 you3' }),
                word('老师', meanings('teacher', '老师', 'мугалим', 'учитель', 'professeur'), { syllables: ['lao', 'shi'], sound: 'l', pronunciation: 'lao3 shi1' }),
                word('中国', meanings('China', '中国', 'Кытай', 'Китай', 'Chine'), { syllables: ['zhong', 'guo'], sound: 'zh', pronunciation: 'zhong1 guo2' })
            ]),
            category('chinese-family-words', starterLabel.familyWords, [
                word('妈妈', meanings('mother', '妈妈', 'эне', 'мама', 'mere'), { syllables: ['ma', 'ma'], sound: 'm', pronunciation: 'ma1 ma' }),
                word('爸爸', meanings('father', '爸爸', 'ата', 'папа', 'pere'), { syllables: ['ba', 'ba'], sound: 'b', pronunciation: 'ba4 ba' }),
                word('哥哥', meanings('older brother', '哥哥', 'ага', 'старший брат', 'grand frere'), { syllables: ['ge', 'ge'], sound: 'g', pronunciation: 'ge1 ge' }),
                word('姐姐', meanings('older sister', '姐姐', 'эже', 'старшая сестра', 'grande soeur'), { syllables: ['jie', 'jie'], sound: 'j', pronunciation: 'jie3 jie' }),
                word('孩子', meanings('child', '孩子', 'бала', 'ребенок', 'enfant'), { syllables: ['hai', 'zi'], sound: 'h', pronunciation: 'hai2 zi' }),
                word('家人', meanings('family', '家人', 'үй-бүлө', 'семья', 'famille'), { syllables: ['jia', 'ren'], sound: 'j', pronunciation: 'jia1 ren2' })
            ]),
            category('chinese-food-words', starterLabel.foodWords, [
                word('茶', meanings('tea', '茶', 'чай', 'чай', 'the'), { syllables: ['cha'], sound: 'ch', pronunciation: 'cha2' }),
                word('牛奶', meanings('milk', '牛奶', 'сүт', 'молоко', 'lait'), { syllables: ['niu', 'nai'], sound: 'n', pronunciation: 'niu2 nai3' }),
                word('面包', meanings('bread', '面包', 'нан', 'хлеб', 'pain'), { syllables: ['mian', 'bao'], sound: 'm', pronunciation: 'mian4 bao1' }),
                word('米饭', meanings('rice', '米饭', 'күрүч', 'рис', 'riz'), { syllables: ['mi', 'fan'], sound: 'm', pronunciation: 'mi3 fan4' }),
                word('汤', meanings('soup', '汤', 'шорпо', 'суп', 'soupe'), { syllables: ['tang'], sound: 't', pronunciation: 'tang1' }),
                word('果汁', meanings('juice', '果汁', 'шире', 'сок', 'jus'), { syllables: ['guo', 'zhi'], sound: 'g', pronunciation: 'guo3 zhi1' })
            ]),
            category('chinese-travel-words', starterLabel.travelWords, [
                word('车站', meanings('station', '车站', 'бекет', 'станция', 'gare'), { syllables: ['che', 'zhan'], sound: 'ch', pronunciation: 'che1 zhan4' }),
                word('火车', meanings('train', '火车', 'поезд', 'поезд', 'train'), { syllables: ['huo', 'che'], sound: 'h', pronunciation: 'huo3 che1' }),
                word('公交车', meanings('bus', '公交车', 'автобус', 'автобус', 'bus'), { syllables: ['gong', 'jiao', 'che'], sound: 'g', pronunciation: 'gong1 jiao1 che1' }),
                word('票', meanings('ticket', '票', 'билет', 'билет', 'billet'), { syllables: ['piao'], sound: 'p', pronunciation: 'piao4' }),
                word('旅馆', meanings('hotel', '旅馆', 'мейманкана', 'гостиница', 'hotel'), { syllables: ['lu:', 'guan'], sound: 'l', pronunciation: 'lu:3 guan3' }),
                word('路', meanings('road', '路', 'жол', 'дорога', 'route'), { syllables: ['lu'], sound: 'l', pronunciation: 'lu4' })
            ]),
            category('chinese-colors-words', starterLabel.colorsWords, [
                word('红色', meanings('red', '红色', 'кызыл', 'красный', 'rouge'), { syllables: ['hong', 'se'], sound: 'h', pronunciation: 'hong2 se4' }),
                word('蓝色', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { syllables: ['lan', 'se'], sound: 'l', pronunciation: 'lan2 se4' }),
                word('绿色', meanings('green', '绿色', 'жашыл', 'зеленый', 'vert'), { syllables: ['lu:', 'se'], sound: 'l', pronunciation: 'lu:4 se4' }),
                word('黑色', meanings('black', '黑色', 'кара', 'черный', 'noir'), { syllables: ['hei', 'se'], sound: 'h', pronunciation: 'hei1 se4' }),
                word('白色', meanings('white', '白色', 'ак', 'белый', 'blanc'), { syllables: ['bai', 'se'], sound: 'b', pronunciation: 'bai2 se4' }),
                word('黄色', meanings('yellow', '黄色', 'сары', 'желтый', 'jaune'), { syllables: ['huang', 'se'], sound: 'h', pronunciation: 'huang2 se4' })
            ]),
            category('chinese-body-words', starterLabel.bodyWords, [
                word('头', meanings('head', '头', 'баш', 'голова', 'tete'), { syllables: ['tou'], sound: 't', pronunciation: 'tou2' }),
                word('手', meanings('hand', '手', 'кол', 'рука', 'main'), { syllables: ['shou'], sound: 'sh', pronunciation: 'shou3' }),
                word('眼睛', meanings('eye', '眼睛', 'көз', 'глаз', 'oeil'), { syllables: ['yan', 'jing'], sound: 'y', pronunciation: 'yan3 jing1' }),
                word('耳朵', meanings('ear', '耳朵', 'кулак', 'ухо', 'oreille'), { syllables: ['er', 'duo'], sound: 'er', pronunciation: 'er3 duo5' }),
                word('嘴巴', meanings('mouth', '嘴巴', 'ооз', 'рот', 'bouche'), { syllables: ['zui', 'ba'], sound: 'z', pronunciation: 'zui3 ba' }),
                word('脚', meanings('foot', '脚', 'бут', 'ступня', 'pied'), { syllables: ['jiao'], sound: 'j', pronunciation: 'jiao3' })
            ]),
            category('chinese-action-words', starterLabel.actionWords, [
                word('读', meanings('read', '读', 'окуу', 'читать', 'lire'), { syllables: ['du'], sound: 'd', pronunciation: 'du2' }),
                word('写', meanings('write', '写', 'жаз', 'писать', 'ecrire'), { syllables: ['xie'], sound: 'x', pronunciation: 'xie3' }),
                word('说', meanings('speak', '说', 'сүйлө', 'говорить', 'parler'), { syllables: ['shuo'], sound: 'sh', pronunciation: 'shuo1' }),
                word('听', meanings('listen', '听', 'ук', 'слушать', 'ecouter'), { syllables: ['ting'], sound: 't', pronunciation: 'ting1' }),
                word('走', meanings('walk', '走', 'бас', 'идти', 'marcher'), { syllables: ['zou'], sound: 'z', pronunciation: 'zou3' }),
                word('跑', meanings('run', '跑', 'чурка', 'бежать', 'courir'), { syllables: ['pao'], sound: 'p', pronunciation: 'pao3' })
            ])
        ],
        phrases: [
            category('chinese-starter-phrases', starterLabel.phrases, [
                phrase('你好', meanings('hello', '你好', 'салам', 'привет', 'bonjour'), { pronunciation: 'ni3 hao3' }),
                phrase('谢谢', meanings('thank you', '谢谢', 'рахмат', 'спасибо', 'merci'), { pronunciation: 'xie4 xie' }),
                phrase('请', meanings('please', '请', 'сураныч', 'пожалуйста', 's il vous plait'), { pronunciation: 'qing3' }),
                phrase('我叫...', meanings('my name is...', '我叫……', 'менин атым...', 'меня зовут...', 'je m appelle...'), { pronunciation: 'wo3 jiao4...' }),
                phrase('我在学中文', meanings('I am learning Chinese', '我在学中文', 'мен кытай тилин үйрөнүп жатам', 'я учу китайский', 'j apprends le chinois'), { pronunciation: 'wo3 zai4 xue2 zhong1 wen2' }),
                phrase('你好吗？', meanings('how are you?', '你好吗？', 'кандайсың?', 'как дела?', 'comment ca va ?'), { pronunciation: 'ni3 hao3 ma' })
            ]),
            category('chinese-useful-phrases', starterLabel.usefulPhrases, [
                phrase('请再说一遍', meanings('please say it again', '请再说一遍', 'дагы бир айтсаңыз', 'повторите еще раз', 'dites-le encore une fois'), { pronunciation: 'qing3 zai4 shuo1 yi2 bian4' }),
                phrase('我不明白', meanings('I do not understand', '我不明白', 'мен түшүнбөйм', 'я не понимаю', 'je ne comprends pas'), { pronunciation: 'wo3 bu4 ming2 bai2' }),
                phrase('这是什么？', meanings('what is this?', '这是什么？', 'бул эмне?', 'что это?', 'qu est-ce que c est ?'), { pronunciation: 'zhe4 shi4 shen2 me' }),
                phrase('请帮我', meanings('please help me', '请帮我', 'мага жардам бериңиз', 'помогите мне', 'aidez-moi'), { pronunciation: 'qing3 bang1 wo3' }),
                phrase('谢谢你', meanings('thank you', '谢谢你', 'рахмат', 'спасибо тебе', 'merci a toi'), { pronunciation: 'xie4 xie ni3' }),
                phrase('我很好', meanings('I am fine', '我很好', 'мен жакшымын', 'у меня все хорошо', 'je vais bien'), { pronunciation: 'wo3 hen3 hao3' })
            ]),
            category('chinese-feelings', starterLabel.feelings, [
                phrase('我很高兴', meanings('I am happy', '我很高兴', 'мен бактылуумун', 'я счастлив', 'je suis content'), { pronunciation: 'wo3 hen3 gao1 xing4' }),
                phrase('我累了', meanings('I am tired', '我累了', 'мен чарчадым', 'я устал', 'je suis fatigue'), { pronunciation: 'wo3 lei4 le' }),
                phrase('我准备好了', meanings('I am ready', '我准备好了', 'мен даярмын', 'я готов', 'je suis pret'), { pronunciation: 'wo3 zhun3 bei4 hao3 le' }),
                phrase('这个很容易', meanings('this is easy', '这个很容易', 'бул оңой', 'это легко', 'c est facile'), { pronunciation: 'zhe4 ge hen3 rong2 yi4' }),
                phrase('这个很难', meanings('this is difficult', '这个很难', 'бул кыйын', 'это трудно', 'c est difficile'), { pronunciation: 'zhe4 ge hen3 nan2' }),
                phrase('我很紧张', meanings('I am nervous', '我很紧张', 'мен тынчсызданып жатам', 'я нервничаю', 'je suis nerveux'), { pronunciation: 'wo3 hen3 jin3 zhang1' })
            ]),
            category('chinese-help-phrases', starterLabel.helpPhrases, [
                phrase('请再说一次', meanings('please say it again', '请再说一次', 'кайра айтып бериңизчи', 'скажите еще раз, пожалуйста', 'dites-le encore une fois, s il vous plait'), { pronunciation: 'qing3 zai4 shuo1 yi2 ci4' }),
                phrase('请说慢一点', meanings('please speak slowly', '请说慢一点', 'жай сүйлөңүзчү', 'говорите медленнее, пожалуйста', 'parlez plus lentement, s il vous plait'), { pronunciation: 'qing3 shuo1 man4 yi4 dian3' }),
                phrase('这是什么意思？', meanings('what does this mean?', '这是什么意思？', 'бул эмнени билдирет?', 'что это значит?', 'qu est-ce que cela veut dire ?'), { pronunciation: 'zhe4 shi4 shen2 me yi4 si' }),
                phrase('我需要帮助', meanings('I need help', '我需要帮助', 'мага жардам керек', 'мне нужна помощь', 'j ai besoin d aide'), { pronunciation: 'wo3 xu1 yao4 bang1 zhu4' }),
                phrase('教室在哪里？', meanings('where is the classroom?', '教室在哪里？', 'класс кайда?', 'где класс?', 'ou est la salle de classe ?'), { pronunciation: 'jiao4 shi4 zai4 na3 li3' }),
                phrase('我可以问问题吗？', meanings('can I ask a question?', '我可以问问题吗？', 'суроо берсем болобу?', 'можно задать вопрос?', 'puis-je poser une question ?'), { pronunciation: 'wo3 ke3 yi3 wen4 wen4 ti2 ma' })
            ]),
            category('chinese-travel-phrases', starterLabel.travelPhrases, [
                phrase('车站在哪里？', meanings('where is the station?', '车站在哪里？', 'бекет кайда?', 'где станция?', 'ou est la gare ?'), { pronunciation: 'che1 zhan4 zai4 na3 li3' }),
                phrase('我需要一张票', meanings('I need a ticket', '我需要一张票', 'мага билет керек', 'мне нужен билет', 'j ai besoin d un billet'), { pronunciation: 'wo3 xu1 yao4 yi4 zhang1 piao4' }),
                phrase('这个多少钱？', meanings('how much is this?', '这个多少钱？', 'бул канча турат?', 'сколько это стоит?', 'combien ca coute ?'), { pronunciation: 'zhe4 ge duo1 shao3 qian2' }),
                phrase('我要去旅馆', meanings('I am going to the hotel', '我要去旅馆', 'мейманканага бара жатам', 'я иду в гостиницу', 'je vais a l hotel'), { pronunciation: 'wo3 yao4 qu4 lu:3 guan3' }),
                phrase('请告诉我路', meanings('please show me the way', '请告诉我路', 'жолду көрсөтүңүзчү', 'покажите мне дорогу', 'montrez-moi le chemin'), { pronunciation: 'qing3 gao4 su4 wo3 lu4' }),
                phrase('我迷路了', meanings('I am lost', '我迷路了', 'адашып калдым', 'я потерялся', 'je suis perdu'), { pronunciation: 'wo3 mi2 lu4 le' })
            ]),
            category('chinese-food-phrases', starterLabel.foodPhrases, [
                phrase('我想喝茶', meanings('I would like tea', '我想喝茶', 'чай каалайм', 'я хочу чай', 'je voudrais du the'), { pronunciation: 'wo3 xiang3 he1 cha2' }),
                phrase('可以给我水吗？', meanings('can I have water?', '可以给我水吗？', 'суу бересизби?', 'можно мне воды?', 'puis-je avoir de l eau ?'), { pronunciation: 'ke3 yi3 gei3 wo3 shui3 ma' }),
                phrase('这个很好吃', meanings('this is delicious', '这个很好吃', 'бул даамдуу', 'это вкусно', 'c est delicieux'), { pronunciation: 'zhe4 ge hen3 hao3 chi1' }),
                phrase('我不吃肉', meanings('I do not eat meat', '我不吃肉', 'эт жебейм', 'я не ем мясо', 'je ne mange pas de viande'), { pronunciation: 'wo3 bu4 chi1 rou4' }),
                phrase('请给我账单', meanings('the bill, please', '请给我账单', 'эсепти бериңизчи', 'счет, пожалуйста', 'l addition, s il vous plait'), { pronunciation: 'qing3 gei3 wo3 zhang4 dan1' }),
                phrase('我饿了', meanings('I am hungry', '我饿了', 'ачкамын', 'я голоден', 'j ai faim'), { pronunciation: 'wo3 e4 le' })
            ]),
            category('chinese-shopping-phrases', starterLabel.shoppingPhrases, [
                phrase('我想买这个', meanings('I want to buy this', '我想买这个', 'мен муну сатып алгым келет', 'я хочу купить это', 'je veux acheter ceci'), { pronunciation: 'wo3 xiang3 mai3 zhe4 ge' }),
                phrase('你们有小一点的吗？', meanings('do you have a smaller size?', '你们有小一点的吗？', 'кичине өлчөмү барбы?', 'у вас есть размер поменьше?', 'avez-vous une taille plus petite ?'), { pronunciation: 'ni3 men you3 xiao3 yi4 dian3 de ma' }),
                phrase('我在哪里付款？', meanings('where can I pay?', '我在哪里付款？', 'кайдан төлөйм?', 'где я могу заплатить?', 'ou puis-je payer ?'), { pronunciation: 'wo3 zai4 na3 li3 fu4 kuan3' }),
                phrase('我只是看看', meanings('I am just looking', '我只是看看', 'мен жөн гана көрүп жатам', 'я просто смотрю', 'je regarde seulement'), { pronunciation: 'wo3 zhi3 shi4 kan4 kan' }),
                phrase('这个太贵了', meanings('it is too expensive', '这个太贵了', 'бул өтө кымбат', 'это слишком дорого', 'c est trop cher'), { pronunciation: 'zhe4 ge tai4 gui4 le' }),
                phrase('我可以刷卡吗？', meanings('can I use a card?', '我可以刷卡吗？', 'карта колдонсом болобу?', 'можно оплатить картой?', 'puis-je utiliser une carte ?'), { pronunciation: 'wo3 ke3 yi3 shua1 ka3 ma' })
            ]),
            category('chinese-weather-phrases', starterLabel.weatherPhrases, [
                phrase('今天天气晴朗', meanings('it is sunny today', '今天天气晴朗', 'бүгүн күн ачык', 'сегодня солнечно', 'il fait beau aujourd hui'), { pronunciation: 'jin1 tian1 tian1 qi4 qing2 lang3' }),
                phrase('下雨了', meanings('it is raining', '下雨了', 'жамгыр жаап жатат', 'идет дождь', 'il pleut'), { pronunciation: 'xia4 yu3 le' }),
                phrase('外面很冷', meanings('it is cold outside', '外面很冷', 'тышта суук', 'на улице холодно', 'il fait froid dehors'), { pronunciation: 'wai4 mian4 hen3 leng3' }),
                phrase('天气很热', meanings('it is very hot', '天气很热', 'аба аябай ысык', 'очень жарко', 'il fait tres chaud'), { pronunciation: 'tian1 qi4 hen3 re4' }),
                phrase('我需要一件外套', meanings('I need a jacket', '我需要一件外套', 'мага күрмө керек', 'мне нужна куртка', 'j ai besoin d une veste'), { pronunciation: 'wo3 xu1 yao4 yi2 jian4 wai4 tao4' }),
                phrase('风很大', meanings('the wind is strong', '风很大', 'шамал катуу', 'ветер сильный', 'le vent est fort'), { pronunciation: 'feng1 hen3 da4' })
            ]),
            category('chinese-daily-phrases', starterLabel.dailyPhrases, [
                phrase('我起得很早', meanings('I wake up early', '我起得很早', 'мен эрте турам', 'я встаю рано', 'je me reveille tot'), { pronunciation: 'wo3 qi3 de hen3 zao3' }),
                phrase('我去学校', meanings('I go to school', '我去学校', 'мен мектепке барам', 'я иду в школу', 'je vais a l ecole'), { pronunciation: 'wo3 qu4 xue2 xiao4' }),
                phrase('我做作业', meanings('I do my homework', '我做作业', 'мен үй тапшырмамды жасайм', 'я делаю домашнее задание', 'je fais mes devoirs'), { pronunciation: 'wo3 zuo4 zuo4 ye4' }),
                phrase('我要回家', meanings('I am going home', '我要回家', 'мен үйгө бара жатам', 'я иду домой', 'je rentre a la maison'), { pronunciation: 'wo3 yao4 hui2 jia1' }),
                phrase('明天见', meanings('see you tomorrow', '明天见', 'эртең көрүшөбүз', 'увидимся завтра', 'a demain'), { pronunciation: 'ming2 tian1 jian4' }),
                phrase('晚安', meanings('good night', '晚安', 'кайырлуу түн', 'спокойной ночи', 'bonne nuit'), { pronunciation: 'wan3 an1' })
            ])
        ]
    }
};

const frenchContent = {
    speechLang: 'fr-FR',
    modes: {
        letters: [
            category('french-starter-letters', starterLabel.letters, [
                letter('A a', 'a', 'a', 'Ami', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { pronunciation: 'letter name ah, open front A sound' }),
                letter('B b', 'be', 'b', 'Bonjour', meanings('hello', '你好', 'салам', 'здравствуйте', 'bonjour'), { pronunciation: 'say bay for the letter name' }),
                letter('C c', 'ce', 's/k', 'Chat', meanings('cat', '猫', 'мышык', 'кот', 'chat'), { pronunciation: 'say suh for the letter name, c can sound like s or k' }),
                letter('E e', 'e', 'e', 'Ecole', meanings('school', '学校', 'мектеп', 'школа', 'ecole'), { pronunciation: 'say uh/eh depending on the word' }),
                letter('F f', 'effe', 'f', 'Famille', meanings('family', '家庭', 'үй-бүлө', 'семья', 'famille'), { pronunciation: 'say eff for the letter name' }),
                letter('R r', 'erre', 'r', 'Rue', meanings('street', '街道', 'көчө', 'улица', 'rue'), { pronunciation: 'French throat R, not English r' })
            ]),
            category('french-special-sounds', { en: 'Special Sounds', zh: '特殊发音', ky: 'Өзгөчө үндөр', ru: 'Особые звуки', fr: 'Sons speciaux' }, [
                letter('ou', 'ou', 'u', 'bonjour', meanings('hello', '你好', 'салам', 'здравствуйте', 'bonjour'), { pronunciation: 'say OO as in food' }),
                letter('on', 'on nasal', 'on', 'nom', meanings('name', '名字', 'аты', 'имя', 'nom'), { pronunciation: 'nasal sound, do not pronounce final n' }),
                letter('eu', 'eu', 'eu', 'bleu', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { pronunciation: 'rounded lips, similar to ö' }),
                letter('ch', 'che', 'sh', 'chat', meanings('cat', '猫', 'мышык', 'кот', 'chat'), { pronunciation: 'usually SH, not CH' }),
                letter('gn', 'gne', 'ny', 'montagne', meanings('mountain', '山', 'тоо', 'гора', 'montagne'), { pronunciation: 'like ny in canyon' })
            ])
        ],
        words: [
            category('french-starter-words', starterLabel.words, [
                word('bonjour', meanings('hello', '你好', 'салам', 'здравствуйте', 'bonjour'), { syllables: ['bon', 'jour'], sound: 'b', pronunciation: 'bohn-ZHOOR' }),
                word('eau', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['eau'], sound: 'o', pronunciation: 'single O sound' }),
                word('livre', meanings('book', '书', 'китеп', 'книга', 'livre'), { syllables: ['li', 'vre'], sound: 'l', pronunciation: 'LEEVR' }),
                word('ecole', meanings('school', '学校', 'мектеп', 'школа', 'ecole'), { syllables: ['e', 'cole'], sound: 'e', pronunciation: 'ay-KOL' }),
                word('ami', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { syllables: ['a', 'mi'], sound: 'a', pronunciation: 'a-MEE' }),
                word('pomme', meanings('apple', '苹果', 'алма', 'яблоко', 'pomme'), { syllables: ['pom', 'me'], sound: 'p', pronunciation: 'POM' })
            ]),
            category('french-everyday-words', starterLabel.everydayWords, [
                word('maison', meanings('house', '房子', 'үй', 'дом', 'maison'), { syllables: ['mai', 'son'], sound: 'm', pronunciation: 'meh-ZOHN with nasal end' }),
                word('soleil', meanings('sun', '太阳', 'күн', 'солнце', 'soleil'), { syllables: ['so', 'leil'], sound: 's', pronunciation: 'soh-LAY' }),
                word('eau', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['eau'], sound: 'o', pronunciation: 'single O sound' }),
                word('pain', meanings('bread', '面包', 'нан', 'хлеб', 'pain'), { syllables: ['pain'], sound: 'p', pronunciation: 'nasal vowel, no final n' }),
                word('ami', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { syllables: ['a', 'mi'], sound: 'a', pronunciation: 'a-MEE' }),
                word('famille', meanings('family', '家庭', 'үй-бүлө', 'семья', 'famille'), { syllables: ['fa', 'mille'], sound: 'f', pronunciation: 'fa-MEEY' })
            ]),
            category('french-classroom-words', starterLabel.classroomWords, [
                word('stylo', meanings('pen', '钢笔', 'калем', 'ручка', 'stylo'), { syllables: ['sty', 'lo'], sound: 'st', pronunciation: 'stee-LO' }),
                word('tableau', meanings('board', '黑板', 'такта', 'доска', 'tableau'), { syllables: ['ta', 'bleau'], sound: 't', pronunciation: 'ta-BLO' }),
                word('lecon', meanings('lesson', '课程', 'сабак', 'урок', 'lecon'), { syllables: ['le', 'con'], sound: 'l', pronunciation: 'luh-SON with nasal end' }),
                word('question', meanings('question', '问题', 'суроо', 'вопрос', 'question'), { syllables: ['ques', 'tion'], sound: 'k', pronunciation: 'kes-TYON' }),
                word('reponse', meanings('answer', '答案', 'жооп', 'ответ', 'reponse'), { syllables: ['re', 'ponse'], sound: 'r', pronunciation: 'ray-PONS' }),
                word('professeur', meanings('teacher', '老师', 'мугалим', 'учитель', 'professeur'), { syllables: ['pro', 'fes', 'seur'], sound: 'pr', pronunciation: 'pro-feh-SUR' })
            ]),
            category('french-family-words', starterLabel.familyWords, [
                word('mere', meanings('mother', '妈妈', 'эне', 'мать', 'mere'), { syllables: ['mere'], sound: 'm', pronunciation: 'mehr' }),
                word('pere', meanings('father', '爸爸', 'ата', 'отец', 'pere'), { syllables: ['pere'], sound: 'p', pronunciation: 'pehr' }),
                word('frere', meanings('brother', '哥哥；弟弟', 'ага; ини', 'брат', 'frere'), { syllables: ['frere'], sound: 'fr', pronunciation: 'frehr' }),
                word('soeur', meanings('sister', '姐姐；妹妹', 'эже; карындаш', 'сестра', 'soeur'), { syllables: ['soeur'], sound: 's', pronunciation: 'rounded vowel, like suh(r)' }),
                word('bebe', meanings('baby', '婴儿', 'бөбөк', 'ребенок', 'bebe'), { syllables: ['be', 'be'], sound: 'b', pronunciation: 'bay-BAY' }),
                word('parents', meanings('parents', '父母', 'ата-эне', 'родители', 'parents'), { syllables: ['pa', 'rents'], sound: 'p', pronunciation: 'pa-RAHN' })
            ]),
            category('french-food-words', starterLabel.foodWords, [
                word('pain', meanings('bread', '面包', 'нан', 'хлеб', 'pain'), { syllables: ['pain'], sound: 'p', pronunciation: 'nasal vowel, no n sound' }),
                word('lait', meanings('milk', '牛奶', 'сүт', 'молоко', 'lait'), { syllables: ['lait'], sound: 'l', pronunciation: 'leh' }),
                word('the', meanings('tea', '茶', 'чай', 'чай', 'the'), { syllables: ['the'], sound: 't', pronunciation: 'tay' }),
                word('riz', meanings('rice', '米饭', 'күрүч', 'рис', 'riz'), { syllables: ['riz'], sound: 'r', pronunciation: 'ree' }),
                word('soupe', meanings('soup', '汤', 'шорпо', 'суп', 'soupe'), { syllables: ['soupe'], sound: 's', pronunciation: 'soop' }),
                word('jus', meanings('juice', '果汁', 'шире', 'сок', 'jus'), { syllables: ['jus'], sound: 'j', pronunciation: 'zhu' })
            ]),
            category('french-travel-words', starterLabel.travelWords, [
                word('gare', meanings('station', '车站', 'бекет', 'вокзал', 'gare'), { syllables: ['gare'], sound: 'g', pronunciation: 'gahr' }),
                word('train', meanings('train', '火车', 'поезд', 'поезд', 'train'), { syllables: ['train'], sound: 'tr', pronunciation: 'nasal vowel, no final n' }),
                word('billet', meanings('ticket', '票', 'билет', 'билет', 'billet'), { syllables: ['bi', 'llet'], sound: 'b', pronunciation: 'bee-YAY' }),
                word('hotel', meanings('hotel', '旅馆', 'мейманкана', 'отель', 'hotel'), { syllables: ['ho', 'tel'], sound: 'h', pronunciation: 'oh-TEL' }),
                word('rue', meanings('street', '街道', 'көчө', 'улица', 'rue'), { syllables: ['rue'], sound: 'r', pronunciation: 'front rounded U sound' }),
                word('aeroport', meanings('airport', '机场', 'аэропорт', 'аэропорт', 'aeroport'), { syllables: ['a', 'e', 'ro', 'port'], sound: 'a', pronunciation: 'ay-ro-POR' })
            ]),
            category('french-colors-words', starterLabel.colorsWords, [
                word('rouge', meanings('red', '红色', 'кызыл', 'красный', 'rouge'), { syllables: ['rouge'], sound: 'r', pronunciation: 'roozh' }),
                word('bleu', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { syllables: ['bleu'], sound: 'bl', pronunciation: 'rounded vowel like bluh' }),
                word('vert', meanings('green', '绿色', 'жашыл', 'зеленый', 'vert'), { syllables: ['vert'], sound: 'v', pronunciation: 'vair' }),
                word('noir', meanings('black', '黑色', 'кара', 'черный', 'noir'), { syllables: ['noir'], sound: 'n', pronunciation: 'nwahr' }),
                word('blanc', meanings('white', '白色', 'ак', 'белый', 'blanc'), { syllables: ['blanc'], sound: 'bl', pronunciation: 'nasal vowel, no final c' }),
                word('jaune', meanings('yellow', '黄色', 'сары', 'желтый', 'jaune'), { syllables: ['jaune'], sound: 'j', pronunciation: 'zhohn' })
            ]),
            category('french-body-words', starterLabel.bodyWords, [
                word('tete', meanings('head', '头', 'баш', 'голова', 'tete'), { syllables: ['tete'], sound: 't', pronunciation: 'teht' }),
                word('main', meanings('hand', '手', 'кол', 'рука', 'main'), { syllables: ['main'], sound: 'm', pronunciation: 'nasal vowel, no n' }),
                word('oeil', meanings('eye', '眼睛', 'көз', 'глаз', 'oeil'), { syllables: ['oeil'], sound: 'oe', pronunciation: 'roughly uh-y' }),
                word('oreille', meanings('ear', '耳朵', 'кулак', 'ухо', 'oreille'), { syllables: ['o', 'reille'], sound: 'o', pronunciation: 'oh-RAY' }),
                word('bouche', meanings('mouth', '嘴巴', 'ооз', 'рот', 'bouche'), { syllables: ['bouche'], sound: 'b', pronunciation: 'boosh' }),
                word('pied', meanings('foot', '脚', 'бут', 'ступня', 'pied'), { syllables: ['pied'], sound: 'p', pronunciation: 'pyay' })
            ]),
            category('french-action-words', starterLabel.actionWords, [
                word('lire', meanings('read', '读', 'окуу', 'читать', 'lire'), { syllables: ['lire'], sound: 'l', pronunciation: 'leer' }),
                word('ecrire', meanings('write', '写', 'жаз', 'писать', 'ecrire'), { syllables: ['e', 'crire'], sound: 'e', pronunciation: 'ay-KREER' }),
                word('parler', meanings('speak', '说', 'сүйлө', 'говорить', 'parler'), { syllables: ['par', 'ler'], sound: 'p', pronunciation: 'par-LAY' }),
                word('ecouter', meanings('listen', '听', 'ук', 'слушать', 'ecouter'), { syllables: ['e', 'cou', 'ter'], sound: 'e', pronunciation: 'ay-koo-TAY' }),
                word('marcher', meanings('walk', '走', 'бас', 'ходить', 'marcher'), { syllables: ['mar', 'cher'], sound: 'm', pronunciation: 'mar-SHAY' }),
                word('courir', meanings('run', '跑', 'чурка', 'бежать', 'courir'), { syllables: ['cou', 'rir'], sound: 'k', pronunciation: 'koo-REER' })
            ])
        ],
        phrases: [
            category('french-starter-phrases', starterLabel.phrases, [
                phrase('Bonjour', meanings('hello', '你好', 'салам', 'здравствуйте', 'bonjour'), { pronunciation: 'bohn-ZHOOR' }),
                phrase('Comment ca va ?', meanings('how are you?', '你好吗？', 'кандайсың?', 'как дела?', 'comment ca va ?'), { pronunciation: 'ko-MAHN sa va' }),
                phrase('Merci', meanings('thank you', '谢谢', 'рахмат', 'спасибо', 'merci'), { pronunciation: 'mehr-SEE' }),
                phrase('S il vous plait', meanings('please', '请', 'сураныч', 'пожалуйста', 's il vous plait'), { pronunciation: 'seel voo PLEH' }),
                phrase('Je m appelle...', meanings('my name is...', '我叫……', 'менин атым...', 'меня зовут...', 'je m appelle...'), { pronunciation: 'zhuh ma-PEL...' }),
                phrase('J apprends le francais', meanings('I am learning French', '我在学法语', 'мен француз тилин үйрөнүп жатам', 'я учу французский', 'j apprends le francais'), { pronunciation: 'zhap-RAHN luh fran-SEH' })
            ]),
            category('french-classroom-phrases', starterLabel.classroomPhrases, [
                phrase('Repetez, s il vous plait', meanings('please repeat', '请重复', 'кайталаңызчы', 'повторите, пожалуйста', 'repetez, s il vous plait'), { pronunciation: 'ray-pay-TAY seel voo PLEH' }),
                phrase('Je ne comprends pas', meanings('I do not understand', '我不明白', 'мен түшүнбөйм', 'я не понимаю', 'je ne comprends pas'), { pronunciation: 'zhuh nuh kom-PRAHN pah' }),
                phrase('Comment dit-on cela ?', meanings('how do you say this?', '这个怎么说？', 'муну кантип айтасыз?', 'как это сказать?', 'comment dit-on cela ?'), { pronunciation: 'ko-MAHN dee-TON suh-LAH' }),
                phrase('Pouvez-vous m aider ?', meanings('can you help me?', '你能帮我吗？', 'мага жардам бересизби?', 'вы можете мне помочь?', 'pouvez-vous m aider ?'), { pronunciation: 'poo-vay voo may-DAY' }),
                phrase('Ouvre ton livre', meanings('open your book', '打开书', 'китебиңди ач', 'открой книгу', 'ouvre ton livre'), { pronunciation: 'OOVR ton leevr' }),
                phrase('Ecoute bien', meanings('listen carefully', '认真听', 'жакшылап ук', 'слушай внимательно', 'ecoute bien'), { pronunciation: 'ay-KOOT byen' })
            ]),
            category('french-feelings', starterLabel.feelings, [
                phrase('Je suis content', meanings('I am happy', '我很高兴', 'мен бактылуумун', 'я счастлив', 'je suis content'), { pronunciation: 'zhuh swee kon-TAHN' }),
                phrase('Je suis fatigue', meanings('I am tired', '我累了', 'мен чарчадым', 'я устал', 'je suis fatigue'), { pronunciation: 'zhuh swee fa-tee-GAY' }),
                phrase('Je suis pret', meanings('I am ready', '我准备好了', 'мен даярмын', 'я готов', 'je suis pret'), { pronunciation: 'zhuh swee PREH' }),
                phrase('C est facile', meanings('this is easy', '这很简单', 'бул оңой', 'это легко', 'c est facile'), { pronunciation: 'say final i like eel' }),
                phrase('C est difficile', meanings('this is difficult', '这很难', 'бул кыйын', 'это трудно', 'c est difficile'), { pronunciation: 'dee-fee-SEEL' }),
                phrase('Je suis calme', meanings('I am calm', '我很平静', 'мен тынчмын', 'я спокоен', 'je suis calme'), { pronunciation: 'zhuh swee KALM' })
            ]),
            category('french-help-phrases', starterLabel.helpPhrases, [
                phrase('Pouvez-vous repeter ?', meanings('can you repeat that?', '你能再说一遍吗？', 'кайталап бересизби?', 'можете повторить?', 'pouvez-vous repeter ?'), { pronunciation: 'poo-vay voo ray-pay-TAY' }),
                phrase('Parlez lentement, s il vous plait', meanings('please speak slowly', '请说慢一点', 'жай сүйлөңүзчү', 'говорите медленно, пожалуйста', 'parlez lentement, s il vous plait'), { pronunciation: 'par-LAY lahn-te-MAHN' }),
                phrase('Qu est-ce que cela veut dire ?', meanings('what does this mean?', '这是什么意思？', 'бул эмнени билдирет?', 'что это значит?', 'qu est-ce que cela veut dire ?'), { pronunciation: 'kehss kuh suh-LAH vuh deer' }),
                phrase('J ai besoin d aide', meanings('I need help', '我需要帮助', 'мага жардам керек', 'мне нужна помощь', 'j ai besoin d aide'), { pronunciation: 'zhay buh-ZWAN ded' }),
                phrase('Ou est la salle de classe ?', meanings('where is the classroom?', '教室在哪里？', 'класс кайда?', 'где класс?', 'ou est la salle de classe ?'), { pronunciation: 'oo eh la sal duh klas' }),
                phrase('Puis-je poser une question ?', meanings('can I ask a question?', '我可以问问题吗？', 'суроо берсем болобу?', 'можно задать вопрос?', 'puis-je poser une question ?'), { pronunciation: 'pweezh puh-ZAY uhn kes-TYON' })
            ]),
            category('french-travel-phrases', starterLabel.travelPhrases, [
                phrase('Ou est la gare ?', meanings('where is the station?', '车站在哪里？', 'бекет кайда?', 'где вокзал?', 'ou est la gare ?'), { pronunciation: 'oo eh la gahr' }),
                phrase('J ai besoin d un billet', meanings('I need a ticket', '我需要一张票', 'мага билет керек', 'мне нужен билет', 'j ai besoin d un billet'), { pronunciation: 'zhay buh-ZWAN dun bee-YAY' }),
                phrase('Combien ca coute ?', meanings('how much is this?', '这个多少钱？', 'бул канча турат?', 'сколько это стоит?', 'combien ca coute ?'), { pronunciation: 'kom-BYEN sa koot' }),
                phrase('Je vais a l hotel', meanings('I am going to the hotel', '我要去旅馆', 'мейманканага бара жатам', 'я иду в отель', 'je vais a l hotel'), { pronunciation: 'zhuh vay ah lo-TEL' }),
                phrase('Montrez-moi le chemin', meanings('please show me the way', '请告诉我路', 'жолду көрсөтүңүзчү', 'покажите мне дорогу', 'montrez-moi le chemin'), { pronunciation: 'mohn-TRAY mwa luh shuh-MAN' }),
                phrase('Je suis perdu', meanings('I am lost', '我迷路了', 'адашып калдым', 'я потерялся', 'je suis perdu'), { pronunciation: 'zhuh swee pair-DYOO' })
            ]),
            category('french-food-phrases', starterLabel.foodPhrases, [
                phrase('Je voudrais du the', meanings('I would like tea', '我想喝茶', 'чай каалайм', 'я хотел бы чай', 'je voudrais du the'), { pronunciation: 'zhuh voo-DRAY dyu tay' }),
                phrase('Puis-je avoir de l eau ?', meanings('can I have water?', '可以给我水吗？', 'суу бересизби?', 'можно мне воды?', 'puis-je avoir de l eau ?'), { pronunciation: 'pweezh ah-VWAR duh loh' }),
                phrase('C est delicieux', meanings('this is delicious', '这个很好吃', 'бул даамдуу', 'это вкусно', 'c est delicieux'), { pronunciation: 'say deh-lee-SYUH' }),
                phrase('Je ne mange pas de viande', meanings('I do not eat meat', '我不吃肉', 'эт жебейм', 'я не ем мясо', 'je ne mange pas de viande'), { pronunciation: 'zhuh nuh mahnzh pah duh vyand' }),
                phrase('L addition, s il vous plait', meanings('the bill, please', '请给我账单', 'эсепти бериңизчи', 'счет, пожалуйста', 'l addition, s il vous plait'), { pronunciation: 'la-dee-SYON seel voo PLEH' }),
                phrase('J ai faim', meanings('I am hungry', '我饿了', 'ачкамын', 'я голоден', 'j ai faim'), { pronunciation: 'zhay fan' })
            ]),
            category('french-shopping-phrases', starterLabel.shoppingPhrases, [
                phrase('Je veux acheter ceci', meanings('I want to buy this', '我想买这个', 'мен муну сатып алгым келет', 'я хочу купить это', 'je veux acheter ceci'), { pronunciation: 'zhuh vuh ash-tay suh-SEE' }),
                phrase('Avez-vous une taille plus petite ?', meanings('do you have a smaller size?', '你们有小一点的吗？', 'кичине өлчөмү барбы?', 'у вас есть размер поменьше?', 'avez-vous une taille plus petite ?'), { pronunciation: 'ah-vay voo uhn tay-yuh ply peh-TEET' }),
                phrase('Ou puis-je payer ?', meanings('where can I pay?', '我在哪里付款？', 'кайдан төлөйм?', 'где я могу заплатить?', 'ou puis-je payer ?'), { pronunciation: 'oo pweezh pay-YAY' }),
                phrase('Je regarde seulement', meanings('I am just looking', '我只是看看', 'мен жөн гана көрүп жатам', 'я просто смотрю', 'je regarde seulement'), { pronunciation: 'zhuh ruh-GAHRD suhl-mahn' }),
                phrase('C est trop cher', meanings('it is too expensive', '这个太贵了', 'бул өтө кымбат', 'это слишком дорого', 'c est trop cher'), { pronunciation: 'say troh shair' }),
                phrase('Puis-je utiliser une carte ?', meanings('can I use a card?', '我可以刷卡吗？', 'карта колдонсом болобу?', 'можно оплатить картой?', 'puis-je utiliser une carte ?'), { pronunciation: 'pweezh y-tee-lee-ZAY uhn kart' })
            ]),
            category('french-weather-phrases', starterLabel.weatherPhrases, [
                phrase('Il fait beau aujourd hui', meanings('it is sunny today', '今天天气晴朗', 'бүгүн күн ачык', 'сегодня солнечно', 'il fait beau aujourd hui'), { pronunciation: 'eel fay boh oh-zhoor-DWEE' }),
                phrase('Il pleut', meanings('it is raining', '下雨了', 'жамгыр жаап жатат', 'идет дождь', 'il pleut'), { pronunciation: 'eel pluh' }),
                phrase('Il fait froid dehors', meanings('it is cold outside', '外面很冷', 'тышта суук', 'на улице холодно', 'il fait froid dehors'), { pronunciation: 'eel fay frwah duh-OR' }),
                phrase('Il fait tres chaud', meanings('it is very hot', '天气很热', 'аба аябай ысык', 'очень жарко', 'il fait tres chaud'), { pronunciation: 'eel fay tray sho' }),
                phrase('J ai besoin d une veste', meanings('I need a jacket', '我需要一件外套', 'мага күрмө керек', 'мне нужна куртка', 'j ai besoin d une veste'), { pronunciation: 'zhay buh-ZWAN dune vest' }),
                phrase('Le vent est fort', meanings('the wind is strong', '风很大', 'шамал катуу', 'ветер сильный', 'le vent est fort'), { pronunciation: 'luh vahn eh for' })
            ]),
            category('french-daily-phrases', starterLabel.dailyPhrases, [
                phrase('Je me reveille tot', meanings('I wake up early', '我起得很早', 'мен эрте турам', 'я встаю рано', 'je me reveille tot'), { pronunciation: 'zhuh muh ray-VAY toh' }),
                phrase('Je vais a l ecole', meanings('I go to school', '我去学校', 'мен мектепке барам', 'я иду в школу', 'je vais a l ecole'), { pronunciation: 'zhuh vay ah lay-KOL' }),
                phrase('Je fais mes devoirs', meanings('I do my homework', '我做作业', 'мен үй тапшырмамды жасайм', 'я делаю домашнее задание', 'je fais mes devoirs'), { pronunciation: 'zhuh fay may duh-VWAR' }),
                phrase('Je rentre a la maison', meanings('I am going home', '我要回家', 'мен үйгө бара жатам', 'я иду домой', 'je rentre a la maison'), { pronunciation: 'zhuh rahntr ah la meh-ZOHN' }),
                phrase('A demain', meanings('see you tomorrow', '明天见', 'эртең көрүшөбүз', 'увидимся завтра', 'a demain'), { pronunciation: 'ah duh-MAN' }),
                phrase('Bonne nuit', meanings('good night', '晚安', 'кайырлуу түн', 'спокойной ночи', 'bonne nuit'), { pronunciation: 'bun nwee' })
            ])
        ]
    }
};

export const TARGET_LANGUAGES = [
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
    { code: 'ky', label: 'Кыргызча' },
    { code: 'zh', label: '中文' },
    { code: 'fr', label: 'Francais' }
];

export const learningContent = {
    ru: russianContent,
    en: englishContent,
    ky: kyrgyzContent,
    zh: chineseContent,
    fr: frenchContent
};

export function getCategoryItems(targetLanguage, mode, key) {
    const categories = learningContent[targetLanguage]?.modes?.[mode] || [];
    return categories.find(categoryItem => categoryItem.key === key)?.items || [];
}
