import{d as p,r as h,a,o as v,c as y,b as l,e as i,w as u,F as g,f,g as x,h as w,i as b,j as L}from"./vendor.ac9fedd5.js";const E=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};E();const N={class:"flex items-center"},O=l("div",{class:"w-36 h-14 bg-gray-800 flex items-center justify-center"},[l("span",{class:"text-gray-100 text-2xl"},"gen")],-1),P=f("form"),k=f("table"),C=p({setup(d){const n=h("form"),s=r=>{console.log(r)};return(r,e)=>{const t=a("el-menu-item"),o=a("el-menu"),c=a("router-view");return v(),y(g,null,[l("div",N,[O,i(o,{size:"mini","default-active":n.value,class:"el-menu-demo flex-grow h-14",mode:"horizontal",onSelect:s,router:!0},{default:u(()=>[i(t,{index:"form"},{default:u(()=>[P]),_:1}),i(t,{index:"table"},{default:u(()=>[k]),_:1})]),_:1},8,["default-active"])]),i(c)],64)}}}),S="modulepreload",m={},j="/",A=function(n,s){return!s||s.length===0?n():Promise.all(s.map(r=>{if(r=`${j}${r}`,r in m)return;m[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":S,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((c,_)=>{o.addEventListener("load",c),o.addEventListener("error",_)})})).then(()=>n())},V=[{path:"/",redirect:"/form"},{path:"/form",name:"form",component:()=>A(()=>import("./form.6936497a.js"),["assets/form.6936497a.js","assets/vendor.ac9fedd5.js"])}],$=x({history:w(),routes:V});b(C).use($).use(L).mount("#app");
