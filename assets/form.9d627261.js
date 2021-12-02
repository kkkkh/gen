var W=Object.defineProperty,T=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var w=(e,l,t)=>l in e?W(e,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[l]=t,f=(e,l)=>{for(var t in l||(l={}))I.call(l,t)&&w(e,t,l[t]);if(B)for(var t of B(l))K.call(l,t)&&w(e,t,l[t]);return e},k=(e,l)=>T(e,A(l));import{d as F,l as L,a as b,o as p,c as g,f as a,w as c,e as h,t as D,u as y,g as $,E as Q,r as C,F as N,m as S,n as X,p as M,D as Y,b as E}from"./vendor.a7f32af3.js";import{p as Z}from"./format.9bc4f18a.js";const ee={class:"p-4 bg-gray-700 text-left relative",contenteditable:"",readonly:""},le=$("copy"),te={id:"code-main"},oe={name:"CodePanel"};function ae(e){const l=e,t=L(()=>l.code),r=()=>{navigator.clipboard.writeText(t.value).then(()=>{Q({message:"copy success",type:"success"})})};return(m,v)=>{const V=b("el-button");return p(),g("div",ee,[a(V,{contenteditable:!1,class:"absolute right-0 top-0 mr-2 mt-2",size:"small",type:"primary",onClick:r},{default:c(()=>[le]),_:1}),h("div",te,[h("pre",null,D(y(t)),1)])])}}const H=F(k(f({},oe),{props:{code:{type:String,required:!0}},setup:ae})),ne=[{label:"input",value:"input"},{label:"select",value:"select"},{label:"checkbox",value:"checkbox"}],se={ref:"elForm",model:"form",rules:"rules",class:"demo-class",_labelWidth:"100px"},U=()=>({type:void 0,field:"",label:"",_required:!1,_value:""});var q;(function(e){e.input="blur",e.select="change",e.checkbox="change"})(q||(q={}));const ce={script2x:e=>{const l=re(e),t=ue(e);return`<script>
                import {defineComponent, ref, reactive, computed} from '@vue/composition-api'
                export default defineComponent({
                    setup (props, ctx) {
                        const form = reactive(${l})
                        const rules = ${t}
                        return {
                            form,
                        }
                    }
                })
            <\/script>`}},re=e=>{const l={};for(const t of e)l[t.field]=t._value;return JSON.stringify(l)},ue=e=>{const l={};for(const t of e)t._required&&(l[t.field]=[{required:t._required,message:`\u8BF7\u8F93\u5165${t.label}`,trigger:q[t.type]}]);return JSON.stringify(l)},de=(e=se,l)=>`<template>
		<el-form
			ref="${e.ref}"
			:model="${e.model}"
			:rules="${e.rules}"
			label-width="${e._labelWidth}"
			class="${e.class}"
		>
			${ie(l)}
		</el-form>
	</template>
	${ce.script2x(l)}`,ie=e=>e.map(l=>{const t=l.type;return pe(l,me[t](l))}).join(""),pe=(e,l)=>`<el-form-item label="${e.label}" prop="${e.field}">
      ${l}
    </el-form-item>`,me={input:e=>`<el-input v-model="form.${e.field}" placeholder="\u8BF7\u8F93\u5165${e.label}" clearable />`,select:e=>`<el-select v-model="form.${e.field}" placeholder="\u8BF7\u9009\u62E9${e.label}" clearable >
      <el-option
        v-for="item in ${e.label}Options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>`,checkbox:e=>`<el-checkbox v-model="form.${e.field}">${e._message}</el-checkbox>`},_e={input:()=>({}),checkbox:()=>({_message:""}),select:()=>({})},fe={class:"gen-form"},be={class:"flex items-start"},ve={class:"flex"},ge=$("add"),he=$("gen"),ye={name:"FormPanel"};function $e(e,{emit:l}){const t=C(),r=C([U()]),m=d=>{r.value.splice(d,1)},v=()=>{var d;(d=t.value)==null||d.validate(i=>{if(i){const s=de(void 0,r.value),u=Z(s);console.log(u),l("update:code",u)}else console.log("error validate!!")})},V=(d,i)=>{for(const s in i)i[s]=d[s];return f({},i)},P=(d,i)=>{const s=V(r.value[i],U());if(d){const u=_e[d]();r.value[i]=f(f({},s),u)}else r.value[i]=f({},s)},j=()=>{r.value.push(U())};return(d,i)=>{const s=b("el-input"),u=b("el-form-item"),z=b("el-option"),G=b("el-select"),x=b("el-button"),J=b("el-checkbox");return p(),g("div",fe,[a(y(X),{class:"demo-ruleForm",ref:(n,_)=>{_.elFormRef=n,t.value=n},"label-width":"80px",size:"mini",model:r.value},{default:c(()=>[(p(!0),g(N,null,S(r.value,(n,_)=>(p(),g("div",{class:"flex flex-col p-4 bg-gray-500 odd:bg-gray-900",key:_},[h("div",be,[a(u,{label:"field",prop:"field"},{default:c(()=>[a(s,{modelValue:n.field,"onUpdate:modelValue":o=>n.field=o,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(u,{label:"label",prop:"label"},{default:c(()=>[a(s,{modelValue:n.label,"onUpdate:modelValue":o=>n.label=o,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(u,{label:"type",prop:`${_}.type`,rules:[{required:!0,message:"\u8BF7\u8F93\u5165type",trigger:"change"}]},{default:c(()=>[a(G,{modelValue:n.type,"onUpdate:modelValue":o=>n.type=o,clearable:"",onChange:o=>P(o,_)},{default:c(()=>[(p(!0),g(N,null,S(y(ne),(o,R)=>(p(),M(z,{key:R,value:o.value},{default:c(()=>[$(D(o.label),1)]),_:2},1032,["value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]),_:2},1032,["prop"]),_!==0?(p(),M(x,{key:0,class:"ml-4",type:"danger",icon:y(Y),onClick:o=>m(_)},null,8,["icon","onClick"])):E("v-if",!0)]),h("div",ve,[a(u,{label:"_value",prop:"_value"},{default:c(()=>[a(s,{modelValue:n._value,"onUpdate:modelValue":o=>n._value=o,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(u,{label:"_required",prop:"_required"},{default:c(()=>[a(J,{modelValue:n._required,"onUpdate:modelValue":o=>n._required=o,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),"_message"in n?(p(),M(u,{key:0,label:"_message",prop:"_message"},{default:c(()=>[a(s,{modelValue:n._message,"onUpdate:modelValue":o=>n._message=o,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):E("v-if",!0)])]))),128))]),_:1},8,["model"]),h("div",null,[a(x,{onClick:j},{default:c(()=>[ge]),_:1}),a(x,{onClick:v},{default:c(()=>[he]),_:1})])])}}const O=F(k(f({},ye),{props:{code:{type:String,required:!0}},emits:["update:code"],setup:$e})),Ve={class:"flex"},Ce=F({setup(e,{expose:l}){l({CodePanel:H,FormPanel:O});const t=C("");return(r,m)=>(p(),g("div",Ve,[a(O,{class:"flex-1",code:t.value,"onUpdate:code":m[0]||(m[0]=v=>t.value=v)},null,8,["code"]),a(H,{class:"flex-1",code:t.value,"onUpdate:code":m[1]||(m[1]=v=>t.value=v)},null,8,["code"])]))}});export{Ce as default};
