export const jsconfigTemplate = `
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "target": "ES6",
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
`;
