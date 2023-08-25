<template>
  <div v-html="cardJSON.outerHTML"></div>
</template>

<script setup>
import * as AdaptiveCards from "adaptivecards";
import { ref, onMounted } from "vue";
const emitKw = "valChanged";
const emit = defineEmits();
const cardJSON = ref("<div></div>");
const adaptiveCard = new AdaptiveCards.AdaptiveCard();
adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
  fontFamily: "sans-serif",
});
adaptiveCard.onExecuteAction = function (action, payload) {
  emit("actionButton", { action, payload });
};

const buildCard = (jsonSpec) => {
  adaptiveCard.parse(jsonSpec);
  return adaptiveCard.render();
};
const editorRef = ref(null);
onMounted(() => {
  emit("valChanged", 6666);

  var card = {
    type: "AdaptiveCard",
    version: "1.0",
    body: [
      {
        type: "Image",
        url: "https://adaptivecards.io/content/adaptive-card-50.png",
      },
      {
        type: "TextBlock",
        text: "Hello **Adaptive Cards!**",
      },
    ],
    actions: [
      {
        type: "Action.Submit",
        title: "Learn more",
        url: "https://adaptivecards.io",
      },
      {
        type: "Action.OpenUrl",
        title: "GitHub",
        url: "https://github.com/Microsoft/AdaptiveCards",
      },
    ],
  };

  cardJSON.value = buildCard(card);
});
</script>

<style></style>
