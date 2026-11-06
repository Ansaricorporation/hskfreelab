import { GrammarPoint } from '../types';

export const grammarData: GrammarPoint[] = [
  {
    id: 'g1-1',
    slug: 'question-particle-ma',
    title: 'Question Particle 吗 (Yes/No Questions)',
    level: 1,
    pattern: 'Statement + 吗？',
    explanation: 'Attach 吗 (ma) to the end of any declarative sentence to turn it directly into a yes/no question without changing word order.',
    examples: [
      { zh: '你是学生。', py: 'Nǐ shì xuésheng.', en: 'You are a student. (Statement)' },
      { zh: '你是学生吗？', py: 'Nǐ shì xuésheng ma?', en: 'Are you a student? (Question)' },
      { zh: '他喜欢中国菜吗？', py: 'Tā xǐhuan Zhōngguó cài ma?', en: 'Does he like Chinese food?' }
    ],
    commonMistake: 'Do NOT use 吗 in sentences that already contain question words like 什么 (shénme) or 谁 (shéi).',
    tip: 'Word order remains identical to the declarative sentence — just affix 吗 at the end!'
  },
  {
    id: 'g1-2',
    slug: 'possession-particle-de',
    title: 'Possessive & Attributive Particle 的 (de)',
    level: 1,
    pattern: 'Possessor / Modifier + 的 + Noun',
    explanation: '的 (de) functions similarly to apostrophe-s (\'s) in English. It links possessors to objects or descriptive adjectives to nouns.',
    examples: [
      { zh: '这是我的书。', py: 'Zhè shì wǒ de shū.', en: 'This is my book.' },
      { zh: '漂亮的衣服。', py: 'Piàoliang de yīfu.', en: 'Beautiful clothes.' }
    ],
    commonMistake: 'For close family or close friends, 的 is frequently omitted (e.g., 我妈妈 instead of 我的妈妈).',
    tip: 'When describing an object with an adjective of two or more syllables, insert 的 before the noun.'
  },
  {
    id: 'g2-1',
    slug: 'comparison-bi',
    title: 'Comparison Structure 比 (bǐ)',
    level: 2,
    pattern: 'A + 比 + B + Adjective',
    explanation: 'Use 比 (bǐ) to state that item A is more [adjective] than item B.',
    examples: [
      { zh: '他比我高。', py: 'Tā bǐ wǒ gāo.', en: 'He is taller than me.' },
      { zh: '今天比昨天冷。', py: 'Jīntiān bǐ zuótiān lěng.', en: 'Today is colder than yesterday.' },
      { zh: '西瓜比苹果贵一点儿。', py: 'Xīguā bǐ píngguǒ guì yìdiǎnr.', en: 'Watermelon is a little more expensive than apples.' }
    ],
    commonMistake: 'Do not put 很 (hěn) or 非常 (fēicháng) directly before the adjective in a 比 comparison sentence.',
    tip: 'To express "a little more", append 一点儿 (yìdiǎnr) at the end: A 比 B + Adj + 一点儿.'
  },
  {
    id: 'g2-2',
    slug: 'experiential-marker-guo',
    title: 'Experiential Aspect Marker 过 (guo)',
    level: 2,
    pattern: 'Subject + Verb + 过 + (Object)',
    explanation: '过 (guo) placed immediately after a verb denotes that an action has been experienced at least once in the past ("have ever done").',
    examples: [
      { zh: '你去过北京吗？', py: 'Nǐ qù guo Běijīng ma?', en: 'Have you ever been to Beijing?' },
      { zh: '我没吃过中国饺子。', py: 'Wǒ méi chī guo Zhōngguó jiǎozi.', en: 'I have never eaten Chinese dumplings.' }
    ],
    commonMistake: 'Negation of 过 is always formed with 没 (méi) or 没有 (méiyǒu), never 不 (bù).',
    tip: 'Use 没 + Verb + 过 to say "have never done".'
  },
  {
    id: 'g3-1',
    slug: 'ba-sentence-structure',
    title: 'The Disposal 把 (bǎ) Sentence Structure',
    level: 3,
    pattern: 'Subject + 把 + Object + Verb + Result/Disposal',
    explanation: 'The 把 construction brings the object before the verb to highlight what action was done to it and what happened as a result.',
    examples: [
      { zh: '请把门关上。', py: 'Qǐng bǎ mén guān shang.', en: 'Please close the door.' },
      { zh: '他把那本书看完了。', py: 'Tā bǎ nà běn shū kàn wán le.', en: 'He has finished reading that book.' },
      { zh: '我把作业做好了。', py: 'Wǒ bǎ zuòyè zuò hǎo le.', en: 'I have finished my homework.' }
    ],
    commonMistake: 'The verb in a 把 sentence cannot stand alone; it must have a result, directional complement, or completed marker (e.g. 完, 上, 了).',
    tip: 'Think of 把 as "take [the object] and [do something to it]".'
  },
  {
    id: 'g3-2',
    slug: 'yue-lai-yue',
    title: 'Progressive Increments: 越来越... (yuè lái yuè)',
    level: 3,
    pattern: 'Subject + 越来越 + Adjective / Mental Verb',
    explanation: 'Means "more and more..." as time progresses.',
    examples: [
      { zh: '天气越来越热了。', py: 'Tiānqì yuè lái yuè rè le.', en: 'The weather is getting hotter and hotter.' },
      { zh: '他的汉语越来越好。', py: 'Tā de Hànyǔ yuè lái yuè hǎo.', en: 'His Chinese is getting better and better.' }
    ],
    commonMistake: 'Never place 很 (hěn) after 越来越 (e.g. 越来越很好 is grammatically incorrect).',
    tip: 'Often paired with 了 at the end to indicate change of state.'
  }
];
