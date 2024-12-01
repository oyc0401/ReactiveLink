import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node', // 필요에 따라 jsdom으로 변경
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.spec.ts'], // 테스트 파일 매칭
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;