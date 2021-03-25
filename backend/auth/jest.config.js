const tsconfig = require('./tsconfig.paths.json')
const paths = tsconfig.compilerOptions.paths
const { pathsToModuleNameMapper } = require('ts-jest/utils')

const moduleNameMapper = Object.keys(paths).reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: '<rootDir>' + paths[curr],
  }
}, {})

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/.jest/setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: '<rootDir>/',
  }),
}
