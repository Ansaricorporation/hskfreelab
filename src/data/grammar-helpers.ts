// Auto-generated 88-Rule Comprehensive Grammar Syllabus Engine
// Generated for HSK Free Lab (https://mybwn.com/)

import type { HskLevel } from '../types';

export interface GrammarQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GrammarExample {
  zh: string;
  py: string;
  en: string;
}

export interface StructuralVariations {
  affirmative: string;
  negative: string;
  question: string;
  notes: string;
}

export interface MatchedVocabItem {
  hanzi: string;
  slug: string;
  pinyin: string;
  meaning: string;
  level: HskLevel;
}

export interface RelatedGrammarRule {
  slug: string;
  title: string;
  level: HskLevel;
  category: string;
  pattern: string;
}

export interface NavGrammarRule {
  slug: string;
  title: string;
  level: HskLevel;
}

export interface EnrichedGrammarRule {
  id: string;
  slug: string;
  title: string;
  level: HskLevel;
  cefr: string;
  category: string;
  pattern: string;
  explanation: string;
  structuralVariations: StructuralVariations;
  examples: GrammarExample[];
  commonMistakes: string[];
  examStrategy: string;
  parentLessonSlug: string;
  parentLessonTitle: string;
  quiz: GrammarQuizQuestion[];
  prevRule: NavGrammarRule;
  nextRule: NavGrammarRule;
  relatedRules: RelatedGrammarRule[];
  matchedVocab: MatchedVocabItem[];
}

export const all88GrammarRules: EnrichedGrammarRule[] = [
  {
    "id": "g1-1",
    "slug": "question-particle-ma",
    "title": "Question Particle 吗 (Yes/No Questions)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Questions",
    "pattern": "Statement + 吗？",
    "explanation": "Attach 吗 (ma) to the end of any declarative sentence to turn it directly into a yes/no question without changing word order. 吗 is pronounced with a light, neutral tone.",
    "structuralVariations": {
      "affirmative": "你是学生。 (You are a student.)",
      "negative": "你不是学生。 (You are not a student.)",
      "question": "你是学生吗？ (Are you a student?)",
      "notes": "Word order remains identical to the declarative sentence; only append 吗 at the end."
    },
    "examples": [
      {
        "zh": "你是学生吗？",
        "py": "Nǐ shì xuésheng ma?",
        "en": "Are you a student?"
      },
      {
        "zh": "他喜欢中国菜吗？",
        "py": "Tā xǐhuan Zhōngguó cài ma?",
        "en": "Does he like Chinese food?"
      },
      {
        "zh": "今天冷吗？",
        "py": "Jīntiān lěng ma?",
        "en": "Is it cold today?"
      },
      {
        "zh": "明天你去学校吗？",
        "py": "Míngtiān nǐ qù xuéxiào ma?",
        "en": "Are you going to school tomorrow?"
      }
    ],
    "commonMistakes": [
      "Do NOT use 吗 in sentences that already contain question words like 什么 (shénme) or 谁 (shéi).",
      "Never invert subject and verb when forming questions with 吗; Chinese preserves Subject-Verb-Object word order."
    ],
    "examStrategy": "In HSK 1 listening, the light neutral tone 吗 at the end of utterances signals an inquiry requiring a confirmation response (是 / 对 / 不是 / 不对).",
    "parentLessonSlug": "mastering-question-patterns",
    "quiz": [
      {
        "id": 1,
        "question": "Which of the following is a grammatically correct yes/no question?",
        "options": [
          "你是李明吗？",
          "你是李明什么？",
          "你是谁吗？",
          "李明是在哪儿吗？"
        ],
        "correctIndex": 0,
        "explanation": "Attach 吗 to declarative statements. Sentences with 谁 or 哪儿 cannot take 吗."
      },
      {
        "id": 2,
        "question": "What happens to Chinese word order when adding 吗?",
        "options": [
          "Subject and verb switch positions",
          "Word order remains completely unchanged",
          "The verb moves to the sentence end",
          "The adjective precedes the subject"
        ],
        "correctIndex": 1,
        "explanation": "Mandarin does not use subject-auxiliary inversion. The statement word order is fully preserved."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他今天去学校 ( ___ )？\"",
        "options": [
          "吗",
          "呢",
          "的",
          "很"
        ],
        "correctIndex": 0,
        "explanation": "To ask whether he goes to school today (yes/no), append 吗."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "rhetorical-question-bushi-ma",
      "title": "Rhetorical Questions: 不是...吗？ (Isn't it true that...?)",
      "level": 3
    },
    "nextRule": {
      "slug": "possession-particle-de",
      "title": "Possessive & Attributive Particle 的 (de)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-form-name-xingming",
        "title": "Inquiring Names & Identity with 叫什么名字",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject + 叫 + 什么名字？"
      },
      {
        "slug": "inquiring-quantity-ji",
        "title": "Inquiring Small Quantities with 几 (jǐ)",
        "level": 1,
        "category": "Questions",
        "pattern": "几 + Measure Word / Time Unit？"
      },
      {
        "slug": "location-question-zai-nar",
        "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject / Noun + 在哪儿？"
      },
      {
        "slug": "asking-price-duoshao-qian",
        "title": "Inquiring Prices with 这个多少钱 (duōshao qián)",
        "level": 1,
        "category": "Questions",
        "pattern": "(Demonstrative + Noun) + 多少钱？"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "冷",
        "slug": "leng",
        "pinyin": "lěng",
        "meaning": "cold",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      },
      {
        "hanzi": "明天",
        "slug": "mingtian",
        "pinyin": "míngtiān",
        "meaning": "tomorrow",
        "level": 1
      }
    ]
  },
  {
    "id": "g1-2",
    "slug": "possession-particle-de",
    "title": "Possessive & Attributive Particle 的 (de)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Particles",
    "pattern": "Possessor / Modifier + 的 + Noun",
    "explanation": "的 (de) functions similarly to apostrophe-s ('s) in English. It links possessors to objects or descriptive adjectives to nouns.",
    "structuralVariations": {
      "affirmative": "这是我的书。 (This is my book.)",
      "negative": "这不是我的书。 (This is not my book.)",
      "question": "这是谁的书？ / 这是你的书吗？ (Whose book is this? / Is this your book?)",
      "notes": "For close family or close friends, 的 is frequently omitted (e.g. 我妈妈 instead of 我的妈妈)."
    },
    "examples": [
      {
        "zh": "这是我的书。",
        "py": "Zhè shì wǒ de shū.",
        "en": "This is my book."
      },
      {
        "zh": "漂亮的衣服。",
        "py": "Piàoliang de yīfu.",
        "en": "Beautiful clothes."
      },
      {
        "zh": "那是老师的电脑。",
        "py": "Nà shì lǎoshī de diànnǎo.",
        "en": "That is the teacher's computer."
      },
      {
        "zh": "我爸爸是医生。",
        "py": "Wǒ bàba shì yīshēng.",
        "en": "My father is a doctor. (的 omitted for close kin)"
      }
    ],
    "commonMistakes": [
      "Overusing 的 with close kinship terms like 我妈妈 or 我爸爸, where native speakers prefer omission.",
      "Placing 的 after the noun rather than between the modifier and noun."
    ],
    "examStrategy": "In HSK 1 Reading matching sections, look for 的 to immediately identify noun phrases (e.g. 谁的 + noun).",
    "parentLessonSlug": "describing-people-appearance",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"David's Chinese teacher\" in Chinese?",
        "options": [
          "大卫的汉语老师",
          "汉语老师的大卫",
          "大卫是汉语老师的",
          "老师大卫的汉语"
        ],
        "correctIndex": 0,
        "explanation": "Modifier/Possessor (大卫) + 的 + Head Noun (汉语老师)."
      },
      {
        "id": 2,
        "question": "When can 的 be naturally omitted in everyday spoken Chinese?",
        "options": [
          "Between numbers and objects",
          "With close family members like 我妈妈",
          "Between two verbs",
          "At the end of a question"
        ],
        "correctIndex": 1,
        "explanation": "Kinship and intimate relationships commonly omit 的."
      },
      {
        "id": 3,
        "question": "Complete the phrase: \"那 ( ___ ) 手机是李明的。\"",
        "options": [
          "个",
          "的",
          "很",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "Demonstrative 那 takes classifier 个 before noun 手机."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "question-particle-ma",
      "title": "Question Particle 吗 (Yes/No Questions)",
      "level": 1
    },
    "nextRule": {
      "slug": "statement-shi-identity",
      "title": "Stating Identity & Equational Sentences with 是 (shì)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "attributive-modification-de",
        "title": "Attributive Modification with 的: Adj + 的 + Noun",
        "level": 1,
        "category": "Particles",
        "pattern": "Two-syllable Adj + 的 + Noun"
      },
      {
        "slug": "continuous-particle-ne-query",
        "title": "Contextual Query & State Continuity with 呢 (ne)",
        "level": 1,
        "category": "Particles",
        "pattern": "Noun / Pronoun + 呢？"
      },
      {
        "slug": "change-of-situation-le",
        "title": "Modal Particle 了: Change of State or Situation",
        "level": 2,
        "category": "Particles",
        "pattern": "Predicate / Sentence + 了 (Sentence-Final)"
      },
      {
        "slug": "adverbial-manner-particle-de",
        "title": "Adverbial Manner Structural Particle: 地 (de)",
        "level": 3,
        "category": "Particles",
        "pattern": "Adjective / Modifier + 地 (de) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "电脑",
        "slug": "diannao",
        "pinyin": "diànnǎo",
        "meaning": "computer",
        "level": 1
      },
      {
        "hanzi": "老师",
        "slug": "laoshi",
        "pinyin": "lǎoshī",
        "meaning": "teacher",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-1-1",
    "slug": "statement-shi-identity",
    "title": "Stating Identity & Equational Sentences with 是 (shì)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "Subject + 是 + Noun Phrase",
    "explanation": "是 (shì) serves as the equational copula linking a subject to an identifying noun phrase (nationality, profession, name, identity). It translates to \"am / is / are\".",
    "structuralVariations": {
      "affirmative": "我是中国人。 (I am Chinese.)",
      "negative": "我不是美国人。 (I am not American.)",
      "question": "你是学生吗？ / 你是谁？ (Are you a student? / Who are you?)",
      "notes": "Never use 是 to connect a subject to a bare adjective; use degree adverbs like 很 instead (e.g. 他很高, not 他是高)."
    },
    "examples": [
      {
        "zh": "我是学生。",
        "py": "Wǒ shì xuésheng.",
        "en": "I am a student."
      },
      {
        "zh": "李明是老师。",
        "py": "Lǐ Míng shì lǎoshī.",
        "en": "Li Ming is a teacher."
      },
      {
        "zh": "大卫不是中国人。",
        "py": "Dàwèi bú shì Zhōngguó rén.",
        "en": "David is not Chinese."
      },
      {
        "zh": "这是苹果。",
        "py": "Zhè shì píngguǒ.",
        "en": "This is an apple."
      }
    ],
    "commonMistakes": [
      "Using 是 before adjectives (e.g. saying \"我是高兴\" instead of \"我很高兴\").",
      "Negating 是 with 没 instead of 不 (always use 不是, never 没是)."
    ],
    "examStrategy": "Watch out for reading comprehension distractors where an adjective is paired directly with 是 without a nominalizing 的.",
    "parentLessonSlug": "greetings-and-introductions",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence is grammatically correct?",
        "options": [
          "我是医生。",
          "我是很高。",
          "我没有是学生。",
          "医生是我不。"
        ],
        "correctIndex": 0,
        "explanation": "是 correctly links subject to profession noun 医生. Adjectives do not take 是."
      },
      {
        "id": 2,
        "question": "How do you negate \"他是老师\" (He is a teacher)?",
        "options": [
          "他没是老师。",
          "他不是老师。",
          "他老师不。",
          "他别是老师。"
        ],
        "correctIndex": 1,
        "explanation": "是 is strictly negated with 不 (pronounced bú shì with 2nd tone sandhi)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"王先生 ( ___ ) 北京人。\"",
        "options": [
          "是",
          "很",
          "在",
          "有"
        ],
        "correctIndex": 0,
        "explanation": "Equational sentence expressing provenance/origin takes 是."
      }
    ],
    "parentLessonTitle": "Greetings & Introductions (问候与相识)",
    "prevRule": {
      "slug": "possession-particle-de",
      "title": "Possessive & Attributive Particle 的 (de)",
      "level": 1
    },
    "nextRule": {
      "slug": "polite-formula-hen-gaoxing",
      "title": "Polite Social Formulas: 很高兴认识你",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      },
      {
        "slug": "desire-vs-intent-xiang-yao",
        "title": "Expressing Volition: 想 (xiǎng) vs 要 (yào)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 想 / 要 + Verb + Object"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "老师",
        "slug": "laoshi",
        "pinyin": "lǎoshī",
        "meaning": "teacher",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      },
      {
        "hanzi": "你",
        "slug": "ni",
        "pinyin": "nǐ",
        "meaning": "you (singular)",
        "level": 1
      },
      {
        "hanzi": "苹果",
        "slug": "pingguo",
        "pinyin": "píngguǒ",
        "meaning": "apple",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-1-2",
    "slug": "polite-formula-hen-gaoxing",
    "title": "Polite Social Formulas: 很高兴认识你",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "(我) + 很高兴 + 认识 + 你",
    "explanation": "Standard introductory conversational formula meaning \"Very glad to meet you\". Uses an adjectival predicate (很高兴) followed by a verbal complement phrase (认识你).",
    "structuralVariations": {
      "affirmative": "认识你很高兴！ / 很高兴认识你！",
      "negative": "不常用否定形式。",
      "question": "你高兴吗？",
      "notes": "Can be inverted: 认识你我也很高兴 (Meeting you, I am also very glad)."
    },
    "examples": [
      {
        "zh": "你好！很高兴认识你。",
        "py": "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.",
        "en": "Hello! Very pleased to meet you."
      },
      {
        "zh": "认识你我也很高兴。",
        "py": "Rènshi nǐ wǒ yě hěn gāoxìng.",
        "en": "Nice to meet you too."
      },
      {
        "zh": "大家都很高兴。",
        "py": "Dàjiā dōu hěn gāoxìng.",
        "en": "Everyone is very happy."
      }
    ],
    "commonMistakes": [
      "Omitting 很 before 高兴 when used alone.",
      "Confusing 认识 (to know/recognize someone) with 知道 (to know a fact)."
    ],
    "examStrategy": "Common opening dialogue exchange in HSK 1 Listening Question 1–5 dialogue matching.",
    "parentLessonSlug": "greetings-and-introductions",
    "quiz": [
      {
        "id": 1,
        "question": "What is the appropriate reply to \"很高兴认识你\"?",
        "options": [
          "认识你我也很高兴。",
          "不客气。",
          "对不起。",
          "再见。"
        ],
        "correctIndex": 0,
        "explanation": "\"认识你我也很高兴\" politely reciprocates the greeting."
      },
      {
        "id": 2,
        "question": "Which verb means \"to become acquainted with / recognize a person\"?",
        "options": [
          "认识",
          "知道",
          "看",
          "听"
        ],
        "correctIndex": 0,
        "explanation": "认识 refers to knowing a person; 知道 refers to factual information."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"今天见到你，我 ( ___ ) 高兴。\"",
        "options": [
          "很",
          "是",
          "在",
          "有"
        ],
        "correctIndex": 0,
        "explanation": "Adjectives like 高兴 take degree adverb 很 as default copula/predicate linker."
      }
    ],
    "parentLessonTitle": "Greetings & Introductions (问候与相识)",
    "prevRule": {
      "slug": "statement-shi-identity",
      "title": "Stating Identity & Equational Sentences with 是 (shì)",
      "level": 1
    },
    "nextRule": {
      "slug": "question-form-name-xingming",
      "title": "Inquiring Names & Identity with 叫什么名字",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      },
      {
        "slug": "desire-vs-intent-xiang-yao",
        "title": "Expressing Volition: 想 (xiǎng) vs 要 (yào)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 想 / 要 + Verb + Object"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "高兴",
        "slug": "gaoxing",
        "pinyin": "gāoxìng",
        "meaning": "happy; pleased",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-1-3",
    "slug": "question-form-name-xingming",
    "title": "Inquiring Names & Identity with 叫什么名字",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Questions",
    "pattern": "Subject + 叫 + 什么名字？",
    "explanation": "The standard formula to ask someone's name in Chinese. 叫 (jiào) means \"to be called\", and 什么 (shénme) acts as the interrogative pronoun modifying 名字 (míngzi).",
    "structuralVariations": {
      "affirmative": "我叫李明。 (My name is Li Ming.)",
      "negative": "我不叫大卫。 (My name is not David.)",
      "question": "你叫什么名字？ (What is your name?)",
      "notes": "名字 can be omitted casually: 你叫什么？ (What are you called?)"
    },
    "examples": [
      {
        "zh": "你叫什么名字？",
        "py": "Nǐ jiào shénme míngzi?",
        "en": "What is your name?"
      },
      {
        "zh": "我叫大卫。",
        "py": "Wǒ jiào Dàwèi.",
        "en": "My name is David."
      },
      {
        "zh": "他叫什么？",
        "py": "Tā jiào shénme?",
        "en": "What is he called?"
      }
    ],
    "commonMistakes": [
      "Adding 吗 at the end of the question (e.g. 你叫什么名字吗 is strictly ungrammatical).",
      "Using 是 instead of 叫 when stating one's first name (use 我叫..., or 我的名字是...)."
    ],
    "examStrategy": "Frequently occurs in HSK 1 Section 1 listening dialogue setups.",
    "parentLessonSlug": "greetings-and-introductions",
    "quiz": [
      {
        "id": 1,
        "question": "Which question correctly inquires someone's name?",
        "options": [
          "你叫什么名字？",
          "你是谁名字吗？",
          "你叫名字什么吗？",
          "什么叫你名字？"
        ],
        "correctIndex": 0,
        "explanation": "Subject (你) + 叫 + 什么名字."
      },
      {
        "id": 2,
        "question": "Why is \"你叫什么名字吗？\" incorrect?",
        "options": [
          "It contains two verbs",
          "吗 cannot be used when 什么 is already present",
          "名字 must precede 叫",
          "叫 cannot take a question"
        ],
        "correctIndex": 1,
        "explanation": "Sentences containing specific interrogatives (什么) must never take 吗."
      },
      {
        "id": 3,
        "question": "How do you answer \"你叫什么名字？\"?",
        "options": [
          "我叫王朋。",
          "我是很高兴。",
          "我好。",
          "你在学校。"
        ],
        "correctIndex": 0,
        "explanation": "我叫 + Name directly responds to the prompt."
      }
    ],
    "parentLessonTitle": "Greetings & Introductions (问候与相识)",
    "prevRule": {
      "slug": "polite-formula-hen-gaoxing",
      "title": "Polite Social Formulas: 很高兴认识你",
      "level": 1
    },
    "nextRule": {
      "slug": "date-hierarchy-nian-yue-ri",
      "title": "Date Hierarchy: Year (年) → Month (月) → Day (日/号)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-particle-ma",
        "title": "Question Particle 吗 (Yes/No Questions)",
        "level": 1,
        "category": "Questions",
        "pattern": "Statement + 吗？"
      },
      {
        "slug": "inquiring-quantity-ji",
        "title": "Inquiring Small Quantities with 几 (jǐ)",
        "level": 1,
        "category": "Questions",
        "pattern": "几 + Measure Word / Time Unit？"
      },
      {
        "slug": "location-question-zai-nar",
        "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject / Noun + 在哪儿？"
      },
      {
        "slug": "asking-price-duoshao-qian",
        "title": "Inquiring Prices with 这个多少钱 (duōshao qián)",
        "level": 1,
        "category": "Questions",
        "pattern": "(Demonstrative + Noun) + 多少钱？"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "叫",
        "slug": "jiao-be-called",
        "pinyin": "jiào",
        "meaning": "to be called; to call",
        "level": 1
      },
      {
        "hanzi": "名字",
        "slug": "mingzi",
        "pinyin": "míngzi",
        "meaning": "name",
        "level": 1
      },
      {
        "hanzi": "你",
        "slug": "ni",
        "pinyin": "nǐ",
        "meaning": "you (singular)",
        "level": 1
      },
      {
        "hanzi": "什么",
        "slug": "shenme",
        "pinyin": "shénme",
        "meaning": "what",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-2-1",
    "slug": "date-hierarchy-nian-yue-ri",
    "title": "Date Hierarchy: Year (年) → Month (月) → Day (日/号)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Time & Aspect",
    "pattern": "Year年 + Month月 + Day日/号",
    "explanation": "Chinese temporal hierarchy strictly moves from the largest calendar unit down to the smallest (Year → Month → Day → Day of the Week). In spoken Chinese, 号 (hào) is preferred for the day of the month; 日 (rì) is used in formal and written contexts.",
    "structuralVariations": {
      "affirmative": "今天是2026年11月8号。 (Today is November 8, 2026.)",
      "negative": "今天不是11月8号。 (Today is not November 8.)",
      "question": "今天几月几号？ (What is today's date?)",
      "notes": "Always place the year first, followed by month, then day."
    },
    "examples": [
      {
        "zh": "今天是一月一号。",
        "py": "Jīntiān shì yī yuè yī hào.",
        "en": "Today is January 1st."
      },
      {
        "zh": "他的生日是五月八号。",
        "py": "Tā de shēngrì shì wǔ yuè bā hào.",
        "en": "His birthday is May 8th."
      },
      {
        "zh": "今天几月几号？",
        "py": "Jīntiān jǐ yuè jǐ hào?",
        "en": "What date is today?"
      }
    ],
    "commonMistakes": [
      "Applying the English date order (day-month-year or month-day-year). Chinese must always start with the largest unit.",
      "Using 日 in informal daily conversation when 号 is much more natural."
    ],
    "examStrategy": "In HSK 1 listening calendar questions, numbers are spoken in strict descending scale. Listen for the month number before the day number.",
    "parentLessonSlug": "numbers-and-dates",
    "quiz": [
      {
        "id": 1,
        "question": "How is \"December 25th\" written in Chinese order?",
        "options": [
          "十二月二十五号",
          "二十五号十二月",
          "十二号二十五月",
          "二十五月十二号"
        ],
        "correctIndex": 0,
        "explanation": "Month (十二月) + Day (二十五号)."
      },
      {
        "id": 2,
        "question": "Which word is preferred in informal spoken Chinese for the day of the month?",
        "options": [
          "号 (hào)",
          "日 (rì)",
          "天 (tiān)",
          "月 (yuè)"
        ],
        "correctIndex": 0,
        "explanation": "号 is standard in spoken Chinese; 日 is primarily written/formal."
      },
      {
        "id": 3,
        "question": "Which question asks \"What is today's date?\"",
        "options": [
          "今天几月几号？",
          "今天星期几？",
          "今天多少钱？",
          "你在哪儿？"
        ],
        "correctIndex": 0,
        "explanation": "几月几号 asks for month and date."
      }
    ],
    "parentLessonTitle": "Numbers and Calendar Dates (数字与日期)",
    "prevRule": {
      "slug": "question-form-name-xingming",
      "title": "Inquiring Names & Identity with 叫什么名字",
      "level": 1
    },
    "nextRule": {
      "slug": "days-of-week-xingqi",
      "title": "Days of the Week: 星期 (xīngqī) Construction",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "days-of-week-xingqi",
        "title": "Days of the Week: 星期 (xīngqī) Construction",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "星期 + Number (一至六) / 天(日)"
      },
      {
        "slug": "clock-time-structure-dian-fen",
        "title": "Clock Time Expressions: 点 (diǎn) & 分 (fēn)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Number + 点 + (Number + 分)"
      },
      {
        "slug": "time-words-preverbal-placement",
        "title": "Time Words as Preverbal Adverbial Modifiers",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Subject + Time Word + Verb + (Object)"
      },
      {
        "slug": "daily-routine-sequence-time-verb",
        "title": "Daily Schedule Sequence: Time + Action",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Time Expression + Action Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "八",
        "slug": "ba-eight",
        "pinyin": "bā",
        "meaning": "eight; 8",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "几",
        "slug": "ji-how-many",
        "pinyin": "jǐ",
        "meaning": "how many (usually <10)",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "年",
        "slug": "nian",
        "pinyin": "nián",
        "meaning": "year",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-2-2",
    "slug": "days-of-week-xingqi",
    "title": "Days of the Week: 星期 (xīngqī) Construction",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Time & Aspect",
    "pattern": "星期 + Number (一至六) / 天(日)",
    "explanation": "Days of the week in Chinese are formed by pairing 星期 (xīngqī) with numbers 1 through 6 (Monday = 星期一 through Saturday = 星期六). Sunday is the sole irregular day, using 星期天 or 星期日 rather than a number.",
    "structuralVariations": {
      "affirmative": "明天是星期三。 (Tomorrow is Wednesday.)",
      "negative": "明天不是星期四。 (Tomorrow is not Thursday.)",
      "question": "今天星期几？ (What day of the week is today?)",
      "notes": "Sunday is never *星期七. Always use 星期天 or 星期日."
    },
    "examples": [
      {
        "zh": "今天星期一。",
        "py": "Jīntiān xīngqīyī.",
        "en": "Today is Monday."
      },
      {
        "zh": "昨天是星期天。",
        "py": "Zuótiān shì xīngqītiān.",
        "en": "Yesterday was Sunday."
      },
      {
        "zh": "我们星期六去商店。",
        "py": "Wǒmen xīngqīliù qù shāngdiàn.",
        "en": "We go to the store on Saturday."
      }
    ],
    "commonMistakes": [
      "Saying 星期七 for Sunday. It is strictly 星期天 (spoken) or 星期日 (written).",
      "Confusing 星期 (week) with 月 (month) when asking dates."
    ],
    "examStrategy": "In HSK 1 Listening dialogue matching, pay close attention to 星期天 / 星期日 vs 星期六 to avoid missing schedule changes.",
    "parentLessonSlug": "numbers-and-dates",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"Sunday\" in spoken Mandarin?",
        "options": [
          "星期天",
          "星期七",
          "星期日号",
          "天星期"
        ],
        "correctIndex": 0,
        "explanation": "Sunday is 星期天 in speech, never 星期七."
      },
      {
        "id": 2,
        "question": "How do you ask \"What day of the week is it?\"",
        "options": [
          "今天星期几？",
          "今天星期多少？",
          "星期在几？",
          "什么星期天？"
        ],
        "correctIndex": 0,
        "explanation": "Use 几 with 星期 to ask which day of the week."
      },
      {
        "id": 3,
        "question": "Which day is 星期五?",
        "options": [
          "Friday",
          "Thursday",
          "Wednesday",
          "Saturday"
        ],
        "correctIndex": 0,
        "explanation": "星期五 corresponds to the 5th working day: Friday."
      }
    ],
    "parentLessonTitle": "Numbers and Calendar Dates (数字与日期)",
    "prevRule": {
      "slug": "date-hierarchy-nian-yue-ri",
      "title": "Date Hierarchy: Year (年) → Month (月) → Day (日/号)",
      "level": 1
    },
    "nextRule": {
      "slug": "inquiring-quantity-ji",
      "title": "Inquiring Small Quantities with 几 (jǐ)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "date-hierarchy-nian-yue-ri",
        "title": "Date Hierarchy: Year (年) → Month (月) → Day (日/号)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Year年 + Month月 + Day日/号"
      },
      {
        "slug": "clock-time-structure-dian-fen",
        "title": "Clock Time Expressions: 点 (diǎn) & 分 (fēn)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Number + 点 + (Number + 分)"
      },
      {
        "slug": "time-words-preverbal-placement",
        "title": "Time Words as Preverbal Adverbial Modifiers",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Subject + Time Word + Verb + (Object)"
      },
      {
        "slug": "daily-routine-sequence-time-verb",
        "title": "Daily Schedule Sequence: Time + Action",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Time Expression + Action Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "几",
        "slug": "ji-how-many",
        "pinyin": "jǐ",
        "meaning": "how many (usually <10)",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "六",
        "slug": "liu-six",
        "pinyin": "liù",
        "meaning": "six; 6",
        "level": 1
      },
      {
        "hanzi": "明天",
        "slug": "mingtian",
        "pinyin": "míngtiān",
        "meaning": "tomorrow",
        "level": 1
      },
      {
        "hanzi": "去",
        "slug": "qu",
        "pinyin": "qù",
        "meaning": "to go",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-2-3",
    "slug": "inquiring-quantity-ji",
    "title": "Inquiring Small Quantities with 几 (jǐ)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Questions",
    "pattern": "几 + Measure Word / Time Unit？",
    "explanation": "几 (jǐ) asks \"how many\" for small quantities typically anticipated to be under 10 (family members, age of a young child, clock hours, days). It must almost always be followed by a classifier or measure word.",
    "structuralVariations": {
      "affirmative": "我家有四口人。 (My family has four people.)",
      "negative": "不用于否定句。",
      "question": "你家有几口人？ / 现在几点？ (How many people in your family? / What time is it?)",
      "notes": "For larger quantities or unknown amounts exceeding 10, use 多少 (duōshao) instead."
    },
    "examples": [
      {
        "zh": "你家有几口人？",
        "py": "Nǐ jiā yǒu jǐ kǒu rén?",
        "en": "How many people are there in your family?"
      },
      {
        "zh": "现在几点？",
        "py": "Xiànzài jǐ diǎn?",
        "en": "What time is it now?"
      },
      {
        "zh": "你今天有几节课？",
        "py": "Nǐ jīntiān yǒu jǐ jié kè?",
        "en": "How many classes do you have today?"
      }
    ],
    "commonMistakes": [
      "Omitting the classifier when asking with 几 (e.g. saying 几人 instead of 几口人 or 几个人).",
      "Using 几 for prices (prices regularly exceed 10; use 多少钱)."
    ],
    "examStrategy": "In HSK 1 Reading Part 4, when answering a question with 几, the correct response must contain a specific numeral + classifier.",
    "parentLessonSlug": "numbers-and-dates",
    "quiz": [
      {
        "id": 1,
        "question": "Which is the correct question to ask how many people are in a family?",
        "options": [
          "你家有几口人？",
          "你家有几个多少人？",
          "你家有谁人？",
          "多少口人你家是？"
        ],
        "correctIndex": 0,
        "explanation": "Family members take measure word 口 with 几."
      },
      {
        "id": 2,
        "question": "When should 几 be preferred over 多少?",
        "options": [
          "When the anticipated quantity is under 10",
          "When asking about monetary prices",
          "When the answer is over 100",
          "Only for calendar years"
        ],
        "correctIndex": 0,
        "explanation": "几 is specialized for small numbers (under 10)."
      },
      {
        "id": 3,
        "question": "Complete the question: \"你儿子今年 ( ___ ) 岁？\"",
        "options": [
          "几",
          "多少钱",
          "哪个",
          "怎么"
        ],
        "correctIndex": 0,
        "explanation": "For a young child's age, 几岁 is standard."
      }
    ],
    "parentLessonTitle": "Numbers and Calendar Dates (数字与日期)",
    "prevRule": {
      "slug": "days-of-week-xingqi",
      "title": "Days of the Week: 星期 (xīngqī) Construction",
      "level": 1
    },
    "nextRule": {
      "slug": "measure-word-kou-family",
      "title": "Measure Word for Family Members: 口 (kǒu)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-particle-ma",
        "title": "Question Particle 吗 (Yes/No Questions)",
        "level": 1,
        "category": "Questions",
        "pattern": "Statement + 吗？"
      },
      {
        "slug": "question-form-name-xingming",
        "title": "Inquiring Names & Identity with 叫什么名字",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject + 叫 + 什么名字？"
      },
      {
        "slug": "location-question-zai-nar",
        "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject / Noun + 在哪儿？"
      },
      {
        "slug": "asking-price-duoshao-qian",
        "title": "Inquiring Prices with 这个多少钱 (duōshao qián)",
        "level": 1,
        "category": "Questions",
        "pattern": "(Demonstrative + Noun) + 多少钱？"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "几",
        "slug": "ji-how-many",
        "pinyin": "jǐ",
        "meaning": "how many (usually <10)",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "你",
        "slug": "ni",
        "pinyin": "nǐ",
        "meaning": "you (singular)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-3-1",
    "slug": "measure-word-kou-family",
    "title": "Measure Word for Family Members: 口 (kǒu)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "Number + 口 + 人",
    "explanation": "In Mandarin, countable nouns require a classifier (量词). For enumeration of family members living in a household, the traditional measure word is 口 (kǒu), literally \"mouth\".",
    "structuralVariations": {
      "affirmative": "我家有五口人。 (My family has five people.)",
      "negative": "我家没有五口人。 (My family does not have five people.)",
      "question": "你家有几口人？ (How many people in your family?)",
      "notes": "For general people outside a household, use 个 (e.g., 三个人)."
    },
    "examples": [
      {
        "zh": "我家有四口人：爸爸、妈妈、姐姐和我。",
        "py": "Wǒ jiā yǒu sì kǒu rén: bàba, māma, jiějie hé wǒ.",
        "en": "My family has four people: dad, mom, older sister, and me."
      },
      {
        "zh": "他们家有三口人。",
        "py": "Tāmen jiā yǒu sān kǒu rén.",
        "en": "Their family has three people."
      },
      {
        "zh": "你家有几口人？",
        "py": "Nǐ jiā yǒu jǐ kǒu rén?",
        "en": "How many people are there in your family?"
      }
    ],
    "commonMistakes": [
      "Using 口 for people outside of a family unit (saying \"学校有三口人\" is incorrect; use 三个人).",
      "Omitting the measure word entirely (saying \"我有四人\")."
    ],
    "examStrategy": "In HSK 1, pairing 口 with 人 in family dialogues is a consistent testing point.",
    "parentLessonSlug": "family-members-household",
    "quiz": [
      {
        "id": 1,
        "question": "Which measure word is used when counting family members in a household?",
        "options": [
          "口 (kǒu)",
          "个 (gè)",
          "只 (zhī)",
          "本 (běn)"
        ],
        "correctIndex": 0,
        "explanation": "口 is the specific classifier for family members."
      },
      {
        "id": 2,
        "question": "Complete: \"我家有三 ( ___ ) 人。\"",
        "options": [
          "口",
          "块",
          "本",
          "天"
        ],
        "correctIndex": 0,
        "explanation": "三口人 is the standard phrasing."
      },
      {
        "id": 3,
        "question": "Can you use 口 to count students in a classroom?",
        "options": [
          "No, use 个 for students in a class",
          "Yes, always use 口",
          "Only if they are related",
          "Only on weekends"
        ],
        "correctIndex": 0,
        "explanation": "口 is restricted to family households; general people take 个."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "inquiring-quantity-ji",
      "title": "Inquiring Small Quantities with 几 (jǐ)",
      "level": 1
    },
    "nextRule": {
      "slug": "listing-conjunction-he",
      "title": "Listing Conjunction 和 (hé) for Noun Phrases",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      },
      {
        "slug": "desire-vs-intent-xiang-yao",
        "title": "Expressing Volition: 想 (xiǎng) vs 要 (yào)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 想 / 要 + Verb + Object"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "和",
        "slug": "he-and",
        "pinyin": "hé",
        "meaning": "and; with",
        "level": 1
      },
      {
        "hanzi": "几",
        "slug": "ji-how-many",
        "pinyin": "jǐ",
        "meaning": "how many (usually <10)",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "妈妈",
        "slug": "mama",
        "pinyin": "māma",
        "meaning": "mother; mom",
        "level": 1
      },
      {
        "hanzi": "没有",
        "slug": "meiyou",
        "pinyin": "méiyǒu",
        "meaning": "to not have; there is not",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-3-2",
    "slug": "listing-conjunction-he",
    "title": "Listing Conjunction 和 (hé) for Noun Phrases",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Conjunctions",
    "pattern": "Noun 1 + 和 + Noun 2",
    "explanation": "和 (hé) translates to \"and\", but unlike English \"and\", it can ONLY connect nouns, pronouns, or noun phrases. It cannot connect clauses or complete sentences.",
    "structuralVariations": {
      "affirmative": "爸爸和我去北京。 (Dad and I go to Beijing.)",
      "negative": "爸爸和我都不吃肉。 (Dad and I both don't eat meat.)",
      "question": "你和李明是同学吗？ (Are you and Li Ming classmates?)",
      "notes": "To connect sentences or clauses, use 也, 还, 或者, or start a new clause."
    },
    "examples": [
      {
        "zh": "我和李明是好朋友。",
        "py": "Wǒ hé Lǐ Míng shì hǎo péngyou.",
        "en": "Li Ming and I are good friends."
      },
      {
        "zh": "他喜欢吃米饭和面条。",
        "py": "Tā xǐhuan chī mǐfàn hé miàntiáo.",
        "en": "He likes eating rice and noodles."
      },
      {
        "zh": "茶和水都在桌子上。",
        "py": "Chá hé shuǐ dōu zài zhuōzi shang.",
        "en": "Both tea and water are on the table."
      }
    ],
    "commonMistakes": [
      "Connecting two verb phrases or complete sentences with 和 (e.g. saying \"我去商店和我买苹果\" is ungrammatical; omit 和).",
      "Placing 和 at the beginning of a sentence."
    ],
    "examStrategy": "In HSK 1 Reading Part 2, when joining words in a list, 和 should only appear between noun items.",
    "parentLessonSlug": "family-members-household",
    "quiz": [
      {
        "id": 1,
        "question": "What types of words can 和 connect in Mandarin?",
        "options": [
          "Nouns and pronouns only",
          "Two full sentences",
          "Verbs and adjectives",
          "Punctuation marks"
        ],
        "correctIndex": 0,
        "explanation": "和 strictly coordinates noun phrases, not clauses or sentences."
      },
      {
        "id": 2,
        "question": "Which of the following sentences is grammatically INCORRECT?",
        "options": [
          "我去学校和我想睡觉。",
          "老师和学生都在教室。",
          "书和本子在桌子上。",
          "你和我一起去吧。"
        ],
        "correctIndex": 0,
        "explanation": "和 cannot link two clauses (我去学校 and 我想睡觉)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"桌子上有苹果 ( ___ ) 水果。\"",
        "options": [
          "和",
          "很",
          "在",
          "个"
        ],
        "correctIndex": 0,
        "explanation": "和 coordinates nouns 苹果 and 水果."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "measure-word-kou-family",
      "title": "Measure Word for Family Members: 口 (kǒu)",
      "level": 1
    },
    "nextRule": {
      "slug": "clock-time-structure-dian-fen",
      "title": "Clock Time Expressions: 点 (diǎn) & 分 (fēn)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-particle-ma",
        "title": "Question Particle 吗 (Yes/No Questions)",
        "level": 1,
        "category": "Questions",
        "pattern": "Statement + 吗？"
      },
      {
        "slug": "possession-particle-de",
        "title": "Possessive & Attributive Particle 的 (de)",
        "level": 1,
        "category": "Particles",
        "pattern": "Possessor / Modifier + 的 + Noun"
      },
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "茶",
        "slug": "cha-tea",
        "pinyin": "chá",
        "meaning": "tea",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-4-1",
    "slug": "clock-time-structure-dian-fen",
    "title": "Clock Time Expressions: 点 (diǎn) & 分 (fēn)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Time & Aspect",
    "pattern": "Number + 点 + (Number + 分)",
    "explanation": "Clock hours are expressed with 点 (diǎn, hour/o'clock), and minutes with 分 (fēn). Half past is 半 (bàn). Note that two o'clock is 两点 (liǎng diǎn), never *二点.",
    "structuralVariations": {
      "affirmative": "现在是八点三十分。 / 现在两点半。",
      "negative": "现在不是九点。",
      "question": "现在几点？ (What time is it now?)",
      "notes": "Always use 两点 (liǎng diǎn) for 2 o'clock, not 二点."
    },
    "examples": [
      {
        "zh": "现在几点？",
        "py": "Xiànzài jǐ diǎn?",
        "en": "What time is it now?"
      },
      {
        "zh": "现在是上午十点十分。",
        "py": "Xiànzài shì shàngwǔ shí diǎn shí fēn.",
        "en": "It is 10:10 AM right now."
      },
      {
        "zh": "我们下午两点半见。",
        "py": "Wǒmen xiàwǔ liǎng diǎn bàn jiàn.",
        "en": "We will meet at 2:30 PM."
      }
    ],
    "commonMistakes": [
      "Saying 二点 instead of 两点 for two o'clock.",
      "Putting the clock time after the main verb (in Chinese, time expressions must precede the verb)."
    ],
    "examStrategy": "In HSK 1 Listening, questions frequently test distinguishing morning (上午) vs afternoon (下午) paired with clock times.",
    "parentLessonSlug": "time-expressions-daily-clock",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"2:00\" in Chinese?",
        "options": [
          "两点 (liǎng diǎn)",
          "二点 (èr diǎn)",
          "两分 (liǎng fēn)",
          "二时 (èr shí)"
        ],
        "correctIndex": 0,
        "explanation": "Two o'clock is strictly 两点."
      },
      {
        "id": 2,
        "question": "How do you say \"3:30\"?",
        "options": [
          "三点半 (sān diǎn bàn)",
          "三点三十时",
          "半点三",
          "三时半"
        ],
        "correctIndex": 0,
        "explanation": "三点半 denotes half past three."
      },
      {
        "id": 3,
        "question": "Where does the time word go in \"We eat at 12:00\"?",
        "options": [
          "我们十二点吃饭。",
          "我们吃饭十二点。",
          "十二点吃饭我们在。",
          "吃饭我们十二点。"
        ],
        "correctIndex": 0,
        "explanation": "Time words must precede the action verb."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "listing-conjunction-he",
      "title": "Listing Conjunction 和 (hé) for Noun Phrases",
      "level": 1
    },
    "nextRule": {
      "slug": "time-words-preverbal-placement",
      "title": "Time Words as Preverbal Adverbial Modifiers",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "date-hierarchy-nian-yue-ri",
        "title": "Date Hierarchy: Year (年) → Month (月) → Day (日/号)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Year年 + Month月 + Day日/号"
      },
      {
        "slug": "days-of-week-xingqi",
        "title": "Days of the Week: 星期 (xīngqī) Construction",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "星期 + Number (一至六) / 天(日)"
      },
      {
        "slug": "time-words-preverbal-placement",
        "title": "Time Words as Preverbal Adverbial Modifiers",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Subject + Time Word + Verb + (Object)"
      },
      {
        "slug": "daily-routine-sequence-time-verb",
        "title": "Daily Schedule Sequence: Time + Action",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Time Expression + Action Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "八",
        "slug": "ba-eight",
        "pinyin": "bā",
        "meaning": "eight; 8",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "二",
        "slug": "er",
        "pinyin": "èr",
        "meaning": "two; 2",
        "level": 1
      },
      {
        "hanzi": "几",
        "slug": "ji-how-many",
        "pinyin": "jǐ",
        "meaning": "how many (usually <10)",
        "level": 1
      },
      {
        "hanzi": "九",
        "slug": "jiu-nine",
        "pinyin": "jiǔ",
        "meaning": "nine; 9",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-4-2",
    "slug": "time-words-preverbal-placement",
    "title": "Time Words as Preverbal Adverbial Modifiers",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Time & Aspect",
    "pattern": "Subject + Time Word + Verb + (Object)",
    "explanation": "In Mandarin Chinese, temporal adverbials (today, tomorrow, at 8:00) must strictly be placed BEFORE the predicate verb (or before the subject at the very beginning of the sentence). They can never be placed at the end of the sentence.",
    "structuralVariations": {
      "affirmative": "我今天下午去医院。 / 今天下午我去医院。",
      "negative": "我今天下午不去医院。",
      "question": "你今天下午去医院吗？ / 你什么时候去医院？",
      "notes": "Subject + Time + Verb OR Time + Subject + Verb. End-of-sentence time words are strictly forbidden."
    },
    "examples": [
      {
        "zh": "我明天去北京。",
        "py": "Wǒ míngtiān qù Běijīng.",
        "en": "I am going to Beijing tomorrow."
      },
      {
        "zh": "他早上七点起床。",
        "py": "Tā zǎoshang qī diǎn qǐchuáng.",
        "en": "He gets up at 7:00 AM."
      },
      {
        "zh": "我们昨天没去学校。",
        "py": "Wǒmen zuótiān méi qù xuéxiào.",
        "en": "We did not go to school yesterday."
      }
    ],
    "commonMistakes": [
      "Placing the time phrase at the end of the sentence, mirroring English (e.g. saying \"我去北京明天\" is incorrect).",
      "Separating time from the predicate with inappropriate prepositions."
    ],
    "examStrategy": "In HSK 1 Reading Part 1 & 3 sentence sorting, always place the time phrase before the action verb.",
    "parentLessonSlug": "time-expressions-daily-clock",
    "quiz": [
      {
        "id": 1,
        "question": "Which word order is correct in Mandarin?",
        "options": [
          "我明天去中国。",
          "我去中国明天。",
          "去中国明天我。",
          "去我明天中国。"
        ],
        "correctIndex": 0,
        "explanation": "Time words (明天) strictly precede the verb (去)."
      },
      {
        "id": 2,
        "question": "Can the time word appear at the very beginning of a sentence?",
        "options": [
          "Yes (e.g. 明天我去中国)",
          "No, it must always follow the subject",
          "Only in questions",
          "Only on weekends"
        ],
        "correctIndex": 0,
        "explanation": "Time expressions can precede the subject: Time + Subject + Verb."
      },
      {
        "id": 3,
        "question": "Put in order: [八点 / 去学校 / 哥哥 / 早上]",
        "options": [
          "哥哥早上八点去学校。",
          "哥哥去学校早上八点。",
          "去学校哥哥早上八点。",
          "早上八点去学校哥哥。"
        ],
        "correctIndex": 0,
        "explanation": "Subject + Time + Verb + Object is standard syntax."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "clock-time-structure-dian-fen",
      "title": "Clock Time Expressions: 点 (diǎn) & 分 (fēn)",
      "level": 1
    },
    "nextRule": {
      "slug": "polite-request-qing-gei-wo",
      "title": "Polite Requests with 请 (qǐng) and 请给我",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "date-hierarchy-nian-yue-ri",
        "title": "Date Hierarchy: Year (年) → Month (月) → Day (日/号)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Year年 + Month月 + Day日/号"
      },
      {
        "slug": "days-of-week-xingqi",
        "title": "Days of the Week: 星期 (xīngqī) Construction",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "星期 + Number (一至六) / 天(日)"
      },
      {
        "slug": "clock-time-structure-dian-fen",
        "title": "Clock Time Expressions: 点 (diǎn) & 分 (fēn)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Number + 点 + (Number + 分)"
      },
      {
        "slug": "daily-routine-sequence-time-verb",
        "title": "Daily Schedule Sequence: Time + Action",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Time Expression + Action Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      },
      {
        "hanzi": "明天",
        "slug": "mingtian",
        "pinyin": "míngtiān",
        "meaning": "tomorrow",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-5-1",
    "slug": "polite-request-qing-gei-wo",
    "title": "Polite Requests with 请 (qǐng) and 请给我",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "请 + (给 + 我) + Noun / Verb",
    "explanation": "请 (qǐng) means \"please\" and initiates polite imperative requests, invitations, and hospitality formulas. In dining and service contexts, 请给我 (qǐng gěi wǒ) means \"please give me / please bring me\".",
    "structuralVariations": {
      "affirmative": "请坐。 / 请喝茶。 / 请给我一杯水。",
      "negative": "请不要说话。 (Please do not speak.)",
      "question": "请问，洗手间在哪儿？ (Excuse me, where is the restroom?)",
      "notes": "请问 (qǐngwèn) is the polite opening phrase \"may I ask / excuse me\"."
    },
    "examples": [
      {
        "zh": "请给我一杯水。",
        "py": "Qǐng gěi wǒ yì bēi shuǐ.",
        "en": "Please give me a cup of water."
      },
      {
        "zh": "请坐，请喝茶。",
        "py": "Qǐng zuò, qǐng hē chá.",
        "en": "Please sit down, please drink tea."
      },
      {
        "zh": "请问，这个多少钱？",
        "py": "Qǐngwèn, zhèige duōshao qián?",
        "en": "Excuse me, how much is this?"
      }
    ],
    "commonMistakes": [
      "Placing 请 at the end of the sentence like English \"please\" (saying \"给我水，请\" is incorrect; 请 must precede the clause).",
      "Confusing 请 (please) with 谢谢 (thank you)."
    ],
    "examStrategy": "In HSK 1 Listening dialogue matching, sentences starting with 请问 invariably represent an inquiry requesting information from a clerk or bystander.",
    "parentLessonSlug": "food-ordering-restaurants",
    "quiz": [
      {
        "id": 1,
        "question": "Where does 请 (please) appear in a Mandarin sentence?",
        "options": [
          "At the start of the verb phrase",
          "At the very end of the sentence",
          "After the object noun",
          "Between verb and object"
        ],
        "correctIndex": 0,
        "explanation": "请 always leads the imperative phrase."
      },
      {
        "id": 2,
        "question": "How do you politely ask \"Excuse me, what is your name?\"",
        "options": [
          "请问，你叫什么名字？",
          "请叫你名字问？",
          "你叫名字请？",
          "谢谢，你名字叫什么？"
        ],
        "correctIndex": 0,
        "explanation": "请问 introduces courteous inquiries."
      },
      {
        "id": 3,
        "question": "Complete the restaurant request: \"服务员， ( ___ ) 给我菜单。\"",
        "options": [
          "请",
          "是",
          "在",
          "很"
        ],
        "correctIndex": 0,
        "explanation": "请 is the imperative courtesy marker."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "time-words-preverbal-placement",
      "title": "Time Words as Preverbal Adverbial Modifiers",
      "level": 1
    },
    "nextRule": {
      "slug": "desire-vs-intent-xiang-yao",
      "title": "Expressing Volition: 想 (xiǎng) vs 要 (yào)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "desire-vs-intent-xiang-yao",
        "title": "Expressing Volition: 想 (xiǎng) vs 要 (yào)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 想 / 要 + Verb + Object"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "茶",
        "slug": "cha-tea",
        "pinyin": "chá",
        "meaning": "tea",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "多少",
        "slug": "duoshao",
        "pinyin": "duōshao",
        "meaning": "how many; how much",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-5-2",
    "slug": "desire-vs-intent-xiang-yao",
    "title": "Expressing Volition: 想 (xiǎng) vs 要 (yào)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "Subject + 想 / 要 + Verb + Object",
    "explanation": "Both verbs convey desire, but differ in tone: 想 (xiǎng) expresses an internal wish or longing (\"would like to / thinking of doing\"), while 要 (yào) expresses firm determination, intention, or an active demand (\"want to / going to / must have\").",
    "structuralVariations": {
      "affirmative": "我想喝茶。 / 我要这件衣服。",
      "negative": "我不想去。 (I don't want to go — note: negative is regularly 不想, as 不要 means \"don't / forbidden\").",
      "question": "你想吃什么？ / 你要咖啡吗？",
      "notes": "To soften requests, use 想; in ordering goods, 要 is direct and natural."
    },
    "examples": [
      {
        "zh": "我想去中国学汉语。",
        "py": "Wǒ xiǎng qù Zhōngguó xué Hànyǔ.",
        "en": "I would like to go to China to study Chinese."
      },
      {
        "zh": "我要一杯热咖啡。",
        "py": "Wǒ yào yì bēi rè kāfēi.",
        "en": "I want a cup of hot coffee."
      },
      {
        "zh": "我今天不想去商店。",
        "py": "Wǒ jīntiān bù xiǎng qù shāngdiàn.",
        "en": "I don't feel like going to the store today."
      }
    ],
    "commonMistakes": [
      "Using 不要 to say \"I don't want to do X\". Native speakers use 不想; 不要 is an imperative command meaning \"Don't do that!\".",
      "Confusing 想 (to miss someone / to think) with 想要."
    ],
    "examStrategy": "In HSK 1 Reading and Listening comprehension, 想 indicates an internal hope, while 要 indicates an immediate action plan.",
    "parentLessonSlug": "food-ordering-restaurants",
    "quiz": [
      {
        "id": 1,
        "question": "Which modal expresses a polite, soft desire (\"would like to\")?",
        "options": [
          "想 (xiǎng)",
          "要 (yào)",
          "必须 (bìxū)",
          "去 (qù)"
        ],
        "correctIndex": 0,
        "explanation": "想 conveys a soft, polite desire (\"would like to\")."
      },
      {
        "id": 2,
        "question": "How do you say \"I don't feel like eating right now\"?",
        "options": [
          "我现在不想吃。",
          "我现在不要吃。",
          "我现在没想吃。",
          "我吃不想现在。"
        ],
        "correctIndex": 0,
        "explanation": "不想 expresses lack of desire."
      },
      {
        "id": 3,
        "question": "What does \"不要说话！\" mean?",
        "options": [
          "Don't speak! (Prohibition)",
          "I would like to speak",
          "He wants to speak",
          "May I speak?"
        ],
        "correctIndex": 0,
        "explanation": "不要 acts as a negative command (\"Don't!\")."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "polite-request-qing-gei-wo",
      "title": "Polite Requests with 请 (qǐng) and 请给我",
      "level": 1
    },
    "nextRule": {
      "slug": "spatial-location-zai-fangwei",
      "title": "Spatial Location: Subject + 在 + Place + 方位词",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "茶",
        "slug": "cha-tea",
        "pinyin": "chá",
        "meaning": "tea",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-6-1",
    "slug": "spatial-location-zai-fangwei",
    "title": "Spatial Location: Subject + 在 + Place + 方位词",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "Subject + 在 + Place + (方位词)",
    "explanation": "The verb 在 (zài) expresses physical presence (\"to be at / in / on\"). When indicating specific spatial orientation, pair the place noun with position words: 上面 (on/above), 下面 (under/below), 前面 (in front), 后面 (behind), 里 (inside).",
    "structuralVariations": {
      "affirmative": "小猫在桌子下面。 (The kitten is under the table.)",
      "negative": "小猫不在桌子下面。 (The kitten is not under the table.)",
      "question": "小猫在哪儿？ (Where is the kitten?)",
      "notes": "In Chinese, the reference landmark comes FIRST, followed by the spatial direction: 桌子 + 下面."
    },
    "examples": [
      {
        "zh": "书在桌子上。",
        "py": "Shū zài zhuōzi shang.",
        "en": "The book is on the table."
      },
      {
        "zh": "他在学校前面。",
        "py": "Tā zài xuéxiào qiánmiàn.",
        "en": "He is in front of the school."
      },
      {
        "zh": "我的电脑在房间里。",
        "py": "Wǒ de diànnǎo zài fángjiān lǐ.",
        "en": "My computer is inside the room."
      }
    ],
    "commonMistakes": [
      "Reversing position word order (saying 下面桌子 instead of 桌子下面). Landmark always precedes direction in Chinese.",
      "Using 是 instead of 在 for physical location (saying \"书是桌子上\" is incorrect)."
    ],
    "examStrategy": "In HSK 1 Reading Part 1 pictures, look for spatial cues: 前面 (front), 后面 (back), 里 (inside), 上 (top).",
    "parentLessonSlug": "places-basic-directions",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"The cat is under the chair\"?",
        "options": [
          "猫在椅子下面。",
          "猫在下面椅子。",
          "猫是椅子下面。",
          "椅子在猫下面。"
        ],
        "correctIndex": 0,
        "explanation": "Subject (猫) + 在 + Landmark (椅子) + Direction (下面)."
      },
      {
        "id": 2,
        "question": "Which word means \"in front\"?",
        "options": [
          "前面 (qiánmiàn)",
          "后面 (hòumiàn)",
          "上面 (shàngmiàn)",
          "里面 (lǐmiàn)"
        ],
        "correctIndex": 0,
        "explanation": "前面 means front."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"老师现在 ( ___ ) 教室里。\"",
        "options": [
          "在",
          "是",
          "有",
          "很"
        ],
        "correctIndex": 0,
        "explanation": "在 indicates spatial location."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "desire-vs-intent-xiang-yao",
      "title": "Expressing Volition: 想 (xiǎng) vs 要 (yào)",
      "level": 1
    },
    "nextRule": {
      "slug": "location-question-zai-nar",
      "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "电脑",
        "slug": "diannao",
        "pinyin": "diànnǎo",
        "meaning": "computer",
        "level": 1
      },
      {
        "hanzi": "后面",
        "slug": "houmian",
        "pinyin": "hòumian",
        "meaning": "behind; rear",
        "level": 1
      },
      {
        "hanzi": "里",
        "slug": "li-inside",
        "pinyin": "lǐ",
        "meaning": "inside; in",
        "level": 1
      },
      {
        "hanzi": "猫",
        "slug": "mao",
        "pinyin": "māo",
        "meaning": "cat",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-6-2",
    "slug": "location-question-zai-nar",
    "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Questions",
    "pattern": "Subject / Noun + 在哪儿？",
    "explanation": "To ask \"Where is [something/someone]?\", attach the interrogative location pronoun 哪儿 (nǎr) or 哪里 (nǎlǐ) after the prepositional verb 在 (zài).",
    "structuralVariations": {
      "affirmative": "洗手间在前面。 (The restroom is in front.)",
      "negative": "洗手间不在那儿。 (The restroom is not there.)",
      "question": "洗手间在哪儿？ (Where is the restroom?)",
      "notes": "哪儿 (with retroflex -r) is dominant in northern China; 哪里 is common in southern regions."
    },
    "examples": [
      {
        "zh": "请问，洗手间在哪儿？",
        "py": "Qǐngwèn, xǐshǒujiān zài nǎr?",
        "en": "Excuse me, where is the restroom?"
      },
      {
        "zh": "你的汉语老师在哪儿？",
        "py": "Nǐ de Hànyǔ lǎoshī zài nǎr?",
        "en": "Where is your Chinese teacher?"
      },
      {
        "zh": "医院在哪里？",
        "py": "Yīyuàn zài nǎlǐ?",
        "en": "Where is the hospital?"
      }
    ],
    "commonMistakes": [
      "Confusing 哪儿 (nǎr, where - 3rd tone with mouth radical) with 那儿 (nàr, there - 4th tone demonstrative).",
      "Adding 吗 to 在哪儿 (saying \"医院在哪儿吗\" is ungrammatical)."
    ],
    "examStrategy": "High-frequency question in HSK 1 listening situations. The speaker asks 在哪儿, and the answer identifies a location landmark.",
    "parentLessonSlug": "places-basic-directions",
    "quiz": [
      {
        "id": 1,
        "question": "Which tone does 哪儿 (where) have?",
        "options": [
          "3rd tone (nǎr)",
          "4th tone (nàr)",
          "1st tone (nār)",
          "2nd tone (nár)"
        ],
        "correctIndex": 0,
        "explanation": "哪 (3rd tone) is the question word; 那 (4th tone) means \"that / there\"."
      },
      {
        "id": 2,
        "question": "How do you ask \"Where is the school?\"",
        "options": [
          "学校在哪儿？",
          "学校在那儿吗？",
          "在哪儿是学校？",
          "学校什么哪儿？"
        ],
        "correctIndex": 0,
        "explanation": "Noun + 在哪儿？ is the standard order."
      },
      {
        "id": 3,
        "question": "What is the synonymous southern Chinese equivalent of 哪儿?",
        "options": [
          "哪里 (nǎlǐ)",
          "那儿 (nàr)",
          "谁 (shéi)",
          "什么 (shénme)"
        ],
        "correctIndex": 0,
        "explanation": "哪里 and 哪儿 are interchangeable location question words."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "spatial-location-zai-fangwei",
      "title": "Spatial Location: Subject + 在 + Place + 方位词",
      "level": 1
    },
    "nextRule": {
      "slug": "asking-price-duoshao-qian",
      "title": "Inquiring Prices with 这个多少钱 (duōshao qián)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-particle-ma",
        "title": "Question Particle 吗 (Yes/No Questions)",
        "level": 1,
        "category": "Questions",
        "pattern": "Statement + 吗？"
      },
      {
        "slug": "question-form-name-xingming",
        "title": "Inquiring Names & Identity with 叫什么名字",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject + 叫 + 什么名字？"
      },
      {
        "slug": "inquiring-quantity-ji",
        "title": "Inquiring Small Quantities with 几 (jǐ)",
        "level": 1,
        "category": "Questions",
        "pattern": "几 + Measure Word / Time Unit？"
      },
      {
        "slug": "asking-price-duoshao-qian",
        "title": "Inquiring Prices with 这个多少钱 (duōshao qián)",
        "level": 1,
        "category": "Questions",
        "pattern": "(Demonstrative + Noun) + 多少钱？"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "老师",
        "slug": "laoshi",
        "pinyin": "lǎoshī",
        "meaning": "teacher",
        "level": 1
      },
      {
        "hanzi": "里",
        "slug": "li-inside",
        "pinyin": "lǐ",
        "meaning": "inside; in",
        "level": 1
      },
      {
        "hanzi": "哪",
        "slug": "na-which",
        "pinyin": "nǎ",
        "meaning": "which (followed by measure word)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-7-1",
    "slug": "asking-price-duoshao-qian",
    "title": "Inquiring Prices with 这个多少钱 (duōshao qián)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Questions",
    "pattern": "(Demonstrative + Noun) + 多少钱？",
    "explanation": "The essential shopping formula to inquire about prices. 多少 (duōshao) asks for quantities without restriction, and 钱 (qián) means money. Answers specify number + 块 (kuài, colloquial yuan).",
    "structuralVariations": {
      "affirmative": "这个苹果五块钱。 (This apple is five yuan.)",
      "negative": "这个不贵。 (This is not expensive.)",
      "question": "这个多少钱？ (How much is this?)",
      "notes": "In speech, the unit of Chinese currency is 块 (kuài) or 元 (yuán)."
    },
    "examples": [
      {
        "zh": "这个杯子多少钱？",
        "py": "Zhèige bēizi duōshao qián?",
        "en": "How much is this cup?"
      },
      {
        "zh": "苹果一斤多少钱？",
        "py": "Píngguǒ yì jīn duōshao qián?",
        "en": "How much is a jin of apples?"
      },
      {
        "zh": "那件衣服八十块钱。",
        "py": "Nà jiàn yīfu bāshí kuài qián.",
        "en": "That piece of clothing is 80 yuan."
      }
    ],
    "commonMistakes": [
      "Using 几钱 instead of 多少钱. Prices regularly exceed 10, so 多少 is required.",
      "Omitting 块 or 元 in the price response."
    ],
    "examStrategy": "Crucial for HSK 1 Reading shopping dialogues. Match 多少钱 with price responses containing 块 / 元.",
    "parentLessonSlug": "shopping-and-prices",
    "quiz": [
      {
        "id": 1,
        "question": "How do you ask \"How much is this?\" in Chinese?",
        "options": [
          "这个多少钱？",
          "这个几钱？",
          "这个哪儿钱？",
          "钱多少这个？"
        ],
        "correctIndex": 0,
        "explanation": "这个多少钱 is the standard price formula."
      },
      {
        "id": 2,
        "question": "What colloquial measure word is used for Chinese currency (RMB)?",
        "options": [
          "块 (kuài)",
          "本 (běn)",
          "张 (zhāng)",
          "点 (diǎn)"
        ],
        "correctIndex": 0,
        "explanation": "块 is the standard colloquial term for yuan."
      },
      {
        "id": 3,
        "question": "If an item costs 20 yuan, how do you say it?",
        "options": [
          "二十块钱",
          "二十钱块",
          "两钱",
          "二块钱"
        ],
        "correctIndex": 0,
        "explanation": "二十块钱 expresses 20 RMB."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "location-question-zai-nar",
      "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
      "level": 1
    },
    "nextRule": {
      "slug": "exclamation-excess-tai-le",
      "title": "Exclamation of Excess: 太 + Adj + 了 (tài...le)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-particle-ma",
        "title": "Question Particle 吗 (Yes/No Questions)",
        "level": 1,
        "category": "Questions",
        "pattern": "Statement + 吗？"
      },
      {
        "slug": "question-form-name-xingming",
        "title": "Inquiring Names & Identity with 叫什么名字",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject + 叫 + 什么名字？"
      },
      {
        "slug": "inquiring-quantity-ji",
        "title": "Inquiring Small Quantities with 几 (jǐ)",
        "level": 1,
        "category": "Questions",
        "pattern": "几 + Measure Word / Time Unit？"
      },
      {
        "slug": "location-question-zai-nar",
        "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject / Noun + 在哪儿？"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "八",
        "slug": "ba-eight",
        "pinyin": "bā",
        "meaning": "eight; 8",
        "level": 1
      },
      {
        "hanzi": "杯子",
        "slug": "beizi",
        "pinyin": "bēizi",
        "meaning": "cup; glass",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "多少",
        "slug": "duoshao",
        "pinyin": "duōshao",
        "meaning": "how many; how much",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-7-2",
    "slug": "exclamation-excess-tai-le",
    "title": "Exclamation of Excess: 太 + Adj + 了 (tài...le)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "太 + Adjective + 了！",
    "explanation": "Expresses extreme degree, enthusiastic praise, or excessive negative complaint (\"too [adj] / extremely [adj]!\"). The final particle 了 is required to complete the construction.",
    "structuralVariations": {
      "affirmative": "太好了！ (That's great! / Wonderful!)",
      "negative": "不太好。 (Not too good / Not very good — note: 了 is dropped with 不太).",
      "question": "太贵了吗？ (Is it too expensive?)",
      "notes": "In positive contexts, it means \"extremely!\" (太漂亮了!). In shopping, it means \"too [expensive]!\" (太贵了!)."
    },
    "examples": [
      {
        "zh": "太贵了！便宜一点儿吧。",
        "py": "Tài guì le! Piányi yìdiǎnr ba.",
        "en": "Too expensive! A little cheaper, please."
      },
      {
        "zh": "太好了！明天见。",
        "py": "Tài hǎo le! Míngtiān jiàn.",
        "en": "Wonderful! See you tomorrow."
      },
      {
        "zh": "今天天气太热了。",
        "py": "Jīntiān tiānqì tài rè le.",
        "en": "The weather today is too hot."
      }
    ],
    "commonMistakes": [
      "Forgetting the sentence-final 了 in positive exclamations (saying *太好 instead of 太好了).",
      "Keeping 了 when negating with 不太 (saying *不太好了 is incorrect; use 不太好)."
    ],
    "examStrategy": "In HSK 1 Reading Part 2, \"太...了\" appears frequently in emotional reactions (太好了, 太大了, 太热了).",
    "parentLessonSlug": "shopping-and-prices",
    "quiz": [
      {
        "id": 1,
        "question": "Complete the exclamation: \"明天不用上课，太好 ( ___ )！\"",
        "options": [
          "了",
          "吗",
          "呢",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "The paired structure is 太 + Adj + 了."
      },
      {
        "id": 2,
        "question": "How do you say \"Not very good / Not too good\"?",
        "options": [
          "不太好",
          "不太好了",
          "没太好",
          "不很好了"
        ],
        "correctIndex": 0,
        "explanation": "Negation drops 了: 不太 + Adjective."
      },
      {
        "id": 3,
        "question": "What does \"太贵了！\" mean in a marketplace?",
        "options": [
          "Too expensive!",
          "Very cheap!",
          "Delicious!",
          "Goodbye!"
        ],
        "correctIndex": 0,
        "explanation": "太贵了 conveys that a price is excessively high."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "asking-price-duoshao-qian",
      "title": "Inquiring Prices with 这个多少钱 (duōshao qián)",
      "level": 1
    },
    "nextRule": {
      "slug": "adjective-predicates-without-shi",
      "title": "Adjectival Predicates without 是: Subject + 很 + Adj",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "了",
        "slug": "le",
        "pinyin": "le",
        "meaning": "completed action / change of state",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-8-1",
    "slug": "adjective-predicates-without-shi",
    "title": "Adjectival Predicates without 是: Subject + 很 + Adj",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "Subject + 很 / 非常 + Adjective",
    "explanation": "In Chinese, adjectives function directly as predicates (stative verbs) and do NOT require the copula 是. When describing a subject, the degree adverb 很 (hěn) is placed before the adjective as a neutral syntactic balance placeholder.",
    "structuralVariations": {
      "affirmative": "他很高。 (He is tall.)",
      "negative": "他不高。 (He is not tall — note: 很 is omitted in negation).",
      "question": "他高吗？ (Is he tall?)",
      "notes": "In a neutral statement, 很 carries no strong emphasis; without 很, a contrast is implied (e.g., 他高 = \"He is tall, but someone else is not\")."
    },
    "examples": [
      {
        "zh": "他很高，也很帅。",
        "py": "Tā hěn gāo, yě hěn shuài.",
        "en": "He is tall and also very handsome."
      },
      {
        "zh": "今天天气很好。",
        "py": "Jīntiān tiānqì hěn hǎo.",
        "en": "The weather today is very good."
      },
      {
        "zh": "这件衣服不贵。",
        "py": "Zhè jiàn yīfu bú guì.",
        "en": "This piece of clothing is not expensive."
      }
    ],
    "commonMistakes": [
      "Inserting 是 before the adjective (saying \"他是高\" or \"今天天气是好\" is incorrect).",
      "Retaining 很 in negative sentences (saying \"他不很好\" instead of \"他不好\")."
    ],
    "examStrategy": "Core HSK 1 grammar point. Never pick an option containing \"Subject + 是 + Adjective\" unless it ends with nominalizing 的.",
    "parentLessonSlug": "describing-people-appearance",
    "quiz": [
      {
        "id": 1,
        "question": "Which of the following is grammatically correct?",
        "options": [
          "她很漂亮。",
          "她是漂亮。",
          "她是很漂亮。",
          "漂亮是在她。"
        ],
        "correctIndex": 0,
        "explanation": "Adjectives act as predicates without 是; use 很 as the default linker."
      },
      {
        "id": 2,
        "question": "How do you say \"He is not busy today\"?",
        "options": [
          "他今天不忙。",
          "他今天不很忙。",
          "他今天没是忙。",
          "他今天不是忙。"
        ],
        "correctIndex": 0,
        "explanation": "Negate adjectival predicates with 不 + Adj (dropping neutral 很)."
      },
      {
        "id": 3,
        "question": "Why do Chinese speakers use 很 even when not strongly emphasizing \"very\"?",
        "options": [
          "It serves as a syntactic balance placeholder to avoid an unintended comparison",
          "It is required by law",
          "It turns nouns into verbs",
          "It indicates past tense"
        ],
        "correctIndex": 0,
        "explanation": "很 balances the predicate in neutral declarative sentences."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "exclamation-excess-tai-le",
      "title": "Exclamation of Excess: 太 + Adj + 了 (tài...le)",
      "level": 1
    },
    "nextRule": {
      "slug": "attributive-modification-de",
      "title": "Attributive Modification with 的: Adj + 的 + Noun",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      },
      {
        "hanzi": "是",
        "slug": "shi-be",
        "pinyin": "shì",
        "meaning": "to be (am, is, are)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-8-2",
    "slug": "attributive-modification-de",
    "title": "Attributive Modification with 的: Adj + 的 + Noun",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Particles",
    "pattern": "Two-syllable Adj + 的 + Noun",
    "explanation": "When an adjective phrase or multi-syllable adjective modifies a following noun, the particle 的 (de) is inserted between them to establish attributive modification.",
    "structuralVariations": {
      "affirmative": "漂亮的衣服 / 高兴的学生",
      "negative": "不好的习惯",
      "question": "这是谁买的漂亮的衣服？",
      "notes": "Monosyllabic adjectives commonly attach directly to nouns without 的 (e.g. 好人, 大包, 白菜)."
    },
    "examples": [
      {
        "zh": "这是新买的漂亮的衣服。",
        "py": "Zhè shì xīn mǎi de piàoliang de yīfu.",
        "en": "These are newly bought beautiful clothes."
      },
      {
        "zh": "她是一个高兴的孩子。",
        "py": "Tā shì yí ge gāoxìng de háizi.",
        "en": "She is a happy child."
      },
      {
        "zh": "红色的苹果很好吃。",
        "py": "Hóngsè de píngguǒ hěn hǎochī.",
        "en": "Red apples are delicious."
      }
    ],
    "commonMistakes": [
      "Inserting 的 after single-syllable common adjectives where direct compounding is standard (e.g. 好人, not 好的某人).",
      "Confusing attributive 的 with verb-degree 得."
    ],
    "examStrategy": "In HSK 1 Reading matching, identify noun phrases by looking for \"Adjective + 的 + Noun\".",
    "parentLessonSlug": "describing-people-appearance",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"beautiful flowers\"?",
        "options": [
          "漂亮的花 (piàoliang de huā)",
          "花漂亮的 (huā piàoliang de)",
          "漂亮花 (piàoliang huā)",
          "在花漂亮"
        ],
        "correctIndex": 0,
        "explanation": "Multi-syllable adjective (漂亮) + 的 + Noun (花)."
      },
      {
        "id": 2,
        "question": "Which of the following does NOT typically require 的?",
        "options": [
          "好人 (good person)",
          "漂亮的衣服",
          "高大的树",
          "红色的苹果"
        ],
        "correctIndex": 0,
        "explanation": "Monosyllabic adjective + noun pairs (好人) form direct compound words."
      },
      {
        "id": 3,
        "question": "Complete: \"那是李明 ( ___ ) 新电脑。\"",
        "options": [
          "的",
          "得",
          "地",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "Attributive possession takes 的."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "adjective-predicates-without-shi",
      "title": "Adjectival Predicates without 是: Subject + 很 + Adj",
      "level": 1
    },
    "nextRule": {
      "slug": "daily-routine-sequence-time-verb",
      "title": "Daily Schedule Sequence: Time + Action",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "possession-particle-de",
        "title": "Possessive & Attributive Particle 的 (de)",
        "level": 1,
        "category": "Particles",
        "pattern": "Possessor / Modifier + 的 + Noun"
      },
      {
        "slug": "continuous-particle-ne-query",
        "title": "Contextual Query & State Continuity with 呢 (ne)",
        "level": 1,
        "category": "Particles",
        "pattern": "Noun / Pronoun + 呢？"
      },
      {
        "slug": "change-of-situation-le",
        "title": "Modal Particle 了: Change of State or Situation",
        "level": 2,
        "category": "Particles",
        "pattern": "Predicate / Sentence + 了 (Sentence-Final)"
      },
      {
        "slug": "adverbial-manner-particle-de",
        "title": "Adverbial Manner Structural Particle: 地 (de)",
        "level": 3,
        "category": "Particles",
        "pattern": "Adjective / Modifier + 地 (de) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "高兴",
        "slug": "gaoxing",
        "pinyin": "gāoxìng",
        "meaning": "happy; pleased",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-9-1",
    "slug": "daily-routine-sequence-time-verb",
    "title": "Daily Schedule Sequence: Time + Action",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Time & Aspect",
    "pattern": "Time Expression + Action Verb",
    "explanation": "Chronological events in Chinese are expressed strictly in the sequence they occur in reality. When detailing daily routines, specify the time of day, followed immediately by the corresponding action.",
    "structuralVariations": {
      "affirmative": "我早上七点起床，八点去学校。",
      "negative": "我今天早上没有吃早饭。",
      "question": "你几点吃早饭？ (What time do you eat breakfast?)",
      "notes": "Chronological time always precedes the action."
    },
    "examples": [
      {
        "zh": "我早上七点起床。",
        "py": "Wǒ zǎoshang qī diǎn qǐchuáng.",
        "en": "I wake up at seven in the morning."
      },
      {
        "zh": "李明中午十二点吃午饭。",
        "py": "Lǐ Míng zhōngwǔ shí'èr diǎn chī wǔfàn.",
        "en": "Li Ming eats lunch at 12:00 noon."
      },
      {
        "zh": "晚上九点我们看电视。",
        "py": "Wǎnshang jiǔ diǎn wǒmen kàn diànshì.",
        "en": "At nine in the evening we watch TV."
      }
    ],
    "commonMistakes": [
      "Inverting time and action (saying \"我起床在七点\" is incorrect; say \"我七点起床\").",
      "Separating the time from the verb with incorrect English prepositions."
    ],
    "examStrategy": "In HSK 1 Reading Part 3, questions testing daily schedules require verifying the chronological order of morning, afternoon, and evening routines.",
    "parentLessonSlug": "daily-activities-routines",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence correctly expresses waking up at 7:00 AM?",
        "options": [
          "我早上七点起床。",
          "我起床在早上七点。",
          "起床我七点早上。",
          "早上起床我七点。"
        ],
        "correctIndex": 0,
        "explanation": "Subject + Time Word + Action Verb."
      },
      {
        "id": 2,
        "question": "Put in order: [看书 / 晚上 / 我 / 八点]",
        "options": [
          "我晚上八点看书。",
          "我看书晚上八点。",
          "晚上看书我八点。",
          "八点看书我晚上。"
        ],
        "correctIndex": 0,
        "explanation": "Subject + Time + Verb + Object is standard syntax."
      },
      {
        "id": 3,
        "question": "What time is 中午十二点?",
        "options": [
          "12:00 Noon",
          "12:00 Midnight",
          "2:00 PM",
          "10:00 AM"
        ],
        "correctIndex": 0,
        "explanation": "中午 indicates midday/noon."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "attributive-modification-de",
      "title": "Attributive Modification with 的: Adj + 的 + Noun",
      "level": 1
    },
    "nextRule": {
      "slug": "continuous-particle-ne-query",
      "title": "Contextual Query & State Continuity with 呢 (ne)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "date-hierarchy-nian-yue-ri",
        "title": "Date Hierarchy: Year (年) → Month (月) → Day (日/号)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Year年 + Month月 + Day日/号"
      },
      {
        "slug": "days-of-week-xingqi",
        "title": "Days of the Week: 星期 (xīngqī) Construction",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "星期 + Number (一至六) / 天(日)"
      },
      {
        "slug": "clock-time-structure-dian-fen",
        "title": "Clock Time Expressions: 点 (diǎn) & 分 (fēn)",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Number + 点 + (Number + 分)"
      },
      {
        "slug": "time-words-preverbal-placement",
        "title": "Time Words as Preverbal Adverbial Modifiers",
        "level": 1,
        "category": "Time & Aspect",
        "pattern": "Subject + Time Word + Verb + (Object)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "八",
        "slug": "ba-eight",
        "pinyin": "bā",
        "meaning": "eight; 8",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "电视",
        "slug": "dianshi",
        "pinyin": "diànshì",
        "meaning": "television; TV",
        "level": 1
      },
      {
        "hanzi": "二",
        "slug": "er",
        "pinyin": "èr",
        "meaning": "two; 2",
        "level": 1
      },
      {
        "hanzi": "几",
        "slug": "ji-how-many",
        "pinyin": "jǐ",
        "meaning": "how many (usually <10)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-9-2",
    "slug": "continuous-particle-ne-query",
    "title": "Contextual Query & State Continuity with 呢 (ne)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Particles",
    "pattern": "Noun / Pronoun + 呢？",
    "explanation": "The sentence-final particle 呢 (ne) serves two core functions in HSK 1: (1) Bounce-back bounce query (\"How about...? / What about...?\") following an established statement; (2) Inquiring the location of a missing object (\"Where is...?\").",
    "structuralVariations": {
      "affirmative": "他正在睡觉呢。 (He is sleeping right now.)",
      "negative": "我很好，他呢？ (I am fine, how about him?)",
      "question": "我的书呢？ (Where is my book?)",
      "notes": "Pronounced with a light, neutral tone at the end of the sentence."
    },
    "examples": [
      {
        "zh": "我叫大卫，你呢？",
        "py": "Wǒ jiào Dàwèi, nǐ ne?",
        "en": "My name is David, and you?"
      },
      {
        "zh": "我是中国人，你呢？",
        "py": "Wǒ shì Zhōngguó rén, nǐ ne?",
        "en": "I am Chinese, what about you?"
      },
      {
        "zh": "我的手机呢？在桌子上。",
        "py": "Wǒ de shǒujī ne? Zài zhuōzi shang.",
        "en": "Where is my phone? It's on the table."
      }
    ],
    "commonMistakes": [
      "Confusing 呢 (bounce-back query) with 吗 (yes/no confirmation question).",
      "Using 呢 without preceding conversational context."
    ],
    "examStrategy": "Very common in dialogue turn-taking in HSK 1 Listening. When Speaker A answers, Speaker B frequently responds with \"你呢？\".",
    "parentLessonSlug": "daily-activities-routines",
    "quiz": [
      {
        "id": 1,
        "question": "What does \"你呢？\" mean after someone introduces themselves?",
        "options": [
          "And you? / What about you?",
          "Are you sure?",
          "Who are you?",
          "Where are you?"
        ],
        "correctIndex": 0,
        "explanation": "你呢 bounce-backs the question to the conversational partner."
      },
      {
        "id": 2,
        "question": "How do you ask \"Where is my cup?\" using 呢?",
        "options": [
          "我的杯子呢？",
          "我的杯子吗？",
          "杯子什么呢？",
          "谁是我的杯子？"
        ],
        "correctIndex": 0,
        "explanation": "Noun + 呢 asks for the whereabouts of a missing item."
      },
      {
        "id": 3,
        "question": "Which particle turns a statement into a bounce-back question?",
        "options": [
          "呢 (ne)",
          "吗 (ma)",
          "了 (le)",
          "的 (de)"
        ],
        "correctIndex": 0,
        "explanation": "呢 handles contextual bounce-back queries."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "daily-routine-sequence-time-verb",
      "title": "Daily Schedule Sequence: Time + Action",
      "level": 1
    },
    "nextRule": {
      "slug": "question-word-in-situ-order",
      "title": "Question Word Placement in Chinese (In-Situ Rule)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "possession-particle-de",
        "title": "Possessive & Attributive Particle 的 (de)",
        "level": 1,
        "category": "Particles",
        "pattern": "Possessor / Modifier + 的 + Noun"
      },
      {
        "slug": "attributive-modification-de",
        "title": "Attributive Modification with 的: Adj + 的 + Noun",
        "level": 1,
        "category": "Particles",
        "pattern": "Two-syllable Adj + 的 + Noun"
      },
      {
        "slug": "change-of-situation-le",
        "title": "Modal Particle 了: Change of State or Situation",
        "level": 2,
        "category": "Particles",
        "pattern": "Predicate / Sentence + 了 (Sentence-Final)"
      },
      {
        "slug": "adverbial-manner-particle-de",
        "title": "Adverbial Manner Structural Particle: 地 (de)",
        "level": 3,
        "category": "Particles",
        "pattern": "Adjective / Modifier + 地 (de) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      },
      {
        "hanzi": "叫",
        "slug": "jiao-be-called",
        "pinyin": "jiào",
        "meaning": "to be called; to call",
        "level": 1
      },
      {
        "hanzi": "呢",
        "slug": "ne",
        "pinyin": "ne",
        "meaning": "modal particle (what about...?)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-10-1",
    "slug": "question-word-in-situ-order",
    "title": "Question Word Placement in Chinese (In-Situ Rule)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Questions",
    "pattern": "Subject + Verb + Question Word (什么/谁)",
    "explanation": "Unlike English, which moves question words (Who, What, Where) to the front of a clause, Chinese question words remain IN-SITU — occupying the exact syntactic position that the answer will take.",
    "structuralVariations": {
      "affirmative": "他买苹果。 (He buys apples.)",
      "negative": "他不买苹果。 (He does not buy apples.)",
      "question": "他买什么？ (What does he buy?)",
      "notes": "Simply replace the target noun with 什么 (shénme) or 谁 (shéi) without changing anything else."
    },
    "examples": [
      {
        "zh": "这是什么？",
        "py": "Zhè shì shénme?",
        "en": "What is this?"
      },
      {
        "zh": "他是谁？",
        "py": "Tā shì shéi?",
        "en": "Who is he?"
      },
      {
        "zh": "你想吃什么？",
        "py": "Nǐ xiǎng chī shénme?",
        "en": "What would you like to eat?"
      }
    ],
    "commonMistakes": [
      "Moving 什么 to the front of the sentence like English (saying \"什么这是\" instead of \"这是什么\").",
      "Adding 吗 at the end of an in-situ question word sentence."
    ],
    "examStrategy": "Critical HSK 1 Reading concept. To find the answer to an in-situ question, look for a statement replacing the question word with a concrete noun.",
    "parentLessonSlug": "mastering-question-patterns",
    "quiz": [
      {
        "id": 1,
        "question": "Where does 什么 go in \"What do you drink?\"",
        "options": [
          "你喝什么？ (Object position)",
          "什么你喝？ (Sentence start)",
          "你什么喝？ (Before verb)",
          "喝什么你？ (End-inverted)"
        ],
        "correctIndex": 0,
        "explanation": "Chinese question words stay in the exact slot of the answer object."
      },
      {
        "id": 2,
        "question": "How do you ask \"Who is the teacher?\"",
        "options": [
          "谁是老师？",
          "老师是谁吗？",
          "谁老师是吗？",
          "是什么谁老师？"
        ],
        "correctIndex": 0,
        "explanation": "谁 takes the subject position: 谁是老师."
      },
      {
        "id": 3,
        "question": "Why does \"你喜欢吃什么吗？\" contain an error?",
        "options": [
          "It combines an in-situ question word (什么) with yes/no particle (吗)",
          "喜欢 cannot take 什么",
          "吃 must be negated",
          "Word order is inverted"
        ],
        "correctIndex": 0,
        "explanation": "Specific question words and 吗 are mutually exclusive."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "continuous-particle-ne-query",
      "title": "Contextual Query & State Continuity with 呢 (ne)",
      "level": 1
    },
    "nextRule": {
      "slug": "negation-with-bu-and-mei",
      "title": "Negation Particles: 不 (bù) vs 没/没有 (méi)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-particle-ma",
        "title": "Question Particle 吗 (Yes/No Questions)",
        "level": 1,
        "category": "Questions",
        "pattern": "Statement + 吗？"
      },
      {
        "slug": "question-form-name-xingming",
        "title": "Inquiring Names & Identity with 叫什么名字",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject + 叫 + 什么名字？"
      },
      {
        "slug": "inquiring-quantity-ji",
        "title": "Inquiring Small Quantities with 几 (jǐ)",
        "level": 1,
        "category": "Questions",
        "pattern": "几 + Measure Word / Time Unit？"
      },
      {
        "slug": "location-question-zai-nar",
        "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject / Noun + 在哪儿？"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "买",
        "slug": "mai-buy",
        "pinyin": "mǎi",
        "meaning": "to buy; to purchase",
        "level": 1
      },
      {
        "hanzi": "你",
        "slug": "ni",
        "pinyin": "nǐ",
        "meaning": "you (singular)",
        "level": 1
      },
      {
        "hanzi": "苹果",
        "slug": "pingguo",
        "pinyin": "píngguǒ",
        "meaning": "apple",
        "level": 1
      },
      {
        "hanzi": "谁",
        "slug": "shei",
        "pinyin": "shéi",
        "meaning": "who; whom",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l1-10-2",
    "slug": "negation-with-bu-and-mei",
    "title": "Negation Particles: 不 (bù) vs 没/没有 (méi)",
    "level": 1,
    "cefr": "A1 (Breakthrough)",
    "category": "Sentence Structure",
    "pattern": "Subject + 不 / 没(有) + Verb / Predicate",
    "explanation": "不 (bù) negates present habits, future intentions, volitions, and adjectives (\"do not / will not\"). 没 or 没有 (méi) negates past occurrences (\"did not do\") and possession (\"do not have / there is no\").",
    "structuralVariations": {
      "affirmative": "我有书。 / 我去学校。",
      "negative": "我没有书。 / 我没去学校。 / 我不去学校。",
      "question": "你有书吗？ / 你去不去？",
      "notes": "有 is strictly negated with 没 (没有), NEVER with 不 (不有 is completely ungrammatical)."
    },
    "examples": [
      {
        "zh": "我不去学校。",
        "py": "Wǒ bú qù xuéxiào.",
        "en": "I am not going to school. (Habit/Future)"
      },
      {
        "zh": "我昨天没去学校。",
        "py": "Wǒ zuótiān méi qù xuéxiào.",
        "en": "I didn't go to school yesterday. (Past occurrence)"
      },
      {
        "zh": "我没有手机。",
        "py": "Wǒ méiyǒu shǒujī.",
        "en": "I do not have a mobile phone. (Possession)"
      }
    ],
    "commonMistakes": [
      "Saying 不有 instead of 没有. 有 can only be negated with 没.",
      "Using 不 to negate past completed events (saying \"我昨天不去\" instead of \"我昨天没去\")."
    ],
    "examStrategy": "In HSK 1 Reading and Listening, look for past time markers (昨天) to choose 没, and future/habitual markers (明天, 常) to choose 不.",
    "parentLessonSlug": "mastering-question-patterns",
    "quiz": [
      {
        "id": 1,
        "question": "How do you negate the verb 有 (to have)?",
        "options": [
          "没有 (méiyǒu)",
          "不有 (bùyǒu)",
          "别有 (biéyǒu)",
          "无有 (wúyǒu)"
        ],
        "correctIndex": 0,
        "explanation": "有 is strictly negated with 没."
      },
      {
        "id": 2,
        "question": "Fill in the blank: \"他昨天 ( ___ ) 去学校。\"",
        "options": [
          "没",
          "不",
          "别",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "Past actions are negated with 没."
      },
      {
        "id": 3,
        "question": "Which particle negates adjectives (e.g. \"not cold\")?",
        "options": [
          "不 (不冷)",
          "没 (没冷)",
          "别 (别冷)",
          "无 (无冷)"
        ],
        "correctIndex": 0,
        "explanation": "Adjectival predicates are negated with 不."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "question-word-in-situ-order",
      "title": "Question Word Placement in Chinese (In-Situ Rule)",
      "level": 1
    },
    "nextRule": {
      "slug": "comparison-bi",
      "title": "Comparison Structure 比 (bǐ)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      },
      {
        "hanzi": "没有",
        "slug": "meiyou",
        "pinyin": "méiyǒu",
        "meaning": "to not have; there is not",
        "level": 1
      },
      {
        "hanzi": "你",
        "slug": "ni",
        "pinyin": "nǐ",
        "meaning": "you (singular)",
        "level": 1
      },
      {
        "hanzi": "去",
        "slug": "qu",
        "pinyin": "qù",
        "meaning": "to go",
        "level": 1
      },
      {
        "hanzi": "书",
        "slug": "shu-book",
        "pinyin": "shū",
        "meaning": "book",
        "level": 1
      }
    ]
  },
  {
    "id": "g2-1",
    "slug": "comparison-bi",
    "title": "Comparison Structure 比 (bǐ)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Comparisons",
    "pattern": "Noun A + 比 + Noun B + Adjective",
    "explanation": "比 (bǐ) is the fundamental comparative marker in Mandarin, stating that Entity A possesses a higher degree of an attribute than Entity B. In basic 比 sentences, degree adverbs like 很 or 非常 must NOT be placed before the adjective.",
    "structuralVariations": {
      "affirmative": "他比我高。 (He is taller than me.)",
      "negative": "他没有我高。 / 他不比我高。 (He is not as tall as me / He isn't taller than me.)",
      "question": "他比你高吗？ / 谁比谁高？ (Is he taller than you? / Who is taller than whom?)",
      "notes": "To express a minor difference, append 一点儿 or 一些 at the end: 他比我高一点儿。 To express a major difference, append 得多 or 多了: 他比我高得多。"
    },
    "examples": [
      {
        "zh": "今天比昨天冷。",
        "py": "Jīntiān bǐ zuótiān lěng.",
        "en": "Today is colder than yesterday."
      },
      {
        "zh": "西瓜比苹果贵一点儿。",
        "py": "Xīguā bǐ píngguǒ guì yìdiǎnr.",
        "en": "Watermelon is a little more expensive than apples."
      },
      {
        "zh": "哥哥比弟弟大两岁。",
        "py": "Gēge bǐ dìdi dà liǎng suì.",
        "en": "The older brother is two years older than the younger brother."
      },
      {
        "zh": "坐飞机比坐火车快得多。",
        "py": "Zuò fēijī bǐ zuò huǒchē kuài de duō.",
        "en": "Taking an airplane is much faster than taking a train."
      }
    ],
    "commonMistakes": [
      "Adding 很 or 非常 before the adjective (e.g., saying \"他比我很矮\" is incorrect; say \"他比我矮\").",
      "Using 不比 for ordinary negative comparison instead of 没有; 不比 implies \"no more than\" or \"about the same as\" in defensive tone."
    ],
    "examStrategy": "In HSK 2 reading and listening questions, 比 sentences frequently test specific numerical increments placed after the adjective (A 比 B + Adj + Number + Measure Word).",
    "parentLessonSlug": "shopping-and-clothing",
    "quiz": [
      {
        "id": 1,
        "question": "Which of the following sentences is grammatically correct?",
        "options": [
          "北京比上海很冷。",
          "北京比上海冷得多。",
          "北京比很冷上海。",
          "北京非常比上海冷。"
        ],
        "correctIndex": 1,
        "explanation": "比 structures reject degree adverbs like 很. Specific or general degree modifiers (得多) must come AFTER the adjective."
      },
      {
        "id": 2,
        "question": "How do you say \"This pair of shoes is a little more expensive than that pair\"?",
        "options": [
          "这双鞋比那双鞋贵一点儿。",
          "这双鞋比那双鞋一点儿贵。",
          "这双鞋很贵比那双鞋。",
          "这双鞋比那双鞋最贵。"
        ],
        "correctIndex": 0,
        "explanation": "Adjective + 一点儿 placed at the end denotes a slight margin of comparison."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"妹妹比姐姐小 ( ___ )。\"",
        "options": [
          "两岁",
          "很岁",
          "非常",
          "太了"
        ],
        "correctIndex": 0,
        "explanation": "Age differences are stated as numeral + measure word placed directly after the adjective 小."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "negation-with-bu-and-mei",
      "title": "Negation Particles: 不 (bù) vs 没/没有 (méi)",
      "level": 1
    },
    "nextRule": {
      "slug": "experiential-marker-guo",
      "title": "Experiential Aspect Marker 过 (guo)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "comparative-increment-yidianr",
        "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Adjective + 一点儿 / 一些 (Slight) OR 得多 / 多了 (Major)"
      },
      {
        "slug": "comparative-negation-meiyou",
        "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 没有 + Noun B + (那么 / 这么) + Adjective"
      },
      {
        "slug": "comparative-large-margin-deduo",
        "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective + 得多 / 多了"
      },
      {
        "slug": "equative-comparison-gen-yiyang",
        "title": "Equative Comparison: A 跟 / 和 B 一样 (+ Adjective)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 跟 / 和 + Noun B + 一样 (+ Adjective)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "飞机",
        "slug": "feiji",
        "pinyin": "fēijī",
        "meaning": "airplane",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      }
    ]
  },
  {
    "id": "g2-2",
    "slug": "experiential-marker-guo",
    "title": "Experiential Aspect Marker 过 (guo)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Aspect Markers",
    "pattern": "Subject + Verb + 过 + Object",
    "explanation": "The aspect particle 过 (guo) emphasizes that an action has been experienced at least once in past history (\"have done before\"). It implies the action is finished and does not continue into the present moment.",
    "structuralVariations": {
      "affirmative": "我去过北京。 (I have been to Beijing.)",
      "negative": "我没有去过北京。 (I have not been to Beijing.)",
      "question": "你去过北京吗？ / 你去过北京没有？ (Have you ever been to Beijing?)",
      "notes": "Negate with 没 or 没有 before the verb; 过 is strictly retained in the negative form."
    },
    "examples": [
      {
        "zh": "你看过这部中国电影吗？",
        "py": "Nǐ kàn guo zhè bù Zhōngguó diànyǐng ma?",
        "en": "Have you watched this Chinese movie before?"
      },
      {
        "zh": "我学过一年汉语。",
        "py": "Wǒ xué guo yì nián Hànyǔ.",
        "en": "I have studied Chinese for one year before."
      },
      {
        "zh": "他从来没有吃过北京烤鸭。",
        "py": "Tā cónglái méiyǒu chī guo Běijīng kǎoyā.",
        "en": "He has never eaten Peking roast duck."
      },
      {
        "zh": "我们以前见过面。",
        "py": "Wǒmen yǐqián jiàn guo miàn.",
        "en": "We have met each other before."
      }
    ],
    "commonMistakes": [
      "Negating with 不 instead of 没有 (e.g. saying \"我不去过\" is ungrammatical; must say \"我没去过\").",
      "Confusing 过 (past experience) with 了 (completion of a specific event)."
    ],
    "examStrategy": "Frequently paired with past time markers like 以前 (before) or 从来没 (never before) in HSK 2 listening dialogues.",
    "parentLessonSlug": "past-experiences",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"I have never eaten Chinese food before\"?",
        "options": [
          "我不吃过中国菜。",
          "我没吃过中国菜。",
          "我没有吃了中国菜。",
          "我别吃中国菜。"
        ],
        "correctIndex": 1,
        "explanation": "Past experience with 过 is negated with 没 / 没有."
      },
      {
        "id": 2,
        "question": "What is the key grammatical function of the particle 过?",
        "options": [
          "Indicates future intention",
          "Indicates past life experience",
          "Indicates ongoing continuous action",
          "Indicates passive voice"
        ],
        "correctIndex": 1,
        "explanation": "过 marks experiential aspect (having had an experience at least once)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"你 ( ___ ) 中国茶没有？\"",
        "options": [
          "喝过",
          "喝了过",
          "喝在",
          "喝得很"
        ],
        "correctIndex": 0,
        "explanation": "Verb + 过 + Object + 没有 forms an affirmative-negative experiential question."
      }
    ],
    "parentLessonTitle": "Past Experiences & Life Milestones (经历与往事)",
    "prevRule": {
      "slug": "comparison-bi",
      "title": "Comparison Structure 比 (bǐ)",
      "level": 2
    },
    "nextRule": {
      "slug": "manner-of-travel-zuo-che",
      "title": "Manner of Travel: 坐 / 骑 / 开 + Vehicle + 去",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "future-imminence-kuai-yao-le",
        "title": "Imminent Future Action: 快要...了 (About to...)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + 快要 / 就要 / 快 + Verb Phrase + 了"
      },
      {
        "slug": "action-in-progress-zhengzai",
        "title": "Action in Progress: 正在...呢 (Currently doing...)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + 正 / 在 / 正在 + Verb Phrase + (呢)"
      },
      {
        "slug": "completed-action-verb-le",
        "title": "Completed Action Aspect Marker: Verb + 了",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + Verb + 了 + Object"
      },
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "电影",
        "slug": "dianying",
        "pinyin": "diànyǐng",
        "meaning": "movie; film",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "看",
        "slug": "kan",
        "pinyin": "kàn",
        "meaning": "to look; to see; to read",
        "level": 1
      },
      {
        "hanzi": "来",
        "slug": "lai",
        "pinyin": "lái",
        "meaning": "to come; to arrive",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-1-1",
    "slug": "manner-of-travel-zuo-che",
    "title": "Manner of Travel: 坐 / 骑 / 开 + Vehicle + 去",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Sentence Structure",
    "pattern": "Subject + 坐 / 骑 / 开 + Vehicle + 去 / 到 + Destination",
    "explanation": "Mandarin expresses mode of transportation through a serial verb construction: the method of transport (坐 to sit/ride, 骑 to straddle/cycle, 开 to drive) comes before the destination motion verb (去 / 来 / 到).",
    "structuralVariations": {
      "affirmative": "我每天坐公共汽车去上班。 (I take the bus to work every day.)",
      "negative": "我不开车去学校。 (I don't drive to school.)",
      "question": "你怎么去机场？ / 你坐地铁去吗？ (How do you go to the airport? / Do you go by subway?)",
      "notes": "Use 坐 for public transport, trains, planes, and taxis; use 骑 for bicycles, motorcycles, and horses; use 开 for driving cars."
    },
    "examples": [
      {
        "zh": "我们坐地铁去博物馆吧。",
        "py": "Wǒmen zuò dìtiě qù bówùguǎn ba.",
        "en": "Let's take the subway to the museum."
      },
      {
        "zh": "他骑自行车去超市买东西。",
        "py": "Tā qí zìxíngchē qù chāoshì mǎi dōngxi.",
        "en": "He rides a bike to the supermarket to buy things."
      },
      {
        "zh": "爸爸每天开车送我上学。",
        "py": "Bàba měitiān kāi chē sòng wǒ shàngxué.",
        "en": "Dad drives to drop me off at school every day."
      },
      {
        "zh": "你怎么去火车站？",
        "py": "Nǐ zěnme qù huǒchēzhàn?",
        "en": "How do you get to the train station?"
      }
    ],
    "commonMistakes": [
      "Placing the vehicle phrase at the very end of the sentence like English \"I go to work by bus\" (e.g. saying \"我去上班坐车\" is unnatural; must say \"我坐车去上班\").",
      "Using 坐 for two-wheeled vehicles (use 骑 for bikes/motorcycles)."
    ],
    "examStrategy": "In HSK 2 listening, questions asking \"怎么去...\" (how to travel) invariably match answers with 坐, 骑, or 开 plus a transport vehicle.",
    "parentLessonSlug": "transport-and-travel",
    "quiz": [
      {
        "id": 1,
        "question": "Which verb is used with 自行车 (bicycle)?",
        "options": [
          "坐",
          "骑",
          "开",
          "打"
        ],
        "correctIndex": 1,
        "explanation": "Bicycles require the verb 骑 (qí, to straddle/ride)."
      },
      {
        "id": 2,
        "question": "Which sentence has the natural Chinese word order?",
        "options": [
          "他去北京坐飞机。",
          "他坐飞机去北京。",
          "他去坐飞机北京。",
          "坐飞机他去。"
        ],
        "correctIndex": 1,
        "explanation": "Mandarin puts the means/manner of travel before the destination action (坐飞机去北京)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"路上很堵，我们 ( ___ ) 地铁去吧。\"",
        "options": [
          "骑",
          "开",
          "坐",
          "跑"
        ],
        "correctIndex": 2,
        "explanation": "Subway (地铁) takes the verb 坐 (to ride/take)."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "experiential-marker-guo",
      "title": "Experiential Aspect Marker 过 (guo)",
      "level": 2
    },
    "nextRule": {
      "slug": "relative-distance-li-yuan-jin",
      "title": "Relative Distance: A 离 B 远 / 近",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "东西",
        "slug": "dongxi",
        "pinyin": "dōngxi",
        "meaning": "thing; stuff",
        "level": 1
      },
      {
        "hanzi": "开",
        "slug": "kai",
        "pinyin": "kāi",
        "meaning": "to open; to drive",
        "level": 1
      },
      {
        "hanzi": "来",
        "slug": "lai",
        "pinyin": "lái",
        "meaning": "to come; to arrive",
        "level": 1
      },
      {
        "hanzi": "吗",
        "slug": "ma-question-partic",
        "pinyin": "ma",
        "meaning": "question particle (yes/no)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-1-2",
    "slug": "relative-distance-li-yuan-jin",
    "title": "Relative Distance: A 离 B 远 / 近",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Prepositions",
    "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里",
    "explanation": "离 (lí) functions as a distance preposition meaning \"away from / separated from\". It measures spatial or temporal distance between two reference points.",
    "structuralVariations": {
      "affirmative": "我家离学校很近。 (My home is very close to school.)",
      "negative": "我家离公司不远。 (My home is not far from the company.)",
      "question": "你家离这里远不远？ / 离这儿有多远？ (Is your home far from here? / How far is it from here?)",
      "notes": "Distance can be evaluated qualitatively (很远, 很近) or quantitatively (三公里, 五百米)."
    },
    "examples": [
      {
        "zh": "图书馆离宿舍只有两百米。",
        "py": "Túshūguǎn lí sùshè zhǐ yǒu liǎng bǎi mǐ.",
        "en": "The library is only 200 meters away from the dormitory."
      },
      {
        "zh": "中国离美国很远。",
        "py": "Zhōngguó lí Měiguó hěn yuǎn.",
        "en": "China is very far from the United States."
      },
      {
        "zh": "医院离这儿不远，走五分钟就到了。",
        "py": "Yīyuàn lí zhèr bù yuǎn, zǒu wǔ fēnzhōng jiù dào le.",
        "en": "The hospital isn't far from here; it's just a five-minute walk."
      },
      {
        "zh": "请问，火车站离这里有多远？",
        "py": "Qǐngwèn, huǒchēzhàn lí zhèlǐ yǒu duō yuǎn?",
        "en": "Excuse me, how far is the train station from here?"
      }
    ],
    "commonMistakes": [
      "Using 从 instead of 离 when expressing stationary distance (e.g. saying \"我家从学校很远\" is wrong; 从 denotes trajectory, 离 denotes distance).",
      "Forgetting the degree adverb 很 before 远/近 in affirmative statements."
    ],
    "examStrategy": "In HSK 2 dialogue reading, \"离...远/近\" questions often pair with duration estimates like 走十分钟 (a 10-minute walk).",
    "parentLessonSlug": "transport-and-travel",
    "quiz": [
      {
        "id": 1,
        "question": "Which preposition is used to express distance between two stationary places?",
        "options": [
          "从",
          "离",
          "往",
          "在"
        ],
        "correctIndex": 1,
        "explanation": "离 is the designated preposition for spatial separation and distance (A 离 B)."
      },
      {
        "id": 2,
        "question": "Which sentence correctly says \"The hotel is very close to the airport\"?",
        "options": [
          "宾馆从机场很近。",
          "宾馆离机场很近。",
          "宾馆往机场很近。",
          "宾馆对机场很近。"
        ],
        "correctIndex": 1,
        "explanation": "A 离 B 很近 is the standard distance formula."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"我家离地铁站不 ( ___ )。\"",
        "options": [
          "远",
          "快",
          "大",
          "多"
        ],
        "correctIndex": 0,
        "explanation": "Distance is measured in terms of 远 (far) or 近 (close)."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "manner-of-travel-zuo-che",
      "title": "Manner of Travel: 坐 / 骑 / 开 + Vehicle + 去",
      "level": 2
    },
    "nextRule": {
      "slug": "spatial-span-cong-dao",
      "title": "Spatial & Temporal Span: 从...到...",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      },
      {
        "slug": "preposition-gei-dative",
        "title": "Preposition / Dative Construction: 给 + Someone + Verb",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 给 + Recipient + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "分钟",
        "slug": "fenzhong",
        "pinyin": "fēnzhōng",
        "meaning": "minute (time)",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "了",
        "slug": "le",
        "pinyin": "le",
        "meaning": "completed action / change of state",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-1-3",
    "slug": "spatial-span-cong-dao",
    "title": "Spatial & Temporal Span: 从...到...",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Prepositions",
    "pattern": "从 + Start Point + 到 + End Point",
    "explanation": "从...到... (cóng... dào...) expresses the span from an origin to a destination, applicable to both physical space (\"from A to B\") and calendar or clock time (\"from Monday to Friday\", \"from 9am to 5pm\").",
    "structuralVariations": {
      "affirmative": "从北京到上海坐高铁要四个多小时。 (From Beijing to Shanghai by high-speed rail takes over 4 hours.)",
      "negative": "他从早到晚不休息。 (He doesn't rest from morning to night.)",
      "question": "从你家到公司要多长时间？ (How long does it take from your home to the office?)",
      "notes": "Can be combined with verbs: 从八点学习到十二点 (study from 8:00 to 12:00)."
    },
    "examples": [
      {
        "zh": "我们从星期一到星期五都要上课。",
        "py": "Wǒmen cóng xīngqīyī dào xīngqīwǔ dōu yào shàngkè.",
        "en": "We have classes from Monday to Friday."
      },
      {
        "zh": "从这里到机场坐出租车大概要五十分钟。",
        "py": "Cóng zhèlǐ dào jīchǎng zuò chūzūchē dàgài yào wǔshí fēnzhōng.",
        "en": "From here to the airport takes about 50 minutes by taxi."
      },
      {
        "zh": "他从早上八点工作到晚上六点。",
        "py": "Tā cóng zǎoshang bā diǎn gōngzuò dào wǎnshang liù diǎn.",
        "en": "He works from 8:00 in the morning until 6:00 in the evening."
      },
      {
        "zh": "从学校到公园很近。",
        "py": "Cóng xuéxiào dào gōngyuán hěn jìn.",
        "en": "From the school to the park is very close."
      }
    ],
    "commonMistakes": [
      "Confusing 从 (starting from) with 离 (distance between). Use 从...到... for transit or spans, not for single-point distances.",
      "Omitting 到 when specifying both start and end boundaries."
    ],
    "examStrategy": "Frequently tested in time schedule and itinerary listening problems in HSK 2 Section 2.",
    "parentLessonSlug": "transport-and-travel",
    "quiz": [
      {
        "id": 1,
        "question": "Which pair of prepositions expresses \"from... to...\"?",
        "options": [
          "从...到...",
          "离...在...",
          "在...往...",
          "向...过..."
        ],
        "correctIndex": 0,
        "explanation": "从 (from) ... 到 (to) connects temporal or spatial boundaries."
      },
      {
        "id": 2,
        "question": "Complete the sentence: \"我们 ( ___ ) 上午九点 ( ___ ) 下午五点上班。\"",
        "options": [
          "从...到...",
          "离...在...",
          "往...向...",
          "比...跟..."
        ],
        "correctIndex": 0,
        "explanation": "Time spans use 从...到..."
      },
      {
        "id": 3,
        "question": "What is the natural translation of \"From morning till evening\"?",
        "options": [
          "从早到晚",
          "从天到地",
          "离早到晚",
          "在早往晚"
        ],
        "correctIndex": 0,
        "explanation": "从早到晚 is the idiomatic temporal span."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "relative-distance-li-yuan-jin",
      "title": "Relative Distance: A 离 B 远 / 近",
      "level": 2
    },
    "nextRule": {
      "slug": "prohibitive-imperative-bie",
      "title": "Negative Imperative: 别 + Verb (Don't...)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      },
      {
        "slug": "preposition-gei-dative",
        "title": "Preposition / Dative Construction: 给 + Someone + Verb",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 给 + Recipient + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "八",
        "slug": "ba-eight",
        "pinyin": "bā",
        "meaning": "eight; 8",
        "level": 1
      },
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "出租车",
        "slug": "chuzuche",
        "pinyin": "chūzūchē",
        "meaning": "taxi; cab",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-2-1",
    "slug": "prohibitive-imperative-bie",
    "title": "Negative Imperative: 别 + Verb (Don't...)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Sentence Structure",
    "pattern": "别 + Verb Phrase (+ 了)",
    "explanation": "别 (bié) expresses negative imperatives, urging someone not to perform an action (\"Don't do X\"). When combined with sentence-final 了, it indicates \"stop doing X\" (cessation of ongoing behavior).",
    "structuralVariations": {
      "affirmative": "快点走吧！ (Walk faster!)",
      "negative": "别说话！ / 别哭了。 (Don't talk! / Stop crying.)",
      "question": "你能不能别走？ (Can you please not leave?)",
      "notes": "别 is interchangeable with 不要 in almost all conversational contexts, but 别 is punchier and more direct."
    },
    "examples": [
      {
        "zh": "医生说，你生病了，别吃辣的食物。",
        "py": "Yīshēng shuō, nǐ shēngbìng le, bié chī là de shíwù.",
        "en": "The doctor said you are sick, don't eat spicy food."
      },
      {
        "zh": "考试的时候别看手机。",
        "py": "Kǎoshì de shíhou bié kàn shǒujī.",
        "en": "Don't look at your phone during the exam."
      },
      {
        "zh": "别担心，一切都会好起来的。",
        "py": "Bié dānxīn, yíqiè dōu huì hǎo qǐlái de.",
        "en": "Don't worry, everything will be alright."
      },
      {
        "zh": "时间不早了，别玩电脑游戏了。",
        "py": "Shíjiān bù zǎo le, bié wán diànnǎo yóuxì le.",
        "en": "It's late; stop playing computer games."
      }
    ],
    "commonMistakes": [
      "Using 不 to give an imperative command (saying \"不看手机!\" sounds broken; use \"别看手机\").",
      "Confusing 别...了 (stop doing something) with ordinary past 了."
    ],
    "examStrategy": "In HSK 2 listening scenarios at hospitals or classrooms, 别 + Verb is the primary indicator of advice, warnings, or prohibitions.",
    "parentLessonSlug": "health-and-illness",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"Don't worry\" politely in Chinese?",
        "options": [
          "不担心",
          "别担心",
          "没担心",
          "很担心"
        ],
        "correctIndex": 1,
        "explanation": "别担心 is the standard Chinese expression for \"don't worry\"."
      },
      {
        "id": 2,
        "question": "What does \"别喝咖啡了\" mean with the final 了?",
        "options": [
          "You have never drank coffee",
          "Stop drinking coffee (change of action)",
          "You must drink coffee",
          "Coffee is very good"
        ],
        "correctIndex": 1,
        "explanation": "别 + Verb + 了 commands the listener to stop an activity currently taking place."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"外面下大雨，( ___ ) 出去了。\"",
        "options": [
          "别",
          "没",
          "不",
          "最"
        ],
        "correctIndex": 0,
        "explanation": "Imperative warning uses 别."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "spatial-span-cong-dao",
      "title": "Spatial & Temporal Span: 从...到...",
      "level": 2
    },
    "nextRule": {
      "slug": "necessity-dei-yao",
      "title": "Expressing Obligation & Necessity: 得 / 要",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "电脑",
        "slug": "diannao",
        "pinyin": "diànnǎo",
        "meaning": "computer",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-2-2",
    "slug": "necessity-dei-yao",
    "title": "Expressing Obligation & Necessity: 得 / 要",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Modal Verbs",
    "pattern": "Subject + 得 (děi) / 要 + Verb Phrase",
    "explanation": "得 (pronounced děi in conversational spoken Chinese) expresses subjective or objective necessity (\"must / have to / need to\"). 要 expresses strong intention or requirement. The negative of 得 is 不用 or 不必 (\"don't have to\"), NEVER 不得.",
    "structuralVariations": {
      "affirmative": "你感冒了，得去医院看病。 (You caught a cold; you must see a doctor.)",
      "negative": "今天星期天，不用去学校。 (Today is Sunday; you don't have to go to school.)",
      "question": "我们得什么时候出发？ (When do we have to depart?)",
      "notes": "The negative of 得 (děi) is 不用 (búyòng) or 别, not 不得."
    },
    "examples": [
      {
        "zh": "明天有汉语考试，我今天晚上得好好复习。",
        "py": "Míngtiān yǒu Hànyǔ kǎoshì, wǒ jīntiān wǎnshang děi hǎohāo fùxí.",
        "en": "There is a Chinese exam tomorrow; I have to review thoroughly tonight."
      },
      {
        "zh": "你发烧了，得多喝水，多休息。",
        "py": "Nǐ fāshāo le, děi duō hē shuǐ, duō xiūxi.",
        "en": "You have a fever; you must drink more water and rest more."
      },
      {
        "zh": "这件事你不用亲自去，我帮你办。",
        "py": "Zhè jiàn shì nǐ búyòng qīnzì qù, wǒ bāng nǐ bàn.",
        "en": "You don't have to go in person for this matter; I will handle it for you."
      },
      {
        "zh": "我们得马上走，快迟到了。",
        "py": "Wǒmen děi mǎshàng zǒu, kuài chídào le.",
        "en": "We must leave immediately; we're almost late."
      }
    ],
    "commonMistakes": [
      "Negating 得 with 不得 (which means \"must not / not permitted\" in literary style); conversational \"don't need to\" is always 不用.",
      "Pronouncing 得 as de or dé when it functions as an auxiliary modal verb (it must be pronounced děi)."
    ],
    "examStrategy": "Watch for dialogues where a speaker asks \"我得去吗？\" and the reply is \"不用去\" (you don't need to go).",
    "parentLessonSlug": "health-and-illness",
    "quiz": [
      {
        "id": 1,
        "question": "What is the correct negative counterpart for \"你得去\" (You must go)?",
        "options": [
          "你不得去",
          "你不用去",
          "你没得去",
          "你不可去"
        ],
        "correctIndex": 1,
        "explanation": "The natural negative of 得 (děi) is 不用 (bú yòng, don't have to)."
      },
      {
        "id": 2,
        "question": "How is 得 pronounced when meaning \"must / have to\"?",
        "options": [
          "de",
          "dé",
          "děi",
          "dò"
        ],
        "correctIndex": 2,
        "explanation": "As a modal verb expressing necessity, 得 is pronounced 3rd tone děi."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"时间还早，你 ( ___ ) 着急。\"",
        "options": [
          "不用",
          "得",
          "很",
          "要"
        ],
        "correctIndex": 0,
        "explanation": "When there is plenty of time, one does not need to worry (不用着急)."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "prohibitive-imperative-bie",
      "title": "Negative Imperative: 别 + Verb (Don't...)",
      "level": 2
    },
    "nextRule": {
      "slug": "preposition-dui-health",
      "title": "Preposition 对: Expressing Target & Benefit (对...好)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "ability-vs-permission-neng-keyi",
        "title": "Modal Auxiliaries: 能 (nēng) vs 可以 (kěyǐ)",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 能 / 可以 / 会 + Verb Phrase"
      },
      {
        "slug": "intention-verb-dasan",
        "title": "Expressing Future Plans & Intentions: 打算 + Verb",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 打算 (dǎsuan) + Verb Phrase"
      },
      {
        "slug": "willingness-modal-yuanyi",
        "title": "Willingness & Volition: 愿意 + Verb (Willing to...)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 愿意 (yuànyì) + Verb Phrase"
      },
      {
        "slug": "strict-obligation-bixu",
        "title": "Strict Imperative Obligation: 必须 + Verb (Must / Mandatory)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 必须 (bìxū) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-2-3",
    "slug": "preposition-dui-health",
    "title": "Preposition 对: Expressing Target & Benefit (对...好)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Prepositions",
    "pattern": "Subject + 对 + Target + Adjective / Verb Phrase",
    "explanation": "对 (duì) introduces the recipient or object of an action or attitude (\"toward / to / for\"). Common constructions include 对...好 (good for/kind toward), 对...有帮助 (helpful for), and 对...感兴趣 (interested in).",
    "structuralVariations": {
      "affirmative": "多吃水果对身体很好。 (Eating more fruit is very good for one's health.)",
      "negative": "抽烟对身体不好。 (Smoking is not good for your health.)",
      "question": "常喝茶对健康有好处吗？ (Is drinking tea often good for health?)",
      "notes": "When expressing attitude toward people: 老师对我们很热情 (The teacher is very warm toward us)."
    },
    "examples": [
      {
        "zh": "每天跑步对身体很有好处。",
        "py": "Měitiān pǎobù duì shēntǐ hěn yǒu hǎochu.",
        "en": "Running every day is very beneficial for your health."
      },
      {
        "zh": "张老师对所有的学生都很耐心。",
        "py": "Zhāng lǎoshī duì suǒyǒu de xuésheng dōu hěn nàixīn.",
        "en": "Teacher Zhang is very patient with all the students."
      },
      {
        "zh": "熬夜对皮肤不好。",
        "py": "Áoyè duì pífū bù hǎo.",
        "en": "Staying up late is bad for your skin."
      },
      {
        "zh": "这本书对我的汉语学习很有帮助。",
        "py": "Zhè běn shū duì wǒ de Hànyǔ xuéxí hěn yǒu bāngzhù.",
        "en": "This book is very helpful for my Chinese study."
      }
    ],
    "commonMistakes": [
      "Placing 对 after the adjective (saying \"跑步很好对身体\" is an English word-order mistake; must say \"跑步对身体很好\").",
      "Confusing 对 (for/toward) with 给 (give to)."
    ],
    "examStrategy": "In HSK 2 Reading Part 3, \"对...有帮助\" and \"对...好\" are frequent correct choices in informational passages about health and study habits.",
    "parentLessonSlug": "health-and-illness",
    "quiz": [
      {
        "id": 1,
        "question": "Which preposition completes the phrase: \"多做运动 ( ___ ) 身体很好\"?",
        "options": [
          "对",
          "从",
          "离",
          "比"
        ],
        "correctIndex": 0,
        "explanation": "对 introduces the beneficiary/target of health habits (对身体好)."
      },
      {
        "id": 2,
        "question": "Which sentence matches natural Chinese word order?",
        "options": [
          "喝牛奶对健康很好。",
          "喝牛奶很好对健康。",
          "对健康喝牛奶很好。",
          "喝牛奶对很好健康。"
        ],
        "correctIndex": 0,
        "explanation": "Subject + Prepositional phrase (对健康) + Predicate (很好)."
      },
      {
        "id": 3,
        "question": "Translate: \"The teacher is very friendly to us.\"",
        "options": [
          "老师对我们很客气。",
          "老师给我们很客气。",
          "老师在很客气我们。",
          "老师从我们很客气。"
        ],
        "correctIndex": 0,
        "explanation": "Attitude toward someone is expressed with 对 + Person + Adjective."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "necessity-dei-yao",
      "title": "Expressing Obligation & Necessity: 得 / 要",
      "level": 2
    },
    "nextRule": {
      "slug": "future-imminence-kuai-yao-le",
      "title": "Imminent Future Action: 快要...了 (About to...)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      },
      {
        "slug": "preposition-gei-dative",
        "title": "Preposition / Dative Construction: 给 + Someone + Verb",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 给 + Recipient + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "茶",
        "slug": "cha-tea",
        "pinyin": "chá",
        "meaning": "tea",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-3-1",
    "slug": "future-imminence-kuai-yao-le",
    "title": "Imminent Future Action: 快要...了 (About to...)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Aspect Markers",
    "pattern": "Subject + 快要 / 就要 / 快 + Verb Phrase + 了",
    "explanation": "快要...了 (kuài yào... le) marks an event that is imminent and about to occur in the immediate future (\"about to / going to soon\"). If a specific time word is given (e.g. 下个月, 明天), use 就要...了 instead of 快要...了.",
    "structuralVariations": {
      "affirmative": "火车快要开了。 (The train is about to depart.)",
      "negative": "还没...呢 (Not yet: 火车还没开呢).",
      "question": "飞机快要起飞了吗？ (Is the flight about to take off?)",
      "notes": "Can appear as 快...了, 快要...了, or 就要...了. When a specific time adverb is specified, only 就要...了 can be used (e.g. 明天我们就要考试了)."
    },
    "examples": [
      {
        "zh": "天阴了，快要下雨了，我们快回家吧。",
        "py": "Tiān yīn le, kuài yào xiàyǔ le, wǒmen kuài huíjiā ba.",
        "en": "The sky is overcast and it's about to rain; let's hurry home."
      },
      {
        "zh": "新的一年快要到了。",
        "py": "Xīn de yì nián kuài yào dào le.",
        "en": "The new year is about to arrive."
      },
      {
        "zh": "下课时间快要到了。",
        "py": "Xiàkè shíjiān kuài yào dào le.",
        "en": "Class is about to end."
      },
      {
        "zh": "下个月姐姐就要结婚了。",
        "py": "Xià gè yuè jiějie jiù yào jiéhūn le.",
        "en": "Next month my older sister is getting married."
      }
    ],
    "commonMistakes": [
      "Using 快要 with a specific future calendar date (e.g. saying \"明天快要考试了\" is incorrect; must say \"明天就要考试了\").",
      "Omitting the sentence-final modal particle 了."
    ],
    "examStrategy": "In HSK 2 listening, hearing \"快要...了\" usually prompts urgency in dialogues, signaling the listener should act quickly.",
    "parentLessonSlug": "weather-and-seasons",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence correctly expresses an imminent event without a specific date?",
        "options": [
          "飞机快要起飞了。",
          "飞机快要起飞。",
          "飞机要起飞过。",
          "飞机在起飞快。"
        ],
        "correctIndex": 0,
        "explanation": "快要 + Verb + 了 forms the standard structure of imminence."
      },
      {
        "id": 2,
        "question": "Why is \"明天快要下雨了\" considered non-standard?",
        "options": [
          "下雨 cannot take 快要",
          "Specific time expressions like 明天 cannot pair with 快要; use 就要",
          "明天 must be at the end",
          "Needs 不 before 快要"
        ],
        "correctIndex": 1,
        "explanation": "When a specific time point is provided, use 就要...了 rather than 快要...了."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"电影马上 ( ___ ) 开始了。\"",
        "options": [
          "要",
          "过",
          "在",
          "比"
        ],
        "correctIndex": 0,
        "explanation": "马上要...了 or 快要...了 indicates imminent action."
      }
    ],
    "parentLessonTitle": "Weather, Temperatures & Seasons (天气与四季)",
    "prevRule": {
      "slug": "preposition-dui-health",
      "title": "Preposition 对: Expressing Target & Benefit (对...好)",
      "level": 2
    },
    "nextRule": {
      "slug": "change-of-situation-le",
      "title": "Modal Particle 了: Change of State or Situation",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "experiential-marker-guo",
        "title": "Experiential Aspect Marker 过 (guo)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + Verb + 过 + Object"
      },
      {
        "slug": "action-in-progress-zhengzai",
        "title": "Action in Progress: 正在...呢 (Currently doing...)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + 正 / 在 / 正在 + Verb Phrase + (呢)"
      },
      {
        "slug": "completed-action-verb-le",
        "title": "Completed Action Aspect Marker: Verb + 了",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + Verb + 了 + Object"
      },
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "飞机",
        "slug": "feiji",
        "pinyin": "fēijī",
        "meaning": "airplane",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "回",
        "slug": "hui-return",
        "pinyin": "huí",
        "meaning": "to return; to go back",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "开",
        "slug": "kai",
        "pinyin": "kāi",
        "meaning": "to open; to drive",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-3-2",
    "slug": "change-of-situation-le",
    "title": "Modal Particle 了: Change of State or Situation",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Particles",
    "pattern": "Predicate / Sentence + 了 (Sentence-Final)",
    "explanation": "When placed at the very end of a sentence, the modal particle 了 (le) indicates a newly emerged situation, a change in status, or a new realization (\"now / has become / no longer\").",
    "structuralVariations": {
      "affirmative": "春天来了，天气暖和了。 (Spring has arrived; the weather has turned warm.)",
      "negative": "我不吃肉了。 (I don't eat meat anymore [change of habit]).",
      "question": "你的感冒好了吗？ (Has your cold recovered?)",
      "notes": "Distinct from aspectual 了 (which attaches directly to a verb to mark completion). Modal sentence-final 了 marks dynamic situational change."
    },
    "examples": [
      {
        "zh": "下雪了，外面的世界变成了白色。",
        "py": "Xiàxuě le, wàimiàn de shìjiè biànchéng le báisè.",
        "en": "It's snowing now; the outside world has turned white."
      },
      {
        "zh": "现在八点半了，我们该出发了。",
        "py": "Xiànzài bā diǎn bàn le, wǒmen gāi chūfā le.",
        "en": "It's 8:30 already; we should head out."
      },
      {
        "zh": "我已经不是小孩子了。",
        "py": "Wǒ yǐjīng bú shì xiǎoháizi le.",
        "en": "I am no longer a child."
      },
      {
        "zh": "这件衣服太贵了，我不买了。",
        "py": "Zhè jiàn yīfu tài guì le, wǒ bù mǎi le.",
        "en": "These clothes are too expensive; I'm not buying them anymore."
      }
    ],
    "commonMistakes": [
      "Assuming all sentence-final 了 marks past tense (e.g. \"不买了\" means \"won't buy anymore\", which is present/future change of state).",
      "Confusing verb-aspectual 了 (verb + 了 + object) with modal change-of-state 了."
    ],
    "examStrategy": "In HSK 2 reading comprehension, sentence-final 了 often signals the turning point of a narrative passage (e.g., 天晴了).",
    "parentLessonSlug": "weather-and-seasons",
    "quiz": [
      {
        "id": 1,
        "question": "What does \"我不喝咖啡了\" signify?",
        "options": [
          "I never liked coffee",
          "I didn't drink coffee yesterday",
          "I don't drink coffee anymore (change of state/habit)",
          "I will drink coffee soon"
        ],
        "correctIndex": 2,
        "explanation": "不 + Verb + 了 indicates cessation or abandonment of a previous habit."
      },
      {
        "id": 2,
        "question": "Where is modal particle 了 placed in the sentence?",
        "options": [
          "Directly before the subject",
          "Between the subject and verb",
          "At the very end of the sentence/clause",
          "Directly before the object"
        ],
        "correctIndex": 2,
        "explanation": "Modal particle 了 occupies the clause-final or sentence-final position."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"树叶黄 ( ___ )，秋天到了。\"",
        "options": [
          "了",
          "过",
          "着",
          "得"
        ],
        "correctIndex": 0,
        "explanation": "Leaves turning yellow is a change of state, marked by 了."
      }
    ],
    "parentLessonTitle": "Weather, Temperatures & Seasons (天气与四季)",
    "prevRule": {
      "slug": "future-imminence-kuai-yao-le",
      "title": "Imminent Future Action: 快要...了 (About to...)",
      "level": 2
    },
    "nextRule": {
      "slug": "concession-suiran-danshi",
      "title": "Concession Structure: 虽然...但是... (Although... but...)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "possession-particle-de",
        "title": "Possessive & Attributive Particle 的 (de)",
        "level": 1,
        "category": "Particles",
        "pattern": "Possessor / Modifier + 的 + Noun"
      },
      {
        "slug": "attributive-modification-de",
        "title": "Attributive Modification with 的: Adj + 的 + Noun",
        "level": 1,
        "category": "Particles",
        "pattern": "Two-syllable Adj + 的 + Noun"
      },
      {
        "slug": "continuous-particle-ne-query",
        "title": "Contextual Query & State Continuity with 呢 (ne)",
        "level": 1,
        "category": "Particles",
        "pattern": "Noun / Pronoun + 呢？"
      },
      {
        "slug": "adverbial-manner-particle-de",
        "title": "Adverbial Manner Structural Particle: 地 (de)",
        "level": 3,
        "category": "Particles",
        "pattern": "Adjective / Modifier + 地 (de) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "八",
        "slug": "ba-eight",
        "pinyin": "bā",
        "meaning": "eight; 8",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-3-3",
    "slug": "concession-suiran-danshi",
    "title": "Concession Structure: 虽然...但是... (Although... but...)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complex Sentences",
    "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2",
    "explanation": "虽然...但是... (suīrán... dànshì...) establishes an adversative or concessive relationship (\"Although... nevertheless...\"). Mandarin requires both the concessive conjunction (虽然) and the adversative conjunction (但是 / 可是) in standard formal writing.",
    "structuralVariations": {
      "affirmative": "虽然今天很冷，但是没有下雪。 (Although it's very cold today, it hasn't snowed.)",
      "negative": "虽然他不聪明，但是学习很认真。 (Although he isn't clever, he studies diligently.)",
      "question": "虽然路很远，但是你想去吗？ (Although the road is long, do you want to go?)",
      "notes": "虽然 can precede or follow the subject of the first clause: 虽然他很忙 / 他虽然很忙."
    },
    "examples": [
      {
        "zh": "这件衣服虽然有点儿贵，但是质量非常好。",
        "py": "Zhè jiàn yīfu suīrán yǒudiǎnr guì, dànshì zhìliàng fēicháng hǎo.",
        "en": "Although this piece of clothing is a bit expensive, the quality is excellent."
      },
      {
        "zh": "虽然汉语很难学，但是我非常喜欢汉语。",
        "py": "Suīrán Hànyǔ hěn nán xué, dànshì wǒ fēicháng xǐhuan Hànyǔ.",
        "en": "Although Chinese is difficult to learn, I like it very much."
      },
      {
        "zh": "虽然他生病了，可是他坚持来上课。",
        "py": "Suīrán tā shēngbìng le, kěshì tā jiānchí lái shàngkè.",
        "en": "Although he was sick, he insisted on attending class."
      },
      {
        "zh": "外面的风虽然很大，但是屋子里很暖和。",
        "py": "Wàimiàn de fēng suīrán hěn dà, dànshì wūzi lǐ hěn nuǎnhuo.",
        "en": "Although the wind outside is strong, it is cozy inside the room."
      }
    ],
    "commonMistakes": [
      "Omitting 但是/可是 in the second clause due to English interference (\"Although it rained, [but] we went\" is incorrect in English, but mandatory in Mandarin).",
      "Confusing 虽然...但是 (concession) with 因为...所以 (causation)."
    ],
    "examStrategy": "In HSK 2 Sentence Ordering questions, seeing 虽然 in one phrase immediately tells you to look for 但是 / 可是 in the subsequent phrase.",
    "parentLessonSlug": "weather-and-seasons",
    "quiz": [
      {
        "id": 1,
        "question": "Which word naturally pairs with 虽然 in the second clause?",
        "options": [
          "所以",
          "但是",
          "因为",
          "而且"
        ],
        "correctIndex": 1,
        "explanation": "虽然 pairs with 但是 (or 可是) to express concession."
      },
      {
        "id": 2,
        "question": "Unlike English, does standard Mandarin require 但是 when 虽然 is used in the first clause?",
        "options": [
          "Yes, Mandarin typically retains 但是 in the second clause",
          "No, 但是 is strictly prohibited",
          "Only in questions",
          "Only with numbers"
        ],
        "correctIndex": 0,
        "explanation": "Chinese correlative conjunctions typically occur in matched pairs (虽然...但是)."
      },
      {
        "id": 3,
        "question": "Complete the sentence: \"虽然天气不好，( ___ ) 他还是去打篮球了。\"",
        "options": [
          "但是",
          "因为",
          "所以",
          "如果"
        ],
        "correctIndex": 0,
        "explanation": "Adversative transition uses 但是."
      }
    ],
    "parentLessonTitle": "Weather, Temperatures & Seasons (天气与四季)",
    "prevRule": {
      "slug": "change-of-situation-le",
      "title": "Modal Particle 了: Change of State or Situation",
      "level": 2
    },
    "nextRule": {
      "slug": "action-in-progress-zhengzai",
      "title": "Action in Progress: 正在...呢 (Currently doing...)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      },
      {
        "slug": "hypothetical-ruguo-jiu",
        "title": "Hypothetical Condition: 如果...就... (If... then...)",
        "level": 3,
        "category": "Complex Sentences",
        "pattern": "如果 + Condition Clause + (的话), Subject + 就 + Consequence Clause"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-4-1",
    "slug": "action-in-progress-zhengzai",
    "title": "Action in Progress: 正在...呢 (Currently doing...)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Aspect Markers",
    "pattern": "Subject + 正 / 在 / 正在 + Verb Phrase + (呢)",
    "explanation": "正在 (zhèngzài) marks progressive aspect, indicating that an action is currently happening right now (\"in the middle of doing\"). The sentence can use 正, 在, 正在, or append sentence-final 呢.",
    "structuralVariations": {
      "affirmative": "我们在看电视呢。 (We are watching television.)",
      "negative": "我没在玩游戏。 (I am not playing games.)",
      "question": "你正在做什么呢？ (What are you doing right now?)",
      "notes": "Negated with 没 or 没有在; never use 不 in progressive negation."
    },
    "examples": [
      {
        "zh": "爸爸正在书房看报纸呢。",
        "py": "Bàba zhèngzài shūfáng kàn bàozhǐ ne.",
        "en": "Dad is currently in the study reading the newspaper."
      },
      {
        "zh": "外面正在下大雨，别出门了。",
        "py": "Wàimiàn zhèngzài xià dàyǔ, bié chūmén le.",
        "en": "It is pouring rain outside; don't go out."
      },
      {
        "zh": "老师在上课，请大家安静。",
        "py": "Lǎoshī zài shàngkè, qǐng dàjiā ānjìng.",
        "en": "The teacher is giving a lecture; please be quiet, everyone."
      },
      {
        "zh": "你打电话的时候，我正在洗澡。",
        "py": "Nǐ dǎ diànhuà de shíhou, wǒ zhèngzài xǐzǎo.",
        "en": "When you called, I was in the middle of taking a shower."
      }
    ],
    "commonMistakes": [
      "Negating with 不 (saying \"我不在看书\" means \"I won't/don't read books here\"; to negate progressive action, say \"我没在看书\").",
      "Using 正在 with stative verbs or verbs of existence (e.g. saying \"我正在是学生\" is completely wrong)."
    ],
    "examStrategy": "In HSK 2 listening phone-call scenarios, \"你在做什么？\" is almost universally answered with \"(正)在...呢\".",
    "parentLessonSlug": "hobbies-and-sports",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"He is listening to music right now\"?",
        "options": [
          "他正听音乐过。",
          "他正在听音乐呢。",
          "他了听音乐。",
          "他听音乐比。"
        ],
        "correctIndex": 1,
        "explanation": "正在 + Verb + 呢 indicates ongoing progressive action."
      },
      {
        "id": 2,
        "question": "Which word negates progressive action (in the middle of doing)?",
        "options": [
          "不",
          "别",
          "没 / 没有",
          "非"
        ],
        "correctIndex": 2,
        "explanation": "Progressive actions are negated with 没 (没在看书)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"喂，你现在 ( ___ ) 忙什么呢？\"",
        "options": [
          "在",
          "过",
          "得",
          "了"
        ],
        "correctIndex": 0,
        "explanation": "在 + Verb + 呢 forms the question asking what one is doing."
      }
    ],
    "parentLessonTitle": "Hobbies, Sports & Leisure (爱好与体育运动)",
    "prevRule": {
      "slug": "concession-suiran-danshi",
      "title": "Concession Structure: 虽然...但是... (Although... but...)",
      "level": 2
    },
    "nextRule": {
      "slug": "completed-action-verb-le",
      "title": "Completed Action Aspect Marker: Verb + 了",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "experiential-marker-guo",
        "title": "Experiential Aspect Marker 过 (guo)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + Verb + 过 + Object"
      },
      {
        "slug": "future-imminence-kuai-yao-le",
        "title": "Imminent Future Action: 快要...了 (About to...)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + 快要 / 就要 / 快 + Verb Phrase + 了"
      },
      {
        "slug": "completed-action-verb-le",
        "title": "Completed Action Aspect Marker: Verb + 了",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + Verb + 了 + Object"
      },
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "打电话",
        "slug": "da-dianhua",
        "pinyin": "dǎ diànhuà",
        "meaning": "to make a telephone call",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "电视",
        "slug": "dianshi",
        "pinyin": "diànshì",
        "meaning": "television; TV",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-4-2",
    "slug": "completed-action-verb-le",
    "title": "Completed Action Aspect Marker: Verb + 了",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Aspect Markers",
    "pattern": "Subject + Verb + 了 + Object",
    "explanation": "The verbal aspect suffix 了 (le) immediately follows a verb to indicate the completion or realization of an event. When the object has a quantifier or modifier (e.g. 买了三本书), verbal 了 is standard.",
    "structuralVariations": {
      "affirmative": "我买了一本新字典。 (I bought a new dictionary.)",
      "negative": "我没有买字典。 (I did not buy a dictionary.)",
      "question": "你买了那本新书吗？ / 你买新书了没有？ (Did you buy that new book?)",
      "notes": "In the negative form with 没 / 没有, the verbal particle 了 MUST be dropped."
    },
    "examples": [
      {
        "zh": "昨天晚上我做完了所有的作业。",
        "py": "Zuótiān wǎnshang wǒ zuò wán le suǒyǒu de zuòyè.",
        "en": "Last night I finished all my homework."
      },
      {
        "zh": "他喝了两杯咖啡，现在睡不着。",
        "py": "Tā hē le liǎng bēi kāfēi, xiànzài shuì bù zháo.",
        "en": "He drank two cups of coffee, and now he can't sleep."
      },
      {
        "zh": "我收到了你的电子邮件。",
        "py": "Wǒ shōudào le nǐ de diànzǐ yóujiàn.",
        "en": "I received your email."
      },
      {
        "zh": "妈妈做了一桌丰盛的晚饭。",
        "py": "Māma zuò le yì zhuō fēngshèng de wǎnfàn.",
        "en": "Mom cooked a sumptuous table of dinner."
      }
    ],
    "commonMistakes": [
      "Retaining 了 in negative sentences (saying \"我没买了书\" is a major error; you must say \"我没买书\").",
      "Using verbal 了 with habitual actions (e.g. saying \"我每天吃了早饭去学校\" is wrong; habitual actions do not take 了)."
    ],
    "examStrategy": "In HSK 2 grammar error identification, look out for the illegal combination of 没 + Verb + 了.",
    "parentLessonSlug": "hobbies-and-sports",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence correctly negates \"我买了苹果\"?",
        "options": [
          "我不买了苹果。",
          "我没有买了苹果。",
          "我没有买苹果。",
          "我别买苹果了。"
        ],
        "correctIndex": 2,
        "explanation": "When negating with 没 / 没有, the verbal aspect suffix 了 must be deleted."
      },
      {
        "id": 2,
        "question": "Can verbal 了 be used to describe habitual actions that happen every day?",
        "options": [
          "No, habitual actions do not take completed aspect marker 了",
          "Yes, always",
          "Only in questions",
          "Only with past days"
        ],
        "correctIndex": 0,
        "explanation": "了 marks specific completion, not ongoing habits or timeless truths."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他昨天去图书馆借 ( ___ ) 两本书。\"",
        "options": [
          "了",
          "在",
          "得",
          "着"
        ],
        "correctIndex": 0,
        "explanation": "Completed past action with quantified object takes verbal 了."
      }
    ],
    "parentLessonTitle": "Hobbies, Sports & Leisure (爱好与体育运动)",
    "prevRule": {
      "slug": "action-in-progress-zhengzai",
      "title": "Action in Progress: 正在...呢 (Currently doing...)",
      "level": 2
    },
    "nextRule": {
      "slug": "action-duration-time-span",
      "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "experiential-marker-guo",
        "title": "Experiential Aspect Marker 过 (guo)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + Verb + 过 + Object"
      },
      {
        "slug": "future-imminence-kuai-yao-le",
        "title": "Imminent Future Action: 快要...了 (About to...)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + 快要 / 就要 / 快 + Verb Phrase + 了"
      },
      {
        "slug": "action-in-progress-zhengzai",
        "title": "Action in Progress: 正在...呢 (Currently doing...)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + 正 / 在 / 正在 + Verb Phrase + (呢)"
      },
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      },
      {
        "hanzi": "了",
        "slug": "le",
        "pinyin": "le",
        "meaning": "completed action / change of state",
        "level": 1
      },
      {
        "hanzi": "妈妈",
        "slug": "mama",
        "pinyin": "māma",
        "meaning": "mother; mom",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-4-3",
    "slug": "action-duration-time-span",
    "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complements",
    "pattern": "Subject + Verb + (Obj + Verb) + 了 + Time Duration",
    "explanation": "To express how long an action has been performed, Mandarin places the duration phrase (e.g. 一个小时, 三天) after the verb. If the verb has an object, the verb is repeated: Verb + Obj + Verb + Duration.",
    "structuralVariations": {
      "affirmative": "他游了半个小时泳。 / 他游泳游了半个小时。 (He swam for half an hour.)",
      "negative": "他很久没有游泳了。 (He hasn't swum for a long time.)",
      "question": "你游了多长时间？ (How long did you swim?)",
      "notes": "If there is a final 了 (Verb + 了 + Duration + 了), it implies the action is still continuing into the present: 我学了一年汉语了 (I have studied Chinese for a year [and am still studying])."
    },
    "examples": [
      {
        "zh": "昨天晚上我睡了八个小时觉。",
        "py": "Zuótiān wǎnshang wǒ shuì le bā gè xiǎoshí jiào.",
        "en": "Last night I slept for eight hours."
      },
      {
        "zh": "大卫学汉语学了两年了。",
        "py": "Dàwèi xué Hànyǔ xué le liǎng nián le.",
        "en": "David has been studying Chinese for two years (and continues)."
      },
      {
        "zh": "我们在机场等了三个小时飞机。",
        "py": "Wǒmen zài jīchǎng děng le sān gè xiǎoshí fēijī.",
        "en": "We waited for three hours at the airport for the flight."
      },
      {
        "zh": "他踢足球踢了一个下午。",
        "py": "Tā tī zúqiú tī le yí gè xiàwǔ.",
        "en": "He played soccer for an entire afternoon."
      }
    ],
    "commonMistakes": [
      "Placing the time duration before the verb like a time point (saying \"我三个小时睡觉\" is wrong; time points go before verbs, but duration goes after the verb).",
      "Forgetting to repeat the verb when an object is present (saying \"他学汉语两年\" is incomplete; say \"他学汉语学了两年\")."
    ],
    "examStrategy": "In HSK 2 listening, \"多长时间\" (how long) questions always expect a duration complement answer placed after the verb.",
    "parentLessonSlug": "hobbies-and-sports",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence correctly expresses the duration of reading?",
        "options": [
          "我看书看了一个小时。",
          "我一个小时看书。",
          "我看一个小时书了看。",
          "书看我一个小时。"
        ],
        "correctIndex": 0,
        "explanation": "Verb + Object + Verb + 了 + Duration is the textbook formula."
      },
      {
        "id": 2,
        "question": "What does the double 了 mean in \"他学了三年汉语了\"?",
        "options": [
          "He finished 3 years ago and quit",
          "He has studied for 3 years and is still studying now",
          "He will study for 3 years in the future",
          "He studied 3 years before dying"
        ],
        "correctIndex": 1,
        "explanation": "Double 了 signifies that the duration has reached the stated length and continues into the present."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"你每天打网球打 ( ___ ) 时间？\"",
        "options": [
          "多长",
          "多少",
          "几",
          "怎么"
        ],
        "correctIndex": 0,
        "explanation": "Duration is queried with 多长时间 (how long)."
      }
    ],
    "parentLessonTitle": "Hobbies, Sports & Leisure (爱好与体育运动)",
    "prevRule": {
      "slug": "completed-action-verb-le",
      "title": "Completed Action Aspect Marker: Verb + 了",
      "level": 2
    },
    "nextRule": {
      "slug": "ability-vs-permission-neng-keyi",
      "title": "Modal Auxiliaries: 能 (nēng) vs 可以 (kěyǐ)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "descriptive-complement-de",
        "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 得 + Adjective"
      },
      {
        "slug": "resultative-complements-wan-hao",
        "title": "Resultative Complements: 完, 好, 到, 懂, 见",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + Result Complement (完 / 好 / 到 / 懂 / 见) + (Object)"
      },
      {
        "slug": "direction-complements-lai-qu",
        "title": "Simple Direction Complements: Verb + 来 / 去",
        "level": 2,
        "category": "Complements",
        "pattern": "Motion Verb (进, 出, 上, 下, 回, 过) + 来 / 去"
      },
      {
        "slug": "degree-complement-de-budele",
        "title": "Extreme Degree Complements: 极了 / 得不得了",
        "level": 2,
        "category": "Complements",
        "pattern": "Adjective + 极了 (jíle) / 得不得了 (de bùdéliǎo)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "八",
        "slug": "ba-eight",
        "pinyin": "bā",
        "meaning": "eight; 8",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "飞机",
        "slug": "feiji",
        "pinyin": "fēijī",
        "meaning": "airplane",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-5-1",
    "slug": "ability-vs-permission-neng-keyi",
    "title": "Modal Auxiliaries: 能 (nēng) vs 可以 (kěyǐ)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Modal Verbs",
    "pattern": "Subject + 能 / 可以 / 会 + Verb Phrase",
    "explanation": "能 (néng) emphasizes physical capability, circumstantial possibility, or reaching a quantitative threshold. 可以 (kěyǐ) expresses permission (\"allowed to\") or mild recommendation (\"can/may\"). 会 (huì) expresses acquired skills learned through study.",
    "structuralVariations": {
      "affirmative": "你可以在这里拍照。 (You may take pictures here [permission]).",
      "negative": "这里不能抽烟。 (You cannot smoke here [prohibition/inability]).",
      "question": "请问，我可以用一下你的铅笔吗？ (Excuse me, may I use your pencil?)",
      "notes": "For permission questions: \"可以吗？\" For physical possibility: \"你今天能来吗？\""
    },
    "examples": [
      {
        "zh": "我的感冒好了，明天能去上学了。",
        "py": "Wǒ de gǎnmào hǎo le, míngtiān néng qù shàngxué le.",
        "en": "My cold is gone; I can go to school tomorrow (physical ability restored)."
      },
      {
        "zh": "图书馆里可以喝水，但不能吃东西。",
        "py": "Túshūguǎn lǐ kěyǐ hē shuǐ, dàn bù néng chī dōngxi.",
        "en": "In the library you can drink water, but you cannot eat food."
      },
      {
        "zh": "请问，这里可以用信用卡付款吗？",
        "py": "Qǐngwèn, zhèlǐ kěyǐ yòng xìnyòngkǎ fùkuǎn ma?",
        "en": "Excuse me, can I pay by credit card here?"
      },
      {
        "zh": "你能游一千米吗？",
        "py": "Nǐ néng yóu yì qiān mǐ ma?",
        "en": "Can you swim 1,000 meters? (quantitative capability)"
      }
    ],
    "commonMistakes": [
      "Using 会 when asking for permission (e.g. saying \"我会进来吗？\" means \"Do I have the acquired skill to enter?\"; say \"我可以进来吗？\").",
      "Using 可以 to state physical recovery after illness (use 能)."
    ],
    "examStrategy": "In HSK 2 Reading Part 2 fill-in-the-blanks, 可以 matches rules, regulations, and polite requests.",
    "parentLessonSlug": "shopping-and-clothing",
    "quiz": [
      {
        "id": 1,
        "question": "Which modal verb is best for asking polite permission: \"May I sit here?\"",
        "options": [
          "我可以坐这里吗？",
          "我会坐这里吗？",
          "我得坐这里吗？",
          "我想坐这里过？"
        ],
        "correctIndex": 0,
        "explanation": "可以 is the standard auxiliary for seeking permission."
      },
      {
        "id": 2,
        "question": "To express reaching a quantitative benchmark (e.g. \"He can drink 5 cups of coffee\"), which verb is used?",
        "options": [
          "会",
          "能",
          "可以",
          "想"
        ],
        "correctIndex": 1,
        "explanation": "能 expresses capacity or reaching a numerical threshold."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"病房里要安静，( ___ ) 大声喧哗。\"",
        "options": [
          "不能",
          "不会",
          "不用",
          "不得"
        ],
        "correctIndex": 0,
        "explanation": "Prohibition/inability uses 不能."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "action-duration-time-span",
      "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
      "level": 2
    },
    "nextRule": {
      "slug": "exclusive-addition-chule-hai",
      "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "necessity-dei-yao",
        "title": "Expressing Obligation & Necessity: 得 / 要",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 得 (děi) / 要 + Verb Phrase"
      },
      {
        "slug": "intention-verb-dasan",
        "title": "Expressing Future Plans & Intentions: 打算 + Verb",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 打算 (dǎsuan) + Verb Phrase"
      },
      {
        "slug": "willingness-modal-yuanyi",
        "title": "Willingness & Volition: 愿意 + Verb (Willing to...)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 愿意 (yuànyì) + Verb Phrase"
      },
      {
        "slug": "strict-obligation-bixu",
        "title": "Strict Imperative Obligation: 必须 + Verb (Must / Mandatory)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 必须 (bìxū) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "东西",
        "slug": "dongxi",
        "pinyin": "dōngxi",
        "meaning": "thing; stuff",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-5-2",
    "slug": "exclusive-addition-chule-hai",
    "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complex Sentences",
    "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B",
    "explanation": "除了...还... (chúle... hái...) expresses inclusion or addition (\"In addition to A, there is also B\"). It expands a scope. Note that when paired with 都, 除了...都... becomes exclusive (\"Except for A, all are B\").",
    "structuralVariations": {
      "affirmative": "除了苹果以外，我还买了一些香蕉。 (Besides apples, I also bought some bananas.)",
      "negative": "除了星期天以外，图书馆每天都开门。 (Except for Sunday, the library opens every day.)",
      "question": "除了汉语，你还会说别的外语吗？ (Besides Chinese, can you speak other foreign languages?)",
      "notes": "除了...还/也... = Inclusion (both A and B). 除了...都... = Exclusion (all except A)."
    },
    "examples": [
      {
        "zh": "他除了喜欢踢足球以外，还喜欢打篮球。",
        "py": "Tā chúle xǐhuan tī zúqiú yǐwài, hái xǐhuan dǎ lánqiú.",
        "en": "Besides playing soccer, he also likes playing basketball."
      },
      {
        "zh": "除了小明以外，大家都在教室里。",
        "py": "Chúle Xiǎomíng yǐwài, dàjiā dōu zài jiàoshì lǐ.",
        "en": "Except for Xiao Ming, everyone is in the classroom."
      },
      {
        "zh": "今天除了下雨，还刮起了大风。",
        "py": "Jīntiān chúle xiàyǔ, hái guā qǐ le dàfēng.",
        "en": "Today, besides raining, it also became very windy."
      },
      {
        "zh": "除了周末，他每天晚上都去跑步。",
        "py": "Chúle zhōumò, tā měitiān wǎnshang dōu qù pǎobù.",
        "en": "Except for weekends, he goes running every night."
      }
    ],
    "commonMistakes": [
      "Mixing up 还 and 都 (using 都 makes the sentence exclusive; using 还 makes it inclusive).",
      "Forgetting 还/也 when aiming to express \"in addition to\"."
    ],
    "examStrategy": "In HSK 2 reading comprehension, check whether the second clause has 还 (inclusion) or 都 (exclusion).",
    "parentLessonSlug": "shopping-and-clothing",
    "quiz": [
      {
        "id": 1,
        "question": "Which correlative adverb creates an INCLUSIVE meaning with 除了 (meaning \"A as well as B\")?",
        "options": [
          "还 / 也",
          "都",
          "就",
          "才"
        ],
        "correctIndex": 0,
        "explanation": "除了...还/也 expresses inclusive addition (\"In addition to... also...\")."
      },
      {
        "id": 2,
        "question": "What does \"除了他，我们都去了\" mean?",
        "options": [
          "Both he and we went",
          "He went, but we did not go",
          "Except for him, all of us went",
          "Nobody went"
        ],
        "correctIndex": 2,
        "explanation": "除了 paired with 都 signifies exclusion: except him, everyone went."
      },
      {
        "id": 3,
        "question": "Complete the sentence: \"他除了会英语，( ___ ) 会说一点儿日语。\"",
        "options": [
          "还",
          "都",
          "别",
          "比"
        ],
        "correctIndex": 0,
        "explanation": "Inclusive addition takes 还."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "ability-vs-permission-neng-keyi",
      "title": "Modal Auxiliaries: 能 (nēng) vs 可以 (kěyǐ)",
      "level": 2
    },
    "nextRule": {
      "slug": "descriptive-complement-de",
      "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      },
      {
        "slug": "hypothetical-ruguo-jiu",
        "title": "Hypothetical Condition: 如果...就... (If... then...)",
        "level": 3,
        "category": "Complex Sentences",
        "pattern": "如果 + Condition Clause + (的话), Subject + 就 + Consequence Clause"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "会",
        "slug": "hui-can",
        "pinyin": "huì",
        "meaning": "can; be able to; will",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-5-3",
    "slug": "descriptive-complement-de",
    "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complements",
    "pattern": "Subject + Verb + (Obj + Verb) + 得 + Adjective",
    "explanation": "The structural particle 得 (de) introduces a descriptive complement evaluating how well, poorly, or quickly an action is performed. The adjective after 得 typically takes degree adverbs like 很, 非常, or 真.",
    "structuralVariations": {
      "affirmative": "他说汉语说得非常流利。 (He speaks Chinese very fluently.)",
      "negative": "他跑得不快。 (He doesn't run fast.)",
      "question": "你考得怎么样？ / 他写得好不好？ (How did you do on the test? / Does he write well?)",
      "notes": "Negation is placed AFTER 得 before the adjective (跑得不快), NEVER before the verb (*不跑得快)."
    },
    "examples": [
      {
        "zh": "姐姐唱歌唱得很好听。",
        "py": "Jiějie chàng gē chàng de hěn hǎotīng.",
        "en": "My older sister sings very beautifully."
      },
      {
        "zh": "昨天晚上我睡得很好。",
        "py": "Zuótiān wǎnshang wǒ shuì de hěn hǎo.",
        "en": "Last night I slept very well."
      },
      {
        "zh": "他汉字写得真漂亮。",
        "py": "Tā hànzì xiě de zhēn piàoliang.",
        "en": "His Chinese characters are written truly beautifully."
      },
      {
        "zh": "大卫起得很早，因为要赶早班车。",
        "py": "Dàwèi qǐ de hěn zǎo, yīnwèi yào gǎn zǎobānchē.",
        "en": "David got up very early because he had to catch the morning bus."
      }
    ],
    "commonMistakes": [
      "Negating before the verb instead of after 得 (saying \"他不跑得快\" is wrong; must say \"他跑得不快\").",
      "Confusing 得 (complement particle), 的 (possessive particle), and 地 (manner particle)."
    ],
    "examStrategy": "One of the most frequently tested grammar points in HSK 2 and 3. Remember: Verb + 得 + Adjective; negative is Verb + 得 + 不 + Adjective.",
    "parentLessonSlug": "shopping-and-clothing",
    "quiz": [
      {
        "id": 1,
        "question": "How do you correctly negate \"他跑得快\" (He runs fast)?",
        "options": [
          "他不跑得快。",
          "他跑得不快。",
          "他没跑得快。",
          "他跑不快得。"
        ],
        "correctIndex": 1,
        "explanation": "In descriptive complement structures, negation is placed directly after 得: Verb + 得 + 不 + Adj."
      },
      {
        "id": 2,
        "question": "Which structural particle connects a verb to an evaluative adjective complement?",
        "options": [
          "的",
          "地",
          "得",
          "着"
        ],
        "correctIndex": 2,
        "explanation": "得 (de) connects verbs to descriptive complements (唱得好, 跑得快)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他今天汉字写 ( ___ ) 很认真。\"",
        "options": [
          "得",
          "的",
          "地",
          "了"
        ],
        "correctIndex": 0,
        "explanation": "Connecting verb 写 to evaluation 很认真 requires 得."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "exclusive-addition-chule-hai",
      "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
      "level": 2
    },
    "nextRule": {
      "slug": "resultative-complements-wan-hao",
      "title": "Resultative Complements: 完, 好, 到, 懂, 见",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "action-duration-time-span",
        "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 了 + Time Duration"
      },
      {
        "slug": "resultative-complements-wan-hao",
        "title": "Resultative Complements: 完, 好, 到, 懂, 见",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + Result Complement (完 / 好 / 到 / 懂 / 见) + (Object)"
      },
      {
        "slug": "direction-complements-lai-qu",
        "title": "Simple Direction Complements: Verb + 来 / 去",
        "level": 2,
        "category": "Complements",
        "pattern": "Motion Verb (进, 出, 上, 下, 回, 过) + 来 / 去"
      },
      {
        "slug": "degree-complement-de-budele",
        "title": "Extreme Degree Complements: 极了 / 得不得了",
        "level": 2,
        "category": "Complements",
        "pattern": "Adjective + 极了 (jíle) / 得不得了 (de bùdéliǎo)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      },
      {
        "hanzi": "你",
        "slug": "ni",
        "pinyin": "nǐ",
        "meaning": "you (singular)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-6-1",
    "slug": "resultative-complements-wan-hao",
    "title": "Resultative Complements: 完, 好, 到, 懂, 见",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complements",
    "pattern": "Subject + Verb + Result Complement (完 / 好 / 到 / 懂 / 见) + (Object)",
    "explanation": "A resultative complement is an adjective or verb attached directly to the main verb to signal the result, completion, or outcome of the action. Common complements include 完 (finish), 好 (ready/properly finished), 懂 (understand), 见 (perceive), and 到 (reach/arrive).",
    "structuralVariations": {
      "affirmative": "我已经吃完早饭了。 (I have finished eating breakfast.)",
      "negative": "我还没听懂他说的话。 (I haven't understood what he said yet.)",
      "question": "你准备好了吗？ / 你看见我的钥匙了吗？ (Are you ready? / Did you see my keys?)",
      "notes": "Negated with 没 or 没有; never use 不, because results denote realized events."
    },
    "examples": [
      {
        "zh": "大家准备好了吗？我们要出发了。",
        "py": "Dàjiā zhǔnbèi hǎo le ma? Wǒmen yào chūfā le.",
        "en": "Is everyone ready? We are about to depart."
      },
      {
        "zh": "这本小说我已经看完了。",
        "py": "Zhè běn xiǎoshuō wǒ yǐjīng kàn wán le.",
        "en": "I have already finished reading this novel."
      },
      {
        "zh": "老师说的话，你听懂了吗？",
        "py": "Lǎoshī shuō de huà, nǐ tīng dǒng le ma?",
        "en": "Did you understand what the teacher said?"
      },
      {
        "zh": "昨天在超市我看见了王老师。",
        "py": "Zuótiān zài chāoshì wǒ kànjiàn le Wáng lǎoshī.",
        "en": "Yesterday at the supermarket I saw Teacher Wang."
      }
    ],
    "commonMistakes": [
      "Inserting an object between the verb and its resultative complement (saying \"我听话懂了\" is incorrect; must say \"我听懂话了\").",
      "Negating with 不 instead of 没有 (e.g., saying \"我不看完了\" is wrong; say \"我没看完\")."
    ],
    "examStrategy": "In HSK 2 Listening Section 3, dialogue questions asking \"他们准备得怎么样？\" will feature answers like \"准备好了\".",
    "parentLessonSlug": "locations-and-asking-directions",
    "quiz": [
      {
        "id": 1,
        "question": "Which resultative complement denotes that an action is completed and ready for the next step?",
        "options": [
          "好",
          "见",
          "开",
          "着"
        ],
        "correctIndex": 0,
        "explanation": "好 as a resultative complement means completed satisfactorily and prepared (准备好, 做好了)."
      },
      {
        "id": 2,
        "question": "How do you say \"I did not finish doing my homework\"?",
        "options": [
          "我不做完作业。",
          "我没做完作业。",
          "我做不完作业了。",
          "我别做完作业。"
        ],
        "correctIndex": 1,
        "explanation": "Resultative past completion is negated with 没 (没做完)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"你在前面看 ( ___ ) 那座红色的楼了吗？\"",
        "options": [
          "见",
          "好",
          "完",
          "过"
        ],
        "correctIndex": 0,
        "explanation": "看见 denotes sensory visual perception."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "descriptive-complement-de",
      "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
      "level": 2
    },
    "nextRule": {
      "slug": "comparative-increment-yidianr",
      "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "action-duration-time-span",
        "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 了 + Time Duration"
      },
      {
        "slug": "descriptive-complement-de",
        "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 得 + Adjective"
      },
      {
        "slug": "direction-complements-lai-qu",
        "title": "Simple Direction Complements: Verb + 来 / 去",
        "level": 2,
        "category": "Complements",
        "pattern": "Motion Verb (进, 出, 上, 下, 回, 过) + 来 / 去"
      },
      {
        "slug": "degree-complement-de-budele",
        "title": "Extreme Degree Complements: 极了 / 得不得了",
        "level": 2,
        "category": "Complements",
        "pattern": "Adjective + 极了 (jíle) / 得不得了 (de bùdéliǎo)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-6-2",
    "slug": "comparative-increment-yidianr",
    "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Comparisons",
    "pattern": "Adjective + 一点儿 / 一些 (Slight) OR 得多 / 多了 (Major)",
    "explanation": "To quantify the margin of difference in a comparison, place the degree modifier AFTER the adjective. 一点儿 or 一些 expresses a small margin (\"a bit more\"), while 得多 or 多了 expresses a substantial margin (\"much more\").",
    "structuralVariations": {
      "affirmative": "这件衣服便宜一点儿。 (This piece of clothing is a bit cheaper.)",
      "negative": "不比这件便宜。 (Not cheaper than this one.)",
      "question": "有没有大一点儿的尺码？ (Do you have a slightly larger size?)",
      "notes": "Contrast with 有点儿: 有点儿 + Adj comes BEFORE the adjective and usually denotes mild annoyance or undesirability (有点儿贵)."
    },
    "examples": [
      {
        "zh": "请您说得慢一点儿，我听得不太清楚。",
        "py": "Qǐng nín shuō de màn yìdiǎnr, wǒ tīng de bú tài qīngchu.",
        "en": "Please speak a bit slower; I can't hear very clearly."
      },
      {
        "zh": "今天的天气比昨天好得多。",
        "py": "Jīntiān de tiānqì bǐ zuótiān hǎo de duō.",
        "en": "Today's weather is much better than yesterday."
      },
      {
        "zh": "这双鞋子有点儿小，我想换一双大一点儿的。",
        "py": "Zhè shuāng xiézi yǒudiǎnr xiǎo, wǒ xiǎng huàn yì shuāng dà yìdiǎnr de.",
        "en": "These shoes are a bit small; I'd like to exchange for a slightly bigger pair."
      },
      {
        "zh": "坐高铁比坐大巴舒服多了。",
        "py": "Zuò gāotiě bǐ zuò dàbā shūfu duō le.",
        "en": "Taking the high-speed rail is much more comfortable than taking a bus."
      }
    ],
    "commonMistakes": [
      "Confusing 有点儿 + Adj (unfavorable degree before adjective: 有点儿贵) with Adj + 一点儿 (comparative margin after adjective: 便宜一点儿).",
      "Placing 得多 before the adjective (saying \"得多快\" is wrong; must say \"快得多\")."
    ],
    "examStrategy": "A classic HSK trap: shopping dialogues will have customers ask \"有没有便宜一点儿的？\" (Do you have a slightly cheaper one?).",
    "parentLessonSlug": "locations-and-asking-directions",
    "quiz": [
      {
        "id": 1,
        "question": "Which position does 一点儿 occupy when expressing a comparative difference?",
        "options": [
          "Before the adjective",
          "After the adjective",
          "Before the subject",
          "At sentence start"
        ],
        "correctIndex": 1,
        "explanation": "Adj + 一点儿 indicates a slight comparative increment (e.g., 大一点儿)."
      },
      {
        "id": 2,
        "question": "Which phrase expresses a MAJOR comparative difference?",
        "options": [
          "贵一点儿",
          "贵得多",
          "有一点儿贵",
          "贵很"
        ],
        "correctIndex": 1,
        "explanation": "Adj + 得多 (or 多了) indicates a substantial margin of difference."
      },
      {
        "id": 3,
        "question": "Complete the customer request: \"这件衣服太大了，请给我拿一件小 ( ___ ) 的。\"",
        "options": [
          "一点儿",
          "有点儿",
          "很",
          "太"
        ],
        "correctIndex": 0,
        "explanation": "Comparative modifier following the adjective is 一点儿."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "resultative-complements-wan-hao",
      "title": "Resultative Complements: 完, 好, 到, 懂, 见",
      "level": 2
    },
    "nextRule": {
      "slug": "measure-words-jian-zhang-tiao",
      "title": "Noun Classifiers / Measure Words: 件, 张, 条",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      },
      {
        "slug": "comparative-negation-meiyou",
        "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 没有 + Noun B + (那么 / 这么) + Adjective"
      },
      {
        "slug": "comparative-large-margin-deduo",
        "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective + 得多 / 多了"
      },
      {
        "slug": "equative-comparison-gen-yiyang",
        "title": "Equative Comparison: A 跟 / 和 B 一样 (+ Adjective)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 跟 / 和 + Noun B + 一样 (+ Adjective)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-6-3",
    "slug": "measure-words-jian-zhang-tiao",
    "title": "Noun Classifiers / Measure Words: 件, 张, 条",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Measure Words",
    "pattern": "Numeral / Demonstrative + Measure Word (件 / 张 / 条 / 本) + Noun",
    "explanation": "Every Chinese noun requires a specific classifier (量词, liàngcí) when quantified or paired with demonstratives (这, 那, 哪). 件 (jiàn) classifies clothing and matters; 张 (zhāng) classifies flat objects (paper, tables, beds); 条 (tiáo) classifies long, flexible, slender items (pants, fish, rivers, roads).",
    "structuralVariations": {
      "affirmative": "我买了一件白色的衬衫。 (I bought a white shirt.)",
      "negative": "他一张桌子也没有买。 (He didn't buy a single table.)",
      "question": "这条裤子多少钱？ (How much are these pants?)",
      "notes": "Classifiers must also be used after demonstratives: 这件衣服, 那张票, 哪条路."
    },
    "examples": [
      {
        "zh": "我想买两张去上海的高铁票。",
        "py": "Wǒ xiǎng mǎi liǎng zhāng qù Shànghǎi de gāotiě piào.",
        "en": "I would like to buy two high-speed rail tickets to Shanghai."
      },
      {
        "zh": "这条路上车很多，过马路要小心。",
        "py": "Zhè tiáo lù shang chē hěn duō, guò mǎlù yào xiǎoxīn.",
        "en": "There are many cars on this road; be careful crossing the street."
      },
      {
        "zh": "这件毛衣的颜色非常好看。",
        "py": "Zhè jiàn máoyī de yánsè fēicháng hǎokàn.",
        "en": "The color of this sweater is very beautiful."
      },
      {
        "zh": "客厅里放着一张很大的木桌子。",
        "py": "Kètīng lǐ fàng zhe yì zhāng hěn dà de mù zhuōzi.",
        "en": "A large wooden table is placed in the living room."
      }
    ],
    "commonMistakes": [
      "Using the generic classifier 个 for all nouns in formal HSK tests (while understood colloquially, HSK tests strictly check specific classifiers like 件, 张, 条).",
      "Forgetting the classifier entirely between a numeral and a noun (saying \"三票\" is wrong; must say \"三张票\")."
    ],
    "examStrategy": "In HSK 2 Reading Part 1 matching tasks, the measure word is the quickest clue to identifying the matched noun picture (e.g. 一条鱼 -> fish picture).",
    "parentLessonSlug": "locations-and-asking-directions",
    "quiz": [
      {
        "id": 1,
        "question": "Which measure word is used for pants (裤子) and fish (鱼)?",
        "options": [
          "件",
          "张",
          "条",
          "本"
        ],
        "correctIndex": 2,
        "explanation": "条 (tiáo) is the measure word for long, flexible items like pants, fish, and roads."
      },
      {
        "id": 2,
        "question": "Which measure word is used for flat items like tickets (票), paper (纸), and tables (桌子)?",
        "options": [
          "张",
          "件",
          "条",
          "个"
        ],
        "correctIndex": 0,
        "explanation": "张 (zhāng) is used for flat sheet-like objects and furniture with flat tops."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"服务员，我想看一看这 ( ___ ) 衣服。\"",
        "options": [
          "件",
          "张",
          "条",
          "本"
        ],
        "correctIndex": 0,
        "explanation": "Upper-body clothing and general apparel take 件 (jiàn)."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "comparative-increment-yidianr",
      "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
      "level": 2
    },
    "nextRule": {
      "slug": "directional-preposition-wang",
      "title": "Directional Preposition: 往 + Direction + 走 / 转",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      },
      {
        "slug": "experiential-marker-guo",
        "title": "Experiential Aspect Marker 过 (guo)",
        "level": 2,
        "category": "Aspect Markers",
        "pattern": "Subject + Verb + 过 + Object"
      },
      {
        "slug": "manner-of-travel-zuo-che",
        "title": "Manner of Travel: 坐 / 骑 / 开 + Vehicle + 去",
        "level": 2,
        "category": "Sentence Structure",
        "pattern": "Subject + 坐 / 骑 / 开 + Vehicle + 去 / 到 + Destination"
      },
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "多少",
        "slug": "duoshao",
        "pinyin": "duōshao",
        "meaning": "how many; how much",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-7-1",
    "slug": "directional-preposition-wang",
    "title": "Directional Preposition: 往 + Direction + 走 / 转",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Prepositions",
    "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)",
    "explanation": "往 (wǎng) functions as a directional preposition meaning \"toward / in the direction of\". It is placed before directional words (前, 后, 左, 右, 东, 南, 西, 北) and followed by action verbs of motion.",
    "structuralVariations": {
      "affirmative": "一直往前走，在第一个路口向右拐。 (Walk straight ahead and turn right at the first intersection.)",
      "negative": "别往后看。 (Don't look back.)",
      "question": "请问，去地铁站往哪儿走？ (Excuse me, which way should I go to get to the subway station?)",
      "notes": "往 and 向 are largely interchangeable in direction phrases: 往前走 = 向前走."
    },
    "examples": [
      {
        "zh": "请问，洗手间往哪儿走？",
        "py": "Qǐngwèn, xǐshǒujiān wǎng nǎr zǒu?",
        "en": "Excuse me, which way is the restroom?"
      },
      {
        "zh": "从这里一直往前走五百米就到了。",
        "py": "Cóng zhèlǐ yìzhí wǎng qián zǒu wǔ bǎi mǐ jiù dào le.",
        "en": "From here, walk straight ahead for 500 meters and you will arrive."
      },
      {
        "zh": "到前面的红绿灯往左拐。",
        "py": "Dào qiánmiàn de hónglǜdēng wǎng zuǒ guǎi.",
        "en": "Turn left at the traffic light ahead."
      },
      {
        "zh": "候车室请往右边走。",
        "py": "Hòuchēshì qǐng wǎng yòubiān zǒu.",
        "en": "For the waiting room, please proceed to the right."
      }
    ],
    "commonMistakes": [
      "Placing 往 after the verb (saying \"走往前面\" is an English-order mistake; must say \"往前走\").",
      "Confusing 往 (toward a heading) with 到 (arriving at a destination)."
    ],
    "examStrategy": "In HSK 2 listening direction tasks, listen closely for \"往前走\" (straight ahead) and \"往右拐\" (turn right) to trace paths on maps.",
    "parentLessonSlug": "daily-schedule-and-habits",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"Turn right\" in Chinese?",
        "options": [
          "往右拐",
          "右往拐",
          "拐往右",
          "向右看"
        ],
        "correctIndex": 0,
        "explanation": "往 + Direction (右) + Verb (拐/转) = 往右拐."
      },
      {
        "id": 2,
        "question": "Which preposition precedes directions like 前 (forward) and 左 (left)?",
        "options": [
          "往 / 向",
          "从",
          "离",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "往 (wǎng) or 向 (xiàng) means toward a direction."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"一直 ( ___ ) 前走，医院就在左边。\"",
        "options": [
          "往",
          "离",
          "到",
          "由"
        ],
        "correctIndex": 0,
        "explanation": "往前走 is the standard phrase for walking forward."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "measure-words-jian-zhang-tiao",
      "title": "Noun Classifiers / Measure Words: 件, 张, 条",
      "level": 2
    },
    "nextRule": {
      "slug": "prior-completion-yijing-le",
      "title": "Prior Completion: 已经...了 (Already... completed)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "preposition-gei-dative",
        "title": "Preposition / Dative Construction: 给 + Someone + Verb",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 给 + Recipient + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "看",
        "slug": "kan",
        "pinyin": "kàn",
        "meaning": "to look; to see; to read",
        "level": 1
      },
      {
        "hanzi": "了",
        "slug": "le",
        "pinyin": "le",
        "meaning": "completed action / change of state",
        "level": 1
      },
      {
        "hanzi": "里",
        "slug": "li-inside",
        "pinyin": "lǐ",
        "meaning": "inside; in",
        "level": 1
      },
      {
        "hanzi": "哪",
        "slug": "na-which",
        "pinyin": "nǎ",
        "meaning": "which (followed by measure word)",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-7-2",
    "slug": "prior-completion-yijing-le",
    "title": "Prior Completion: 已经...了 (Already... completed)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Adverbs",
    "pattern": "Subject + 已经 + Verb Phrase / State + 了",
    "explanation": "已经...了 (yǐjīng... le) indicates that an action, milestone, or state has already taken place prior to the present reference point. The sentence-final 了 reinforces the reality of the completed fact.",
    "structuralVariations": {
      "affirmative": "我已经吃过晚饭了。 (I have already eaten dinner.)",
      "negative": "还没有...呢 (Not yet: 我还没有吃饭呢).",
      "question": "你已经买好票了吗？ (Have you already bought the tickets?)",
      "notes": "Can also be used with ages and time: 我已经二十岁了 (I am already 20 years old)."
    },
    "examples": [
      {
        "zh": "现在已经十点了，快去睡觉吧。",
        "py": "Xiànzài yǐjīng shí diǎn le, kuài qù shuìjiào ba.",
        "en": "It is already 10:00; hurry and go to sleep."
      },
      {
        "zh": "这个问题我们已经讨论过了。",
        "py": "Zhè gè wèntí wǒmen yǐjīng tǎolùn guo le.",
        "en": "We have already discussed this problem."
      },
      {
        "zh": "他已经在中国生活了三年了。",
        "py": "Tā yǐjīng zài Zhōngguó shēnghuó le sān nián le.",
        "en": "He has already lived in China for three years."
      },
      {
        "zh": "我已经做好出发的准备了。",
        "py": "Wǒ yǐjīng zuò hǎo chūfā de zhǔnbèi le.",
        "en": "I have already made preparations to depart."
      }
    ],
    "commonMistakes": [
      "Negating 已经 with 不 (saying \"我已经不去了\" means \"I have already decided not to go anymore\"; to say \"not yet\", use 还没...呢, never 不已经).",
      "Forgetting the final 了 when confirming completed status."
    ],
    "examStrategy": "Frequently paired with past aspect marker 过 in listening comprehension: \"我已经去过了\".",
    "parentLessonSlug": "daily-schedule-and-habits",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"I have already finished my homework\"?",
        "options": [
          "我写完了作业。",
          "我已经写完作业了。",
          "我还要写作业。",
          "我写作业已经。"
        ],
        "correctIndex": 1,
        "explanation": "已经 + Verb + 了 expresses prior completion."
      },
      {
        "id": 2,
        "question": "What is the natural negative response when someone asks \"你已经吃完饭了吗？\"?",
        "options": [
          "我已经没吃。",
          "我还没有吃呢。",
          "我不吃了。",
          "我别吃。"
        ],
        "correctIndex": 1,
        "explanation": "The natural negative counterpart for \"already\" is 还没有...呢 (not yet)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"飞机 ( ___ ) 起飞了，你来晚了。\"",
        "options": [
          "已经",
          "还",
          "正在",
          "将要"
        ],
        "correctIndex": 0,
        "explanation": "Completed past fact uses 已经...了."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "directional-preposition-wang",
      "title": "Directional Preposition: 往 + Direction + 走 / 转",
      "level": 2
    },
    "nextRule": {
      "slug": "direction-complements-lai-qu",
      "title": "Simple Direction Complements: Verb + 来 / 去",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "slight-degree-youdianr",
        "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 有点儿 / 有点 + Negative/Unfavorable Adjective"
      },
      {
        "slug": "prompt-marker-jiu-consequence",
        "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Condition / Time Phrase + 就 (jiù) + Verb Phrase"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      },
      {
        "slug": "progressive-depletion-yue-lai-yue-shao",
        "title": "Quantitative Trends: 越来越多 / 越来越少",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject / Noun + 越来越多 / 越来越少 (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "了",
        "slug": "le",
        "pinyin": "le",
        "meaning": "completed action / change of state",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-7-3",
    "slug": "direction-complements-lai-qu",
    "title": "Simple Direction Complements: Verb + 来 / 去",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complements",
    "pattern": "Motion Verb (进, 出, 上, 下, 回, 过) + 来 / 去",
    "explanation": "Simple direction complements indicate the physical trajectory of a motion relative to the speaker's position. Use 来 (lái) if the motion moves TOWARD the speaker; use 去 (qù) if the motion moves AWAY from the speaker.",
    "structuralVariations": {
      "affirmative": "请进来吧！ (Please come in [speaker is inside]).",
      "negative": "他还没有出来。 (He hasn't come out yet.)",
      "question": "你什么时候回来？ (When are you coming back [here]?)",
      "notes": "If there is a place object, it MUST be placed before 来/去: 进教室来 (come into the classroom), 回家去 (go back home)."
    },
    "examples": [
      {
        "zh": "外面太冷了，快进屋里来吧。",
        "py": "Wàimiàn tài lěng le, kuài jìn wū lǐ lái ba.",
        "en": "It's too cold outside; hurry and come into the room (speaker is indoors)."
      },
      {
        "zh": "爸爸下楼去了，一会儿就回来。",
        "py": "Bàba xià lóu qù le, yíhuìr jiù huílái.",
        "en": "Dad went downstairs (away from speaker) and will be back soon."
      },
      {
        "zh": "他从书包里拿出来了一本书。",
        "py": "Tā cóng shūbāo lǐ ná chūlái le yì běn shū.",
        "en": "He took out a book from his backpack."
      },
      {
        "zh": "你什么时候回北京去？",
        "py": "Nǐ shénme shíhou huí Běijīng qù?",
        "en": "When are you going back to Beijing? (speaker is not in Beijing)"
      }
    ],
    "commonMistakes": [
      "Placing location objects after 来/去 (saying \"进来到教室\" is ungrammatical; location objects must be sandwiched: \"进教室来\").",
      "Confusing 来 (toward speaker) and 去 (away from speaker)."
    ],
    "examStrategy": "In HSK 2 listening, pay close attention to whether the speaker says \"回来\" (come back here) or \"回去\" (go back there) to determine where the dialogue is situated.",
    "parentLessonSlug": "daily-schedule-and-habits",
    "quiz": [
      {
        "id": 1,
        "question": "If you are inside a room inviting someone outside to enter, which complement do you use?",
        "options": [
          "进来",
          "进去",
          "出来",
          "出去"
        ],
        "correctIndex": 0,
        "explanation": "The motion moves toward the speaker inside, so use 进来 (come in)."
      },
      {
        "id": 2,
        "question": "Where must a location noun (like 学校) be placed in a direction complement phrase?",
        "options": [
          "After 来/去",
          "Between the motion verb and 来/去 (回学校去)",
          "At the beginning of the sentence only",
          "It cannot be used"
        ],
        "correctIndex": 1,
        "explanation": "Location objects must precede 来/去: Motion Verb + Location + 来/去 (e.g. 回家去)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他在楼上，我上楼 ( ___ ) 找他。\"",
        "options": [
          "去",
          "来",
          "着",
          "了"
        ],
        "correctIndex": 0,
        "explanation": "Speaker is downstairs moving away toward the upstairs, so use 去."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "prior-completion-yijing-le",
      "title": "Prior Completion: 已经...了 (Already... completed)",
      "level": 2
    },
    "nextRule": {
      "slug": "cause-and-effect-yinwei-suoyi",
      "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "action-duration-time-span",
        "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 了 + Time Duration"
      },
      {
        "slug": "descriptive-complement-de",
        "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 得 + Adjective"
      },
      {
        "slug": "resultative-complements-wan-hao",
        "title": "Resultative Complements: 完, 好, 到, 懂, 见",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + Result Complement (完 / 好 / 到 / 懂 / 见) + (Object)"
      },
      {
        "slug": "degree-complement-de-budele",
        "title": "Extreme Degree Complements: 极了 / 得不得了",
        "level": 2,
        "category": "Complements",
        "pattern": "Adjective + 极了 (jíle) / 得不得了 (de bùdéliǎo)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "回",
        "slug": "hui-return",
        "pinyin": "huí",
        "meaning": "to return; to go back",
        "level": 1
      },
      {
        "hanzi": "会",
        "slug": "hui-can",
        "pinyin": "huì",
        "meaning": "can; be able to; will",
        "level": 1
      },
      {
        "hanzi": "来",
        "slug": "lai",
        "pinyin": "lái",
        "meaning": "to come; to arrive",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-8-1",
    "slug": "cause-and-effect-yinwei-suoyi",
    "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complex Sentences",
    "pattern": "因为 + Reason Clause, 所以 + Result Clause",
    "explanation": "因为...所以... (yīnwèi... suǒyǐ...) links a cause or premise to an inevitable consequence or result (\"Because... therefore...\"). Unlike English, standard Chinese commonly retains both conjunctions together.",
    "structuralVariations": {
      "affirmative": "因为今天下大雨，所以我们没有去爬山。 (Because it rained heavily today, we didn't go hiking.)",
      "negative": "因为他没复习，所以考得不好。 (Because he didn't review, he did poorly on the exam.)",
      "question": "你为什么没有来？ (Why didn't you come?)",
      "notes": "In casual conversation, either 因为 or 所以 may occasionally be omitted, but in formal HSK tests they pair together."
    },
    "examples": [
      {
        "zh": "因为路上堵车，所以他迟到了二十分钟。",
        "py": "Yīnwèi lù shang dǔchē, suǒyǐ tā chídào le èrshí fēnzhōng.",
        "en": "Because there was a traffic jam on the road, he was 20 minutes late."
      },
      {
        "zh": "因为汉语很有用，所以很多外国人都在学。",
        "py": "Yīnwèi Hànyǔ hěn yǒuyòng, suǒyǐ hěn duō wàiguó rén dōu zài xué.",
        "en": "Because Chinese is very useful, many foreigners are studying it."
      },
      {
        "zh": "因为身体不舒服，所以我今天请假了。",
        "py": "Yīnwèi shēntǐ bù shūfu, suǒyǐ wǒ jīntiān qǐngjià le.",
        "en": "Because I wasn't feeling well, I took the day off today."
      },
      {
        "zh": "因为这家饭馆的菜很好吃，所以每天都有很多客人。",
        "py": "Yīnwèi zhè jiā fànguǎn de cài hěn hǎochī, suǒyǐ měitiān dōu yǒu hěn duō kèrén.",
        "en": "Because the dishes in this restaurant are delicious, there are many guests every day."
      }
    ],
    "commonMistakes": [
      "Omitting 所以 when translating directly from English thought habits.",
      "Confusing the reason clause with the result clause."
    ],
    "examStrategy": "In HSK 2 Reading Part 3 logic puzzles, questions beginning with \"为什么...\" are directly answered in the text by the clause following 因为.",
    "parentLessonSlug": "dining-out-and-taste",
    "quiz": [
      {
        "id": 1,
        "question": "Which word naturally pairs with 因为 in the result clause?",
        "options": [
          "但是",
          "所以",
          "虽然",
          "而且"
        ],
        "correctIndex": 1,
        "explanation": "因为 pairs with 所以 to form cause-and-effect sentences."
      },
      {
        "id": 2,
        "question": "How do you answer a question that begins with \"为什么\" (why)?",
        "options": [
          "Start the explanation with 因为...",
          "Start with 所以...",
          "Start with 但是...",
          "Start with 虽然..."
        ],
        "correctIndex": 0,
        "explanation": "为什么 (why) prompts an explanation beginning with 因为 (because)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"因为昨晚睡得太晚，( ___ ) 今天早上起不来。\"",
        "options": [
          "所以",
          "但是",
          "还是",
          "如果"
        ],
        "correctIndex": 0,
        "explanation": "Consequence clause uses 所以."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "direction-complements-lai-qu",
      "title": "Simple Direction Complements: Verb + 来 / 去",
      "level": 2
    },
    "nextRule": {
      "slug": "slight-degree-youdianr",
      "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      },
      {
        "slug": "hypothetical-ruguo-jiu",
        "title": "Hypothetical Condition: 如果...就... (If... then...)",
        "level": 3,
        "category": "Complex Sentences",
        "pattern": "如果 + Condition Clause + (的话), Subject + 就 + Consequence Clause"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-8-2",
    "slug": "slight-degree-youdianr",
    "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Adverbs",
    "pattern": "Subject + 有点儿 / 有点 + Negative/Unfavorable Adjective",
    "explanation": "有点儿 (yǒudiǎnr) precedes an adjective to express \"a little bit / slightly\". It typically carries a negative, unfavorable, or dissatisfied nuance (e.g. 有点儿累, 有点儿贵, 有点儿冷).",
    "structuralVariations": {
      "affirmative": "我今天有点儿累，想早点儿休息。 (I am a little tired today; I want to rest early.)",
      "negative": "一点儿也不 (Not at all: 我一点儿也不累).",
      "question": "你是不是有点儿感冒了？ (Do you have a slight cold?)",
      "notes": "Crucial contrast: 有点儿 + Adj (unpleasant attribute before adjective) vs Adj + 一点儿 (comparative modifier after adjective)."
    },
    "examples": [
      {
        "zh": "这件衣服有点儿贵，能便宜一点儿吗？",
        "py": "Zhè jiàn yīfu yǒudiǎnr guì, néng piányi yìdiǎnr ma?",
        "en": "This piece of clothing is a bit expensive; can it be a bit cheaper?"
      },
      {
        "zh": "今天风很大，天气有点儿冷。",
        "py": "Jīntiān fēng hěn dà, tiānqì yǒudiǎnr lěng.",
        "en": "The wind is strong today; the weather is a bit chilly."
      },
      {
        "zh": "这道菜有点儿咸，我想喝水。",
        "py": "Zhè dào cài yǒudiǎnr xián, wǒ xiǎng hē shuǐ.",
        "en": "This dish is a little salty; I want to drink water."
      },
      {
        "zh": "我嗓子有点儿疼，可能感冒了。",
        "py": "Wǒ sǎngzi yǒudiǎnr téng, kěnéng gǎnmào le.",
        "en": "My throat is a bit sore; I might have caught a cold."
      }
    ],
    "commonMistakes": [
      "Using 有点儿 with positive qualities (saying \"我今天有点儿高兴\" sounds odd to native ears; say \"我今天挺高兴的\" or \"很高兴\").",
      "Placing 有点儿 after the adjective (saying \"冷有点儿\" is wrong; must be \"有点儿冷\")."
    ],
    "examStrategy": "Frequently tested in HSK 2 shopping and dining dialogues where customers express mild complaints (有点儿贵 / 有点儿咸).",
    "parentLessonSlug": "dining-out-and-taste",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence correctly uses 有点儿 to express mild dissatisfaction?",
        "options": [
          "这双鞋贵有点儿。",
          "这双鞋有点儿贵。",
          "这双鞋一点儿贵。",
          "这双鞋贵得有点儿。"
        ],
        "correctIndex": 1,
        "explanation": "有点儿 precedes the adjective to express a slight negative attribute."
      },
      {
        "id": 2,
        "question": "What emotional tone does 有点儿 typically convey in everyday speech?",
        "options": [
          "Great enthusiasm and praise",
          "Mild dissatisfaction, discomfort, or complaint",
          "Absolute certainty",
          "Doubt about the future"
        ],
        "correctIndex": 1,
        "explanation": "有点儿 normally conveys mild inconvenience, dissatisfaction, or discomfort."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"今天工作太多，我 ( ___ ) 累。\"",
        "options": [
          "有点儿",
          "一点儿",
          "得多",
          "多了"
        ],
        "correctIndex": 0,
        "explanation": "有点儿 + 累 placed before the adjective."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "cause-and-effect-yinwei-suoyi",
      "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
      "level": 2
    },
    "nextRule": {
      "slug": "degree-complement-de-budele",
      "title": "Extreme Degree Complements: 极了 / 得不得了",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "prior-completion-yijing-le",
        "title": "Prior Completion: 已经...了 (Already... completed)",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 已经 + Verb Phrase / State + 了"
      },
      {
        "slug": "prompt-marker-jiu-consequence",
        "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Condition / Time Phrase + 就 (jiù) + Verb Phrase"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      },
      {
        "slug": "progressive-depletion-yue-lai-yue-shao",
        "title": "Quantitative Trends: 越来越多 / 越来越少",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject / Noun + 越来越多 / 越来越少 (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-8-3",
    "slug": "degree-complement-de-budele",
    "title": "Extreme Degree Complements: 极了 / 得不得了",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complements",
    "pattern": "Adjective + 极了 (jíle) / 得不得了 (de bùdéliǎo)",
    "explanation": "极了 (jíle) and 得不得了 (de bùdéliǎo) follow adjectives as degree complements to express an extreme, superlative state (\"extremely / immensely / to the utmost degree\").",
    "structuralVariations": {
      "affirmative": "这道菜好吃极了！ (This dish is extremely delicious!)",
      "negative": "不常用否定式。",
      "question": "那里好玩吗？ (Is it fun there?)",
      "notes": "极了 directly follows the adjective: Adj + 极了. 得不得了 requires the complement particle 得: Adj + 得不得了."
    },
    "examples": [
      {
        "zh": "听到这个好消息，他高兴极了。",
        "py": "Tīngdào zhè gè hǎo xiāoxi, tā gāoxìng jíle.",
        "en": "Hearing this good news, he was extremely delighted."
      },
      {
        "zh": "今天走了一整天，我累得不得了。",
        "py": "Jīntiān zǒu le yì zhěng tiān, wǒ lèi de bùdéliǎo.",
        "en": "Walking all day today, I was tired beyond belief."
      },
      {
        "zh": "北京的秋天天高气爽，舒服极了。",
        "py": "Běijīng de qiūtiān tiān gāo qì shuǎng, shūfu jíle.",
        "en": "Autumn in Beijing is crisp and comfortable to the utmost."
      },
      {
        "zh": "这个西瓜甜极了，你快尝尝。",
        "py": "Zhè gè xīguā tián jíle, nǐ kuài chángchang.",
        "en": "This watermelon is extremely sweet; hurry and taste it."
      }
    ],
    "commonMistakes": [
      "Placing 极了 before the adjective (saying \"极了好\" is wrong; must say \"好极了\").",
      "Forgetting the complement particle 得 before 不得了 (saying \"累不得了\" is colloquial/broken; standard is \"累得不得了\")."
    ],
    "examStrategy": "In HSK 2 Reading and Listening, \"好极了\" or \"高兴极了\" signals strong emotional approval.",
    "parentLessonSlug": "dining-out-and-taste",
    "quiz": [
      {
        "id": 1,
        "question": "Where is 极了 placed relative to the adjective?",
        "options": [
          "Directly after the adjective (Adj + 极了)",
          "Directly before the adjective",
          "At the start of the sentence",
          "Before the subject"
        ],
        "correctIndex": 0,
        "explanation": "极了 functions as a post-verbal/post-adjectival complement (e.g., 好极了)."
      },
      {
        "id": 2,
        "question": "Which phrase expresses \"extremely tired\"?",
        "options": [
          "累极了",
          "很极累",
          "太累了极",
          "累有一点儿"
        ],
        "correctIndex": 0,
        "explanation": "Adjective (累) + 极了 expresses extreme degree."
      },
      {
        "id": 3,
        "question": "Complete the sentence: \"听到考试通过了，大家高兴 ( ___ ) 了。\"",
        "options": [
          "极",
          "很",
          "最",
          "比"
        ],
        "correctIndex": 0,
        "explanation": "高兴极了 means delighted to the maximum."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "slight-degree-youdianr",
      "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
      "level": 2
    },
    "nextRule": {
      "slug": "comparative-negation-meiyou",
      "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "action-duration-time-span",
        "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 了 + Time Duration"
      },
      {
        "slug": "descriptive-complement-de",
        "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 得 + Adjective"
      },
      {
        "slug": "resultative-complements-wan-hao",
        "title": "Resultative Complements: 完, 好, 到, 懂, 见",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + Result Complement (完 / 好 / 到 / 懂 / 见) + (Object)"
      },
      {
        "slug": "direction-complements-lai-qu",
        "title": "Simple Direction Complements: Verb + 来 / 去",
        "level": 2,
        "category": "Complements",
        "pattern": "Motion Verb (进, 出, 上, 下, 回, 过) + 来 / 去"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "高兴",
        "slug": "gaoxing",
        "pinyin": "gāoxìng",
        "meaning": "happy; pleased",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-9-1",
    "slug": "comparative-negation-meiyou",
    "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Comparisons",
    "pattern": "Noun A + 没有 + Noun B + (那么 / 这么) + Adjective",
    "explanation": "The standard negative form of comparison in Mandarin is A 没有 B + Adjective (\"A is not as [adjective] as B\"). 那么 (nàme) or 这么 (zhème) can be inserted before the adjective for emphasis (\"not quite that...\").",
    "structuralVariations": {
      "affirmative": "弟弟比哥哥高。 (The younger brother is taller than the older brother.)",
      "negative": "哥哥没有弟弟那么高。 (The older brother is not as tall as the younger brother.)",
      "question": "你弟弟有没有你高？ (Is your younger brother as tall as you?)",
      "notes": "Do not use 不比 for standard negative comparison; 不比 means \"no less than\" or \"roughly equal to\", whereas 没有 means \"less than\"."
    },
    "examples": [
      {
        "zh": "今天的气温没有昨天那么低。",
        "py": "Jīntiān de qìwēn méiyǒu zuótiān nàme dī.",
        "en": "Today's temperature is not as low as yesterday's."
      },
      {
        "zh": "骑自行车没有坐地铁快。",
        "py": "Qí zìxíngchē méiyǒu zuò dìtiě kuài.",
        "en": "Riding a bike is not as fast as taking the subway."
      },
      {
        "zh": "我觉得这个手机没有那个好看。",
        "py": "Wǒ juéde zhè gè shǒujī méiyǒu nà gè hǎokàn.",
        "en": "I feel this phone is not as nice-looking as that one."
      },
      {
        "zh": "他没有我想象的那么严肃。",
        "py": "Tā méiyǒu wǒ xiǎngxiàng de nàme yánsù.",
        "en": "He is not as stern as I had imagined."
      }
    ],
    "commonMistakes": [
      "Using 不比 instead of 没有 for straightforward \"not as... as\" comparison.",
      "Using 很 before the adjective in a 没有 comparison sentence (saying \"A 没有 B 很高\" is incorrect)."
    ],
    "examStrategy": "In HSK 2 Reading comprehension, sentences like \"坐火车没有坐飞机快\" are frequently tested in true/false questions.",
    "parentLessonSlug": "making-plans-and-arrangements",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"Today is not as hot as yesterday\" naturally?",
        "options": [
          "今天没有昨天热。",
          "今天不比昨天很热。",
          "今天没有昨天很热。",
          "今天比昨天不热。"
        ],
        "correctIndex": 0,
        "explanation": "A 没有 B + Adjective is the standard formula for \"A is not as Adj as B\"."
      },
      {
        "id": 2,
        "question": "Which word can be inserted before the adjective in A 没有 B comparison for emphasis?",
        "options": [
          "那么 / 这么",
          "很",
          "非常",
          "太"
        ],
        "correctIndex": 0,
        "explanation": "那么 or 这么 can be inserted before the adjective (没有昨天那么热)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"这本小说没有那本 ( ___ ) 有意思。\"",
        "options": [
          "那么",
          "很",
          "十分",
          "极了"
        ],
        "correctIndex": 0,
        "explanation": "没有 pairs with 那么 before adjectives."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "degree-complement-de-budele",
      "title": "Extreme Degree Complements: 极了 / 得不得了",
      "level": 2
    },
    "nextRule": {
      "slug": "comparative-large-margin-deduo",
      "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      },
      {
        "slug": "comparative-increment-yidianr",
        "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Adjective + 一点儿 / 一些 (Slight) OR 得多 / 多了 (Major)"
      },
      {
        "slug": "comparative-large-margin-deduo",
        "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective + 得多 / 多了"
      },
      {
        "slug": "equative-comparison-gen-yiyang",
        "title": "Equative Comparison: A 跟 / 和 B 一样 (+ Adjective)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 跟 / 和 + Noun B + 一样 (+ Adjective)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      },
      {
        "hanzi": "看",
        "slug": "kan",
        "pinyin": "kàn",
        "meaning": "to look; to see; to read",
        "level": 1
      },
      {
        "hanzi": "没有",
        "slug": "meiyou",
        "pinyin": "méiyǒu",
        "meaning": "to not have; there is not",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-9-2",
    "slug": "comparative-large-margin-deduo",
    "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Comparisons",
    "pattern": "Noun A + 比 + Noun B + Adjective + 得多 / 多了",
    "explanation": "When comparing two entities where Entity A exceeds Entity B by a substantial, undeniable margin, append 得多 (de duō) or 多了 (duō le) to the end of the comparative sentence.",
    "structuralVariations": {
      "affirmative": "上海的人口比杭州多得多。 (The population of Shanghai is much larger than Hangzhou.)",
      "negative": "杭州的人口没有上海那么多。 (Hangzhou's population is not as large as Shanghai's.)",
      "question": "坐高铁比坐大巴快得多吗？ (Is high-speed rail much faster than a coach bus?)",
      "notes": "Never use 很 before the adjective in this structure (e.g., *比他很多得多 is invalid)."
    },
    "examples": [
      {
        "zh": "今年学汉语的学生比去年多得多。",
        "py": "Jīnnián xué Hànyǔ de xuésheng bǐ qùnián duō de duō.",
        "en": "The students studying Chinese this year are much more numerous than last year."
      },
      {
        "zh": "换了新眼镜，我现在看得清楚多了。",
        "py": "Huàn le xīn yǎnjìng, wǒ xiànzài kàn de qīngchu duō le.",
        "en": "Having switched to new glasses, I see much more clearly now."
      },
      {
        "zh": "这台新电脑比旧电脑好用得多。",
        "py": "Zhè tái xīn diànnǎo bǐ jiù diànnǎo hǎoyòng de duō.",
        "en": "This new computer is much more user-friendly than the old one."
      },
      {
        "zh": "去南方过冬比留在北方舒服多了。",
        "py": "Qù nánfāng guòdōng bǐ liú zài běifāng shūfu duō le.",
        "en": "Going south for winter is far more comfortable than staying in the north."
      }
    ],
    "commonMistakes": [
      "Placing 得多 before the adjective (saying \"比他得多高\" is wrong; must say \"比他高得多\").",
      "Confusing 得多 with 很多 (很多 is placed before nouns, e.g. 很多人, but comparative margin is always 得多 after the adjective)."
    ],
    "examStrategy": "In HSK 2 Reading Part 2, 得多 and 多了 frequently serve as the correct fill-in for comparative margins.",
    "parentLessonSlug": "making-plans-and-arrangements",
    "quiz": [
      {
        "id": 1,
        "question": "Which of the following phrases expresses \"much taller\"?",
        "options": [
          "高得多",
          "很多高",
          "非常高比",
          "高多很"
        ],
        "correctIndex": 0,
        "explanation": "Adjective + 得多 expresses a large margin of comparison."
      },
      {
        "id": 2,
        "question": "What is the correct word order for comparing with a large margin?",
        "options": [
          "A 比 B + Adj + 得多",
          "A 比 B + 得多 + Adj",
          "A + 得多 + 比 B + Adj",
          "A 比 得多 + B + Adj"
        ],
        "correctIndex": 0,
        "explanation": "Degree modifiers of comparison (得多 / 多了) must follow the adjective."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"今天比昨天冷 ( ___ )。\"",
        "options": [
          "得多",
          "很",
          "非常",
          "太"
        ],
        "correctIndex": 0,
        "explanation": "In 比 sentences, append 得多 after the adjective to express a large difference."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "comparative-negation-meiyou",
      "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
      "level": 2
    },
    "nextRule": {
      "slug": "equative-comparison-gen-yiyang",
      "title": "Equative Comparison: A 跟 / 和 B 一样 (+ Adjective)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      },
      {
        "slug": "comparative-increment-yidianr",
        "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Adjective + 一点儿 / 一些 (Slight) OR 得多 / 多了 (Major)"
      },
      {
        "slug": "comparative-negation-meiyou",
        "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 没有 + Noun B + (那么 / 这么) + Adjective"
      },
      {
        "slug": "equative-comparison-gen-yiyang",
        "title": "Equative Comparison: A 跟 / 和 B 一样 (+ Adjective)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 跟 / 和 + Noun B + 一样 (+ Adjective)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "电脑",
        "slug": "diannao",
        "pinyin": "diànnǎo",
        "meaning": "computer",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-9-3",
    "slug": "equative-comparison-gen-yiyang",
    "title": "Equative Comparison: A 跟 / 和 B 一样 (+ Adjective)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Comparisons",
    "pattern": "Noun A + 跟 / 和 + Noun B + 一样 (+ Adjective)",
    "explanation": "A 跟 B 一样 (A gēn B yíyàng) expresses that Entity A and Entity B are identical or share the same characteristic. When followed by an adjective (e.g. 一样大, 一样高), it indicates equal degree (\"as... as\").",
    "structuralVariations": {
      "affirmative": "我和他一样大。 (He and I are the same age.)",
      "negative": "这件衣服跟那件不一样。 (This piece of clothing is different from that one.)",
      "question": "你买的电脑跟我的一样吗？ (Is the computer you bought the same as mine?)",
      "notes": "To negate, place 不 directly before 一样: A 跟 B 不一样."
    },
    "examples": [
      {
        "zh": "这本词典跟我的一样。",
        "py": "Zhè běn cídiǎn gēn wǒ de yíyàng.",
        "en": "This dictionary is the same as mine."
      },
      {
        "zh": "大卫跑得跟我一样快。",
        "py": "Dàwèi pǎo de gēn wǒ yíyàng kuài.",
        "en": "David runs as fast as I do."
      },
      {
        "zh": "我的爱好跟你的不一样，我更喜欢画画。",
        "py": "Wǒ de àihào gēn nǐ de bù yíyàng, wǒ gèng xǐhuan huàhuà.",
        "en": "My hobby is different from yours; I prefer painting."
      },
      {
        "zh": "今天跟昨天一样冷，出门要多穿点儿衣服。",
        "py": "Jīntiān gēn zuótiān yíyàng lěng, chūmén yào duō chuān diǎnr yīfu.",
        "en": "Today is as cold as yesterday; wear more clothes when going out."
      }
    ],
    "commonMistakes": [
      "Using 比 instead of 跟/和 (saying \"A 比 B 一样\" is wrong; 比 expresses difference, not equality).",
      "Placing 不 before 跟 (saying \"我不跟他一样\" sounds unnatural; standard is \"我跟他不一样\")."
    ],
    "examStrategy": "In HSK 2 reading passages, look for \"跟...一样\" to identify identical attributes between two subjects.",
    "parentLessonSlug": "making-plans-and-arrangements",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"Xiao Wang and I are the same age\"?",
        "options": [
          "我和小王一样大。",
          "我比小王一样大。",
          "我跟小王很大。",
          "我没有小王大。"
        ],
        "correctIndex": 0,
        "explanation": "A 和/跟 B 一样 + Adjective expresses equal degree."
      },
      {
        "id": 2,
        "question": "Where is the negation 不 placed in an equative comparison?",
        "options": [
          "Directly before 一样 (不一样)",
          "Before 跟/和",
          "At the end of the sentence",
          "Before the subject"
        ],
        "correctIndex": 0,
        "explanation": "Negation is attached to 一样: A 跟 B 不一样."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他汉语说得 ( ___ ) 中国人一样好。\"",
        "options": [
          "跟",
          "比",
          "在",
          "从"
        ],
        "correctIndex": 0,
        "explanation": "跟...一样 connects the benchmark to the subject."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "comparative-large-margin-deduo",
      "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
      "level": 2
    },
    "nextRule": {
      "slug": "sequential-actions-xian-ranhou",
      "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      },
      {
        "slug": "comparative-increment-yidianr",
        "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Adjective + 一点儿 / 一些 (Slight) OR 得多 / 多了 (Major)"
      },
      {
        "slug": "comparative-negation-meiyou",
        "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 没有 + Noun B + (那么 / 这么) + Adjective"
      },
      {
        "slug": "comparative-large-margin-deduo",
        "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective + 得多 / 多了"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爱",
        "slug": "ai-love",
        "pinyin": "ài",
        "meaning": "to love; affection",
        "level": 1
      },
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-10-1",
    "slug": "sequential-actions-xian-ranhou",
    "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Complex Sentences",
    "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2",
    "explanation": "先...然后... (xiān... ránhòu...) connects two actions in chronological order (\"first do Action 1, and then do Action 2\"). It is the fundamental discourse connector for explaining instructions, recipes, and daily routines.",
    "structuralVariations": {
      "affirmative": "我们先去图书馆，然后再去吃午饭。 (Let's first go to the library, and then go have lunch.)",
      "negative": "别先做这个。 (Don't do this first.)",
      "question": "我们先做什么？ (What shall we do first?)",
      "notes": "然后 can be substituted with 再 for future sequential actions: 我们先吃饭，再看电影 (Let's eat first, then watch a movie)."
    },
    "examples": [
      {
        "zh": "你先喝杯热水，然后好好睡一觉。",
        "py": "Nǐ xiān hē bēi rè shuǐ, ránhòu hǎohāo shuì yí jiào.",
        "en": "First drink a cup of hot water, and then have a good sleep."
      },
      {
        "zh": "做中国菜要先洗菜，然后切菜。",
        "py": "Zuò Zhōngguó cài yào xiān xǐ cài, ránhòu qiē cài.",
        "en": "To cook Chinese food, you must first wash vegetables, then chop them."
      },
      {
        "zh": "我们先坐地铁到市中心，然后换乘公交车。",
        "py": "Wǒmen xiān zuò dìtiě dào shìzhōngxīn, ránhòu huànchéng gōngjiāochē.",
        "en": "We will first take the subway downtown, and then transfer to a bus."
      },
      {
        "zh": "请大家先安静一下，然后听老师讲规则。",
        "py": "Qǐng dàjiā xiān ānjìng yíxià, ránhòu tīng lǎoshī jiǎng guīzé.",
        "en": "Please be quiet first, and then listen to the teacher explain the rules."
      }
    ],
    "commonMistakes": [
      "Confusing 然后 (then / afterwards) with 以后 (after / in the future). 然后 connects two specific consecutive actions.",
      "Placing 先 after the verb (saying \"我去先\" is wrong; must say \"我先去\")."
    ],
    "examStrategy": "In HSK 2 Writing Part 1 and Listening dialogue tasks, sequential markers provide the key to chronological reconstruction.",
    "parentLessonSlug": "review-and-mock-test-prep",
    "quiz": [
      {
        "id": 1,
        "question": "Which word connects the second action in a chronological sequence after 先?",
        "options": [
          "然后 / 再",
          "但是",
          "因为",
          "虽然"
        ],
        "correctIndex": 0,
        "explanation": "先 (first) pairs with 然后 or 再 (then / afterwards)."
      },
      {
        "id": 2,
        "question": "Where is 先 positioned in the sentence?",
        "options": [
          "Before the first verb phrase",
          "After the first verb phrase",
          "At the very end of the sentence",
          "After the object"
        ],
        "correctIndex": 0,
        "explanation": "先 precedes the verb phrase: Subject + 先 + Verb 1."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"我们 ( ___ ) 买票，然后进电影院。\"",
        "options": [
          "先",
          "后",
          "再",
          "还"
        ],
        "correctIndex": 0,
        "explanation": "The first sequential action is preceded by 先."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "equative-comparison-gen-yiyang",
      "title": "Equative Comparison: A 跟 / 和 B 一样 (+ Adjective)",
      "level": 2
    },
    "nextRule": {
      "slug": "preposition-gei-dative",
      "title": "Preposition / Dative Construction: 给 + Someone + Verb",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "hypothetical-ruguo-jiu",
        "title": "Hypothetical Condition: 如果...就... (If... then...)",
        "level": 3,
        "category": "Complex Sentences",
        "pattern": "如果 + Condition Clause + (的话), Subject + 就 + Consequence Clause"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-10-2",
    "slug": "preposition-gei-dative",
    "title": "Preposition / Dative Construction: 给 + Someone + Verb",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Prepositions",
    "pattern": "Subject + 给 + Recipient + Verb Phrase",
    "explanation": "给 (gěi) functions as a preposition introducing the recipient or beneficiary of an action (\"for / to someone\"). Common pairings include 给...打电话 (call someone), 给...写信 (write a letter to someone), and 给...买礼物 (buy a gift for someone).",
    "structuralVariations": {
      "affirmative": "妈妈每天晚上给我打电话。 (Mom calls me every evening.)",
      "negative": "他没有给我回信息。 (He didn't reply to my message.)",
      "question": "你给老师发电子邮件了吗？ (Did you send an email to the teacher?)",
      "notes": "Contrast with 给 as a main verb: 他给我一本书 (He gave me a book)."
    },
    "examples": [
      {
        "zh": "请你给我介绍一下这位新同事。",
        "py": "Qǐng nǐ gěi wǒ jièshào yíxià zhè wèi xīn tóngshì.",
        "en": "Please introduce this new colleague to me."
      },
      {
        "zh": "今天是爸爸的生日，我给他买了一块手表。",
        "py": "Jīntiān shì bàba de shēngrì, wǒ gěi tā mǎi le yí kuài shǒubiǎo.",
        "en": "Today is Dad's birthday; I bought a watch for him."
      },
      {
        "zh": "别忘了到家后给我发个信息。",
        "py": "Bié wàng le dào jiā hòu gěi wǒ fā gè xìnxī.",
        "en": "Don't forget to send me a text message after arriving home."
      },
      {
        "zh": "医生给病人仔细地检查了身体。",
        "py": "Yīshēng gěi bìngrén zǐxì de jiǎnchá le shēntǐ.",
        "en": "The doctor carefully examined the patient."
      }
    ],
    "commonMistakes": [
      "Placing the prepositional phrase at the end of the sentence like English \"call to me\" (saying \"打电话给我\" is colloquial in southern dialects, but standard HSK testing requires \"给我打电话\").",
      "Confusing 给 (to/for) with 对 (toward)."
    ],
    "examStrategy": "In HSK 2 listening dialogues, \"给...打电话\" is tested in virtually every single exam session.",
    "parentLessonSlug": "review-and-mock-test-prep",
    "quiz": [
      {
        "id": 1,
        "question": "What is the standard preverbal word order for \"call Li Ming\"?",
        "options": [
          "给李明打电话",
          "打电话给李明",
          "在李明打电话",
          "打李明电话给"
        ],
        "correctIndex": 0,
        "explanation": "Subject + 给 + Person + 打电话 is the standard preverbal structure."
      },
      {
        "id": 2,
        "question": "Which preposition introduces the recipient in \"I bought a gift for my mother\"?",
        "options": [
          "给",
          "从",
          "离",
          "往"
        ],
        "correctIndex": 0,
        "explanation": "给 introduces the recipient/beneficiary of an action."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他昨天没 ( ___ ) 我发微信。\"",
        "options": [
          "给",
          "对",
          "在",
          "向"
        ],
        "correctIndex": 0,
        "explanation": "Sending messages to someone uses 给 + Person + 发信息."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "sequential-actions-xian-ranhou",
      "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
      "level": 2
    },
    "nextRule": {
      "slug": "prompt-marker-jiu-consequence",
      "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
      "level": 2
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "打电话",
        "slug": "da-dianhua",
        "pinyin": "dǎ diànhuà",
        "meaning": "to make a telephone call",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "回",
        "slug": "hui-return",
        "pinyin": "huí",
        "meaning": "to return; to go back",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l2-10-3",
    "slug": "prompt-marker-jiu-consequence",
    "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
    "level": 2,
    "cefr": "A2 (Waystage)",
    "category": "Adverbs",
    "pattern": "Condition / Time Phrase + 就 (jiù) + Verb Phrase",
    "explanation": "就 (jiù) is an adverb indicating that an action occurs promptly, smoothly, easily, or immediately as a natural consequence of a preceding condition (\"then / right away / as early as\").",
    "structuralVariations": {
      "affirmative": "喝了药，头就不疼了。 (After taking medicine, the headache went away right away.)",
      "negative": "不吃药病就好不了。 (Without taking medicine, the illness won't get better.)",
      "question": "你下了课就回家吗？ (Are you heading home right after class ends?)",
      "notes": "Contrast with 才 (cái), which indicates delay, difficulty, or lateness: 他八点就来了 (He came as early as 8:00) vs 他九点才来 (He didn't come until 9:00)."
    },
    "examples": [
      {
        "zh": "你往前走两百米就到了。",
        "py": "Nǐ wǎng qián zǒu liǎng bǎi mǐ jiù dào le.",
        "en": "Walk forward 200 meters and you will arrive right away."
      },
      {
        "zh": "做完作业我就去睡觉。",
        "py": "Zuò wán zuòyè wǒ jiù qù shuìjiào.",
        "en": "As soon as I finish homework, I'll go right to sleep."
      },
      {
        "zh": "如果明天下雨，我们就不去公园了。",
        "py": "Rúguǒ míngtiān xiàyǔ, wǒmen jiù bú qù gōngyuán le.",
        "en": "If it rains tomorrow, then we won't go to the park."
      },
      {
        "zh": "他早上六点就起床跑步了。",
        "py": "Tā zǎoshang liù diǎn jiù qǐchuáng pǎobù le.",
        "en": "He got up as early as 6:00 in the morning to run."
      }
    ],
    "commonMistakes": [
      "Confusing 就 (earliness, promptness) with 才 (lateness, requiring great effort).",
      "Placing 就 before the subject (就 must be placed between the subject and the verb)."
    ],
    "examStrategy": "In HSK 2 and 3, 就 is crucial in conditional sentences: \"如果...就...\" and consecutive time events.",
    "parentLessonSlug": "review-and-mock-test-prep",
    "quiz": [
      {
        "id": 1,
        "question": "Which adverb indicates that an event happened promptly or smoothly?",
        "options": [
          "就",
          "才",
          "还",
          "又"
        ],
        "correctIndex": 0,
        "explanation": "就 indicates promptness, immediacy, or ease of an outcome."
      },
      {
        "id": 2,
        "question": "How do 就 and 才 contrast when used with time points?",
        "options": [
          "就 indicates earliness/promptness; 才 indicates lateness/delay",
          "就 indicates future; 才 indicates past",
          "There is no difference",
          "才 indicates certainty; 就 indicates doubt"
        ],
        "correctIndex": 0,
        "explanation": "就 marks early/rapid occurrence; 才 marks late/delayed occurrence."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他吃了早饭 ( ___ ) 出门了。\"",
        "options": [
          "就",
          "才",
          "比",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "Immediate sequence of actions takes 就."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "preposition-gei-dative",
      "title": "Preposition / Dative Construction: 给 + Someone + Verb",
      "level": 2
    },
    "nextRule": {
      "slug": "ba-sentence-structure",
      "title": "The Disposal 把 (bǎ) Sentence Structure",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "prior-completion-yijing-le",
        "title": "Prior Completion: 已经...了 (Already... completed)",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 已经 + Verb Phrase / State + 了"
      },
      {
        "slug": "slight-degree-youdianr",
        "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 有点儿 / 有点 + Negative/Unfavorable Adjective"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      },
      {
        "slug": "progressive-depletion-yue-lai-yue-shao",
        "title": "Quantitative Trends: 越来越多 / 越来越少",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject / Noun + 越来越多 / 越来越少 (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "喝",
        "slug": "he-drink",
        "pinyin": "hē",
        "meaning": "to drink",
        "level": 1
      },
      {
        "hanzi": "回",
        "slug": "hui-return",
        "pinyin": "huí",
        "meaning": "to return; to go back",
        "level": 1
      }
    ]
  },
  {
    "id": "g3-1",
    "slug": "ba-sentence-structure",
    "title": "The Disposal 把 (bǎ) Sentence Structure",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Disposal & Passive",
    "pattern": "Subject + 把 + Definite Object + Action Verb + Other Element",
    "explanation": "The 把 (bǎ) sentence (disposal construction) shifts the object before the verb to emphasize what happens to the object as a result of the action, or how it is disposed of, relocated, or transformed. The verb cannot stand alone; it must be accompanied by an \"other element\" (e.g. resultative complement, directional complement, 了, or reduplication).",
    "structuralVariations": {
      "affirmative": "请把门关上。 (Please close the door.)",
      "negative": "他没有把作业做完。 (He did not finish his homework.)",
      "question": "你把钥匙放在哪儿了？ (Where did you put the keys?)",
      "notes": "The object must be specific or known to both speaker and listener. Negation (没/没有) and modal verbs (想, 能, 应该) must be placed BEFORE 把, never before the main verb."
    },
    "examples": [
      {
        "zh": "请你把窗户打开，房间里有点儿热。",
        "py": "Qǐng nǐ bǎ chuānghu dǎkāi, fángjiān lǐ yǒudiǎnr rè.",
        "en": "Please open the window; it is a bit warm in the room."
      },
      {
        "zh": "我把那本新小说看完了。",
        "py": "Wǒ bǎ nà běn xīn xiǎoshuō kàn wán le.",
        "en": "I finished reading that new novel."
      },
      {
        "zh": "他还没把借的钱还给我。",
        "py": "Tā hái méi bǎ jiè de qián huán gěi wǒ.",
        "en": "He hasn't returned the borrowed money to me yet."
      },
      {
        "zh": "请把护照拿出来给我看一下。",
        "py": "Qǐng bǎ hùzhào ná chūlái gěi wǒ kàn yíxià.",
        "en": "Please take out your passport and let me take a look."
      }
    ],
    "commonMistakes": [
      "Leaving the verb bare with no complement or aspect suffix (e.g., saying \"我把书看\" is strictly ungrammatical; must say \"我把书看了\" or \"我把书看完了\").",
      "Placing negation after 把 (saying \"我把作业没做完\" is a serious error; negation precedes 把: \"我没把作业做完\")."
    ],
    "examStrategy": "把 sentences are tested heavily in HSK 3 Writing Part 1 unscrambling questions. Remember the rigid order: Subject + (Modal/Negation) + 把 + Object + Verb + Complement/了.",
    "parentLessonSlug": "hsk3-writing-section",
    "quiz": [
      {
        "id": 1,
        "question": "Which of the following sentences has the correct 把 word order?",
        "options": [
          "我没把手机忘在出租车上。",
          "我把手机没忘在出租车上。",
          "我把手机忘出租车上没。",
          "没我把手机忘在出租车上。"
        ],
        "correctIndex": 0,
        "explanation": "Negation words like 没 / 没有 must precede 把."
      },
      {
        "id": 2,
        "question": "Why is \"他把苹果吃\" considered incorrect in Chinese?",
        "options": [
          "苹果 cannot take 把",
          "把 verbs cannot stand alone; they require a result, directional complement, or 了",
          "吃 must be placed before 把",
          "The sentence requires two subjects"
        ],
        "correctIndex": 1,
        "explanation": "In 把 constructions, the verb must be followed by an \"other element\" (result, direction, aspect suffix)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"请你 ( ___ ) 这份文件交给经理。\"",
        "options": [
          "把",
          "被",
          "比",
          "向"
        ],
        "correctIndex": 0,
        "explanation": "The disposal construction shifting the definite object 这份文件 before 交 requires 把."
      }
    ],
    "parentLessonTitle": "HSK 3 Writing Mastery: Syntax & Characters (书写专攻与句型重组)",
    "prevRule": {
      "slug": "prompt-marker-jiu-consequence",
      "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
      "level": 2
    },
    "nextRule": {
      "slug": "yue-lai-yue",
      "title": "Progressive Increments: 越来越... (yuè lái yuè)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "ba-with-relocation-dao-zai",
        "title": "Disposal 把 with Directional Relocation: 把 + Object + 放到 / 带到...",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Object + Verb (放 / 搬 / 拿 / 带) + 到 / 在 + Location"
      },
      {
        "slug": "ba-with-resolution-jiejue",
        "title": "Disposal 把 with Resultative Resolution: 把 + Problem + 解决 / 做好",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Task / Problem + Verb + 好 / 完 / 解决 (Resolution)"
      },
      {
        "slug": "passive-bei-structure",
        "title": "The Passive Voice Structure: 被 (bèi) Sentence",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Receiver of Action + 被 + (Agent / Doer) + Verb + Other Element"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "开",
        "slug": "kai",
        "pinyin": "kāi",
        "meaning": "to open; to drive",
        "level": 1
      },
      {
        "hanzi": "看",
        "slug": "kan",
        "pinyin": "kàn",
        "meaning": "to look; to see; to read",
        "level": 1
      },
      {
        "hanzi": "来",
        "slug": "lai",
        "pinyin": "lái",
        "meaning": "to come; to arrive",
        "level": 1
      }
    ]
  },
  {
    "id": "g3-2",
    "slug": "yue-lai-yue",
    "title": "Progressive Increments: 越来越... (yuè lái yuè)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Adverbs",
    "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)",
    "explanation": "越来越... (yuè lái yuè...) expresses continuous, progressive escalation over time (\"more and more... / increasingly...\"). Because 越来越 already carries degree modification, degree adverbs like 很, 非常, or 十分 must NOT be added.",
    "structuralVariations": {
      "affirmative": "天气越来越暖和了。 (The weather is getting warmer and warmer.)",
      "negative": "身体越来越不好了。 (Health is getting worse and worse [progressively poorer]).",
      "question": "你的汉语水平是不是越来越高了？ (Is your Chinese proficiency getting higher and higher?)",
      "notes": "Can also modify mental state verbs: 越来越喜欢, 越来越想家, 越来越了解."
    },
    "examples": [
      {
        "zh": "现在学习汉语的外国人越来越多了。",
        "py": "Xiànzài xuéxí Hànyǔ de wàiguó rén yuè lái yuè duō le.",
        "en": "Now foreigners studying Chinese are getting more and more numerous."
      },
      {
        "zh": "随着春天的到来，天气越来越暖和了。",
        "py": "Suízhe chūntiān de dàolái, tiānqì yuè lái yuè nuǎnhuo le.",
        "en": "With the arrival of spring, the weather is getting warmer and warmer."
      },
      {
        "zh": "在中国生活了半年，他越来越喜欢中国文化了。",
        "py": "Zài Zhōngguó shēnghuó le bàn nián, tā yuè lái yuè xǐhuan Zhōngguó wénhuà le.",
        "en": "Living in China for half a year, he likes Chinese culture more and more."
      },
      {
        "zh": "时间过得真快，孩子们越来越懂事了。",
        "py": "Shíjiān guò de zhēn kuài, háizimen yuè lái yuè dǒngshì le.",
        "en": "Time flies so fast; the children are becoming more and more sensible."
      }
    ],
    "commonMistakes": [
      "Adding 很 or 非常 after 越来越 (saying \"越来越很高\" is wrong; say \"越来越高\").",
      "Confusing 越来越... (gradual change over time) with 越...越... (correlation between two conditions)."
    ],
    "examStrategy": "In HSK 3 Reading Section, look for 越来越 in passages discussing trends, technology, or language improvement.",
    "parentLessonSlug": "city-life-and-renting",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence is grammatically correct?",
        "options": [
          "他的汉语越来越很流利。",
          "他的汉语越来越流利。",
          "他的汉语很越来越流利。",
          "他的汉语越来越最流利。"
        ],
        "correctIndex": 1,
        "explanation": "越来越 already contains superlative degree; degree adverbs like 很 or 最 must be omitted."
      },
      {
        "id": 2,
        "question": "Can 越来越 precede psychological/mental verbs like 喜欢 or 了解?",
        "options": [
          "Yes, e.g. 越来越喜欢",
          "No, only bare physical adjectives",
          "Only with negative verbs",
          "Only in classical poetry"
        ],
        "correctIndex": 0,
        "explanation": "越来越 naturally modifies mental state verbs: 越来越喜欢, 越来越想."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"城市的空气 ( ___ ) 好了。\"",
        "options": [
          "越来越",
          "很多",
          "非常",
          "一点儿"
        ],
        "correctIndex": 0,
        "explanation": "Continuous gradual improvement uses 越来越."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "ba-sentence-structure",
      "title": "The Disposal 把 (bǎ) Sentence Structure",
      "level": 3
    },
    "nextRule": {
      "slug": "hypothetical-ruguo-jiu",
      "title": "Hypothetical Condition: 如果...就... (If... then...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "prior-completion-yijing-le",
        "title": "Prior Completion: 已经...了 (Already... completed)",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 已经 + Verb Phrase / State + 了"
      },
      {
        "slug": "slight-degree-youdianr",
        "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 有点儿 / 有点 + Negative/Unfavorable Adjective"
      },
      {
        "slug": "prompt-marker-jiu-consequence",
        "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Condition / Time Phrase + 就 (jiù) + Verb Phrase"
      },
      {
        "slug": "progressive-depletion-yue-lai-yue-shao",
        "title": "Quantitative Trends: 越来越多 / 越来越少",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject / Noun + 越来越多 / 越来越少 (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "和",
        "slug": "he-and",
        "pinyin": "hé",
        "meaning": "and; with",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-1-1",
    "slug": "hypothetical-ruguo-jiu",
    "title": "Hypothetical Condition: 如果...就... (If... then...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Complex Sentences",
    "pattern": "如果 + Condition Clause + (的话), Subject + 就 + Consequence Clause",
    "explanation": "如果...就... (rúguǒ... jiù...) sets up a hypothetical premise or condition (\"if... then...\"). 的话 (de huà) may be optionally appended to the end of the conditional clause to reinforce the hypothesis.",
    "structuralVariations": {
      "affirmative": "如果明天下雨，我们就在家看电影。 (If it rains tomorrow, then we'll stay home and watch movies.)",
      "negative": "如果你不去，我也不去了。 (If you don't go, I won't go either.)",
      "question": "如果遇到困难，你打算怎么办？ (If you encounter difficulties, what do you plan to do?)",
      "notes": "如果 can be placed before or after the subject of the conditional clause: 如果你来 / 你如果来."
    },
    "examples": [
      {
        "zh": "如果有不懂的地方，你可以随时来问我。",
        "py": "Rúguǒ yǒu bù dǒng de dìfang, nǐ kěyǐ suíshí lái wèn wǒ.",
        "en": "If there is anywhere you don't understand, you can ask me anytime."
      },
      {
        "zh": "如果周末有空的话，我们一起去爬山吧。",
        "py": "Rúguǒ zhōumò yǒu kòng de huà, wǒmen yìqǐ qù páshān ba.",
        "en": "If you are free this weekend, let's go mountain climbing together."
      },
      {
        "zh": "如果你想学好汉语，就必须每天坚持练习。",
        "py": "Rúguǒ nǐ xiǎng xué hǎo Hànyǔ, jiù bìxū měitiān jiānchí liànxí.",
        "en": "If you want to master Chinese, you must persist in practicing every day."
      },
      {
        "zh": "如果错过了这班高铁，我们就要等到明天早上了。",
        "py": "Rúguǒ cuòguò le zhè bān gāotiě, wǒmen jiù yào děng dào míngtiān zǎoshang le.",
        "en": "If we miss this high-speed train, we will have to wait until tomorrow morning."
      }
    ],
    "commonMistakes": [
      "Placing 就 before the subject of the consequence clause (saying \"如果下雨，就不我们去\" is wrong; 就 belongs between subject and verb: \"我们就不去\").",
      "Confusing 如果...就... (hypothetical) with 只要...就... (sufficient condition)."
    ],
    "examStrategy": "In HSK 3 reading logic questions, seeing 如果 in clause A immediately prompts you to look for 就 in clause B.",
    "parentLessonSlug": "travel-planning-and-tourism",
    "quiz": [
      {
        "id": 1,
        "question": "Which adverb introduces the consequence clause when paired with 如果?",
        "options": [
          "就",
          "才",
          "也",
          "还"
        ],
        "correctIndex": 0,
        "explanation": "如果 (if) pairs with 就 (then) in hypothetical sentences."
      },
      {
        "id": 2,
        "question": "What colloquial phrase can be appended to the conditional clause after 如果?",
        "options": [
          "的话",
          "的时候",
          "了以后",
          "的时候儿"
        ],
        "correctIndex": 0,
        "explanation": "如果...的话 softens and reinforces the hypothetical condition."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"如果明天的航班取消了，我们 ( ___ ) 只能坐火车了。\"",
        "options": [
          "就",
          "才",
          "却",
          "并"
        ],
        "correctIndex": 0,
        "explanation": "Consequence of a conditional premise is introduced by 就."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "yue-lai-yue",
      "title": "Progressive Increments: 越来越... (yuè lái yuè)",
      "level": 3
    },
    "nextRule": {
      "slug": "proportional-yue-yue",
      "title": "Proportional Correlation: 越...越... (The more... the more...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "电影",
        "slug": "dianying",
        "pinyin": "diànyǐng",
        "meaning": "movie; film",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-1-2",
    "slug": "proportional-yue-yue",
    "title": "Proportional Correlation: 越...越... (The more... the more...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Complex Sentences",
    "pattern": "Subject + 越 + Verb / Adj A + 越 + Verb / Adj B",
    "explanation": "越...越... (yuè... yuè...) expresses that the degree of B changes proportionately in tandem with the progression of A (\"the more A, the more B\"). The two clauses can share the same subject or have different subjects.",
    "structuralVariations": {
      "affirmative": "这本书越看越有意思。 (The more I read this book, the more interesting it gets.)",
      "negative": "雪越下越大，不能开车了。 (The snow is falling harder and harder; we can't drive.)",
      "question": "是不是雨下得越大，风越冷？ (Is it true that the harder the rain falls, the colder the wind?)",
      "notes": "Contrast with 越来越: 越来越 + single attribute (only one variable changing over time)."
    },
    "examples": [
      {
        "zh": "雨越下越大，街上的行人都撑起了雨伞。",
        "py": "Yǔ yuè xià yuè dà, jiē shang de xíngrén dōu chēng qǐ le yǔsǎn.",
        "en": "The rain fell heavier and heavier; pedestrians on the street all put up umbrellas."
      },
      {
        "zh": "这首中国古诗越读越有味道。",
        "py": "Zhè shǒu Zhōngguó gǔshī yuè dú yuè yǒu wèidao.",
        "en": "The more you read this classical Chinese poem, the more profound it feels."
      },
      {
        "zh": "你爬得越高，看到的景色就越壮观。",
        "py": "Nǐ pá de yuè gāo, kàndào de jǐngsè jiù yuè zhuàngguān.",
        "en": "The higher you climb, the more magnificent the scenery you see."
      },
      {
        "zh": "面对困难，我们要越挫越勇。",
        "py": "Miànduì kùnnan, wǒmen yào yuè cuò yuè yǒng.",
        "en": "In the face of hardships, the more setbacks we meet, the braver we must become."
      }
    ],
    "commonMistakes": [
      "Mixing up 越...越... (two correlating variables) with 越来越... (one variable over time).",
      "Placing 越 after the verb (saying \"看越有意思\" is wrong; must say \"越看越有意思\")."
    ],
    "examStrategy": "In HSK 3 sentence rearrangement, pair the two 越 clauses: 越 + Verb 1 + 越 + Verb/Adj 2.",
    "parentLessonSlug": "travel-planning-and-tourism",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"The more you study, the smarter you become\"?",
        "options": [
          "你越学越聪明。",
          "你越来越学聪明。",
          "你学得越很聪明。",
          "你越学聪明越。"
        ],
        "correctIndex": 0,
        "explanation": "越 + Verb (学) + 越 + Adj (聪明) forms the proportional correlation."
      },
      {
        "id": 2,
        "question": "What is the grammatical distinction between 越来越 and 越...越...?",
        "options": [
          "越来越 modifies one quality over time; 越...越... links two interconnected variables",
          "They are 100% interchangeable",
          "越...越... is only for weather",
          "越来越 is only past tense"
        ],
        "correctIndex": 0,
        "explanation": "越来越 is for single gradual change; 越...越... links two dependent clauses/conditions."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"中国菜 ( ___ ) 吃 ( ___ ) 好吃。\"",
        "options": [
          "越...越...",
          "又...又...",
          "也...也...",
          "从...到..."
        ],
        "correctIndex": 0,
        "explanation": "越吃越好吃 expresses increasing enjoyment the more one eats."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "hypothetical-ruguo-jiu",
      "title": "Hypothetical Condition: 如果...就... (If... then...)",
      "level": 3
    },
    "nextRule": {
      "slug": "intention-verb-dasan",
      "title": "Expressing Future Plans & Intentions: 打算 + Verb",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "读",
        "slug": "du",
        "pinyin": "dú",
        "meaning": "to read; to study",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-1-3",
    "slug": "intention-verb-dasan",
    "title": "Expressing Future Plans & Intentions: 打算 + Verb",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Modal Verbs",
    "pattern": "Subject + 打算 (dǎsuan) + Verb Phrase",
    "explanation": "打算 (dǎsuan) functions as an intentional auxiliary verb or noun meaning \"to plan to / to intend to / plans\". It describes contemplated future actions that have been thought through but not yet finalized.",
    "structuralVariations": {
      "affirmative": "我毕业后打算去北京工作。 (After graduating, I plan to work in Beijing.)",
      "negative": "我还没打算买车。 (I don't plan on buying a car yet.)",
      "question": "你假期有什么打算？ / 你打算去哪儿旅游？ (What are your holiday plans? / Where do you plan to travel?)",
      "notes": "Can be used as a noun: 有什么打算 (what plans do you have)."
    },
    "examples": [
      {
        "zh": "下个周末我们打算去故宫参观。",
        "py": "Xià gè zhōumò wǒmen dǎsuan qù Gùgōng cānguān.",
        "en": "Next weekend we plan to visit the Forbidden City."
      },
      {
        "zh": "他打算今年秋天考HSK四级。",
        "py": "Tā dǎsuan jīnnián qiūtiān kǎo HSK sì jí.",
        "en": "He plans to take the HSK Level 4 exam this autumn."
      },
      {
        "zh": "你大学毕业以后打算做什么工作？",
        "py": "Nǐ dàxué bìyè yǐhòu dǎsuan zuò shénme gōngzuò?",
        "en": "What kind of work do you plan to do after graduating from college?"
      },
      {
        "zh": "我本来打算买那台笔记本电脑，但现在降价了我想再等等。",
        "py": "Wǒ běnlái dǎsuan mǎi nà tái bǐjìběn diànnǎo, dàn xiànzài jiàngjià le wǒ xiǎng zài děngdeng.",
        "en": "I originally planned to buy that laptop, but now that prices dropped I want to wait a bit longer."
      }
    ],
    "commonMistakes": [
      "Confusing 打算 (plan/intention) with 准备 (prepare/get ready physically).",
      "Using 打算 for immediate spontaneous actions happening right this second (use 要 or 想 instead)."
    ],
    "examStrategy": "In HSK 3 listening dialogues about holidays and career choices, \"你打算...？\" is standard for asking about the speaker's next steps.",
    "parentLessonSlug": "travel-planning-and-tourism",
    "quiz": [
      {
        "id": 1,
        "question": "Which word best expresses considered future intentions (\"plan to\")?",
        "options": [
          "打算",
          "必须",
          "愿意",
          "应该"
        ],
        "correctIndex": 0,
        "explanation": "打算 expresses personal plans or intentions."
      },
      {
        "id": 2,
        "question": "Can 打算 also function as a noun meaning \"plans\"?",
        "options": [
          "Yes, e.g. \"你有什么打算？\"",
          "No, strictly an action verb",
          "Only in negative sentences",
          "Only in writing"
        ],
        "correctIndex": 0,
        "explanation": "打算 serves as both a verb (\"to plan\") and a noun (\"plans\")."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"放暑假的时候，你 ( ___ ) 去哪儿？\"",
        "options": [
          "打算",
          "以为",
          "根据",
          "关于"
        ],
        "correctIndex": 0,
        "explanation": "Inquiring about summer vacation plans uses 打算."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "proportional-yue-yue",
      "title": "Proportional Correlation: 越...越... (The more... the more...)",
      "level": 3
    },
    "nextRule": {
      "slug": "compound-linkage-bujin-erqie",
      "title": "Compound Progression Linkage: 不仅...而且... (Not only... but also...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "necessity-dei-yao",
        "title": "Expressing Obligation & Necessity: 得 / 要",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 得 (děi) / 要 + Verb Phrase"
      },
      {
        "slug": "ability-vs-permission-neng-keyi",
        "title": "Modal Auxiliaries: 能 (nēng) vs 可以 (kěyǐ)",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 能 / 可以 / 会 + Verb Phrase"
      },
      {
        "slug": "willingness-modal-yuanyi",
        "title": "Willingness & Volition: 愿意 + Verb (Willing to...)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 愿意 (yuànyì) + Verb Phrase"
      },
      {
        "slug": "strict-obligation-bixu",
        "title": "Strict Imperative Obligation: 必须 + Verb (Must / Mandatory)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 必须 (bìxū) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "电脑",
        "slug": "diannao",
        "pinyin": "diànnǎo",
        "meaning": "computer",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "工作",
        "slug": "gongzuo",
        "pinyin": "gōngzuò",
        "meaning": "work; job; to work",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-2-1",
    "slug": "compound-linkage-bujin-erqie",
    "title": "Compound Progression Linkage: 不仅...而且... (Not only... but also...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Complex Sentences",
    "pattern": "Subject + 不仅 / 不但 + Feature A, 而且 / 还 + Feature B",
    "explanation": "不仅...而且... (bùjǐn... érqiě...) expresses an escalating progression (\"not only... but furthermore...\"). If both clauses share the same subject, the subject precedes 不仅. If the two clauses have different subjects, 不仅 must precede the first subject.",
    "structuralVariations": {
      "affirmative": "他不仅会说汉语，而且还会写汉字。 (He can not only speak Chinese, but also write characters.)",
      "negative": "这道菜不仅不贵，而且味道非常好。 (This dish is not only inexpensive, but also tastes delicious.)",
      "question": "他是不是不仅通过了考试，而且还拿了第一名？ (Did he not only pass the exam, but also win first place?)",
      "notes": "Different subjects rule: 不仅老师喜欢他，而且同学们也喜欢他 (Not only do teachers like him, but classmates like him too)."
    },
    "examples": [
      {
        "zh": "这座城市不仅环境优美，而且交通非常便利。",
        "py": "Zhè zuò chéngshì bùjǐn huánjìng yōuměi, érqiě jiāotōng fēicháng biànlì.",
        "en": "This city is not only beautiful in environment, but also extremely convenient in transportation."
      },
      {
        "zh": "跑步不仅可以强身健体，而且能让人心情愉快。",
        "py": "Pǎobù bùjǐn kěyǐ qiángshēn jiàntǐ, érqiě néng ràng rén xīnqíng yúkuài.",
        "en": "Running can not only strengthen the body, but also make one feel cheerful."
      },
      {
        "zh": "他不仅学习成绩优秀，而且乐于帮助别人。",
        "py": "Tā bùjǐn xuéxí chéngjì yōuxiù, érqiě lèyú bāngzhù biérén.",
        "en": "He not only has outstanding academic grades, but is also eager to help others."
      },
      {
        "zh": "这间公寓不仅采光好，而且房租很合理。",
        "py": "Zhè jiān gōngyù bùjǐn cǎiguāng hǎo, érqiě fángzū hěn hélǐ.",
        "en": "This apartment not only has great sunlight, but the rent is also very reasonable."
      }
    ],
    "commonMistakes": [
      "Misplacing the subject when the two clauses have different subjects (saying \"老师不仅...而且同学...\" is wrong; must say \"不仅老师...而且同学...\").",
      "Confusing 不仅...而且 (progressive addition) with 虽然...但是 (concession/adversative)."
    ],
    "examStrategy": "In HSK 3 Reading Section 2 text cohesion questions, 不仅 in the first sentence is guaranteed to pair with 而且 or 还 in the second sentence.",
    "parentLessonSlug": "city-life-and-renting",
    "quiz": [
      {
        "id": 1,
        "question": "Which connector naturally pairs with 不仅 in the subsequent clause?",
        "options": [
          "而且 / 还",
          "但是",
          "所以",
          "虽然"
        ],
        "correctIndex": 0,
        "explanation": "不仅 (not only) pairs with 而且 / 还 (but also)."
      },
      {
        "id": 2,
        "question": "Where is 不仅 placed when two clauses have DIFFERENT subjects?",
        "options": [
          "Before the first subject",
          "After the first subject",
          "At the very end of the paragraph",
          "Between verb and object"
        ],
        "correctIndex": 0,
        "explanation": "When subjects differ, correlative conjunctions precede the subjects (不仅 A... 而且 B...)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他不仅会游泳，( ___ ) 游得非常快。\"",
        "options": [
          "而且",
          "但是",
          "如果",
          "或者"
        ],
        "correctIndex": 0,
        "explanation": "Progressive coordination uses 而且."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "intention-verb-dasan",
      "title": "Expressing Future Plans & Intentions: 打算 + Verb",
      "level": 3
    },
    "nextRule": {
      "slug": "stated-perspective-renwei",
      "title": "Expressing Perspective: 认为 (rènwéi) vs 觉得 (juéde)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      },
      {
        "hanzi": "会",
        "slug": "hui-can",
        "pinyin": "huì",
        "meaning": "can; be able to; will",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-2-2",
    "slug": "stated-perspective-renwei",
    "title": "Expressing Perspective: 认为 (rènwéi) vs 觉得 (juéde)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Sentence Structure",
    "pattern": "Subject + 认为 / 觉得 + Statement / Clause",
    "explanation": "认为 (rènwéi) expresses a formal, considered viewpoint, stance, or logical conclusion (\"to deem / hold the opinion that\"). 觉得 (juéde) is conversational and expresses intuitive personal feelings or sensory impressions (\"feel that / think that\").",
    "structuralVariations": {
      "affirmative": "我认为这个方案更适合我们的实际情况。 (I consider this proposal more suitable for our actual situation.)",
      "negative": "我们认为这种做法不合适。 (We consider this approach unsuitable.)",
      "question": "你认为我们应该怎么解决这个问题？ (How do you think we should solve this issue?)",
      "notes": "认为 carries an intellectual, objective, or formal connotation; 觉得 expresses emotional or physical feelings (e.g. 我觉得冷, cannot say *我认为冷)."
    },
    "examples": [
      {
        "zh": "大家一致认为，他是最合适的人选。",
        "py": "Dàjiā yízhì rènwéi, tā shì zuì héshì de rénxuǎn.",
        "en": "Everyone unanimously considers that he is the most suitable candidate."
      },
      {
        "zh": "我认为保持良好的生活习惯是健康的关键。",
        "py": "Wǒ rènwéi bǎochí liánghǎo de shēnghuó xíguàn shì jiànkāng de guānjiàn.",
        "en": "I consider that maintaining good lifestyle habits is the key to good health."
      },
      {
        "zh": "老师认为，多读多写是提高写作水平最好的方法。",
        "py": "Lǎoshī rènwéi, duō dú duō xiě shì tígāo xiězuò shuǐpíng zuì hǎo de fāngfǎ.",
        "en": "The teacher believes that reading and writing more is the best way to improve composition skills."
      },
      {
        "zh": "你觉得这篇文章写得怎么样？",
        "py": "Nǐ juéde zhè piān wénzhāng xiě de zěnmeyàng?",
        "en": "How do you feel this article was written?"
      }
    ],
    "commonMistakes": [
      "Using 认为 for physical sensory sensations (e.g. saying \"我认为很累\" is completely wrong; use \"我觉得很累\").",
      "Confusing 以为 (falsely assumed: \"I mistakenly thought\") with 认为 (genuine considered opinion)."
    ],
    "examStrategy": "In HSK 3 reading comprehension questions starting with \"作者认为...\" (What does the author believe?), look for the paragraph containing 认为 to locate the thesis.",
    "parentLessonSlug": "city-life-and-renting",
    "quiz": [
      {
        "id": 1,
        "question": "Which verb is appropriate for physical sensations like feeling cold or tired?",
        "options": [
          "觉得",
          "认为",
          "以为",
          "打算"
        ],
        "correctIndex": 0,
        "explanation": "Physical sensations use 觉得 (我觉得冷), not 认为."
      },
      {
        "id": 2,
        "question": "What nuance distinguishes 认为 from 觉得?",
        "options": [
          "认为 is more formal, logical, and reasoned",
          "认为 is only for negative statements",
          "There is no difference",
          "觉得 is only used by children"
        ],
        "correctIndex": 0,
        "explanation": "认为 implies a formal, well-considered intellectual judgement."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"专家 ( ___ )，充足的睡眠对青少年非常重要。\"",
        "options": [
          "认为",
          "以为",
          "觉得得",
          "好像"
        ],
        "correctIndex": 0,
        "explanation": "Formal authoritative opinions take 认为."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "compound-linkage-bujin-erqie",
      "title": "Compound Progression Linkage: 不仅...而且... (Not only... but also...)",
      "level": 3
    },
    "nextRule": {
      "slug": "interest-structure-dui-ganxingqu",
      "title": "Expressing Interest: 对...感兴趣 / 有兴趣",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "读",
        "slug": "du",
        "pinyin": "dú",
        "meaning": "to read; to study",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-2-3",
    "slug": "interest-structure-dui-ganxingqu",
    "title": "Expressing Interest: 对...感兴趣 / 有兴趣",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Prepositions",
    "pattern": "Subject + 对 + Topic / Activity + 感兴趣 (gǎn xìngqù) / 有兴趣",
    "explanation": "The structure 对...感兴趣 (duì... gǎn xìngqù) is the standard formula to express being interested in a subject, hobby, or domain. Degree adverbs like 很, 非常, or 不 must be placed directly before 感兴趣 or 有兴趣, never before 对.",
    "structuralVariations": {
      "affirmative": "他对中国历史非常感兴趣。 (He is very interested in Chinese history.)",
      "negative": "我对踢足球不感兴趣。 / 我对玩游戏没有兴趣。 (I am not interested in soccer / gaming.)",
      "question": "你对中国书法感兴趣吗？ (Are you interested in Chinese calligraphy?)",
      "notes": "Can also take degree modifiers: 对...很感兴趣, 对...一点儿兴趣也没有."
    },
    "examples": [
      {
        "zh": "从小时候开始，他就对音乐产生了浓厚的兴趣。",
        "py": "Cóng xiǎoshíhou kāishǐ, tā jiù duì yīnyuè chǎnshēng le nónghòu de xìngqù.",
        "en": "Since childhood, he has developed a deep interest in music."
      },
      {
        "zh": "大卫对中国功夫很感兴趣，想找一位师傅学太极。",
        "py": "Dàwèi duì Zhōngguó gōngfu hěn gǎn xìngqù, xiǎng zhǎo yí wèi shīfu xué tàijí.",
        "en": "David is very interested in Chinese kung fu and wants to find a master to learn Tai Chi."
      },
      {
        "zh": "许多外国留学生都对中国传统节日深感兴趣。",
        "py": "Xǔduō wàiguó liúxuéshēng dōu duì Zhōngguó chuántǒng jiérì shēn gǎn xìngqù.",
        "en": "Many foreign exchange students are deeply interested in traditional Chinese festivals."
      },
      {
        "zh": "如果你对这个工作岗位感兴趣，请把简历发到我们的邮箱。",
        "py": "Rúguǒ nǐ duì zhè gè gōngzuò gǎngwèi gǎn xìngqù, qǐng bǎ jiǎnlì fā dào wǒmen de yóuxiāng.",
        "en": "If you are interested in this job position, please send your resume to our email inbox."
      }
    ],
    "commonMistakes": [
      "Placing 很 before 对 (saying \"我很对历史感兴趣\" is ungrammatical; must say \"我对历史很感兴趣\").",
      "Omitting 对 (saying \"我感兴趣历史\" is a direct English-translation error; Chinese requires the preposition 对)."
    ],
    "examStrategy": "In HSK 3 Writing Part 1 sentence ordering, identify 对 + Noun + (很) + 感兴趣 as a single cohesive unit.",
    "parentLessonSlug": "city-life-and-renting",
    "quiz": [
      {
        "id": 1,
        "question": "Which is the grammatically correct word order for expressing interest?",
        "options": [
          "我对京剧很感兴趣。",
          "我很对京剧感兴趣。",
          "我感兴趣对京剧很。",
          "京剧对我很感兴趣。"
        ],
        "correctIndex": 0,
        "explanation": "Subject + 对 + Topic + Degree + 感兴趣."
      },
      {
        "id": 2,
        "question": "How do you say \"I am not interested in this matter at all\"?",
        "options": [
          "我对这件事一点儿兴趣也没有。",
          "我不感兴趣对这件事一点儿。",
          "这件事一点儿不我感兴趣。",
          "我没对这件事感兴趣。"
        ],
        "correctIndex": 0,
        "explanation": "对...一点儿兴趣也没有 is the idiomatic absolute negation."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"妹妹 ( ___ ) 画画特别感兴趣。\"",
        "options": [
          "对",
          "给",
          "向",
          "从"
        ],
        "correctIndex": 0,
        "explanation": "对 introduces the topic of interest."
      }
    ],
    "parentLessonTitle": "",
    "prevRule": {
      "slug": "stated-perspective-renwei",
      "title": "Expressing Perspective: 认为 (rènwéi) vs 觉得 (juéde)",
      "level": 3
    },
    "nextRule": {
      "slug": "simultaneous-yibian-yibian",
      "title": "Simultaneous Dual Actions: 一边...一边... (While... doing...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-3-1",
    "slug": "simultaneous-yibian-yibian",
    "title": "Simultaneous Dual Actions: 一边...一边... (While... doing...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Sentence Structure",
    "pattern": "Subject + 一边 + Action 1 + 一边 + Action 2",
    "explanation": "一边...一边... (yìbiān... yìbiān...) expresses that two distinct actions are carried out concurrently at the exact same time (\"while doing Action 1, doing Action 2\"). In casual spoken Chinese, it is often shortened to 边...边....",
    "structuralVariations": {
      "affirmative": "我们一边喝咖啡，一边聊天儿。 (We are chatting while drinking coffee.)",
      "negative": "开车的时候不能一边开车一边看手机。 (While driving, one must not look at phone while driving.)",
      "question": "你能不能一边听音乐一边做作业？ (Can you do homework while listening to music?)",
      "notes": "Both actions must be voluntary, active verbs performed by the same subject."
    },
    "examples": [
      {
        "zh": "爷爷喜欢一边喝茶，一边看晨报。",
        "py": "Yéye xǐhuan yìbiān hē chá, yìbiān kàn chénbào.",
        "en": "Grandfather likes to drink tea while reading the morning newspaper."
      },
      {
        "zh": "大家一边吃着美味的烤鸭，一边开心地交谈。",
        "py": "Dàjiā yìbiān chī zhe měiwèi de kǎoyā, yìbiān kāixīn de jiāotán.",
        "en": "Everyone chatted happily while eating the delicious roast duck."
      },
      {
        "zh": "他一边走路，一边戴着耳机听汉语录音。",
        "py": "Tā yìbiān zǒulù, yìbiān dài zhe ěrjī tīng Hànyǔ lùyīn.",
        "en": "He listened to Chinese audio with headphones on while walking."
      },
      {
        "zh": "请不要一边吃饭一边大声说话。",
        "py": "Qǐng búyào yìbiān chīfàn yìbiān dàshēng shuōhuà.",
        "en": "Please do not talk loudly while eating."
      }
    ],
    "commonMistakes": [
      "Using 一边...一边 with adjectives (saying \"天气一边冷一边刮风\" is wrong; use 又...又... for twin adjectives: 又冷又刮风).",
      "Using two incompatible sequential actions (e.g. saying \"一边睡觉一边跑步\" is physically impossible)."
    ],
    "examStrategy": "In HSK 3 listening, scenarios where a speaker does two things simultaneously (e.g., listening to music while cooking) will test 一边...一边....",
    "parentLessonSlug": "past-experiences",
    "quiz": [
      {
        "id": 1,
        "question": "Which structure is used for two simultaneous ACTIONS (not adjectives)?",
        "options": [
          "一边...一边...",
          "又...又...",
          "越...越...",
          "从...到..."
        ],
        "correctIndex": 0,
        "explanation": "一边...一边... connects concurrent voluntary actions."
      },
      {
        "id": 2,
        "question": "Can 一边...一边... be paired with adjectives like \"高兴\" and \"难过\"?",
        "options": [
          "No, use 又...又... for dual adjectives",
          "Yes, anytime",
          "Only in formal exams",
          "Only for colors"
        ],
        "correctIndex": 0,
        "explanation": "Adjectives use 又...又... (又大又甜), whereas 一边...一边... strictly connects verbs."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他喜欢 ( ___ ) 听音乐，( ___ ) 做晚饭。\"",
        "options": [
          "一边...一边...",
          "因为...所以...",
          "虽然...但是...",
          "如果...就..."
        ],
        "correctIndex": 0,
        "explanation": "Concurrent cooking and music listening takes 一边...一边."
      }
    ],
    "parentLessonTitle": "Past Experiences & Life Milestones (经历与往事)",
    "prevRule": {
      "slug": "interest-structure-dui-ganxingqu",
      "title": "Expressing Interest: 对...感兴趣 / 有兴趣",
      "level": 3
    },
    "nextRule": {
      "slug": "temporal-inception-cong-kaishi",
      "title": "Temporal Inception: 从...开始 (Starting from...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "茶",
        "slug": "cha-tea",
        "pinyin": "chá",
        "meaning": "tea",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-3-2",
    "slug": "temporal-inception-cong-kaishi",
    "title": "Temporal Inception: 从...开始 (Starting from...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Prepositions",
    "pattern": "从 + Time Point / Event + 开始 (kāishǐ)",
    "explanation": "从...开始 (cóng... kāishǐ) specifies the beginning point in time or stage of development (\"starting from... / beginning with...\"). It can function as an adverbial modifier placed before the subject or before the predicate verb.",
    "structuralVariations": {
      "affirmative": "从明天开始，我们每天早上七点起床跑步。 (Starting tomorrow, we get up at 7:00 AM to run every day.)",
      "negative": "他从去年开始就不吸烟了。 (Starting from last year, he stopped smoking.)",
      "question": "会议从几点开始？ (From what time does the meeting start?)",
      "notes": "Can also be used with spatial concepts or lesson curricula: 从第一课开始 (starting from Lesson 1)."
    },
    "examples": [
      {
        "zh": "从下周一开始，学校将实行新的作息时间表。",
        "py": "Cóng xià zhōuyī kāishǐ, xuéxiào jiāng shíxíng xīn de zuòxī shíjiānbiǎo.",
        "en": "Starting next Monday, the school will implement a new daily schedule."
      },
      {
        "zh": "从现在开始，我们要认真准备期末考试。",
        "py": "Cóng xiànzài kāishǐ, wǒmen yào rènzhēn zhǔnbèi qīmò kǎoshì.",
        "en": "Starting from right now, we must earnestly prepare for the final exams."
      },
      {
        "zh": "他从小学三年级开始学习弹钢琴。",
        "py": "Tā cóng xiǎoxué sān niánjí kāishǐ xuéxí tán gāngqín.",
        "en": "He began learning to play the piano starting from third grade in primary school."
      },
      {
        "zh": "从今天起，让我们养成健康的生活习惯。",
        "py": "Cóng jīntiān qǐ, ràng wǒmen yǎngchéng jiànkāng de shēnghuó xíguàn.",
        "en": "Starting today, let us cultivate healthy lifestyle habits."
      }
    ],
    "commonMistakes": [
      "Omitting 从 (saying \"明天开始我们去...\" is colloquial, but formal HSK requires \"从明天开始\").",
      "Confusing 从...开始 (starting from point X) with 从...到... (span between X and Y)."
    ],
    "examStrategy": "In HSK 3 notices and announcements, \"从...开始\" regularly introduces changes in schedules, fees, or rules.",
    "parentLessonSlug": "past-experiences",
    "quiz": [
      {
        "id": 1,
        "question": "Which preposition completes the inception phrase: \"( ___ ) 下个月开始，房租上涨\"?",
        "options": [
          "从",
          "离",
          "往",
          "给"
        ],
        "correctIndex": 0,
        "explanation": "从...开始 specifies the starting point."
      },
      {
        "id": 2,
        "question": "What is the natural translation of \"Starting from now\"?",
        "options": [
          "从现在开始",
          "离现在开始",
          "到现在的开始",
          "现在离开始"
        ],
        "correctIndex": 0,
        "explanation": "从现在开始 is the standard phrase."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他从五岁 ( ___ ) 就开始学习汉字了。\"",
        "options": [
          "起 / 开始",
          "了",
          "过",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "从...起 or 从...开始 denotes chronological inception."
      }
    ],
    "parentLessonTitle": "Past Experiences & Life Milestones (经历与往事)",
    "prevRule": {
      "slug": "simultaneous-yibian-yibian",
      "title": "Simultaneous Dual Actions: 一边...一边... (While... doing...)",
      "level": 3
    },
    "nextRule": {
      "slug": "ba-with-relocation-dao-zai",
      "title": "Disposal 把 with Directional Relocation: 把 + Object + 放到 / 带到...",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "会",
        "slug": "hui-can",
        "pinyin": "huì",
        "meaning": "can; be able to; will",
        "level": 1
      },
      {
        "hanzi": "几",
        "slug": "ji-how-many",
        "pinyin": "jǐ",
        "meaning": "how many (usually <10)",
        "level": 1
      },
      {
        "hanzi": "今天",
        "slug": "jintian",
        "pinyin": "jīntiān",
        "meaning": "today",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-3-3",
    "slug": "ba-with-relocation-dao-zai",
    "title": "Disposal 把 with Directional Relocation: 把 + Object + 放到 / 带到...",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Disposal & Passive",
    "pattern": "Subject + 把 + Object + Verb (放 / 搬 / 拿 / 带) + 到 / 在 + Location",
    "explanation": "When a disposal 把 sentence describes moving an object from one location to another, the verb must be followed by relational prepositions like 到 (dào) or 在 (zài) plus the destination noun phrase.",
    "structuralVariations": {
      "affirmative": "请把你的行李放在桌子下面。 (Please put your luggage under the table.)",
      "negative": "别把水杯放在电脑旁边。 (Don't put the water cup next to the computer.)",
      "question": "你把我的书包放到哪儿去了？ (Where did you move my backpack to?)",
      "notes": "Verb + 到 + Place indicates motion terminating at destination. Verb + 在 + Place indicates resting at the new location."
    },
    "examples": [
      {
        "zh": "请把这些新鲜的水果放到冰箱里。",
        "py": "Qǐng bǎ zhèxiē xīnxiān de shuǐguǒ fàng dào bīngxiāng lǐ.",
        "en": "Please put these fresh fruits into the refrigerator."
      },
      {
        "zh": "他把汽车开到了地下车库。",
        "py": "Tā bǎ qìchē kāi dào le dìxià chēkù.",
        "en": "He drove the car into the underground garage."
      },
      {
        "zh": "请大家把作业本交到讲台上。",
        "py": "Qǐng dàjiā bǎ zuòyèběn jiāo dào jiǎngtái shang.",
        "en": "Please hand in your homework notebooks onto the teacher's desk."
      },
      {
        "zh": "妈妈把干净的衣服挂在了衣柜里。",
        "py": "Māma bǎ gānjìng de yīfu guà zài le yīguì lǐ.",
        "en": "Mom hung the clean clothes in the wardrobe."
      }
    ],
    "commonMistakes": [
      "Omitting the destination preposition 到/在 (saying \"把水果放冰箱\" is incomplete in standard writing; write \"把水果放到冰箱里\").",
      "Placing the location before the verb in 把 relocation structures (saying \"把水果在冰箱放\" is completely wrong)."
    ],
    "examStrategy": "In HSK 3 Writing unscrambling problems, group: 把 + Noun + [Verb + 到/在 + Location].",
    "parentLessonSlug": "past-experiences",
    "quiz": [
      {
        "id": 1,
        "question": "Which sentence correctly expresses putting keys on the table using 把?",
        "options": [
          "把钥匙放在桌子上。",
          "把在桌子上放钥匙。",
          "放钥匙把桌子上。",
          "桌子把钥匙放上。"
        ],
        "correctIndex": 0,
        "explanation": "把 + Object (钥匙) + Verb (放) + 在 + Location (桌子上)."
      },
      {
        "id": 2,
        "question": "What element must follow verbs of relocation like 放 or 带 in a 把 sentence?",
        "options": [
          "到 / 在 + Destination",
          "很 / 非常 + Adjective",
          "了 + 过",
          "没有"
        ],
        "correctIndex": 0,
        "explanation": "Relocation verbs require directional/locative complements with 到 or 在."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"请你把护照带 ( ___ ) 机场。\"",
        "options": [
          "到",
          "从",
          "离",
          "往"
        ],
        "correctIndex": 0,
        "explanation": "Bringing an object to a destination uses 带到 + Location."
      }
    ],
    "parentLessonTitle": "Past Experiences & Life Milestones (经历与往事)",
    "prevRule": {
      "slug": "temporal-inception-cong-kaishi",
      "title": "Temporal Inception: 从...开始 (Starting from...)",
      "level": 3
    },
    "nextRule": {
      "slug": "sufficient-condition-zhiyao-jiu",
      "title": "Sufficient Condition: 只要...就... (As long as... then...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "ba-sentence-structure",
        "title": "The Disposal 把 (bǎ) Sentence Structure",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Definite Object + Action Verb + Other Element"
      },
      {
        "slug": "ba-with-resolution-jiejue",
        "title": "Disposal 把 with Resultative Resolution: 把 + Problem + 解决 / 做好",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Task / Problem + Verb + 好 / 完 / 解决 (Resolution)"
      },
      {
        "slug": "passive-bei-structure",
        "title": "The Passive Voice Structure: 被 (bèi) Sentence",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Receiver of Action + 被 + (Agent / Doer) + Verb + Other Element"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "电脑",
        "slug": "diannao",
        "pinyin": "diànnǎo",
        "meaning": "computer",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "开",
        "slug": "kai",
        "pinyin": "kāi",
        "meaning": "to open; to drive",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-4-1",
    "slug": "sufficient-condition-zhiyao-jiu",
    "title": "Sufficient Condition: 只要...就... (As long as... then...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Complex Sentences",
    "pattern": "只要 + Sufficient Condition, Subject + 就 + Result",
    "explanation": "只要...就... (zhǐyào... jiù...) introduces a sufficient condition (\"as long as / provided that... then...\"). It implies that meeting this single condition is entirely adequate to produce the stated outcome.",
    "structuralVariations": {
      "affirmative": "只要每天坚持练习，汉语水平就一定会提高。 (As long as you practice daily, your Chinese level will definitely improve.)",
      "negative": "只要不下雨，我们就按时出发。 (As long as it doesn't rain, we'll set off on schedule.)",
      "question": "只要努力就一定能成功吗？ (Can one definitely succeed as long as they work hard?)",
      "notes": "Contrast with 只有...才... (necessary condition: ONLY IF condition X is met can outcome Y occur)."
    },
    "examples": [
      {
        "zh": "只要你愿意努力，什么时候开始都不晚。",
        "py": "Zhǐyào nǐ yuànyì nǔlì, shénme shíhou kāishǐ dōu bù wǎn.",
        "en": "As long as you are willing to work hard, it is never too late to start."
      },
      {
        "zh": "只要有不懂的词语，查查词典就明白了。",
        "py": "Zhǐyào yǒu bù dǒng de cíyǔ, chácha cídiǎn jiù míngbai le.",
        "en": "As long as there are words you don't understand, looking them up in a dictionary will make it clear."
      },
      {
        "zh": "只要你身体健康，爸爸妈妈就放心了。",
        "py": "Zhǐyào nǐ shēntǐ jiànkāng, bàba māma jiù fàngxīn le.",
        "en": "As long as you are healthy, Mom and Dad are relieved."
      },
      {
        "zh": "只要大家团结一致，任何困难都可以克服。",
        "py": "Zhǐyào dàjiā tuánjié yízhì, rènhé kùnnan dōu kěyǐ kèfú.",
        "en": "As long as everyone unites together, any difficulty can be overcome."
      }
    ],
    "commonMistakes": [
      "Pairing 只要 with 才 (saying \"只要努力才能成功\" mixes up sufficient and necessary conditions; 只要 pairs with 就; 只有 pairs with 才).",
      "Confusing 只要...就 (sufficient) with 如果...就 (hypothetical)."
    ],
    "examStrategy": "A classic HSK 3 grammar question: 只要 ALWAYS pairs with 就, while 只有 ALWAYS pairs with 才. Memorize: 只要...就, 只有...才.",
    "parentLessonSlug": "problem-solving",
    "quiz": [
      {
        "id": 1,
        "question": "Which correlative adverb ALWAYS pairs with 只要 in standard grammar?",
        "options": [
          "就",
          "才",
          "却",
          "并"
        ],
        "correctIndex": 0,
        "explanation": "只要 (as long as) strictly pairs with 就 (then)."
      },
      {
        "id": 2,
        "question": "What is the logical difference between 只要...就 and 只有...才?",
        "options": [
          "只要 indicates a sufficient condition; 只有 indicates the sole necessary condition",
          "They mean the exact same thing",
          "只有 is used only for numbers",
          "只要 is only used in questions"
        ],
        "correctIndex": 0,
        "explanation": "只要...就 = sufficient condition; 只有...才 = sole necessary condition."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"只要天气好，我们明天 ( ___ ) 去海边露营。\"",
        "options": [
          "就",
          "才",
          "还",
          "却"
        ],
        "correctIndex": 0,
        "explanation": "Sufficient condition 只要 pairs with 就."
      }
    ],
    "parentLessonTitle": "Problem Solving & Overcoming Obstacles (解决问题与挑战)",
    "prevRule": {
      "slug": "ba-with-relocation-dao-zai",
      "title": "Disposal 把 with Directional Relocation: 把 + Object + 放到 / 带到...",
      "level": 3
    },
    "nextRule": {
      "slug": "purpose-clauses-weile",
      "title": "Purpose & Objective Clauses: 为了... (In order to...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爸爸",
        "slug": "baba",
        "pinyin": "bàba",
        "meaning": "father; dad",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-4-2",
    "slug": "purpose-clauses-weile",
    "title": "Purpose & Objective Clauses: 为了... (In order to...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Prepositions",
    "pattern": "为了 + Purpose / Goal, Subject + Action Clause",
    "explanation": "为了 (wèile) introduces the purpose, goal, or motivation behind an action (\"in order to / for the sake of\"). The 为了 purpose clause is placed before the main action clause at the beginning of the sentence.",
    "structuralVariations": {
      "affirmative": "为了学好汉语，他每天都看半个小时中文新闻。 (In order to learn Chinese well, he watches 30 minutes of Chinese news daily.)",
      "negative": "为了不迟到，他今天特意起得很早。 (In order not to be late, he deliberately woke up very early today.)",
      "question": "你为了什么放弃那份高薪的工作？ (For what reason did you give up that high-paying job?)",
      "notes": "Contrast with 因为 (reason/cause in the past): 因为 describes why something happened; 为了 describes the future goal/objective."
    },
    "examples": [
      {
        "zh": "为了通过下个月的HSK考试，他每天都做一套模拟题。",
        "py": "Wèile tōngguò xià gè yuè de HSK kǎoshì, tā měitiān dōu zuò yí tào mónǐ tí.",
        "en": "In order to pass next month's HSK exam, he completes a mock test every day."
      },
      {
        "zh": "为了家人的幸福生活，父亲一直在外辛勤工作。",
        "py": "Wèile jiārén de xìngfú shēnghuó, fùqīn yìzhí zài wài xīnqín gōngzuò.",
        "en": "For the happy life of the family, the father has been working hard away from home."
      },
      {
        "zh": "为了保护自然环境，我们应该尽量少用塑料袋。",
        "py": "Wèile bǎohù zìrán huánjìng, wǒmen yīnggāi jǐnliàng shǎo yòng sùliàodài.",
        "en": "In order to protect the natural environment, we should minimize using plastic bags."
      },
      {
        "zh": "为了准时赶到会议现场，她提前半个小时就出门了。",
        "py": "Wèile zhǔnshí gǎndào huìyì xiànchǎng, tā tíqián bàn gè xiǎoshí jiù chūmén le.",
        "en": "In order to arrive at the meeting on time, she left home half an hour early."
      }
    ],
    "commonMistakes": [
      "Confusing 为了 (future purpose/goal) with 因为 (past reason/cause).",
      "Placing the 为了 clause at the very end of the sentence like English \"He did X in order to Y\" (standard Chinese strongly prefers placing 为了... first)."
    ],
    "examStrategy": "In HSK 3 Reading Section 1 sentence matching, sentences beginning with \"为了...\" almost always match solutions and deliberate actions.",
    "parentLessonSlug": "problem-solving",
    "quiz": [
      {
        "id": 1,
        "question": "Which preposition introduces the objective or purpose (\"in order to\") of an action?",
        "options": [
          "为了",
          "因为",
          "除了",
          "关于"
        ],
        "correctIndex": 0,
        "explanation": "为了 expresses purpose or intention."
      },
      {
        "id": 2,
        "question": "How do 为了 and 因为 differ in standard Chinese usage?",
        "options": [
          "为了 expresses future goal/objective; 因为 explains causes or past reasons",
          "They are identical synonyms",
          "为了 can only follow verbs",
          "因为 cannot be used in writing"
        ],
        "correctIndex": 0,
        "explanation": "为了 marks prospective purpose; 因为 marks retrospective reason."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"( ___ ) 保证安全，施工现场必须佩戴安全帽。\"",
        "options": [
          "为了",
          "因为",
          "根据",
          "关于"
        ],
        "correctIndex": 0,
        "explanation": "The objective of ensuring safety is introduced by 为了."
      }
    ],
    "parentLessonTitle": "Problem Solving & Overcoming Obstacles (解决问题与挑战)",
    "prevRule": {
      "slug": "sufficient-condition-zhiyao-jiu",
      "title": "Sufficient Condition: 只要...就... (As long as... then...)",
      "level": 3
    },
    "nextRule": {
      "slug": "ba-with-resolution-jiejue",
      "title": "Disposal 把 with Resultative Resolution: 把 + Problem + 解决 / 做好",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "工作",
        "slug": "gongzuo",
        "pinyin": "gōngzuò",
        "meaning": "work; job; to work",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-4-3",
    "slug": "ba-with-resolution-jiejue",
    "title": "Disposal 把 with Resultative Resolution: 把 + Problem + 解决 / 做好",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Disposal & Passive",
    "pattern": "Subject + 把 + Task / Problem + Verb + 好 / 完 / 解决 (Resolution)",
    "explanation": "Disposal 把 constructions are frequently employed to describe resolving issues, concluding tasks, or successfully executing operations on abstract nouns (problems, assignments, plans, misunderstandings).",
    "structuralVariations": {
      "affirmative": "我们一定要把这个问题彻底解决好。 (We must thoroughly resolve this issue.)",
      "negative": "他还没把事情办好。 (He hasn't gotten the matter handled properly yet.)",
      "question": "你能不能今天之内把作业交上？ (Can you submit the homework within today?)",
      "notes": "Common collocation pairs: 把问题解决, 把事情办好, 把工作完成."
    },
    "examples": [
      {
        "zh": "大家一起开会，终于把这个复杂的难题解决了。",
        "py": "Dàjiā yìqǐ kāihuì, zhōngyú bǎ zhè gè fùzá de nántí jiějué le.",
        "en": "Everyone held a meeting together and finally resolved this complicated problem."
      },
      {
        "zh": "请在下班之前把这份市场分析报告写好。",
        "py": "Qǐng zài xiàbān zhīqián bǎ zhè fèn shìchǎng fēnxī bàogào xiě hǎo.",
        "en": "Please finish writing this market analysis report before clocking out."
      },
      {
        "zh": "只要我们齐心协力，就能把所有的工作做好。",
        "py": "Zhǐyào wǒmen qíxīn xiélì, jiù néng bǎ suǒyǒu de gōngzuò zuò hǎo.",
        "en": "As long as we work in unity, we can do all the work well."
      },
      {
        "zh": "他们通过沟通，把彼此之间的误会彻底消除了。",
        "py": "Tāmen tōngguò gōutōng, bǎ bǐcǐ zhījiān de wùhuì chèdǐ xiāochú le.",
        "en": "Through communication, they completely dispelled the misunderstanding between each other."
      }
    ],
    "commonMistakes": [
      "Applying 把 to abstract nouns without a conclusive resultative verb (e.g. saying \"把问题想\" is incomplete; write \"把问题想清楚\").",
      "Using intransitive verbs with 把."
    ],
    "examStrategy": "In HSK 3 business and campus passages, \"把...做好\" and \"把...解决\" are standard high-scoring idiomatic patterns.",
    "parentLessonSlug": "problem-solving",
    "quiz": [
      {
        "id": 1,
        "question": "Which complement best finishes the task resolution phrase: \"请你把这件事办 ( ___ )\"?",
        "options": [
          "好",
          "着",
          "很",
          "在"
        ],
        "correctIndex": 0,
        "explanation": "办好 means to handle or settle satisfactorily."
      },
      {
        "id": 2,
        "question": "Can 把 sentences be used with abstract nouns like 难题 (difficult problem) or 误会 (misunderstanding)?",
        "options": [
          "Yes, when paired with resultative verbs like 解决 or 消除",
          "No, only physical objects like apples or books",
          "Only in classical Chinese",
          "Never in HSK tests"
        ],
        "correctIndex": 0,
        "explanation": "把 sentences regularly dispose of abstract nouns (把问题解决, 把工作完成)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"我们必须在今天之内把所有的难题都 ( ___ ) 掉。\"",
        "options": [
          "解决",
          "知道",
          "以为",
          "感觉"
        ],
        "correctIndex": 0,
        "explanation": "解决掉 expresses disposing of problems completely."
      }
    ],
    "parentLessonTitle": "Problem Solving & Overcoming Obstacles (解决问题与挑战)",
    "prevRule": {
      "slug": "purpose-clauses-weile",
      "title": "Purpose & Objective Clauses: 为了... (In order to...)",
      "level": 3
    },
    "nextRule": {
      "slug": "passive-bei-structure",
      "title": "The Passive Voice Structure: 被 (bèi) Sentence",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "ba-sentence-structure",
        "title": "The Disposal 把 (bǎ) Sentence Structure",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Definite Object + Action Verb + Other Element"
      },
      {
        "slug": "ba-with-relocation-dao-zai",
        "title": "Disposal 把 with Directional Relocation: 把 + Object + 放到 / 带到...",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Object + Verb (放 / 搬 / 拿 / 带) + 到 / 在 + Location"
      },
      {
        "slug": "passive-bei-structure",
        "title": "The Passive Voice Structure: 被 (bèi) Sentence",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Receiver of Action + 被 + (Agent / Doer) + Verb + Other Element"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "工作",
        "slug": "gongzuo",
        "pinyin": "gōngzuò",
        "meaning": "work; job; to work",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-5-1",
    "slug": "passive-bei-structure",
    "title": "The Passive Voice Structure: 被 (bèi) Sentence",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Disposal & Passive",
    "pattern": "Receiver of Action + 被 + (Agent / Doer) + Verb + Other Element",
    "explanation": "The 被 (bèi) construction forms the passive voice in Mandarin, emphasizing that the subject receives or is affected by an action. In spoken Chinese, 叫 (jiào) or 让 (ràng) can replace 被. Historically and commonly, 被 carries an unfortunate, adverse, or undesirable nuance (\"was eaten / was stolen / was broken\").",
    "structuralVariations": {
      "affirmative": "我的自行车被小偷骑走了。 (My bicycle was ridden away by a thief.)",
      "negative": "钱包没有被偷走。 (The wallet was not stolen.)",
      "question": "作业本被谁拿走了？ (Who took the homework notebook away?)",
      "notes": "Unlike 把, the agent/doer after 被 can be omitted: 自行车被偷了 (The bike was stolen). Negation (没/没有) must precede 被."
    },
    "examples": [
      {
        "zh": "桌上的苹果被弟弟吃掉了。",
        "py": "Zhuō shang de píngguǒ bèi dìdi chī diào le.",
        "en": "The apple on the table was eaten up by younger brother."
      },
      {
        "zh": "他的手机在公共汽车上被偷了。",
        "py": "Tā de shǒujī zài gōnggòng qìchē shang bèi tōu le.",
        "en": "His mobile phone was stolen on the bus."
      },
      {
        "zh": "杯子不小心被他打碎了。",
        "py": "Bēizi bù xiǎoxīn bèi tā dǎ suì le.",
        "en": "The glass cup was accidentally shattered by him."
      },
      {
        "zh": "那个犯了错误的学生被老师严厉地批评了一顿。",
        "py": "Nà gè fàn le cuòwù de xuésheng bèi lǎoshī yánlì de pīpíng le yí dùn.",
        "en": "That student who made a mistake was severely criticized by the teacher."
      }
    ],
    "commonMistakes": [
      "Placing negation after 被 (saying \"自行车被没偷\" is wrong; must say \"自行车没被偷\").",
      "Leaving the verb bare without a complement or 了 (saying \"苹果被弟弟吃\" is ungrammatical; must say \"被弟弟吃了\")."
    ],
    "examStrategy": "A core test topic in HSK 3 Writing unscrambling. Formula: Receiver + (没) + 被 + (Doer) + Verb + Complement/了.",
    "parentLessonSlug": "environment-and-nature",
    "quiz": [
      {
        "id": 1,
        "question": "Which of the following is a grammatically correct 被 passive sentence?",
        "options": [
          "蛋糕被妹妹吃了。",
          "妹妹被蛋糕吃了。",
          "蛋糕被妹妹吃。",
          "蛋糕没妹妹被吃。"
        ],
        "correctIndex": 0,
        "explanation": "Receiver (蛋糕) + 被 + Doer (妹妹) + Verb + 了."
      },
      {
        "id": 2,
        "question": "Where is the negation word 没 placed in a 被 sentence?",
        "options": [
          "Directly before 被 (没被)",
          "Directly after 被",
          "Between verb and complement",
          "At the end of the sentence"
        ],
        "correctIndex": 0,
        "explanation": "Negation precedes 被 (e.g. 没被偷走)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他的借书证不小心 ( ___ ) 弄丢了。\"",
        "options": [
          "被",
          "把",
          "比",
          "向"
        ],
        "correctIndex": 0,
        "explanation": "The library card suffered the adverse loss, requiring the passive marker 被."
      }
    ],
    "parentLessonTitle": "Environment, Nature & Ecology (环境与自然生态)",
    "prevRule": {
      "slug": "ba-with-resolution-jiejue",
      "title": "Disposal 把 with Resultative Resolution: 把 + Problem + 解决 / 做好",
      "level": 3
    },
    "nextRule": {
      "slug": "extreme-emphasis-lian-dou",
      "title": "Extreme Inclusive Emphasis: 连...都 / 也... (Even...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "ba-sentence-structure",
        "title": "The Disposal 把 (bǎ) Sentence Structure",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Definite Object + Action Verb + Other Element"
      },
      {
        "slug": "ba-with-relocation-dao-zai",
        "title": "Disposal 把 with Directional Relocation: 把 + Object + 放到 / 带到...",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Object + Verb (放 / 搬 / 拿 / 带) + 到 / 在 + Location"
      },
      {
        "slug": "ba-with-resolution-jiejue",
        "title": "Disposal 把 with Resultative Resolution: 把 + Problem + 解决 / 做好",
        "level": 3,
        "category": "Disposal & Passive",
        "pattern": "Subject + 把 + Task / Problem + Verb + 好 / 完 / 解决 (Resolution)"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "杯子",
        "slug": "beizi",
        "pinyin": "bēizi",
        "meaning": "cup; glass",
        "level": 1
      },
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-5-2",
    "slug": "extreme-emphasis-lian-dou",
    "title": "Extreme Inclusive Emphasis: 连...都 / 也... (Even...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Sentence Structure",
    "pattern": "连 + Extreme Item / Element + 都 / 也 + Verb Phrase / Negation",
    "explanation": "连...都/也... (lián... dōu/yě...) emphasizes an extreme or unexpected case to illustrate a broader truth (\"even...\"). If even the simplest or most obvious example holds true, then everything else naturally follows.",
    "structuralVariations": {
      "affirmative": "这道题太容易了，连三岁的小孩儿都懂。 (This question is so easy that even a 3-year-old child understands.)",
      "negative": "他太忙了，连早饭都没吃就去上班了。 (He was so busy that he didn't even eat breakfast before going to work.)",
      "question": "你连这个汉字都不认识吗？ (Do you not even recognize this Chinese character?)",
      "notes": "The emphasized element can be a subject, an object, or a verbal predicate."
    },
    "examples": [
      {
        "zh": "他汉语学得非常好，连很多成语都能熟练运用。",
        "py": "Tā Hànyǔ xué de fēicháng hǎo, lián hěn duō chéngyǔ dōu néng shúliàn yùnyòng.",
        "en": "He learned Chinese so well that he can even skillfully use many idioms."
      },
      {
        "zh": "今天工作忙得要命，我连喝口水的时间都没有。",
        "py": "Jīntiān gōngzuò máng de yàomìng, wǒ lián hē kǒu shuǐ de shíjiān dōu méiyǒu.",
        "en": "Work was terribly busy today; I didn't even have time to drink a sip of water."
      },
      {
        "zh": "爷爷虽然七十岁了，但身体很好，连老花镜都不用戴。",
        "py": "Yéye suīrán qīshí suì le, dàn shēntǐ hěn hǎo, lián lǎohuājìng dōu búyòng dài.",
        "en": "Although grandfather is 70 years old, he is very fit; he doesn't even need reading glasses."
      },
      {
        "zh": "这个地方太偏僻了，连手机信号都没有。",
        "py": "Zhè gè dìfang tài piānpì le, lián shǒujī xìnhào dōu méiyǒu.",
        "en": "This place is too remote; it doesn't even have a cellular phone signal."
      }
    ],
    "commonMistakes": [
      "Omitting 都 or 也 after the 连 clause (saying \"连小孩子懂\" is incomplete; you must say \"连小孩子都懂\").",
      "Confusing 连...都 (extreme emphasis \"even\") with 不但...而且 (progressive addition \"not only\")."
    ],
    "examStrategy": "In HSK 3 Reading Part 2 fill-in-the-blank, spotting 连 in the sentence guarantees that 都 or 也 will follow.",
    "parentLessonSlug": "environment-and-nature",
    "quiz": [
      {
        "id": 1,
        "question": "Which word must pair with 连 in the predicate?",
        "options": [
          "都 / 也",
          "就",
          "才",
          "但是"
        ],
        "correctIndex": 0,
        "explanation": "连 (even) strictly requires 都 or 也 in the subsequent phrase."
      },
      {
        "id": 2,
        "question": "What rhetorical effect does 连...都... create?",
        "options": [
          "Presents an extreme case to emphasize a broader point",
          "Expresses a hypothetical doubt",
          "Marks passive voice",
          "Expresses past experience"
        ],
        "correctIndex": 0,
        "explanation": "It highlights an extreme example to prove the broader reality."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他今天太累了，连晚饭 ( ___ ) 没吃就睡了。\"",
        "options": [
          "都 / 也",
          "就",
          "才",
          "却"
        ],
        "correctIndex": 0,
        "explanation": "连...都 / 也 completes the construction."
      }
    ],
    "parentLessonTitle": "Environment, Nature & Ecology (环境与自然生态)",
    "prevRule": {
      "slug": "passive-bei-structure",
      "title": "The Passive Voice Structure: 被 (bèi) Sentence",
      "level": 3
    },
    "nextRule": {
      "slug": "progressive-depletion-yue-lai-yue-shao",
      "title": "Quantitative Trends: 越来越多 / 越来越少",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-5-3",
    "slug": "progressive-depletion-yue-lai-yue-shao",
    "title": "Quantitative Trends: 越来越多 / 越来越少",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Adverbs",
    "pattern": "Subject / Noun + 越来越多 / 越来越少 (+ 了)",
    "explanation": "A specialized and exceptionally frequent application of the 越来越 structure used to describe expanding or dwindling quantities (\"more and more / fewer and fewer / less and less\").",
    "structuralVariations": {
      "affirmative": "骑自行车出行的人越来越多了。 (People traveling by bicycle are getting more and more.)",
      "negative": "由于环境污染，野生动物越来越少了。 (Due to pollution, wild animals are becoming fewer and fewer.)",
      "question": "现在书店里的纸质书是不是越来越少了？ (Are paper books in bookstores getting fewer and fewer?)",
      "notes": "Can modify noun phrases: 越来越多的外国朋友 (more and more foreign friends)."
    },
    "examples": [
      {
        "zh": "随着移动支付的普及，出门带现金的人越来越少了。",
        "py": "Suízhe yídòng zhìfù de pǔjí, chūmén dài xiànjīn de rén yuè lái yuè shǎo le.",
        "en": "With the popularity of mobile payments, people carrying cash when going out are fewer and fewer."
      },
      {
        "zh": "关注环境保护、参与垃圾分类的居民越来越多了。",
        "py": "Guānzhù huánjìng bǎohù, cānyù lājī fēnlèi de jūmín yuè lái yuè duō le.",
        "en": "Residents paying attention to environmental protection and sorting garbage are more and more."
      },
      {
        "zh": "现在学习中国茶文化和书法的人越来越多了。",
        "py": "Xiànzài xuéxí Zhōngguó chá wénhuà hé shūfǎ de rén yuè lái yuè duō le.",
        "en": "People studying Chinese tea culture and calligraphy are now getting more and more."
      },
      {
        "zh": "受网络媒体的影响，看纸质报纸的读者越来越少了。",
        "py": "Shòu wǎngluò méitǐ de yǐngxiǎng, kàn zhǐzhì bàozhǐ de dúzhě yuè lái yuè shǎo le.",
        "en": "Influenced by internet media, readers reading paper newspapers are becoming fewer and fewer."
      }
    ],
    "commonMistakes": [
      "Adding degree adverbs (saying \"越来越很多\" or \"越来越非常少\" is grammatically incorrect).",
      "Forgetting the nominalizer 的 when modifying nouns (write \"越来越少的人\", not \"越来越少人\")."
    ],
    "examStrategy": "In HSK 3 informational passages on technology, environment, and social trends, 越来越多/越来越少 indicates chronological statistics.",
    "parentLessonSlug": "environment-and-nature",
    "quiz": [
      {
        "id": 1,
        "question": "How do you say \"More and more people\" correctly?",
        "options": [
          "越来越多的人",
          "越来越很多人",
          "很多越来越人",
          "最越来越多的人"
        ],
        "correctIndex": 0,
        "explanation": "越来越多 + 的 + Noun."
      },
      {
        "id": 2,
        "question": "Which phrase expresses a dwindling or shrinking quantity trend?",
        "options": [
          "越来越少",
          "越来越多",
          "越少越少",
          "很多少"
        ],
        "correctIndex": 0,
        "explanation": "越来越少 expresses progressively diminishing quantity."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"空气质量改善了，生病的人 ( ___ ) 了。\"",
        "options": [
          "越来越少",
          "越来越很多",
          "少极了多",
          "最少极了"
        ],
        "correctIndex": 0,
        "explanation": "Diminishing illness trend takes 越来越少."
      }
    ],
    "parentLessonTitle": "Environment, Nature & Ecology (环境与自然生态)",
    "prevRule": {
      "slug": "extreme-emphasis-lian-dou",
      "title": "Extreme Inclusive Emphasis: 连...都 / 也... (Even...)",
      "level": 3
    },
    "nextRule": {
      "slug": "exclusive-scope-chule-yiwai",
      "title": "Exclusive Scope: 除了... (以外), 都... (Except for...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "prior-completion-yijing-le",
        "title": "Prior Completion: 已经...了 (Already... completed)",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 已经 + Verb Phrase / State + 了"
      },
      {
        "slug": "slight-degree-youdianr",
        "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 有点儿 / 有点 + Negative/Unfavorable Adjective"
      },
      {
        "slug": "prompt-marker-jiu-consequence",
        "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Condition / Time Phrase + 就 (jiù) + Verb Phrase"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "茶",
        "slug": "cha-tea",
        "pinyin": "chá",
        "meaning": "tea",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "读",
        "slug": "du",
        "pinyin": "dú",
        "meaning": "to read; to study",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "和",
        "slug": "he-and",
        "pinyin": "hé",
        "meaning": "and; with",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-6-1",
    "slug": "exclusive-scope-chule-yiwai",
    "title": "Exclusive Scope: 除了... (以外), 都... (Except for...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Complex Sentences",
    "pattern": "除了 + Excluded Item + (以外), Subject + 都 + Predicate",
    "explanation": "When 除了... (以外) is paired with 都 (dōu), it signifies absolute exclusion (\"Except for X, all are Y\"). Everything in the set possesses the attribute except the excluded member. Contrast with 除了...还/也... which signifies inclusion.",
    "structuralVariations": {
      "affirmative": "除了星期天以外，图书馆每天都开门。 (Except for Sunday, the library opens every day.)",
      "negative": "除了小李，大家都没去过长城。 (Except for Xiao Li, none of us have been to the Great Wall.)",
      "question": "除了这道题，其他的你都做对了吗？ (Except for this question, did you get all the others right?)",
      "notes": "Pairing with 都 = Exclusion (all except X). Pairing with 还/也 = Inclusion (X plus Y)."
    },
    "examples": [
      {
        "zh": "除了小明请病假以外，今天全班同学都到齐了。",
        "py": "Chúle Xiǎomíng qǐng bìngjià yǐwài, jīntiān quán bān tóngxué dōu dào qí le.",
        "en": "Except for Xiao Ming who took sick leave, all classmates arrived today."
      },
      {
        "zh": "除了最后一道数学题比较难，前面的题我都做出来了。",
        "py": "Chúle zuìhòu yí dào shùxué tí bǐjiào nán, qiánmiàn de tí wǒ dōu zuò chūlái le.",
        "en": "Except for the last math problem which was difficult, I solved all the previous problems."
      },
      {
        "zh": "除了周一闭馆，博物馆平时每天都正常对外开放。",
        "py": "Chúle zhōuyī bìguǎn, bówùguǎn píngshí měitiān dōu zhèngcháng duìwài kāifàng.",
        "en": "Except for closing on Mondays, the museum normally opens to the public every day."
      },
      {
        "zh": "除了汉语，他对其他外语都不太了解。",
        "py": "Chúle Hànyǔ, tā duì qítā wàiyǔ dōu bú tài liǎojiě.",
        "en": "Except for Chinese, he doesn't know much about other foreign languages."
      }
    ],
    "commonMistakes": [
      "Mixing up 都 and 还 (if you say \"除了小李还来了\", it means Xiao Li ALSO came; if you say \"除了小李都来了\", it means everyone EXCEPT Xiao Li came).",
      "Placing 都 before 除了 (都 must be in the second clause)."
    ],
    "examStrategy": "In HSK 3 Reading Section 3, check the correlative: 除了 + 都 = Exclusion; 除了 + 还 = Inclusion.",
    "parentLessonSlug": "education-system",
    "quiz": [
      {
        "id": 1,
        "question": "Which word in the main clause creates an EXCLUSIVE meaning (\"except for\") with 除了?",
        "options": [
          "都",
          "还",
          "也",
          "又"
        ],
        "correctIndex": 0,
        "explanation": "除了...都... expresses exclusive scope (all except)."
      },
      {
        "id": 2,
        "question": "What does \"除了星期一，我们每天都上课\" mean?",
        "options": [
          "We have class every day except Monday",
          "We only have class on Monday",
          "We have class on Monday and Tuesday",
          "We never have class"
        ],
        "correctIndex": 0,
        "explanation": "Monday is excluded; classes occur on all other days."
      },
      {
        "id": 3,
        "question": "Complete the sentence: \"除了他，大家 ( ___ ) 准时到了。\"",
        "options": [
          "都",
          "还",
          "也",
          "却"
        ],
        "correctIndex": 0,
        "explanation": "Exclusive exception pairs with 都."
      }
    ],
    "parentLessonTitle": "Education, Campus & Academic Research (教育体制与学术)",
    "prevRule": {
      "slug": "progressive-depletion-yue-lai-yue-shao",
      "title": "Quantitative Trends: 越来越多 / 越来越少",
      "level": 3
    },
    "nextRule": {
      "slug": "topical-preposition-guanyu",
      "title": "Topical Preposition: 关于 + Topic / Domain (Concerning / About)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-6-2",
    "slug": "topical-preposition-guanyu",
    "title": "Topical Preposition: 关于 + Topic / Domain (Concerning / About)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Prepositions",
    "pattern": "关于 + Topic + 的 + Noun OR 关于 + Topic, Sentence",
    "explanation": "关于 (guānyú) introduces a topic, subject matter, or domain (\"about / concerning / regarding\"). When modifying a noun, it must take 的 (e.g. 关于中国文化的书). When setting the stage as an introductory topic, it appears at the head of the clause before a comma.",
    "structuralVariations": {
      "affirmative": "这是一本关于中国历史的畅销书。 (This is a bestseller about Chinese history.)",
      "negative": "关于这件事情，我们还没有做出最终决定。 (Regarding this matter, we haven't made a final decision yet.)",
      "question": "关于这次留学申请，你还有什么疑问吗？ (Regarding this study abroad application, do you have any questions?)",
      "notes": "Contrast with 对于 (duìyú): 关于 indicates scope/topic (about); 对于 indicates attitude toward an object (toward/regarding)."
    },
    "examples": [
      {
        "zh": "图书馆里有很多关于环境保护的书籍。",
        "py": "Túshūguǎn lǐ yǒu hěn duō guānyú huánjìng bǎohù de shūjí.",
        "en": "There are many books about environmental protection in the library."
      },
      {
        "zh": "关于明天的会议安排，办公室已经发了通知。",
        "py": "Guānyú míngtiān de huìyì ānpái, bàngōngshì yǐjīng fā le tōngzhī.",
        "en": "Regarding tomorrow's meeting arrangements, the office has already sent a notice."
      },
      {
        "zh": "关于如何提高听力水平，老师给我们提了几条很好的建议。",
        "py": "Guānyú rúhé tígāo tīnglì shuǐpíng, lǎoshī gěi wǒmen tí le jǐ tiáo hěn hǎo de jiànyì.",
        "en": "Regarding how to improve listening skills, the teacher gave us several great suggestions."
      },
      {
        "zh": "这是一部关于古代丝绸之路的纪录片。",
        "py": "Zhè shì yí bù guānyú gǔdài sīchóu zhī lù de jìlùpiàn.",
        "en": "This is a documentary about the ancient Silk Road."
      }
    ],
    "commonMistakes": [
      "Omitting 的 when using 关于 to modify a head noun (saying \"关于中国文化书\" is wrong; must write \"关于中国文化的书\").",
      "Placing 关于 behind the predicate verb (unlike English \"books about history\", Chinese requires \"关于历史的书\")."
    ],
    "examStrategy": "In HSK 3 Reading Section 2 announcements and titles, \"关于...\" is the most common heading format.",
    "parentLessonSlug": "education-system",
    "quiz": [
      {
        "id": 1,
        "question": "Which preposition precedes topics in titles like \"A book ABOUT Chinese culture\"?",
        "options": [
          "关于",
          "对",
          "在",
          "向"
        ],
        "correctIndex": 0,
        "explanation": "关于 (guānyú) introduces the topic/domain."
      },
      {
        "id": 2,
        "question": "When 关于 + Topic modifies a noun, which particle must link them?",
        "options": [
          "的",
          "得",
          "地",
          "了"
        ],
        "correctIndex": 0,
        "explanation": "Attributive phrases require structural particle 的 (关于...的书)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"( ___ ) 假期的活动，我们下周再讨论。\"",
        "options": [
          "关于",
          "从",
          "离",
          "往"
        ],
        "correctIndex": 0,
        "explanation": "Introducing topic at sentence head takes 关于."
      }
    ],
    "parentLessonTitle": "Education, Campus & Academic Research (教育体制与学术)",
    "prevRule": {
      "slug": "exclusive-scope-chule-yiwai",
      "title": "Exclusive Scope: 除了... (以外), 都... (Except for...)",
      "level": 3
    },
    "nextRule": {
      "slug": "potential-complements-de-liao",
      "title": "Potential Complements: Verb + 得了 / 不了 (Can / Cannot do)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      },
      {
        "hanzi": "会",
        "slug": "hui-can",
        "pinyin": "huì",
        "meaning": "can; be able to; will",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-6-3",
    "slug": "potential-complements-de-liao",
    "title": "Potential Complements: Verb + 得了 / 不了 (Can / Cannot do)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Complements",
    "pattern": "Verb + 得了 (de liǎo) / 不了 (bù liǎo)",
    "explanation": "The potential complement suffix 了 (pronounced liǎo) combines with verbs to indicate whether an action is physically or circumstantially possible to complete (\"can / cannot\"). Affirmative: Verb + 得了 (can manage to do); Negative: Verb + 不了 (cannot manage to do).",
    "structuralVariations": {
      "affirmative": "这么多菜，你吃得了吃不了？ (Can you finish this much food?)",
      "negative": "东西太多了，我一个人拿不了。 (There are too many things; I can't carry them alone.)",
      "question": "明天下午的聚会你来得了吗？ (Can you make it to tomorrow afternoon's gathering?)",
      "notes": "Pronounced liǎo in potential complements, NOT le."
    },
    "examples": [
      {
        "zh": "对不起，明天的会议我有急事去不了了。",
        "py": "Duìbuqǐ, míngtiān de huìyì wǒ yǒu jíshì qù bù liǎo le.",
        "en": "Sorry, I have urgent matters and cannot make it to tomorrow's meeting."
      },
      {
        "zh": "这么多行李，你一个人拿得了吗？",
        "py": "Zhè me duō xíngli, nǐ yí gè rén ná de liǎo ma?",
        "en": "With so much luggage, can you carry it by yourself?"
      },
      {
        "zh": "这道菜太辣了，我吃不了。",
        "py": "Zhè dào cài tài là le, wǒ chī bù liǎo.",
        "en": "This dish is too spicy; I can't eat it."
      },
      {
        "zh": "时间太紧，今天这项工作肯定做不完了。",
        "py": "Shíjiān tài jǐn, jīntiān zhè xiàng gōngzuò kěndìng zuò bù wán le.",
        "en": "Time is too tight; this task definitely cannot be finished today."
      }
    ],
    "commonMistakes": [
      "Pronouncing 了 as le instead of 3rd tone liǎo in potential forms.",
      "Using 不能 instead of Verb + 不了 when native idiom demands the potential complement (e.g. 去不了 is far more natural than 不能去 in conversational excuses)."
    ],
    "examStrategy": "In HSK 3 listening excuses and declines, \"去不了\" (cannot go) and \"来不了\" (cannot come) are high-frequency answers.",
    "parentLessonSlug": "education-system",
    "quiz": [
      {
        "id": 1,
        "question": "How is 了 pronounced in the potential complement \"去不了\"?",
        "options": [
          "liǎo",
          "le",
          "liào",
          "lù"
        ],
        "correctIndex": 0,
        "explanation": "In potential complement structures, 了 is pronounced liǎo."
      },
      {
        "id": 2,
        "question": "What is the affirmative counterpart of \"吃不了\" (cannot finish eating)?",
        "options": [
          "吃得了",
          "能吃完过",
          "吃得很",
          "吃在"
        ],
        "correctIndex": 0,
        "explanation": "The affirmative potential complement is Verb + 得了."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他今天发烧，下午的课上 ( ___ ) 了。\"",
        "options": [
          "不",
          "得",
          "没",
          "别"
        ],
        "correctIndex": 0,
        "explanation": "上不了 (cannot attend class due to illness)."
      }
    ],
    "parentLessonTitle": "Education, Campus & Academic Research (教育体制与学术)",
    "prevRule": {
      "slug": "topical-preposition-guanyu",
      "title": "Topical Preposition: 关于 + Topic / Domain (Concerning / About)",
      "level": 3
    },
    "nextRule": {
      "slug": "reciprocal-interaction-huxiang",
      "title": "Reciprocal Mutual Action: 互相 + Verb (Each other / Mutually)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "action-duration-time-span",
        "title": "Action Duration: Verb + (Object + Verb) + 了 + Duration",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 了 + Time Duration"
      },
      {
        "slug": "descriptive-complement-de",
        "title": "Descriptive Complement of Degree: Verb + 得 + Adjective",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + (Obj + Verb) + 得 + Adjective"
      },
      {
        "slug": "resultative-complements-wan-hao",
        "title": "Resultative Complements: 完, 好, 到, 懂, 见",
        "level": 2,
        "category": "Complements",
        "pattern": "Subject + Verb + Result Complement (完 / 好 / 到 / 懂 / 见) + (Object)"
      },
      {
        "slug": "direction-complements-lai-qu",
        "title": "Simple Direction Complements: Verb + 来 / 去",
        "level": 2,
        "category": "Complements",
        "pattern": "Motion Verb (进, 出, 上, 下, 回, 过) + 来 / 去"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "东西",
        "slug": "dongxi",
        "pinyin": "dōngxi",
        "meaning": "thing; stuff",
        "level": 1
      },
      {
        "hanzi": "对不起",
        "slug": "duibuqi",
        "pinyin": "duìbuqǐ",
        "meaning": "I'm sorry; excuse me",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-7-1",
    "slug": "reciprocal-interaction-huxiang",
    "title": "Reciprocal Mutual Action: 互相 + Verb (Each other / Mutually)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Adverbs",
    "pattern": "Subject (Plural) + 互相 (hùxiāng) + Transitive Verb",
    "explanation": "互相 (hùxiāng) is an adverb denoting reciprocal or mutual interaction between two or more parties (\"each other / mutually / one another\"). The subject must always be plural (我们, 他们, 大家, 双方).",
    "structuralVariations": {
      "affirmative": "同学们在学习上应该互相帮助。 (Classmates should help each other in their studies.)",
      "negative": "他们互相不理睬。 (They don't acknowledge each other.)",
      "question": "你们经常互相交流学习经验吗？ (Do you often exchange study experiences with each other?)",
      "notes": "Common verb pairings: 互相帮助 (help each other), 互相学习 (learn from each other), 互相理解 (understand each other)."
    },
    "examples": [
      {
        "zh": "在语言学习中，同伴之间应该互相鼓励、互相支持。",
        "py": "Zài yǔyán xuéxí zhōng, tóngbàn zhījiān yīnggāi hùxiāng gǔlì, hùxiāng zhīchí.",
        "en": "In language learning, peers should encourage and support each other."
      },
      {
        "zh": "邻里之间需要互相尊重、互相包容。",
        "py": "Línlǐ zhījiān xūyào hùxiāng zūnzhòng, hùxiāng bāoróng.",
        "en": "Neighbors need to mutually respect and accommodate one another."
      },
      {
        "zh": "两位选手在比赛结束后友好地互相握手致意。",
        "py": "Liǎng wèi xuǎnshǒu zài bǐsài jiéshù hòu yǒuhǎo de hùxiāng wòshǒu zhìyì.",
        "en": "After the match ended, the two contestants cordially shook hands with each other."
      },
      {
        "zh": "生活在一起，最重要的就是互相理解与信任。",
        "py": "Shēnghuó zài yìqǐ, zuì zhòngyào de jiù shì hùxiāng lǐjiě yǔ xìnrèn.",
        "en": "Living together, the most important thing is mutual understanding and trust."
      }
    ],
    "commonMistakes": [
      "Using a singular subject with 互相 (saying \"我互相帮助\" is impossible; must be \"我们互相帮助\").",
      "Placing 互相 after the verb like English \"help each other\" (saying \"帮助互相\" is wrong; must say \"互相帮助\")."
    ],
    "examStrategy": "In HSK 3 sentence rearrangement, place 互相 directly before the action verb: Plural Subject + 互相 + Verb.",
    "parentLessonSlug": "relationships-and-society",
    "quiz": [
      {
        "id": 1,
        "question": "Which word means \"mutually / each other\" and precedes verbs?",
        "options": [
          "互相",
          "自己",
          "人家",
          "大家"
        ],
        "correctIndex": 0,
        "explanation": "互相 acts as an adverb modifying verbs reciprocally."
      },
      {
        "id": 2,
        "question": "Can the subject of 互相 be a single individual (e.g. 我 or 他)?",
        "options": [
          "No, reciprocal actions require plural subjects (我们, 大家, 双方)",
          "Yes, anytime",
          "Only with past verbs",
          "Only in questions"
        ],
        "correctIndex": 0,
        "explanation": "Mutual action requires at least two participants, hence a plural subject."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"好朋友之间要 ( ___ ) 理解，多沟通。\"",
        "options": [
          "互相",
          "自己",
          "也许",
          "到底"
        ],
        "correctIndex": 0,
        "explanation": "互相理解 (mutually understand)."
      }
    ],
    "parentLessonTitle": "Social Relationships & Neighbors (人际关系与社会交往)",
    "prevRule": {
      "slug": "potential-complements-de-liao",
      "title": "Potential Complements: Verb + 得了 / 不了 (Can / Cannot do)",
      "level": 3
    },
    "nextRule": {
      "slug": "meeting-structure-gen-jianmian",
      "title": "Social Meeting Structure: 跟 / 与... 见面 (Meet with someone)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "prior-completion-yijing-le",
        "title": "Prior Completion: 已经...了 (Already... completed)",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 已经 + Verb Phrase / State + 了"
      },
      {
        "slug": "slight-degree-youdianr",
        "title": "Expressing Slight Degree / Dissatisfaction: 有点儿 + Adjective",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Subject + 有点儿 / 有点 + Negative/Unfavorable Adjective"
      },
      {
        "slug": "prompt-marker-jiu-consequence",
        "title": "Conditional Prompt Marker: 就 indicating Quick Consequence",
        "level": 2,
        "category": "Adverbs",
        "pattern": "Condition / Time Phrase + 就 (jiù) + Verb Phrase"
      },
      {
        "slug": "yue-lai-yue",
        "title": "Progressive Increments: 越来越... (yuè lái yuè)",
        "level": 3,
        "category": "Adverbs",
        "pattern": "Subject + 越来越 + Adjective / Mental Verb (+ 了)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "里",
        "slug": "li-inside",
        "pinyin": "lǐ",
        "meaning": "inside; in",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-7-2",
    "slug": "meeting-structure-gen-jianmian",
    "title": "Social Meeting Structure: 跟 / 与... 见面 (Meet with someone)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Sentence Structure",
    "pattern": "Subject + 跟 / 和 + Person + 见面 (jiànmiàn)",
    "explanation": "见面 (jiànmiàn) is a separable verb (离合词, líhécí). Because the object (面 face) is already built into the compound, it CANNOT directly take an object (*见面他 is ungrammatical). To say \"meet someone\", you must use the prepositional construction: 跟 / 和 + Person + 见面.",
    "structuralVariations": {
      "affirmative": "我今天下午打算跟张老师见个面。 (I plan to meet with Teacher Zhang this afternoon.)",
      "negative": "我们很久没有见面了。 (We haven't met for a long time.)",
      "question": "你打算跟他在哪儿见面？ (Where do you plan to meet with him?)",
      "notes": "Contrast with 见 (transitive verb): 我见他 (I meet him) vs 我跟他见面 (I meet with him)."
    },
    "examples": [
      {
        "zh": "好久不见，我们找个时间一起见个面吧。",
        "py": "Hǎojiǔ bújjiàn, wǒmen zhǎo gè shíjiān yìqǐ jiàn gè miàn ba.",
        "en": "Long time no see; let's find some time to meet up."
      },
      {
        "zh": "明天上午我要跟一位重要的客户在咖啡厅见面。",
        "py": "Míngtiān shàngwǔ wǒ yào gēn yí wèi zhòngyào de kèhù zài kāfēitīng jiànmiàn.",
        "en": "Tomorrow morning I am meeting an important client at a cafe."
      },
      {
        "zh": "他们虽然很多年没见面了，但依然无话不谈。",
        "py": "Tāmen suīrán hěn duō nián méi jiànmiàn le, dàn yīrán wú huà bù tán.",
        "en": "Although they haven't met for many years, they still talk about everything."
      },
      {
        "zh": "请问我们今天几点在哪儿见面合适？",
        "py": "Qǐngwèn wǒmen jīntiān jǐ diǎn zài nǎr jiànmiàn héshì?",
        "en": "Excuse me, what time and where would be suitable for us to meet today?"
      }
    ],
    "commonMistakes": [
      "Placing the person directly after 见面 (saying \"我见面他\" is a major error; write \"我跟他见面\" or \"我见他\").",
      "Forgetting that 见面 is separable (you can say 见个面, 见了面, 见了一次面)."
    ],
    "examStrategy": "A notorious HSK grammar trap! Watch for incorrect sentences like \"我想见面朋友\" in error-identification questions.",
    "parentLessonSlug": "relationships-and-society",
    "quiz": [
      {
        "id": 1,
        "question": "Why is \"我想见面他\" grammatically incorrect?",
        "options": [
          "见面 is a separable verb with an internal object (面) and cannot take an external object directly",
          "见面 can only be used with family",
          "见面 must be followed by 了",
          "他 cannot be an object"
        ],
        "correctIndex": 0,
        "explanation": "见面 is a verb-object compound; the person must be introduced by 跟/和."
      },
      {
        "id": 2,
        "question": "How do you say \"I will meet with him tomorrow\"?",
        "options": [
          "我明天跟他见面。",
          "我明天见面他。",
          "我见面在明天他。",
          "他跟我在明天见面见。"
        ],
        "correctIndex": 0,
        "explanation": "Subject + 跟 + Person + 见面."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"我们很多年没有 ( ___ ) 了，真想念大家。\"",
        "options": [
          "见面",
          "看法",
          "发现",
          "注意"
        ],
        "correctIndex": 0,
        "explanation": "Meeting socially uses 见面."
      }
    ],
    "parentLessonTitle": "Social Relationships & Neighbors (人际关系与社会交往)",
    "prevRule": {
      "slug": "reciprocal-interaction-huxiang",
      "title": "Reciprocal Mutual Action: 互相 + Verb (Each other / Mutually)",
      "level": 3
    },
    "nextRule": {
      "slug": "willingness-modal-yuanyi",
      "title": "Willingness & Volition: 愿意 + Verb (Willing to...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "点",
        "slug": "dian",
        "pinyin": "diǎn",
        "meaning": "o'clock; point; dot",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-7-3",
    "slug": "willingness-modal-yuanyi",
    "title": "Willingness & Volition: 愿意 + Verb (Willing to...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Modal Verbs",
    "pattern": "Subject + 愿意 (yuànyì) + Verb Phrase",
    "explanation": "愿意 (yuànyì) expresses voluntary willingness, readiness, or consent from the heart (\"willing to / would like to\"). It implies active personal consent rather than mere capability or obligation.",
    "structuralVariations": {
      "affirmative": "我很愿意参加这次志愿者活动。 (I am very willing to participate in this volunteer activity.)",
      "negative": "他不愿意接受别人的施舍。 (He is unwilling to accept charity from others.)",
      "question": "你愿意跟我一起去北京旅游吗？ (Are you willing to travel to Beijing with me?)",
      "notes": "Common in proposals and vows: \"你愿意嫁给我吗？\" (Will you marry me?)"
    },
    "examples": [
      {
        "zh": "只要能学到真本领，多苦我都愿意承受。",
        "py": "Zhǐyào néng xuédào zhēn běnlǐng, duō kǔ wǒ dōu yuànyì chéngshòu.",
        "en": "As long as I can learn real skills, no matter how hard it is, I am willing to bear it."
      },
      {
        "zh": "大家都非常愿意帮助遇到困难的同学。",
        "py": "Dàjiā dōu fēicháng yuànyì bāngzhù yùdào kùnnan de tóngxué.",
        "en": "Everyone is very willing to help classmates facing difficulties."
      },
      {
        "zh": "他性格比较内向，平时不太愿意在人多的场合发言。",
        "py": "Tā xìnggé bǐjiào nèixiàng, píngshí bú tài yuànyì zài rén duō de chǎnghé fāyán.",
        "en": "He has an introverted personality and is usually not very willing to speak in crowded settings."
      },
      {
        "zh": "请问你愿意加入我们的创业团队吗？",
        "py": "Qǐngwèn nǐ yuànyì jiārù wǒmen de chuàngyè tuánduì ma?",
        "en": "Excuse me, are you willing to join our startup team?"
      }
    ],
    "commonMistakes": [
      "Confusing 愿意 (volition/consent) with 想 (desire/wish) or 会 (learned ability).",
      "Using 愿意 for external permission (use 可以 or 能 for permission, not 愿意)."
    ],
    "examStrategy": "In HSK 3 Reading Section 3 interpersonal passages, 愿意 indicates the protagonist's personal motives and consent.",
    "parentLessonSlug": "relationships-and-society",
    "quiz": [
      {
        "id": 1,
        "question": "Which modal verb expresses heartfelt willingness and consent (\"willing to\")?",
        "options": [
          "愿意",
          "应该",
          "必须",
          "能"
        ],
        "correctIndex": 0,
        "explanation": "愿意 signifies personal willingness and volition."
      },
      {
        "id": 2,
        "question": "How is 愿意 negated?",
        "options": [
          "不愿意",
          "没愿意",
          "别愿意",
          "不愿了"
        ],
        "correctIndex": 0,
        "explanation": "Modal verbs are negated with 不 (不愿意)."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他很善良，总是 ( ___ ) 帮助身边的人。\"",
        "options": [
          "愿意",
          "以为",
          "根据",
          "关于"
        ],
        "correctIndex": 0,
        "explanation": "Being willing to help others takes 愿意."
      }
    ],
    "parentLessonTitle": "Social Relationships & Neighbors (人际关系与社会交往)",
    "prevRule": {
      "slug": "meeting-structure-gen-jianmian",
      "title": "Social Meeting Structure: 跟 / 与... 见面 (Meet with someone)",
      "level": 3
    },
    "nextRule": {
      "slug": "service-beneficiary-wei-fuwu",
      "title": "Service Beneficiary Marker: 为...服务 / 着想 (For / On behalf of)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "necessity-dei-yao",
        "title": "Expressing Obligation & Necessity: 得 / 要",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 得 (děi) / 要 + Verb Phrase"
      },
      {
        "slug": "ability-vs-permission-neng-keyi",
        "title": "Modal Auxiliaries: 能 (nēng) vs 可以 (kěyǐ)",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 能 / 可以 / 会 + Verb Phrase"
      },
      {
        "slug": "intention-verb-dasan",
        "title": "Expressing Future Plans & Intentions: 打算 + Verb",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 打算 (dǎsuan) + Verb Phrase"
      },
      {
        "slug": "strict-obligation-bixu",
        "title": "Strict Imperative Obligation: 必须 + Verb (Must / Mandatory)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 必须 (bìxū) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "本",
        "slug": "ben",
        "pinyin": "běn",
        "meaning": "measure word for books",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-8-1",
    "slug": "service-beneficiary-wei-fuwu",
    "title": "Service Beneficiary Marker: 为...服务 / 着想 (For / On behalf of)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Prepositions",
    "pattern": "Subject + 为 (wèi) + Beneficiary + Verb Phrase",
    "explanation": "为 (pronounced 4th tone wèi) acts as a preposition introducing the entity for whose benefit, service, or interest an action is carried out (\"for / on behalf of / for the sake of\"). Common fixed collocations include 为人民服务 (serve the people) and 为别人着想 (consider others).",
    "structuralVariations": {
      "affirmative": "我们全心全意为客户提供优质服务。 (We provide high quality service for clients with all our heart.)",
      "negative": "他做事情从来不为别人着想。 (He never considers others when doing things.)",
      "question": "你能为我们介绍一下你们的产品吗？ (Can you introduce your products for us?)",
      "notes": "Contrast 为 (wèi, for benefit) with 给 (gěi, direct transfer/dative)."
    },
    "examples": [
      {
        "zh": "图书馆全心全意为全校师生服务。",
        "py": "Túshūguǎn quánxīn quányì wèi quán xiào shīshēng fúwù.",
        "en": "The library serves all teachers and students of the university whole-heartedly."
      },
      {
        "zh": "做事情不能只考虑自己，也要多为他人着想。",
        "py": "Zuò shìqing bù néng zhǐ kǎolǜ zìjǐ, yě yào duō wèi tārén zhuóxiǎng.",
        "en": "When doing things, one cannot just consider oneself; one must also consider others."
      },
      {
        "zh": "大家一起举杯，为我们的友谊干杯！",
        "py": "Dàjiā yìqǐ jǔ bēi, wèi wǒmen de yǒuyì gānbēi!",
        "en": "Everyone raise your glasses together: a toast to our friendship!"
      },
      {
        "zh": "志愿者们无私地为社区老人提供帮助。",
        "py": "Zhìyuànzhě men wúsī de wèi shèqū lǎorén tígōng bāngzhù.",
        "en": "Volunteers selflessly provide assistance for elderly residents in the community."
      }
    ],
    "commonMistakes": [
      "Pronouncing 为 as 2nd tone wéi in prepositional benefit constructions (it must be pronounced 4th tone wèi).",
      "Confusing 为...服务 with 给...服务 (为 is formal and standard for service beneficiaries)."
    ],
    "examStrategy": "In HSK 3 business and social service dialogues, \"为...提供服务\" and \"为...干杯\" are prominent formulas.",
    "parentLessonSlug": "business-and-economy",
    "quiz": [
      {
        "id": 1,
        "question": "Which preposition completes the toast: \"( ___ ) 我们的合作干杯！\"?",
        "options": [
          "为",
          "给",
          "从",
          "离"
        ],
        "correctIndex": 0,
        "explanation": "Toasts for a purpose or beneficiary take 为 (wèi)."
      },
      {
        "id": 2,
        "question": "What tone is 为 pronounced when functioning as \"for the benefit of\"?",
        "options": [
          "4th tone (wèi)",
          "2nd tone (wéi)",
          "1st tone (wēi)",
          "Neutral tone (wei)"
        ],
        "correctIndex": 0,
        "explanation": "Preposition of beneficiary/purpose is pronounced 4th tone wèi."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"我们店随时 ( ___ ) 顾客提供退换货服务。\"",
        "options": [
          "为",
          "在",
          "向",
          "离"
        ],
        "correctIndex": 0,
        "explanation": "Providing service for customers uses 为 + Beneficiary + 提供服务."
      }
    ],
    "parentLessonTitle": "Business, Commerce & Job Interviews (商务往来与求职)",
    "prevRule": {
      "slug": "willingness-modal-yuanyi",
      "title": "Willingness & Volition: 愿意 + Verb (Willing to...)",
      "level": 3
    },
    "nextRule": {
      "slug": "evidential-preposition-genju",
      "title": "Evidential Preposition: 根据 + Source / Evidence (According to...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "来",
        "slug": "lai",
        "pinyin": "lái",
        "meaning": "to come; to arrive",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-8-2",
    "slug": "evidential-preposition-genju",
    "title": "Evidential Preposition: 根据 + Source / Evidence (According to...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Prepositions",
    "pattern": "根据 (gēnjù) + Source / Evidence / Facts, Subject + Conclusion / Action",
    "explanation": "根据 (gēnjù) functions as a preposition meaning \"according to / on the basis of / based on\". It cites authoritative data, news reports, weather forecasts, research, or regulations to substantiate a premise.",
    "structuralVariations": {
      "affirmative": "根据天气预报，明天下午会有一场大暴雨。 (According to the weather forecast, there will be a heavy downpour tomorrow afternoon.)",
      "negative": "不能单凭主观猜测做出决定。",
      "question": "你是根据什么得出这个结论的？ (On what basis did you arrive at this conclusion?)",
      "notes": "Can also be a noun: 毫无根据 (without any factual basis)."
    },
    "examples": [
      {
        "zh": "根据调查报告，越来越多的人选择绿色出行。",
        "py": "Gēnjù diàochá bàogào, yuè lái yuè duō de rén xuǎnzé lǜsè chūxíng.",
        "en": "According to the survey report, more and more people choose green travel."
      },
      {
        "zh": "医生会根据患者的具体病情制定治疗方案。",
        "py": "Yīshēng huì gēnjù huànzhě de jùtǐ bìngqíng zhìdìng zhìliáo fāng'àn.",
        "en": "The doctor will formulate a treatment plan based on the patient's specific condition."
      },
      {
        "zh": "根据学校规定，考试期间禁止使用任何电子设备。",
        "py": "Gēnjù xuéxiào guīdìng, kǎoshì qījiān jǐnzhǐ shǐyòng rènhé diànzǐ shèbèi.",
        "en": "According to school regulations, using any electronic devices during exams is prohibited."
      },
      {
        "zh": "我们应该根据市场需求随时调整销售策略。",
        "py": "Wǒmen yīnggāi gēnjù shìchǎng xūqiú suíshí tiáozhěng xiàoshòu cèlüè.",
        "en": "We should adjust our sales strategy at any time according to market demand."
      }
    ],
    "commonMistakes": [
      "Placing 根据 at the end of the clause (saying \"明天会下雨根据预报\" is wrong; must say \"根据天气预报，明天会下雨\").",
      "Confusing 根据 (according to facts/sources) with 按照 (following standard procedures/recipes)."
    ],
    "examStrategy": "In HSK 3 Reading Section 3, sentences starting with \"根据短文...\" (According to the passage...) test precise evidence retrieval.",
    "parentLessonSlug": "business-and-economy",
    "quiz": [
      {
        "id": 1,
        "question": "Which preposition cites sources like weather forecasts or regulations (\"according to\")?",
        "options": [
          "根据",
          "关于",
          "为了",
          "如果"
        ],
        "correctIndex": 0,
        "explanation": "根据 (gēnjù) cites sources, evidence, or regulations."
      },
      {
        "id": 2,
        "question": "Where is the phrase \"根据 + Source\" typically positioned?",
        "options": [
          "At the head of the sentence or before the main verb",
          "At the very end after the period",
          "Inside the object",
          "Before numbers only"
        ],
        "correctIndex": 0,
        "explanation": "It acts as an adverbial phrase at the head of the sentence or preverbally."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"( ___ ) 专家研究，每天散步半小时有益长寿。\"",
        "options": [
          "根据",
          "关于",
          "除了",
          "为了"
        ],
        "correctIndex": 0,
        "explanation": "Citing expert research uses 根据."
      }
    ],
    "parentLessonTitle": "Business, Commerce & Job Interviews (商务往来与求职)",
    "prevRule": {
      "slug": "service-beneficiary-wei-fuwu",
      "title": "Service Beneficiary Marker: 为...服务 / 着想 (For / On behalf of)",
      "level": 3
    },
    "nextRule": {
      "slug": "strict-obligation-bixu",
      "title": "Strict Imperative Obligation: 必须 + Verb (Must / Mandatory)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "relative-distance-li-yuan-jin",
        "title": "Relative Distance: A 离 B 远 / 近",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Place A + 离 + Place B + 很远 / 很近 / Number + 公里"
      },
      {
        "slug": "spatial-span-cong-dao",
        "title": "Spatial & Temporal Span: 从...到...",
        "level": 2,
        "category": "Prepositions",
        "pattern": "从 + Start Point + 到 + End Point"
      },
      {
        "slug": "preposition-dui-health",
        "title": "Preposition 对: Expressing Target & Benefit (对...好)",
        "level": 2,
        "category": "Prepositions",
        "pattern": "Subject + 对 + Target + Adjective / Verb Phrase"
      },
      {
        "slug": "directional-preposition-wang",
        "title": "Directional Preposition: 往 + Direction + 走 / 转",
        "level": 2,
        "category": "Prepositions",
        "pattern": "往 + Direction / Place + 走 (walk) / 拐 / 转 (turn)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "会",
        "slug": "hui-can",
        "pinyin": "huì",
        "meaning": "can; be able to; will",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-8-3",
    "slug": "strict-obligation-bixu",
    "title": "Strict Imperative Obligation: 必须 + Verb (Must / Mandatory)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Modal Verbs",
    "pattern": "Subject + 必须 (bìxū) + Verb Phrase",
    "explanation": "必须 (bìxū) is an adverbial auxiliary denoting strict necessity, legal requirement, or mandatory obligation (\"must / have to / compulsory\"). The negative of 必须 is 不用 (búyòng) or 不必 (búbì, \"need not\"), or 不准 / 不得 (\"not permitted\") for prohibitions.",
    "structuralVariations": {
      "affirmative": "参加考试必须携带身份证和准考证。 (Taking the exam must bring ID card and admission ticket.)",
      "negative": "明天不用上课。 / 考场内不准携带手机。 (Need not attend class / Mobile phones strictly not permitted.)",
      "question": "我们必须今天完成吗？ (Must we finish today?)",
      "notes": "Contrast 必须 (bìxū, adverb \"must\") with 必需 (bìxū, adjective/verb \"indispensable/essential\")."
    },
    "examples": [
      {
        "zh": "进入实验室之前，每个人都必须穿好白大褂。",
        "py": "Jìnrù shíyànshì zhīqián, měi gè rén dōu bìxū chuān hǎo bái dàguà.",
        "en": "Before entering the laboratory, everyone must put on a lab coat."
      },
      {
        "zh": "要想学好一门外语，你必须付出持续的努力。",
        "py": "Yào xiǎng xué hǎo yì mén wàiyǔ, nǐ bìxū fùchū chíxù de nǔlì.",
        "en": "If you want to master a foreign language, you must invest continuous effort."
      },
      {
        "zh": "过马路时必须看清红绿灯，注意交通安全。",
        "py": "Guò mǎlù shí bìxū kàn qīng hónglǜdēng, zhùyì jiāotōng ānquán.",
        "en": "When crossing the street you must see the traffic lights clearly and watch traffic safety."
      },
      {
        "zh": "所有员工每个月都必须按时参加业务培训。",
        "py": "Suǒyǒu yuángōng měi gè yuè dōu bìxū ànshí cānjiā yèwù péixùn.",
        "en": "All employees must participate in professional training on time each month."
      }
    ],
    "commonMistakes": [
      "Negating 必须 with 不必须 (there is no such phrase in Chinese; use 不用 or 不必 for \"don't have to\").",
      "Confusing the homophones 必须 (must do something) and 必需 (essential goods/necessities)."
    ],
    "examStrategy": "In HSK 3 public sign notices and rules, 必须 highlights strict compulsory instructions.",
    "parentLessonSlug": "business-and-economy",
    "quiz": [
      {
        "id": 1,
        "question": "What is the standard negative equivalent when responding to \"我必须去吗？\" (Must I go?)",
        "options": [
          "你不用去 / 你不必去",
          "你不能必须去",
          "你没必须去",
          "你别必须去"
        ],
        "correctIndex": 0,
        "explanation": "The negative counterpart for necessity is 不用 or 不必."
      },
      {
        "id": 2,
        "question": "Which word conveys compulsory obligation (\"must\")?",
        "options": [
          "必须",
          "愿意",
          "可以",
          "打算"
        ],
        "correctIndex": 0,
        "explanation": "必须 denotes compulsory, non-negotiable obligation."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"乘坐飞机时 ( ___ ) 系好安全带。\"",
        "options": [
          "必须",
          "愿意",
          "觉得",
          "认为"
        ],
        "correctIndex": 0,
        "explanation": "Safety regulations require 必须 (must)."
      }
    ],
    "parentLessonTitle": "Business, Commerce & Job Interviews (商务往来与求职)",
    "prevRule": {
      "slug": "evidential-preposition-genju",
      "title": "Evidential Preposition: 根据 + Source / Evidence (According to...)",
      "level": 3
    },
    "nextRule": {
      "slug": "exemplification-biru",
      "title": "Exemplification & Instance Listing: 比如 / 比方说 (For example...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "necessity-dei-yao",
        "title": "Expressing Obligation & Necessity: 得 / 要",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 得 (děi) / 要 + Verb Phrase"
      },
      {
        "slug": "ability-vs-permission-neng-keyi",
        "title": "Modal Auxiliaries: 能 (nēng) vs 可以 (kěyǐ)",
        "level": 2,
        "category": "Modal Verbs",
        "pattern": "Subject + 能 / 可以 / 会 + Verb Phrase"
      },
      {
        "slug": "intention-verb-dasan",
        "title": "Expressing Future Plans & Intentions: 打算 + Verb",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 打算 (dǎsuan) + Verb Phrase"
      },
      {
        "slug": "willingness-modal-yuanyi",
        "title": "Willingness & Volition: 愿意 + Verb (Willing to...)",
        "level": 3,
        "category": "Modal Verbs",
        "pattern": "Subject + 愿意 (yuànyì) + Verb Phrase"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-9-1",
    "slug": "exemplification-biru",
    "title": "Exemplification & Instance Listing: 比如 / 比方说 (For example...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Sentence Structure",
    "pattern": "General Statement, 比如 (bǐrú) / 比方说 + Example 1, Example 2...",
    "explanation": "比如 (bǐrú) and 比方说 (bǐfang shuō) introduce concrete illustrations, instances, or examples supporting a preceding general generalization (\"for example / such as / take... for instance\").",
    "structuralVariations": {
      "affirmative": "我喜欢很多户外运动，比如跑步、爬山和骑自行车。 (I like many outdoor sports, for example running, hiking, and cycling.)",
      "negative": "不常用否定形式。",
      "question": "你能举个例子吗，比如哪一方面？ (Can you give an example, such as which aspect?)",
      "notes": "Can be placed at the head of a clause or integrated inside a list."
    },
    "examples": [
      {
        "zh": "中国有很多著名的传统节日，比如春节、中秋节和端午节。",
        "py": "Zhōngguó yǒu hěn duō zhùmíng de chuántǒng jiérì, bǐrú Chūnjié, Zhōngqiūjié hé Duānwǔjié.",
        "en": "China has many famous traditional festivals, such as Spring Festival, Mid-Autumn Festival, and Dragon Boat Festival."
      },
      {
        "zh": "南方有很多好吃的特色水果，比如荔枝、芒果和龙眼。",
        "py": "Nánfāng yǒu hěn duō hǎochī de tèsè shuǐguǒ, bǐrú lìzhī, mángguǒ hé lóngyǎn.",
        "en": "The south has many delicious specialty fruits, such as lychee, mango, and longan."
      },
      {
        "zh": "学外语要掌握很多技巧，比方说每天背单词和听录音。",
        "py": "Xué wàiyǔ yào zhǎngwò hěn duō jìqiǎo, bǐfang shuō měitiān bèi dāncí hé tīng lùyīn.",
        "en": "Learning foreign languages requires mastering many skills, for example memorizing vocabulary and listening to audio daily."
      },
      {
        "zh": "我们应该多吃蔬菜，比如菠菜、西红柿和黄瓜。",
        "py": "Wǒmen yīnggāi duō chī shūcài, bǐrú bōcài, xīhóngshì hé huángguā.",
        "en": "We should eat more vegetables, such as spinach, tomatoes, and cucumbers."
      }
    ],
    "commonMistakes": [
      "Placing 比如 at the end of the list (saying \"春节比如\" is wrong; must write \"比如春节\").",
      "Confusing 比如 (for example) with 比 (comparison marker)."
    ],
    "examStrategy": "In HSK 3 expository reading texts, examples introduced by 比如 provide immediate contextual definitions for unfamiliar vocabulary.",
    "parentLessonSlug": "culture-and-traditions",
    "quiz": [
      {
        "id": 1,
        "question": "Which word introduces concrete examples (\"such as / for instance\")?",
        "options": [
          "比如 / 比方说",
          "因为",
          "所以",
          "关于"
        ],
        "correctIndex": 0,
        "explanation": "比如 introduces concrete examples."
      },
      {
        "id": 2,
        "question": "Where is 比如 placed relative to the listed items?",
        "options": [
          "Directly before the items being illustrated",
          "After all items at the end of the sentence",
          "Before the subject only",
          "Inside the verb"
        ],
        "correctIndex": 0,
        "explanation": "比如 precedes the illustrative examples."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他会很多门乐器，( ___ ) 钢琴、吉他和小提琴。\"",
        "options": [
          "比如",
          "比",
          "对",
          "从"
        ],
        "correctIndex": 0,
        "explanation": "Listing instruments takes 比如."
      }
    ],
    "parentLessonTitle": "Culture, Festivals & Ancient Customs (传统文化与民俗)",
    "prevRule": {
      "slug": "strict-obligation-bixu",
      "title": "Strict Imperative Obligation: 必须 + Verb (Must / Mandatory)",
      "level": 3
    },
    "nextRule": {
      "slug": "metaphorical-similarity-xiang-yiyang",
      "title": "Metaphorical Simile: 像...一样 (Like... / Resembling...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "菜",
        "slug": "cai",
        "pinyin": "cài",
        "meaning": "dish; vegetable",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-9-2",
    "slug": "metaphorical-similarity-xiang-yiyang",
    "title": "Metaphorical Simile: 像...一样 (Like... / Resembling...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Comparisons",
    "pattern": "Subject + 像 + Benchmark + 一样 (+ Adjective / Verb)",
    "explanation": "像...一样 (xiàng... yíyàng) creates a simile or metaphorical comparison, expressing that the subject resembles or behaves identically to the benchmark (\"just like / as if...\").",
    "structuralVariations": {
      "affirmative": "弯弯的月亮像一条小船一样。 (The curved crescent moon is just like a small boat.)",
      "negative": "他不象以前那样爱说话了。 (He isn't as talkative as before.)",
      "question": "你看他跑得像不像一阵风一样？ (Does he run like a gust of wind?)",
      "notes": "一样 can be replaced with 那样 or 一般 in literary descriptions."
    },
    "examples": [
      {
        "zh": "红红的太阳像一个大火球一样挂在天空。",
        "py": "Hónghóng de tàiyáng xiàng yí gè dà huǒqiú yíyàng guà zài tiānkōng.",
        "en": "The red sun hung in the sky just like a big fireball."
      },
      {
        "zh": "老师对待每一个学生都像对待自己的孩子一样亲切。",
        "py": "Lǎoshī duìdài měi yí gè xuésheng dōu xiàng duìdài zìjǐ de háizi yíyàng qīnqiè.",
        "en": "The teacher treats every student kindly, just like treating her own children."
      },
      {
        "zh": "时间像流水一样，不知不觉就过去了一年。",
        "py": "Shíjiān xiàng liúshuǐ yíyàng, bùzhī bùjué jiù guòqù le yì nián.",
        "en": "Time is like flowing water; before we knew it, a year had slipped away."
      },
      {
        "zh": "她笑起来的眼睛弯弯的，像月牙一样漂亮。",
        "py": "Tā xiào qǐlái de yǎnjing wānwān de, xiàng yuèyá yíyàng piàoliang.",
        "en": "Her eyes when she smiles are crescent-shaped, as pretty as a crescent moon."
      }
    ],
    "commonMistakes": [
      "Omitting 一样 (saying \"太阳像大火球\" is acceptable colloquially, but standard HSK testing checks the complete paired pattern \"像...一样\").",
      "Confusing 像...一样 (simile comparison) with 跟...一样 (literal equative equality)."
    ],
    "examStrategy": "In HSK 3 descriptive reading passages, similes with 像...一样 frequently feature in vivid scenic descriptions.",
    "parentLessonSlug": "culture-and-traditions",
    "quiz": [
      {
        "id": 1,
        "question": "Which word pairs with 像 in simile structures (\"just like...\")?",
        "options": [
          "一样 / 那样",
          "很多",
          "虽然",
          "所以"
        ],
        "correctIndex": 0,
        "explanation": "像 pairs with 一样 or 那样 to form similes."
      },
      {
        "id": 2,
        "question": "What rhetorical device does 像...一样 create in Chinese?",
        "options": [
          "Simile / Metaphorical comparison",
          "Passive voice",
          "Strict prohibition",
          "Direct imperative command"
        ],
        "correctIndex": 0,
        "explanation": "像...一样 forms figurative similes."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"秋天的落叶 ( ___ ) 蝴蝶一样在空中飞舞。\"",
        "options": [
          "像",
          "从",
          "离",
          "往"
        ],
        "correctIndex": 0,
        "explanation": "Comparing falling leaves to butterflies uses 像."
      }
    ],
    "parentLessonTitle": "Culture, Festivals & Ancient Customs (传统文化与民俗)",
    "prevRule": {
      "slug": "exemplification-biru",
      "title": "Exemplification & Instance Listing: 比如 / 比方说 (For example...)",
      "level": 3
    },
    "nextRule": {
      "slug": "adverbial-manner-particle-de",
      "title": "Adverbial Manner Structural Particle: 地 (de)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "comparison-bi",
        "title": "Comparison Structure 比 (bǐ)",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective"
      },
      {
        "slug": "comparative-increment-yidianr",
        "title": "Comparative Degree: Adjective + 一点儿 / 一些 / 得多",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Adjective + 一点儿 / 一些 (Slight) OR 得多 / 多了 (Major)"
      },
      {
        "slug": "comparative-negation-meiyou",
        "title": "Negative Comparison: A 没有 B (那么 / 这么) + Adjective",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 没有 + Noun B + (那么 / 这么) + Adjective"
      },
      {
        "slug": "comparative-large-margin-deduo",
        "title": "Comparative Large Margin: A 比 B + Adjective + 得多 / 多了",
        "level": 2,
        "category": "Comparisons",
        "pattern": "Noun A + 比 + Noun B + Adjective + 得多 / 多了"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "爱",
        "slug": "ai-love",
        "pinyin": "ài",
        "meaning": "to love; affection",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-9-3",
    "slug": "adverbial-manner-particle-de",
    "title": "Adverbial Manner Structural Particle: 地 (de)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Particles",
    "pattern": "Adjective / Modifier + 地 (de) + Verb Phrase",
    "explanation": "The structural particle 地 (pronounced de in this role) functions similarly to the \"-ly\" suffix in English. It links an adjective or descriptive adverbial modifier to the following action verb, describing the manner or mood in which an action is performed.",
    "structuralVariations": {
      "affirmative": "大家认真地听老师讲课。 (Everyone attentively listened to the teacher's lecture.)",
      "negative": "他头也不回地走了。 (He walked away without even turning his head.)",
      "question": "你为什么这么着急地走？ (Why are you leaving in such a hurry?)",
      "notes": "Master the 3 homophonous particles: 的 (noun modifier: 漂亮的衣服), 地 (verb modifier: 认真地写), 得 (complement: 跑得快)."
    },
    "examples": [
      {
        "zh": "同学们在教室里安静地做着随堂测试。",
        "py": "Tóngxuémen zài jiàoshì lǐ ānjìng de zuò zhe suítáng cèshì.",
        "en": "Classmates did the quiz quietly in the classroom."
      },
      {
        "zh": "听到孩子获奖的消息，母亲开心地笑了。",
        "py": "Tīngdào háizi huòjiǎng de xiāoxi, mǔqīn kāixīn de xiào le.",
        "en": "Hearing the news of her child winning an award, the mother smiled joyfully."
      },
      {
        "zh": "他飞快地跑向火车站，生怕赶不上末班车。",
        "py": "Tā fēikuài de pǎo xiàng huǒchēzhàn, shēngpà gǎnbushàng mòbānchē.",
        "en": "He ran swiftly toward the train station, fearing he might miss the last train."
      },
      {
        "zh": "老师耐心地给学生解答每一道难题。",
        "py": "Lǎoshī nàixīn de gěi xuésheng jiědá měi yí dào nántí.",
        "en": "The teacher patiently answered every difficult question for students."
      }
    ],
    "commonMistakes": [
      "Using 的 instead of 地 before action verbs (writing \"开心的笑\" instead of \"开心地笑\").",
      "Confusing 地 (before verbs: 慢慢地走) with 得 (after verbs: 走得慢)."
    ],
    "examStrategy": "The golden rule for HSK 3 grammar: Adjective + 的 + Noun; Adjective + 地 + Verb; Verb + 得 + Adjective.",
    "parentLessonSlug": "culture-and-traditions",
    "quiz": [
      {
        "id": 1,
        "question": "Which particle correctly links the adjective to the verb: \"认真 ( ___ ) 学习\"?",
        "options": [
          "地",
          "的",
          "得",
          "着"
        ],
        "correctIndex": 0,
        "explanation": "Modifying a verb (学习) requires the adverbial particle 地."
      },
      {
        "id": 2,
        "question": "What is the golden tripartite distinction between 的, 地, and 得?",
        "options": [
          "的 + Noun, 地 + Verb, Verb + 得",
          "They are randomly chosen",
          "得 is only for past actions",
          "地 is only used in poetry"
        ],
        "correctIndex": 0,
        "explanation": "的 precedes nouns; 地 precedes verbs; 得 follows verbs."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他高高兴兴 ( ___ ) 回了家。\"",
        "options": [
          "地",
          "的",
          "得",
          "了"
        ],
        "correctIndex": 0,
        "explanation": "Reduplicated adjective modifying verb 回家 takes 地."
      }
    ],
    "parentLessonTitle": "Culture, Festivals & Ancient Customs (传统文化与民俗)",
    "prevRule": {
      "slug": "metaphorical-similarity-xiang-yiyang",
      "title": "Metaphorical Simile: 像...一样 (Like... / Resembling...)",
      "level": 3
    },
    "nextRule": {
      "slug": "causative-pivotal-rang-shi",
      "title": "Causative Pivotal Constructions: 让 / 使 / 叫 (Make / Cause)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "possession-particle-de",
        "title": "Possessive & Attributive Particle 的 (de)",
        "level": 1,
        "category": "Particles",
        "pattern": "Possessor / Modifier + 的 + Noun"
      },
      {
        "slug": "attributive-modification-de",
        "title": "Attributive Modification with 的: Adj + 的 + Noun",
        "level": 1,
        "category": "Particles",
        "pattern": "Two-syllable Adj + 的 + Noun"
      },
      {
        "slug": "continuous-particle-ne-query",
        "title": "Contextual Query & State Continuity with 呢 (ne)",
        "level": 1,
        "category": "Particles",
        "pattern": "Noun / Pronoun + 呢？"
      },
      {
        "slug": "change-of-situation-le",
        "title": "Modal Particle 了: Change of State or Situation",
        "level": 2,
        "category": "Particles",
        "pattern": "Predicate / Sentence + 了 (Sentence-Final)"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "回",
        "slug": "hui-return",
        "pinyin": "huí",
        "meaning": "to return; to go back",
        "level": 1
      },
      {
        "hanzi": "家",
        "slug": "jia",
        "pinyin": "jiā",
        "meaning": "family; home",
        "level": 1
      },
      {
        "hanzi": "开",
        "slug": "kai",
        "pinyin": "kāi",
        "meaning": "to open; to drive",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-10-1",
    "slug": "causative-pivotal-rang-shi",
    "title": "Causative Pivotal Constructions: 让 / 使 / 叫 (Make / Cause)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Sentence Structure",
    "pattern": "Cause / Agent + 让 (ràng) / 使 (shǐ) / 叫 (jiào) + Person / Entity + Verb / Adj",
    "explanation": "In causative pivotal sentences (兼语句, jiānyǔjù), the pivotal noun serves as both the object of the causative verb (让/使/叫) and the subject of the subsequent predicate (\"make / cause / let someone do something\"). 使 is formal and written; 让 is universal in speech and writing; 叫 is colloquial.",
    "structuralVariations": {
      "affirmative": "这个感人的故事让很多人流下了眼泪。 (This moving story made many people shed tears.)",
      "negative": "别让他太难过了。 (Don't make him too sad.)",
      "question": "是什么原因让你做出了这个决定？ (What reason caused you to make this decision?)",
      "notes": "使 typically takes abstract or written causes: 这次经历使我懂得了珍惜 (This experience made me understand how to cherish)."
    },
    "examples": [
      {
        "zh": "老师的鼓励让我对未来充满了信心。",
        "py": "Lǎoshī de gǔlì ràng wǒ duì wèilái chōngmǎn le xìnxīn.",
        "en": "The teacher's encouragement filled me with confidence in the future."
      },
      {
        "zh": "长期的户外锻炼使他的身体变得非常健康。",
        "py": "Chángqī de hùwài duànliàn shǐ tā de shēntǐ biànde fēicháng jiànkāng.",
        "en": "Long-term outdoor exercise made his body become extremely healthy."
      },
      {
        "zh": "请大家安静，不要让噪音影响其他病人休息。",
        "py": "Qǐng dàjiā ānjìng, búyào ràng zàoyīn yǐngxiǎng qítā bìngrén xiūxi.",
        "en": "Please be quiet everyone; don't let noise affect other patients' rest."
      },
      {
        "zh": "突如其来的大雨叫我们措手不及。",
        "py": "Tūrúqílái de dàyǔ jiào wǒmen cuòshǒubùjí.",
        "en": "The unexpected heavy rain caught us completely off guard."
      }
    ],
    "commonMistakes": [
      "Inserting an extra preposition like 对 or 给 before the pivotal noun (saying \"让我对他高兴\" is wrong; must say \"让我很高兴\").",
      "Confusing 使 (causative \"to cause\") with 是 (copula \"am/is/are\")."
    ],
    "examStrategy": "In HSK 3 Writing Part 1 unscrambling, place the causative verb directly after the cause: Cause + 让/使 + Object + Predicate.",
    "parentLessonSlug": "hsk3-writing-section",
    "quiz": [
      {
        "id": 1,
        "question": "Which causative verb is most commonly used in formal written Mandarin?",
        "options": [
          "使",
          "叫",
          "让",
          "得"
        ],
        "correctIndex": 0,
        "explanation": "使 (shǐ) is the formal written causative verb."
      },
      {
        "id": 2,
        "question": "What is the role of the noun directly following 让 in a pivotal sentence?",
        "options": [
          "It is the object of 让 AND the subject of the following verb",
          "It is only the subject of the entire sentence",
          "It is an adverb of manner",
          "It has no grammatical role"
        ],
        "correctIndex": 0,
        "explanation": "In a pivotal (兼语) construction, the noun serves as dual object-subject."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"这次旅行 ( ___ ) 我开阔了眼界。\"",
        "options": [
          "让 / 使",
          "给",
          "被",
          "向"
        ],
        "correctIndex": 0,
        "explanation": "Causative structure: 旅行 + 让/使 + 我 + 开阔了眼界."
      }
    ],
    "parentLessonTitle": "HSK 3 Writing Mastery: Syntax & Characters (书写专攻与句型重组)",
    "prevRule": {
      "slug": "adverbial-manner-particle-de",
      "title": "Adverbial Manner Structural Particle: 地 (de)",
      "level": 3
    },
    "nextRule": {
      "slug": "necessary-condition-zhiyou-cai",
      "title": "Exclusive Necessary Condition: 只有...才... (Only if... then...)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "statement-shi-identity",
        "title": "Stating Identity & Equational Sentences with 是 (shì)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Subject + 是 + Noun Phrase"
      },
      {
        "slug": "polite-formula-hen-gaoxing",
        "title": "Polite Social Formulas: 很高兴认识你",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "(我) + 很高兴 + 认识 + 你"
      },
      {
        "slug": "measure-word-kou-family",
        "title": "Measure Word for Family Members: 口 (kǒu)",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "Number + 口 + 人"
      },
      {
        "slug": "polite-request-qing-gei-wo",
        "title": "Polite Requests with 请 (qǐng) and 请给我",
        "level": 1,
        "category": "Sentence Structure",
        "pattern": "请 + (给 + 我) + Noun / Verb"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      },
      {
        "hanzi": "个",
        "slug": "ge",
        "pinyin": "ge",
        "meaning": "general measure word",
        "level": 1
      },
      {
        "hanzi": "很",
        "slug": "hen",
        "pinyin": "hěn",
        "meaning": "very; quite",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-10-2",
    "slug": "necessary-condition-zhiyou-cai",
    "title": "Exclusive Necessary Condition: 只有...才... (Only if... then...)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Complex Sentences",
    "pattern": "只有 + Sole Necessary Condition, Subject + 才 + Result",
    "explanation": "只有...才... (zhǐyǒu... cái...) expresses an exclusive, irreplaceable necessary condition (\"only if / only when... can...\"). Without satisfying this specific prerequisite condition, the consequence is completely impossible.",
    "structuralVariations": {
      "affirmative": "只有每天坚持复习，才能考出好成绩。 (Only if you persist in daily review can you get good grades.)",
      "negative": "不坚持练习，汉语就学不好。",
      "question": "只有通过这次考核才能晋升吗？ (Is passing this assessment the only way to get promoted?)",
      "notes": "Strict pairing rule: 只有 ALWAYS pairs with 才. Contrast with 只要 which pairs with 就."
    },
    "examples": [
      {
        "zh": "只有尊重别人，才能获得别人的尊重。",
        "py": "Zhǐyǒu zūnzhòng biérén, cái néng huòdé biérén de zūnzhòng.",
        "en": "Only when you respect others can you gain the respect of others."
      },
      {
        "zh": "只有亲自去一趟长城，你才能真正体会到它的壮观。",
        "py": "Zhǐyǒu qīnzì qù yí tàng Chángchéng, nǐ cái néng zhēnzhèng tǐhuì dào tā de zhuàngguān.",
        "en": "Only by visiting the Great Wall in person can you truly appreciate its grandeur."
      },
      {
        "zh": "只有大家齐心协力，我们才能战胜眼前的困难。",
        "py": "Zhǐyǒu dàjiā qíxīn xiélì, wǒmen cái néng zhànshèng yǎnqián de kùnnan.",
        "en": "Only if everyone works together with one heart can we overcome the difficulties before us."
      },
      {
        "zh": "只有按时吃药并好好休息，病情才会好转。",
        "py": "Zhǐyǒu ànshí chī yào bìng hǎohāo xiūxi, bìngqíng cái huì hǎozhuǎn.",
        "en": "Only by taking medicine on time and resting well will the condition improve."
      }
    ],
    "commonMistakes": [
      "Pairing 只有 with 就 (saying \"只有努力就能成功\" is ungrammatical; you must say \"只有努力才能成功\").",
      "Confusing 只有 (exclusive necessary condition) with 只要 (adequate sufficient condition)."
    ],
    "examStrategy": "Number one HSK 3 correlative pairing rule: 只要...就 vs 只有...才. Never mix their correlatives.",
    "parentLessonSlug": "hsk3-writing-section",
    "quiz": [
      {
        "id": 1,
        "question": "Which correlative adverb strictly pairs with 只有?",
        "options": [
          "才",
          "就",
          "也",
          "都"
        ],
        "correctIndex": 0,
        "explanation": "只有 (only if) strictly pairs with 才 (then and only then)."
      },
      {
        "id": 2,
        "question": "What is the logical prerequisite meaning of 只有...才...?",
        "options": [
          "The condition is the sole, indispensable requirement for the result",
          "The condition is one of many easy options",
          "The result is already finished",
          "The condition is impossible"
        ],
        "correctIndex": 0,
        "explanation": "只有 specifies the sole, mandatory prerequisite."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"只有付出辛勤的汗水，( ___ ) 能收获成功的果实。\"",
        "options": [
          "才",
          "就",
          "却",
          "并"
        ],
        "correctIndex": 0,
        "explanation": "只有 pairs with 才."
      }
    ],
    "parentLessonTitle": "HSK 3 Writing Mastery: Syntax & Characters (书写专攻与句型重组)",
    "prevRule": {
      "slug": "causative-pivotal-rang-shi",
      "title": "Causative Pivotal Constructions: 让 / 使 / 叫 (Make / Cause)",
      "level": 3
    },
    "nextRule": {
      "slug": "rhetorical-question-bushi-ma",
      "title": "Rhetorical Questions: 不是...吗？ (Isn't it true that...?)",
      "level": 3
    },
    "relatedRules": [
      {
        "slug": "concession-suiran-danshi",
        "title": "Concession Structure: 虽然...但是... (Although... but...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "虽然 + Clause 1, 但是 / 可是 + Clause 2"
      },
      {
        "slug": "exclusive-addition-chule-hai",
        "title": "Inclusive Addition: 除了...还 / 也... (Besides... also...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "除了 + Item A + (以外), Subject + 还 / 也 + Item B"
      },
      {
        "slug": "cause-and-effect-yinwei-suoyi",
        "title": "Cause and Effect: 因为...所以... (Because... therefore...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "因为 + Reason Clause, 所以 + Result Clause"
      },
      {
        "slug": "sequential-actions-xian-ranhou",
        "title": "Sequential Temporal Actions: 先...然后... (First... then...)",
        "level": 2,
        "category": "Complex Sentences",
        "pattern": "Subject + 先 + Action 1, 然后 / 再 + Action 2"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "吃",
        "slug": "chi",
        "pinyin": "chī",
        "meaning": "to eat",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "汉语",
        "slug": "hanyu",
        "pinyin": "Hànyǔ",
        "meaning": "Chinese language",
        "level": 1
      },
      {
        "hanzi": "好",
        "slug": "hao",
        "pinyin": "hǎo",
        "meaning": "good; well; fine",
        "level": 1
      }
    ]
  },
  {
    "id": "gp-l3-10-3",
    "slug": "rhetorical-question-bushi-ma",
    "title": "Rhetorical Questions: 不是...吗？ (Isn't it true that...?)",
    "level": 3,
    "cefr": "B1 (Threshold)",
    "category": "Questions",
    "pattern": "Subject + 不是 + Predicate + 吗？",
    "explanation": "不是...吗？ (bú shì... ma?) forms a rhetorical question used to remind the listener of an obvious fact, emphasize agreement, or express mild reprimand/incredulity (\"Isn't it...? / Didn't you say...?\"). An affirmative statement expressed through an affirmative-rhetorical structure yields a strong emphatic assertion.",
    "structuralVariations": {
      "affirmative": "你不是明天要参加考试吗？快去复习吧。 (Aren't you taking an exam tomorrow? Hurry and review.)",
      "negative": "他不是没去过北京吗？怎么这么熟悉路？ (Hasn't he never been to Beijing? How is he so familiar with the roads?)",
      "question": "这难道不是最好的结果吗？ (Isn't this the best possible outcome?)",
      "notes": "Can be reinforced with 难道: 难道你不是中国人吗？ (Are you telling me you aren't Chinese?)"
    },
    "examples": [
      {
        "zh": "你不是说今天晚上有空吗？怎么又加班了？",
        "py": "Nǐ bú shì shuō jīntiān wǎnshang yǒu kòng ma? Zěnme yòu jiābān le?",
        "en": "Didn't you say you were free tonight? Why are you working overtime again?"
      },
      {
        "zh": "大家都认识李老师，他不是我们的系主任吗？",
        "py": "Dàjiā dōu rènshi Lǐ lǎoshī, tā bú shì wǒmen de xì zhǔrèn ma?",
        "en": "Everyone knows Teacher Li; isn't he our department chair?"
      },
      {
        "zh": "这么简单的题目，你不是早就做过了吗？",
        "py": "Zhè me jiǎndān de tímù, nǐ bú shì zǎojiù zuò guo le ma?",
        "en": "Such a simple question, didn't you solve it long ago?"
      },
      {
        "zh": "多做运动对身体有好处，这不是很明显的道理吗？",
        "py": "Duō zuò yùndòng duì shēntǐ yǒu hǎochu, zhè bú shì hěn míngxiǎn de dàolǐ ma?",
        "en": "Exercising more is good for health; isn't this an obvious truth?"
      }
    ],
    "commonMistakes": [
      "Treating 不是...吗 as a literal inquiry requiring new information (it is an emphatic reminder of an established fact).",
      "Confusing 不是...吗 with bare yes/no 吗 questions."
    ],
    "examStrategy": "In HSK 3 listening dialogues, rhetorical questions using 不是...吗 indicate that the speaker is confident in the stated fact and prompting agreement.",
    "parentLessonSlug": "hsk3-writing-section",
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary communicative function of \"不是...吗？\"?",
        "options": [
          "To emphasize an obvious fact or remind the listener",
          "To genuinely ask for unknown information",
          "To express deep sadness",
          "To give a polite command"
        ],
        "correctIndex": 0,
        "explanation": "不是...吗 is a rhetorical confirmation/reminder structure."
      },
      {
        "id": 2,
        "question": "When someone asks \"你不是昨天买票了吗？\", what do they believe?",
        "options": [
          "They believe you already bought the ticket yesterday",
          "They believe you did not buy the ticket",
          "They are asking where you bought it",
          "They forgot what day it is"
        ],
        "correctIndex": 0,
        "explanation": "The speaker believes you did buy the ticket and is expressing surprise or reminder."
      },
      {
        "id": 3,
        "question": "Fill in the blank: \"他昨天 ( ___ ) 说今天会来吗？怎么现在还没到？\"",
        "options": [
          "不是",
          "没有",
          "别",
          "未"
        ],
        "correctIndex": 0,
        "explanation": "Rhetorical reminder uses 不是...吗."
      }
    ],
    "parentLessonTitle": "HSK 3 Writing Mastery: Syntax & Characters (书写专攻与句型重组)",
    "prevRule": {
      "slug": "necessary-condition-zhiyou-cai",
      "title": "Exclusive Necessary Condition: 只有...才... (Only if... then...)",
      "level": 3
    },
    "nextRule": {
      "slug": "question-particle-ma",
      "title": "Question Particle 吗 (Yes/No Questions)",
      "level": 1
    },
    "relatedRules": [
      {
        "slug": "question-particle-ma",
        "title": "Question Particle 吗 (Yes/No Questions)",
        "level": 1,
        "category": "Questions",
        "pattern": "Statement + 吗？"
      },
      {
        "slug": "question-form-name-xingming",
        "title": "Inquiring Names & Identity with 叫什么名字",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject + 叫 + 什么名字？"
      },
      {
        "slug": "inquiring-quantity-ji",
        "title": "Inquiring Small Quantities with 几 (jǐ)",
        "level": 1,
        "category": "Questions",
        "pattern": "几 + Measure Word / Time Unit？"
      },
      {
        "slug": "location-question-zai-nar",
        "title": "Location Inquiries: 在哪儿 (zài nǎr) & 在哪里",
        "level": 1,
        "category": "Questions",
        "pattern": "Subject / Noun + 在哪儿？"
      }
    ],
    "matchedVocab": [
      {
        "hanzi": "北京",
        "slug": "beijing",
        "pinyin": "Běijīng",
        "meaning": "Beijing",
        "level": 1
      },
      {
        "hanzi": "不",
        "slug": "bu",
        "pinyin": "bù",
        "meaning": "not; no",
        "level": 1
      },
      {
        "hanzi": "大",
        "slug": "da",
        "pinyin": "dà",
        "meaning": "big; large",
        "level": 1
      },
      {
        "hanzi": "的",
        "slug": "de-possessive-part",
        "pinyin": "de",
        "meaning": "possessive particle; of",
        "level": 1
      },
      {
        "hanzi": "都",
        "slug": "dou",
        "pinyin": "dōu",
        "meaning": "all; both",
        "level": 1
      },
      {
        "hanzi": "多",
        "slug": "duo",
        "pinyin": "duō",
        "meaning": "many; much; how",
        "level": 1
      }
    ]
  }
];

const grammarRuleMap = new Map<string, EnrichedGrammarRule>();
for (const rule of all88GrammarRules) {
  grammarRuleMap.set(rule.slug, rule);
}

export function getGrammarRuleBySlug(slug: string): EnrichedGrammarRule | undefined {
  return grammarRuleMap.get(slug);
}

export function getAllGrammarSlugs(): string[] {
  return all88GrammarRules.map(r => r.slug);
}

export function getGrammarRulesByLevel(level: HskLevel | 'all'): EnrichedGrammarRule[] {
  if (level === 'all') return all88GrammarRules;
  return all88GrammarRules.filter(r => r.level === level);
}
