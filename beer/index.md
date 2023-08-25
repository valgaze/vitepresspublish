hell yar

<!-- hmm?<Beer label="Hey look a button" severity="success"/> -->
<MonacoEditor />

<br />
<el-row class="mb-4">
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</el-row>

<textarea v-model="THE_CODE_I_WANT" class="ta" rows=5></textarea>

<textarea v-if="cardData" v-model="cardData" class="ta" rows=5></textarea>

<script setup>
import { Speedybot } from 'speedybot'
import { ref, watch} from 'vue'
import { defineAsyncComponent } from 'vue';
import { inBrowser } from 'vitepress';

const MonacoEditor = inBrowser
  ? defineAsyncComponent(() => import('./monaco.vue'))
  : () => null;

const cardData = null
const THE_CODE_I_WANT = ref(`Bot.card().addTitle('hi')`)
const isLoading = ref(false)

setTimeout(x => {
    isLoading.value = true
}, 4700)

watch(THE_CODE_I_WANT, (newData, oldData) => {
  
try {
    const Bot = new Speedybot()
    const final = `const Bot = new Speedybot();\n${newData}`; // Inject Bot declaration
    const HELP_ME = eval(final);
    console.log("#", HELP_ME)
    const cardData = HELP_ME.build()
    console.log("Nooo bru", cardData)
    } catch(e) {
        console.log("#",e)
    }
});
</script>
