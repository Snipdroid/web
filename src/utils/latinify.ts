import { slugify, OptionsSlugify } from 'transliteration';

const slugConfig: OptionsSlugify = {
  fixChineseSpacing: false,
  unknown: '',
  lowercase: true,
  separator: '_',
  trim: false,
  replace: { ' ': '_' },
};

const letterRe = /[a-z]/;

export function latinify(input: string, options: OptionsSlugify = slugConfig) {
  const output = slugify(input, options);
  const firstLetter = output.charAt(0);
  if (firstLetter) {
    if (!letterRe.test(firstLetter)) {
      return 'a' + output;
    }
  }
  return output;
}
