---
outline: deep
---

## Webhooks for Babies 🐣

Webhooks arne't interesting or fun but very important

## Secure webhooks

Speedycard makes it easy
::: code-group

```ts-vue [script.ts (nodejs)]
// npm i speedybot@latest
// npx ts-node script.ts
const crypto = require("crypto");

// validate signature
const validateSignature = (secret, signature, requestData) => {
  const hmac = crypto.createHmac("sha1", secret);
  if (typeof requestData === "string") {
    hmac.update(requestData);
  } else {
    hmac.update(JSON.stringify(requestData));
  }

  const isValid = hmac.digest("hex") === signature;
  return isValid;
};

const requestBody = {
  data: {
    a: 1,
    b: 2,
    c: {
      d: 3,
    },
  },
  signature: "01e0cb6a53731b9615b483335d77d97023410c72",
};
const secret = "myBongoSecret";

const res = validateSignature(secret, requestBody.signature, requestBody.data);

console.log("is valid?", res);

```

```ts-vue [script.ts (WebCrypto (workers, nest, deno, ))]

const validateSignature = async (secret, signature, requestData) => {
  const stringyBody =
    typeof requestData !== "string" ? JSON.stringify(requestData) : requestData;
  const algo = {
    name: "HMAC",
    hash: "SHA-1",
  };
  const enc = {
    name: "UTF-8",
  };
  const hmacKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    algo,
    false,
    ["sign"]
  );
  const hmacData = await crypto.subtle.sign(
    algo,
    hmacKey,
    new TextEncoder().encode(stringyBody)
  );

  const bufferToHex = (buffer) => {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
      .join("");
  };
  const hmacDataHex = bufferToHex(hmacData);
  return hmacDataHex === signature;
};

const requestBody = {
  data: {
    a: 1,
    b: 2,
    c: {
      d: 3,
    },
  },
  signature: "01e0cb6a53731b9615b483335d77d97023410c72",
};
const secret = "myBongoSecret";

const res = validateSignature(
  secret,
  requestBody.signature,
  requestBody.data
).then((val) => console.log("is valid?", val));

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
