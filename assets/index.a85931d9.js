import{d as g,r as v,a as l,o as y,c as x,b as m,e as a,f as i,w as u,F as b,g as f,h as w,i as E,j as L,k as V}from"./vendor.a7f32af3.js";const N=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};N();const O={class:"flex items-center"},P=a("div",{class:"w-36 h-14 bg-gray-800 flex items-center justify-center"},[a("span",{class:"text-gray-100 text-2xl"},"gen")],-1),k=f("form"),C=f("table"),S=g({setup(d){const n=v("form"),s=o=>{console.log(o)};return(o,e)=>{const t=l("el-menu-item"),r=l("el-menu"),c=l("router-view");return y(),x(b,null,[m(' <img alt="Vue logo" src="./assets/logo.png" /> '),m(' <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> '),a("div",O,[P,i(r,{size:"mini","default-active":n.value,class:"el-menu-demo flex-grow h-14",mode:"horizontal",onSelect:s,router:!0},{default:u(()=>[i(t,{index:"form"},{default:u(()=>[k]),_:1}),i(t,{index:"table"},{default:u(()=>[C]),_:1})]),_:1},8,["default-active"])]),i(c)],64)}}}),j="modulepreload",_={},A="/gen/",p=function(n,s){return!s||s.length===0?n():Promise.all(s.map(o=>{if(o=`${A}${o}`,o in _)return;_[o]=!0;const e=o.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${t}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":j,e||(r.as="script",r.crossOrigin=""),r.href=o,document.head.appendChild(r),e)return new Promise((c,h)=>{r.addEventListener("load",c),r.addEventListener("error",h)})})).then(()=>n())},H=[{path:"/",redirect:"/form"},{path:"/form",name:"form",component:()=>p(()=>import("./form.e072acd4.js"),["assets/form.e072acd4.js","assets/form.a7398ba0.css","assets/vendor.a7f32af3.js","assets/format.9bc4f18a.js"])},{path:"/table",name:"table",component:()=>p(()=>import("./table.14cb4c46.js"),["assets/table.14cb4c46.js","assets/vendor.a7f32af3.js","assets/format.9bc4f18a.js"])}],I=w({history:E(),routes:H});L(S).use(I).use(V).mount("#app");