<template>
  <div>
    <div ref="editor" id="boomy" style="width: 800px; height: 600px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

// monaco.editor.create(document.getElementById('container'), {
//   value: "function hello() {\n\talert('Hello world!');\n}",
//   language: 'javascript'
// })

const editorRef = ref(null);

onMounted(() => {
  monaco.languages.register({ id: "yourCustomLanguage" });
  monaco.languages.setLanguageConfiguration("yourCustomLanguage", {
    brackets: [["{", "}"]],
  });

  const CARD_DATA = [
    "declare class Speedycard {",
    "    constructor();",
    "    addTitle(title: string): this;",
    "    addSubtitle(subTitle: string): this;",
    "    addTable(input: (string | number)[][] | {",
    "        [key: string]: string | number;",
    "    }, separator?: boolean): this;",
    "    addChip(payload: string | {",
    "        label: string;",
    "        keyword?: string;",
    "    }, id?: string): this;",
    "    addChips(chips: (string | {",
    "        label: string;",
    "        keyword?: string;",
    "    })[], id?: string): this;",
    '    addImage(url: string, size?: "Small" | "Default" | "Medium" | "Large" | "ExtraLarge"): this;',
    "    addLink(url: string, label?: string): this;",
    "    addText(text: string, config?: {",
    '        size?:  "Small" | "Default" | "Medium" | "Large" | "ExtraLarge";',
    '        align?: "Left" | "Center" | "Right";',
    '        color?: "Default" | "Dark" | "Light" | "Accent" | "Good" | "Warning" | "Attention";',
    "    }): this;",
    "    addSubcard(card: any, textLabel?: string): this;",
    "    addPickerDropdown(choices: (string | number)[], id?: string): this;",
    "    addPickerRadio(choices: (string | number)[], id?: string): this;",
    "    addCheckboxes(choices: (string | number)[], id?: string): this;",
    "    addPickerDate(textLabel: string, id?: string): this;",
    "    addPickerTime(textLabel: string, id?: string): this;",
    "    addTextInput(placeholder: string, id?: string): this;",
    "    addTextarea(placeholder: string, id?: string): this;",
    "    setBackgroundImage(url: string): this;",
    "    setSubmitButtonTitle(label: string): this;",
    "    attachData(payload: {",
    "        [key: string]: any;",
    "    }): this;",
    "    private buildTextPayload;",
    "    private addAction;",
    "    addDeleteButton(label?: string): Speedycard;",
    "    addButton(label: string, id?: string, attachedData?: string | {",
    "        [key: string]: number | string;",
    "    }): Speedycard;",
    "}",
    "declare class Speedybot {",
    "    card(): Speedycard;", // Add explicit return type here
    "}",
  ];
  // Your CARD_DATA here

  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    CARD_DATA.join("\\n"),
    "filename/facts.d.ts"
  );

  //   const editor = monaco.editor.create(editorRef.value, {
  const editor = monaco.editor.create(document.querySelector("#boomy"), {
    value: `const Bot = new Speedybot()
const card = Bot.card().addTitle('My title').addSubtitle('woot')

// attach other methods like .addText(), .addImage(), etc
// Full docs: https://valgaze.github.io/vitepresspublish/api-docs/classes/SpeedyCard`,
    language: "javascript",
  });
});
</script>

<style scoped>
/* Add any necessary styling here */
</style>
