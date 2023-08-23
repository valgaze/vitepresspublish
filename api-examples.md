---
outline: deep
---

## Speedycard

Adaptive Cards are great but unwiedly and annoying.

```js
export default {
  data() {
    return {
      msg: "Highlighted!", // [!code  hl]
    };
  },
};
```

Speedycard makes it easy
::: code-group

```ts-vue [script.ts (speedybot)]
// npm i speedybot@latest
// npx ts-node script.ts
import { Speedybot } from "speedybot";
const token = "{{token | '__REPLACE_ME__'}}"

const card = Bot.card()
    .addTitle("Hello there!!")
    .subTitle(`The system time is new Date().toString()`);

Bot.sendTo('email@targer.com', card)

// Bot.sendTo('email@targer.com', card.build())
```

```json [card.json (output)]
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "TextBlock",
      "text": "huh",
      "size": "ExtraLarge",
      "isSubtle": true,
      "wrap": true,
      "weight": "Bolder"
    },
    {
      "type": "TextBlock",
      "text": "Subtitle",
      "size": "Medium",
      "isSubtle": true,
      "wrap": true,
      "weight": "Lighter"
    },
    {
      "type": "TextBlock",
      "text": "New one",
      "wrap": true,
      "size": "Medium",
      "horizontalAlignment": "Left"
    },
    {
      "type": "TextBlock",
      "text": "new one!",
      "wrap": true,
      "size": "Medium",
      "horizontalAlignment": "Left"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "addPickerDropdown_result",
      "value": "0",
      "isMultiSelect": false,
      "isVisible": true,
      "choices": [
        {
          "title": "a",
          "value": "a"
        },
        {
          "title": "b",
          "value": "b"
        },
        {
          "title": "c",
          "value": "c"
        },
        {
          "title": "d",
          "value": "d"
        }
      ]
    },
    {
      "type": "Input.ChoiceSet",
      "id": "addCheckboxes_result",
      "value": "0",
      "isMultiSelect": true,
      "isVisible": true,
      "choices": [
        {
          "title": "yay",
          "value": "yay"
        },
        {
          "title": "nay",
          "value": "nay"
        },
        {
          "title": "way",
          "value": "way"
        },
        {
          "title": "zay",
          "value": "zay"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "My time pick",
      "size": "Medium",
      "isSubtle": true,
      "wrap": true,
      "weight": "Lighter"
    },
    {
      "type": "Input.Time",
      "id": "addPickerTime_result"
    },
    {
      "type": "TextBlock",
      "text": "My date picker",
      "size": "Medium",
      "isSubtle": true,
      "wrap": true,
      "weight": "Lighter"
    },
    {
      "type": "Input.Date",
      "id": "mySpecialDateKeyhere"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "addCheckboxes_result_2",
      "value": "0",
      "isMultiSelect": true,
      "isVisible": true,
      "choices": [
        {
          "title": "a",
          "value": "a"
        },
        {
          "title": "b",
          "value": "b"
        },
        {
          "title": "c",
          "value": "c"
        },
        {
          "title": "d",
          "value": "d"
        }
      ]
    },
    {
      "id": "addTextInput_result",
      "placeholder": "Hello enter text",
      "type": "Input.Text"
    },
    {
      "type": "FactSet",
      "separator": false,
      "facts": [
        {
          "title": "Allen",
          "value": "Dulles"
        },
        {
          "title": "William",
          "value": "Donovan"
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "yo"
    }
  ]
}
```

:::

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
