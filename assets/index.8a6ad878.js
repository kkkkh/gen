import{d as g,r as v,a as d,o as y,c as b,b as f,e as u,f as s,w as i,F as x,g as c,h as E,i as L,j as V,k as w}from"./vendor.e4e1875e.js";const O=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}};O();var P="/gen/assets/logo.043eac84.svg";const A={class:"flex items-center bg-gray-900"},S=u("div",{class:"w-44 h-14 bg-gray-800 flex items-center justify-center px-4"},[u("img",{class:"mr-3",src:P}),u("span",{class:"text-gray-100 text-2xl"},"gen code")],-1),C=c("form"),I=c("table"),N=c("data"),R=c("table"),T=c("graphql"),k=g({setup(p){const n=v("form"),a=o=>{console.log(o)};return(o,e)=>{const t=d("el-menu-item"),r=d("el-sub-menu"),m=d("el-menu"),_=d("router-view");return y(),b(x,null,[f(' <img alt="Vue logo" src="./assets/logo.png" /> '),f(' <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> '),u("div",A,[S,s(m,{size:"mini","default-active":n.value,class:"el-menu-demo flex-grow h-14",mode:"horizontal",onSelect:a,router:!0},{default:i(()=>[s(t,{index:"/form"},{default:i(()=>[C]),_:1}),s(t,{index:"/table"},{default:i(()=>[I]),_:1}),f(' <el-menu-item index="/data">data</el-menu-item> '),s(r,{index:"/data"},{title:i(()=>[N]),default:i(()=>[s(t,{index:"/data/table"},{default:i(()=>[R]),_:1}),s(t,{index:"/data/graphql"},{default:i(()=>[T]),_:1})]),_:1})]),_:1},8,["default-active"])]),s(_)],64)}}}),q="modulepreload",h={},D="/gen/",l=function(n,a){return!a||a.length===0?n():Promise.all(a.map(o=>{if(o=`${D}${o}`,o in h)return;h[o]=!0;const e=o.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${t}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":q,e||(r.as="script",r.crossOrigin=""),r.href=o,document.head.appendChild(r),e)return new Promise((m,_)=>{r.addEventListener("load",m),r.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>n())},$=[{path:"/",redirect:"/form"},{path:"/form",name:"form",component:()=>l(()=>import("./form.1257ebe8.js"),["assets/form.1257ebe8.js","assets/form.75998014.css","assets/vendor.e4e1875e.js","assets/format.8b86236b.js"])},{path:"/table",name:"table",component:()=>l(()=>import("./table.669d7069.js"),["assets/table.669d7069.js","assets/vendor.e4e1875e.js"])},{path:"/data/",name:"data",redirect:"/data/table",component:()=>l(()=>import("./index.d09c9fad.js"),["assets/index.d09c9fad.js","assets/vendor.e4e1875e.js"]),children:[{path:"table",name:"data-table",component:()=>l(()=>import("./table.12ef016b.js"),["assets/table.12ef016b.js","assets/vendor.e4e1875e.js","assets/format.8b86236b.js"])},{path:"graphql",name:"data-graphql",component:()=>l(()=>import("./graphql.142d884d.js"),["assets/graphql.142d884d.js","assets/vendor.e4e1875e.js"])}]}],H=E({history:L(),routes:$});V(k).use(H).use(w,{size:"mini"}).mount("#app");