var ue=Object.defineProperty,re=Object.defineProperties;var de=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var G=(e,l,t)=>l in e?ue(e,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[l]=t,S=(e,l)=>{for(var t in l||(l={}))ce.call(l,t)&&G(e,t,l[t]);if(R)for(var t of R(l))ie.call(l,t)&&G(e,t,l[t]);return e},L=(e,l)=>re(e,de(l));import{d as j,l as pe,a as f,o as p,c as h,f as a,w as s,e as F,t as D,u as i,g as C,E as K,m as Q,r as z,n as _e,F as E,p as H,q as x,s as me,v as fe,b as k,D as ve,C as be}from"./vendor.2556d444.js";import{p as ge}from"./format.9bc4f18a.js";const $e={class:"p-4 bg-gray-700 text-left relative",contenteditable:"",readonly:""},Ve=C("copy"),ye={id:"code-main"},he={name:"CodePanel"};function xe(e){const l=e,t=pe(()=>l.code),o=()=>{navigator.clipboard.writeText(t.value).then(()=>{K({message:"copy success",type:"success"})})};return(_,c)=>{const b=f("el-button");return p(),h("div",$e,[a(b,{contenteditable:!1,class:"absolute right-0 top-0 mr-2 mt-2",size:"small",type:"primary",onClick:o},{default:s(()=>[Ve]),_:1}),F("div",ye,[F("pre",null,D(i(t)),1)])])}}const X=j(L(S({},he),{props:{code:{type:String,required:!0}},setup:xe})),Fe=[{label:"input",value:"input"},{label:"select",value:"select"},{label:"checkbox",value:"checkbox"},{label:"radio",value:"radio"},{label:"textarea",value:"textarea"},{label:"upload",value:"upload"}],ke=[{label:"vue2x",value:"vue2x"},{label:"vue3x",value:"vue3x"}];var W;(function(e){e.input="blur",e.select="change",e.checkbox="change",e.radio="change",e.textarea="blur",e.upload="change"})(W||(W={}));const Ue=["radio1","radio2"],Se=["select1","select2"],Y=e=>Object.keys(Z).map(o=>Z[o](e)).reduce((o,_)=>({values:`${o.values}
${_.values}`,vars:`${o.vars}
${_.vars}`})),Ce={vue2x:e=>{const{values:l,vars:t}=Y(e);return`<script>
                import {defineComponent, reactive} from '@vue/composition-api'
                export default defineComponent({
                    setup (props, ctx) {
                        ${l}
                        return {
							${t}
                        }
                    }
                })
            <\/script>`},vue3x:e=>{const{values:l}=Y(e);return`
		<script lang="ts">
			export default {
			name: 'gen-form',
			}
		<\/script>
		<script lang="ts" setup>
			import {reactive} from 'vue'
			${l}
        <\/script>`}},Z={genForm:e=>{const l={};for(const t of e)l[t.field]=t._value;return{values:`const form = reactive( ${JSON.stringify(l)})`,vars:"form,"}},genRules:e=>{const l={};for(const t of e)t._required&&(l[t.field]=[{required:t._required,message:`\u8BF7\u8F93\u5165${t.label}`,trigger:W[t.type]}]);return{values:`const rules = ${JSON.stringify(l)}`,vars:"rules,"}},genSelect:e=>{const l=e.filter(o=>o.type==="select");let t=[];return l.length>0&&(t=l.map(o=>{const c=(o._option?o._option.split(/\s+/):Se).map((b,u)=>({label:b,value:u}));return{values:`const ${o.field}Options = ${JSON.stringify(c)}`,vars:`${o.field}Options,`}})),{vars:t.map(o=>o.vars).join(`
`),values:t.map(o=>o.values).join(`
`)}},genUpload:e=>{const l=e.filter(o=>o.type==="upload");let t=[];return l.length>0&&(t=l.map(o=>{const _=`${o.field}FileList`,c=`${o.field}Accept`,b=`${o.field}HandleSuccess`,u=`${o.field}BeforeUpload`,m=`${o.field}HandleRemove`;return{values:`
							const ${_} = []
							const ${c} = "${o._accept}"
							const ${b} = (res, file,fileList)=>{
								form.${o.field} = res.data
							}
							const ${u} = (file)=>{
								const isType = ${o.field}Accept.includes(file.type);
								if (!isType) {
									this.$message.error('\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E');
								}
								const isSize = file.size / 1024 / 1024 < ${o._size};
								if (!isSize) {
								this.$message.error('\u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC7${o._size}MB!');
								}
								return isType && isSize;
							}
							const ${m} = (file,fileList)=>{
								form.${o.field} = ""
						}`,vars:`${_},
${c},
${b},
${u},
${m},`}})),{values:t.map(o=>o.values).join(`
`),vars:t.map(o=>o.vars).join(`
`)}}},I={ref:"elForm",model:"form",rules:"rules",class:"gen-form",_labelWidth:100,_scriptType:"vue2x"},J=()=>({type:void 0,field:"",label:"",_required:!1,_value:""}),we=(e=I,l)=>`<template>
		<el-form
			ref="${e.ref}"
			:model="${e.model}"
			:rules="${e.rules}"
			label-width="${e._labelWidth}px"
			class="${e.class}"
		>
			${Me(l)}
		</el-form>
	</template>`,Me=e=>e.map(l=>{const t=l.type;return ze(l,Be[t](l))}).join(""),ze=(e,l)=>`<el-form-item label="${e.label}" prop="${e.field}">
      ${l}
    </el-form-item>`,Be={input:e=>`<el-input v-model="form.${e.field}" placeholder="\u8BF7\u8F93\u5165${e.label}" clearable />`,select:e=>`<el-select v-model="form.${e.field}" placeholder="\u8BF7\u9009\u62E9${e.label}" clearable >
		<el-option
			v-for="item in ${e.field}Options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/>
		</el-select>`,checkbox:e=>`<el-checkbox v-model="form.${e.field}">${e._message}</el-checkbox>`,radio:e=>{const t=(e._option?e._option.split(/\s+/):Ue).map((_,c)=>`<el-radio :label="${c}">${_}</el-radio>`).join("");return`<el-radio-group v-model="form.${e.field}">${t}</el-radio-group>`},textarea:e=>`<el-input type="textarea" :row="${e._rows}" v-model="form.${e.field}" placeholder="\u8BF7\u8F93\u5165${e.label}" clearable :maxlength="${e._maxlength}" />`,upload:e=>`<el-upload
		action="/posts/"
		:on-success="${e.field}HandleSuccess"
		:before-upload="${e.field}BeforeUpload"
		:on-remove="${e.field}HandleRemove"
		:multiple="${e._multiple}"
		:limit="${e._multiple?e._limit:1}"
		:file-list="${e.field}FileList"
		:accept="${e.field}Accept">
		<el-button size="mini" type="primary">\u70B9\u51FB\u4E0A\u4F20</el-button>
		<div slot="tip" class="el-upload__tip">\u53EA\u80FD\u4E0A\u4F20${e._accept}\u683C\u5F0F\u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7${e._size}MB</div>
	  </el-upload>`},Ee=(e=I,l)=>{const t=we(e,l),o=Ce[e._scriptType](l);return`${t}
            ${o}`},qe={input:()=>({}),checkbox:()=>({_message:""}),select:()=>({_option:""}),radio:()=>({_option:""}),textarea:()=>({_rows:2,_maxlength:200}),upload:()=>({_multiple:!1,_limit:1,_accept:".png,.jpg,.rar,.zip,.doc,.docx,.pdf,.xls,.xlsx",_size:1})};let ee=Q(I);const le=()=>{const e=z(!1);return{configForm:ee,visible:e,show:()=>{e.value=!0},close:()=>{e.value=!1}}},Oe=e=>{ee=Q(e)},je={class:"flex w-full justify-between px-2 py-1"},De=C("config"),He=F("h3",null,"name",-1),Ne=F("h3",null,"prop",-1),Ae=j({setup(e){const l=z("rtl"),{visible:t,show:o,close:_,configForm:c}=le();return(b,u)=>{const m=f("el-button"),B=f("el-tooltip"),U=f("el-input"),V=f("el-form-item"),w=f("el-input-number"),N=f("el-option"),A=f("el-select"),T=f("el-form"),v=f("el-drawer");return p(),h(E,null,[F("div",je,[a(B,{effect:"dark",content:"form config",placement:"top-start"},{default:s(()=>[a(m,{type:"primary",size:"mini",onClick:i(o)},{default:s(()=>[De]),_:1},8,["onClick"])]),_:1}),_e(b.$slots,"default")]),a(v,{modelValue:i(t),"onUpdate:modelValue":u[6]||(u[6]=d=>me(t)?t.value=d:null),title:"config",direction:l.value},{default:s(()=>[a(T,{class:"text-left","label-width":"80px",size:"mini",model:i(c)},{default:s(()=>[He,a(V,{label:"ref",prop:"ref"},{default:s(()=>[a(U,{modelValue:i(c).ref,"onUpdate:modelValue":u[0]||(u[0]=d=>i(c).ref=d),placeholder:"",clearable:""},null,8,["modelValue"])]),_:1}),a(V,{label:"model",prop:"model"},{default:s(()=>[a(U,{modelValue:i(c).model,"onUpdate:modelValue":u[1]||(u[1]=d=>i(c).model=d),placeholder:"",clearable:""},null,8,["modelValue"])]),_:1}),a(V,{label:"rules",prop:"rules"},{default:s(()=>[a(U,{modelValue:i(c).model,"onUpdate:modelValue":u[2]||(u[2]=d=>i(c).model=d),placeholder:"",clearable:""},null,8,["modelValue"])]),_:1}),a(V,{label:"class",prop:"class"},{default:s(()=>[a(U,{modelValue:i(c).class,"onUpdate:modelValue":u[3]||(u[3]=d=>i(c).class=d),placeholder:"",clearable:""},null,8,["modelValue"])]),_:1}),Ne,a(V,{label:"labelWidth",prop:"_labelWidth"},{default:s(()=>[a(w,{modelValue:i(c)._labelWidth,"onUpdate:modelValue":u[4]||(u[4]=d=>i(c)._labelWidth=d),placeholder:"",clearable:""},null,8,["modelValue"])]),_:1}),a(V,{label:"script",prop:"_scriptType"},{default:s(()=>[a(A,{modelValue:i(c)._scriptType,"onUpdate:modelValue":u[5]||(u[5]=d=>i(c)._scriptType=d),clearable:""},{default:s(()=>[(p(!0),h(E,null,H(i(ke),(d,y)=>(p(),x(N,{key:y,value:d.value},{default:s(()=>[C(D(d.label),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","direction"])],64)}}}),Te=e=>{const l=z([]),t=()=>{l.value=[];let u=localStorage.length;if(u)for(;u!==0;){const m=localStorage.key(u-1);(m==null?void 0:m.includes(e))&&_(m,localStorage.getItem(m)),u--}},o=u=>{var w;const m=l.value.length,B=m>0?Number((w=l.value[m-1].label)==null?void 0:w.replace(e,""))+1:1,U=JSON.stringify(u),V=`${e}${B}`;localStorage.setItem(V,U),_(V,U)},_=(u,m)=>{l.value.push({label:u,value:m})},c=u=>JSON.parse(l.value[u].value),b=(u,m)=>{localStorage.removeItem(u),l.value.splice(m,1)};return t(),{storage:l,addStorage:_,setStorage:o,getStorage:c,deleteStorage:b}};const Le={class:"gen-form"},We={class:"flex flex-col items-start"},Ie=C("add"),Je=C("gen"),Pe={class:"flex items-start"},Re={class:"flex flex-wrap"},Ge={class:"flex m-2 items-center"},Ke={key:0,class:"text-xs"},Qe={name:"FormPanel"};function Xe(e,{emit:l}){const t=z(),o=z([J()]),_=v=>{o.value.splice(v,1)},{configForm:c}=le(),{storage:b,setStorage:u,getStorage:m,deleteStorage:B}=Te("form"),U=v=>{const d=m(v);o.value=d.ruleForm,Oe(d.configForm),V()},V=()=>{const v=Ee(c,o.value),d=ge(v);l("update:code",d)},w=()=>{var v;(v=t.value)==null||v.validate(d=>{d?(V(),u({configForm:c,ruleForm:o.value})):(K.error("error validate!!"),console.log("error validate!!"))})},N=(v,d)=>{for(const y in d)d[y]=v[y];return S({},d)},A=(v,d)=>{const y=N(o.value[d],J());if(v){const q=qe[v]();o.value[d]=S(S({},y),q)}else o.value[d]=S({},y)},T=()=>{o.value.push(J())};return(v,d)=>{const y=f("el-button"),q=f("el-tooltip"),M=f("el-input"),g=f("el-form-item"),oe=f("el-option"),ae=f("el-select"),P=f("el-checkbox"),O=f("el-input-number"),ne=f("el-icon");return p(),h("div",Le,[F("div",We,[a(Ae,{ref:(n,$)=>{$.configFormDrawer=n}},{default:s(()=>[F("div",null,[a(q,{effect:"dark",content:"add \u589E\u52A0",placement:"top-start"},{default:s(()=>[a(y,{onClick:T},{default:s(()=>[Ie]),_:1})]),_:1}),a(q,{effect:"dark",content:"gen \u751F\u6210",placement:"top-start"},{default:s(()=>[a(y,{onClick:w},{default:s(()=>[Je]),_:1})]),_:1})])]),_:1},512)]),a(i(fe),{ref:(n,$)=>{$.elFormRef=n,t.value=n},"label-width":"80px",size:"mini",model:o.value},{default:s(()=>[(p(!0),h(E,null,H(o.value,(n,$)=>(p(),h("div",{class:"flex flex-col p-4 bg-gray-500 odd:bg-gray-900",key:$},[F("div",Pe,[a(g,{label:"field",prop:"field"},{default:s(()=>[a(M,{modelValue:n.field,"onUpdate:modelValue":r=>n.field=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(g,{label:"label",prop:"label"},{default:s(()=>[a(M,{modelValue:n.label,"onUpdate:modelValue":r=>n.label=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(g,{label:"type",prop:`${$}.type`,rules:[{required:!0,message:"\u8BF7\u8F93\u5165type",trigger:"change"}]},{default:s(()=>[a(ae,{modelValue:n.type,"onUpdate:modelValue":r=>n.type=r,clearable:"",onChange:r=>A(r,$)},{default:s(()=>[(p(!0),h(E,null,H(i(Fe),(r,se)=>(p(),x(oe,{key:se,value:r.value},{default:s(()=>[C(D(r.label),1)]),_:2},1032,["value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]),_:2},1032,["prop"]),$!==0?(p(),x(y,{key:0,class:"ml-4",type:"danger",icon:i(ve),onClick:r=>_($)},null,8,["icon","onClick"])):k("v-if",!0)]),F("div",Re,[a(g,{label:"_value",prop:"_value"},{default:s(()=>[a(M,{modelValue:n._value,"onUpdate:modelValue":r=>n._value=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(g,{style:{width:"258px"},label:"_required",prop:"_required"},{default:s(()=>[a(P,{modelValue:n._required,"onUpdate:modelValue":r=>n._required=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),"_message"in n?(p(),x(g,{key:0,label:"_message",prop:"_message"},{default:s(()=>[a(M,{modelValue:n._message,"onUpdate:modelValue":r=>n._message=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0),"_option"in n?(p(),x(g,{key:1,label:"_option",prop:"_option"},{default:s(()=>[a(M,{modelValue:n._option,"onUpdate:modelValue":r=>n._option=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0),"_rows"in n?(p(),x(g,{key:2,label:"_rows",prop:"_rows"},{default:s(()=>[a(O,{modelValue:n._rows,"onUpdate:modelValue":r=>n._rows=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0),"_maxlength"in n?(p(),x(g,{key:3,label:"_maxlength",prop:"_maxlength"},{default:s(()=>[a(O,{modelValue:n._maxlength,"onUpdate:modelValue":r=>n._maxlength=r,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0),"_size"in n?(p(),x(g,{key:4,label:"_size(MB)",prop:"_size"},{default:s(()=>[a(O,{modelValue:n._size,"onUpdate:modelValue":r=>n._size=r,clearable:"",max:100,min:0},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0),"_accept"in n?(p(),x(g,{key:5,label:"_accept",prop:"_accept"},{default:s(()=>[a(M,{modelValue:n._accept,"onUpdate:modelValue":r=>n._accept=r},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0),"_multiple"in n?(p(),x(g,{key:6,label:"_multiple",prop:"_multiple"},{default:s(()=>[a(P,{modelValue:n._multiple,"onUpdate:modelValue":r=>n._multiple=r},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0),n._multiple?(p(),x(g,{key:7,label:"_limit",prop:"_limit"},{default:s(()=>[a(O,{modelValue:n._limit,"onUpdate:modelValue":r=>n._limit=r,clearable:"",max:100,min:0},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):k("v-if",!0)])]))),128))]),_:1},8,["model"]),F("div",Ge,[i(b).length?(p(),h("span",Ke,"storage\uFF1A")):k("v-if",!0),(p(!0),h(E,null,H(i(b),(n,$)=>(p(),h("div",{class:"relative mx-2 my-1",key:$},[a(ne,{class:"absolute z-10 right-0 top-0 -mr-2 -mt-1 cursor-pointer text-red-600 hover:text-red-500",onClick:r=>i(B)(n.label,$)},{default:s(()=>[a(i(be))]),_:2},1032,["onClick"]),a(y,{onClick:r=>U($)},{default:s(()=>[C(D(n.label),1)]),_:2},1032,["onClick"])]))),128))])])}}const te=j(L(S({},Qe),{props:{code:{type:String,required:!0}},emits:["update:code"],setup:Xe})),Ye={class:"flex"},tl=j({setup(e,{expose:l}){l({CodePanel:X,FormPanel:te});const t=z("");return(o,_)=>(p(),h("div",Ye,[a(te,{class:"flex-1",code:t.value,"onUpdate:code":_[0]||(_[0]=c=>t.value=c)},null,8,["code"]),a(X,{class:"flex-1",code:t.value,"onUpdate:code":_[1]||(_[1]=c=>t.value=c)},null,8,["code"])]))}});export{tl as default};
