import type { Lesson } from '../types';

export const lessonsData: Lesson[] = [
  {
    "id": "l1-1",
    "slug": "greetings-and-introductions",
    "title": "Greetings & Introductions (问候与相识)",
    "level": 1,
    "description": "Master foundational greetings, asking names, and polite introductory exchanges.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "你好！请问你叫什么名字？",
        "py": "Nǐ hǎo! Qǐngwèn nǐ jiào shénme míngzi?",
        "en": "Hello! May I ask what your name is?"
      },
      {
        "speaker": "大卫",
        "zh": "你好，李明！我叫大卫。很高兴认识你。",
        "py": "Nǐ hǎo, Lǐ Míng! Wǒ jiào Dàwèi. Hěn gāoxìng rènshi nǐ.",
        "en": "Hello Li Ming! My name is David. Very glad to meet you."
      },
      {
        "speaker": "李明",
        "zh": "你是哪国人？你是学生吗？",
        "py": "Nǐ shì nǎ guó rén? Nǐ shì xuésheng ma?",
        "en": "Which country are you from? Are you a student?"
      },
      {
        "speaker": "大卫",
        "zh": "我是美国人，我也是北京大学的学生。",
        "py": "Wǒ shì Měiguó rén, wǒ yě shì Běijīng Dàxué de xuésheng.",
        "en": "I am American, I am also a student at Peking University."
      }
    ],
    "keyVocab": [
      "你好",
      "叫",
      "名字",
      "高兴",
      "认识",
      "人",
      "学生"
    ],
    "grammarPoints": [
      "Stating identity: A 是 B (我叫大卫，我是学生)",
      "Polite formula: 很高兴认识你 (Very pleased to meet you)",
      "Question particle 吗: Statement + 吗？"
    ],
    "practiceQuestions": [
      {
        "question": "How do you say \"Nice to meet you\"?",
        "options": [
          "对不起",
          "很高兴认识你",
          "没关系",
          "明天见"
        ],
        "correctIndex": 1,
        "explanation": "很高兴认识你 means \"Very glad to meet you\"."
      },
      {
        "question": "Which particle turns statements into yes/no questions?",
        "options": [
          "的",
          "了",
          "吗",
          "呢"
        ],
        "correctIndex": 2,
        "explanation": "吗 (ma) placed at sentence end forms yes/no questions."
      }
    ]
  },
  {
    "id": "l1-2",
    "slug": "numbers-and-dates",
    "title": "Numbers and Calendar Dates (数字与日期)",
    "level": 1,
    "description": "Expressing numbers 1–100, days of the week, months, and calendar dates.",
    "dialogue": [
      {
        "speaker": "安娜",
        "zh": "今天几月几号？星期几？",
        "py": "Jīntiān jǐ yuè jǐ hào? Xīngqī jǐ?",
        "en": "What date is today? What day of the week?"
      },
      {
        "speaker": "王朋",
        "zh": "今天十月三十号，星期五。",
        "py": "Jīntiān shí yuè sānshí hào, xīngqīwǔ.",
        "en": "Today is October 30th, Friday."
      },
      {
        "speaker": "安娜",
        "zh": "明天是你二十一岁生日吗？",
        "py": "Míngtiān shì nǐ èrshíyī suì shēngrì ma?",
        "en": "Is tomorrow your 21st birthday?"
      },
      {
        "speaker": "王朋",
        "zh": "是的！欢迎明天晚上来我家做客。",
        "py": "Shì de! Huānyíng míngtiān wǎnshang lái wǒ jiā zuòkè.",
        "en": "Yes! Welcome to visit my home tomorrow evening."
      }
    ],
    "keyVocab": [
      "今天",
      "明天",
      "月",
      "号",
      "星期",
      "岁",
      "生",
      "日"
    ],
    "grammarPoints": [
      "Date hierarchy: Year (年) -> Month (月) -> Day (号/日)",
      "Days of week: 星期一 through 星期六, 星期天/日 (Sunday)",
      "Inquiring quantity under 10 with 几: 几月几号？"
    ],
    "practiceQuestions": [
      {
        "question": "How do you say \"Friday\" in Chinese?",
        "options": [
          "星期四",
          "星期五",
          "星期六",
          "星期天"
        ],
        "correctIndex": 1,
        "explanation": "星期五 is Friday."
      }
    ]
  },
  {
    "id": "l1-3",
    "slug": "family-members",
    "title": "Family Members & Household (家庭与亲人)",
    "level": 1,
    "description": "Introduce family members, discuss ages, and describe household roles.",
    "dialogue": [
      {
        "speaker": "张华",
        "zh": "你家有几口人？",
        "py": "Nǐ jiā yǒu jǐ kǒu rén?",
        "en": "How many people are in your family?"
      },
      {
        "speaker": "玛丽",
        "zh": "我家有四口人：爸爸、妈妈、哥哥和我。",
        "py": "Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.",
        "en": "My family has four people: dad, mom, older brother and me."
      },
      {
        "speaker": "张华",
        "zh": "你哥哥工作了吗？",
        "py": "Nǐ gēge gōngzuò le ma?",
        "en": "Does your older brother work?"
      },
      {
        "speaker": "玛丽",
        "zh": "他在医院做医生。",
        "py": "Tā zài yīyuàn zuò yīshēng.",
        "en": "He works as a doctor in a hospital."
      }
    ],
    "keyVocab": [
      "爸爸",
      "妈妈",
      "儿子",
      "女儿",
      "家",
      "医生",
      "医院"
    ],
    "grammarPoints": [
      "Measure word for family members: 口 (kǒu) — 四口人",
      "Listing conjunction: 和 (hé) connects nouns only"
    ],
    "practiceQuestions": [
      {
        "question": "Which measure word is used when counting family members?",
        "options": [
          "个",
          "口",
          "本",
          "块"
        ],
        "correctIndex": 1,
        "explanation": "口 (kǒu) is the traditional classifier for family members."
      }
    ]
  },
  {
    "id": "l1-4",
    "slug": "time-expressions",
    "title": "Time Expressions & Daily Clock (时间与钟点)",
    "level": 1,
    "description": "Telling clock time, asking what time it is, and scheduling meetings.",
    "dialogue": [
      {
        "speaker": "小明",
        "zh": "请问现在几点了？",
        "py": "Qǐngwèn xiànzài jǐ diǎn le?",
        "en": "May I ask what time it is now?"
      },
      {
        "speaker": "老师",
        "zh": "现在是上午九点十五分。",
        "py": "Xiànzài shì shàngwǔ jiǔ diǎn shíwǔ fēn.",
        "en": "It is 9:15 AM now."
      },
      {
        "speaker": "小明",
        "zh": "我们几点去上汉语课？",
        "py": "Wǒmen jǐ diǎn qù shàng Hànyǔ kè?",
        "en": "What time do we go to Chinese class?"
      },
      {
        "speaker": "老师",
        "zh": "十点钟准时在三楼教室上课。",
        "py": "Shí diǎn zhōng zhǔnshí zài sān lóu jiàoshì shàngkè.",
        "en": "At 10:00 AM sharp in the 3rd floor classroom."
      }
    ],
    "keyVocab": [
      "点",
      "分钟",
      "现在",
      "上午",
      "中午",
      "下午",
      "时候"
    ],
    "grammarPoints": [
      "Clock time structure: Number + 点 + (Number + 分)",
      "Time words placed before verbs as adverbial modifiers"
    ],
    "practiceQuestions": [
      {
        "question": "What does \"上午九点\" mean?",
        "options": [
          "9 PM",
          "9 AM",
          "7 AM",
          "12 Noon"
        ],
        "correctIndex": 1,
        "explanation": "上午 denotes morning before noon, so 上午九点 is 9 AM."
      }
    ]
  },
  {
    "id": "l1-5",
    "slug": "food-and-drink",
    "title": "Food & Ordering at Restaurants (餐馆点餐与饮食)",
    "level": 1,
    "description": "Learn how to order staple Chinese dishes, request beverages, and pay the bill.",
    "dialogue": [
      {
        "speaker": "服务员",
        "zh": "你好！几位？请问想喝点儿什么？",
        "py": "Nǐ hǎo! Jǐ wèi? Qǐngwèn xiǎng hē diǎnr shénme?",
        "en": "Hello! How many guests? What would you like to drink?"
      },
      {
        "speaker": "客人",
        "zh": "请给我们两杯中国热茶。",
        "py": "Qǐng gěi wǒmen liǎng bēi Zhōngguó rè chá.",
        "en": "Please give us two cups of hot Chinese tea."
      },
      {
        "speaker": "服务员",
        "zh": "想吃点儿什么菜？",
        "py": "Xiǎng chī diǎnr shénme cài?",
        "en": "What dishes would you like to eat?"
      },
      {
        "speaker": "客人",
        "zh": "我们要米饭和一道中国特色菜。",
        "py": "Wǒmen yào mǐfàn hé yí dào Zhōngguó tèsè cài.",
        "en": "We want rice and a Chinese specialty dish."
      }
    ],
    "keyVocab": [
      "吃",
      "喝",
      "茶",
      "水",
      "菜",
      "米饭",
      "水果",
      "饭店"
    ],
    "grammarPoints": [
      "Polite request: 请给我... (Please give me...)",
      "Desire vs intent: 想 (would like to) vs 要 (want / order)"
    ],
    "practiceQuestions": [
      {
        "question": "Which verb is used for drinking liquids like tea and water?",
        "options": [
          "吃",
          "喝",
          "看",
          "听"
        ],
        "correctIndex": 1,
        "explanation": "喝 (hē) is the verb to drink."
      }
    ]
  },
  {
    "id": "l1-6",
    "slug": "places-and-directions",
    "title": "Places and Basic Directions (位置与方位)",
    "level": 1,
    "description": "Asking where locations are situated and describing relative positions.",
    "dialogue": [
      {
        "speaker": "路人",
        "zh": "请问，图书馆在什么地方？",
        "py": "Qǐngwèn, túshūguǎn zài shénme dìfang?",
        "en": "Excuse me, where is the library located?"
      },
      {
        "speaker": "学生",
        "zh": "图书馆在教学楼前面，商店在它后面。",
        "py": "Túshūguǎn zài jiàoxuélóu qiánmian, shāngdiàn zài tā hòumian.",
        "en": "The library is in front of the teaching hall, store is behind it."
      },
      {
        "speaker": "路人",
        "zh": "离这里远不远？",
        "py": "Lí zhèlǐ yuǎn bù yuǎn?",
        "en": "Is it far from here?"
      },
      {
        "speaker": "学生",
        "zh": "不远，向前走两分钟就到了。",
        "py": "Bù yuǎn, xiàng qián zǒu liǎng fēnzhōng jiù dào le.",
        "en": "Not far, walk forward two minutes and you arrive."
      }
    ],
    "keyVocab": [
      "前面",
      "后面",
      "上",
      "下",
      "里",
      "学校",
      "商店",
      "在哪儿"
    ],
    "grammarPoints": [
      "Location: Subject + 在 + Place + 方位词 (前面, 后面, 上面, 下面)",
      "Question form: 在哪儿？ (Where is...?)"
    ],
    "practiceQuestions": [
      {
        "question": "What does \"在学校前面\" mean?",
        "options": [
          "Behind school",
          "Inside school",
          "In front of school",
          "Above school"
        ],
        "correctIndex": 2,
        "explanation": "前面 means in front of."
      }
    ]
  },
  {
    "id": "l1-7",
    "slug": "shopping-and-money",
    "title": "Shopping and Prices (购物与询价)",
    "level": 1,
    "description": "Asking prices, bargaining politely, and understanding yuan transactions.",
    "dialogue": [
      {
        "speaker": "顾客",
        "zh": "这个红苹果多少钱一斤？",
        "py": "Zhè ge hóng píngguǒ duōshao qián yì jīn?",
        "en": "How much are these red apples per catty?"
      },
      {
        "speaker": "售货员",
        "zh": "五块钱一斤，很甜很好吃。",
        "py": "Wǔ kuài qián yì jīn, hěn tián hěn hǎochī.",
        "en": "Five yuan per catty, very sweet and tasty."
      },
      {
        "speaker": "顾客",
        "zh": "太贵了，便宜一点儿行吗？",
        "py": "Tài guì le, piányi yìdiǎnr xíng ma?",
        "en": "Too expensive, can you make it a bit cheaper?"
      },
      {
        "speaker": "售货员",
        "zh": "四块五一斤卖给你吧。",
        "py": "Sì kuài wǔ yì jīn mài gěi nǐ ba.",
        "en": "I will sell them to you for 4.50 yuan per catty."
      }
    ],
    "keyVocab": [
      "钱",
      "块",
      "买",
      "东西",
      "多少",
      "太",
      "便宜"
    ],
    "grammarPoints": [
      "Asking price: 这个多少钱？ (How much is this?)",
      "Exclamation of excess: 太 + Adj + 了 (太贵了 = Too expensive!)"
    ],
    "practiceQuestions": [
      {
        "question": "Which question phrase asks \"How much money\"?",
        "options": [
          "多少钱",
          "什么时候",
          "在哪儿",
          "怎么读"
        ],
        "correctIndex": 0,
        "explanation": "多少钱 asks how much money."
      }
    ]
  },
  {
    "id": "l1-8",
    "slug": "describing-people",
    "title": "Describing People & Appearance (人物描写与外貌)",
    "level": 1,
    "description": "Using adjectives to describe heights, looks, and personal qualities.",
    "dialogue": [
      {
        "speaker": "大卫",
        "zh": "那位穿白衬衫的高个子先生是谁？",
        "py": "Nà wèi chuān bái chènshān de gāo gèzi xiānsheng shì shéi?",
        "en": "Who is that tall gentleman in the white shirt?"
      },
      {
        "speaker": "王朋",
        "zh": "那是我们的汉语老师王老师，他非常高。",
        "py": "Nà shì wǒmen de Hànyǔ lǎoshī Wáng lǎoshī, tā fēicháng gāo.",
        "en": "That is our Chinese teacher Mr. Wang, he is very tall."
      },
      {
        "speaker": "大卫",
        "zh": "他旁边的李小姐长得真漂亮。",
        "py": "Tā pángbiān de Lǐ xiǎojiě zhǎng de zhēn piàoliang.",
        "en": "Miss Li next to him looks really pretty."
      },
      {
        "speaker": "王朋",
        "zh": "是的，大家都非常喜欢她。",
        "py": "Shì de, dàjiā dōu fēicháng xǐhuan tā.",
        "en": "Yes, everyone likes her immensely."
      }
    ],
    "keyVocab": [
      "大",
      "小",
      "多",
      "少",
      "漂亮",
      "高兴",
      "好",
      "人"
    ],
    "grammarPoints": [
      "Adjective predicates without 是: Subject + 很 / 非常 + Adjective",
      "Modifying nouns with 的: 漂亮的衣服, 高兴的老师"
    ],
    "practiceQuestions": [
      {
        "question": "In \"他很高\", why is \"是\" not used?",
        "options": [
          "Because 是 is optional",
          "Adjectival predicates link directly with degree adverbs like 很 without 是",
          "Because he is not tall",
          "Typo"
        ],
        "correctIndex": 1,
        "explanation": "In Chinese, adjectives function as predicates directly; \"他是很\" is ungrammatical."
      }
    ]
  },
  {
    "id": "l1-9",
    "slug": "daily-activities",
    "title": "Daily Activities & Routines (日常生活与作息)",
    "level": 1,
    "description": "Talk about typical day habits from waking up to sleeping at night.",
    "dialogue": [
      {
        "speaker": "安娜",
        "zh": "你每天几点起床？",
        "py": "Nǐ měitiān jǐ diǎn qǐchuáng?",
        "en": "What time do you get up every day?"
      },
      {
        "speaker": "李明",
        "zh": "我早上七点起床，八点去学校学习。",
        "py": "Wǒ zǎoshang qī diǎn qǐchuáng, bā diǎn qù xuéxiào xuéxí.",
        "en": "I get up at 7 AM and go to school to study at 8."
      },
      {
        "speaker": "安娜",
        "zh": "晚上你通常做什么呢？",
        "py": "Wǎnshang nǐ tōngcháng zuò shénme ne?",
        "en": "What do you typically do in the evening?"
      },
      {
        "speaker": "李明",
        "zh": "做作业、听音乐，然后十一点睡觉。",
        "py": "Zuò zuòyè, tīng yīnyuè, ránhòu shíyī diǎn shuìjiào.",
        "en": "Do homework, listen to music, then sleep at 11."
      }
    ],
    "keyVocab": [
      "做",
      "学习",
      "睡觉",
      "看",
      "听",
      "吃",
      "喝",
      "工作"
    ],
    "grammarPoints": [
      "Sequence of daily routines: Time + Action (八点去学校)",
      "Continuous particle 呢 at end of question indicating active state"
    ],
    "practiceQuestions": [
      {
        "question": "What does \"去睡觉\" mean?",
        "options": [
          "Go to school",
          "Go to sleep",
          "Go to work",
          "Go to store"
        ],
        "correctIndex": 1,
        "explanation": "睡觉 means to sleep."
      }
    ]
  },
  {
    "id": "l1-10",
    "slug": "asking-questions",
    "title": "Mastering Question Patterns (疑问句与疑问词)",
    "level": 1,
    "description": "Comprehensive review of question words: 什么, 谁, 哪儿, 几, 怎么.",
    "dialogue": [
      {
        "speaker": "老师",
        "zh": "这是什么东西？",
        "py": "Zhè shì shénme dōngxi?",
        "en": "What is this thing?"
      },
      {
        "speaker": "学生",
        "zh": "这是一本新的汉英词典。",
        "py": "Zhè shì yì běn xīn de Hàn-Yīng cídiǎn.",
        "en": "This is a new Chinese-English dictionary."
      },
      {
        "speaker": "老师",
        "zh": "你在哪儿买的？多少钱？",
        "py": "Nǐ zài nǎr mǎi de? Duōshao qián?",
        "en": "Where did you buy it? How much was it?"
      },
      {
        "speaker": "学生",
        "zh": "在学校书店买的，五十块钱。",
        "py": "Zài xuéxiào shūdiàn mǎi de, wǔshí kuài qián.",
        "en": "Bought at the school bookstore for 50 yuan."
      }
    ],
    "keyVocab": [
      "什么",
      "谁",
      "哪",
      "哪儿",
      "几",
      "怎么",
      "怎么样",
      "多少"
    ],
    "grammarPoints": [
      "Question word occupies the exact syntactic spot of the anticipated answer",
      "Do not append 吗 when a specific question word (什么, 谁) is present"
    ],
    "practiceQuestions": [
      {
        "question": "Can you use \"吗\" in \"他是谁吗？\"?",
        "options": [
          "Yes",
          "No, because 谁 is already a question word",
          "Only in formal speech",
          "Always required"
        ],
        "correctIndex": 1,
        "explanation": "Sentences containing question words do not take 吗."
      }
    ]
  },
  {
    "id": "l2-1",
    "slug": "transportation",
    "title": "Transportation & Travel (交通与出行)",
    "level": 2,
    "description": "Taking public buses, subways, taxis, and navigating trains and flights.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Transportation，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Transportation?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-2",
    "slug": "health-and-body",
    "title": "Health, Sickness & Doctor Visits (健康与看病)",
    "level": 2,
    "description": "Describing bodily symptoms, going to the hospital, and taking medicine.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Health,，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Health,?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-3",
    "slug": "weather-and-seasons",
    "title": "Weather, Temperatures & Seasons (天气与四季)",
    "level": 2,
    "description": "Discussing sunny, rainy, and snowy days and seasonal changes.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Weather,，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Weather,?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-4",
    "slug": "work-and-study",
    "title": "Work, Careers & University Life (职场与学习)",
    "level": 2,
    "description": "Daily office responsibilities, meetings, and academic examinations.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Work,，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Work,?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-5",
    "slug": "hobbies-and-sports",
    "title": "Hobbies, Sports & Leisure (爱好与体育运动)",
    "level": 2,
    "description": "Playing basketball, soccer, running, dancing, and singing.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Hobbies,，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Hobbies,?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-6",
    "slug": "shopping-and-services",
    "title": "Shopping, Supermarkets & Services (购物与服务)",
    "level": 2,
    "description": "Interacting with store attendants, sizing clothes, and discounts.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Shopping,，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Shopping,?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-7",
    "slug": "travel-and-tourism",
    "title": "Travel, Airports & Sightseeing (旅行与观光)",
    "level": 2,
    "description": "Airport check-in, booking hotels, and touring historic cities.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Travel,，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Travel,?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-8",
    "slug": "feelings-and-emotions",
    "title": "Feelings, Moods & Reactions (情绪与心理感受)",
    "level": 2,
    "description": "Expressing joy, tiredness, anxiety, and happiness with peers.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Feelings,，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Feelings,?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-9",
    "slug": "comparisons",
    "title": "Comparative Structures with 比 (比较句式)",
    "level": 2,
    "description": "Comparing heights, speeds, prices, and quantities in standard Mandarin.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Comparative，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Comparative?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l2-10",
    "slug": "giving-instructions",
    "title": "Giving Instructions & Sequential Advice (指令与建议)",
    "level": 2,
    "description": "Guiding others step-by-step, using 先...然后..., and expressing advice.",
    "dialogue": [
      {
        "speaker": "李明",
        "zh": "关于Giving，你有什么看法？",
        "py": "Guānyú zhè ge huàtí, nǐ yǒu shénme kànfǎ?",
        "en": "Regarding this topic, what is your view?"
      },
      {
        "speaker": "王华",
        "zh": "虽然比较复杂，但只要认真准备，一切都很顺利。",
        "py": "Suīrán bǐjiào fùzá, dàn zhǐyào rènzhēn zhǔnbèi, yíqiè dōu hěn shùnlì.",
        "en": "Although relatively complex, as long as prepared conscientiously, everything goes smoothly."
      },
      {
        "speaker": "李明",
        "zh": "那我们一起努力，相互帮助吧！",
        "py": "Nà wǒmen yìqǐ nǔlì, xiānghù bāngzhù ba!",
        "en": "Then let us strive together and assist one another!"
      }
    ],
    "keyVocab": [
      "帮助",
      "准备",
      "虽然",
      "但是",
      "介绍",
      "懂",
      "考试",
      "身体"
    ],
    "grammarPoints": [
      "Conjunction structure: 虽然...但是... (although... yet...)",
      "Comparative construction: A 比 B + Adjective",
      "Experienced past action: Verb + 过"
    ],
    "practiceQuestions": [
      {
        "question": "What is a primary grammar pattern in HSK 2 Giving?",
        "options": [
          "虽然...但是...",
          "把字句",
          "被字句",
          "单纯词"
        ],
        "correctIndex": 0,
        "explanation": "虽然...但是... expresses contrast in HSK 2."
      }
    ]
  },
  {
    "id": "l3-1",
    "slug": "plans-and-intentions",
    "title": "Plans, Intentions & Decisions (打算与决定)",
    "level": 3,
    "description": "Expressing upcoming decisions, weekend arrangements, and career intentions.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Plans,的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-2",
    "slug": "expressing-opinions",
    "title": "Expressing Opinions & Beliefs (观点与看法)",
    "level": 3,
    "description": "Discussing perspectives using 认为, 觉得, and agreeing or disagreeing.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Expressing的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-3",
    "slug": "past-experiences",
    "title": "Past Experiences & Life Milestones (经历与往事)",
    "level": 3,
    "description": "Recounting overseas milestones, life transitions, and lessons learned.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Past的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-4",
    "slug": "problem-solving",
    "title": "Problem Solving & Overcoming Obstacles (解决问题与挑战)",
    "level": 3,
    "description": "Analyzing bottlenecks, formulating remedies, and overcoming hardships.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Problem的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-5",
    "slug": "environment-and-nature",
    "title": "Environment, Nature & Ecology (环境与自然生态)",
    "level": 3,
    "description": "Discussing climate fluctuations, nature parks, and green habits.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Environment,的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-6",
    "slug": "education-system",
    "title": "Education, Campus & Academic Research (教育体制与学术)",
    "level": 3,
    "description": "Collegiate faculties, library research, and intellectual pursuits.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Education,的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-7",
    "slug": "relationships-and-society",
    "title": "Social Relationships & Neighbors (人际关系与社会交往)",
    "level": 3,
    "description": "Collaborating with colleagues, community mutual aid, and harmony.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Social的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-8",
    "slug": "business-and-economy",
    "title": "Business, Commerce & Job Interviews (商务往来与求职)",
    "level": 3,
    "description": "Departmental meetings, contract negotiations, and career interviews.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Business,的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-9",
    "slug": "culture-and-traditions",
    "title": "Culture, Festivals & Ancient Customs (传统文化与民俗)",
    "level": 3,
    "description": "Spring Festival, Dragon Boat holiday, tea culture, and calligraphy.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于Culture,的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  },
  {
    "id": "l3-10",
    "slug": "hsk3-writing-section",
    "title": "HSK 3 Writing Mastery: Syntax & Characters (书写专攻与句型重组)",
    "level": 3,
    "description": "Mastering disposal 把 sentences, passive 被 sentences, and stroke accuracy.",
    "dialogue": [
      {
        "speaker": "张经理",
        "zh": "请把这项关于HSK的任务按时落实好。",
        "py": "Qǐng bǎ zhè xiàng rènwù ànshí luòshí hǎo.",
        "en": "Please implement this task thoroughly on schedule."
      },
      {
        "speaker": "李助理",
        "zh": "请您放心，我们不仅完成了方案设计，而且做好了应急预案。",
        "py": "Qǐng nín fàngxīn, wǒmen bùjǐn wánchéng le fāng'àn shèjì, érqiě zuò hǎo le yīngjí yù'àn.",
        "en": "Rest assured, not only have we finished the design, but also prepared contingency plans."
      },
      {
        "speaker": "张经理",
        "zh": "很好！随着经验积累，你的工作水平越来越高了。",
        "py": "Hěn hǎo! Suízhe jīngyàn jīlěi, nǐ de gōngzuò shuǐpíng yuè lái yuè gāo le.",
        "en": "Splendid! With accumulated experience, your proficiency is getting higher and higher."
      }
    ],
    "keyVocab": [
      "把",
      "被",
      "提高",
      "不仅",
      "而且",
      "解决",
      "环境",
      "决定"
    ],
    "grammarPoints": [
      "Disposal 把 sentence: Subject + 把 + Object + Verb + Result",
      "Progressive increase: 越来越 + Adjective",
      "Compound linkage: 不仅...而且... (not only... but also...)"
    ],
    "practiceQuestions": [
      {
        "question": "Which sentence correctly demonstrates the 把 structure?",
        "options": [
          "请把门关上。",
          "请关上门把。",
          "门请把关上。",
          "把门请关上。"
        ],
        "correctIndex": 0,
        "explanation": "Standard 把 structure: Subject + 把 + Object + Verb + Complement."
      }
    ]
  }
];
