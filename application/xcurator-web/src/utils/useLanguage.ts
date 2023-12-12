import { Language } from 'src/graphql/_generated/types';

export function localeToLanguage(locale?: string) {
  return locale == 'de'
    ? Language.De
    : locale == 'en'
    ? Language.En
    : Language.Nl;
}
