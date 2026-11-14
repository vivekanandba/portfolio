// TypeScript 6 checks side-effect imports by default (noUncheckedSideEffectImports),
// and Next 15's types do not declare plain stylesheets, so `import './globals.css'`
// in the root layout needs this one line.
declare module '*.css';
