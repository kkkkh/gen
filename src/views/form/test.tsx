import { ref, defineComponent } from 'vue'
export default defineComponent({
    setup(){
        const a = ref(1)
        return ()=>
            <div>12344</div>
    },
    // render(ctx){
    //     return (
    //         <div>{ctx.a}</div>
    //     )
    // }
})