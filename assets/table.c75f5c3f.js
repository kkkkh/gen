import{d as h,s as g,a as r,o as x,c as F,e as c,f as t,u as a,w as s,B as V,b as v,g as B}from"./vendor.44ff868a.js";import{p as k}from"./format.8b86236b.js";import"https://unpkg.com/prettier@2.5.1/esm/standalone.mjs";import"https://unpkg.com/prettier@2.5.1/esm/parser-html.mjs";import"https://unpkg.com/prettier@2.5.1/esm/parser-babel.mjs";const w={class:"flex"},N={class:"text-left"},C=c("h2",null,"gen column data",-1),j=B("gen"),H=h({setup(y){const e=g({name:"",label:"",number:"",width:"auto"}),d={label:[{required:!0,message:"\u8BF7\u8F93\u5165label",trigger:"blur"}]},i="abcdefghigklmnopqrstuvwxyz".split(""),b=()=>{const l=e.label.split(/\s+/).map((p,u)=>({label:p,prop:i[u],width:e.width})),n=`export const ${V(()=>e.name?e.name+"Columns":"columns").value} = ${JSON.stringify(l)}`;console.log(k(n,"babel"))};return(f,l)=>{const m=r("el-input"),n=r("el-form-item"),p=r("el-form"),u=r("el-button");return x(),F("div",w,[c("div",N,[C,t(p,{ref:(o,_)=>{_.elForm=o},model:a(e),rules:d,type:"mini","label-width":"100px",class:"demo-class"},{default:s(()=>[t(n,{label:"name",prop:"name"},{default:s(()=>[t(m,{modelValue:a(e).name,"onUpdate:modelValue":l[0]||(l[0]=o=>a(e).name=o),placeholder:"\u8BF7\u8F93\u5165name",clearable:""},null,8,["modelValue"])]),_:1}),v(` <el-form-item label="number" prop="number">\r
                    <el-input v-model="form.number" placeholder="\u8BF7\u8F93\u5165number" clearable />\r
                </el-form-item>`),t(n,{label:"label",prop:"label"},{default:s(()=>[t(m,{modelValue:a(e).label,"onUpdate:modelValue":l[1]||(l[1]=o=>a(e).label=o),placeholder:"\u8BF7\u8F93\u5165label",clearable:""},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),t(u,{type:"primary",onClick:b},{default:s(()=>[j]),_:1})])])}}});export{H as default};
