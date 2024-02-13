/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import {pathsToModuleNameMapper} from "ts-jest";
import {compilerOptions} from './tsconfig.json';

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    testRegex: '.*\\.spec\\.ts$',
    collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>',
    }),
    preset: 'ts-jest',
};

export default config;
