import r from"https://unpkg.com/prettier@2.6.2/esm/standalone.mjs";import i from"https://unpkg.com/prettier@2.6.2/esm/parser-html.mjs";import t from"https://unpkg.com/prettier@2.6.2/esm/parser-babel.mjs";import s from"https://unpkg.com/prettier@2.6.2/esm/parser-typescript.mjs";const l=(e,a="vue")=>n[a](e),n={vue:e=>r.format(e,{parser:"vue",plugins:[t,i,s],arrowParens:"avoid",bracketSameLine:!0,bracketSpacing:!1,embeddedLanguageFormatting:"auto",htmlWhitespaceSensitivity:"ignore",insertPragma:!1,jsxSingleQuote:!0,printWidth:80,proseWrap:"never",quoteProps:"preserve",requirePragma:!1,semi:!0,singleQuote:!0,tabWidth:2,trailingComma:"all",useTabs:!1,vueIndentScriptAndStyle:!0}),babel:e=>r.format(e,{parser:"babel",plugins:[t],arrowParens:"avoid",bracketSameLine:!0,bracketSpacing:!1,embeddedLanguageFormatting:"auto",htmlWhitespaceSensitivity:"ignore",insertPragma:!1,jsxSingleQuote:!0,printWidth:80,proseWrap:"never",quoteProps:"preserve",requirePragma:!1,semi:!0,singleQuote:!0,tabWidth:2,trailingComma:"all",useTabs:!1,vueIndentScriptAndStyle:!0})};export{l as p};
