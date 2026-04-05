const meanings = (en, zh, ky, ru, fr) => ({ en, zh, ky, ru, fr });

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

const letter = (l, n, s, w, glosses, extras = {}) => ({
    l,
    n,
    s,
    w,
    meanings: glosses,
    kind: 'letter',
    ...extras
});

const category = (key, labels, items) => ({ key, labels, items });

const JOB_CATEGORY_LABEL = {
    en: 'Jobs',
    zh: '职业词汇',
    ky: 'Кесиптер',
    ru: 'Профессии',
    fr: 'Metiers'
};

const JOB_WORDS = [
    { en: 'teacher', zh: '老师', ky: 'мугалим', ru: 'учитель', fr: 'professeur' },
    { en: 'doctor', zh: '医生', ky: 'дарыгер', ru: 'врач', fr: 'medecin' },
    { en: 'nurse', zh: '护士', ky: 'медайым', ru: 'медсестра', fr: 'infirmiere' },
    { en: 'driver', zh: '司机', ky: 'айдоочу', ru: 'водитель', fr: 'chauffeur' },
    { en: 'cook', zh: '厨师', ky: 'ашпозчу', ru: 'повар', fr: 'cuisinier' },
    { en: 'police officer', zh: '警察', ky: 'милиционер', ru: 'полицейский', fr: 'policier' },
    { en: 'firefighter', zh: '消防员', ky: 'орт очуруучу', ru: 'пожарный', fr: 'pompier' },
    { en: 'farmer', zh: '农民', ky: 'дыйкан', ru: 'фермер', fr: 'agriculteur' },
    { en: 'builder', zh: '建筑工人', ky: 'куруучу', ru: 'строитель', fr: 'constructeur' },
    { en: 'engineer', zh: '工程师', ky: 'инженер', ru: 'инженер', fr: 'ingenieur' },
    { en: 'artist', zh: '艺术家', ky: 'суротчу', ru: 'художник', fr: 'artiste' },
    { en: 'singer', zh: '歌手', ky: 'ырчы', ru: 'певец', fr: 'chanteur' },
    { en: 'dancer', zh: '舞蹈演员', ky: 'бийчи', ru: 'танцор', fr: 'danseur' },
    { en: 'pilot', zh: '飞行员', ky: 'учкуч', ru: 'пилот', fr: 'pilote' },
    { en: 'mechanic', zh: '机械师', ky: 'механик', ru: 'механик', fr: 'mecanicien' },
    { en: 'baker', zh: '面包师', ky: 'наабайчы', ru: 'пекарь', fr: 'boulanger' },
    { en: 'waiter', zh: '服务员', ky: 'официант', ru: 'официант', fr: 'serveur' },
    { en: 'cashier', zh: '收银员', ky: 'кассир', ru: 'кассир', fr: 'caissier' },
    { en: 'dentist', zh: '牙医', ky: 'тиш доктур', ru: 'стоматолог', fr: 'dentiste' },
    { en: 'actor', zh: '演员', ky: 'актёр', ru: 'актер', fr: 'acteur' },
    { en: 'musician', zh: '音乐家', ky: 'музыкант', ru: 'музыкант', fr: 'musicien' },
    { en: 'scientist', zh: '科学家', ky: 'илимпоз', ru: 'ученый', fr: 'scientifique' },
    { en: 'programmer', zh: '程序员', ky: 'программист', ru: 'программист', fr: 'programmeur' },
    { en: 'photographer', zh: '摄影师', ky: 'суротчу', ru: 'фотограф', fr: 'photographe' },
    { en: 'tailor', zh: '裁缝', ky: 'тигуучу', ru: 'портной', fr: 'tailleur' },
    { en: 'cleaner', zh: '清洁工', ky: 'тазалоочу', ru: 'уборщик', fr: 'nettoyeur' },
    { en: 'painter', zh: '油漆工', ky: 'боёкчу', ru: 'маляр', fr: 'peintre' },
    { en: 'translator', zh: '翻译员', ky: 'котормочу', ru: 'переводчик', fr: 'traducteur' },
    { en: 'journalist', zh: '记者', ky: 'журналист', ru: 'журналист', fr: 'journaliste' },
    { en: 'librarian', zh: '图书管理员', ky: 'китепканачы', ru: 'библиотекарь', fr: 'bibliothecaire' }
];

const createJobsCategory = (languageKey, categoryKeyPrefix) => category(
    `${categoryKeyPrefix}-jobs-words`,
    JOB_CATEGORY_LABEL,
    JOB_WORDS.map(job => word(
        job[languageKey],
        meanings(job.en, job.zh, job.ky, job.ru, job.fr)
    ))
);

const createSharedWordCategory = (languageKey, categoryKey, labels, rows) => category(
    categoryKey,
    labels,
    rows.map(entry => word(
        entry[languageKey],
        meanings(entry.en, entry.zh, entry.ky, entry.ru, entry.fr),
        entry.extras?.[languageKey] || {}
    ))
);

const createSharedPhraseCategory = (languageKey, categoryKey, labels, rows) => category(
    categoryKey,
    labels,
    rows.map(entry => phrase(
        entry[languageKey],
        meanings(entry.en, entry.zh, entry.ky, entry.ru, entry.fr),
        entry.extras?.[languageKey] || {}
    ))
);

const NUMBERS_CATEGORY_LABEL = {
    en: 'Numbers',
    zh: '数字词汇',
    ky: 'Сандар',
    ru: 'Числа',
    fr: 'Nombres'
};

const SHAPES_CATEGORY_LABEL = {
    en: 'Shapes',
    zh: '形状词汇',
    ky: 'Формалар',
    ru: 'Фигуры',
    fr: 'Formes'
};

const IDIOMS_CATEGORY_LABEL = {
    en: 'Idioms',
    zh: '习语短语',
    ky: 'Идиомалар',
    ru: 'Идиомы',
    fr: 'Expressions'
};

const NUMBER_WORDS = [
    { en: 'zero', zh: '零', ky: 'нөл', ru: 'ноль', fr: 'zero' },
    { en: 'one', zh: '一', ky: 'бир', ru: 'один', fr: 'un' },
    { en: 'two', zh: '二', ky: 'эки', ru: 'два', fr: 'deux' },
    { en: 'three', zh: '三', ky: 'үч', ru: 'три', fr: 'trois' },
    { en: 'four', zh: '四', ky: 'төрт', ru: 'четыре', fr: 'quatre' },
    { en: 'five', zh: '五', ky: 'беш', ru: 'пять', fr: 'cinq' },
    { en: 'six', zh: '六', ky: 'алты', ru: 'шесть', fr: 'six' },
    { en: 'seven', zh: '七', ky: 'жети', ru: 'семь', fr: 'sept' },
    { en: 'eight', zh: '八', ky: 'сегиз', ru: 'восемь', fr: 'huit' },
    { en: 'nine', zh: '九', ky: 'тогуз', ru: 'девять', fr: 'neuf' },
    { en: 'ten', zh: '十', ky: 'он', ru: 'десять', fr: 'dix' },
    { en: 'eleven', zh: '十一', ky: 'он бир', ru: 'одиннадцать', fr: 'onze' },
    { en: 'twelve', zh: '十二', ky: 'он эки', ru: 'двенадцать', fr: 'douze' },
    { en: 'thirteen', zh: '十三', ky: 'он үч', ru: 'тринадцать', fr: 'treize' },
    { en: 'fourteen', zh: '十四', ky: 'он төрт', ru: 'четырнадцать', fr: 'quatorze' },
    { en: 'fifteen', zh: '十五', ky: 'он беш', ru: 'пятнадцать', fr: 'quinze' },
    { en: 'sixteen', zh: '十六', ky: 'он алты', ru: 'шестнадцать', fr: 'seize' },
    { en: 'seventeen', zh: '十七', ky: 'он жети', ru: 'семнадцать', fr: 'dix-sept' },
    { en: 'eighteen', zh: '十八', ky: 'он сегиз', ru: 'восемнадцать', fr: 'dix-huit' },
    { en: 'nineteen', zh: '十九', ky: 'он тогуз', ru: 'девятнадцать', fr: 'dix-neuf' },
    { en: 'twenty', zh: '二十', ky: 'жыйырма', ru: 'двадцать', fr: 'vingt' }
];

const SHAPE_WORDS = [
    { en: 'circle', zh: '圆形', ky: 'тегерек', ru: 'круг', fr: 'cercle' },
    { en: 'square', zh: '正方形', ky: 'чарчы', ru: 'квадрат', fr: 'carre' },
    { en: 'triangle', zh: '三角形', ky: 'үчбурчтук', ru: 'треугольник', fr: 'triangle' },
    { en: 'rectangle', zh: '长方形', ky: 'тик төртбурчтук', ru: 'прямоугольник', fr: 'rectangle' },
    { en: 'star', zh: '星形', ky: 'жылдыз', ru: 'звезда', fr: 'etoile' },
    { en: 'heart', zh: '心形', ky: 'жүрөк', ru: 'сердце', fr: 'coeur' },
    { en: 'oval', zh: '椭圆形', ky: 'сүйрү', ru: 'овал', fr: 'ovale' },
    { en: 'diamond', zh: '菱形', ky: 'ромб', ru: 'ромб', fr: 'losange' },
    { en: 'cube', zh: '立方体', ky: 'куб', ru: 'куб', fr: 'cube' },
    { en: 'sphere', zh: '球体', ky: 'шар', ru: 'шар', fr: 'sphere' },
    { en: 'cylinder', zh: '圆柱体', ky: 'цилиндр', ru: 'цилиндр', fr: 'cylindre' },
    { en: 'cone', zh: '圆锥体', ky: 'конус', ru: 'конус', fr: 'cone' },
    { en: 'line', zh: '线', ky: 'сызык', ru: 'линия', fr: 'ligne' },
    { en: 'spiral', zh: '螺旋', ky: 'айланма', ru: 'спираль', fr: 'spirale' }
];

const IDIOM_PHRASES = [
    { en: 'Practice makes perfect', zh: '熟能生巧', ky: 'Кайталоо устат кылат', ru: 'Повторение мать учения', fr: 'C est en forgeant qu on devient forgeron' },
    { en: 'Better late than never', zh: '迟做总比不做好', ky: 'Эч качандан көрө кеч болсо да жакшы', ru: 'Лучше поздно, чем никогда', fr: 'Mieux vaut tard que jamais' },
    { en: 'Time is money', zh: '时间就是金钱', ky: 'Убакыт акча', ru: 'Время деньги', fr: 'Le temps c est de l argent' },
    { en: 'Knowledge is power', zh: '知识就是力量', ky: 'Билим күч', ru: 'Знание сила', fr: 'Le savoir, c est le pouvoir' },
    { en: 'Actions speak louder than words', zh: '事实胜于雄辩', ky: 'Иш сөздөн күчтүү', ru: 'Дела говорят громче слов', fr: 'Les actes valent mieux que les mots' },
    { en: 'Every cloud has a silver lining', zh: '黑暗中总有一线光明', ky: 'Ар кыйынчылыктын артында жакшылык бар', ru: 'Нет худа без добра', fr: 'Apres la pluie, le beau temps' },
    { en: 'Where there is a will, there is a way', zh: '有志者事竟成', ky: 'Каалоо болсо, жол табылат', ru: 'Где есть желание, там есть путь', fr: 'Quand on veut, on peut' },
    { en: 'Two heads are better than one', zh: '三个臭皮匠，顶个诸葛亮', ky: 'Эки баш бирден жакшы', ru: 'Одна голова хорошо, а две лучше', fr: 'Deux avis valent mieux qu un' },
    { en: 'Rome was not built in a day', zh: '罗马不是一天建成的', ky: 'Рим бир күндө курулган эмес', ru: 'Москва не сразу строилась', fr: 'Rome ne s est pas faite en un jour' },
    { en: 'Easy come, easy go', zh: '来得容易，去得也快', ky: 'Оңой келген оңой кетет', ru: 'Легко пришло, легко ушло', fr: 'Ce qui vient vite repart vite' },
    { en: 'Honesty is the best policy', zh: '诚实为上策', ky: 'Чынчылдык эң жакшы жол', ru: 'Честность лучшая политика', fr: 'L honnetete est la meilleure politique' },
    { en: 'Slow and steady wins the race', zh: '稳扎稳打才能赢', ky: 'Жай жана туруктуу адам утат', ru: 'Тише едешь, дальше будешь', fr: 'Rien ne sert de courir, il faut partir a point' }
];

export const CONTENT_BONUSES = {
    ru: {
        letters: [],
        words: [],
        phrases: []
    },
    en: {
        letters: [
            category('english-consonant-blends', { en: 'Consonant Blends', zh: '辅音连缀', ky: 'Үнсүз айкаштары', ru: 'Сочетания согласных', fr: 'Groupes de consonnes' }, [
                letter('BL', 'BL blend', 'bl', 'blue', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { pronunciation: 'say B and L together smoothly' }),
                letter('CL', 'CL blend', 'cl', 'cloud', meanings('cloud', '云', 'булут', 'облако', 'nuage'), { pronunciation: 'hard C plus L without a pause' }),
                letter('FL', 'FL blend', 'fl', 'flag', meanings('flag', '旗子', 'туу', 'флаг', 'drapeau'), { pronunciation: 'bite lip for F, then move into L' }),
                letter('PL', 'PL blend', 'pl', 'plane', meanings('plane', '飞机', 'учак', 'самолет', 'avion'), { pronunciation: 'P pop then light L' }),
                letter('TR', 'TR blend', 'tr', 'train', meanings('train', '火车', 'поезд', 'поезд', 'train'), { pronunciation: 'T plus R in one quick start' }),
                letter('ST', 'ST blend', 'st', 'star', meanings('star', '星星', 'жылдыз', 'звезда', 'etoile'), { pronunciation: 'clear S then T together' })
            ]),
            category('english-tricky-vowels', { en: 'Tricky Vowels', zh: '常见元音模式', ky: 'Кыйын үндүү үлгүлөр', ru: 'Сложные гласные модели', fr: 'Voyelles pieges' }, [
                letter('EE', 'long e', 'ee', 'tree', meanings('tree', '树', 'дарак', 'дерево', 'arbre'), { pronunciation: 'long EE sound' }),
                letter('EA', 'long e', 'ea', 'read', meanings('read', '读', 'окуу', 'читать', 'lire'), { pronunciation: 'often sounds like long EE' }),
                letter('AI', 'long a', 'ai', 'rain', meanings('rain', '雨', 'жамгыр', 'дождь', 'pluie'), { pronunciation: 'long A sound' }),
                letter('OA', 'long o', 'oa', 'boat', meanings('boat', '船', 'кайык', 'лодка', 'bateau'), { pronunciation: 'long O sound' }),
                letter('OO', 'long u', 'oo', 'moon', meanings('moon', '月亮', 'ай', 'луна', 'lune'), { pronunciation: 'long OO as in moon' }),
                letter('OW', 'ow', 'ow', 'house', meanings('house', '房子', 'үй', 'дом', 'maison'), { pronunciation: 'OW as in house, not long O' })
            ])
        ],
        words: [
            category('english-home-words', { en: 'Home Words', zh: '家庭生活词汇', ky: 'Үй сөздөрү', ru: 'Слова о доме', fr: 'Mots de la maison' }, [
                word('door', meanings('door', '门', 'эшик', 'дверь', 'porte'), { syllables: ['door'], sound: 'd', pronunciation: 'DOHR' }),
                word('window', meanings('window', '窗户', 'терезе', 'окно', 'fenetre'), { syllables: ['win', 'dow'], sound: 'w', pronunciation: 'WIN-doh' }),
                word('kitchen', meanings('kitchen', '厨房', 'ашкана', 'кухня', 'cuisine'), { syllables: ['kit', 'chen'], sound: 'k', pronunciation: 'KITCH-en' }),
                word('bedroom', meanings('bedroom', '卧室', 'уктоочу бөлмө', 'спальня', 'chambre'), { syllables: ['bed', 'room'], sound: 'b', pronunciation: 'BED-room' }),
                word('chair', meanings('chair', '椅子', 'отургуч', 'стул', 'chaise'), { syllables: ['chair'], sound: 'ch', pronunciation: 'CHAIR' }),
                word('table', meanings('table', '桌子', 'үстөл', 'стол', 'table'), { syllables: ['ta', 'ble'], sound: 't', pronunciation: 'TAY-buhl' })
            ]),
            category('english-weather-words', { en: 'Weather Words', zh: '天气词汇', ky: 'Аба ырайы сөздөрү', ru: 'Слова о погоде', fr: 'Mots de la meteo' }, [
                word('rain', meanings('rain', '雨', 'жамгыр', 'дождь', 'pluie'), { syllables: ['rain'], sound: 'r', pronunciation: 'RAYN' }),
                word('snow', meanings('snow', '雪', 'кар', 'снег', 'neige'), { syllables: ['snow'], sound: 'sn', pronunciation: 'SNOH' }),
                word('cloud', meanings('cloud', '云', 'булут', 'облако', 'nuage'), { syllables: ['cloud'], sound: 'cl', pronunciation: 'KLOUD' }),
                word('wind', meanings('wind', '风', 'шамал', 'ветер', 'vent'), { syllables: ['wind'], sound: 'w', pronunciation: 'WIND' }),
                word('storm', meanings('storm', '暴风雨', 'бороон', 'шторм', 'tempete'), { syllables: ['storm'], sound: 'st', pronunciation: 'STORM' }),
                word('umbrella', meanings('umbrella', '雨伞', 'кол чатыр', 'зонт', 'parapluie'), { syllables: ['um', 'brel', 'la'], sound: 'u', pronunciation: 'um-BREL-uh' })
            ]),
            category('english-th-sound-words', { en: 'TH Sound Words', zh: 'TH音词汇', ky: 'TH тыбыштуу сөздөр', ru: 'Слова со звуком TH', fr: 'Mots avec le son TH' }, [
                word('think', meanings('think', '想', 'ойлон', 'думать', 'penser'), { syllables: ['think'], sound: 'th', pronunciation: 'tongue between teeth' }),
                word('thank', meanings('thank', '感谢', 'ыраазы бол', 'благодарить', 'remercier'), { syllables: ['thank'], sound: 'th', pronunciation: 'voiceless TH' }),
                word('three', meanings('three', '三', 'үч', 'три', 'trois'), { syllables: ['three'], sound: 'th', pronunciation: 'TH + long EE' }),
                word('this', meanings('this', '这个', 'бул', 'это', 'ceci'), { syllables: ['this'], sound: 'th', pronunciation: 'voiced TH' }),
                word('mother', meanings('mother', '妈妈', 'эне', 'мать', 'mere'), { syllables: ['mo', 'ther'], sound: 'th', pronunciation: 'voiced TH in second syllable' }),
                word('weather', meanings('weather', '天气', 'аба ырайы', 'погода', 'meteo'), { syllables: ['wea', 'ther'], sound: 'th', pronunciation: 'WETH-er' })
            ]),
            category('english-short-i-words', { en: 'Short I Words', zh: '短I音词汇', ky: 'Кыска I сөздөрү', ru: 'Слова с кратким I', fr: 'Mots avec le son I court' }, [
                word('sit', meanings('sit', '坐', 'отур', 'сидеть', 'asseoir'), { syllables: ['sit'], sound: 's', pronunciation: 'short I sound' }),
                word('big', meanings('big', '大', 'чоң', 'большой', 'grand'), { syllables: ['big'], sound: 'b', pronunciation: 'short I in the middle' }),
                word('milk', meanings('milk', '牛奶', 'сүт', 'молоко', 'lait'), { syllables: ['milk'], sound: 'm', pronunciation: 'short I before LK' }),
                word('fish', meanings('fish', '鱼', 'балык', 'рыба', 'poisson'), { syllables: ['fish'], sound: 'f', pronunciation: 'short I plus SH' }),
                word('window', meanings('window', '窗户', 'терезе', 'окно', 'fenetre'), { syllables: ['win', 'dow'], sound: 'w', pronunciation: 'short I in win' }),
                word('sister', meanings('sister', '姐妹', 'эже; карындаш', 'сестра', 'soeur'), { syllables: ['sis', 'ter'], sound: 's', pronunciation: 'short I in first syllable' })
            ]),
            category('english-l-blend-words', { en: 'L Blend Words', zh: 'L辅音连缀词汇', ky: 'L кошулма сөздөр', ru: 'Слова с сочетаниями L', fr: 'Mots avec groupes en L' }, [
                word('blue', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { syllables: ['blue'], sound: 'bl', pronunciation: 'blend B and L' }),
                word('cloud', meanings('cloud', '云', 'булут', 'облако', 'nuage'), { syllables: ['cloud'], sound: 'cl', pronunciation: 'blend C and L' }),
                word('flag', meanings('flag', '旗子', 'туу', 'флаг', 'drapeau'), { syllables: ['flag'], sound: 'fl', pronunciation: 'blend F and L' }),
                word('glass', meanings('glass', '玻璃杯', 'айнек', 'стакан', 'verre'), { syllables: ['glass'], sound: 'gl', pronunciation: 'blend G and L' }),
                word('plane', meanings('plane', '飞机', 'учак', 'самолет', 'avion'), { syllables: ['plane'], sound: 'pl', pronunciation: 'blend P and L' }),
                word('slide', meanings('slide', '滑梯', 'сырганак', 'горка', 'toboggan'), { syllables: ['slide'], sound: 'sl', pronunciation: 'blend S and L' })
            ]),
            category('english-v-w-words', { en: 'V and W Words', zh: 'V/W音词汇', ky: 'V жана W сөздөр', ru: 'Слова на V и W', fr: 'Mots avec V et W' }, [
                word('vest', meanings('vest', '背心', 'желет', 'жилет', 'gilet'), { syllables: ['vest'], sound: 'v', pronunciation: 'teeth on lip for V' }),
                word('water', meanings('water', '水', 'суу', 'вода', 'eau'), { syllables: ['wa', 'ter'], sound: 'w', pronunciation: 'rounded lips for W' }),
                word('very', meanings('very', '非常', 'абдан', 'очень', 'tres'), { syllables: ['ve', 'ry'], sound: 'v', pronunciation: 'start with V vibration' }),
                word('window', meanings('window', '窗户', 'терезе', 'окно', 'fenetre'), { syllables: ['win', 'dow'], sound: 'w', pronunciation: 'start with W glide' }),
                word('voice', meanings('voice', '声音', 'үн', 'голос', 'voix'), { syllables: ['voice'], sound: 'v', pronunciation: 'voiced V at the start' }),
                word('wave', meanings('wave', '挥手；波浪', 'толкун; кол булга', 'волна; махать', 'vague; saluer'), { syllables: ['wave'], sound: 'w', pronunciation: 'clear W glide' })
            ])
        ],
        phrases: [
            category('english-home-phrases', { en: 'Home Phrases', zh: '家庭生活短语', ky: 'Үй фразалары', ru: 'Фразы о доме', fr: 'Phrases de la maison' }, [
                phrase('Please open the door', meanings('please open the door', '请开门', 'эшикти ачыңызчы', 'пожалуйста, откройте дверь', 'ouvrez la porte, s il vous plait'), { pronunciation: 'OPEN the DOOR' }),
                phrase('The window is closed', meanings('the window is closed', '窗户关着', 'терезе жабык', 'окно закрыто', 'la fenetre est fermee'), { pronunciation: 'WIN-doh is KLOHZD' }),
                phrase('I am in the kitchen', meanings('I am in the kitchen', '我在厨房', 'мен ашканадамын', 'я на кухне', 'je suis dans la cuisine'), { pronunciation: 'KITCH-en' }),
                phrase('My book is on the table', meanings('my book is on the table', '我的书在桌子上', 'китебим үстөлдүн үстүндө', 'моя книга на столе', 'mon livre est sur la table'), { pronunciation: 'TAI-buhl' }),
                phrase('Sit on the chair', meanings('sit on the chair', '坐在椅子上', 'отургучка отур', 'сядь на стул', 'assieds-toi sur la chaise'), { pronunciation: 'SIT on the CHAIR' }),
                phrase('The bedroom is quiet', meanings('the bedroom is quiet', '卧室很安静', 'уктоочу бөлмө тынч', 'в спальне тихо', 'la chambre est calme'), { pronunciation: 'BED-room is KWAI-uht' })
            ]),
            category('english-school-day-phrases', { en: 'School Day Phrases', zh: '上学日短语', ky: 'Мектеп күнү фразалары', ru: 'Фразы о школьном дне', fr: 'Phrases de la journee scolaire' }, [
                phrase('I go to school early', meanings('I go to school early', '我早早去学校', 'мен мектепке эрте барам', 'я рано иду в школу', 'je vais tot a l ecole'), { pronunciation: 'GO to school ER-lee' }),
                phrase('My class starts now', meanings('my class starts now', '现在开始上课', 'сабак азыр башталат', 'мой урок начинается сейчас', 'mon cours commence maintenant'), { pronunciation: 'class STARTS NOW' }),
                phrase('We read together', meanings('we read together', '我们一起读', 'биз чогуу окуйбуз', 'мы читаем вместе', 'nous lisons ensemble'), { pronunciation: 'READ to-GETH-er' }),
                phrase('I write in my notebook', meanings('I write in my notebook', '我在本子上写字', 'дептериме жазам', 'я пишу в тетради', 'j ecris dans mon cahier'), { pronunciation: 'NOTE-book' }),
                phrase('The lesson is interesting', meanings('the lesson is interesting', '课程很有趣', 'сабак кызыктуу', 'урок интересный', 'la lecon est interessante'), { pronunciation: 'IN-tres-ting' }),
                phrase('I come home after class', meanings('I come home after class', '下课后我回家', 'сабактан кийин үйгө кайтам', 'я иду домой после урока', 'je rentre a la maison apres le cours'), { pronunciation: 'after CLASS' })
            ]),
            category('english-th-sound-phrases', { en: 'TH Sound Phrases', zh: 'TH音短语', ky: 'TH тыбыштуу фразалар', ru: 'Фразы со звуком TH', fr: 'Phrases avec le son TH' }, [
                phrase('Thank you for this', meanings('thank you for this', '谢谢你给这个', 'бул үчүн рахмат', 'спасибо за это', 'merci pour ceci'), { pronunciation: 'TH in thank and this' }),
                phrase('Three thin things', meanings('three thin things', '三个细东西', 'үч ичке нерсе', 'три тонкие вещи', 'trois choses fines'), { pronunciation: 'repeat voiceless TH' }),
                phrase('This is their mother', meanings('this is their mother', '这是他们的母亲', 'бул алардын энеси', 'это их мама', 'c est leur mere'), { pronunciation: 'voiced TH in this, their, mother' }),
                phrase('The weather is warm', meanings('the weather is warm', '天气很暖和', 'аба ырайы жылуу', 'погода теплая', 'il fait chaud'), { pronunciation: 'THE WEATHER' }),
                phrase('I think this is right', meanings('I think this is right', '我觉得这是对的', 'менимче бул туура', 'я думаю, это правильно', 'je pense que c est juste'), { pronunciation: 'TH in think and this' }),
                phrase('They are with their teacher', meanings('they are with their teacher', '他们和老师在一起', 'алар мугалими менен', 'они со своим учителем', 'ils sont avec leur professeur'), { pronunciation: 'mixed voiced and voiceless TH' })
            ]),
            category('english-short-i-phrases', { en: 'Short I Phrases', zh: '短I音短语', ky: 'Кыска I фразалар', ru: 'Фразы с кратким I', fr: 'Phrases avec le son I court' }, [
                phrase('Six big fish', meanings('six big fish', '六条大鱼', 'алты чоң балык', 'шесть больших рыб', 'six gros poissons'), { pronunciation: 'repeat the short I in six, big, fish' }),
                phrase('This little kid is quick', meanings('this little kid is quick', '这个小孩很快', 'бул кичинекей бала бат', 'этот маленький ребенок быстрый', 'ce petit enfant est rapide'), { pronunciation: 'short I in this, little, kid, quick' }),
                phrase('Sit with Tim', meanings('sit with Tim', '和蒂姆坐下', 'Тим менен отур', 'сядь с Тимом', 'assieds-toi avec Tim'), { pronunciation: 'short I in sit and Tim' }),
                phrase('The big ship is in the river', meanings('the big ship is in the river', '大船在河里', 'чоң кеме дарыяда', 'большой корабль в реке', 'le grand bateau est dans la riviere'), { pronunciation: 'repeat short I across ship, is, in, river' }),
                phrase('Pick six stickers', meanings('pick six stickers', '挑六张贴纸', 'алты стикер танда', 'выбери шесть наклеек', 'choisis six autocollants'), { pronunciation: 'short I in pick, six, stickers' }),
                phrase('It is still winter', meanings('it is still winter', '现在还是冬天', 'дагы эле кыш', 'еще зима', 'c est encore l hiver'), { pronunciation: 'short I in it, is, still, winter' })
            ]),
            category('english-l-blend-phrases', { en: 'L Blend Phrases', zh: 'L辅音连缀短语', ky: 'L кошулма фразалар', ru: 'Фразы с сочетаниями L', fr: 'Phrases avec groupes en L' }, [
                phrase('Please clap slowly', meanings('please clap slowly', '请慢慢拍手', 'жай кол чабынызчы', 'пожалуйста, хлопайте медленно', 's il vous plait, tapez lentement'), { pronunciation: 'blend PL and CL clearly' }),
                phrase('Blue clouds float low', meanings('blue clouds float low', '蓝色的云飘得很低', 'кок булуттар ылдый сүзөт', 'синие облака плывут низко', 'les nuages bleus flottent bas'), { pronunciation: 'practice BL, CL, FL blends' }),
                phrase('Glad flowers bloom', meanings('bright flowers bloom', '鲜花盛开', 'гулдор ачылды', 'цветы расцветают', 'les fleurs s ouvrent'), { pronunciation: 'GL, FL, BL in one short line' }),
                phrase('Clean plates please', meanings('clean plates please', '请把盘子弄干净', 'табактарды тазалагылачы', 'чистые тарелки, пожалуйста', 'assiettes propres, s il vous plait'), { pronunciation: 'CL and PL at the starts' }),
                phrase('The train is late', meanings('the train is late', '火车晚点了', 'поезд кечигип жатат', 'поезд опаздывает', 'le train est en retard'), { pronunciation: 'focus on the L in late after the blend' }),
                phrase('Fly like a plane', meanings('fly like a plane', '像飞机一样飞', 'учактай уч', 'лети как самолет', 'vole comme un avion'), { pronunciation: 'FL, L, PL transitions' })
            ]),
            category('english-v-w-phrases', { en: 'V and W Phrases', zh: 'V/W音短语', ky: 'V жана W фразалар', ru: 'Фразы на V и W', fr: 'Phrases avec V et W' }, [
                phrase('We visit every week', meanings('we visit every week', '我们每周都拜访', 'биз ар жумада барабыз', 'мы навещаем каждую неделю', 'nous rendons visite chaque semaine'), { pronunciation: 'contrast W in we, week with V in visit, every' }),
                phrase('Victor wants warm water', meanings('Victor wants warm water', '维克托想要温水', 'Виктор жылуу суу каалайт', 'Виктор хочет теплой воды', 'Victor veut de l eau tiede'), { pronunciation: 'V in Victor, W in wants, warm, water' }),
                phrase('Very windy weather', meanings('very windy weather', '天气很有风', 'аба абдан шамалдуу', 'очень ветреная погода', 'temps tres venteux'), { pronunciation: 'V in very, W in windy and weather' }),
                phrase('We have five vans', meanings('we have five vans', '我们有五辆货车', 'бизде беш фургон бар', 'у нас пять фургонов', 'nous avons cinq fourgons'), { pronunciation: 'W in we, V in have, five, vans' }),
                phrase('Will Vera wave?', meanings('will Vera wave?', '维拉会挥手吗？', 'Вера кол булгайбы?', 'Вера помашет?', 'Vera fera-t-elle signe ?'), { pronunciation: 'switch between W and V quickly' }),
                phrase('The vet waits outside', meanings('the vet waits outside', '兽医在外面等', 'ветеринар сыртта күтүп жатат', 'ветеринар ждет снаружи', 'le veterinaire attend dehors'), { pronunciation: 'V in vet, W in waits' })
            ])
        ]
    },
    ky: {
        letters: [
            category('kyrgyz-rounded-vowels-letters', { en: 'Rounded Vowels', zh: '圆唇元音', ky: 'Жумуру үндүүлөр', ru: 'Округлые гласные', fr: 'Voyelles arrondies' }, [
                letter('Ө ө', 'Ө', 'ө', 'өрүк', meanings('apricot', '杏', 'өрүк', 'абрикос', 'abricot'), { pronunciation: 'rounded vowel like German ö' }),
                letter('Ү ү', 'Ү', 'ү', 'үй', meanings('house', '房子', 'үй', 'дом', 'maison'), { pronunciation: 'rounded vowel like French u' }),
                letter('О о', 'О', 'о', 'окоо', meanings('study', '学习', 'окуу', 'учеба', 'etude'), { pronunciation: 'clear back O' }),
                letter('У у', 'У', 'у', 'ун', meanings('flour', '面粉', 'ун', 'мука', 'farine'), { pronunciation: 'deep U sound' }),
                letter('Ы ы', 'Ы', 'ы', 'ырыс', meanings('fortune', '福气', 'ырыс', 'удача', 'chance'), { pronunciation: 'central vowel, lips relaxed' }),
                letter('И и', 'И', 'и', 'иш', meanings('work', '工作', 'иш', 'работа', 'travail'), { pronunciation: 'front I sound' })
            ]),
            category('kyrgyz-special-consonants', { en: 'Special Consonants', zh: '特殊辅音', ky: 'Өзгөчө үнсүздөр', ru: 'Особые согласные', fr: 'Consonnes speciales' }, [
                letter('Ң ң', 'Ң', 'ң', 'жаңы', meanings('new', '新的', 'жаңы', 'новый', 'nouveau'), { pronunciation: 'NG sound, never plain N' }),
                letter('Ж ж', 'Ж', 'ж', 'жол', meanings('road', '路', 'жол', 'дорога', 'route'), { pronunciation: 'voiced zh sound' }),
                letter('Ч ч', 'Ч', 'ч', 'чай', meanings('tea', '茶', 'чай', 'чай', 'the'), { pronunciation: 'CH sound as in church' }),
                letter('Ш ш', 'Ш', 'ш', 'шамал', meanings('wind', '风', 'шамал', 'ветер', 'vent'), { pronunciation: 'broad SH sound' }),
                letter('К к', 'К', 'к', 'көл', meanings('lake', '湖', 'көл', 'озеро', 'lac'), { pronunciation: 'clean hard K' }),
                letter('Г г', 'Г', 'г', 'гүл', meanings('flower', '花', 'гүл', 'цветок', 'fleur'), { pronunciation: 'voiced G, lighter than Russian hard G' })
            ])
        ],
        words: [
            category('kyrgyz-home-words', { en: 'Home Words', zh: '家庭生活词汇', ky: 'Үй сөздөрү', ru: 'Слова о доме', fr: 'Mots de la maison' }, [
                word('эшик', meanings('door', '门', 'эшик', 'дверь', 'porte'), { syllables: ['э', 'шик'], sound: 'э', pronunciation: 'e-SHIK' }),
                word('терезе', meanings('window', '窗户', 'терезе', 'окно', 'fenetre'), { syllables: ['те', 'ре', 'зе'], sound: 'т', pronunciation: 'te-re-ZE' }),
                word('ашкана', meanings('kitchen', '厨房', 'ашкана', 'кухня', 'cuisine'), { syllables: ['аш', 'ка', 'на'], sound: 'а', pronunciation: 'ash-ka-NA' }),
                word('бөлмө', meanings('room', '房间', 'бөлмө', 'комната', 'chambre'), { syllables: ['бөл', 'мө'], sound: 'б', pronunciation: 'rounded Ө in both syllables' }),
                word('керебет', meanings('bed', '床', 'керебет', 'кровать', 'lit'), { syllables: ['ке', 'ре', 'бет'], sound: 'к', pronunciation: 'ke-re-BET' }),
                word('үстөл', meanings('table', '桌子', 'үстөл', 'стол', 'table'), { syllables: ['үс', 'төл'], sound: 'ү', pronunciation: 'rounded vowels throughout' })
            ]),
            category('kyrgyz-weather-words', { en: 'Weather Words', zh: '天气词汇', ky: 'Аба ырайы сөздөрү', ru: 'Слова о погоде', fr: 'Mots de la meteo' }, [
                word('жамгыр', meanings('rain', '雨', 'жамгыр', 'дождь', 'pluie'), { syllables: ['жам', 'гыр'], sound: 'ж', pronunciation: 'zham-GYR' }),
                word('кар', meanings('snow', '雪', 'кар', 'снег', 'neige'), { syllables: ['кар'], sound: 'к', pronunciation: 'kar' }),
                word('булут', meanings('cloud', '云', 'булут', 'облако', 'nuage'), { syllables: ['бу', 'лут'], sound: 'б', pronunciation: 'bu-LUT' }),
                word('шамал', meanings('wind', '风', 'шамал', 'ветер', 'vent'), { syllables: ['ша', 'мал'], sound: 'ш', pronunciation: 'sha-MAL' }),
                word('бороон', meanings('storm', '暴风雨', 'бороон', 'буря', 'tempete'), { syllables: ['бо', 'роон'], sound: 'б', pronunciation: 'bo-ROON' }),
                word('чатыр', meanings('umbrella; roof', '伞；屋顶', 'чатыр', 'зонт; крыша', 'parapluie; toit'), { syllables: ['ча', 'тыр'], sound: 'ч', pronunciation: 'cha-TYR' })
            ]),
            category('kyrgyz-ng-sound-words', { en: 'NG Sound Words', zh: 'NG音词汇', ky: 'Ң тыбыштуу сөздөр', ru: 'Слова со звуком Ң', fr: 'Mots avec le son NG' }, [
                word('жаңы', meanings('new', '新的', 'жаңы', 'новый', 'nouveau'), { syllables: ['жа', 'ңы'], sound: 'ң', pronunciation: 'NG in second syllable' }),
                word('миң', meanings('thousand', '一千', 'миң', 'тысяча', 'mille'), { syllables: ['миң'], sound: 'ң', pronunciation: 'end with NG' }),
                word('көңүл', meanings('mood; attention', '心情；注意力', 'көңүл', 'настроение; внимание', 'attention; humeur'), { syllables: ['кө', 'ңүл'], sound: 'ң', pronunciation: 'NG between rounded vowels' }),
                word('таң', meanings('dawn', '黎明', 'таң', 'рассвет', 'aube'), { syllables: ['таң'], sound: 'ң', pronunciation: 'clear NG at the end' }),
                word('соң', meanings('after; end', '之后；结束', 'соң', 'после; конец', 'apres; fin'), { syllables: ['соң'], sound: 'ң', pronunciation: 'final NG sound' }),
                word('өң', meanings('color; face side', '颜色；正面', 'өң', 'цвет; лицевая сторона', 'couleur; face'), { syllables: ['өң'], sound: 'ң', pronunciation: 'rounded vowel plus NG' })
            ]),
            category('kyrgyz-rounded-vowel-plus-words', { en: 'Rounded Vowel Plus', zh: '圆唇元音加强词汇', ky: 'Жумуру үндүү кошумча сөздөр', ru: 'Дополнительные слова с округлыми гласными', fr: 'Mots supplementaires a voyelles arrondies' }, [
                word('үй', meanings('house', '房子', 'үй', 'дом', 'maison'), { syllables: ['үй'], sound: 'ү', pronunciation: 'rounded Ü glide' }),
                word('көл', meanings('lake', '湖', 'көл', 'озеро', 'lac'), { syllables: ['көл'], sound: 'ө', pronunciation: 'rounded Ö vowel' }),
                word('гүл', meanings('flower', '花', 'гүл', 'цветок', 'fleur'), { syllables: ['гүл'], sound: 'ү', pronunciation: 'rounded Ü with final L' }),
                word('түн', meanings('night', '夜晚', 'түн', 'ночь', 'nuit'), { syllables: ['түн'], sound: 'ү', pronunciation: 'rounded Ü in a short word' }),
                word('өрүк', meanings('apricot', '杏', 'өрүк', 'абрикос', 'abricot'), { syllables: ['ө', 'рүк'], sound: 'ө', pronunciation: 'Ö then Ü in one word' }),
                word('көйнөк', meanings('dress', '连衣裙', 'көйнөк', 'платье', 'robe'), { syllables: ['көй', 'нөк'], sound: 'ө', pronunciation: 'multiple rounded vowels' })
            ]),
            category('kyrgyz-special-letters-words', { en: 'Special Letter Words', zh: '特殊字母词汇', ky: 'Өзгөчө тамга сөздөрү', ru: 'Слова с особыми буквами', fr: 'Mots avec lettres speciales' }, [
                word('жеңе', meanings('sister-in-law', '嫂子', 'жеңе', 'невестка', 'belle-soeur'), { syllables: ['же', 'ңе'], sound: 'ң', pronunciation: 'NG in the middle' }),
                word('көчө', meanings('street', '街道', 'көчө', 'улица', 'rue'), { syllables: ['кө', 'чө'], sound: 'ч', pronunciation: 'Ö and CH together' }),
                word('үчүк', meanings('frostbite', '冻伤', 'үчүк', 'обморожение', 'engelure'), { syllables: ['ү', 'чүк'], sound: 'ү', pronunciation: 'Ü and CH blend' }),
                word('төө', meanings('camel', '骆驼', 'төө', 'верблюд', 'chameau'), { syllables: ['төө'], sound: 'ө', pronunciation: 'long rounded Ö sound' }),
                word('чоң', meanings('big', '大', 'чоң', 'большой', 'grand'), { syllables: ['чоң'], sound: 'ч', pronunciation: 'CH plus NG ending' }),
                word('жөө', meanings('on foot', '步行', 'жөө', 'пешком', 'a pied'), { syllables: ['жөө'], sound: 'ж', pronunciation: 'ZH with long Ö' })
            ]),
            category('kyrgyz-r-sound-plus-words', { en: 'R Sound Plus', zh: 'R音加强词汇', ky: 'Р тыбыштуу кошумча сөздөр', ru: 'Дополнительные слова со звуком Р', fr: 'Mots supplementaires avec le son R' }, [
                word('рамат', meanings('gratitude; thanks', '感谢', 'ырамат', 'благодарность', 'gratitude'), { syllables: ['ра', 'мат'], sound: 'р', pronunciation: 'rolled R at the start' }),
                word('дарыгер', meanings('doctor', '医生', 'дарыгер', 'врач', 'medecin'), { syllables: ['да', 'ры', 'гер'], sound: 'р', pronunciation: 'R in the middle syllable' }),
                word('арстан', meanings('lion', '狮子', 'арстан', 'лев', 'lion'), { syllables: ['ар', 'стан'], sound: 'р', pronunciation: 'clear rolled R after the vowel' }),
                word('район', meanings('district', '区', 'район', 'район', 'quartier'), { syllables: ['ра', 'йон'], sound: 'р', pronunciation: 'start with a strong R' }),
                word('тору', meanings('bay-colored', '棕红色马毛', 'тору', 'гнедой', 'bai'), { syllables: ['то', 'ру'], sound: 'р', pronunciation: 'R in the second syllable' }),
                word('көрөрман', meanings('viewer', '观众', 'көрөрман', 'зритель', 'spectateur'), { syllables: ['кө', 'рөр', 'ман'], sound: 'р', pronunciation: 'multiple R sounds' })
            ])
        ],
        phrases: [
            category('kyrgyz-home-phrases', { en: 'Home Phrases', zh: '家庭生活短语', ky: 'Үй фразалары', ru: 'Фразы о доме', fr: 'Phrases de la maison' }, [
                phrase('Эшикти ач', meanings('open the door', '开门', 'эшикти ач', 'открой дверь', 'ouvre la porte'), { pronunciation: 'e-SHIK-ti ach' }),
                phrase('Терезе жабык', meanings('the window is closed', '窗户关着', 'терезе жабык', 'окно закрыто', 'la fenetre est fermee'), { pronunciation: 'te-re-ZE zha-BYK' }),
                phrase('Мен ашканада турам', meanings('I am in the kitchen', '我在厨房', 'мен ашканада турам', 'я на кухне', 'je suis dans la cuisine'), { pronunciation: 'ash-ka-NA-da tu-RAM' }),
                phrase('Китебим үстөлдө', meanings('my book is on the table', '我的书在桌子上', 'китебим үстөлдө', 'моя книга на столе', 'mon livre est sur la table'), { pronunciation: 'rounded Ü and Ö sounds' }),
                phrase('Отургучка отур', meanings('sit on the chair', '坐在椅子上', 'отургучка отур', 'сядь на стул', 'assieds-toi sur la chaise'), { pronunciation: 'o-tur-GUCH-ka o-TUR' }),
                phrase('Бөлмө тынч', meanings('the room is quiet', '房间很安静', 'бөлмө тынч', 'в комнате тихо', 'la chambre est calme'), { pronunciation: 'rounded Ö in бөлмө' })
            ]),
            category('kyrgyz-school-day-phrases', { en: 'School Day Phrases', zh: '上学日短语', ky: 'Мектеп күнү фразалары', ru: 'Фразы о школьном дне', fr: 'Phrases de la journee scolaire' }, [
                phrase('Мен мектепке эрте барам', meanings('I go to school early', '我早早去学校', 'мен мектепке эрте барам', 'я рано иду в школу', 'je vais tot a l ecole'), { pronunciation: 'mek-TEP-ke er-TE ba-RAM' }),
                phrase('Сабак азыр башталат', meanings('class starts now', '现在开始上课', 'сабак азыр башталат', 'урок начинается сейчас', 'le cours commence maintenant'), { pronunciation: 'sa-BAK a-ZYR bash-ta-LAT' }),
                phrase('Биз чогуу окуйбуз', meanings('we read together', '我们一起读', 'биз чогуу окуйбуз', 'мы читаем вместе', 'nous lisons ensemble'), { pronunciation: 'cho-GUU o-KUI-buz' }),
                phrase('Мен дептериме жазам', meanings('I write in my notebook', '我在本子上写字', 'мен дептериме жазам', 'я пишу в тетради', 'j ecris dans mon cahier'), { pronunciation: 'dep-te-ri-ME zha-ZAM' }),
                phrase('Сабак кызыктуу', meanings('the lesson is interesting', '课程很有趣', 'сабак кызыктуу', 'урок интересный', 'la lecon est interessante'), { pronunciation: 'ky-ZYK-tuu' }),
                phrase('Мен үйгө кечинде кайтам', meanings('I go home in the evening', '我晚上回家', 'мен үйгө кечинде кайтам', 'вечером я иду домой', 'je rentre a la maison le soir'), { pronunciation: 'үйгө ke-CHIN-de kai-TAM' })
            ]),
            category('kyrgyz-ng-sound-phrases', { en: 'NG Sound Phrases', zh: 'NG音短语', ky: 'Ң тыбыштуу фразалар', ru: 'Фразы со звуком Ң', fr: 'Phrases avec le son NG' }, [
                phrase('Жаңы китеп келди', meanings('a new book arrived', '新书到了', 'жаңы китеп келди', 'пришла новая книга', 'un nouveau livre est arrive'), { pronunciation: 'focus on жаңы' }),
                phrase('Миң бала келди', meanings('a thousand children came', '来了一千个孩子', 'миң бала келди', 'пришла тысяча детей', 'mille enfants sont venus'), { pronunciation: 'final NG in миң' }),
                phrase('Көңүлүң жакшыбы?', meanings('are you in a good mood?', '你心情好吗？', 'көңүлүң жакшыбы?', 'у тебя хорошее настроение?', 'es-tu de bonne humeur ?'), { pronunciation: 'NG inside көңүлүң' }),
                phrase('Таң эрте атты', meanings('dawn came early', '黎明来得很早', 'таң эрте атты', 'рассвет наступил рано', 'l aube est arrivee tot'), { pronunciation: 'clear NG in таң' }),
                phrase('Сабактан соң барам', meanings('I will go after class', '下课后我会去', 'сабактан соң барам', 'я пойду после урока', 'j irai apres le cours'), { pronunciation: 'NG in соң' }),
                phrase('Өңү сонун экен', meanings('the color is beautiful', '颜色很好看', 'өңү сонун экен', 'цвет очень красивый', 'la couleur est tres belle'), { pronunciation: 'NG in өңү' })
            ]),
            category('kyrgyz-rounded-vowel-plus-phrases', { en: 'Rounded Vowel Plus', zh: '圆唇元音加强短语', ky: 'Жумуру үндүү кошумча фразалар', ru: 'Дополнительные фразы с округлыми гласными', fr: 'Phrases supplementaires a voyelles arrondies' }, [
                phrase('Үй чоң жана жарык', meanings('the house is big and bright', '房子又大又亮', 'үй чоң жана жарык', 'дом большой и светлый', 'la maison est grande et lumineuse'), { pronunciation: 'repeat rounded Ү in үй and Ө/Ү sounds in the phrase' }),
                phrase('Бөлмө өтө тынч', meanings('the room is very quiet', '房间非常安静', 'бөлмө өтө тынч', 'комната очень тихая', 'la chambre est tres calme'), { pronunciation: 'rounded Ө in бөлмө and өтө' }),
                phrase('Үстөлдүн үстүндө гүл бар', meanings('there is a flower on the table', '桌子上有一朵花', 'үстөлдүн үстүндө гүл бар', 'на столе есть цветок', 'il y a une fleur sur la table'), { pronunciation: 'multiple rounded Ү sounds' }),
                phrase('Күн бүгүн жылуу', meanings('today the sun is warm', '今天天气暖和', 'күн бүгүн жылуу', 'сегодня тепло', 'il fait chaud aujourd hui'), { pronunciation: 'rounded Ү in бүгүн' }),
                phrase('Өрүк өтө даамдуу', meanings('the apricot is very tasty', '杏子很好吃', 'өрүк өтө даамдуу', 'абрикос очень вкусный', 'l abricot est tres bon'), { pronunciation: 'practice Ө and Ү together' }),
                phrase('Үч түлкү көрүндү', meanings('three foxes appeared', '出现了三只狐狸', 'үч түлкү көрүндү', 'появились три лисы', 'trois renards sont apparus'), { pronunciation: 'rounded vowels across all three words' })
            ]),
            category('kyrgyz-special-letters-phrases', { en: 'Special Letter Phrases', zh: '特殊字母短语', ky: 'Өзгөчө тамга фразалары', ru: 'Фразы с особыми буквами', fr: 'Phrases avec lettres speciales' }, [
                phrase('Гүлдөр көлгө түштү', meanings('the flowers fell into the lake', '花掉进了湖里', 'гүлдөр көлгө түштү', 'цветы упали в озеро', 'les fleurs sont tombees dans le lac'), { pronunciation: 'practice ү, ө, and soft г/к transitions' }),
                phrase('Жеңең жаңы үйдө', meanings('your sister-in-law is in the new house', '嫂子在新家', 'жеңең жаңы үйдө', 'твоя невестка в новом доме', 'ta belle-soeur est dans la nouvelle maison'), { pronunciation: 'practice ң and жаңы together' }),
                phrase('Көчөдө үч чоң көчүк бар', meanings('there are three big puppies on the street', '街上有三只大狗崽', 'көчөдө үч чоң көчүк бар', 'на улице три больших щенка', 'il y a trois grands chiots dans la rue'), { pronunciation: 'practice ө, ү, and ч' }),
                phrase('Өз үйүң өзүңө ысык', meanings('your own home is dear to you', '自己的家最温暖', 'өз үйүң өзүңө ысык', 'свой дом тебе дорог', 'sa propre maison est la plus chere'), { pronunciation: 'repeat өз/үйүң/өзүңө rounded vowels' }),
                phrase('Жаңы өңдүү көйнөк кооз', meanings('the new colorful dress is beautiful', '新彩色连衣裙很漂亮', 'жаңы өңдүү көйнөк кооз', 'новое цветное платье красивое', 'la nouvelle robe coloree est belle'), { pronunciation: 'blend ң, ө, and йө sounds' }),
                phrase('Төөлөр өрөөнгө жөнөдү', meanings('the camels left for the valley', '骆驼出发去山谷了', 'төөлөр өрөөнгө жөнөдү', 'верблюды отправились в долину', 'les chameaux sont partis pour la vallee'), { pronunciation: 'practice repeated Ө vowels' })
            ]),
            category('kyrgyz-r-sound-plus-phrases', { en: 'R Sound Plus', zh: 'R音加强短语', ky: 'Р тыбыштуу кошумча фразалар', ru: 'Дополнительные фразы со звуком Р', fr: 'Phrases supplementaires avec le son R' }, [
                phrase('Роза эрте ойгонду', meanings('Roza woke up early', '罗莎很早醒了', 'Роза эрте ойгонду', 'Роза рано проснулась', 'Roza s est reveillee tot'), { pronunciation: 'tap the Kyrgyz rolled R in both words' }),
                phrase('Арстан тоодо күркүрөдү', meanings('the lion roared in the mountains', '狮子在山里咆哮了', 'арстан тоодо күркүрөдү', 'лев зарычал в горах', 'le lion a rugi dans les montagnes'), { pronunciation: 'multiple rolled R sounds' }),
                phrase('Районго эртең барабыз', meanings('we will go to the district tomorrow', '我们明天去区里', 'районго эртең барабыз', 'завтра поедем в район', 'nous irons au quartier demain'), { pronunciation: 'strong R in районго and эртең' }),
                phrase('Дарыгер ооруну көрдү', meanings('the doctor saw the sickness', '医生看到了病症', 'дарыгер ооруну көрдү', 'врач увидел болезнь', 'le medecin a vu la maladie'), { pronunciation: 'rolled R in дарыгер and ооруну' }),
                phrase('Кара тору ат чуркады', meanings('the dark bay horse ran', '深色的马跑了', 'кара тору ат чуркады', 'гнедая лошадь побежала', 'le cheval brun a couru'), { pronunciation: 'repeat the R in кара, тору, чуркады' }),
                phrase('Бир тууган шаарга кирди', meanings('a sibling entered the city', '兄弟姐妹进城了', 'бир тууган шаарга кирди', 'родной брат вошел в город', 'un frere est entre dans la ville'), { pronunciation: 'alternate light and strong R sounds' })
            ])
        ]
    },
    zh: {
        letters: [
            category('chinese-initials-practice', { en: 'Pinyin Initials', zh: '声母练习', ky: 'Пиньинь баш тамгалары', ru: 'Начальные звуки пиньинь', fr: 'Initiales du pinyin' }, [
                letter('b', 'b', 'b', '爸', meanings('dad', '爸爸', 'ата', 'папа', 'papa'), { pronunciation: 'unaspirated b, softer than English b' }),
                letter('p', 'p', 'p', '朋', meanings('friend', '朋友', 'дос', 'друг', 'ami'), { pronunciation: 'aspirated p with a puff of air' }),
                letter('j', 'j', 'j', '家', meanings('home', '家', 'үй', 'дом', 'maison'), { pronunciation: 'tongue forward, lips spread' }),
                letter('q', 'q', 'q', '请', meanings('please', '请', 'сураныч', 'пожалуйста', 's il vous plait'), { pronunciation: 'like j but with stronger air' }),
                letter('x', 'x', 'x', '下', meanings('down', '下', 'ылдый', 'вниз', 'bas'), { pronunciation: 'soft hiss with tongue forward' }),
                letter('zh', 'zh', 'zh', '中', meanings('middle; China', '中', 'орто; Кытай', 'середина; Китай', 'milieu; Chine'), { pronunciation: 'retroflex sound with curled tongue' })
            ]),
            category('chinese-finals-practice', { en: 'Pinyin Finals', zh: '韵母练习', ky: 'Пиньинь аяктоочу үндөр', ru: 'Конечные звуки пиньинь', fr: 'Finales du pinyin' }, [
                letter('ai', 'ai', 'ai', '爱', meanings('love', '爱', 'сүйүү', 'любовь', 'amour'), { pronunciation: 'like eye' }),
                letter('ao', 'ao', 'ao', '好', meanings('good', '好', 'жакшы', 'хорошо', 'bon'), { pronunciation: 'starts a then glides to o' }),
                letter('ou', 'ou', 'ou', '口', meanings('mouth', '口', 'ооз', 'рот', 'bouche'), { pronunciation: 'close to long O' }),
                letter('an', 'an', 'an', '安', meanings('peace', '安', 'тынчтык', 'мир', 'paix'), { pronunciation: 'open a plus n' }),
                letter('ang', 'ang', 'ang', '房', meanings('room', '房', 'бөлмө', 'комната', 'chambre'), { pronunciation: 'open a plus ng' }),
                letter('er', 'er', 'er', '二', meanings('two', '二', 'эки', 'два', 'deux'), { pronunciation: 'rhotic vowel with curled tongue' })
            ])
        ],
        words: [
            category('chinese-home-words', { en: 'Home Words', zh: '家庭生活词汇', ky: 'Үй сөздөрү', ru: 'Слова о доме', fr: 'Mots de la maison' }, [
                word('门', meanings('door', '门', 'эшик', 'дверь', 'porte'), { syllables: ['men'], sound: 'm', pronunciation: 'men2' }),
                word('窗户', meanings('window', '窗户', 'терезе', 'окно', 'fenetre'), { syllables: ['chuang', 'hu'], sound: 'ch', pronunciation: 'chuang1 hu4' }),
                word('厨房', meanings('kitchen', '厨房', 'ашкана', 'кухня', 'cuisine'), { syllables: ['chu', 'fang'], sound: 'ch', pronunciation: 'chu2 fang2' }),
                word('房间', meanings('room', '房间', 'бөлмө', 'комната', 'chambre'), { syllables: ['fang', 'jian'], sound: 'f', pronunciation: 'fang2 jian1' }),
                word('床', meanings('bed', '床', 'керебет', 'кровать', 'lit'), { syllables: ['chuang'], sound: 'ch', pronunciation: 'chuang2' }),
                word('桌子', meanings('table', '桌子', 'үстөл', 'стол', 'table'), { syllables: ['zhuo', 'zi'], sound: 'zh', pronunciation: 'zhuo1 zi5' })
            ]),
            category('chinese-weather-words', { en: 'Weather Words', zh: '天气词汇', ky: 'Аба ырайы сөздөрү', ru: 'Слова о погоде', fr: 'Mots de la meteo' }, [
                word('雨', meanings('rain', '雨', 'жамгыр', 'дождь', 'pluie'), { syllables: ['yu'], sound: 'y', pronunciation: 'yu3' }),
                word('雪', meanings('snow', '雪', 'кар', 'снег', 'neige'), { syllables: ['xue'], sound: 'x', pronunciation: 'xue3' }),
                word('云', meanings('cloud', '云', 'булут', 'облако', 'nuage'), { syllables: ['yun'], sound: 'y', pronunciation: 'yun2' }),
                word('风', meanings('wind', '风', 'шамал', 'ветер', 'vent'), { syllables: ['feng'], sound: 'f', pronunciation: 'feng1' }),
                word('天气', meanings('weather', '天气', 'аба ырайы', 'погода', 'meteo'), { syllables: ['tian', 'qi'], sound: 't', pronunciation: 'tian1 qi4' }),
                word('伞', meanings('umbrella', '伞', 'кол чатыр', 'зонт', 'parapluie'), { syllables: ['san'], sound: 's', pronunciation: 'san3' })
            ]),
            category('chinese-x-q-j-words', { en: 'X Q J Words', zh: 'x/q/j词汇', ky: 'x/q/j сөздөр', ru: 'Слова с x/q/j', fr: 'Mots avec x/q/j' }, [
                word('学校', meanings('school', '学校', 'мектеп', 'школа', 'ecole'), { syllables: ['xue', 'xiao'], sound: 'x', pronunciation: 'xue2 xiao4' }),
                word('下', meanings('down', '下', 'ылдый', 'вниз', 'bas'), { syllables: ['xia'], sound: 'x', pronunciation: 'xia4' }),
                word('桥', meanings('bridge', '桥', 'көпүрө', 'мост', 'pont'), { syllables: ['qiao'], sound: 'q', pronunciation: 'qiao2' }),
                word('请', meanings('please', '请', 'сураныч', 'пожалуйста', 's il vous plait'), { syllables: ['qing'], sound: 'q', pronunciation: 'qing3' }),
                word('家', meanings('home', '家', 'үй', 'дом', 'maison'), { syllables: ['jia'], sound: 'j', pronunciation: 'jia1' }),
                word('见', meanings('see; meet', '见', 'көрүү', 'видеть; встречать', 'voir; rencontrer'), { syllables: ['jian'], sound: 'j', pronunciation: 'jian4' })
            ]),
            category('chinese-zh-sh-plus-words', { en: 'ZH SH Plus', zh: 'zh/sh加强词汇', ky: 'zh/sh кошумча сөздөр', ru: 'Дополнительные слова с zh/sh', fr: 'Mots supplementaires avec zh/sh' }, [
                word('老师', meanings('teacher', '老师', 'мугалим', 'учитель', 'professeur'), { syllables: ['lao', 'shi'], sound: 'sh', pronunciation: 'lao3 shi1' }),
                word('中文', meanings('Chinese language', '中文', 'кытай тили', 'китайский язык', 'chinois'), { syllables: ['zhong', 'wen'], sound: 'zh', pronunciation: 'zhong1 wen2' }),
                word('书', meanings('book', '书', 'китеп', 'книга', 'livre'), { syllables: ['shu'], sound: 'sh', pronunciation: 'shu1' }),
                word('纸', meanings('paper', '纸', 'кагаз', 'бумага', 'papier'), { syllables: ['zhi'], sound: 'zh', pronunciation: 'zhi3' }),
                word('树', meanings('tree', '树', 'дарак', 'дерево', 'arbre'), { syllables: ['shu'], sound: 'sh', pronunciation: 'shu4' }),
                word('这', meanings('this', '这', 'бул', 'это', 'ceci'), { syllables: ['zhe'], sound: 'zh', pronunciation: 'zhe4' })
            ]),
            category('chinese-third-tone-sandhi-words', { en: 'Third Tone Flow', zh: '第三声连读词汇', ky: 'Үчүнчү тон агымы сөздөрү', ru: 'Слова на поток третьего тона', fr: 'Mots flux du troisieme ton' }, [
                word('很好', meanings('very good', '很好', 'абдан жакшы', 'очень хорошо', 'tres bien'), { syllables: ['hen', 'hao'], sound: 'h', pronunciation: 'hen3 hao3 with tone change in speech' }),
                word('可以', meanings('can; may', '可以', 'болот', 'можно', 'pouvoir'), { syllables: ['ke', 'yi'], sound: 'k', pronunciation: 'ke3 yi3' }),
                word('小雨', meanings('light rain', '小雨', 'майда жамгыр', 'небольшой дождь', 'petite pluie'), { syllables: ['xiao', 'yu'], sound: 'x', pronunciation: 'xiao3 yu3' }),
                word('老虎', meanings('tiger', '老虎', 'жолборс', 'тигр', 'tigre'), { syllables: ['lao', 'hu'], sound: 'l', pronunciation: 'lao3 hu3' }),
                word('雨伞', meanings('umbrella', '雨伞', 'кол чатыр', 'зонт', 'parapluie'), { syllables: ['yu', 'san'], sound: 'y', pronunciation: 'yu3 san3' }),
                word('水果', meanings('fruit', '水果', 'жемиш', 'фрукт', 'fruit'), { syllables: ['shui', 'guo'], sound: 'sh', pronunciation: 'shui3 guo3' })
            ]),
            category('chinese-special-sounds-words', { en: 'Special Sounds Words', zh: '特殊发音词汇', ky: 'Өзгөчө тыбыш сөздөрү', ru: 'Слова с особыми звуками', fr: 'Mots avec sons speciaux' }, [
                word('四', meanings('four', '四', 'төрт', 'четыре', 'quatre'), { syllables: ['si'], sound: 's', pronunciation: 'si4' }),
                word('只', meanings('measure word for animals', '只', 'жаныбарларга санак сөзү', 'счетное слово для животных', 'classificateur animal'), { syllables: ['zhi'], sound: 'zh', pronunciation: 'zhi1' }),
                word('菜', meanings('vegetable dish', '菜', 'тамак; жашылча тамак', 'овощное блюдо', 'plat de legumes'), { syllables: ['cai'], sound: 'c', pronunciation: 'cai4' }),
                word('吃', meanings('eat', '吃', 'жеш', 'есть', 'manger'), { syllables: ['chi'], sound: 'ch', pronunciation: 'chi1' }),
                word('热', meanings('hot', '热', 'ысык', 'горячий', 'chaud'), { syllables: ['re'], sound: 'r', pronunciation: 're4' }),
                word('春', meanings('spring', '春', 'жаз', 'весна', 'printemps'), { syllables: ['chun'], sound: 'ch', pronunciation: 'chun1' })
            ])
        ],
        phrases: [
            category('chinese-home-phrases', { en: 'Home Phrases', zh: '家庭生活短语', ky: 'Үй фразалары', ru: 'Фразы о доме', fr: 'Phrases de la maison' }, [
                phrase('请开门', meanings('please open the door', '请开门', 'эшикти ачыңызчы', 'пожалуйста, откройте дверь', 'ouvrez la porte, s il vous plait'), { pronunciation: 'qing3 kai1 men2' }),
                phrase('窗户关着', meanings('the window is closed', '窗户关着', 'терезе жабык', 'окно закрыто', 'la fenetre est fermee'), { pronunciation: 'chuang1 hu4 guan1 zhe' }),
                phrase('我在厨房', meanings('I am in the kitchen', '我在厨房', 'мен ашканадамын', 'я на кухне', 'je suis dans la cuisine'), { pronunciation: 'wo3 zai4 chu2 fang2' }),
                phrase('书在桌子上', meanings('the book is on the table', '书在桌子上', 'китеп үстөлдө', 'книга на столе', 'le livre est sur la table'), { pronunciation: 'shu1 zai4 zhuo1 zi5 shang4' }),
                phrase('请坐在椅子上', meanings('please sit on the chair', '请坐在椅子上', 'отургучка отуруңузчу', 'сядьте на стул, пожалуйста', 'asseyez-vous sur la chaise, s il vous plait'), { pronunciation: 'qing3 zuo4 zai4 yi3 zi5 shang4' }),
                phrase('房间很安静', meanings('the room is quiet', '房间很安静', 'бөлмө тынч', 'в комнате тихо', 'la chambre est calme'), { pronunciation: 'fang2 jian1 hen3 an1 jing4' })
            ]),
            category('chinese-school-day-phrases', { en: 'School Day Phrases', zh: '上学日短语', ky: 'Мектеп күнү фразалары', ru: 'Фразы о школьном дне', fr: 'Phrases de la journee scolaire' }, [
                phrase('我早早去学校', meanings('I go to school early', '我早早去学校', 'мен мектепке эрте барам', 'я рано иду в школу', 'je vais tot a l ecole'), { pronunciation: 'wo3 zao3 zao3 qu4 xue2 xiao4' }),
                phrase('现在开始上课', meanings('class starts now', '现在开始上课', 'сабак азыр башталат', 'урок начинается сейчас', 'le cours commence maintenant'), { pronunciation: 'xian4 zai4 kai1 shi3 shang4 ke4' }),
                phrase('我们一起读书', meanings('we read together', '我们一起读书', 'биз чогуу окуйбуз', 'мы читаем вместе', 'nous lisons ensemble'), { pronunciation: 'wo3 men yi4 qi3 du2 shu1' }),
                phrase('我在本子上写字', meanings('I write in my notebook', '我在本子上写字', 'дептериме жазам', 'я пишу в тетради', 'j ecris dans mon cahier'), { pronunciation: 'wo3 zai4 ben3 zi5 shang4 xie3 zi4' }),
                phrase('今天的课很有趣', meanings('today s lesson is interesting', '今天的课很有趣', 'бүгүнкү сабак кызыктуу', 'сегодняшний урок интересный', 'la lecon d aujourd hui est interessante'), { pronunciation: 'jin1 tian1 de ke4 hen3 you3 qu4' }),
                phrase('放学后我回家', meanings('I go home after school', '放学后我回家', 'сабактан кийин үйгө кайтам', 'после школы я иду домой', 'je rentre a la maison apres l ecole'), { pronunciation: 'fang4 xue2 hou4 wo3 hui2 jia1' })
            ]),
            category('chinese-x-q-j-phrases', { en: 'X Q J Phrases', zh: 'x/q/j短语', ky: 'x/q/j фразалар', ru: 'Фразы с x/q/j', fr: 'Phrases avec x/q/j' }, [
                phrase('请去学校', meanings('please go to school', '请去学校', 'мектепке барыңызчы', 'пожалуйста, идите в школу', 'allez a l ecole, s il vous plait'), { pronunciation: 'qing3 qu4 xue2 xiao4' }),
                phrase('今天下雪', meanings('it is snowing today', '今天下雪', 'бүгүн кар жаап жатат', 'сегодня идет снег', 'il neige aujourd hui'), { pronunciation: 'jin1 tian1 xia4 xue3' }),
                phrase('桥就在前面', meanings('the bridge is just ahead', '桥就在前面', 'көпүрө алдыда эле', 'мост прямо впереди', 'le pont est juste devant'), { pronunciation: 'qiao2 jiu4 zai4 qian2 mian4' }),
                phrase('请给我一支笔', meanings('please give me a pen', '请给我一支笔', 'мага калем бериңизчи', 'дайте мне ручку, пожалуйста', 'donnez-moi un stylo, s il vous plait'), { pronunciation: 'qing3 gei3 wo3 yi4 zhi1 bi3' }),
                phrase('今天见老师', meanings('I see the teacher today', '今天见老师', 'бүгүн мугалимди көрөм', 'сегодня я вижу учителя', 'je vois le professeur aujourd hui'), { pronunciation: 'jin1 tian1 jian4 lao3 shi1' }),
                phrase('家就在学校前面', meanings('the house is in front of the school', '家就在学校前面', 'үй мектептин алдында', 'дом перед школой', 'la maison est devant l ecole'), { pronunciation: 'jia1 jiu4 zai4 xue2 xiao4 qian2 mian4' })
            ]),
            category('chinese-zh-sh-plus-phrases', { en: 'ZH SH Plus', zh: 'zh/sh加强短语', ky: 'zh/sh кошумча фразалар', ru: 'Дополнительные фразы с zh/sh', fr: 'Phrases supplementaires avec zh/sh' }, [
                phrase('老师说中文', meanings('the teacher speaks Chinese', '老师说中文', 'мугалим кытайча сүйлөйт', 'учитель говорит по-китайски', 'le professeur parle chinois'), { pronunciation: 'lao3 shi1 shuo1 zhong1 wen2' }),
                phrase('这本书很好', meanings('this book is very good', '这本书很好', 'бул китеп абдан жакшы', 'эта книга очень хорошая', 'ce livre est tres bon'), { pronunciation: 'zhe4 ben3 shu1 hen3 hao3' }),
                phrase('谁住在这里？', meanings('who lives here?', '谁住在这里？', 'бул жерде ким жашайт?', 'кто живет здесь?', 'qui habite ici ?'), { pronunciation: 'shei2 zhu4 zai4 zhe4 li3' }),
                phrase('叔叔正在找车', meanings('uncle is looking for the car', '叔叔正在找车', 'байке машинаны издеп жатат', 'дядя ищет машину', 'l oncle cherche la voiture'), { pronunciation: 'shu1 shu zheng4 zai4 zhao3 che1' }),
                phrase('这张纸是湿的', meanings('this sheet of paper is wet', '这张纸是湿的', 'бул кагаз нымдуу', 'этот лист бумаги мокрый', 'cette feuille est mouillee'), { pronunciation: 'zhe4 zhang1 zhi3 shi4 shi1 de' }),
                phrase('我认识这位老师', meanings('I know this teacher', '我认识这位老师', 'мен бул мугалимди тааныйм', 'я знаю этого учителя', 'je connais ce professeur'), { pronunciation: 'wo3 ren4 shi zhe4 wei4 lao3 shi1' })
            ]),
            category('chinese-third-tone-sandhi-phrases', { en: 'Third Tone Flow', zh: '第三声连读短语', ky: 'Үчүнчү тон агымы', ru: 'Фразы на течение третьего тона', fr: 'Phrases fluides au troisieme ton' }, [
                phrase('我很好', meanings('I am very well', '我很好', 'мен абдан жакшымын', 'я очень хорошо', 'je vais tres bien'), { pronunciation: 'wo3 hen3 hao3; middle tone changes in flow' }),
                phrase('你想买伞吗？', meanings('do you want to buy an umbrella?', '你想买伞吗？', 'кол чатыр сатып алгың келеби?', 'ты хочешь купить зонт?', 'veux-tu acheter un parapluie ?'), { pronunciation: 'ni3 xiang3 mai3 san3 ma; many third tones together' }),
                phrase('小雨也很好', meanings('light rain is also nice', '小雨也很好', 'майда жамгыр да жакшы', 'небольшой дождь тоже хороший', 'la petite pluie est aussi agreable'), { pronunciation: 'xiao3 yu3 ye3 hen3 hao3' }),
                phrase('我想有两把椅子', meanings('I want to have two chairs', '我想有两把椅子', 'эки отургуч болгум келет', 'я хочу иметь два стула', 'je veux avoir deux chaises'), { pronunciation: 'wo3 xiang3 you3 liang3 ba3 yi3 zi5' }),
                phrase('你可以晚一点来', meanings('you can come a little later', '你可以晚一点来', 'сен бир аз кечирээк келсең болот', 'ты можешь прийти немного позже', 'tu peux venir un peu plus tard'), { pronunciation: 'ni3 ke3 yi3 wan3 yi4 dian3 lai2' }),
                phrase('老虎跑得很远', meanings('the tiger ran very far', '老虎跑得很远', 'жолборс абдан алыска чуркады', 'тигр убежал очень далеко', 'le tigre a couru tres loin'), { pronunciation: 'lao3 hu3 pao3 de hen3 yuan3' })
            ]),
            category('chinese-special-sounds-phrases', { en: 'Special Sounds Phrases', zh: '特殊发音短语', ky: 'Өзгөчө тыбыш фразалар', ru: 'Фразы с особыми звуками', fr: 'Phrases avec sons speciaux' }, [
                phrase('四只小刺猬', meanings('four little hedgehogs', '四只小刺猬', 'төрт кичинекей кирпи', 'четыре маленьких ежа', 'quatre petits herissons'), { pronunciation: 'si4 zhi1 xiao3 ci4 wei4; contrast s, zh, c' }),
                phrase('早上去菜市场', meanings('go to the vegetable market in the morning', '早上去菜市场', 'эртең менен базарга бар', 'утром идти на овощной рынок', 'aller au marche le matin'), { pronunciation: 'zao3 shang4 qu4 cai4 shi4 chang3' }),
                phrase('热水在这儿', meanings('the hot water is here', '热水在这儿', 'ысык суу бул жерде', 'горячая вода здесь', 'l eau chaude est ici'), { pronunciation: 're4 shui3 zai4 zher4; practice retroflex er sound' }),
                phrase('请吃这个水果', meanings('please eat this fruit', '请吃这个水果', 'бул жемишти жегиле', 'пожалуйста, съешь этот фрукт', 'mange ce fruit, s il te plait'), { pronunciation: 'qing3 chi1 zhe4 ge shui3 guo3' }),
                phrase('司机认识老师', meanings('the driver knows the teacher', '司机认识老师', 'айдоочу мугалимди тааныйт', 'водитель знает учителя', 'le chauffeur connait le professeur'), { pronunciation: 'si1 ji1 ren4 shi lao3 shi1' }),
                phrase('春天常常下雨', meanings('it often rains in spring', '春天常常下雨', 'жазында көп жамгыр жаайт', 'весной часто идет дождь', 'il pleut souvent au printemps'), { pronunciation: 'chun1 tian1 chang2 chang2 xia4 yu3' })
            ])
        ]
    },
    fr: {
        letters: [
            category('french-vowel-combos', { en: 'French Vowel Combos', zh: '法语元音组合', ky: 'Французча үндүү айкаштар', ru: 'Французские гласные сочетания', fr: 'Combinaisons de voyelles' }, [
                letter('OU', 'ou', 'ou', 'roue', meanings('wheel', '轮子', 'дөңгөлөк', 'колесо', 'roue'), { pronunciation: 'clear OO sound' }),
                letter('U', 'u', 'u', 'lune', meanings('moon', '月亮', 'ай', 'луна', 'lune'), { pronunciation: 'front rounded French u' }),
                letter('EU', 'eu', 'eu', 'feu', meanings('fire', '火', 'от', 'огонь', 'feu'), { pronunciation: 'rounded EU sound' }),
                letter('OI', 'oi', 'oi', 'moi', meanings('me', '我', 'мен', 'я', 'moi'), { pronunciation: 'WA sound' }),
                letter('ON', 'on nasal', 'on', 'nom', meanings('name', '名字', 'ат', 'имя', 'nom'), { pronunciation: 'nasal ON without full N' }),
                letter('AN', 'an nasal', 'an', 'blanc', meanings('white', '白色', 'ак', 'белый', 'blanc'), { pronunciation: 'nasal AN sound' })
            ]),
            category('french-consonant-sounds', { en: 'French Consonant Sounds', zh: '法语辅音发音', ky: 'Французча үнсүз тыбыштар', ru: 'Французские согласные звуки', fr: 'Sons consonantiques' }, [
                letter('R', 'r', 'r', 'rouge', meanings('red', '红色', 'кызыл', 'красный', 'rouge'), { pronunciation: 'French throat R' }),
                letter('J', 'j', 'j', 'jour', meanings('day', '天', 'күн', 'день', 'jour'), { pronunciation: 'ZH sound as in measure' }),
                letter('CH', 'ch', 'ch', 'chat', meanings('cat', '猫', 'мышык', 'кот', 'chat'), { pronunciation: 'SH sound' }),
                letter('GN', 'gn', 'gn', 'montagne', meanings('mountain', '山', 'тоо', 'гора', 'montagne'), { pronunciation: 'NY sound like canyon' }),
                letter('ILL', 'ill', 'ill', 'fille', meanings('girl', '女孩', 'кыз', 'девочка', 'fille'), { pronunciation: 'often Y sound' }),
                letter('H', 'silent h', '-', 'hotel', meanings('hotel', '旅馆', 'мейманкана', 'отель', 'hotel'), { pronunciation: 'usually silent in French' })
            ])
        ],
        words: [
            category('french-home-words', { en: 'Home Words', zh: '家庭生活词汇', ky: 'Үй сөздөрү', ru: 'Слова о доме', fr: 'Mots de la maison' }, [
                word('porte', meanings('door', '门', 'эшик', 'дверь', 'porte'), { syllables: ['porte'], sound: 'p', pronunciation: 'port' }),
                word('fenetre', meanings('window', '窗户', 'терезе', 'окно', 'fenetre'), { syllables: ['fe', 'netre'], sound: 'f', pronunciation: 'fuh-NETR' }),
                word('cuisine', meanings('kitchen', '厨房', 'ашкана', 'кухня', 'cuisine'), { syllables: ['cui', 'sine'], sound: 'k', pronunciation: 'kwee-ZEEN' }),
                word('chambre', meanings('room', '房间', 'бөлмө', 'комната', 'chambre'), { syllables: ['chambre'], sound: 'sh', pronunciation: 'shahmbr' }),
                word('lit', meanings('bed', '床', 'керебет', 'кровать', 'lit'), { syllables: ['lit'], sound: 'l', pronunciation: 'lee' }),
                word('table', meanings('table', '桌子', 'үстөл', 'стол', 'table'), { syllables: ['table'], sound: 't', pronunciation: 'tabl' })
            ]),
            category('french-weather-words', { en: 'Weather Words', zh: '天气词汇', ky: 'Аба ырайы сөздөрү', ru: 'Слова о погоде', fr: 'Mots de la meteo' }, [
                word('pluie', meanings('rain', '雨', 'жамгыр', 'дождь', 'pluie'), { syllables: ['pluie'], sound: 'pl', pronunciation: 'plwee' }),
                word('neige', meanings('snow', '雪', 'кар', 'снег', 'neige'), { syllables: ['neige'], sound: 'n', pronunciation: 'nehzh' }),
                word('nuage', meanings('cloud', '云', 'булут', 'облако', 'nuage'), { syllables: ['nua', 'ge'], sound: 'n', pronunciation: 'nü-AZH' }),
                word('vent', meanings('wind', '风', 'шамал', 'ветер', 'vent'), { syllables: ['vent'], sound: 'v', pronunciation: 'vahn' }),
                word('orage', meanings('storm', '暴风雨', 'бороон', 'гроза', 'orage'), { syllables: ['o', 'rage'], sound: 'o', pronunciation: 'oh-RAZH' }),
                word('parapluie', meanings('umbrella', '雨伞', 'кол чатыр', 'зонт', 'parapluie'), { syllables: ['pa', 'ra', 'pluie'], sound: 'p', pronunciation: 'pa-ra-PLWEE' })
            ]),
            category('french-ou-sound-words', { en: 'OU Sound Words', zh: 'ou音词汇', ky: 'ou тыбыштуу сөздөр', ru: 'Слова со звуком OU', fr: 'Mots avec le son OU' }, [
                word('roue', meanings('wheel', '轮子', 'дөңгөлөк', 'колесо', 'roue'), { syllables: ['roue'], sound: 'r', pronunciation: 'roo' }),
                word('loup', meanings('wolf', '狼', 'карышкыр', 'волк', 'loup'), { syllables: ['loup'], sound: 'l', pronunciation: 'loo' }),
                word('jour', meanings('day', '天', 'күн', 'день', 'jour'), { syllables: ['jour'], sound: 'j', pronunciation: 'zhoor' }),
                word('bonjour', meanings('hello', '你好', 'салам', 'здравствуйте', 'bonjour'), { syllables: ['bon', 'jour'], sound: 'j', pronunciation: 'bohn-ZHOOR' }),
                word('course', meanings('race; errand', '比赛；跑腿', 'жарыш; жумуш', 'гонка; поручение', 'course'), { syllables: ['course'], sound: 'k', pronunciation: 'koors' }),
                word('ouvrir', meanings('open', '打开', 'ачуу', 'открывать', 'ouvrir'), { syllables: ['ou', 'vrir'], sound: 'ou', pronunciation: 'oo-VREER' })
            ]),
            category('french-u-vs-ou-words', { en: 'French U vs OU Words', zh: '法语U和OU对比词汇', ky: 'Французча U жана OU айырма сөздөр', ru: 'Слова на U и OU', fr: 'Mots contraste U et OU' }, [
                word('tu', meanings('you', '你', 'сен', 'ты', 'tu'), { syllables: ['tu'], sound: 'u', pronunciation: 'front rounded U' }),
                word('tout', meanings('all', '所有', 'баары', 'все', 'tout'), { syllables: ['tout'], sound: 'ou', pronunciation: 'clear OU sound' }),
                word('rue', meanings('street', '街道', 'көчө', 'улица', 'rue'), { syllables: ['rue'], sound: 'u', pronunciation: 'French U after R' }),
                word('roue', meanings('wheel', '轮子', 'дөңгөлөк', 'колесо', 'roue'), { syllables: ['roue'], sound: 'ou', pronunciation: 'OO in roue' }),
                word('lune', meanings('moon', '月亮', 'ай', 'луна', 'lune'), { syllables: ['lune'], sound: 'u', pronunciation: 'front rounded U in lune' }),
                word('rouge', meanings('red', '红色', 'кызыл', 'красный', 'rouge'), { syllables: ['rouge'], sound: 'ou', pronunciation: 'OU in rouge before French G' })
            ]),
            category('french-eu-sound-words', { en: 'French EU Sound Words', zh: '法语EU音词汇', ky: 'Французча EU тыбыштуу сөздөр', ru: 'Слова со звуком EU', fr: 'Mots avec le son EU' }, [
                word('feu', meanings('fire', '火', 'от', 'огонь', 'feu'), { syllables: ['feu'], sound: 'eu', pronunciation: 'closed EU sound' }),
                word('bleu', meanings('blue', '蓝色', 'көк', 'синий', 'bleu'), { syllables: ['bleu'], sound: 'eu', pronunciation: 'blend BL then EU' }),
                word('deux', meanings('two', '二', 'эки', 'два', 'deux'), { syllables: ['deux'], sound: 'eu', pronunciation: 'single EU vowel' }),
                word('jeu', meanings('game', '游戏', 'оюн', 'игра', 'jeu'), { syllables: ['jeu'], sound: 'eu', pronunciation: 'ZH plus EU' }),
                word('noeud', meanings('knot', '结', 'түйүн', 'узел', 'noeud'), { syllables: ['noeud'], sound: 'eu', pronunciation: 'rounded EU in noeud' }),
                word('heureux', meanings('happy', '高兴的', 'бактылуу', 'счастливый', 'heureux'), { syllables: ['heu', 'reux'], sound: 'eu', pronunciation: 'EU in both syllables' })
            ]),
            category('french-r-sound-plus-words', { en: 'French R Sound Plus', zh: '法语R音加强词汇', ky: 'Французча R тыбыштуу кошумча сөздөр', ru: 'Дополнительные слова со звуком R', fr: 'Mots supplementaires avec le son R' }, [
                word('rire', meanings('laugh', '笑', 'күлүү', 'смеяться', 'rire'), { syllables: ['rire'], sound: 'r', pronunciation: 'French throat R' }),
                word('regarder', meanings('look', '看', 'кароо', 'смотреть', 'regarder'), { syllables: ['re', 'gar', 'der'], sound: 'r', pronunciation: 'multiple French R sounds' }),
                word('route', meanings('road', '路', 'жол', 'дорога', 'route'), { syllables: ['route'], sound: 'r', pronunciation: 'French R plus OU' }),
                word('frere', meanings('brother', '兄弟', 'ага; ини', 'брат', 'frere'), { syllables: ['frere'], sound: 'r', pronunciation: 'blend FR with French R' }),
                word('arbre', meanings('tree', '树', 'дарак', 'дерево', 'arbre'), { syllables: ['ar', 'bre'], sound: 'r', pronunciation: 'R in middle cluster' }),
                word('train', meanings('train', '火车', 'поезд', 'поезд', 'train'), { syllables: ['train'], sound: 'r', pronunciation: 'TR blend with French R' })
            ])
        ],
        phrases: [
            category('french-home-phrases', { en: 'Home Phrases', zh: '家庭生活短语', ky: 'Үй фразалары', ru: 'Фразы о доме', fr: 'Phrases de la maison' }, [
                phrase('Ouvre la porte', meanings('open the door', '开门', 'эшикти ач', 'открой дверь', 'ouvre la porte'), { pronunciation: 'OOVR la port' }),
                phrase('La fenetre est fermee', meanings('the window is closed', '窗户关着', 'терезе жабык', 'окно закрыто', 'la fenetre est fermee'), { pronunciation: 'la fuh-NETR eh fair-MAY' }),
                phrase('Je suis dans la cuisine', meanings('I am in the kitchen', '我在厨房', 'мен ашканадамын', 'я на кухне', 'je suis dans la cuisine'), { pronunciation: 'zhuh swee dahn la kwee-ZEEN' }),
                phrase('Le livre est sur la table', meanings('the book is on the table', '书在桌子上', 'китеп үстөлдө', 'книга на столе', 'le livre est sur la table'), { pronunciation: 'luh leevr eh sur la tabl' }),
                phrase('Assieds-toi sur la chaise', meanings('sit on the chair', '坐在椅子上', 'отургучка отур', 'сядь на стул', 'assieds-toi sur la chaise'), { pronunciation: 'a-syay twa sur la shehz' }),
                phrase('La chambre est calme', meanings('the room is quiet', '房间很安静', 'бөлмө тынч', 'в комнате тихо', 'la chambre est calme'), { pronunciation: 'la shahmbr eh kalm' })
            ]),
            category('french-school-day-phrases', { en: 'School Day Phrases', zh: '上学日短语', ky: 'Мектеп күнү фразалары', ru: 'Фразы о школьном дне', fr: 'Phrases de la journee scolaire' }, [
                phrase('Je vais tot a l ecole', meanings('I go to school early', '我早早去学校', 'мен мектепке эрте барам', 'я рано иду в школу', 'je vais tot a l ecole'), { pronunciation: 'zhuh vay toh ta lay-KOL' }),
                phrase('Le cours commence maintenant', meanings('class starts now', '现在开始上课', 'сабак азыр башталат', 'урок начинается сейчас', 'le cours commence maintenant'), { pronunciation: 'luh koor ko-MAHNS man-teh-NAHN' }),
                phrase('Nous lisons ensemble', meanings('we read together', '我们一起读', 'биз чогуу окуйбуз', 'мы читаем вместе', 'nous lisons ensemble'), { pronunciation: 'noo lee-ZON ahn-SA MBL' }),
                phrase('J ecris dans mon cahier', meanings('I write in my notebook', '我在本子上写字', 'дептериме жазам', 'я пишу в тетради', 'j ecris dans mon cahier'), { pronunciation: 'zhay-KREE dahn mon ka-YAY' }),
                phrase('La lecon est interessante', meanings('the lesson is interesting', '课程很有趣', 'сабак кызыктуу', 'урок интересный', 'la lecon est interessante'), { pronunciation: 'la luh-SON eh an-tay-ray-SAHNT' }),
                phrase('Je rentre apres le cours', meanings('I go home after class', '下课后回家', 'сабактан кийин үйгө кайтам', 'я иду домой после урока', 'je rentre apres le cours'), { pronunciation: 'zhuh rahntr ah-PRAY luh koor' })
            ]),
            category('french-ou-sound-phrases', { en: 'OU Sound Phrases', zh: 'ou音短语', ky: 'ou тыбыштуу фразалар', ru: 'Фразы со звуком OU', fr: 'Phrases avec le son OU' }, [
                phrase('Bonjour tout le monde', meanings('hello everyone', '大家好', 'баарыңарга салам', 'здравствуйте все', 'bonjour tout le monde'), { pronunciation: 'repeat the OU sound in bonjour and tout' }),
                phrase('La roue tourne vite', meanings('the wheel turns fast', '轮子转得很快', 'дөңгөлөк тез айланат', 'колесо быстро крутится', 'la roue tourne vite'), { pronunciation: 'OO sound in roue and tourne' }),
                phrase('Le loup court', meanings('the wolf runs', '狼在跑', 'карышкыр чуркап жатат', 'волк бежит', 'le loup court'), { pronunciation: 'OU in loup and court' }),
                phrase('J ouvre la porte rouge', meanings('I open the red door', '我打开红门', 'кызыл эшикти ачам', 'я открываю красную дверь', 'j ouvre la porte rouge'), { pronunciation: 'OU in ouvre and rouge' }),
                phrase('Nous jouons dehors', meanings('we play outside', '我们在外面玩', 'биз сыртта ойнойбуз', 'мы играем снаружи', 'nous jouons dehors'), { pronunciation: 'OU in nous and jouons' }),
                phrase('Tu trouves la route', meanings('you find the road', '你找到路了', 'сен жолду таптың', 'ты находишь дорогу', 'tu trouves la route'), { pronunciation: 'OU sound repeated' })
            ]),
            category('french-u-vs-ou-phrases', { en: 'French U vs OU Phrases', zh: '法语U和OU对比短语', ky: 'Французча U жана OU айырма фразалар', ru: 'Фразы на U и OU', fr: 'Phrases contraste U et OU' }, [
                phrase('Tu joues ou tu lis ?', meanings('are you playing or reading?', '你是在玩还是在读书？', 'сен ойноп жатасынбы же окуп жатасынбы?', 'ты играешь или читаешь?', 'tu joues ou tu lis ?'), { pronunciation: 'contrast U in tu with OU in joues, ou' }),
                phrase('La rue touche la route', meanings('the street touches the road', '街道碰到公路', 'көчө жолго тийет', 'улица касается дороги', 'la rue touche la route'), { pronunciation: 'U in rue, OU in touche and route' }),
                phrase('Luc ouvre le four', meanings('Luc opens the oven', '吕克打开烤箱', 'Люк мешти ачат', 'Люк открывает печь', 'Luc ouvre le four'), { pronunciation: 'U in Luc, OU in ouvre and four' }),
                phrase('Une lune rouge roule', meanings('a red moon rolls', '一轮红月滚动', 'кызыл ай тоголонуп жатат', 'красная луна катится', 'une lune rouge roule'), { pronunciation: 'U in lune, OU in rouge and roule' }),
                phrase('Tu peux jouer dehors', meanings('you can play outside', '你可以在外面玩', 'сен сыртта ойной аласың', 'ты можешь играть на улице', 'tu peux jouer dehors'), { pronunciation: 'U in tu, OU in jouer and dehors' }),
                phrase('La statue bouge peu', meanings('the statue moves a little', '雕像稍微动了一下', 'айкел бир аз кыймылдады', 'статуя немного двигается', 'la statue bouge peu'), { pronunciation: 'U in statue, OU in bouge' })
            ]),
            category('french-eu-sound-phrases', { en: 'French EU Sound Phrases', zh: '法语EU音短语', ky: 'Французча EU тыбыштуу фразалар', ru: 'Фразы со звуком EU', fr: 'Phrases avec le son EU' }, [
                phrase('Le feu est bleu', meanings('the fire is blue', '火是蓝色的', 'от көк түстө', 'огонь синий', 'le feu est bleu'), { pronunciation: 'repeat EU in feu and bleu' }),
                phrase('Je veux deux jeux', meanings('I want two games', '我想要两个游戏', 'мен эки оюн каалайм', 'я хочу две игры', 'je veux deux jeux'), { pronunciation: 'EU sound in veux, deux, jeux' }),
                phrase('Le professeur est heureux', meanings('the teacher is happy', '老师很高兴', 'мугалим бактылуу', 'учитель счастлив', 'le professeur est heureux'), { pronunciation: 'EU in professeur and heureux' }),
                phrase('Peu de choses bougent', meanings('few things move', '很少东西会动', 'аз нерсе кыймылдайт', 'немногие вещи движутся', 'peu de choses bougent'), { pronunciation: 'EU in peu; compare with OU in bougent' }),
                phrase('Le noeud est solide', meanings('the knot is strong', '这个结很牢固', 'түйүн бекем', 'узел крепкий', 'le noeud est solide'), { pronunciation: 'EU sound in noeud' }),
                phrase('Deux petits oeufs', meanings('two little eggs', '两个小鸡蛋', 'эки кичинекей жумуртка', 'два маленьких яйца', 'deux petits oeufs'), { pronunciation: 'EU in deux and oeufs' })
            ]),
            category('french-liaison-phrases', { en: 'French Liaison Phrases', zh: '法语连诵短语', ky: 'Французча байланышкан айтылыш фразалар', ru: 'Фразы на liaison', fr: 'Phrases de liaison' }, [
                phrase('Les amis arrivent', meanings('the friends are arriving', '朋友们来了', 'достор келип жатышат', 'друзья прибывают', 'les amis arrivent'), { pronunciation: 'liaison: lez-ami' }),
                phrase('Nous avons un ami', meanings('we have a friend', '我们有一个朋友', 'бизде дос бар', 'у нас есть друг', 'nous avons un ami'), { pronunciation: 'liaison after nous and un' }),
                phrase('Ils ont une classe', meanings('they have a class', '他们有一个班级', 'алардын классы бар', 'у них есть класс', 'ils ont une classe'), { pronunciation: 'liaison: il-zon' }),
                phrase('Petit enfant ici', meanings('little child here', '小孩子在这里', 'кичинекей бала бул жерде', 'маленький ребенок здесь', 'petit enfant ici'), { pronunciation: 'link the final t in petit to enfant' }),
                phrase('Grand hotel ouvert', meanings('big hotel open', '大旅馆开着', 'чоң мейманкана ачык', 'большой отель открыт', 'grand hotel ouvert'), { pronunciation: 'light link before hotel and ouvert' }),
                phrase('Vous etes en avance', meanings('you are early', '你们来早了', 'силер эрте келдинер', 'вы пришли рано', 'vous etes en avance'), { pronunciation: 'liaison: vou-zet' })
            ])
        ]
    }
};

CONTENT_BONUSES.ru.words.push(createJobsCategory('ru', 'russian'));
CONTENT_BONUSES.ru.words.push(createSharedWordCategory('ru', 'russian-numbers-words', NUMBERS_CATEGORY_LABEL, NUMBER_WORDS));
CONTENT_BONUSES.ru.words.push(createSharedWordCategory('ru', 'russian-shapes-words', SHAPES_CATEGORY_LABEL, SHAPE_WORDS));
CONTENT_BONUSES.ru.phrases.push(createSharedPhraseCategory('ru', 'russian-idioms-phrases', IDIOMS_CATEGORY_LABEL, IDIOM_PHRASES));
CONTENT_BONUSES.en.words.push(createJobsCategory('en', 'english'));
CONTENT_BONUSES.en.words.push(createSharedWordCategory('en', 'english-numbers-words', NUMBERS_CATEGORY_LABEL, NUMBER_WORDS));
CONTENT_BONUSES.en.words.push(createSharedWordCategory('en', 'english-shapes-words', SHAPES_CATEGORY_LABEL, SHAPE_WORDS));
CONTENT_BONUSES.en.phrases.push(createSharedPhraseCategory('en', 'english-idioms-phrases', IDIOMS_CATEGORY_LABEL, IDIOM_PHRASES));
CONTENT_BONUSES.ky.words.push(createJobsCategory('ky', 'kyrgyz'));
CONTENT_BONUSES.ky.words.push(createSharedWordCategory('ky', 'kyrgyz-numbers-words', NUMBERS_CATEGORY_LABEL, NUMBER_WORDS));
CONTENT_BONUSES.ky.words.push(createSharedWordCategory('ky', 'kyrgyz-shapes-words', SHAPES_CATEGORY_LABEL, SHAPE_WORDS));
CONTENT_BONUSES.ky.phrases.push(createSharedPhraseCategory('ky', 'kyrgyz-idioms-phrases', IDIOMS_CATEGORY_LABEL, IDIOM_PHRASES));
CONTENT_BONUSES.zh.words.push(createJobsCategory('zh', 'chinese'));
CONTENT_BONUSES.zh.words.push(createSharedWordCategory('zh', 'chinese-numbers-words', NUMBERS_CATEGORY_LABEL, NUMBER_WORDS));
CONTENT_BONUSES.zh.words.push(createSharedWordCategory('zh', 'chinese-shapes-words', SHAPES_CATEGORY_LABEL, SHAPE_WORDS));
CONTENT_BONUSES.zh.phrases.push(createSharedPhraseCategory('zh', 'chinese-idioms-phrases', IDIOMS_CATEGORY_LABEL, IDIOM_PHRASES));
CONTENT_BONUSES.fr.words.push(createJobsCategory('fr', 'french'));
CONTENT_BONUSES.fr.words.push(createSharedWordCategory('fr', 'french-numbers-words', NUMBERS_CATEGORY_LABEL, NUMBER_WORDS));
CONTENT_BONUSES.fr.words.push(createSharedWordCategory('fr', 'french-shapes-words', SHAPES_CATEGORY_LABEL, SHAPE_WORDS));
CONTENT_BONUSES.fr.phrases.push(createSharedPhraseCategory('fr', 'french-idioms-phrases', IDIOMS_CATEGORY_LABEL, IDIOM_PHRASES));
