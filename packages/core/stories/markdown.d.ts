declare module '*.md?raw' {
  const specification: string;
  export default specification;
}

declare module '*.tsx?raw' {
  const example: string;
  export default example;
}
