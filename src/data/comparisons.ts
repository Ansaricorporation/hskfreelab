/**
 * src/data/comparisons.ts
 * 
 * 15 High-CTR "Confusing Chinese Words" Comparison Guides.
 * Formatted for Google Position #0 (Featured Snippet), side-by-side tables,
 * common pitfall breakdowns (✅ vs ❌), interactive quizzes, and FAQPage schema.
 */

export interface ComparisonWordItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string;
  coreFunction: string;
}

export interface ComparisonTableRow {
  criteria: string;
  word1: string;
  word2: string;
  word3?: string;
}

export interface ComparisonRuleSection {
  heading: string;
  explanation: string;
  formula?: string;
  examples: Array<{
    zh: string;
    py: string;
    en: string;
    note?: string;
  }>;
}

export interface ComparisonMistake {
  incorrectZh: string;
  incorrectPy: string;
  correctZh: string;
  correctPy: string;
  en: string;
  explanation: string;
}

export interface ComparisonQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface ComparisonFAQ {
  q: string;
  a: string;
}

export interface ComparisonItem {
  slug: string;
  title: string;
  shortTitle: string;
  level: string;
  cefr: string;
  searchIntent: string;
  summary: string; // 1-2 sentence direct answer for Google Featured Snippet
  words: ComparisonWordItem[];
  table: ComparisonTableRow[];
  rules: ComparisonRuleSection[];
  mistakes: ComparisonMistake[];
  quiz: ComparisonQuizQuestion[];
  faq: ComparisonFAQ[];
  relatedWordSlugs: string[];
  relatedGrammarSlugs: string[];
}

export const comparisonsData: ComparisonItem[] = [
  // 1. 不 (bù) vs. 没 (méi)
  {
    slug: 'bu-vs-mei',
    title: '不 (bù) vs. 没 (méi): The Complete Chinese Negation Guide',
    shortTitle: '不 bù vs. 没 méi',
    level: 'HSK 1',
    cefr: 'A1',
    searchIntent: 'bu vs mei difference chinese grammar negation rules',
    summary: 'Use 不 (bù) to negate present intentions, future actions, habits, or adjectives (e.g. 我不去 "I will not go"). Use 没 (méi) to negate past actions, completed events, or possession with 有 (e.g. 我没去 "I did not go", 没有 "do not have").',
    words: [
      {
        hanzi: '不',
        pinyin: 'bù',
        meaning: 'no, not (habitual/future/state)',
        partOfSpeech: 'Adverb',
        coreFunction: 'Negates present intentions, future plans, habitual actions, modal verbs, and adjectives.'
      },
      {
        hanzi: '没',
        pinyin: 'méi',
        meaning: 'not (past/completion/possession)',
        partOfSpeech: 'Adverb',
        coreFunction: 'Negates past actions, completed occurrences, and existence/possession (没有).'
      }
    ],
    table: [
      { criteria: 'Time Frame', word1: 'Present, Future, Timeless Truths', word2: 'Past Actions & Completion' },
      { criteria: 'Negating "To Have" (有)', word1: 'NEVER (不有 is strictly ungrammatical)', word2: 'MANDATORY (没有 = do not have / there is not)' },
      { criteria: 'Wants & Volition (想 / 要)', word1: 'Yes (不想 = do not want)', word2: 'Rare (refers only to lack of event)' },
      { criteria: 'Adjectives & States', word1: 'Yes (不高, 不好, 不对)', word2: 'Only relative change (没好 = not well yet)' },
      { criteria: 'Tone Sandhi', word1: 'Changes to 2nd tone (bú) before 4th tone', word2: 'Always 2nd tone (méi)' }
    ],
    rules: [
      {
        heading: '1. When to Use 不 (bù): Volition, Habits, and Future Plans',
        explanation: '不 indicates a subject’s unwillingness, refusal, habitual state, or unchanging fact. It is also used before adjectives and modal verbs like 会 (huì), 能 (néng), and 想 (xiǎng).',
        formula: 'Subject + 不 + Verb / Adjective / Modal',
        examples: [
          { zh: '我不吃肉。', py: 'Wǒ bù chī ròu.', en: 'I do not eat meat (habitual lifestyle choice).' },
          { zh: '他明天不来上班。', py: 'Tā míngtiān bù lái shàngbān.', en: 'He is not coming to work tomorrow (future intention).' },
          { zh: '今天天气不冷。', py: 'Jīntiān tiānqì bù lěng.', en: 'Today the weather is not cold (stative adjective).' }
        ]
      },
      {
        heading: '2. When to Use 没 (méi): Past Actions and Non-Occurrence',
        explanation: '没 is an objective factual report that an event did not happen in the past or has not yet taken place. It NEVER combines with 了 (le) for completed actions.',
        formula: 'Subject + 没(有) + Verb + Object (NO 了)',
        examples: [
          { zh: '昨天我没去学校。', py: 'Zuótiān wǒ méi qù xuéxiào.', en: 'Yesterday I did not go to school (past fact).' },
          { zh: '我还没吃晚饭。', py: 'Wǒ hái méi chī wǎnfàn.', en: 'I haven’t eaten dinner yet (not yet occurred).' },
          { zh: '他没有自行车。', py: 'Tā méiyǒu zìxíngchē.', en: 'He does not have a bicycle (possession negation).' }
        ]
      },
      {
        heading: '3. Crucial Contrast: 我不去 vs. 我没去',
        explanation: 'Comparing these two highlights the distinction between subjective willingness (不) and objective past fact (没).',
        examples: [
          { zh: '我不去开会。', py: 'Wǒ bù qù kāihuì.', en: 'I am not going to the meeting (I refuse or plan not to attend).' },
          { zh: '我没去开会。', py: 'Wǒ méi qù kāihuì.', en: 'I did not go to the meeting (factual statement about what happened).' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我昨天不买苹果。',
        incorrectPy: 'Wǒ zuótiān bù mǎi píngguǒ.',
        correctZh: '我昨天没买苹果。',
        correctPy: 'Wǒ zuótiān méi mǎi píngguǒ.',
        en: 'I did not buy apples yesterday.',
        explanation: 'Yesterday (昨天) denotes a past timeframe, requiring 没 (méi) rather than 不 (bù).'
      },
      {
        incorrectZh: '我没有去了。',
        incorrectPy: 'Wǒ méiyǒu qù le.',
        correctZh: '我没去。',
        correctPy: 'Wǒ méi qù.',
        en: 'I did not go.',
        explanation: 'Do not use completion 了 with 没(有). If an action did not occur, it cannot have a completion aspect marker.'
      },
      {
        incorrectZh: '我不要时间。',
        incorrectPy: 'Wǒ bù yào shíjiān.',
        correctZh: '我没有时间。',
        correctPy: 'Wǒ méiyǒu shíjiān.',
        en: 'I do not have time.',
        explanation: 'Possession is negated strictly with 没有. "不有" is never grammatical in Mandarin.'
      }
    ],
    quiz: [
      {
        question: 'Which word completes the past sentence: "我昨天____看见他。"?',
        options: ['不', '没', '别', '未'],
        answer: 1,
        explanation: 'Because 昨天 (yesterday) refers to past time, the correct negation adverb is 没 (méi).'
      },
      {
        question: 'How do you say "I am not a doctor" in Chinese?',
        options: ['我没是医生。', '我不医生。', '我不是医生。', '我没在医生。'],
        answer: 2,
        explanation: 'The equational copula 是 is always negated with 不 (不是), never 没.'
      },
      {
        question: 'What is wrong with "我没吃了早饭"?',
        options: ['早饭 must be before the verb', 'You cannot use 了 with 没', '没 must be replaced by 别', 'The sentence is actually correct'],
        answer: 1,
        explanation: 'When negating with 没, the completed action marker 了 must be dropped.'
      }
    ],
    faq: [
      {
        q: 'Can you ever say 不有 (bù yǒu) in Chinese?',
        a: 'No. "不有" is completely ungrammatical in Mandarin. The negation of 有 (yǒu) is always 没有 (méiyǒu).'
      },
      {
        q: 'How do I negate "I know" (知道)?',
        a: 'Use 不: 我不知道 (Wǒ bù zhīdào). 知道 describes a mental state rather than an completed event, so 不 is standard.'
      },
      {
        q: 'Why do we say 我没懂 instead of 我不懂?',
        a: '我不懂 means "I do not understand (as a general state)". 我没懂 means "I did not grasp or understand what was just said (a specific event)". Both are correct in different contexts.'
      }
    ],
    relatedWordSlugs: ['bu-not', 'meiyou'],
    relatedGrammarSlugs: ['negation-with-bu-and-mei']
  },

  // 2. 二 (èr) vs. 两 (liǎng)
  {
    slug: 'er-vs-liang',
    title: '二 (èr) vs. 两 (liǎng): Rules for Numbers & Measure Words',
    shortTitle: '二 èr vs. 两 liǎng',
    level: 'HSK 1',
    cefr: 'A1',
    searchIntent: 'er vs liang difference numbers measure words chinese',
    summary: 'Use 二 (èr) for abstract math, counting digits, telephone numbers, room numbers, and dates (e.g. 二月, 第二). Use 两 (liǎng) when expressing a quantity directly before a measure word or meaning "a couple of" (e.g. 两个人, 两本书).',
    words: [
      {
        hanzi: '二',
        pinyin: 'èr',
        meaning: 'two (ordinal / digits / counting)',
        partOfSpeech: 'Numeral',
        coreFunction: 'Used for counting numbers (1, 2, 3), phone numbers, mathematical calculations, and ordinal rankings (第二).'
      },
      {
        hanzi: '两',
        pinyin: 'liǎng',
        meaning: 'two, a pair (quantity before measure words)',
        partOfSpeech: 'Numeral',
        coreFunction: 'Used when quantifying nouns immediately preceding measure words (量词) or representing paired items.'
      }
    ],
    table: [
      { criteria: 'Counting (1, 2, 3...)', word1: '一、二、三', word2: 'Not used for basic counting' },
      { criteria: 'Before Measure Words (量词)', word1: 'Never before standard measure words', word2: 'Mandatory (两个人, 两只猫)' },
      { criteria: 'Ordinal Numbers (2nd)', word1: '第二 (dì-èr)', word2: 'Never used for ordinals' },
      { criteria: 'Large Numbers (Hundred / Thousand)', word1: '二百 (200), 二十 (20)', word2: '两百 (200), 两千 (2,000), 两万 (20,000)' },
      { criteria: 'Dates & Months', word1: '二月 (February), 二号 (2nd day)', word2: 'Never for calendar dates' }
    ],
    rules: [
      {
        heading: '1. Use 两 (liǎng) Before Measure Words',
        explanation: 'Whenever you specify "two of something" preceding a measure word like 个 (gè), 本 (běn), or 张 (zhāng), you must use 两.',
        formula: '两 + Measure Word + Noun',
        examples: [
          { zh: '我想买两本书。', py: 'Wǒ xiǎng mǎi liǎng běn shū.', en: 'I want to buy two books.' },
          { zh: '我们有两个孩子。', py: 'Wǒmen yǒu liǎng gè háizi.', en: 'We have two children.' },
          { zh: '请给我两杯水。', py: 'Qǐng gěi wǒ liǎng bēi shuǐ.', en: 'Please give me two cups of water.' }
        ]
      },
      {
        heading: '2. Use 二 (èr) for Digits, Phone Numbers, and Decimals',
        explanation: 'When reciting numerical codes, math equations, fractions, or floor and room numbers, use 二.',
        examples: [
          { zh: '房间号是二零二。', py: 'Fángjiān hào shì èr líng èr.', en: 'The room number is 202.' },
          { zh: '一加一等于二。', py: 'Yī jiā yī děngyú èr.', en: 'One plus one equals two.' },
          { zh: '这是第二课。', py: 'Zhè shì dì-èr kè.', en: 'This is lesson number two (the second lesson).' }
        ]
      },
      {
        heading: '3. Large Numbers: 二百 vs. 两百',
        explanation: 'For 200, both 二百 and 两百 are acceptable in spoken Chinese. However, for 2,000 (两千) and 20,000 (两万), 两 is standard.',
        examples: [
          { zh: '这本书两百块钱。', py: 'Zhè běn shū liǎng bǎi kuài qián.', en: 'This book costs 200 yuan.' },
          { zh: '这里有两千名学生。', py: 'Zhèlǐ yǒu liǎng qiān míng xuésheng.', en: 'There are two thousand students here.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我有二个哥哥。',
        incorrectPy: 'Wǒ yǒu èr gè gēge.',
        correctZh: '我有两个哥哥。',
        correctPy: 'Wǒ yǒu liǎng gè gēge.',
        en: 'I have two older brothers.',
        explanation: 'Before measure words like 个 (gè), use 两 (liǎng), never 二 (èr).'
      },
      {
        incorrectZh: '今天是对两名。',
        incorrectPy: 'Jīntiān shì duì liǎng míng.',
        correctZh: '今天是第二名。',
        correctPy: 'Jīntiān shì dì-èr míng.',
        en: 'Today is second place.',
        explanation: 'Ordinal positions (1st, 2nd, 3rd) always use 第 (dì) + 二 (èr).'
      }
    ],
    quiz: [
      {
        question: 'Fill in the blank: "桌子上有____本书。"',
        options: ['二', '两', '两本', '二个'],
        answer: 1,
        explanation: 'Before the measure word 本 (běn), the numeral for "two" is 两 (liǎng).'
      },
      {
        question: 'How do you say "February" in Chinese?',
        options: ['两月', '二月', '两期', '第二月'],
        answer: 1,
        explanation: 'Months are calendar names, which always use 二 (二月 = February).'
      },
      {
        question: 'Which of the following is correct for "22 people"?',
        options: ['两十二个人', '二十二个人', '两两各人', '二两各人'],
        answer: 1,
        explanation: 'In compound numbers (like 22), 20 is 二十 and the unit 2 is 二, so 二十二个人 is correct.'
      }
    ],
    faq: [
      {
        q: 'Do you say 两点 or 二点 for 2 o\'clock?',
        a: 'Always say 两点 (liǎng diǎn). 点 functions as a time measure word, so 两 is mandatory.'
      },
      {
        q: 'What about 22 (twenty-two)?',
        a: 'Say 二十二 (èrshí\'èr). In multi-digit compound numbers, tens and units keep 二.'
      }
    ],
    relatedWordSlugs: ['er-two', 'liang-two'],
    relatedGrammarSlugs: ['possession-particle-de']
  },

  // 3. 的 (de) vs. 得 (de) vs. 地 (de)
  {
    slug: 'de-particles-de-de-de',
    title: '的 vs. 得 vs. 地: The 3 Structural Particles in Chinese',
    shortTitle: '的 vs. 得 vs. 地',
    level: 'HSK 2-3',
    cefr: 'A2-B1',
    searchIntent: 'de de de particles chinese grammar difference 的 得 地',
    summary: 'All three are pronounced "de", but have completely different syntactic functions: 的 connects descriptions/possessors to NOUNS (白色的车); 得 connects verbs to COMPLEMENTS of degree or manner (跑得很快); and 地 connects adverbs to VERBS (慢慢地走).',
    words: [
      {
        hanzi: '的',
        pinyin: 'de',
        meaning: 'attributive / possessive particle',
        partOfSpeech: 'Particle',
        coreFunction: 'Placed before a NOUN: Modifier + 的 + Noun (e.g. 我的书, 漂亮的衣服).'
      },
      {
        hanzi: '得',
        pinyin: 'de',
        meaning: 'complement / degree particle',
        partOfSpeech: 'Particle',
        coreFunction: 'Placed after a VERB/ADJECTIVE: Verb + 得 + Complement (e.g. 做得很好, 跑得快).'
      },
      {
        hanzi: '地',
        pinyin: 'de',
        meaning: 'adverbial marker particle',
        partOfSpeech: 'Particle',
        coreFunction: 'Placed before a VERB: Adverb / Adjective + 地 + Verb (e.g. 认真地学习, 高兴地笑).'
      }
    ],
    table: [
      { criteria: 'Syntactic Position', word1: 'Before NOUNS', word2: 'After VERBS / ADJECTIVES', word3: 'Before VERBS' },
      { criteria: 'Core Role', word1: 'Possession & Adjective Description', word2: 'Degree & Manner Complement', word3: 'Adverbial Manner Modifier (-ly)' },
      { criteria: 'Golden Formula', word1: 'Modifier + 的 + Noun', word2: 'Verb + 得 + Degree', word3: 'Adjective + 地 + Action' },
      { criteria: 'Quick Memory Hook', word1: '白勺 的 (Target = Noun)', word2: '双人 得 (Result = Degree)', word3: '土也 地 (Earth = Ground for action)' }
    ],
    rules: [
      {
        heading: '1. 的 (de): Modifying Nouns and Signaling Possession',
        explanation: 'Whenever whatever precedes it is describing or owning a noun that follows, use 的.',
        formula: 'Possessor / Adjective Phrase + 的 + Noun',
        examples: [
          { zh: '这是老师的书。', py: 'Zhè shì lǎoshī de shū.', en: 'This is the teacher’s book (possession).' },
          { zh: '红色的苹果很甜。', py: 'Hóngsè de píngguǒ hěn tián.', en: 'Red apples are very sweet (noun modification).' }
        ]
      },
      {
        heading: '2. 得 (de): Describing How Well an Action Was Done',
        explanation: 'Use 得 to attach an evaluation or degree description to a preceding verb.',
        formula: 'Verb + 得 + Degree / Adjective Phrase',
        examples: [
          { zh: '她说汉语说得非常好。', py: 'Tā shuō Hànyǔ shuō de fēicháng hǎo.', en: 'She speaks Chinese extremely well.' },
          { zh: '小狗跑得真快。', py: 'Xiǎogǒu pǎo de zhēn kuài.', en: 'The puppy runs really fast.' }
        ]
      },
      {
        heading: '3. 地 (de): Modifying an Action with Manner (-ly)',
        explanation: 'Use 地 to turn an adjective into an adverb describing the mood or way an action is carried out.',
        formula: 'Manner / Adjective + 地 + Verb',
        examples: [
          { zh: '同学们认真地听课。', py: 'Tóngxuémen rènzhēn de tīngkè.', en: 'The students listen to the lesson attentively.' },
          { zh: '他飞快地跑出了教室。', py: 'Tā fēikuài de pǎo chū le jiàoshì.', en: 'He quickly ran out of the classroom.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '他跑的很快。',
        incorrectPy: 'Tā pǎo de hěn kuài.',
        correctZh: '他跑得很快。',
        correctPy: 'Tā pǎo de hěn kuài.',
        en: 'He runs very fast.',
        explanation: 'Because "runs" is a verb and "very fast" is an evaluation of degree, you must use 得, not 的.'
      },
      {
        incorrectZh: '她高兴的跳了起来。',
        incorrectPy: 'Tā gāoxìng de tiào le qǐlái.',
        correctZh: '她高兴地跳了起来。',
        correctPy: 'Tā gāoxìng de tiào le qǐlái.',
        en: 'She happily jumped up.',
        explanation: 'Because "happily" modifies the action "jumped", the adverbial marker 地 must be used.'
      }
    ],
    quiz: [
      {
        question: 'Which particle fits: "他说中文说____很流利。"?',
        options: ['的', '得', '地', '着'],
        answer: 1,
        explanation: 'Evaluating the performance of a verb (说) with degree (很流利) requires 得.'
      },
      {
        question: 'Which particle fits: "大家安静____坐着。"?',
        options: ['的', '得', '地', '过'],
        answer: 2,
        explanation: 'Describing how someone performs the action "sitting" (坐) requires the adverbial particle 地.'
      },
      {
        question: 'Which sentence uses the particles 100% correctly?',
        options: [
          '他开心的吃着妈妈买得苹果。',
          '他开心肠吃着妈妈买地苹果。',
          '他开心地吃着妈妈买的苹果。',
          '他开心得吃着妈妈买得苹果。'
        ],
        answer: 2,
        explanation: '开心地 modifies the action "eat" (地); 妈妈买的 modifies the noun "apples" (的).'
      }
    ],
    faq: [
      {
        q: 'Do native speakers mix up 的 and 得?',
        a: 'Yes! In informal texting, many native Chinese speakers carelessly type 的 for everything. However, in formal writing, HSK exams, and academia, differentiating 的, 得, and 地 is rigorously graded.'
      },
      {
        q: 'How are they pronounced?',
        a: 'In modern standard Mandarin, all three are pronounced with neutral tone: "de".'
      }
    ],
    relatedWordSlugs: ['de-possessive', 'de-degree', 'de-manner'],
    relatedGrammarSlugs: ['possession-particle-de', 'descriptive-complement-de', 'adverbial-manner-particle-de']
  },

  // 4. 会 (huì) vs. 能 (néng) vs. 可以 (kěyǐ)
  {
    slug: 'hui-vs-neng-vs-keyi',
    title: '会 (huì) vs. 能 (néng) vs. 可以 (kěyǐ): Expressing "Can" in Chinese',
    shortTitle: '会 vs. 能 vs. 可以',
    level: 'HSK 1-2',
    cefr: 'A1-A2',
    searchIntent: 'hui vs neng vs keyi chinese can modal verbs',
    summary: 'Use 会 (huì) for learned skills (游泳, 说中文) or future likelihood ("will happen"). Use 能 (néng) for physical capability or objective conditions. Use 可以 (kěyǐ) for permission ("may I?") or friendly suggestions.',
    words: [
      {
        hanzi: '会',
        pinyin: 'huì',
        meaning: 'can (know how through study); will',
        partOfSpeech: 'Modal Verb',
        coreFunction: 'Indicates an acquired ability learned through instruction or training, or future certainty.'
      },
      {
        hanzi: '能',
        pinyin: 'néng',
        meaning: 'can (physically capable / conditions allow)',
        partOfSpeech: 'Modal Verb',
        coreFunction: 'Indicates physical capacity, natural ability, or favorable objective circumstances.'
      },
      {
        hanzi: '可以',
        pinyin: 'kěyǐ',
        meaning: 'can (permitted / allowable / acceptable)',
        partOfSpeech: 'Modal Verb',
        coreFunction: 'Indicates social permission, rules, requests, or recommendations.'
      }
    ],
    table: [
      { criteria: 'Learned Skills (Swimming, Chinese)', word1: 'Mandatory (我会游泳)', word2: 'Not for learning', word3: 'Not for learning' },
      { criteria: 'Physical / Environmental Capacity', word1: 'No', word2: 'Mandatory (我今天能来)', word3: 'Permissible' },
      { criteria: 'Permission & Asking "May I?"', word1: 'No', word2: 'Informal request', word3: 'Mandatory (我可以坐这里吗？)' },
      { criteria: 'Future "Will happen"', word1: 'Mandatory (明天会下雨)', word2: 'No', word3: 'No' },
      { criteria: 'Negation', word1: '不会 (cannot / will not)', word2: '不能 (incapable / forbidden)', word3: '不可以 (strictly forbidden)' }
    ],
    rules: [
      {
        heading: '1. 会 (huì): Acquired Skills and Knowledge',
        explanation: 'If you had to practice, take lessons, or study to do something, use 会.',
        examples: [
          { zh: '你会开车吗？', py: 'Nǐ huì kāichē ma?', en: 'Can you drive a car? (Did you learn how?)' },
          { zh: '我会说一点儿汉语。', py: 'Wǒ huì shuō yīdiǎnr Hànyǔ.', en: 'I can speak a little Chinese.' }
        ]
      },
      {
        heading: '2. 能 (néng): Physical Capacity & Circumstances',
        explanation: 'Use 能 when circumstances, physical health, or availability dictate whether an action is possible.',
        examples: [
          { zh: '我生病了，今天不能去上课。', py: 'Wǒ shēngbìng le, jīntiān bù néng qù shàngkè.', en: 'I am sick, so I cannot go to class today (physical limitation).' },
          { zh: '你能游一千米吗？', py: 'Nǐ néng yóu yīqiān mǐ ma?', en: 'Can you swim 1,000 meters? (Physical endurance challenge).' }
        ]
      },
      {
        heading: '3. 可以 (kěyǐ): Seeking or Granting Permission',
        explanation: 'When asking if something is allowed according to rules, etiquette, or social norms, use 可以.',
        examples: [
          { zh: '请问，我可以进来吗？', py: 'Qǐngwèn, wǒ kěyǐ jìnlái ma?', en: 'Excuse me, may I come in? (Seeking permission).' },
          { zh: '这里不可以吸烟。', py: 'Zhèlǐ bù kěyǐ xīyān.', en: 'Smoking is not allowed here.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我不会喝酒，因为我要开车。',
        incorrectPy: 'Wǒ bù huì hējiǔ, yīnwèi wǒ yào kāichē.',
        correctZh: '我不能喝酒，因为我要开车。',
        correctPy: 'Wǒ bù néng hējiǔ, yīnwèi wǒ yào kāichē.',
        en: 'I cannot drink alcohol because I have to drive.',
        explanation: 'You know how to drink alcohol biologically (so 不会 is inappropriate); the circumstances forbid it, so use 不能.'
      }
    ],
    quiz: [
      {
        question: 'Which modal completes: "你会游泳吗？我____，但我今天感冒了，____游。"',
        options: ['会...不能', '能...不会', '可以...不会', '会...不可以'],
        answer: 0,
        explanation: 'You learned the skill (会), but an illness physically prevents you today (不能).'
      },
      {
        question: 'Which word is best for asking a flight attendant: "____给我一杯水吗？"',
        options: ['会', '可以', '想', '要'],
        answer: 1,
        explanation: 'Asking politely for permission or service uses 可以 (kěyǐ).'
      },
      {
        question: 'How do you say "It will rain tomorrow" in Chinese?',
        options: ['明天能下雨。', '明天可以下雨。', '明天会下雨。', '明天要能下雨。'],
        answer: 2,
        explanation: 'Future probability ("will happen") is uniquely expressed with 会 (huì).'
      }
    ],
    faq: [
      {
        q: 'Can 能 and 可以 be used interchangeably when asking favors?',
        a: 'Yes, in sentences like 你能帮我吗？ and 你可以帮我吗？ both are natural and polite.'
      }
    ],
    relatedWordSlugs: ['hui-can', 'neng-can', 'keyi-can'],
    relatedGrammarSlugs: ['optative-verbs-neng-keyi']
  },

  // 5. 看 (kàn) vs. 见 (jiàn) vs. 看见 (kànjiàn)
  {
    slug: 'kan-vs-jian-vs-kanjian',
    title: '看 (kàn) vs. 见 (jiàn) vs. 看见 (kànjiàn): Look vs. See in Chinese',
    shortTitle: '看 vs. 见 vs. 看见',
    level: 'HSK 1-2',
    cefr: 'A1-A2',
    searchIntent: 'kan vs jian vs kanjian difference chinese look see',
    summary: '看 (kàn) is the deliberate action of looking, watching, or reading (e.g. 看书, 看电影). 见 (jiàn) is the perceptual result of meeting or perceiving. 看见 (kànjiàn) combines the action and the result: "to look and successfully see / catch sight of".',
    words: [
      {
        hanzi: '看',
        pinyin: 'kàn',
        meaning: 'to look, watch, read (action)',
        partOfSpeech: 'Verb',
        coreFunction: 'Focuses on the intentional action of directing one’s eyes; does not guarantee a successful result.'
      },
      {
        hanzi: '见',
        pinyin: 'jiàn',
        meaning: 'to see, meet, perceive (result)',
        partOfSpeech: 'Verb / Complement',
        coreFunction: 'Focuses on visual reception or meeting someone; commonly acts as a resultative complement.'
      },
      {
        hanzi: '看见',
        pinyin: 'kànjiàn',
        meaning: 'to see, spot, catch sight of (action + result)',
        partOfSpeech: 'Compound Verb',
        coreFunction: 'Explicitly states that one looked and successfully perceived the object.'
      }
    ],
    table: [
      { criteria: 'English Equivalent', word1: 'Look at / Watch / Read', word2: 'Perceive / Meet', word3: 'See / Catch sight of' },
      { criteria: 'Focus', word1: 'Action only', word2: 'Perceptual result', word3: 'Action + Successful outcome' },
      { criteria: 'Reading books / Watching movies', word1: '看书, 看电影 (Mandatory)', word2: 'Incorrect', word3: 'Incorrect' },
      { criteria: 'Meeting a person', word1: '去看朋友 (Visit)', word2: '见朋友, 明天见 (See you)', word3: '看见朋友 (Spotted a friend)' }
    ],
    rules: [
      {
        heading: '1. 看 (kàn): The Intentional Action',
        explanation: 'Use 看 for reading, watching, examining, or visiting.',
        examples: [
          { zh: '我在看电视。', py: 'Wǒ zài kàn diànshì.', en: 'I am watching television.' },
          { zh: '你看黑板！', py: 'Nǐ kàn hēibǎn!', en: 'Look at the blackboard!' }
        ]
      },
      {
        heading: '2. 看见 (kànjiàn): Successfully Seeing Something',
        explanation: 'When your eyes actually register an object, person, or scene, use 看见 (or 看到了).',
        examples: [
          { zh: '我看见你的钥匙在桌子上。', py: 'Wǒ kànjiàn nǐ de yàoshi zài zhuōzi shàng.', en: 'I see your keys on the table.' },
          { zh: '你看见王老师了吗？', py: 'Nǐ kànjiàn Wáng lǎoshī le ma?', en: 'Did you see Teacher Wang?' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我看很多鸟，但没看清楚。',
        incorrectPy: 'Wǒ kàn hěn duō niǎo, dàn méi kàn qīngchu.',
        correctZh: '我看见很多鸟，但没看清楚。',
        correctPy: 'Wǒ kànjiàn hěn duō niǎo, dàn méi kàn qīngchu.',
        en: 'I saw many birds, but did not see them clearly.',
        explanation: 'To report seeing an object, use the resultative compound 看见.'
      }
    ],
    quiz: [
      {
        question: 'Which phrase means "See you tomorrow"?',
        options: ['明天看', '明天看见', '明天见', '明天看了'],
        answer: 2,
        explanation: '见 (jiàn) is used for meeting or parting phrases like 明天见 (See you tomorrow).'
      },
      {
        question: 'Fill in: "我找了半天，终于____他了。"',
        options: ['看', '看见', '见着看', '看去'],
        answer: 1,
        explanation: 'Finally finding and seeing someone requires the resultative verb 看见 (kànjiàn).'
      },
      {
        question: 'How do you say "I am reading a book"?',
        options: ['我在见书。', '我在看见书。', '我在看书。', '我在想看书。'],
        answer: 2,
        explanation: 'Reading books is always 看书 (kàn shū).'
      }
    ],
    faq: [
      {
        q: 'Is 看到了 identical to 看见?',
        a: 'Yes, 看到了 and 看见 both mean "saw / caught sight of". 到 and 见 are interchangeable resultative complements here.'
      }
    ],
    relatedWordSlugs: ['kan-look', 'jian-meet'],
    relatedGrammarSlugs: ['statement-shi-identity']
  },

  // 6. 听 (tīng) vs. 听见 (tīngjiàn)
  {
    slug: 'ting-vs-tingjian',
    title: '听 (tīng) vs. 听见 (tīngjiàn): Listen vs. Hear in Chinese',
    shortTitle: '听 tīng vs. 听见 tīngjiàn',
    level: 'HSK 1-2',
    cefr: 'A1-A2',
    searchIntent: 'ting vs tingjian difference listen hear chinese',
    summary: '听 (tīng) is the intentional action of listening (e.g. 听音乐 "listen to music", 听课 "listen to lecture"). 听见 (tīngjiàn) or 听到 (tīngdào) is the result of hearing a sound with your ears.',
    words: [
      {
        hanzi: '听',
        pinyin: 'tīng',
        meaning: 'to listen (action)',
        partOfSpeech: 'Verb',
        coreFunction: 'Focuses on the effort or act of listening.'
      },
      {
        hanzi: '听见',
        pinyin: 'tīngjiàn',
        meaning: 'to hear (result)',
        partOfSpeech: 'Compound Verb',
        coreFunction: 'Focuses on sound waves reaching auditory comprehension.'
      }
    ],
    table: [
      { criteria: 'English Meaning', word1: 'To listen', word2: 'To hear' },
      { criteria: 'Listening to Music / Podcasts', word1: '听音乐, 听播客 (Mandatory)', word2: 'Incorrect' },
      { criteria: 'Hearing a Sound / Voice', word1: 'Can mean listen', word2: 'Mandatory (我听见了)' },
      { criteria: 'Negation', word1: '不听 (Refuses to listen)', word2: '没听见 (Did not hear / couldn’t hear)' }
    ],
    rules: [
      {
        heading: '1. 听 (tīng): Intentional Listening',
        explanation: 'Whenever you pay attention to audio, music, a speaker, or instructions, use 听.',
        examples: [
          { zh: '他喜欢听中国音乐。', py: 'Tā xǐhuan tīng Zhōngguó yīnyuè.', en: 'He likes listening to Chinese music.' },
          { zh: '请大家认真听。', py: 'Qǐng dàjiā rènzhēn tīng.', en: 'Everyone please listen carefully.' }
        ]
      },
      {
        heading: '2. 听见 (tīngjiàn): Auditory Perception',
        explanation: 'When a sound is detected by your ears, regardless of intention, use 听见.',
        examples: [
          { zh: '你听见外面的声音了吗？', py: 'Nǐ tīngjiàn wàimiàn de shēngyīn le ma?', en: 'Did you hear the noise outside?' },
          { zh: '对不起，我没听见你说什么。', py: 'Duìbuqǐ, wǒ méi tīngjiàn nǐ shuō shénme.', en: 'Sorry, I did not hear what you said.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我听音乐，但没听。',
        incorrectPy: 'Wǒ tīng yīnyuè, dàn méi tīng.',
        correctZh: '我在听，但是我没听见。',
        correctPy: 'Wǒ zài tīng, dànshì wǒ méi tīngjiàn.',
        en: 'I was listening, but I did not hear it.',
        explanation: 'Listening (听) does not guarantee hearing (听见).'
      }
    ],
    quiz: [
      {
        question: 'Which word fits: "声音太小了，我____。"?',
        options: ['不听', '没听见', '不听见', '听着'],
        answer: 1,
        explanation: 'When sound volume is too low, you are unable to hear it (没听见).'
      },
      {
        question: 'How do you say "listen to the teacher"?',
        options: ['听老师', '听见老师', '看见老师', '懂老师'],
        answer: 0,
        explanation: 'Following or listening to a teacher is 听老师 (tīng lǎoshī).'
      },
      {
        question: 'What is the synonym of 听见?',
        options: ['听懂', '听到', '听看', '听好'],
        answer: 1,
        explanation: '听到 (tīngdào) is completely synonymous with 听见 (tīngjiàn).'
      }
    ],
    faq: [
      {
        q: 'What is the difference between 听见 and 听懂?',
        a: '听见 means you physically heard the sound. 听懂 means you understood the meaning of the words spoken.'
      }
    ],
    relatedWordSlugs: ['ting-listen'],
    relatedGrammarSlugs: ['continuous-particle-ne-query']
  },

  // 7. 在 (zài) vs. 有 (yǒu)
  {
    slug: 'zai-vs-you',
    title: '在 (zài) vs. 有 (yǒu): Location vs. Existence in Chinese',
    shortTitle: '在 zài vs. 有 yǒu',
    level: 'HSK 1',
    cefr: 'A1',
    searchIntent: 'zai vs you difference location existence chinese',
    summary: 'Use 在 (zài) when a definite, known person or item is located at a place: "Subject + 在 + Place" (e.g. 老师在教室). Use 有 (yǒu) for existence when introducing what exists in a place: "Place + 有 + Object" (e.g. 教室里有老师).',
    words: [
      {
        hanzi: '在',
        pinyin: 'zài',
        meaning: 'at, in, on (location of known entity)',
        partOfSpeech: 'Verb / Preposition',
        coreFunction: 'Focuses on WHERE a known subject is located.'
      },
      {
        hanzi: '有',
        pinyin: 'yǒu',
        meaning: 'there is, there are, to have (existence)',
        partOfSpeech: 'Verb',
        coreFunction: 'Focuses on WHAT exists in a given location.'
      }
    ],
    table: [
      { criteria: 'Syntax Structure', word1: 'Known Entity + 在 + Location', word2: 'Location + 有 + Entity' },
      { criteria: 'Subject Status', word1: 'Definite / Known subject (The book, My friend)', word2: 'Indefinite / General entity (A cat, Some people)' },
      { criteria: 'Question Type', word1: '在哪儿？ (Where is it?)', word2: '有什么？ (What is there?)' },
      { criteria: 'English Equivalent', word1: 'X is at / in Y', word2: 'There is / There are X in Y' }
    ],
    rules: [
      {
        heading: '1. 在 (zài): Definite Subject + 在 + Place',
        explanation: 'Use 在 when the listener already knows what subject you are talking about, and you are answering where it is.',
        formula: 'Definite Subject + 在 + Location',
        examples: [
          { zh: '我的手机在桌子上。', py: 'Wǒ de shǒujī zài zhuōzi shàng.', en: 'My phone is on the table.' },
          { zh: '医生在医院。', py: 'Yīshēng zài yīyuàn.', en: 'The doctor is at the hospital.' }
        ]
      },
      {
        heading: '2. 有 (yǒu): Place + 有 + Entity',
        explanation: 'Use 有 when setting the scene at a location to state what items or people exist there.',
        formula: 'Location + 有 + Indefinite Noun Phrase',
        examples: [
          { zh: '桌子上有一本书。', py: 'Zhuōzi shàng yǒu yī běn shū.', en: 'There is a book on the table.' },
          { zh: '中国有很多名胜古迹。', py: 'Zhōngguó yǒu hěn duō míngshèng gǔjì.', en: 'There are many famous historical sites in China.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '书在桌子上有。',
        incorrectPy: 'Shū zài zhuōzi shàng yǒu.',
        correctZh: '桌子上有书。 / 书在桌子上。',
        correctPy: 'Zhuōzi shàng yǒu shū. / Shū zài zhuōzi shàng.',
        en: 'There is a book on the table. / The book is on the table.',
        explanation: 'Never combine 在 and 有 in the same simple location clause.'
      }
    ],
    quiz: [
      {
        question: 'Which sentence answers the question "图书馆在哪儿？"?',
        options: ['图书馆有学校。', '图书馆在食堂对面。', '在图书馆有书。', '学校在图书馆有。'],
        answer: 1,
        explanation: 'Answering where a specific building is located requires Subject + 在 + Location.'
      },
      {
        question: 'How do you say "There are three people in the room"?',
        options: ['三个人在房间里有。', '房间里有三个人。', '在房间是三个人。', '三个人有房间。'],
        answer: 1,
        explanation: 'Existence statements follow: Location + 有 + Noun phrase.'
      },
      {
        question: 'What is the negative form of "桌子上有苹果"?',
        options: ['桌子上不有苹果。', '桌子上没有苹果。', '桌子上在不苹果。', '桌子没有在苹果。'],
        answer: 1,
        explanation: '有 is always negated with 没 (没有).'
      }
    ],
    faq: [
      {
        q: 'Can 在 also mean "in the process of doing something"?',
        a: 'Yes, 在 + Verb indicates an ongoing continuous action (e.g. 我在吃饭 "I am eating").'
      }
    ],
    relatedWordSlugs: ['zai-at', 'you-have'],
    relatedGrammarSlugs: ['spatial-location-zai-fangwei']
  },

  // 8. 和 (hé) vs. 跟 (gēn) vs. 还有 (háiyǒu)
  {
    slug: 'he-vs-gen-vs-haiyou',
    title: '和 (hé) vs. 跟 (gēn) vs. 还有 (háiyǒu): Connecting Words & Clauses',
    shortTitle: '和 vs. 跟 vs. 还有',
    level: 'HSK 1-2',
    cefr: 'A1-A2',
    searchIntent: 'he vs gen vs haiyou difference chinese and with',
    summary: '和 (hé) connects NOUNS or noun phrases (e.g. 咖啡和茶). It CANNOT link full sentences. 跟 (gēn) means "with" (Subj + 跟 + Person + Verb) or "and". 还有 (háiyǒu) is used at the start of a clause to mean "furthermore", "and also", or "in addition".',
    words: [
      {
        hanzi: '和',
        pinyin: 'hé',
        meaning: 'and (nouns only)',
        partOfSpeech: 'Conjunction',
        coreFunction: 'Links two or more noun phrases. Never links independent clauses.'
      },
      {
        hanzi: '跟',
        pinyin: 'gēn',
        meaning: 'with, and, to follow',
        partOfSpeech: 'Preposition / Conjunction',
        coreFunction: 'Indicates accompanying someone to do an action (跟...一起).'
      },
      {
        hanzi: '还有',
        pinyin: 'háiyǒu',
        meaning: 'furthermore, also, plus',
        partOfSpeech: 'Conjunction Phrase',
        coreFunction: 'Adds supplementary items, points, or entire independent clauses.'
      }
    ],
    table: [
      { criteria: 'Connects Nouns', word1: 'Yes (苹果和香蕉)', word2: 'Yes (你跟我)', word3: 'Yes, as final item' },
      { criteria: 'Connects Sentences / Clauses', word1: 'STRICTLY FORBIDDEN', word2: 'No', word3: 'Yes (Mandatory for "And also...")' },
      { criteria: 'Meaning "Together With"', word1: 'Occasional in formal style', word2: 'Standard (我跟你去)', word3: 'No' }
    ],
    rules: [
      {
        heading: '1. Never Use 和 (hé) to Connect Two Sentences',
        explanation: 'In English, we say "I went home, AND my sister called me." In Chinese, you CANNOT use 和 here. Use 而且 (érqiě), 还有 (háiyǒu), or simply a comma.',
        examples: [
          { zh: '我喜欢吃苹果，我妹妹也喜欢。（NOT: 和我妹妹）', py: 'Wǒ xǐhuan chī píngguǒ, wǒ mèimei yě xǐhuan.', en: 'I like apples, and my sister likes them too.' }
        ]
      },
      {
        heading: '2. 跟 (gēn): Doing Things "With" Someone',
        explanation: 'Use 跟 to introduce a companion with whom an action is performed.',
        formula: 'Subject + 跟 + Person + (一起) + Verb',
        examples: [
          { zh: '我想跟你一起看电影。', py: 'Wǒ xiǎng gēn nǐ yīqǐ kàn diànshǐ.', en: 'I want to watch a movie with you.' }
        ]
      },
      {
        heading: '3. 还有 (háiyǒu): "In Addition" and "Also"',
        explanation: 'Use 还有 when adding a final item to a list or beginning a new sentence.',
        examples: [
          { zh: '我们要买面包、牛奶，还有鸡蛋。', py: 'Wǒmen yào mǎi miànbāo, niúnǎi, háiyǒu jīdàn.', en: 'We need to buy bread, milk, and also eggs.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我想睡觉，和我肚子很饿。',
        incorrectPy: 'Wǒ xiǎng shuìjiào, hé wǒ dùzi hěn è.',
        correctZh: '我想睡觉，而且我肚子很饿。 / 还有，我肚子很饿。',
        correctPy: 'Wǒ xiǎng shuìjiào, érqiě wǒ dùzi hěn è. / Háiyǒu, wǒ dùzi hěn è.',
        en: 'I want to sleep, and furthermore I am very hungry.',
        explanation: '和 can only join nouns, never full clauses.'
      }
    ],
    quiz: [
      {
        question: 'Which word connects: "爸爸____妈妈都去上班了。"?',
        options: ['和', '还有', '如果', '但是'],
        answer: 0,
        explanation: '爸爸 and 妈妈 are nouns, so 和 is the standard conjunction.'
      },
      {
        question: 'How do you say "Come with me"?',
        options: ['和我来', '跟我来', '还有我来', '两我来'],
        answer: 1,
        explanation: 'Accompanying an action uses 跟 (跟我来 = Come with me).'
      },
      {
        question: 'Can you start a sentence with 和?',
        options: ['Yes, always', 'No, never', 'Only before verbs', 'Only in questions'],
        answer: 1,
        explanation: 'Starting an independent sentence with 和 is a direct translation error from English.'
      }
    ],
    faq: [
      {
        q: 'Is 同 (tóng) or 与 (yǔ) also used for "and"?',
        a: '与 and 同 are more formal or literary equivalents of 和 used in written reports and idioms.'
      }
    ],
    relatedWordSlugs: ['he-and', 'gen-with'],
    relatedGrammarSlugs: ['listing-conjunction-he']
  },

  // 9. 想 (xiǎng) vs. 要 (yào)
  {
    slug: 'xiang-vs-yao',
    title: '想 (xiǎng) vs. 要 (yào): Want, Would Like & Future Intentions',
    shortTitle: '想 xiǎng vs. 要 yào',
    level: 'HSK 1-2',
    cefr: 'A1-A2',
    searchIntent: 'xiang vs yao difference chinese want would like',
    summary: '想 (xiǎng) expresses a soft desire or polite inclination ("would like to", "feel like", "to miss someone"). 要 (yào) expresses a firm demand, definite intention, or future necessity ("want", "need to", "going to").',
    words: [
      {
        hanzi: '想',
        pinyin: 'xiǎng',
        meaning: 'would like to; to think; to miss',
        partOfSpeech: 'Modal Verb / Verb',
        coreFunction: 'Polite, soft desire or mental consideration; also means to miss (想念) or think.'
      },
      {
        hanzi: '要',
        pinyin: 'yào',
        meaning: 'to want (firm); must / going to',
        partOfSpeech: 'Modal Verb / Verb',
        coreFunction: 'Definite intention, firm insistence, necessity, or impending future event.'
      }
    ],
    table: [
      { criteria: 'Politeness & Tone', word1: 'Polite, gentle ("I\'d like to")', word2: 'Direct, assertive ("I want / need")' },
      { criteria: 'Direct Noun Object', word1: 'Means "to miss" (我想妈妈)', word2: 'Means "to want" (我要咖啡)' },
      { criteria: 'Future "Going to"', word1: 'No', word2: 'Yes (快要...了, 明天要考试)' },
      { criteria: 'Negation', word1: '不想 (do not feel like doing)', word2: '不要 (do not do it! / imperative)' }
    ],
    rules: [
      {
        heading: '1. Ordering Food & Polite Requests: 想 vs. 要',
        explanation: 'Both can be used at restaurants. 我想要... blends the gentleness of 想 with the directness of 要.',
        examples: [
          { zh: '我想喝一杯水。', py: 'Wǒ xiǎng hē yī bēi shuǐ.', en: 'I would like to drink a glass of water (gentle).' },
          { zh: '老板，我要一碗牛肉面。', py: 'Lǎobǎn, wǒ yào yī wǎn niúròumiàn.', en: 'Boss, I want a bowl of beef noodles (ordering).' }
        ]
      },
      {
        heading: '2. Direct Objects: 我想你 vs. 我要你',
        explanation: 'Be very careful! Placing a person directly after 想 means "I miss you", whereas 要 means "I demand/require you".',
        examples: [
          { zh: '我想你。', py: 'Wǒ xiǎng nǐ.', en: 'I miss you.' },
          { zh: '我想回家。', py: 'Wǒ xiǎng huíjiā.', en: 'I feel like going home.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我要我的家。（Meaning: I miss home）',
        incorrectPy: 'Wǒ yào wǒ de jiā.',
        correctZh: '我想家。',
        correctPy: 'Wǒ xiǎng jiā.',
        en: 'I miss home (I am homesick).',
        explanation: 'To miss home or family, use 想 (or 想念), never 要.'
      }
    ],
    quiz: [
      {
        question: 'Which sentence means "I miss my parents"?',
        options: ['我要爸爸妈妈。', '我想爸爸妈妈。', '我会爸爸妈妈。', '我能爸爸妈妈。'],
        answer: 1,
        explanation: '想 + Person means "to miss someone".'
      },
      {
        question: 'How do you tell someone "Don\'t speak!" politely?',
        options: ['不要说话！', '不想说话！', '不能说想！', '没要说话！'],
        answer: 0,
        explanation: '不要 (bù yào) or 别 (bié) functions as a prohibitive "Don\'t...".'
      },
      {
        question: 'What does "明天要下雪" mean?',
        options: ['Tomorrow wants to snow', 'It is going to snow tomorrow', 'I would like it to snow tomorrow', 'It can snow tomorrow'],
        answer: 1,
        explanation: '要 indicates an impending future event ("going to").'
      }
    ],
    faq: [
      {
        q: 'What does 想要 mean together?',
        a: '想要 (xiǎng yào) is extremely common and translates to "would like to have/do", combining politeness and clarity.'
      }
    ],
    relatedWordSlugs: ['xiang-think', 'yao-want'],
    relatedGrammarSlugs: ['future-imminence-kuai-yao-le']
  },

  // 10. 知道 (zhīdào) vs. 认识 (rènshi)
  {
    slug: 'zhidao-vs-renshi',
    title: '知道 (zhīdào) vs. 认识 (rènshi): "To Know" in Mandarin Chinese',
    shortTitle: '知道 vs. 认识',
    level: 'HSK 1',
    cefr: 'A1',
    searchIntent: 'zhidao vs renshi difference to know chinese',
    summary: 'Use 知道 (zhīdào) for factual knowledge, information, dates, addresses, and trivia (e.g. 我知道他的名字). Use 认识 (rènshi) for personal familiarity with people ("I know him personally"), recognizing Hanzi characters, or roads/places.',
    words: [
      {
        hanzi: '知道',
        pinyin: 'zhīdào',
        meaning: 'to know (facts, information, data)',
        partOfSpeech: 'Verb',
        coreFunction: 'Knowing an objective piece of information, truth, or intellectual fact.'
      },
      {
        hanzi: '认识',
        pinyin: 'rènshi',
        meaning: 'to know (people, acquaintances); to recognize',
        partOfSpeech: 'Verb',
        coreFunction: 'Having personal interaction, being acquainted, or visually recognizing characters/roads.'
      }
    ],
    table: [
      { criteria: 'Factual Information (Address, Phone #)', word1: 'Mandatory (我知道他的电话)', word2: 'Incorrect' },
      { criteria: 'Personal Relationship with People', word1: 'Know of them (我知道他是谁)', word2: 'Acquainted (我们认识三年了)' },
      { criteria: 'Recognizing Chinese Characters', word1: 'Incorrect', word2: 'Mandatory (我认识这个汉字)' },
      { criteria: 'Pleasure to meet you', word1: 'Incorrect', word2: '很高兴认识你' }
    ],
    rules: [
      {
        heading: '1. 知道 (zhīdào): Awareness of Facts',
        explanation: 'Use 知道 when you can answer "What, When, Where, or Why".',
        examples: [
          { zh: '你知道明天的考试时间吗？', py: 'Nǐ zhīdào míngtiān de kǎoshì shíjiān ma?', en: 'Do you know tomorrow’s exam time?' },
          { zh: '我不知道他在哪儿。', py: 'Wǒ bù zhīdào tā zài nǎr.', en: 'I don’t know where he is.' }
        ]
      },
      {
        heading: '2. 认识 (rènshi): Knowing People and Recognizing Things',
        explanation: 'Use 认识 when you have met someone in person or can visually identify characters or routes.',
        examples: [
          { zh: '你认识那个中国女孩吗？', py: 'Nǐ rènshi nà ge Zhōngguó nǚhái ma?', en: 'Do you know that Chinese girl? (Are you acquainted?)' },
          { zh: '我不认识这个汉字。', py: 'Wǒ bù rènshi zhè ge hànzì.', en: 'I do not recognize this Chinese character.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '我很高兴知道你。',
        incorrectPy: 'Wǒ hěn gāoxìng zhīdào nǐ.',
        correctZh: '很高兴认识你。',
        correctPy: 'Hěn gāoxìng rènshi nǐ.',
        en: 'Nice to meet you / Glad to get to know you.',
        explanation: 'Meeting people always uses 认识, never 知道.'
      }
    ],
    quiz: [
      {
        question: 'Which verb fits: "你知道姚明，但你____他吗？"?',
        options: ['认识', '知道', '看', '懂'],
        answer: 0,
        explanation: 'You may know of Yao Ming as a celebrity (知道), but you don\'t know him personally (认识).'
      },
      {
        question: 'How do you say "Do you know the way?"',
        options: ['你知道路吗？', '你认识路吗？', '你懂得路吗？', '你看路吗？'],
        answer: 1,
        explanation: 'Recognizing a geographical path or road is standardly 认识路 (rènshi lù).'
      },
      {
        question: 'Fill in: "我____怎么去火车站。"',
        options: ['认识', '知道', '会', '想'],
        answer: 1,
        explanation: 'Knowing factual instructions or navigation details uses 知道.'
      }
    ],
    faq: [
      {
        q: 'Can 认识 mean "to get to know"?',
        a: 'Yes, 认识 means both to be acquainted with and the initial act of meeting/making an acquaintance.'
      }
    ],
    relatedWordSlugs: ['zhidao-know', 'renshi-know'],
    relatedGrammarSlugs: ['statement-shi-identity']
  },

  // 11. 帮 (bāng) vs. 帮助 (bāngzhù) vs. 帮忙 (bāngmáng)
  {
    slug: 'bang-vs-bangzhu-vs-bangmang',
    title: '帮 (bāng) vs. 帮助 (bāngzhù) vs. 帮忙 (bāngmáng): "To Help" in Chinese',
    shortTitle: '帮 vs. 帮助 vs. 帮忙',
    level: 'HSK 2',
    cefr: 'A2',
    searchIntent: 'bang vs bangzhu vs bangmang difference chinese help',
    summary: '帮 (bāng) and 帮助 (bāngzhù) are transitive verbs that take a direct object (帮我, 帮助别人). 帮忙 (bāngmáng) is a separable verb-object compound (离合词) and CANNOT take a direct object! You must say 帮我的忙, never 帮忙我.',
    words: [
      {
        hanzi: '帮',
        pinyin: 'bāng',
        meaning: 'to help (informal, transitive)',
        partOfSpeech: 'Verb',
        coreFunction: 'Short, casual transitive verb taking direct objects (帮我, 帮他).'
      },
      {
        hanzi: '帮助',
        pinyin: 'bāngzhù',
        meaning: 'to assist, aid (formal, verb or noun)',
        partOfSpeech: 'Verb / Noun',
        coreFunction: 'Formal assistance; can function as a noun ("thank you for your help 谢谢你的帮助").'
      },
      {
        hanzi: '帮忙',
        pinyin: 'bāngmáng',
        meaning: 'to do a favor (separable verb-object)',
        partOfSpeech: 'Separable Verb (离合词)',
        coreFunction: 'Literally "to help with busyness". Cannot take a direct object.'
      }
    ],
    table: [
      { criteria: 'Can take direct object (e.g. 我)', word1: 'YES (帮我)', word2: 'YES (帮助我)', word3: 'STRICTLY FORBIDDEN (Never 帮忙我)' },
      { criteria: 'Can function as a NOUN', word1: 'No', word2: 'YES (你的帮助)', word3: 'No (is a verb phrase)' },
      { criteria: 'Separable Verb Structure', word1: 'No', word2: 'No', word3: 'YES (帮一个忙, 帮你的忙)' }
    ],
    rules: [
      {
        heading: '1. The Separable Trap: 帮忙 CANNOT Take an Object',
        explanation: 'This is tested on every HSK 2 and HSK 3 exam. Because 忙 is already the grammatical object of 帮, you cannot attach another object.',
        formula: '帮 + Person + (的) + 忙 (Correct) vs. 帮忙 + Person (Wrong)',
        examples: [
          { zh: '你能帮我一个忙吗？', py: 'Nǐ néng bāng wǒ yī gè máng ma?', en: 'Could you do me a favor?' },
          { zh: '谢谢你帮我的忙。', py: 'Xièxie nǐ bāng wǒ de máng.', en: 'Thank you for helping me out.' }
        ]
      },
      {
        heading: '2. 帮助 (bāngzhù) as a Noun',
        explanation: 'When "help" is a noun, use 帮助.',
        examples: [
          { zh: '多亏了老师的帮助。', py: 'Duōkuī le lǎoshī de bāngzhù.', en: 'Thanks to the teacher’s help.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '你可以帮忙我吗？',
        incorrectPy: 'Nǐ kěyǐ bāngmáng wǒ ma?',
        correctZh: '你可以帮我吗？ / 你可以帮我的忙吗？',
        correctPy: 'Nǐ kěyǐ bāng wǒ ma? / Nǐ kěyǐ bāng wǒ de máng ma?',
        en: 'Can you help me?',
        explanation: 'Never say 帮忙我. Use 帮我 or 帮我的忙.'
      }
    ],
    quiz: [
      {
        question: 'Which sentence is grammatically INCORRECT?',
        options: ['他经常帮助同学。', '请你帮我开门。', '你能帮忙我拿包吗？', '太感谢你的帮助了。'],
        answer: 2,
        explanation: '帮忙 cannot take the direct object 我. It should be 帮我拿包.'
      },
      {
        question: 'How do you say "Do me a favor"?',
        options: ['帮一个忙', '帮我一个忙', '帮忙我一下', '帮助我一个忙'],
        answer: 1,
        explanation: '帮...一个忙 is the standard idiomatic structure.'
      },
      {
        question: 'Which word can be a noun meaning "assistance"?',
        options: ['帮', '帮助', '帮忙', '帮着'],
        answer: 1,
        explanation: '帮助 functions smoothly as both a verb and a noun.'
      }
    ],
    faq: [
      {
        q: 'Why is 帮忙 separable?',
        a: 'In Chinese linguistic history, 帮 is the verb (to help) and 忙 is the noun (busyness). Since it is already a Verb-Object compound, it cannot absorb a second object.'
      }
    ],
    relatedWordSlugs: ['bangzhu'],
    relatedGrammarSlugs: ['relative-distance-li-yuan-jin']
  },

  // 12. 以前 (yǐqián) vs. 从前 (cóngqián)
  {
    slug: 'yiqian-vs-congqian',
    title: '以前 (yǐqián) vs. 从前 (cóngqián): Before, Ago & In the Past',
    shortTitle: '以前 vs. 从前',
    level: 'HSK 2-3',
    cefr: 'A2-B1',
    searchIntent: 'yiqian vs congqian difference chinese before past',
    summary: '以前 (yǐqián) can follow a specific time point or event to mean "before / ago" (e.g. 三天以前, 吃饭以前) and can also mean "in the past". 从前 (cóngqián) is strictly narrative, meaning "once upon a time" or "long ago", and CANNOT follow a time point.',
    words: [
      {
        hanzi: '以前',
        pinyin: 'yǐqián',
        meaning: 'before, ago, in the past',
        partOfSpeech: 'Noun / Postposition',
        coreFunction: 'Used after time words or verbs (Event + 以前) to mean before or ago.'
      },
      {
        hanzi: '从前',
        pinyin: 'cóngqián',
        meaning: 'once upon a time, long ago',
        partOfSpeech: 'Noun',
        coreFunction: 'Used at the beginning of stories or nostalgic reflections about distant eras.'
      }
    ],
    table: [
      { criteria: 'After Specific Time / Event (X + ...)', word1: 'MANDATORY (睡觉以前, 两年以前)', word2: 'NEVER ALLOWED' },
      { criteria: 'Fairy Tales / "Once upon a time"', word1: 'Unnatural', word2: 'MANDATORY (从前有一座山...)' },
      { criteria: 'General Past Contrast ("In the past...")', word1: 'Yes (以前我不懂)', word2: 'Yes (从前我不懂)' }
    ],
    rules: [
      {
        heading: '1. Time / Action + 以前 (yǐqián)',
        explanation: 'Whenever you want to say "before doing X" or "X time ago", place 以前 after.',
        formula: 'Time / Event + 以前',
        examples: [
          { zh: '吃饭以前要洗手。', py: 'Chīfàn yǐqián yào xǐshǒu.', en: 'Wash hands before eating.' },
          { zh: '三天以前他回国了。', py: 'Sān tiān yǐqián tā huíguó le.', en: 'He returned to his country three days ago.' }
        ]
      },
      {
        heading: '2. 从前 (cóngqián): Distant Storytelling',
        explanation: 'Use 从前 for folkloric narratives or distant childhood recollections.',
        examples: [
          { zh: '从前，这里是一个安静的小村庄。', py: 'Cóngqián, zhèlǐ shì yī gè ānjìng de xiǎo cūnzhuāng.', en: 'Long ago, this was a quiet little village.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '睡觉从前要刷牙。',
        incorrectPy: 'Shuìjiào cóngqián yào shuāyá.',
        correctZh: '睡觉以前要刷牙。',
        correctPy: 'Shuìjiào yǐqián yào shuāyá.',
        en: 'Brush teeth before going to sleep.',
        explanation: '从前 cannot follow an action or time word.'
      }
    ],
    quiz: [
      {
        question: 'Which word completes: "开会____请把手机关掉。"?',
        options: ['以前', '从前', '过去', '以后'],
        answer: 0,
        explanation: 'Before an event (开会以前) requires 以前.'
      },
      {
        question: 'How do classic Chinese fairy tales begin?',
        options: ['从前...', '以前...', '过去...', '前天...'],
        answer: 0,
        explanation: '从前 is the traditional equivalent of "Once upon a time".'
      },
      {
        question: 'What does "两年以前" mean?',
        options: ['Two years later', 'Two years ago', 'During two years', 'In two years'],
        answer: 1,
        explanation: 'Duration + 以前 translates directly to "...ago".'
      }
    ],
    faq: [
      {
        q: 'What is the opposite of 以前?',
        a: '以后 (yǐhòu), which means "after" or "in the future".'
      }
    ],
    relatedWordSlugs: ['shijian'],
    relatedGrammarSlugs: ['change-of-situation-le']
  },

  // 13. 刚 (gāng) vs. 刚才 (gāngcái)
  {
    slug: 'gang-vs-gangcai',
    title: '刚 (gāng) vs. 刚才 (gāngcái): "Just Now" & "A Moment Ago"',
    shortTitle: '刚 gāng vs. 刚才 gāngcái',
    level: 'HSK 2-3',
    cefr: 'A2-B1',
    searchIntent: 'gang vs gangcai difference chinese just now',
    summary: '刚 (gāng) is an ADVERB meaning "just / barely" and must immediately precede the verb (e.g. 我刚到). It can refer to seconds ago or years ago. 刚才 (gāngcái) is a TIME NOUN meaning "just a moment ago" (literally within minutes) and can go before or after the subject.',
    words: [
      {
        hanzi: '刚',
        pinyin: 'gāng',
        meaning: 'just, barely (subjective adverb)',
        partOfSpeech: 'Adverb',
        coreFunction: 'Must sit directly in front of the main verb. Subjective timeframe (can be minutes, days, or years ago).'
      },
      {
        hanzi: '刚才',
        pinyin: 'gāngcái',
        meaning: 'just now, a moment ago (objective time noun)',
        partOfSpeech: 'Time Noun',
        coreFunction: 'Objective short timeframe (only a few minutes ago). Can precede the subject or follow it.'
      }
    ],
    table: [
      { criteria: 'Grammatical Category', word1: 'Adverb (副词)', word2: 'Time Noun (时间名词)' },
      { criteria: 'Position relative to Subject', word1: 'Only AFTER Subject (我刚走)', word2: 'Before OR After Subject (刚才我 / 我刚才)' },
      { criteria: 'Can refer to long periods (e.g. 1 year ago)', word1: 'YES (我刚毕业一年)', word2: 'NEVER (Only recent minutes)' },
      { criteria: 'Can be followed by 了', word1: 'Never with standalone 刚', word2: 'Yes (刚才你去哪儿了？)' }
    ],
    rules: [
      {
        heading: '1. 刚 (gāng): Flexible Subjective "Just"',
        explanation: '刚 expresses the speaker’s subjective feeling that something happened recently.',
        formula: 'Subject + 刚 + Verb',
        examples: [
          { zh: '我刚来中国三个月。', py: 'Wǒ gāng lái Zhōngguó sān gè yuè.', en: 'I just came to China three months ago (feels recent to speaker).' },
          { zh: '火车刚开走。', py: 'Huǒchē gāng kāi zǒu.', en: 'The train just departed.' }
        ]
      },
      {
        heading: '2. 刚才 (gāngcái): The Concrete Past Moment',
        explanation: '刚才 strictly designates the immediate past moments before speaking.',
        formula: '(刚才) + Subject + (刚才) + Verb Phrase',
        examples: [
          { zh: '刚才谁敲门？', py: 'Gāngcái shéi qiāo mén?', en: 'Who knocked on the door just now?' },
          { zh: '我刚才在洗手间。', py: 'Wǒ gāngcái zài xǐshǒujiān.', en: 'I was in the restroom a moment ago.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '刚我看见他了。',
        incorrectPy: 'Gāng wǒ kànjiàn tā le.',
        correctZh: '刚才我看见他了。 / 我刚看见他。',
        correctPy: 'Gāngcái wǒ kànjiàn tā le. / Wǒ gāng kànjiàn tā.',
        en: 'I saw him just now.',
        explanation: '刚 is an adverb and cannot sit before the subject. Use 刚才 before the subject.'
      }
    ],
    quiz: [
      {
        question: 'Which word can sit before the subject: "____你去哪儿了？"?',
        options: ['刚才', '刚', '刚刚好', '经常'],
        answer: 0,
        explanation: 'Only time nouns like 刚才 can sit before the subject.'
      },
      {
        question: 'Can you say "我刚才大学毕业两年"?',
        options: ['Yes, perfectly natural', 'No, two years is too long for 刚才; use 刚', 'No, 刚才 cannot be used with graduation', 'Yes, if you feel young'],
        answer: 1,
        explanation: '刚才 only refers to moments ago. For a subjective duration like two years ago, use 刚.'
      },
      {
        question: 'Where must 刚 be placed?',
        options: ['At the start of the sentence', 'Directly before the verb', 'At the end after 了', 'Before any noun'],
        answer: 1,
        explanation: 'As an adverb, 刚 must be positioned directly preceding the verb.'
      }
    ],
    faq: [
      {
        q: 'What is 刚刚 (gānggang)?',
        a: '刚刚 is an informal duplication of 刚 that emphasizes how extremely fresh the action is.'
      }
    ],
    relatedWordSlugs: ['shijian'],
    relatedGrammarSlugs: ['action-in-progress-zhengzai']
  },

  // 14. 又 (yòu) vs. 再 (zài)
  {
    slug: 'you-vs-zai-again',
    title: '又 (yòu) vs. 再 (zài): "Again" in the Past vs. Future',
    shortTitle: '又 yòu vs. 再 zài',
    level: 'HSK 2-3',
    cefr: 'A2-B1',
    searchIntent: 'you vs zai difference chinese again past future',
    summary: 'Both mean "again", but they look in opposite directions in time! Use 又 (yòu) for an action that has ALREADY happened again in the past (e.g. 他又迟到了 "He is late again"). Use 再 (zài) for an action that will happen again in the FUTURE (e.g. 请再说一次 "Please say it again", 再见 "see you again").',
    words: [
      {
        hanzi: '又',
        pinyin: 'yòu',
        meaning: 'again (past / completed occurrence)',
        partOfSpeech: 'Adverb',
        coreFunction: 'Action has recurred or already occurred again. Often paired with 了.'
      },
      {
        hanzi: '再',
        pinyin: 'zài',
        meaning: 'again (future / projected occurrence)',
        partOfSpeech: 'Adverb',
        coreFunction: 'Action will or is requested to occur again in the future.'
      }
    ],
    table: [
      { criteria: 'Temporal Direction', word1: 'PAST (Already happened)', word2: 'FUTURE (Yet to happen)' },
      { criteria: 'Common Collocation', word1: '又 + Verb + 了', word2: '再 + Verb (No 了)' },
      { criteria: 'Famous Examples', word1: '他又生病了 (Sick again)', word2: '再见 (See you again)' },
      { criteria: 'Special Use: Both...and...', word1: '又...又... (又大又甜)', word2: 'Not used for both...and...' }
    ],
    rules: [
      {
        heading: '1. 又 (yòu): The Action Has Already Repeated',
        explanation: 'When an event repeats itself up to or before the present moment, use 又.',
        formula: 'Subject + 又 + Verb + (Object) + 了',
        examples: [
          { zh: '今天又下雨了。', py: 'Jīntiān yòu xià yǔ le.', en: 'It rained again today (it has already started raining).' },
          { zh: '你怎么又买新衣服了？', py: 'Nǐ zěnme yòu mǎi xīn yīfu le?', en: 'How come you bought new clothes again?' }
        ]
      },
      {
        heading: '2. 再 (zài): Repeating an Action in the Future',
        explanation: 'When asking someone to repeat something or planning a future recurrence, use 再.',
        formula: 'Subject + 再 + Verb',
        examples: [
          { zh: '请你再说一遍。', py: 'Qǐng nǐ zài shuō yī biàn.', en: 'Please say it again (future request).' },
          { zh: '明天我再来找你。', py: 'Míngtiān wǒ zài lái zhǎo nǐ.', en: 'I will come looking for you again tomorrow.' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '昨天我又看见他，明天我又要去。',
        incorrectPy: 'Zuótiān wǒ yòu kànjiàn tā, míngtiān wǒ yòu yào qù.',
        correctZh: '昨天我又看见他，明天我再去。',
        correctPy: 'Zuótiān wǒ yòu kànjiàn tā, míngtiān wǒ zài qù.',
        en: 'Yesterday I saw him again, and tomorrow I will go again.',
        explanation: 'Tomorrow (明天) is in the future, so the repetition must use 再, not 又.'
      }
    ],
    quiz: [
      {
        question: 'Which word completes: "太好吃了，我想____吃一个。"?',
        options: ['再', '又', '还', '也'],
        answer: 0,
        explanation: 'Wanting to eat another one in the future requires 再.'
      },
      {
        question: 'Which word completes: "他今天____迟到了。"?',
        options: ['再', '又', '过', '正在'],
        answer: 1,
        explanation: 'Because he has already arrived late, use 又 (yòu).'
      },
      {
        question: 'Why does 再见 (goodbye) use 再?',
        options: ['Because it means see you again in the future', 'Because it happened yesterday', 'Because it means goodbye forever', 'Because of tone sandhi'],
        answer: 0,
        explanation: '再见 literally translates to "again see" in the future.'
      }
    ],
    faq: [
      {
        q: 'Can 又 ever refer to the future?',
        a: 'Only in fixed expressions of inevitable periodic events (e.g. 明天又是星期一 "Tomorrow is Monday again"). Otherwise, future repetition is strictly 再.'
      }
    ],
    relatedWordSlugs: ['zaijian'],
    relatedGrammarSlugs: ['change-of-situation-le']
  },

  // 15. 多少 (duōshao) vs. 几 (jǐ)
  {
    slug: 'duoshao-vs-ji',
    title: '多少 (duōshao) vs. 几 (jǐ): Asking "How Many" in Chinese',
    shortTitle: '多少 vs. 几',
    level: 'HSK 1',
    cefr: 'A1',
    searchIntent: 'duoshao vs ji difference chinese how many how much',
    summary: 'Use 几 (jǐ) when the expected quantity is small (typically less than 10), and a measure word is MANDATORY (e.g. 几个人, 几本书). Use 多少 (duōshao) for quantities over 10 or unknown amounts (prices, phone numbers), and the measure word is OPTIONAL (e.g. 多少(个)人, 多少钱).',
    words: [
      {
        hanzi: '几',
        pinyin: 'jǐ',
        meaning: 'how many (small amount < 10)',
        partOfSpeech: 'Pronoun',
        coreFunction: 'Used when expecting a number under 10. Measure word is grammatically mandatory.'
      },
      {
        hanzi: '多少',
        pinyin: 'duōshao',
        meaning: 'how many, how much (any quantity, often > 10)',
        partOfSpeech: 'Pronoun',
        coreFunction: 'Used for large numbers, prices, or unknown counts. Measure word is optional.'
      }
    ],
    table: [
      { criteria: 'Expected Quantity', word1: 'Usually under 10 (< 10)', word2: 'Unlimited, usually > 10 or unknown' },
      { criteria: 'Measure Word Requirement', word1: 'MANDATORY (几 + MW + Noun)', word2: 'OPTIONAL (多少 + [MW] + Noun)' },
      { criteria: 'Inquiring Prices (Money)', word1: 'Never for price', word2: 'Standard (多少钱？)' },
      { criteria: 'Phone numbers & Addresses', word1: 'Never', word2: 'Standard (你的电话是多少？)' },
      { criteria: 'Asking Age', word1: 'Kids under 10 (你几岁？)', word2: 'General / adults (你多大？)' }
    ],
    rules: [
      {
        heading: '1. 几 (jǐ): Small Counts with Measure Words',
        explanation: 'Always place a measure word between 几 and the noun.',
        formula: '几 + Measure Word + Noun',
        examples: [
          { zh: '你家有几口人？', py: 'Nǐ jiā yǒu jǐ kǒu rén?', en: 'How many people are there in your family?' },
          { zh: '现在几点？', py: 'Xiànzài jǐ diǎn?', en: 'What time is it now?' }
        ]
      },
      {
        heading: '2. 多少 (duōshao): Prices and Large Numbers',
        explanation: 'Use 多少 for prices, students in a school, or when you have no idea of the number.',
        formula: '多少 + (Measure Word) + Noun',
        examples: [
          { zh: '这个西瓜多少钱？', py: 'Zhè ge xīguā duōshao qián?', en: 'How much is this watermelon?' },
          { zh: '你们学校有多少（个）学生？', py: 'Nǐmen xuéxiào yǒu duōshao (gè) xuésheng?', en: 'How many students are in your school?' }
        ]
      }
    ],
    mistakes: [
      {
        incorrectZh: '这个苹果几钱？',
        incorrectPy: 'Zhè ge píngguǒ jǐ qián?',
        correctZh: '这个苹果多少钱？',
        correctPy: 'Zhè ge píngguǒ duōshao qián?',
        en: 'How much is this apple?',
        explanation: 'Asking prices always uses 多少钱, never 几钱.'
      },
      {
        incorrectZh: '你有几书？',
        incorrectPy: 'Nǐ yǒu jǐ shū?',
        correctZh: '你有几本书？',
        correctPy: 'Nǐ yǒu jǐ běn shū?',
        en: 'How many books do you have?',
        explanation: '几 must be followed by a measure word (本).'
      }
    ],
    quiz: [
      {
        question: 'Which question is correct when asking a 5-year-old their age?',
        options: ['你几岁？', '你多少岁？', '你多少钱？', '你几点？'],
        answer: 0,
        explanation: 'For children under 10, ask 你几岁？.'
      },
      {
        question: 'Can you say "多少学生"?',
        options: ['Yes, measure word is optional with 多少', 'No, measure word is strictly mandatory', 'Only if students are girls', 'No, must say 几人'],
        answer: 0,
        explanation: 'With 多少, the measure word is optional, so both 多少学生 and 多少个学生 are natural.'
      },
      {
        question: 'How do you ask for someone\'s phone number?',
        options: ['你的电话是几号？', '你的电话号码是多少？', '你有几个电话？', '电话几点？'],
        answer: 1,
        explanation: 'Phone numbers are long digits, so 多少 is standard.'
      }
    ],
    faq: [
      {
        q: 'Can 几 mean "a few" in a statement?',
        a: 'Yes! In affirmative statements, 几 means "several" or "a few" (e.g. 我买了几个苹果 "I bought a few apples").'
      }
    ],
    relatedWordSlugs: ['duoshao-how-many', 'ji-how-many'],
    relatedGrammarSlugs: ['asking-price-duoshao-qian']
  }
];

export function getComparisonBySlug(slug: string): ComparisonItem | undefined {
  return comparisonsData.find(c => c.slug === slug);
}

export function getAdjacentComparisons(currentSlug: string): { prev?: ComparisonItem; next?: ComparisonItem } {
  const index = comparisonsData.findIndex(c => c.slug === currentSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? comparisonsData[index - 1] : comparisonsData[comparisonsData.length - 1],
    next: index < comparisonsData.length - 1 ? comparisonsData[index + 1] : comparisonsData[0]
  };
}
