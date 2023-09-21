export type ServerType = 'prod' | 'dev';

export const DEFAULT_URL: { [key: string]: string } = {
  dev: 'https://mapbefine.kro.kr/api',
  prod: 'https://mapbefine.com/api'
};
