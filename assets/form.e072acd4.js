var W=Object.defineProperty,R=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var q=(e,l,t)=>l in e?W(e,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[l]=t,g=(e,l)=>{for(var t in l||(l={}))I.call(l,t)&&q(e,t,l[t]);if(E)for(var t of E(l))K.call(l,t)&&q(e,t,l[t]);return e},C=(e,l)=>R(e,T(l));import{d as B,l as Q,a as v,o as i,c as V,f as u,w as s,e as h,t as O,u as F,g as U,E as X,r as z,F as H,m as j,n as Y,p as f,D as Z,b}from"./vendor.a7f32af3.js";import{p as ee}from"./format.9bc4f18a.js";const le={class:"p-4 bg-gray-700 text-left relative",contenteditable:"",readonly:""},te=U("copy"),oe={id:"code-main"},ae={name:"CodePanel"};function ne(e){const l=e,t=Q(()=>l.code),a=()=>{navigator.clipboard.writeText(t.value).then(()=>{X({message:"copy success",type:"success"})})};return(r,p)=>{const y=v("el-button");return i(),V("div",le,[u(y,{contenteditable:!1,class:"absolute right-0 top-0 mr-2 mt-2",size:"small",type:"primary",onClick:a},{default:s(()=>[te]),_:1}),h("div",oe,[h("pre",null,O(F(t)),1)])])}}const N=B(C(g({},ae),{props:{code:{type:String,required:!0}},setup:ne})),ue=[{label:"input",value:"input"},{label:"select",value:"select"},{label:"checkbox",value:"checkbox"},{label:"radio",value:"radio"},{label:"textarea",value:"textarea"},{label:"upload",value:"upload"}],se={ref:"elForm",model:"form",rules:"rules",class:"demo-class",_labelWidth:"100px"},w=()=>({type:void 0,field:"",label:"",_required:!1,_value:""});var S;(function(e){e.input="blur",e.select="change",e.checkbox="change",e.radio="change",e.textarea="blur",e.upload="change"})(S||(S={}));const de=["radio1","radio2"],ie=["select1","select2"],ce={vue2x:e=>{const l=re(e),t=pe(e),a=_e(e),r=me(e);return`<script>
                import {defineComponent, ref, reactive, computed} from '@vue/composition-api'
                export default defineComponent({
                    setup (props, ctx) {
                        const form = reactive(${l})
                        const rules = ${t} 
						${a}
						${r}
                        return {
                            form,
                        }
                    }
                })
            <\/script>`}},re=e=>{const l={};for(const t of e)l[t.field]=t._value;return JSON.stringify(l)},pe=e=>{const l={};for(const t of e)t._required&&(l[t.field]=[{required:t._required,message:`\u8BF7\u8F93\u5165${t.label}`,trigger:S[t.type]}]);return JSON.stringify(l)},_e=e=>{const l=e.filter(a=>a.type==="select");let t="";return l.length>0&&(t=l.map(a=>{const p=(a._option?a._option.split(/\s+/):ie).map((y,k)=>({label:y,value:k}));return`const ${a.field}Options = ${JSON.stringify(p)}`}).join(`
`)),t},me=e=>{const l=e.filter(a=>a.type==="upload");let t="";return l.length>0&&(t=l.map(a=>`
				const ${a.field}FileList = []
				const ${a.field}Accept = "${a._accept}"
				const ${a.field}HandleSuccess = (res, file,fileList)=>{
					form.${a.field} = res.data
				}
				const ${a.field}BeforeUpload = (file)=>{
					const isType = ${a.field}Accept.includes(file.type);
					if (!isType) {
						this.$message.error('\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E');
					}
					const isSize = file.size / 1024 / 1024 < ${a._size};
					if (!isSize) {
					  this.$message.error('\u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC7${a._size}MB!');
					}
					return isType && isSize;
				}
				const ${a.field}HandleRemove = (file,fileList)=>{
					form.${a.field} = ""
				}
			`).join(`
`)),t},fe=(e=se,l)=>`<template>
		<el-form
			ref="${e.ref}"
			:model="${e.model}"
			:rules="${e.rules}"
			label-width="${e._labelWidth}"
			class="${e.class}"
		>
			${be(l)}
		</el-form>
	</template>
	${ce.vue2x(l)}`,be=e=>e.map(l=>{const t=l.type;return ve(l,$e[t](l))}).join(""),ve=(e,l)=>`<el-form-item label="${e.label}" prop="${e.field}">
      ${l}
    </el-form-item>`,$e={input:e=>`<el-input v-model="form.${e.field}" placeholder="\u8BF7\u8F93\u5165${e.label}" clearable />`,select:e=>`<el-select v-model="form.${e.field}" placeholder="\u8BF7\u9009\u62E9${e.label}" clearable >
		<el-option
			v-for="item in ${e.field}Options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/>
		</el-select>`,checkbox:e=>`<el-checkbox v-model="form.${e.field}">${e._message}</el-checkbox>`,radio:e=>{const t=(e._option?e._option.split(/\s+/):de).map((r,p)=>`<el-radio :label="${p}">${r}</el-radio>`).join("");return`<el-radio-group v-model="form.${e.field}">${t}</el-radio-group>`},textarea:e=>`<el-input type="textarea" :row="${e._rows}" v-model="form.${e.field}" placeholder="\u8BF7\u8F93\u5165${e.label}" clearable :maxlength="${e._maxlength}" />`,upload:e=>`<el-upload
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
	  </el-upload>`},ge={input:()=>({}),checkbox:()=>({_message:""}),select:()=>({_option:""}),radio:()=>({_option:""}),textarea:()=>({_rows:2,_maxlength:200}),upload:()=>({_multiple:!1,_limit:1,_accept:".png,.jpg,.rar,.zip,.doc,.docx,.pdf,.xls,.xlsx",_size:1})};const Ve={class:"gen-form"},ye={class:"flex items-start"},he={class:"flex flex-wrap"},xe=U("add"),Fe=U("gen"),Ue={name:"FormPanel"};function ke(e,{emit:l}){const t=z(),a=z([w()]),r=_=>{a.value.splice(_,1)},p=()=>{var _;(_=t.value)==null||_.validate(m=>{if(m){const c=fe(void 0,a.value),d=ee(c);console.log(d),l("update:code",d)}else console.log("error validate!!")})},y=(_,m)=>{for(const c in m)m[c]=_[c];return g({},m)},k=(_,m)=>{const c=y(a.value[m],w());if(_){const d=ge[_]();a.value[m]=g(g({},c),d)}else a.value[m]=g({},c)},P=()=>{a.value.push(w())};return(_,m)=>{const c=v("el-input"),d=v("el-form-item"),J=v("el-option"),G=v("el-select"),M=v("el-button"),D=v("el-checkbox"),x=v("el-input-number");return i(),V("div",Ve,[u(F(Y),{class:"demo-ruleForm",ref:(o,$)=>{$.elFormRef=o,t.value=o},"label-width":"80px",size:"mini",model:a.value},{default:s(()=>[(i(!0),V(H,null,j(a.value,(o,$)=>(i(),V("div",{class:"flex flex-col p-4 bg-gray-500 odd:bg-gray-900",key:$},[h("div",ye,[u(d,{label:"field",prop:"field"},{default:s(()=>[u(c,{modelValue:o.field,"onUpdate:modelValue":n=>o.field=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),u(d,{label:"label",prop:"label"},{default:s(()=>[u(c,{modelValue:o.label,"onUpdate:modelValue":n=>o.label=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),u(d,{label:"type",prop:`${$}.type`,rules:[{required:!0,message:"\u8BF7\u8F93\u5165type",trigger:"change"}]},{default:s(()=>[u(G,{modelValue:o.type,"onUpdate:modelValue":n=>o.type=n,clearable:"",onChange:n=>k(n,$)},{default:s(()=>[(i(!0),V(H,null,j(F(ue),(n,L)=>(i(),f(J,{key:L,value:n.value},{default:s(()=>[U(O(n.label),1)]),_:2},1032,["value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]),_:2},1032,["prop"]),$!==0?(i(),f(M,{key:0,class:"ml-4",type:"danger",icon:F(Z),onClick:n=>r($)},null,8,["icon","onClick"])):b("v-if",!0)]),h("div",he,[u(d,{label:"_value",prop:"_value"},{default:s(()=>[u(c,{modelValue:o._value,"onUpdate:modelValue":n=>o._value=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),u(d,{style:{width:"258px"},label:"_required",prop:"_required"},{default:s(()=>[u(D,{modelValue:o._required,"onUpdate:modelValue":n=>o._required=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),"_message"in o?(i(),f(d,{key:0,label:"_message",prop:"_message"},{default:s(()=>[u(c,{modelValue:o._message,"onUpdate:modelValue":n=>o._message=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0),"_option"in o?(i(),f(d,{key:1,label:"_option",prop:"_option"},{default:s(()=>[u(c,{modelValue:o._option,"onUpdate:modelValue":n=>o._option=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0),"_rows"in o?(i(),f(d,{key:2,label:"_rows",prop:"_rows"},{default:s(()=>[u(x,{modelValue:o._rows,"onUpdate:modelValue":n=>o._rows=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0),"_maxlength"in o?(i(),f(d,{key:3,label:"_maxlength",prop:"_maxlength"},{default:s(()=>[u(x,{modelValue:o._maxlength,"onUpdate:modelValue":n=>o._maxlength=n,clearable:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0),"_size"in o?(i(),f(d,{key:4,label:"_size(MB)",prop:"_size"},{default:s(()=>[u(x,{modelValue:o._size,"onUpdate:modelValue":n=>o._size=n,clearable:"",max:100,min:0},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0),"_accept"in o?(i(),f(d,{key:5,label:"_accept",prop:"_accept"},{default:s(()=>[u(c,{modelValue:o._accept,"onUpdate:modelValue":n=>o._accept=n},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0),"_multiple"in o?(i(),f(d,{key:6,label:"_multiple",prop:"_multiple"},{default:s(()=>[u(D,{modelValue:o._multiple,"onUpdate:modelValue":n=>o._multiple=n},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0),o._multiple?(i(),f(d,{key:7,label:"_limit",prop:"_limit"},{default:s(()=>[u(x,{modelValue:o._limit,"onUpdate:modelValue":n=>o._limit=n,clearable:"",max:100,min:0},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):b("v-if",!0)])]))),128))]),_:1},8,["model"]),h("div",null,[u(M,{onClick:P},{default:s(()=>[xe]),_:1}),u(M,{onClick:p},{default:s(()=>[Fe]),_:1})])])}}const A=B(C(g({},Ue),{props:{code:{type:String,required:!0}},emits:["update:code"],setup:ke})),Me={class:"flex"},we=B({setup(e,{expose:l}){l({CodePanel:N,FormPanel:A});const t=z("");return(a,r)=>(i(),V("div",Me,[u(A,{class:"flex-1",code:t.value,"onUpdate:code":r[0]||(r[0]=p=>t.value=p)},null,8,["code"]),u(N,{class:"flex-1",code:t.value,"onUpdate:code":r[1]||(r[1]=p=>t.value=p)},null,8,["code"])]))}});export{we as default};
