import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hsk1Lessons = [
  {
    slug: 'greetings-and-introductions',
    title: 'Greetings & Introductions (问候与相识)',
    desc: 'Master foundational greetings, asking names, and polite introductory exchanges.',
    dialogue: [
      { speaker: '李明', zh: '你好！请问你叫什么名字？', py: 'Nǐ hǎo! Qǐngwèn nǐ jiào shénme míngzi?', en: 'Hello! May I ask what your name is?' },
      { speaker: '大卫', zh: '你好，李明！我叫大卫。很高兴认识你。', py: 'Nǐ hǎo, Lǐ Míng! Wǒ jiào Dàwèi. Hěn gāoxìng rènshi nǐ.', en: 'Hello Li Ming! My name is David. Very glad to meet you.' },
      { speaker: '李明', zh: '你是哪国人？你是学生吗？', py: 'Nǐ shì nǎ guó rén? Nǐ shì xuésheng ma?', en: 'Which country are you from? Are you a student?' },
      { speaker: '大卫', zh: '我是美国人，我也是北京大学的学生。', py: 'Wǒ shì Měiguó rén, wǒ yě shì Běijīng Dàxué de xuésheng.', en: 'I am American, I am also a student at Peking University.' }
    ],
    vocab: ['你好', '叫', '名字', '高兴', '认识', '人', '学生'],
    grammar: [
      'Stating identity: A 是 B (我叫大卫，我是学生)',
      'Polite formula: 很高兴认识你 (Very pleased to meet you)',
      'Question particle 吗: Statement + 吗？'
    ],
    quiz: [
      { question: 'How do you say "Nice to meet you"?', options: ['对不起', '很高兴认识你', '没关系', '明天见'], correctIndex: 1, explanation: '很高兴认识你 means "Very glad to meet you".' },
      { question: 'Which particle turns statements into yes/no questions?', options: ['的', '了', '吗', '呢'], correctIndex: 2, explanation: '吗 (ma) placed at sentence end forms yes/no questions.' }
    ]
  },
  {
    slug: 'numbers-and-dates',
    title: 'Numbers and Calendar Dates (数字与日期)',
    desc: 'Expressing numbers 1–100, days of the week, months, and calendar dates.',
    dialogue: [
      { speaker: '安娜', zh: '今天几月几号？星期几？', py: 'Jīntiān jǐ yuè jǐ hào? Xīngqī jǐ?', en: 'What date is today? What day of the week?' },
      { speaker: '王朋', zh: '今天十月三十号，星期五。', py: 'Jīntiān shí yuè sānshí hào, xīngqīwǔ.', en: 'Today is October 30th, Friday.' },
      { speaker: '安娜', zh: '明天是你二十一岁生日吗？', py: 'Míngtiān shì nǐ èrshíyī suì shēngrì ma?', en: 'Is tomorrow your 21st birthday?' },
      { speaker: '王朋', zh: '是的！欢迎明天晚上来我家做客。', py: 'Shì de! Huānyíng míngtiān wǎnshang lái wǒ jiā zuòkè.', en: 'Yes! Welcome to visit my home tomorrow evening.' }
    ],
    vocab: ['今天', '明天', '月', '号', '星期', '岁', '生', '日'],
    grammar: [
      'Date hierarchy: Year (年) -> Month (月) -> Day (号/日)',
      'Days of week: 星期一 through 星期六, 星期天/日 (Sunday)',
      'Inquiring quantity under 10 with 几: 几月几号？'
    ],
    quiz: [
      { question: 'How do you say "Friday" in Chinese?', options: ['星期四', '星期五', '星期六', '星期天'], correctIndex: 1, explanation: '星期五 is Friday.' }
    ]
  },
  {
    slug: 'family-members',
    title: 'Family Members & Household (家庭与亲人)',
    desc: 'Introduce family members, discuss ages, and describe household roles.',
    dialogue: [
      { speaker: '张华', zh: '你家有几口人？', py: 'Nǐ jiā yǒu jǐ kǒu rén?', en: 'How many people are in your family?' },
      { speaker: '玛丽', zh: '我家有四口人：爸爸、妈妈、哥哥和我。', py: 'Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.', en: 'My family has four people: dad, mom, older brother and me.' },
      { speaker: '张华', zh: '你哥哥工作了吗？', py: 'Nǐ gēge gōngzuò le ma?', en: 'Does your older brother work?' },
      { speaker: '玛丽', zh: '他在医院做医生。', py: 'Tā zài yīyuàn zuò yīshēng.', en: 'He works as a doctor in a hospital.' }
    ],
    vocab: ['爸爸', '妈妈', '儿子', '女儿', '家', '医生', '医院'],
    grammar: [
      'Measure word for family members: 口 (kǒu) — 四口人',
      'Listing conjunction: 和 (hé) connects nouns only'
    ],
    quiz: [
      { question: 'Which measure word is used when counting family members?', options: ['个', '口', '本', '块'], correctIndex: 1, explanation: '口 (kǒu) is the traditional classifier for family members.' }
    ]
  },
  {
    slug: 'time-expressions',
    title: 'Time Expressions & Daily Clock (时间与钟点)',
    desc: 'Telling clock time, asking what time it is, and scheduling meetings.',
    dialogue: [
      { speaker: '小明', zh: '请问现在几点了？', py: 'Qǐngwèn xiànzài jǐ diǎn le?', en: 'May I ask what time it is now?' },
      { speaker: '老师', zh: '现在是上午九点十五分。', py: 'Xiànzài shì shàngwǔ jiǔ diǎn shíwǔ fēn.', en: 'It is 9:15 AM now.' },
      { speaker: '小明', zh: '我们几点去上汉语课？', py: 'Wǒmen jǐ diǎn qù shàng Hànyǔ kè?', en: 'What time do we go to Chinese class?' },
      { speaker: '老师', zh: '十点钟准时在三楼教室上课。', py: 'Shí diǎn zhōng zhǔnshí zài sān lóu jiàoshì shàngkè.', en: 'At 10:00 AM sharp in the 3rd floor classroom.' }
    ],
    vocab: ['点', '分钟', '现在', '上午', '中午', '下午', '时候'],
    grammar: [
      'Clock time structure: Number + 点 + (Number + 分)',
      'Time words placed before verbs as adverbial modifiers'
    ],
    quiz: [
      { question: 'What does "上午九点" mean?', options: ['9 PM', '9 AM', '7 AM', '12 Noon'], correctIndex: 1, explanation: '上午 denotes morning before noon, so 上午九点 is 9 AM.' }
    ]
  },
  {
    slug: 'food-and-drink',
    title: 'Food & Ordering at Restaurants (餐馆点餐与饮食)',
    desc: 'Learn how to order staple Chinese dishes, request beverages, and pay the bill.',
    dialogue: [
      { speaker: '服务员', zh: '你好！几位？请问想喝点儿什么？', py: 'Nǐ hǎo! Jǐ wèi? Qǐngwèn xiǎng hē diǎnr shénme?', en: 'Hello! How many guests? What would you like to drink?' },
      { speaker: '客人', zh: '请给我们两杯中国热茶。', py: 'Qǐng gěi wǒmen liǎng bēi Zhōngguó rè chá.', en: 'Please give us two cups of hot Chinese tea.' },
      { speaker: '服务员', zh: '想吃点儿什么菜？', py: 'Xiǎng chī diǎnr shénme cài?', en: 'What dishes would you like to eat?' },
      { speaker: '客人', zh: '我们要米饭和一道中国特色菜。', py: 'Wǒmen yào mǐfàn hé yí dào Zhōngguó tèsè cài.', en: 'We want rice and a Chinese specialty dish.' }
    ],
    vocab: ['吃', '喝', '茶', '水', '菜', '米饭', '水果', '饭店'],
    grammar: [
      'Polite request: 请给我... (Please give me...)',
      'Desire vs intent: 想 (would like to) vs 要 (want / order)'
    ],
    quiz: [
      { question: 'Which verb is used for drinking liquids like tea and water?', options: ['吃', '喝', '看', '听'], correctIndex: 1, explanation: '喝 (hē) is the verb to drink.' }
    ]
  },
  {
    slug: 'places-and-directions',
    title: 'Places and Basic Directions (位置与方位)',
    desc: 'Asking where locations are situated and describing relative positions.',
    dialogue: [
      { speaker: '路人', zh: '请问，图书馆在什么地方？', py: 'Qǐngwèn, túshūguǎn zài shénme dìfang?', en: 'Excuse me, where is the library located?' },
      { speaker: '学生', zh: '图书馆在教学楼前面，商店在它后面。', py: 'Túshūguǎn zài jiàoxuélóu qiánmian, shāngdiàn zài tā hòumian.', en: 'The library is in front of the teaching hall, store is behind it.' },
      { speaker: '路人', zh: '离这里远不远？', py: 'Lí zhèlǐ yuǎn bù yuǎn?', en: 'Is it far from here?' },
      { speaker: '学生', zh: '不远，向前走两分钟就到了。', py: 'Bù yuǎn, xiàng qián zǒu liǎng fēnzhōng jiù dào le.', en: 'Not far, walk forward two minutes and you arrive.' }
    ],
    vocab: ['前面', '后面', '上', '下', '里', '学校', '商店', '在哪儿'],
    grammar: [
      'Location: Subject + 在 + Place + 方位词 (前面, 后面, 上面, 下面)',
      'Question form: 在哪儿？ (Where is...?)'
    ],
    quiz: [
      { question: 'What does "在学校前面" mean?', options: ['Behind school', 'Inside school', 'In front of school', 'Above school'], correctIndex: 2, explanation: '前面 means in front of.' }
    ]
  },
  {
    slug: 'shopping-and-money',
    title: 'Shopping and Prices (购物与询价)',
    desc: 'Asking prices, bargaining politely, and understanding yuan transactions.',
    dialogue: [
      { speaker: '顾客', zh: '这个红苹果多少钱一斤？', py: 'Zhè ge hóng píngguǒ duōshao qián yì jīn?', en: 'How much are these red apples per catty?' },
      { speaker: '售货员', zh: '五块钱一斤，很甜很好吃。', py: 'Wǔ kuài qián yì jīn, hěn tián hěn hǎochī.', en: 'Five yuan per catty, very sweet and tasty.' },
      { speaker: '顾客', zh: '太贵了，便宜一点儿行吗？', py: 'Tài guì le, piányi yìdiǎnr xíng ma?', en: 'Too expensive, can you make it a bit cheaper?' },
      { speaker: '售货员', zh: '四块五一斤卖给你吧。', py: 'Sì kuài wǔ yì jīn mài gěi nǐ ba.', en: 'I will sell them to you for 4.50 yuan per catty.' }
    ],
    vocab: ['钱', '块', '买', '东西', '多少', '太', '便宜'],
    grammar: [
      'Asking price: 这个多少钱？ (How much is this?)',
      'Exclamation of excess: 太 + Adj + 了 (太贵了 = Too expensive!)'
    ],
    quiz: [
      { question: 'Which question phrase asks "How much money"?', options: ['多少钱', '什么时候', '在哪儿', '怎么读'], correctIndex: 0, explanation: '多少钱 asks how much money.' }
    ]
  },
  {
    slug: 'describing-people',
    title: 'Describing People & Appearance (人物描写与外貌)',
    desc: 'Using adjectives to describe heights, looks, and personal qualities.',
    dialogue: [
      { speaker: '大卫', zh: '那位穿白衬衫的高个子先生是谁？', py: 'Nà wèi chuān bái chènshān de gāo gèzi xiānsheng shì shéi?', en: 'Who is that tall gentleman in the white shirt?' },
      { speaker: '王朋', zh: '那是我们的汉语老师王老师，他非常高。', py: 'Nà shì wǒmen de Hànyǔ lǎoshī Wáng lǎoshī, tā fēicháng gāo.', en: 'That is our Chinese teacher Mr. Wang, he is very tall.' },
      { speaker: '大卫', zh: '他旁边的李小姐长得真漂亮。', py: 'Tā pángbiān de Lǐ xiǎojiě zhǎng de zhēn piàoliang.', en: 'Miss Li next to him looks really pretty.' },
      { speaker: '王朋', zh: '是的，大家都非常喜欢她。', py: 'Shì de, dàjiā dōu fēicháng xǐhuan tā.', en: 'Yes, everyone likes her immensely.' }
    ],
    vocab: ['大', '小', '多', '少', '漂亮', '高兴', '好', '人'],
    grammar: [
      'Adjective predicates without 是: Subject + 很 / 非常 + Adjective',
      'Modifying nouns with 的: 漂亮的衣服, 高兴的老师'
    ],
    quiz: [
      { question: 'In "他很高", why is "是" not used?', options: ['Because 是 is optional', 'Adjectival predicates link directly with degree adverbs like 很 without 是', 'Because he is not tall', 'Typo'], correctIndex: 1, explanation: 'In Chinese, adjectives function as predicates directly; "他是很" is ungrammatical.' }
    ]
  },
  {
    slug: 'daily-activities',
    title: 'Daily Activities & Routines (日常生活与作息)',
    desc: 'Talk about typical day habits from waking up to sleeping at night.',
    dialogue: [
      { speaker: '安娜', zh: '你每天几点起床？', py: 'Nǐ měitiān jǐ diǎn qǐchuáng?', en: 'What time do you get up every day?' },
      { speaker: '李明', zh: '我早上七点起床，八点去学校学习。', py: 'Wǒ zǎoshang qī diǎn qǐchuáng, bā diǎn qù xuéxiào xuéxí.', en: 'I get up at 7 AM and go to school to study at 8.' },
      { speaker: '安娜', zh: '晚上你通常做什么呢？', py: 'Wǎnshang nǐ tōngcháng zuò shénme ne?', en: 'What do you typically do in the evening?' },
      { speaker: '李明', zh: '做作业、听音乐，然后十一点睡觉。', py: 'Zuò zuòyè, tīng yīnyuè, ránhòu shíyī diǎn shuìjiào.', en: 'Do homework, listen to music, then sleep at 11.' }
    ],
    vocab: ['做', '学习', '睡觉', '看', '听', '吃', '喝', '工作'],
    grammar: [
      'Sequence of daily routines: Time + Action (八点去学校)',
      'Continuous particle 呢 at end of question indicating active state'
    ],
    quiz: [
      { question: 'What does "去睡觉" mean?', options: ['Go to school', 'Go to sleep', 'Go to work', 'Go to store'], correctIndex: 1, explanation: '睡觉 means to sleep.' }
    ]
  },
  {
    slug: 'asking-questions',
    title: 'Mastering Question Patterns (疑问句与疑问词)',
    desc: 'Comprehensive review of question words: 什么, 谁, 哪儿, 几, 怎么.',
    dialogue: [
      { speaker: '老师', zh: '这是什么东西？', py: 'Zhè shì shénme dōngxi?', en: 'What is this thing?' },
      { speaker: '学生', zh: '这是一本新的汉英词典。', py: 'Zhè shì yì běn xīn de Hàn-Yīng cídiǎn.', en: 'This is a new Chinese-English dictionary.' },
      { speaker: '老师', zh: '你在哪儿买的？多少钱？', py: 'Nǐ zài nǎr mǎi de? Duōshao qián?', en: 'Where did you buy it? How much was it?' },
      { speaker: '学生', zh: '在学校书店买的，五十块钱。', py: 'Zài xuéxiào shūdiàn mǎi de, wǔshí kuài qián.', en: 'Bought at the school bookstore for 50 yuan.' }
    ],
    vocab: ['什么', '谁', '哪', '哪儿', '几', '怎么', '怎么样', '多少'],
    grammar: [
      'Question word occupies the exact syntactic spot of the anticipated answer',
      'Do not append 吗 when a specific question word (什么, 谁) is present'
    ],
    quiz: [
      { question: 'Can you use "吗" in "他是谁吗？"?', options: ['Yes', 'No, because 谁 is already a question word', 'Only in formal speech', 'Always required'], correctIndex: 1, explanation: 'Sentences containing question words do not take 吗.' }
    ]
  }
];

// 10 HSK 2 Lessons
const hsk2Lessons = [
  { slug: 'transportation', title: 'Transportation & Travel (交通与出行)', desc: 'Taking public buses, subways, taxis, and navigating trains and flights.', level: 2 },
  { slug: 'health-and-body', title: 'Health, Sickness & Doctor Visits (健康与看病)', desc: 'Describing bodily symptoms, going to the hospital, and taking medicine.', level: 2 },
  { slug: 'weather-and-seasons', title: 'Weather, Temperatures & Seasons (天气与四季)', desc: 'Discussing sunny, rainy, and snowy days and seasonal changes.', level: 2 },
  { slug: 'work-and-study', title: 'Work, Careers & University Life (职场与学习)', desc: 'Daily office responsibilities, meetings, and academic examinations.', level: 2 },
  { slug: 'hobbies-and-sports', title: 'Hobbies, Sports & Leisure (爱好与体育运动)', desc: 'Playing basketball, soccer, running, dancing, and singing.', level: 2 },
  { slug: 'shopping-and-services', title: 'Shopping, Supermarkets & Services (购物与服务)', desc: 'Interacting with store attendants, sizing clothes, and discounts.', level: 2 },
  { slug: 'travel-and-tourism', title: 'Travel, Airports & Sightseeing (旅行与观光)', desc: 'Airport check-in, booking hotels, and touring historic cities.', level: 2 },
  { slug: 'feelings-and-emotions', title: 'Feelings, Moods & Reactions (情绪与心理感受)', desc: 'Expressing joy, tiredness, anxiety, and happiness with peers.', level: 2 },
  { slug: 'comparisons', title: 'Comparative Structures with 比 (比较句式)', desc: 'Comparing heights, speeds, prices, and quantities in standard Mandarin.', level: 2 },
  { slug: 'giving-instructions', title: 'Giving Instructions & Sequential Advice (指令与建议)', desc: 'Guiding others step-by-step, using 先...然后..., and expressing advice.', level: 2 }
].map((item, idx) => ({
  id: `l2-${idx + 1}`,
  slug: item.slug,
  title: item.title,
  level: 2,
  description: item.desc,
  dialogue: [
    { speaker: '李明', zh: `关于${item.title.split(' ')[0]}，你有什么看法？`, py: 'Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?', en: `Regarding this topic, what is your view?` },
    { speaker: '王华', zh: '虽然比较复杂，但只要认真准备，一切都很顺利。', py: 'Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.', en: 'Although relatively complex, as long as prepared conscientiously, everything goes smoothly.' },
    { speaker: '李明', zh: '那我们一起努力，相互帮助吧！', py: 'Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!', en: 'Then let us strive together and assist one another!' }
  ],
  keyVocab: ['帮助', '准备', '虽然', '但是', '介绍', '懂', '考试', '身体'],
  grammarPoints: [
    'Conjunction structure: 虽然...但是... (although... yet...)',
    'Comparative construction: A 比 B + Adjective',
    'Experienced past action: Verb + 过'
  ],
  practiceQuestions: [
    { question: `What is a primary grammar pattern in HSK 2 ${item.title.split(' ')[0]}?`, options: ['虽然...但是...', '把字句', '被字句', '单纯词'], correctIndex: 0, explanation: '虽然...但是... expresses contrast in HSK 2.' }
  ]
}));

// 10 HSK 3 Lessons
const hsk3Lessons = [
  { slug: 'plans-and-intentions', title: 'Plans, Intentions & Decisions (打算与决定)', desc: 'Expressing upcoming decisions, weekend arrangements, and career intentions.', level: 3 },
  { slug: 'expressing-opinions', title: 'Expressing Opinions & Beliefs (观点与看法)', desc: 'Discussing perspectives using 认为, 觉得, and agreeing or disagreeing.', level: 3 },
  { slug: 'past-experiences', title: 'Past Experiences & Life Milestones (经历与往事)', desc: 'Recounting overseas milestones, life transitions, and lessons learned.', level: 3 },
  { slug: 'problem-solving', title: 'Problem Solving & Overcoming Obstacles (解决问题与挑战)', desc: 'Analyzing bottlenecks, formulating remedies, and overcoming hardships.', level: 3 },
  { slug: 'environment-and-nature', title: 'Environment, Nature & Ecology (环境与自然生态)', desc: 'Discussing climate fluctuations, nature parks, and green habits.', level: 3 },
  { slug: 'education-system', title: 'Education, Campus & Academic Research (教育体制与学术)', desc: 'Collegiate faculties, library research, and intellectual pursuits.', level: 3 },
  { slug: 'relationships-and-society', title: 'Social Relationships & Neighbors (人际关系与社会交往)', desc: 'Collaborating with colleagues, community mutual aid, and harmony.', level: 3 },
  { slug: 'business-and-economy', title: 'Business, Commerce & Job Interviews (商务往来与求职)', desc: 'Departmental meetings, contract negotiations, and career interviews.', level: 3 },
  { slug: 'culture-and-traditions', title: 'Culture, Festivals & Ancient Customs (传统文化与民俗)', desc: 'Spring Festival, Dragon Boat holiday, tea culture, and calligraphy.', level: 3 },
  { slug: 'hsk3-writing-section', title: 'HSK 3 Writing Mastery: Syntax & Characters (书写专攻与句型重组)', desc: 'Mastering disposal 把 sentences, passive 被 sentences, and stroke accuracy.', level: 3 }
].map((item, idx) => ({
  id: `l3-${idx + 1}`,
  slug: item.slug,
  title: item.title,
  level: 3,
  description: item.desc,
  dialogue: [
    { speaker: '张经理', zh: `请把这项关于${item.title.split(' ')[0]}的任务按时落实好。`, py: 'Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.', en: `Please implement this task thoroughly on schedule.` },
    { speaker: '李助理', zh: '请您放心，我们不仅完成了方案设计，而且做好了应急预案。', py: 'Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng\'àn shèjì, érqiě zuò hǎo le yīngjí yù\'àn.', en: 'Rest assured, not only have we finished the design, but also prepared contingency plans.' },
    { speaker: '张经理', zh: '很好！随着经验积累，你的工作水平越来越高了。', py: 'Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.', en: 'Splendid! With accumulated experience, your proficiency is getting higher and higher.' }
  ],
  keyVocab: ['把', '被', '提高', '不仅', '而且', '解决', '环境', '决定'],
  grammarPoints: [
    'Disposal 把 sentence: Subject + 把 + Object + Verb + Result',
    'Progressive increase: 越来越 + Adjective',
    'Compound linkage: 不仅...而且... (not only... but also...)'
  ],
  practiceQuestions: [
    { question: `Which sentence correctly demonstrates the 把 structure?`, options: ['请把门关上。', '请关上门把。', '门请把关上。', '把门请关上。'], correctIndex: 0, explanation: 'Standard 把 structure: Subject + 把 + Object + Verb + Complement.' }
  ]
}));

const allLessons = [
  ...hsk1Lessons.map((l, idx) => ({
    id: `l1-${idx + 1}`,
    slug: l.slug,
    title: l.title,
    level: 1,
    description: l.desc,
    dialogue: l.dialogue,
    keyVocab: l.vocab,
    grammarPoints: l.grammar,
    practiceQuestions: l.quiz
  })),
  ...hsk2Lessons,
  ...hsk3Lessons
];

console.log(`Generated total lessons: ${allLessons.length}`);

const fileContent = `import { Lesson } from '../types';

export const lessonsData: Lesson[] = ${JSON.stringify(allLessons, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/lessons.ts'), fileContent, 'utf8');
console.log('Successfully wrote lessons.ts with all 30 lessons (10 per level)!');
