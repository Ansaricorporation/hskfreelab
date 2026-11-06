import { pinyin } from 'pinyin-pro';

/**
 * Convert Chinese text to standard Pinyin with tone marks
 */
export function toPinyin(text: string): string {
  try {
    return pinyin(text, { toneType: 'symbol', type: 'string' });
  } catch (err) {
    return text;
  }
}

/**
 * Convert Chinese text to Pinyin with tone numbers (e.g. ni3 hao3)
 */
export function toPinyinNumber(text: string): string {
  try {
    return pinyin(text, { toneType: 'num', type: 'string' });
  } catch (err) {
    return text;
  }
}

/**
 * Convert Chinese text to clean Pinyin without tones (e.g. ni hao)
 */
export function toPinyinNone(text: string): string {
  try {
    return pinyin(text, { toneType: 'none', type: 'string' });
  } catch (err) {
    return text;
  }
}
