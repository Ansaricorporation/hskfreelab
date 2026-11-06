import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Generate 30 mock tests (10 per level: 5 listening + 5 reading)
const levels = [1, 2, 3];
const allMockTests = [];

levels.forEach(lvl => {
  // 5 Listening tests
  for (let g = 1; g <= 5; g++) {
    const slug = g === 5 ? 'listening-sprint' : `listening-${g}`;
    const testId = `hsk${lvl}-${slug}`;
    const minutes = g === 5 ? 20 : 10;
    const totalScore = 100;
    const passingScore = 60;

    allMockTests.push({
      id: testId,
      level: lvl,
      category: 'listening',
      gateNumber: g,
      slug: slug,
      title: `HSK ${lvl} Listening Gate ${g}: ${
        g === 1 ? 'Statement & Truth Verification' :
        g === 2 ? 'Three-Option Dialogue Selection' :
        g === 3 ? 'Everyday Situational Comprehension' :
        g === 4 ? 'Question & Natural Response Matching' :
        'Official Speed Sprint Exam'
      }`,
      timeMinutes: minutes,
      passingScore: passingScore,
      totalScore: totalScore,
      difficulty: g <= 2 ? 'Standard' : g <= 4 ? 'Challenging' : 'Speed Sprint',
      description: `Official HSK ${lvl} format listening test focusing on ${
        g === 1 ? 'true/false validation' :
        g === 2 ? 'multiple choice dialogue analysis' :
        g === 3 ? 'situational inferences' :
        g === 4 ? 'conversation pairs' :
        'full timed examination pacing'
      }.`,
      questions: [
        {
          id: 1,
          section: 'listening',
          type: 'true-false',
          audioPrompt: lvl === 1 ? '外面正在下雨，天气很冷。' : lvl === 2 ? '服务员，请给我们拿两双筷子。' : '请大家把手机关掉，研讨会马上就要开始了。',
          textPrompt: 'Listen to the audio: Does the audio match the situation described?',
          options: ['True (对)', 'False (错)'],
          correctAnswer: 'True (对)',
          explanation: `The speaker clearly states "${lvl === 1 ? '外面正在下雨，天气很冷' : lvl === 2 ? '服务员，请给我们拿两双筷子' : '请大家把手机关掉，研讨会马上就要开始了'}", which matches the prompt context accurately.`
        },
        {
          id: 2,
          section: 'listening',
          type: 'multiple-choice',
          audioPrompt: lvl === 1 ? '明天下午三点我们在学校图书馆见。' : lvl === 2 ? '他每天骑自行车去公司上班，只要十五分钟。' : '关于这个新方案，经理表示赞同并希望我们尽快落实。',
          textPrompt: 'According to the speaker in the audio dialogue, what is the key detail?',
          options: [
            lvl === 1 ? 'Meet at the school library at 3 PM tomorrow' : lvl === 2 ? 'Rides bicycle to work taking 15 minutes' : 'Manager agreed with the plan and requested prompt execution',
            lvl === 1 ? 'Meet at the hospital at 5 PM' : lvl === 2 ? 'Takes subway for one hour' : 'Manager rejected the proposal',
            lvl === 1 ? 'Go to Beijing by airplane' : lvl === 2 ? 'Walks to school for 30 minutes' : 'Postponed indefinitely',
            lvl === 1 ? 'Stay home to watch TV' : lvl === 2 ? 'Takes a taxi to airport' : 'Canceled all meetings'
          ],
          correctAnswer: lvl === 1 ? 'Meet at the school library at 3 PM tomorrow' : lvl === 2 ? 'Rides bicycle to work taking 15 minutes' : 'Manager agreed with the plan and requested prompt execution',
          explanation: 'The audio prompt confirms the correct option with exact key vocabulary.'
        },
        {
          id: 3,
          section: 'listening',
          type: 'multiple-choice',
          audioPrompt: lvl === 1 ? '你想喝茶还是喝白开水？' : lvl === 2 ? '虽然今天风很大，但他还是去公园跑步了。' : '不仅要在词汇积累上下功夫，而且要注重语感和听说实战训练。',
          textPrompt: 'What did the speaker inquire or express in the dialogue?',
          options: [
            lvl === 1 ? 'Asking whether to drink tea or boiled water' : lvl === 2 ? 'Went running in the park despite heavy wind' : 'Emphasized both vocabulary and practical listening practice',
            lvl === 1 ? 'Asking for the bill at a restaurant' : lvl === 2 ? 'Stayed home to sleep' : 'Only study grammar',
            lvl === 1 ? 'Complaining about hot weather' : lvl === 2 ? 'Went to the cinema' : 'Gave up on learning Chinese',
            lvl === 1 ? 'Saying goodbye to a teacher' : lvl === 2 ? 'Bought a new bicycle' : 'Traveled abroad'
          ],
          correctAnswer: lvl === 1 ? 'Asking whether to drink tea or boiled water' : lvl === 2 ? 'Went running in the park despite heavy wind' : 'Emphasized both vocabulary and practical listening practice',
          explanation: 'Accurate comprehension of connectives and key sentence topics.'
        },
        {
          id: 4,
          section: 'listening',
          type: 'dialogue-match',
          audioPrompt: lvl === 1 ? '请问张先生的办公室在几楼？' : lvl === 2 ? '这件衬衫打折后多少钱一件？' : '请把这份重要会议纪要复印两份送到三楼。',
          textPrompt: 'Which response logically answers the audio prompt?',
          options: [
            lvl === 1 ? '在三楼，电梯左边。' : lvl === 2 ? '打折后只要一百五十块。' : '好的，我马上印好送过去。',
            lvl === 1 ? '今天星期日。' : lvl === 2 ? '我不喜欢吃苹果。' : '外面下雪了。',
            lvl === 1 ? '他是医生。' : lvl === 2 ? '昨天去火车站。' : '我还没吃早饭。',
            lvl === 1 ? '太谢谢你了。' : lvl === 2 ? '飞机快起飞了。' : '今天天气很热。'
          ],
          correctAnswer: lvl === 1 ? '在三楼，电梯左边。' : lvl === 2 ? '打折后只要一百五十块。' : '好的，我马上印好送过去。',
          explanation: 'Contextually and semantically correct responsive pairing.'
        },
        {
          id: 5,
          section: 'listening',
          type: 'true-false',
          audioPrompt: lvl === 1 ? '桌子上有三个杯子和两本书。' : lvl === 2 ? '因为路上堵车，所以王老师迟到了五分钟。' : '为了全面提高听说读写综合水平，他坚持每天精读一篇学术短文。',
          textPrompt: 'Listen and evaluate: Is the statement logically supported by the audio?',
          options: ['True (对)', 'False (错)'],
          correctAnswer: 'True (对)',
          explanation: 'Accurately aligns with factual statements delivered in standard pronunciation.'
        }
      ]
    });
  }

  // 5 Reading tests
  for (let g = 1; g <= 5; g++) {
    const slug = g === 5 ? 'reading-sprint' : `reading-${g}`;
    const testId = `hsk${lvl}-${slug}`;
    const minutes = g === 5 ? 20 : 10;
    const totalScore = 100;
    const passingScore = 60;

    allMockTests.push({
      id: testId,
      level: lvl,
      category: 'reading',
      gateNumber: g,
      slug: slug,
      title: `HSK ${lvl} Reading Gate ${g}: ${
        g === 1 ? 'Vocabulary Matching & Context' :
        g === 2 ? 'Sentence Syntax Verification' :
        g === 3 ? 'Fill-in-the-Blank Cloze' :
        g === 4 ? 'Dialogue Pair Association' :
        'Official Speed Sprint Exam'
      }`,
      timeMinutes: minutes,
      passingScore: passingScore,
      totalScore: totalScore,
      difficulty: g <= 2 ? 'Standard' : g <= 4 ? 'Challenging' : 'Speed Sprint',
      description: `Official HSK ${lvl} reading evaluation covering ${
        g === 1 ? 'word-sentence matching' :
        g === 2 ? 'syntax parsing' :
        g === 3 ? 'contextual blanks' :
        g === 4 ? 'question-response logic' :
        'comprehensive timed reading speed'
      }.`,
      questions: [
        {
          id: 1,
          section: 'reading',
          type: 'multiple-choice',
          textPrompt: lvl === 1 ? '选词填空：我每天早上吃一个______和一杯热牛奶。' : lvl === 2 ? '选词填空：虽然汉语学起来很辛苦，______非常有成就感。' : '选词填空：随着时代的发展，这里的环境______变好了。',
          options: [
            lvl === 1 ? '鸡蛋' : lvl === 2 ? '但是' : '越来越',
            lvl === 1 ? '天气' : lvl === 2 ? '因为' : '非常',
            lvl === 1 ? '高兴' : lvl === 2 ? '所以' : '极了',
            lvl === 1 ? '医生' : lvl === 2 ? '虽然' : '如果'
          ],
          correctAnswer: lvl === 1 ? '鸡蛋' : lvl === 2 ? '但是' : '越来越',
          explanation: 'Fits grammatical syntactic requirements and semantic logic.'
        },
        {
          id: 2,
          section: 'reading',
          type: 'true-false',
          textPrompt: lvl === 1 ? '判断正误：“今天星期日，我不去学校上课。” — 说话人今天去学校。' : lvl === 2 ? '判断正误：“飞机马上就要起飞了，请关掉手机。” — 此时手机应该处于开机状态。' : '判断正误：“他把那本厚厚的汉语词典看完了。” — 词典尚未读完。',
          options: ['True (对)', 'False (错)'],
          correctAnswer: 'False (错)',
          explanation: 'The sentence directly contradicts the tested statement.'
        },
        {
          id: 3,
          section: 'reading',
          type: 'dialogue-match',
          textPrompt: lvl === 1 ? '问句：“请问，火车站怎么走？” — 哪一项应答最得体？' : lvl === 2 ? '问句：“你在这家公司工作多长时间了？” — 哪一项回答逻辑正确？' : '问句：“周末你打算去哪儿放松一下？” — 最合理的回答是？',
          options: [
            lvl === 1 ? '一直往前走，在第一个十字路口往右拐。' : lvl === 2 ? '已经整整三年了。' : '我打算去郊区爬山，呼吸新鲜空气。',
            lvl === 1 ? '我不认识他。' : lvl === 2 ? '明天早上八点。' : '今天下大雨。',
            lvl === 1 ? '太好吃了。' : lvl === 2 ? '在火车站旁边。' : '那是我的书。',
            lvl === 1 ? '十块钱。' : lvl === 2 ? '我不喜欢喝茶。' : '他是工程师。'
          ],
          correctAnswer: lvl === 1 ? '一直往前走，在第一个十字路口往右拐。' : lvl === 2 ? '已经整整三年了。' : '我打算去郊区爬山，呼吸新鲜空气。',
          explanation: 'Answers the inquiry with direct grammatical cohesion.'
        },
        {
          id: 4,
          section: 'reading',
          type: 'multiple-choice',
          textPrompt: lvl === 1 ? '理解句意：“那件黑色的衣服比白色的贵三十块钱。” — 哪件衣服更便宜？' : lvl === 2 ? '理解句意：“从图书馆到宿舍走路只要五分钟，非常近。” — 宿舍离图书馆远吗？' : '理解句意：“这次考试不仅考查词汇量，而且侧重考察阅读理解速度。” — 这次考试侧重什么？',
          options: [
            lvl === 1 ? '白色的衣服更便宜' : lvl === 2 ? '非常近，不远' : '词汇量与阅读理解速度并重',
            lvl === 1 ? '黑色的衣服更便宜' : lvl === 2 ? '非常远，要坐车' : '只考口语发音',
            lvl === 1 ? '两件一样贵' : lvl === 2 ? '要走一个小时' : '不考阅读',
            lvl === 1 ? '都不能买' : lvl === 2 ? '路线不清楚' : '只看书写'
          ],
          correctAnswer: lvl === 1 ? '白色的衣服更便宜' : lvl === 2 ? '非常近，不远' : '词汇量与阅读理解速度并重',
          explanation: 'Clear logical deduction from comparative phrasing.'
        },
        {
          id: 5,
          section: 'reading',
          type: 'sentence-order',
          textPrompt: lvl === 1 ? '连词成句：① 是 ② 汉语学生 ③ 我 ④ 北京大学的' : lvl === 2 ? '连词成句：① 比 ② 哥哥 ③ 弟弟 ④ 高一点儿' : '连词成句：① 请 ② 把 ③ 关好 ④ 窗户',
          options: [
            lvl === 1 ? '③ ① ④ ② (我是北京大学的汉语学生)' : lvl === 2 ? '② ① ③ ④ (哥哥比弟弟高一点儿)' : '① ② ④ ③ (请把窗户关好)',
            lvl === 1 ? '④ ② ① ③' : lvl === 2 ? '③ ① ② ④' : '② ④ ① ③',
            lvl === 1 ? '① ③ ④ ②' : lvl === 2 ? '④ ② ① ③' : '③ ② ① ④',
            lvl === 1 ? '② ① ③ ④' : lvl === 2 ? '① ③ ④ ②' : '④ ① ② ③'
          ],
          correctAnswer: lvl === 1 ? '③ ① ④ ② (我是北京大学的汉语学生)' : lvl === 2 ? '② ① ③ ④ (哥哥比弟弟高一点儿)' : '① ② ④ ③ (请把窗户关好)',
          explanation: 'Standard Mandarin syntax word order.'
        }
      ]
    });
  }
});

console.log(`Generated total mock tests: ${allMockTests.length}`);

const fileContent = `import { MockTest } from '../types';

export const mockTestsData: MockTest[] = ${JSON.stringify(allMockTests, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/mock-tests.ts'), fileContent, 'utf8');
console.log('Successfully wrote mock-tests.ts with all 30 tests (10 per level)!');
