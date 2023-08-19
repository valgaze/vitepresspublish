import {
  __commonJS
} from "./chunk-76J2PTFD.js";

// node_modules/speedybot-mini/dist/src/lib/payloads.types.js
var require_payloads_types = __commonJS({
  "node_modules/speedybot-mini/dist/src/lib/payloads.types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reqTypesEnum = void 0;
    exports.reqTypesEnum = Object.freeze({
      AA: "AA",
      FILE: "FILE",
      TEXT: "TEXT"
    });
  }
});

// node_modules/speedybot-mini/dist/src/lib/common.js
var require_common = __commonJS({
  "node_modules/speedybot-mini/dist/src/lib/common.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logoRoll = exports.finale = exports.fillTemplate = exports.pickRandom = exports.peekFile = exports.makeRequest = exports.checkers = exports.typeIdentifier = exports.placeholder = exports.actions = exports.constants = exports.API = void 0;
    exports.API = {
      getMessage_Details: "https://webexapis.com/v1/messages",
      getAttachmentDetails: "https://webexapis.com/v1/attachment/actions",
      getMembershipDetails: "https://webexapis.com/v1/memberships",
      getPersonDetails: "https://webexapis.com/v1/people",
      sendMessage: "https://webexapis.com/v1/messages",
      createWebhook: "https://webexapis.com/v1/webhooks",
      deleteWebhook: `https://webexapis.com/v1/webhooks`,
      getWebhooks: "https://webexapis.com/v1/webhooks",
      getSelf: "https://webexapis.com/v1/people/me",
      deleteMessage: "https://webexapis.com/v1/messages"
    };
    exports.constants = {
      actionKeyword: "speedybot_action"
    };
    exports.actions = {
      location_abort: "location_abort",
      delete_message: "delete_message",
      delete_stash_card: "delete_stash_card"
    };
    exports.placeholder = "__REPLACE__ME__";
    var typeIdentifier = (payload) => {
      var _a;
      let type;
      if (payload.resource === "messages") {
        if ("files" in payload.data && ((_a = payload.data.files) === null || _a === void 0 ? void 0 : _a.length)) {
          const { files = [] } = payload.data;
          if (files && files.length) {
            type = "FILE";
          }
        } else {
          type = "TEXT";
        }
      }
      if (payload.resource === "attachmentActions") {
        type = "AA";
      }
      if (payload.resource === "memberships") {
        if (payload.event === "deleted") {
          type = "MEMBERSHIP:REMOVE";
        }
        if (payload.event === "created") {
          type = "MEMBERSHIP:ADD";
        }
      }
      return type;
    };
    exports.typeIdentifier = typeIdentifier;
    exports.checkers = {
      isSpeedyCard(input) {
        return typeof input === "object" && "render" in input && typeof input.render === "function";
      },
      isCard(cardCandidate) {
        if (this.isSpeedyCard(cardCandidate))
          return true;
        const stringifiedPayload = JSON.stringify(cardCandidate);
        const isCard = stringifiedPayload.includes("AdaptiveCard") && stringifiedPayload.includes("$schema") && stringifiedPayload.includes("version");
        return isCard;
      },
      isEmail(candidate) {
        const res = candidate.includes("@") && candidate.includes(".");
        return res;
      }
    };
    var makeRequest = (url, body, opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
      const defaultConfig = {
        method: "POST",
        "content-type": "application/json;charset=UTF-8",
        raw: false
      };
      const contentType = opts["content-type"] || defaultConfig["content-type"];
      const init = {
        method: opts.method ? opts.method : defaultConfig.method,
        headers: Object.assign({ "content-type": contentType, Authorization: `Bearer ${opts.token}` }, opts.headers || {})
      };
      if (opts.method === "POST") {
        init.body = opts.raw ? body : JSON.stringify(body);
      }
      const response = yield fetch(url, init);
      return response;
    });
    exports.makeRequest = makeRequest;
    var peekFile = (token, url) => __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, exports.makeRequest)(url, {}, {
        method: "HEAD",
        token
      });
      const type = res.headers.get("content-type");
      const contentDispo = res.headers.get("content-disposition");
      const fileName = contentDispo.split(";")[1].split("=")[1].replace(/\"/g, "");
      const extension = fileName.split(".").pop() || "";
      return {
        fileName,
        type,
        extension
      };
    });
    exports.peekFile = peekFile;
    var pickRandom = (list = []) => {
      return list[Math.floor(Math.random() * list.length)];
    };
    exports.pickRandom = pickRandom;
    var fillTemplate = (utterances, template) => {
      let payload;
      if (typeof utterances !== "string") {
        payload = (0, exports.pickRandom)(utterances) || "";
      } else {
        payload = utterances;
      }
      const replacer = (utterance, target, replacement) => {
        if (!utterance.includes(`$[${target}]`)) {
          return utterance;
        }
        return replacer(utterance.replace(`$[${target}]`, replacement), target, replacement);
      };
      for (const key in template) {
        const val = template[key];
        payload = replacer(payload, key, val);
      }
      return payload;
    };
    exports.fillTemplate = fillTemplate;
    var finale = () => `
Server(less) Time: ${(/* @__PURE__ */ new Date()).toString()}
*
* ╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔╦╗ ╦ ╦ ╔╗  ╔═╗ ╔╦╗
* ╚═╗ ╠═╝ ║╣  ║╣   ║║ ╚╦╝ ╠╩╗ ║ ║  ║
* ╚═╝ ╩   ╚═╝ ╚═╝ ═╩╝  ╩  ╚═╝ ╚═╝  ╩ MINI
*
* Setup Instructions (make your own bot): https://github.com/valgaze/speedybot-mini
* `;
    exports.finale = finale;
    var logoRoll = () => {
      const variants = [
        `
███████╗██████╗ ███████╗███████╗██████╗ ██╗   ██╗██████╗  ██████╗ ████████╗
██╔════╝██╔══██╗██╔════╝██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗██╔═══██╗╚══██╔══╝
███████╗██████╔╝█████╗  █████╗  ██║  ██║ ╚████╔╝ ██████╔╝██║   ██║   ██║   
╚════██║██╔═══╝ ██╔══╝  ██╔══╝  ██║  ██║  ╚██╔╝  ██╔══██╗██║   ██║   ██║   
███████║██║     ███████╗███████╗██████╔╝   ██║   ██████╔╝╚██████╔╝   ██║   
╚══════╝╚═╝     ╚══════╝╚══════╝╚═════╝    ╚═╝   ╚═════╝  ╚═════╝    ╚═╝MINI`,
        `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░███░███░░████░████░███░░█░█░███░░░██░░███░
░█   ░█  █░█   ░█   ░█  █░███░█  █░█  █░ █ ░
░ ██░░███ ░███░░███░░█░░█░ █ ░███ ░█░░█░░█░░
░░  █░█  ░░█  ░░█  ░░█░░█░░█░░█  █░█░░█░░█░░
░███ ░█░░░░████░████░███ ░░█░░███ ░ ██ ░░█░░
░   ░░ ░░░░    ░    ░   ░░░ ░░   ░░░  ░░░ ░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░MINI░░░`,
        `
╱╭━━━╮╱╭━━━╮╱╭━━━╮╱╭━━━╮╱╭━━━╮╱╭╮╱╱╭╮╱╭━━╮╱╱╭━━━╮╱╭━━━━╮╱
╱┃╭━╮┃╱┃╭━╮┃╱┃╭━━╯╱┃╭━━╯╱╰╮╭╮┃╱┃╰╮╭╯┃╱┃╭╮┃╱╱┃╭━╮┃╱┃╭╮╭╮┃╱
╱┃╰━━╮╱┃╰━╯┃╱┃╰━━╮╱┃╰━━╮╱╱┃┃┃┃╱╰╮╰╯╭╯╱┃╰╯╰╮╱┃┃╱┃┃╱╰╯┃┃╰╯╱
╱╰━━╮┃╱┃╭━━╯╱┃╭━━╯╱┃╭━━╯╱╱┃┃┃┃╱╱╰╮╭╯╱╱┃╭━╮┃╱┃┃╱┃┃╱╱╱┃┃╱╱╱
╱┃╰━╯┃╱┃┃╱╱╱╱┃╰━━╮╱┃╰━━╮╱╭╯╰╯┃╱╱╱┃┃╱╱╱┃╰━╯┃╱┃╰━╯┃╱╱╱┃┃╱╱╱
╱╰━━━╯╱╰╯╱╱╱╱╰━━━╯╱╰━━━╯╱╰━━━╯╱╱╱╰╯╱╱╱╰━━━╯╱╰━━━╯╱╱╱MINI╱`,
        `
─╔═══╗─╔═══╗─╔═══╗─╔═══╗─╔═══╗─╔╗──╔╗─╔══╗──╔═══╗─╔════╗─
─║╔═╗║─║╔═╗║─║╔══╝─║╔══╝─╚╗╔╗║─║╚╗╔╝║─║╔╗║──║╔═╗║─║╔╗╔╗║─
─║╚══╗─║╚═╝║─║╚══╗─║╚══╗──║║║║─╚╗╚╝╔╝─║╚╝╚╗─║║─║║─╚╝║║╚╝─
─╚══╗║─║╔══╝─║╔══╝─║╔══╝──║║║║──╚╗╔╝──║╔═╗║─║║─║║───║║───
─║╚═╝║─║║────║╚══╗─║╚══╗─╔╝╚╝║───║║───║╚═╝║─║╚═╝║───║║───
─╚═══╝─╚╝────╚═══╝─╚═══╝─╚═══╝───╚╝───╚═══╝─╚═══╝───╚╝MINI`,
        `
╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔╦╗ ╦ ╦ ╔╗  ╔═╗ ╔╦╗ 
╚═╗ ╠═╝ ║╣  ║╣   ║║ ╚╦╝ ╠╩╗ ║ ║  ║  
╚═╝ ╩   ╚═╝ ╚═╝ ═╩╝  ╩  ╚═╝ ╚═╝  ╩ MINI`
      ];
      const logo = variants[Math.floor(Math.random() * variants.length)];
      return logo;
    };
    exports.logoRoll = logoRoll;
  }
});

// node_modules/speedybot-mini/dist/src/lib/cards.js
var require_cards = __commonJS({
  "node_modules/speedybot-mini/dist/src/lib/cards.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpeedyCard = void 0;
    var common_1 = require_common();
    var SpeedyCard = class _SpeedyCard {
      constructor() {
        this.title = "";
        this.subtitle = "";
        this.titleConfig = {};
        this.subTitleConfig = {};
        this.choices = [];
        this.choiceConfig = {};
        this.image = "";
        this.imageConfig = {};
        this.buttonLabel = "Submit";
        this.inputPlaceholder = "";
        this.inputConfig = {
          id: "inputData"
        };
        this.url = "";
        this.urlLabel = "Go";
        this.tableData = [];
        this.attachedData = {};
        this.needsSubmit = false;
        this.dateData = {};
        this.timeData = {};
        this.backgroundImage = "";
        this.texts = [];
        this.details = [];
        this.json = {
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.0",
          body: []
        };
      }
      setText(text) {
        if (Array.isArray(text)) {
          text.forEach((t) => this.setText(t));
        } else {
          const payload = {
            type: "TextBlock",
            text,
            horizontalAlignment: "Left",
            size: "Medium",
            wrap: true
          };
          this.texts.push(payload);
        }
        return this;
      }
      setBackgroundImage(url) {
        this.backgroundImage = url;
        return this;
      }
      setTitle(title, config) {
        this.title = title;
        if (config) {
          this.titleConfig = config;
        }
        return this;
      }
      setSubtitle(subtitle, config) {
        this.subtitle = subtitle;
        if (config) {
          this.subTitleConfig = config;
        }
        return this;
      }
      setChoices(choices, config) {
        this.choices = choices.map((choice, idx) => {
          return {
            title: String(choice),
            value: String(choice)
          };
        });
        if (config) {
          this.choiceConfig = config;
        }
        return this;
      }
      setImage(url, imageConfig) {
        this.image = url;
        if (imageConfig) {
          this.imageConfig = imageConfig;
        }
        return this;
      }
      setButtonLabel(label) {
        this.buttonLabel = label;
        return this;
      }
      setInput(placeholder, config) {
        this.inputPlaceholder = placeholder;
        if (config) {
          this.inputConfig = config;
        }
        return this;
      }
      setUrl(url, label = "Go") {
        this.urlLabel = label;
        this.url = url;
        return this;
      }
      setUrlLabel(label) {
        this.urlLabel = label;
        return this;
      }
      setTable(input) {
        let core = input;
        if (!Array.isArray(input) && typeof input === "object") {
          core = Object.entries(input);
        }
        this.tableData = core;
        return this;
      }
      setData(payload) {
        if (payload) {
          this.attachedData = payload;
          this.needsSubmit = true;
        }
        return this;
      }
      setDate(id = "selectedDate", label = "") {
        const payload = {
          type: "Input.Date",
          id,
          label
        };
        this.dateData = payload;
        return this;
      }
      setTime(id = "selectedTime", label = "Select a time") {
        const payload = {
          type: "Input.Time",
          id,
          label
        };
        this.timeData = payload;
        return this;
      }
      /**
       *
       * Add a card into a card
       *
       * Kinda like Action.Showcard: https://adaptivecards.io/explorer/Action.ShowCard.html
       *
       *
       * @param payload (another SpeedyCard)
       * @param label
       * @returns
       */
      setDetail(payload, label) {
        const isCard = common_1.checkers.isCard(payload);
        let buttonLabel = label || "Details";
        if ("label" in payload) {
          buttonLabel = payload.label;
        }
        let card;
        if ("render" in payload) {
          card = payload.render();
        } else if (!isCard) {
          card = this.card(payload).render();
        }
        this.details.push({
          type: "Action.ShowCard",
          title: buttonLabel,
          card
        });
        return this;
      }
      addChip(payload, submitLabel = "chip_action") {
        this.setChips([payload], submitLabel);
      }
      addAction(payload, label) {
        this.addChip({ keyword: payload, label }, common_1.constants.actionKeyword);
      }
      /**
       *
       * @param chips
       * @param submitLabel
       * @returns
       */
      setChips(chips, submitLabel = "chip_action") {
        const chipPayload = chips.map((chip) => {
          let chipLabel = "";
          let chipAction = "";
          if (typeof chip === "string") {
            chipLabel = chip;
            chipAction = chip;
          } else {
            const { label, keyword = "" } = chip;
            chipLabel = label;
            if (keyword) {
              chipAction = keyword;
            } else {
              chipAction = label;
            }
          }
          const payload = {
            type: "Action.Submit",
            title: chipLabel,
            data: {
              [submitLabel]: chipAction
            }
          };
          return payload;
        });
        this.json.actions = this.json.actions ? this.json.actions.concat(chipPayload) : chipPayload;
        return this;
      }
      render() {
        var _a;
        if (this.backgroundImage) {
          this.json.backgroundImage = this.backgroundImage;
        }
        if (this.title) {
          const payload = Object.assign({ type: "TextBlock", text: this.title, weight: "Bolder", size: "Large", wrap: true }, this.titleConfig);
          this.json.body.push(payload);
        }
        if (this.subtitle) {
          const payload = Object.assign({ type: "TextBlock", text: this.subtitle, size: "Medium", isSubtle: true, wrap: true, weight: "Lighter" }, this.subTitleConfig);
          this.json.body.push(payload);
        }
        if (this.tableData && this.tableData.length) {
          const payload = {
            type: "FactSet",
            facts: []
          };
          this.tableData.forEach(([label, value], i) => {
            const fact = {
              title: label,
              value
            };
            payload.facts.push(fact);
          });
          this.json.body.push(payload);
        }
        if (this.image) {
          const payload = Object.assign({ type: "Image", url: this.image, horizontalAlignment: "Center", size: "Large" }, this.imageConfig);
          this.json.body.push(payload);
        }
        if (this.choices.length) {
          this.needsSubmit = true;
          const payload = Object.assign({ type: "Input.ChoiceSet", id: "choiceSelect", value: "0", isMultiSelect: false, isVisible: true, choices: this.choices }, this.choiceConfig);
          this.json.body.push(payload);
        }
        if (this.inputPlaceholder) {
          this.needsSubmit = true;
          const payload = Object.assign({ type: "Input.Text", placeholder: this.inputPlaceholder }, this.inputConfig);
          this.json.body.push(payload);
        }
        if (Object.keys(this.dateData).length) {
          const { id, type, label } = this.dateData;
          if (label) {
            this.json.body.push({
              type: "TextBlock",
              text: label,
              wrap: true
            });
          }
          if (id && type) {
            this.json.body.push({ id, type });
          }
          this.needsSubmit = true;
        }
        if (Object.keys(this.timeData).length) {
          const { id, type, label } = this.timeData;
          if (label) {
            this.json.body.push({
              type: "TextBlock",
              text: label,
              wrap: true
            });
          }
          if (id && type) {
            this.json.body.push({ id, type });
          }
          this.needsSubmit = true;
        }
        if (this.texts.length) {
          this.texts.forEach((text) => {
            this.json.body.push(text);
          });
        }
        if (this.needsSubmit) {
          const payload = {
            type: "Action.Submit",
            title: this.buttonLabel
          };
          if (this.attachedData && Object.keys(this.attachedData).length) {
            payload.data = this.attachedData;
          }
          if ((_a = this.json.actions) === null || _a === void 0 ? void 0 : _a.length) {
            this.json.actions.push(payload);
          } else {
            this.json.actions = [payload];
          }
        } else {
          if (this.attachedData && Object.keys(this.attachedData).length) {
            console.log(`attachedData ignore, you must call at least either .setInput(), .setChoices, .setDate, .setTime, to pass through data with an adaptive card`);
          }
        }
        if (this.url) {
          const payload = {
            type: "Action.OpenUrl",
            title: this.urlLabel,
            url: this.url
          };
          if (this.json.actions) {
            this.json.actions.push(payload);
          } else {
            this.json.actions = [payload];
          }
        }
        if (this.details.length) {
          if (!this.json.actions) {
            this.json.actions = [];
          }
          this.details.forEach((detail) => this.json.actions.push(detail));
        }
        return this.json;
      }
      card(config = {}) {
        const card = new _SpeedyCard();
        const { title = "", subTitle = "", image = "", url = "", urlLabel = "", data = {}, chips = [], table = [], choices = [], backgroundImage = "" } = config;
        if (backgroundImage) {
          card.setBackgroundImage;
        }
        if (title) {
          card.setTitle(title);
        }
        if (subTitle) {
          card.setSubtitle(subTitle);
        }
        if (image) {
          card.setImage(image);
        }
        if (url) {
          card.setUrl(url);
        }
        if (urlLabel) {
          card.setUrlLabel(urlLabel);
        }
        if (Object.keys(data).length) {
          card.setData(data);
        }
        if (chips.length) {
          card.setChips(chips);
        }
        if (choices.length) {
          card.setChoices(choices);
        }
        if (table) {
          if (Array.isArray(table) && table.length) {
            card.setTable(table);
          } else {
            if (Object.entries(table).length) {
              card.setTable(table);
            }
          }
        }
        return card;
      }
      renderFull() {
        const cardData = this.render();
        const fullPayload = {
          roomId: "__REPLACE__ME__",
          markdown: "Fallback text **here**",
          attachments: [cardData]
        };
        return fullPayload;
      }
    };
    exports.SpeedyCard = SpeedyCard;
  }
});

// node_modules/speedybot-mini/dist/src/lib/colors.js
var require_colors = __commonJS({
  "node_modules/speedybot-mini/dist/src/lib/colors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BLUE = exports.YELLOW = exports.GREEN = exports.RED = exports.REBECCAPURPLE = void 0;
    exports.REBECCAPURPLE = `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`;
    exports.RED = `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`;
    exports.GREEN = `iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAMbWlDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnluSkJDQAghICb0jUgNICaEFkF4EGyEJJJQYE4KKvSwquHYRxYquiii2lWYBsSuLYu+LBRVlXdTFhsqbkICu+8r3zvfNvX/OnPlPuTO59wCg+YErkeShWgDkiwukCeHBjDFp6QzSU4AAIiADZ+DF5ckkrLi4aABl8P53eXcDWkO56qzg+uf8fxUdvkDGAwAZB3EmX8bLh7gZAHwDTyItAICo0FtOKZAo8ByIdaUwQIhXK3C2Eu9S4EwlPjpgk5TAhvgyAGpULleaDYDGPahnFPKyIY/GZ4hdxXyRGABNJ4gDeEIuH2JF7E75+ZMUuBxiO2gvgRjGA5iZ33Fm/40/c4ify80ewsq8BkQtRCST5HGn/Z+l+d+Snycf9GEDB1UojUhQ5A9reCt3UpQCUyHuFmfGxCpqDfEHEV9ZdwBQilAekay0R415MjasH9CH2JXPDYmC2BjiMHFeTLRKn5klCuNADHcLOlVUwEmC2ADiRQJZaKLKZot0UoLKF1qbJWWzVPpzXOmAX4WvB/LcZJaK/41QwFHxYxpFwqRUiCkQWxWKUmIg1oDYRZabGKWyGVUkZMcM2kjlCYr4rSBOEIjDg5X8WGGWNCxBZV+SLxvMF9siFHFiVPhggTApQlkf7BSPOxA/zAW7LBCzkgd5BLIx0YO58AUhocrcsecCcXKiiueDpCA4QbkWp0jy4lT2uIUgL1yht4DYQ1aYqFqLpxTAzankx7MkBXFJyjjxohxuZJwyHnw5iAZsEAIYQA5HJpgEcoCorbuuG/5SzoQBLpCCbCCAJ1SpGVyROjAjhtdEUAT+gEgAZEPrggdmBaAQ6r8MaZVXZ5A1MFs4sCIXPIU4H0SBPPhbPrBKPOQtBTyBGtE/vHPh4MF48+BQzP97/aD2m4YFNdEqjXzQI0Nz0JIYSgwhRhDDiPa4ER6A++HR8BoEhxvOxH0G8/hmT3hKaCc8IlwndBBuTxTNk/4Q5WjQAfnDVLXI/L4WuA3k9MSDcX/IDplxfdwIOOMe0A8LD4SePaGWrYpbURXGD9x/y+C7p6GyI7uSUfIwchDZ7seVGg4ankMsilp/Xx9lrJlD9WYPzfzon/1d9fnwHvWjJbYIO4SdxU5g57GjWB1gYE1YPdaKHVPgod31ZGB3DXpLGIgnF/KI/uGPq/KpqKTMtdq1y/Wzcq5AMLVAcfDYkyTTpKJsYQGDBd8OAgZHzHNxYri5urkBoHjXKP++3sYPvEMQ/dZvuvm/A+Df1N/ff+SbLrIJgAPe8Pg3fNPZMQHQVgfgXANPLi1U6nDFhQD/JTThSTMEpsAS2MF83IAX8ANBIBREgliQBNLABFhlIdznUjAFzABzQTEoBcvBGrAebAbbwC6wFxwEdeAoOAHOgIvgMrgO7sLd0wlegh7wDvQhCEJCaAgdMUTMEGvEEXFDmEgAEopEIwlIGpKBZCNiRI7MQOYjpchKZD2yFalCDiANyAnkPNKO3EYeIl3IG+QTiqFUVBc1QW3QESgTZaFRaBI6Hs1GJ6NF6AJ0KVqOVqJ70Fr0BHoRvY52oC/RXgxg6pg+Zo45Y0yMjcVi6VgWJsVmYSVYGVaJ1WCN8DlfxTqwbuwjTsTpOAN3hjs4Ak/GefhkfBa+BF+P78Jr8VP4Vfwh3oN/JdAIxgRHgi+BQxhDyCZMIRQTygg7CIcJp+FZ6iS8IxKJ+kRbojc8i2nEHOJ04hLiRuI+YjOxnfiY2EsikQxJjiR/UiyJSyogFZPWkfaQmkhXSJ2kD2rqamZqbmphaulqYrV5amVqu9WOq11Re6bWR9YiW5N9ybFkPnkaeRl5O7mRfIncSe6jaFNsKf6UJEoOZS6lnFJDOU25R3mrrq5uoe6jHq8uUp+jXq6+X/2c+kP1j1QdqgOVTR1HlVOXUndSm6m3qW9pNJoNLYiWTiugLaVV0U7SHtA+aNA1XDQ4GnyN2RoVGrUaVzReaZI1rTVZmhM0izTLNA9pXtLs1iJr2Wixtbhas7QqtBq0bmr1atO1R2rHaudrL9HerX1e+7kOScdGJ1SHr7NAZ5vOSZ3HdIxuSWfTefT59O300/ROXaKurS5HN0e3VHevbptuj56Onodeit5UvQq9Y3od+pi+jT5HP09/mf5B/Rv6n4aZDGMNEwxbPKxm2JVh7w2GGwQZCAxKDPYZXDf4ZMgwDDXMNVxhWGd43wg3cjCKN5pitMnotFH3cN3hfsN5w0uGHxx+xxg1djBOMJ5uvM241bjXxNQk3ERiss7kpEm3qb5pkGmO6WrT46ZdZnSzADOR2WqzJrMXDD0Gi5HHKGecYvSYG5tHmMvNt5q3mfdZ2FokW8yz2Gdx35JiybTMslxt2WLZY2VmNdpqhlW11R1rsjXTWmi91vqs9XsbW5tUm4U2dTbPbQ1sObZFttW29+xodoF2k+0q7a7ZE+2Z9rn2G+0vO6AOng5ChwqHS46oo5ejyHGjY7sTwcnHSexU6XTTmerMci50rnZ+6KLvEu0yz6XO5dUIqxHpI1aMODviq6una57rdte7I3VGRo6cN7Jx5Bs3BzeeW4XbNXeae5j7bPd699cejh4Cj00etzzpnqM9F3q2eH7x8vaSetV4dXlbeWd4b/C+ydRlxjGXMM/5EHyCfWb7HPX56OvlW+B70PdPP2e/XL/dfs9H2Y4SjNo+6rG/hT/Xf6t/RwAjICNgS0BHoHkgN7Ay8FGQZRA/aEfQM5Y9K4e1h/Uq2DVYGnw4+D3blz2T3RyChYSHlIS0heqEJoeuD30QZhGWHVYd1hPuGT49vDmCEBEVsSLiJseEw+NUcXoivSNnRp6KokYlRq2PehTtEC2NbhyNjo4cvWr0vRjrGHFMXSyI5cSuir0fZxs3Oe5IPDE+Lr4i/mnCyIQZCWcT6YkTE3cnvksKTlqWdDfZLlme3JKimTIupSrlfWpI6srUjjEjxswcczHNKE2UVp9OSk9J35HeOzZ07JqxneM8xxWPuzHedvzU8ecnGE3Im3BsouZE7sRDGYSM1IzdGZ+5sdxKbm8mJ3NDZg+PzVvLe8kP4q/mdwn8BSsFz7L8s1ZmPc/2z16V3SUMFJYJu0Vs0XrR65yInM0573Njc3fm9uel5u3LV8vPyG8Q64hzxacmmU6aOqld4igplnRM9p28ZnKPNEq6Q4bIxsvqC3ThR32r3E7+k/xhYUBhReGHKSlTDk3Vniqe2jrNYdriac+Kwop+mY5P501vmWE+Y+6MhzNZM7fOQmZlzmqZbTl7wezOOeFzds2lzM2d+9s813kr5/01P3V+4wKTBXMWPP4p/KfqYo1iafHNhX4LNy/CF4kWtS12X7xu8dcSfsmFUtfSstLPS3hLLvw88ufyn/uXZi1tW+a1bNNy4nLx8hsrAlfsWqm9smjl41WjV9WuZqwuWf3Xmolrzpd5lG1eS1krX9tRHl1ev85q3fJ1n9cL11+vCK7Yt8F4w+IN7zfyN17ZFLSpZrPJ5tLNn7aIttzaGr61ttKmsmwbcVvhtqfbU7af/YX5S9UOox2lO77sFO/s2JWw61SVd1XVbuPdy6rRanl1155xey7vDdlbX+Ncs3Wf/r7S/WC/fP+LAxkHbhyMOthyiHmo5lfrXzccph8uqUVqp9X21AnrOurT6tsbIhtaGv0aDx9xObLzqPnRimN6x5YdpxxfcLy/qaipt1nS3H0i+8Tjloktd0+OOXntVPypttNRp8+dCTtz8izrbNM5/3NHz/ueb7jAvFB30etibatn6+HfPH873ObVVnvJ+1L9ZZ/Lje2j2o9fCbxy4mrI1TPXONcuXo+53n4j+catm+Nudtzi33p+O+/26zuFd/ruzrlHuFdyX+t+2QPjB5W/2/++r8Or49jDkIetjxIf3X3Me/zyiezJ584FT2lPy56ZPat67vb8aFdY1+UXY190vpS87Osu/kP7jw2v7F79+mfQn609Y3o6X0tf979Z8tbw7c6/PP5q6Y3rffAu/13f+5IPhh92fWR+PPsp9dOzvimfSZ/Lv9h/afwa9fVef35/v4Qr5Q58CmBwoFlZALzZCQAtDQA67NsoY5W94IAgyv51AIH/hJX94oB4AVADv9/ju+HXzU0A9m+H7Rfk14S9ahwNgCQfgLq7Dw2VyLLc3ZRcVNinEB7097+FPRtpFQBflvf391X293/ZBoOFvWOzWNmDKoQIe4YtnC+Z+Zng34iyP/0uxx/vQBGBB/jx/i/zoZDc6xYYDgAAAIplWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAOShgAHAAAAEgAAAHigAgAEAAAAAQAAACagAwAEAAAAAQAAACYAAAAAQVNDSUkAAABTY3JlZW5zaG90YWJUtQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAdRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+Mzg8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+Mzg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpVc2VyQ29tbWVudD5TY3JlZW5zaG90PC9leGlmOlVzZXJDb21tZW50PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4K2WZ6jwAAABxpRE9UAAAAAgAAAAAAAAATAAAAKAAAABMAAAATAAADk4/gdzcAAANfSURBVFgJbJYNepxADEOBs2YP0eaCbQ8FfU+2gSU732YYbEnW/ABZX3+/j2Xh99bW5TiOZV0raHaj27d1IRP4cTBeiwdy2dYdzp3AeCcPxnxnSpDYCrbYZmpUSXvwr7+/ZS5HirQA2APRDWeH7jD5bJKS/5kCanDjb+evLKW3zltYnPr8HvXX1x+MkdNSHKZ/GDQnf1ap9eK5a3coRcbTiomaU2nbj1GvWcvRetZ3xbLUOo6KpopUVeL6LWdcveq6FgF5O1ta/CrtjO4GVd6tOOckMmAe9bOVnqdsC5JZfi+OFSV31AHr5SZj3nlw2eiz5LHDOYuG/CjUfSasc4j+wlXfmJef9THG4RdgcYxk9SLUyikhf1YxWlBQbA4jThN8mmN16HKe+uh4e7YaphIxsB/qr1+csayAXQxJizzXUTPXGuA2cJORUk/nhQGZ1pRwPdxO7syg427s7orhR31W7JfSVfdUki46VfHLUndII59a0MOfK0Dj17PJPblsd5ZSpQKnv/M8/E9RA8ZslYORGSFz5pIZ3UGGE4xFaFUL7MFm+x7s+C3ZNYiMpDW+YqwjfSmSZhylG05SRu6rkKDdvWiCIOPETby2f+yKr4mq2PVaY339YyvN2k6gQ9/mnoGyVni3lOeQ/QzFXFNLoHrPnA+HnLf3advzrZ+E50LjH+pz+L85/CYfKnLg+1ZSfOYrzJayANbdd1dOTSXoxZyGQ0ik8hle928v7dss6pPkrMXyl9lStgJq9dhZZei1jGQ7M3uIriKAfowkloScW7NMJurABVE0ugy5nfr5JK28j458xMxY415A8qcaqs1JAxPjw6tbv7e+4TW7e40Ud9lC7iMB5lP9+iSVaR3bJNTWyaxca5ZDYmrzkIGjkCvIfV66fJI0maJhCwY4mJI8F0mI2gmnSNU/P+ICVHM2ztAFDwHBFGR1NjOZbX+IVGsxlWNOmQlnEBUibYDb+OT+kX6rX2csNIF1TnJ76vUglwuhaJ5YBk7Ft3g/JaUm3lb75aB+xDNRP2e2wTG81Bnn/7EgCtRHJQQ5Gph+VLIydkpxSW0NOr5IYRabJzf2M4V4Edaf2hNnYuq3sfGqDcljQY6r6CbW2alknSGONKY0N67EywarW+NWS5vxmIu1zv+s/x8AAP//YTDCxwAAAzJJREFUdZYLYtswDEMj3zW7w7oLLj2UPTwQlBQ3Y9JI/AEUxbgZz9fv6/EYjynSrA5trs2egHaj7nu0S4m87NmcAx9Yh3Zn2MC3bIHoUcfz9ZWI94CiORR5vhOGF4xVexnb9Y7ksh6FpNooUsXXIUINmCx7g1zYJdsYBJ85ccXJJFuXyBpYn15Jxs1awd2OEOETCL4K1lo7LC2f+LeOdRgrFdFzzklBWKrAAsweByEt0vt4zqxEQeAoLMCGWk3H/i8aiOfrj0KruSfJAjmwUJv+Dn1cLlIKb3x1REOzxchs6SgWhWVdh8GH3eHxrln4yT+e31/FQ5oJnVUfKQBlAs7NFucAlQZER85cEiS+0lt5uKoXPtjOv64yQD3Qze8VQm5Wq96ZxOoShay+pAix1dVTkYR8uRobjJJmkXbjX4URbdygZCQMAChmYvrQZpOiR0A5+jpZI2yM2Yassl2q8tCrOiz7jAVPGP0cY0a4U3c8+cP6ViEkYTVO68yh2yHAtNUNkN8HchwKnGIySbgIlOPOXx0j0BOfirRUeOmQAma82bEV2zsX24rXZandTW+SD/wurP1gVSrXwZQsqfnY4ZMl0DHqIUx0GpBLIr5s7pz2ZZFNGzCRj/xcJe31qBAkBK4QKZB6DPjZI/MEjr+OQHRY2ErQ6iuwtbhOZ/8qR1f6gX/8+tZzTIXwMq2X7F1F9uBTlrpDN3m7frnXHCWmiyQ/6Y+TnMliO107kjw9jtdx+wEL5JL6IpCDEMsInmqrL1h7D3Hugq4dXCdMiBO0P7VxMT5K+fiUzTNrCzkk7KJ4/xOHyCQBUOwlUE7D1VZr9kSg4r9jOgwj3+Z1jdDDf72ZiQNf7xv/eP7Vrwv5qhcEQnkrUDrNmF0KnmsOd0wm6ZryH87khTqjlq2x4KDC5qdjLoSKPTQUtYJ8Io67+SrZGPqQ2F+HOzODxQem0NQlpwf5hLHnROmf+OtxoUBfmxnUAoj4AFS+qwYs7ZYnhUDev69SlknIRioMHCL1RyJv6jU+Ntw/+Wv4ScxPCldvoCDDIFldNJbAhJgc7TRNwnCcPvBJZ54yOqhTamsm2VzZxGr+f1OdHzAEGGqzAAAAAElFTkSuQmCC`;
    exports.YELLOW = `iVBORw0KGgoAAAANSUhEUgAAACQAAAAmCAYAAACsyDmTAAAMbWlDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnluSkJDQAghICb0jUgNICaEFkF4EGyEJJJQYE4KKvSwquHYRxYquiii2lWYBsSuLYu+LBRVlXdTFhsqbkICu+8r3zvfNvX/OnPlPuTO59wCg+YErkeShWgDkiwukCeHBjDFp6QzSU4AAIiADZ+DF5ckkrLi4aABl8P53eXcDWkO56qzg+uf8fxUdvkDGAwAZB3EmX8bLh7gZAHwDTyItAICo0FtOKZAo8ByIdaUwQIhXK3C2Eu9S4EwlPjpgk5TAhvgyAGpULleaDYDGPahnFPKyIY/GZ4hdxXyRGABNJ4gDeEIuH2JF7E75+ZMUuBxiO2gvgRjGA5iZ33Fm/40/c4ify80ewsq8BkQtRCST5HGn/Z+l+d+Snycf9GEDB1UojUhQ5A9reCt3UpQCUyHuFmfGxCpqDfEHEV9ZdwBQilAekay0R415MjasH9CH2JXPDYmC2BjiMHFeTLRKn5klCuNADHcLOlVUwEmC2ADiRQJZaKLKZot0UoLKF1qbJWWzVPpzXOmAX4WvB/LcZJaK/41QwFHxYxpFwqRUiCkQWxWKUmIg1oDYRZabGKWyGVUkZMcM2kjlCYr4rSBOEIjDg5X8WGGWNCxBZV+SLxvMF9siFHFiVPhggTApQlkf7BSPOxA/zAW7LBCzkgd5BLIx0YO58AUhocrcsecCcXKiiueDpCA4QbkWp0jy4lT2uIUgL1yht4DYQ1aYqFqLpxTAzankx7MkBXFJyjjxohxuZJwyHnw5iAZsEAIYQA5HJpgEcoCorbuuG/5SzoQBLpCCbCCAJ1SpGVyROjAjhtdEUAT+gEgAZEPrggdmBaAQ6r8MaZVXZ5A1MFs4sCIXPIU4H0SBPPhbPrBKPOQtBTyBGtE/vHPh4MF48+BQzP97/aD2m4YFNdEqjXzQI0Nz0JIYSgwhRhDDiPa4ER6A++HR8BoEhxvOxH0G8/hmT3hKaCc8IlwndBBuTxTNk/4Q5WjQAfnDVLXI/L4WuA3k9MSDcX/IDplxfdwIOOMe0A8LD4SePaGWrYpbURXGD9x/y+C7p6GyI7uSUfIwchDZ7seVGg4ankMsilp/Xx9lrJlD9WYPzfzon/1d9fnwHvWjJbYIO4SdxU5g57GjWB1gYE1YPdaKHVPgod31ZGB3DXpLGIgnF/KI/uGPq/KpqKTMtdq1y/Wzcq5AMLVAcfDYkyTTpKJsYQGDBd8OAgZHzHNxYri5urkBoHjXKP++3sYPvEMQ/dZvuvm/A+Df1N/ff+SbLrIJgAPe8Pg3fNPZMQHQVgfgXANPLi1U6nDFhQD/JTThSTMEpsAS2MF83IAX8ANBIBREgliQBNLABFhlIdznUjAFzABzQTEoBcvBGrAebAbbwC6wFxwEdeAoOAHOgIvgMrgO7sLd0wlegh7wDvQhCEJCaAgdMUTMEGvEEXFDmEgAEopEIwlIGpKBZCNiRI7MQOYjpchKZD2yFalCDiANyAnkPNKO3EYeIl3IG+QTiqFUVBc1QW3QESgTZaFRaBI6Hs1GJ6NF6AJ0KVqOVqJ70Fr0BHoRvY52oC/RXgxg6pg+Zo45Y0yMjcVi6VgWJsVmYSVYGVaJ1WCN8DlfxTqwbuwjTsTpOAN3hjs4Ak/GefhkfBa+BF+P78Jr8VP4Vfwh3oN/JdAIxgRHgi+BQxhDyCZMIRQTygg7CIcJp+FZ6iS8IxKJ+kRbojc8i2nEHOJ04hLiRuI+YjOxnfiY2EsikQxJjiR/UiyJSyogFZPWkfaQmkhXSJ2kD2rqamZqbmphaulqYrV5amVqu9WOq11Re6bWR9YiW5N9ybFkPnkaeRl5O7mRfIncSe6jaFNsKf6UJEoOZS6lnFJDOU25R3mrrq5uoe6jHq8uUp+jXq6+X/2c+kP1j1QdqgOVTR1HlVOXUndSm6m3qW9pNJoNLYiWTiugLaVV0U7SHtA+aNA1XDQ4GnyN2RoVGrUaVzReaZI1rTVZmhM0izTLNA9pXtLs1iJr2Wixtbhas7QqtBq0bmr1atO1R2rHaudrL9HerX1e+7kOScdGJ1SHr7NAZ5vOSZ3HdIxuSWfTefT59O300/ROXaKurS5HN0e3VHevbptuj56Onodeit5UvQq9Y3od+pi+jT5HP09/mf5B/Rv6n4aZDGMNEwxbPKxm2JVh7w2GGwQZCAxKDPYZXDf4ZMgwDDXMNVxhWGd43wg3cjCKN5pitMnotFH3cN3hfsN5w0uGHxx+xxg1djBOMJ5uvM241bjXxNQk3ERiss7kpEm3qb5pkGmO6WrT46ZdZnSzADOR2WqzJrMXDD0Gi5HHKGecYvSYG5tHmMvNt5q3mfdZ2FokW8yz2Gdx35JiybTMslxt2WLZY2VmNdpqhlW11R1rsjXTWmi91vqs9XsbW5tUm4U2dTbPbQ1sObZFttW29+xodoF2k+0q7a7ZE+2Z9rn2G+0vO6AOng5ChwqHS46oo5ejyHGjY7sTwcnHSexU6XTTmerMci50rnZ+6KLvEu0yz6XO5dUIqxHpI1aMODviq6una57rdte7I3VGRo6cN7Jx5Bs3BzeeW4XbNXeae5j7bPd699cejh4Cj00etzzpnqM9F3q2eH7x8vaSetV4dXlbeWd4b/C+ydRlxjGXMM/5EHyCfWb7HPX56OvlW+B70PdPP2e/XL/dfs9H2Y4SjNo+6rG/hT/Xf6t/RwAjICNgS0BHoHkgN7Ay8FGQZRA/aEfQM5Y9K4e1h/Uq2DVYGnw4+D3blz2T3RyChYSHlIS0heqEJoeuD30QZhGWHVYd1hPuGT49vDmCEBEVsSLiJseEw+NUcXoivSNnRp6KokYlRq2PehTtEC2NbhyNjo4cvWr0vRjrGHFMXSyI5cSuir0fZxs3Oe5IPDE+Lr4i/mnCyIQZCWcT6YkTE3cnvksKTlqWdDfZLlme3JKimTIupSrlfWpI6srUjjEjxswcczHNKE2UVp9OSk9J35HeOzZ07JqxneM8xxWPuzHedvzU8ecnGE3Im3BsouZE7sRDGYSM1IzdGZ+5sdxKbm8mJ3NDZg+PzVvLe8kP4q/mdwn8BSsFz7L8s1ZmPc/2z16V3SUMFJYJu0Vs0XrR65yInM0573Njc3fm9uel5u3LV8vPyG8Q64hzxacmmU6aOqld4igplnRM9p28ZnKPNEq6Q4bIxsvqC3ThR32r3E7+k/xhYUBhReGHKSlTDk3Vniqe2jrNYdriac+Kwop+mY5P501vmWE+Y+6MhzNZM7fOQmZlzmqZbTl7wezOOeFzds2lzM2d+9s813kr5/01P3V+4wKTBXMWPP4p/KfqYo1iafHNhX4LNy/CF4kWtS12X7xu8dcSfsmFUtfSstLPS3hLLvw88ufyn/uXZi1tW+a1bNNy4nLx8hsrAlfsWqm9smjl41WjV9WuZqwuWf3Xmolrzpd5lG1eS1krX9tRHl1ev85q3fJ1n9cL11+vCK7Yt8F4w+IN7zfyN17ZFLSpZrPJ5tLNn7aIttzaGr61ttKmsmwbcVvhtqfbU7af/YX5S9UOox2lO77sFO/s2JWw61SVd1XVbuPdy6rRanl1155xey7vDdlbX+Ncs3Wf/r7S/WC/fP+LAxkHbhyMOthyiHmo5lfrXzccph8uqUVqp9X21AnrOurT6tsbIhtaGv0aDx9xObLzqPnRimN6x5YdpxxfcLy/qaipt1nS3H0i+8Tjloktd0+OOXntVPypttNRp8+dCTtz8izrbNM5/3NHz/ueb7jAvFB30etibatn6+HfPH873ObVVnvJ+1L9ZZ/Lje2j2o9fCbxy4mrI1TPXONcuXo+53n4j+catm+Nudtzi33p+O+/26zuFd/ruzrlHuFdyX+t+2QPjB5W/2/++r8Or49jDkIetjxIf3X3Me/zyiezJ584FT2lPy56ZPat67vb8aFdY1+UXY190vpS87Osu/kP7jw2v7F79+mfQn609Y3o6X0tf979Z8tbw7c6/PP5q6Y3rffAu/13f+5IPhh92fWR+PPsp9dOzvimfSZ/Lv9h/afwa9fVef35/v4Qr5Q58CmBwoFlZALzZCQAtDQA67NsoY5W94IAgyv51AIH/hJX94oB4AVADv9/ju+HXzU0A9m+H7Rfk14S9ahwNgCQfgLq7Dw2VyLLc3ZRcVNinEB7097+FPRtpFQBflvf391X293/ZBoOFvWOzWNmDKoQIe4YtnC+Z+Zng34iyP/0uxx/vQBGBB/jx/i/zoZDc6xYYDgAAAIplWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAOShgAHAAAAEgAAAHigAgAEAAAAAQAAACSgAwAEAAAAAQAAACYAAAAAQVNDSUkAAABTY3JlZW5zaG90JS99ZAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAdRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+Mzg8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MzY8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpVc2VyQ29tbWVudD5TY3JlZW5zaG90PC9leGlmOlVzZXJDb21tZW50PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KFcjjjAAAABxpRE9UAAAAAgAAAAAAAAATAAAAKAAAABMAAAATAAAAcerJp6AAAAA9SURBVFgJ7NKxFQAABANR9raicdSMcK3itGm8n+R0bTy69CFoQyEACoUUIgHK3ZBCJEC5G1KIBCh3QyR0AAAA//++LyCxAAAAOklEQVTt0rEVAAAEA1H2tqJx1IxwreK0abyf5HRtPLr0IWhDIQAKhRQiAcrdkEIkQLkbUogEKHdDJHT6I3s1kBzd4gAAAABJRU5ErkJggg==`;
    exports.BLUE = `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`;
  }
});

// node_modules/speedybot-mini/dist/src/lib/bot.js
var require_bot = __commonJS({
  "node_modules/speedybot-mini/dist/src/lib/bot.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebhookBot = exports.InitBot = exports.BotInst = void 0;
    var cards_1 = require_cards();
    var colors_1 = require_colors();
    var common_1 = require_common();
    var BotInst = class {
      constructor(config, makeRequest = common_1.makeRequest) {
        this.config = config;
        this.makeRequest = makeRequest;
        this.roomId = "";
        this.fallbackText = "Sorry, it appears your client does not support rendering Adaptive Cards, see here for more info: https://developer.webex.com/docs/api/guides/cards";
        this.token = "";
        this.meta = {
          url: ""
        };
        this.locales = {};
        this.API = common_1.API;
        this.roomId = config.roomId;
        this.token = config.token;
        if (config.locales) {
          this.locales = config.locales;
        }
        if (config.url) {
          this.meta.url = config.url.slice(-1) === "/" ? config.url : `${config.url}/`;
        }
        if (config.fallbackText) {
          this.fallbackText = config.fallbackText;
        }
      }
      /**
       * Grab a random element from a list
       * ```ts
          const list = [1, 2, 3];
          const $bot = { pickRandom(x: any[]) {} };
          $bot.pickRandom(list); // 2
       * ```
       */
      pickRandom(list = []) {
        return (0, common_1.pickRandom)(list);
      }
      /**
       * Grab a random element from a list
       * ```ts
          const list = ['hi, 'hello', 'yo'];
          $bot.sendRandom(list); // 'hello'
       * ```
       */
      sendRandom(list = []) {
        return this.send(this.pickRandom(list));
      }
      /**
       * Fill in a template (usually used by sendTemplate)
       * ```ts
       *   const utterances = ['Howdy $[name], here's $[flavor]', '$[name], here\'s your $[flavor] ice cream']
       *   const template = { name: 'Joe', flavor: 'strawberry' }
       *   const response = $bot.fillTemplate(utterances, template) // "Joe, here's your strawberry ice cream"
       *
       *
       *   const response2 = $bot.fillTemplate('Hi there the time is $[date]', {date: new Date().toString()})
       * ```
       */
      fillTemplate(utterances, template) {
        return (0, common_1.fillTemplate)(utterances, template);
      }
      /**
       * Send a template
       * ```ts
       *  const utterances = ['Howdy $[name], here's $[flavor]', '$[name], here's your $[flavor] ice cream']
       *  const template = { name: 'Joe', flavor: 'strawberry' }
       *  $bot.sendRandom(utterances, template) // "Joe, here's your strawberry ice cream"
       *
       * ```
       */
      /**
       *
       * Send a url wrapped in a card
       *
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *   const utterances = [
       *     'Howdy $[name], here is a $[flavor]',
       *     '$[name], one $[flavor] ice cream for you',
       *   ]
       *   const template = { name: 'Joe', flavor: 'strawberry' }
       *   $bot.sendTemplate(utterances, template)
       *  })
       * ```
       *
       */
      sendTemplate(utterances, template = {}) {
        const res = this.fillTemplate(utterances, template);
        return this.send(res);
      }
      /**
       *
       * Send a url wrapped in a card
       *
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *     const url = 'https://codepen.io/valgaze/pen/PoEpxpb'
       *    $bot.sendURL(url, 'Check this out', '💫 See Resource')
       * })
       * ```
       *
       */
      sendURL(url, title, buttonTitle = "Go") {
        return __awaiter(this, void 0, void 0, function* () {
          const card = new cards_1.SpeedyCard();
          if (title) {
            card.setTitle(title).setUrl(url, buttonTitle);
          } else {
            card.setSubtitle(url).setUrl(url, buttonTitle);
          }
          return this.send(card);
        });
      }
      /**
       * Reach an api that returns JSON-- alias to fetch
       *
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const adviceResponse = await $bot.api('https://api.adviceslip.com/advice')
       *    const adviceText = $bot.lookUp(adviceResponse, 'slip.advice')
       *    $bot.send(`Here' some advice: ${adviceText}`)
       * })
       * ```
       *
       */
      api(request, requestInitr) {
        return __awaiter(this, void 0, void 0, function* () {
          const res = yield fetch(request, requestInitr);
          try {
            const json = yield res.json();
            return json;
          } catch (e) {
            return {};
          }
        });
      }
      /**
       *
       * Send a 1-1/DM message to a user based on their email or personId
       *
       * You can send a string or a card
       *
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *  $bot.dm('username@domain.com', 'Here is a secret message')
       *
       *  $bot.dm('aaa-bbb-ccc-ddd-eee', $bot.card({title:'biscotti', subTitle:'Is it biscotti or biscotto?' url: 'https://youtu.be/6A8W77m-ZTw?t=114', chips:['biscotti','biscotto']}))
       *
       * })
       *
       * ```
       */
      dm(personIdOrEmail, message, fallback) {
        return __awaiter(this, void 0, void 0, function* () {
          const payload = {
            text: this.fallbackText
          };
          if (common_1.checkers.isEmail(personIdOrEmail)) {
            payload["toPersonEmail"] = personIdOrEmail;
          } else {
            payload["toPersonId"] = personIdOrEmail;
          }
          if (typeof message === "string") {
            payload["markdown"] = message;
            payload["text"] = message;
          }
          const isCard = common_1.checkers.isCard(message);
          if (isCard) {
            if (fallback) {
              payload["text"] = fallback;
            }
            const cardPayload = [
              {
                contentType: "application/vnd.microsoft.card.adaptive",
                content: typeof message !== "string" && "render" in message && typeof message.render === "function" ? message.render() : message
              }
            ];
            payload["attachments"] = cardPayload;
          }
          const res = yield this.makeRequest(this.API.sendMessage, payload, {
            method: "POST",
            "content-type": "application/json",
            token: this.token
          });
          return res;
        });
      }
      /**
       * $bot.send, core "workhorse" utility that can send whatever you throw at it
       * roomId by default is whatever is bound to bot instance
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('token_placeholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *  // Send a simple string
       *  $bot.send('Send a string')
       *
       *  // Send a card: https://developer.webex.com/docs/api/guides/cards
       *  $bot.send($bot.card({title:'My special card', subTitle:'My great subtitle', chips:['ping','pong','hi']}))
       *
       *  // Send a traditional ToMessage
       *  const payload = {
       *    toPersonEmail: 'fake_name@org.com',
       *    markdown: 'some **great** content',
       *  }
       *  $bot.send(payload)
       *  })
       *
       * ```
       *
       */
      send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
          let body = {};
          if (payload && typeof payload !== "string") {
            if ("toPersonId" in payload) {
              body["toPersonId"] = payload.toPersonId;
            }
            if ("toPersonEmail" in payload) {
              body["toPersonEmail"] = payload.toPersonEmail;
            }
            if ("roomId" in payload) {
              body["roomId"] = this.roomId;
            }
            if (payload && !("roomId" in payload) && !("toPersonEmail" in payload) && !("toPersonId" in payload)) {
              body["roomId"] = this.roomId;
            }
          }
          if (typeof payload === "string") {
            body["roomId"] = this.roomId;
            body.markdown = payload;
            body.text = payload;
          } else if (typeof payload === "object") {
            const isCard = common_1.checkers.isCard(payload);
            if (isCard) {
              body = Object.assign(Object.assign({}, body), { markdown: this.fallbackText, text: this.fallbackText, attachments: [
                {
                  contentType: "application/vnd.microsoft.card.adaptive",
                  content: "render" in payload && typeof payload.render === "function" ? payload.render() : payload
                }
              ] });
            } else {
              body = Object.assign(Object.assign({}, body), payload);
            }
          }
          const res = yield this.makeRequest(this.API.sendMessage, body, {
            method: "POST",
            "content-type": "application/json",
            token: this.token
          });
          const json = yield res.json();
          return json;
        });
      }
      /**
       *
       * Convenience helper that creates a SpeedyCard
       *
       * ![cards](media://demo_sendcard.gif)
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *   const cardData = $bot.card({
       *     title: "Speedybot Hub",
       *     subTitle: "Sign the paperwork",
       *     chips: ["ping", "pong", "hi",],
       *     image: "https://github.com/valgaze/speedybot-mini/raw/deploy/docs/assets/logo.png?raw=true",
       *     url: "https://github.com/valgaze/speedybot-mini"
       *   });
       *   $bot.send(cardData);
       *  })
       *
       * ```
       */
      card(config = {}) {
        const card = new cards_1.SpeedyCard();
        const { title = "", subTitle = "", image = "", url = "", urlLabel = "", data = {}, chips = [], table = [], choices = [], backgroundImage = "" } = config;
        if (backgroundImage) {
          card.setBackgroundImage;
        }
        if (title) {
          card.setTitle(title);
        }
        if (subTitle) {
          card.setSubtitle(subTitle);
        }
        if (image) {
          card.setImage(image);
        }
        if (url) {
          card.setUrl(url);
        }
        if (urlLabel) {
          card.setUrlLabel(urlLabel);
        }
        if (Object.keys(data).length) {
          card.setData(data);
        }
        if (chips.length) {
          card.setChips(chips);
        }
        if (choices.length) {
          card.setChoices(choices);
        }
        if (table) {
          if (Array.isArray(table) && table.length) {
            card.setTable(table);
          } else {
            if (Object.entries(table).length) {
              card.setTable(table);
            }
          }
        }
        return card;
      }
      /**
       *
       * Get bot's meta data
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const botData = await $bot.getSelf()
       *    $bot.send(`Hi I'm a bot & my name is ${botData.displayName}`)
       *  })
       * ```
       */
      getSelf() {
        return __awaiter(this, void 0, void 0, function* () {
          const url = this.API.getSelf;
          const res = yield this.makeRequest(url, {}, {
            token: this.token,
            method: "GET"
          });
          const json = yield res.json();
          return json;
        });
      }
      /**
       *
       * Delete a message (need a valid messageId)
       *
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *   const msg = await $bot.send('My message to be deleted')
       *   $bot.deleteMessage(msg.id)
       * })
       * ```
       */
      deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
          const url = `${this.API.deleteMessage}/${messageId}`;
          const res = yield this.makeRequest(url, {}, {
            token: this.token,
            method: "DELETE"
          });
          return res;
        });
      }
      /**
       * Temporary card that you can stash away data and destroy
       *
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *   const msg = 'mysecret'
       *   $bot.stashCard('mySecret')
       * })
       *
       * ```
       */
      stashCard(secret, message) {
        return this.card({ title: message || "Info" }).setDetail({
          subTitle: secret
        }).setData({ [common_1.constants.actionKeyword]: "delete" }).setButtonLabel("🔥 Burn Data");
      }
      /**
       * Cheap way to get content-dispoition header & content-type and get extension
       * @param url
       * @returns
       */
      peekFile(url) {
        return __awaiter(this, void 0, void 0, function* () {
          return (0, common_1.peekFile)(this.token, url);
        });
      }
      /**
       * Get a (secured) file's contents, probably would use this for examining uploaded files
       * like JSON, excel (xlsx), etc
       *
       * @param url
       *
       * @param opts
       * @returns
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *   const [fileUrl] = trigger.message.files || []
       *   const fileData = await $bot.getFile(fileUrl, {
       *     responseType: 'arraybuffer',
       *   })
       *   const { fileName, extension, type } = fileData
       *   $bot.say(
       *     `The file you uploaded (${fileName}), is a ${extension} file of type ${type}`
       *   )
       *    // with fileData.data you have access to an arrayBuffer with the raw bytes of that file
       * })
       *
       * ```
       * */
      getFile(url, opts = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const res = yield this.makeRequest(url, {}, {
            method: "GET",
            token: this.token
          });
          const type = res.headers.get("content-type");
          const contentDispo = res.headers.get("content-disposition");
          const fileName = contentDispo.split(";")[1].split("=")[1].replace(/\"/g, "");
          const extension = fileName.split(".").pop() || "";
          const shouldProbablyBeArrayBuffer = !type.includes("json") && !type.includes("text") || type.includes("image");
          let data = res;
          if (opts.responseType === "arraybuffer" || shouldProbablyBeArrayBuffer) {
            try {
              data = yield res.arrayBuffer();
            } catch (e) {
              data = {};
            }
          } else {
            try {
              if (type.includes("json")) {
                data = yield res.json();
              } else {
                data = yield res.text();
              }
            } catch (e) {
              data = {};
            }
          }
          let markdownSnippet = `***No markdown preview available for ${type}***`;
          const payload = {
            fileName,
            extension,
            type,
            data,
            markdownSnippet: type === "application/json" || typeof data === "string" && data.length < 900 ? this.snippet(data) : markdownSnippet
          };
          return payload;
        });
      }
      generateFileName() {
        return `${this.rando()}_${this.rando()}`;
      }
      /**
       * Generate a random string of 11 characters (letters + numbers)
       */
      rando() {
        return Math.random().toString(36).slice(2);
      }
      handleExtension(input = "") {
        const hasDot = input.indexOf(".") > -1;
        let fileName = "";
        const [prefix, ext] = input.split(".");
        if (hasDot) {
          if (!prefix || prefix === "*") {
            fileName = `${this.generateFileName()}.${ext}`;
          } else {
            fileName = input;
          }
        } else {
          fileName = `${this.generateFileName()}.${prefix}`;
        }
        return fileName;
      }
      /**
       *
       *
       * Generate a file and fill it with the data you provide and send to user to download
       *
       * At minimum, provide the file data & desired file extension
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const myData = { a: 1, b: 2, c: [1,2,3,'hello', 'bonjour']}
       *    $bot.sendDataAsFile(myData, 'json')
       *    // with fileData.data you have access to an arrayBuffer with the raw bytes of that file
       * })
       *
       * ```
       */
      sendDataAsFile(data, extensionOrFileName, contentType = null, textLabel, overrides = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!extensionOrFileName) {
            throw new Error(`$(bot).sendDataAsFile: Missing filename/extension parameter, ex "myfile.png" or "*.png"`);
          }
          let finalContentType = contentType;
          if (!finalContentType) {
            finalContentType = this.guessContentType(extensionOrFileName);
            if (!finalContentType) {
              throw new Error(`$(bot).sendDataAsFile: Missing 'content-type' parameter, ex "image/png"`);
            }
          }
          const fullFileName = this.handleExtension(extensionOrFileName);
          const formData = new FormData();
          const { toPersonId = null, toPersonEmail = null, roomId = null } = overrides;
          const label = toPersonId ? "toPersonId" : toPersonEmail ? "toPersonEmail" : "roomId";
          const destinationValue = toPersonId ? toPersonId : toPersonEmail ? toPersonEmail : roomId || this.roomId;
          const isJSON = data && typeof data === "object" && finalContentType.includes("json");
          formData.append("files", new Blob([isJSON ? JSON.stringify(data, null, 2) : data], {
            type: finalContentType
          }), fullFileName);
          formData.append(label, destinationValue);
          formData.append("text", textLabel || " ");
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${this.token}`);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData
          };
          const res = yield fetch(common_1.API.sendMessage, requestOptions);
          return res;
        });
      }
      guessContentType(extensionOrFileName) {
        const hasDot = extensionOrFileName.indexOf(".") > -1;
        let extension = "";
        const pieces = extensionOrFileName.split(".");
        const hasMultipleDots = pieces.length > 2;
        const [prefix, ext] = pieces;
        if (hasDot) {
          if (!prefix || prefix === "*") {
            extension = ext;
          }
          if (hasMultipleDots) {
            extension = pieces.pop();
          }
        } else {
          extension = prefix;
        }
        const mapping = {
          doc: "application/msword",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          xls: "application/vnd.ms-excel",
          xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ppt: "application/vnd.ms-powerpoint",
          pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          pdf: "application/pdf",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          bmp: "image/bmp",
          gif: "image/gif",
          png: "image/png",
          txt: "text/plain",
          csv: "text/csv",
          html: "text/html",
          json: "application/json",
          "*": "application/octet-stream",
          mp3: "audio/mpeg",
          mp4: "video/mp4",
          mpeg: "video/mpeg",
          mpkg: "application/vnd.apple.installer+xml",
          vf: "application/json"
          // voiceflow
        };
        const res = mapping[extension] || null;
        return res;
      }
      /**
       *
       * Trigger handler matching as if entered by the user
       *
       * This will not trigger .every or .noMatch handlers
       *
       * **Note:** The ```msg``` parameter of matched handler function will refer to the original message
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  $bot.send('This is the hi greeting handler!')
       * })
       *
       * CultureBot.contains('trigger', async ($bot, msg) => {
       *  $bot.send('About to trigger the hi trigger')
       *  $bot.trigger('hi', msg)
       * })
       *
       * ```
       */
      trigger(text, msg) {
        return __awaiter(this, void 0, void 0, function* () {
          const speedyRef = this.config.SpeedybotInst;
          const handlerRef = speedyRef.processText(text, true);
          const decoratedMessage = Object.assign(msg, { text });
          if (handlerRef) {
            return yield handlerRef(this, decoratedMessage);
          }
          return 0;
        });
      }
      /**
       * Send a message with a reply
       *
       * @param thread
       * ex
       * $bot.thread([$bot.card().setTitle('hello world!').setChips(['a','b','c']), 'Pick one of the above!'])
       *
       */
      /**
       *
       * Send a message and attach replies
       *
       * Current Limitations :(
       * - Only 1st message can be a card
       * - Replies can only be strings
       * - With more than 2-3 replies, order is not guaranteed (replies can arrive out of order)
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *   $bot.thread([$bot.card().setTitle('hello world!').setChips(['a','b','c']), 'Pick one of the above!', 'Come on do it!'])
       * })
       *
       * ```
       */
      thread(thread) {
        return __awaiter(this, void 0, void 0, function* () {
          let [root, ...messages] = thread;
          const { id: parentId } = yield this.send(root);
          for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            let msgObj = {
              parentId
            };
            if (typeof msg === "string") {
              msgObj["markdown"] = msg;
              msgObj["text"] = msg;
            }
            if (typeof msg === "object") {
              msgObj = Object.assign(Object.assign({}, msgObj), msg);
            }
            this.send(msgObj);
          }
        });
      }
      /**
       * Translate a string based on provided locale config
       *
       * ```ts
       * // locale data (gets specified into Speedybot config)
       * const locales = {
       *  en: {
       *    greetings: {
       *      welcome: 'Hello!!'
       *    }
       *  },
       *  es: {
       *    greetings: {
       *      welcome: 'hola!!'
       *    }
       *  },
       *  cn: {
       *    greetings: {
       *      welcome: '你好'
       *    }
       *  }
       * }
       *
       * const config = {
       *  token: 'abc',
       *  locales
       * }
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const eng = $bot.translate('en', 'greetings.welcome') // 'Hello!!'
       *    const esp = $bot.translate('es', 'greetings.welcome') // 'hola!!'
       *    const chn = $bot.translate('cn', 'greetings.welcome') // '你好'
       *    const fallback = $bot.translate('whoops_doesnt_exist', 'greetings.welcome', 'Hey there fallback!')
       *    $bot.send(`${eng}, ${esp}, ${chn}, ${fallback}`)
       * })
       *
       *
       * ```
       *
       */
      translate(locale, lookup, template = {}, fallback = "") {
        const selectedLocale = this.locales[locale] || {};
        const content = this.lookUp(selectedLocale, lookup, fallback);
        if (Object.keys(template)) {
          return this.fillTemplate(content, template);
        } else {
          return content;
        }
      }
      /**
       * Provide a URL but it gets returned as a file
       *
       * Filetypes: 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'gif', 'png'
       * See more info here: https://developer.webex.com/docs/basics
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const pdfURL = 'https://speedybot.valgaze.com'
       *    $bot.sendDataFromUrl(pdfURL, "Here's a doc!")
       *  })
       * ```
       *
       */
      sendDataFromUrl(url, fallbackText = " ") {
        return this.send({
          files: [url],
          text: fallbackText
        });
      }
      /**
       * Logs to system
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    $bot.log('Testing 123')
       *    $bot.log(`Input text: ${msg.text}`)
       *  })
       * ```
       *
       */
      log(...payload) {
        console.log.apply(console, payload);
      }
      /**
       * Takes input data and wraps in markdown backticks
       * @param data
       * @param dataType
       * @returns
       */
      snippet(data, dataType = "json") {
        const msg = `
\`\`\`${dataType}
${dataType === "json" ? JSON.stringify(data, null, 2) : data}
\`\`\``;
        return msg;
      }
      /**
       * Clear the screen on desktop clients (useful for demos)
       *
       * ```ts
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *   $bot.send('This will more or less disappear...')
       *   $bot.clearScreen()
       *  })
       * ```
       *
       */
      clearScreen(repeatCount = 50) {
        return __awaiter(this, void 0, void 0, function* () {
          const newLine = "\n";
          const repeatClamp = repeatCount > 7e3 ? 5e3 : repeatCount;
          const clearScreen = `${newLine.repeat(repeatClamp)}`;
          const payload = {
            markdown: clearScreen,
            text: clearScreen
          };
          return this.send(payload);
        });
      }
      /**
       * Display a snippet of nicely-formatted (alias for $bot.sendSnippet)
       * JSON data or code-snippet to the user
       *
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const specialData = {a:1, b:2, c: [1,2,3]}
       *    $bot.sendJSON(specialData)
       *  })
       * ```
       *
       *
       */
      sendJSON(data, label) {
        return this.sendSnippet(data, label, "json");
      }
      /**
       * Display a snippet to the user
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const specialData = {a:1, b:2, c: [1,2,3]}
       *    $bot.sendSnippet(specialData)
       *  })
       * ```
       *
       */
      sendSnippet(data, label = "", dataType = "json", fallbackText) {
        return __awaiter(this, void 0, void 0, function* () {
          let markdown;
          if (dataType === "json") {
            markdown = this.snippet(data);
          } else {
            markdown = this.snippet(data, "html");
          }
          if (label) {
            markdown = label + " \n " + markdown;
          }
          return this.send({
            roomId: this.roomId,
            markdown,
            text: fallbackText ? fallbackText : this.fallbackText
          });
        });
      }
      /**
       * Traverse a property lookup path on a object
       * fallback to a value (if provided) whenever
       * path is invalid
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const myData = {a:1,b:2,c:{d:3}}
       *    const succeed = $bot.lookUp(myData, 'a.b.c.d', 'fallback') // 3
       *    const fail = $bot.lookUp(myData, 'a.b.ce.e.f.g', 'fallback') // 'fallback'
       *    $bot.send(`succeed: ${succeed}, fail: ${fail}`)
       *  })
       * ```
       *
       *
       */
      lookUp(locale, lookup = "", fallback) {
        let res = locale;
        lookup.split(".").forEach((k) => {
          if (res) {
            res = res[k];
          } else {
            res = fallback;
          }
        });
        return res ? res : fallback;
      }
      // Color cards-- can be served from URL or base64 encoded
      /**
       * Returns an instance of a dangerCard. dangerCards have blue skylike background:
       *
       *
       * ![cards](media://colored_cards.gif)
       *
       *
       *
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const danger = $bot.dangerCard({
       *     title: '⛔️DANGER-- do not do that!⛔️',
       *     subTitle: 'There is a very important reason not to do that',
       *     chips: ['ping', 'pong'],
       *    })
       *     $bot.send(danger)
       *  })
       * ```
       *
       * @param payload (title, subtitle, etc)
       * @returns SpeedyCard
       */
      dangerCard(payload = {}) {
        return this.card(payload).setBackgroundImage(`data:image/png;base64,${colors_1.RED}`);
      }
      banner(msg, style = "danger") {
        let card;
        switch (style) {
          case "danger":
            card = this.dangerCard({ title: msg });
            break;
          case "success":
            card = this.successCard({ title: msg });
            break;
          case "warning":
            card = this.warningCard({ title: msg });
            break;
          case "sky":
            card = this.skyCard({ title: msg });
            break;
          case "yolo":
            const randy = ["dangerCard", "successCard", "warningCard", "skyCard"][Math.floor(Math.random() * 4)];
            card = this[randy]({ title: msg });
            break;
        }
        return card;
      }
      /**
       * Returns an instance of a debugCard
       *
       *
       * ![cards](media://colored_cards.gif)
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const debug = $bot.debugCard({
       *     title: 'Testing 321',
       *     subTitle: 'Testing 456',
       *     chips: ['ping', 'pong'],
       *     })
       *     $bot.send(debug)
       *  })
       * ```
       *
       *
       * @param payload (title, subtitle, etc)
       * @returns SpeedyCard
       */
      debugCard(payload = {}) {
        return this.card(payload).setBackgroundImage(`data:image/png;base64,${colors_1.REBECCAPURPLE}`);
      }
      /**
       * Returns an instance of a SuccessCard. SuccessCards have blue skylike background:
       *
       *
       * ![cards](media://colored_cards.gif)
       *
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const warning = $bot.successCard({
       *     title: '⚠️Warning-- you should consider carefully if you want to do that!⚠️',
       *     subTitle: 'There is a very important reason to slow down and consider if you want to do that...or not',
       *     chips: ['ping', 'pong'],
       *    })
       *     $bot.send(warning)
       *  })
       * ```
       *
       * @param payload (title, subtitle, etc)
       * @returns SpeedyCard
       */
      warningCard(payload = {}) {
        return this.card(payload).setBackgroundImage(`data:image/png;base64,${colors_1.YELLOW}`);
      }
      /**
       * Returns an instance of a SuccessCard. SuccessCards have blue skylike background:
       *
       *
       * ![cards](media://colored_cards.gif)
       *
       *
       *
       *```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const success = $bot.successCard({
       *     title: '🌟You did it!🎉',
       *     subTitle: 'Whatever you did, good at job at doing it',
       *     chips: ['ping', 'pong'],
       *    })
       *     $bot.send(success)
       *  })
       * ```
       *
       * @param payload (title, subtitle, etc)
       * @returns SpeedyCard
       */
      successCard(payload = {}) {
        return this.card(payload).setBackgroundImage(`data:image/png;base64,${colors_1.GREEN}`);
      }
      /**
       * Returns an instance of a skyCard. SkyCards have blue skylike background:
       *
       *
       * ![cards](media://colored_cards.gif)
       *
       *```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('tokenPlaceholder');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"],
       *  async ($bot, msg) => {
       *    const card = $bot.skyCard({title: '☁️ What a pleasant card ☁️'})
       *    $bot.send(card)
       *  })
       * ```
       *
       * @param payload (title, subtitle, etc)
       * @returns SpeedyCard
       */
      skyCard(payload = {}) {
        return this.card(payload).setBackgroundImage(`data:image/gif;base64,${colors_1.BLUE}`);
      }
      /**
       * Generate a markdown link to a resource
       * @param target
       * @param label
       * @param noBold
       * @returns markdown click'able link
       */
      /**
       *
       * Creates a markdown bolded hyperlink
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  const link = $bot.buildLink('https://youtu.be/6A8W77m-ZTw?t=114')
       *  $bot.send('Is it biscotti or biscotto?')
       * })
       *
       * ```
       *
       */
      buildLink(target, label, noBold = false) {
        let link = `[${label || target}](${target})`;
        if (!noBold) {
          link = `**${link}**`;
        }
        return link;
      }
      /**
       *
       * Build a markdown, click'able link to a meeting with a specific person)
       * @param target (email address)
       * @param label
       * @param noBold
       * @returns
       */
      /**
       *
       * Generate a meeting hyperlink to open a meeting with a person
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  const email = 'joe@joe.com'
       *  const label = 'Click here to talk to Joe'
       *  const link = $bot.buildMeetingLink(email, label)
       *  $bot.send(link)
       * })
       *
       * ```
       *
       */
      buildMeetingLink(target, label, noBold = false) {
        return this.buildLink(`webexteams://meet?sip=${target}`, label, noBold);
      }
      /**
       *
       * Generate a hyperlink to send a message to a person/agent
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  const email = 'joe@joe.com'
       *  const label = 'Send a message to Joe'
       *  const link = $bot.buildImLink(email, label)
       *  $bot.send(link)
       * })
       *
       * ```
       *
       */
      buildImLink(target, label, noBold = false) {
        return this.buildLink(`webexteams://im?email=${target}`, label, noBold);
      }
      /**
       *
       * Build a markdown, click'able link to a specific space (OPT+CMD+K on Mac or CTRL-SHFT-K on windows to get space id)
       * @param target (email)
       * @param label
       * @param noBold
       * @returns
       */
      /**
       *
       * Generate a hyperlink to a space/room
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  const roomId = 'Y2lzY29zL3ajsLpmVzL1JPT00vNTBjNma'
       *  const label = 'Go to the special space'
       *  const link = $bot.buildSpaceLink(roomId, label)
       *  $bot.send(link)
       * })
       *
       * ```
       *
       */
      buildSpaceLink(target, label, noBold = false) {
        return this.buildLink(`webexteams://im?space=${target}`, label, noBold);
      }
      //Aliases
      /**
       * Legacy alias for $bot.send
       *
       *
       */
      say(payload) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.send(payload);
        });
      }
      /**
       * Legacy alias for $bot.sendCard
       *
       *
       */
      sendCard(payload) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.send(payload);
        });
      }
    };
    exports.BotInst = BotInst;
    function InitBot(config, makeRequest = common_1.makeRequest) {
      return new BotInst(config);
    }
    exports.InitBot = InitBot;
    function WebhookBot(config, makeRequest = common_1.makeRequest) {
      const inst = new BotInst(config);
      return {
        snippet(data, dataType) {
          return inst.snippet(data, dataType);
        },
        sendRoom(roomId, message) {
          return __awaiter(this, void 0, void 0, function* () {
            inst.roomId = roomId;
            if (Array.isArray(message)) {
              for (const msg in message) {
                yield inst.send(msg);
              }
            } else {
              inst.send(message);
            }
          });
        },
        sendRoomDataAsFile(roomId, data, extensionOrFileName, contentType = null, textLabel, overrides = {}) {
          let payload = { roomId };
          return inst.sendDataAsFile(data, extensionOrFileName, null, void 0, payload);
        },
        dmDataAsFile(personIdOrEmail, data, extensionOrFileName, contentType = null, textLabel, overrides = {}) {
          let payload = {};
          const isEmail = common_1.checkers.isEmail(personIdOrEmail);
          if (isEmail) {
            payload = { toPersonEmail: personIdOrEmail };
          } else {
            payload = { toPersonId: personIdOrEmail };
          }
          return inst.sendDataAsFile(data, extensionOrFileName, null, void 0, payload);
        },
        dm(personIdOrEmail, message, fallback) {
          return inst.dm(personIdOrEmail, message);
        },
        card(config2) {
          return inst.card(config2);
        }
      };
    }
    exports.WebhookBot = WebhookBot;
  }
});

// node_modules/speedybot-mini/dist/src/lib/speedybot.js
var require_speedybot = __commonJS({
  "node_modules/speedybot-mini/dist/src/lib/speedybot.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Speedybot = void 0;
    var common_1 = require_common();
    var bot_1 = require_bot();
    var Speedybot = class {
      constructor(config, makeRequest = common_1.makeRequest) {
        this.makeRequest = makeRequest;
        this.secrets = {};
        this.IncomingWebhooks = () => (0, bot_1.WebhookBot)({ token: this.getToken() });
        this._config = {
          token: "",
          features: {
            camera: {
              files: []
            },
            files: {
              matchText: false,
              excludeFiles: []
            },
            catchAll: {
              skipList: []
            }
          }
        };
        this.rootList = [];
        this.FileHandler = null;
        this.handlers = {
          camera: null,
          file: null,
          submit: null,
          nlu: null,
          NO_MATCH: null,
          ALL: null
        };
        this.nluHandler = null;
        if (typeof config === "string") {
          this._config.token = config;
        } else {
          this._config = Object.assign(this._config, config);
        }
      }
      /**
       * Add a secret to your Speedybot bot instance. Note bot tokens are special are are still set by {@link setToken}
       * **Note:** Once you add a secret it is accessible on the instance so be careful
       *
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * type MySecrets = 'special_token1' | 'special_token2'
       *
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // Add secret (can happen anytime to keep bots portable)
       *
       * CultureBot.addSecret('special_token1', 'xxx-yyy')
       * CultureBot.getSecret('special_token1') // 'xxx-yyy'
       *
       * CultureBot.addSecrets({'special_token2':'aaa-bbb'})
       * CultureBot.getSecret('special_token2') // 'aaa-bbb'
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  $bot.send('This is the hi greeting handler!')
       * })
       *
       * CultureBot.contains('trigger', async ($bot, msg) => {
       *  $bot.send('About to trigger the hi trigger')
       *  $bot.trigger('hi', msg)
       * })
       *
       * ```
       */
      addSecret(key, value) {
        this.secrets[key] = value;
      }
      /**
       * Add a several secrets at once to your Speedybot bot instance. Note bot tokens are special are are still set by {@link setToken}
       * **Note:** Once you add a secret it is accessible on the instance so be careful
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * type MySecrets = 'special_token1' | 'special_token2'
       *
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // Add secret (can happen anytime to keep bots portable)
       *
       * CultureBot.addSecrets({'special_token1': 'xxx-yyy', 'special_token2':'aaa-bbb'})
       * CultureBot.getSecret('special_token1') // 'xxx-yyy'
       * CultureBot.getSecret('special_token2') // 'aaa-bbb'
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  $bot.send('This is the hi greeting handler!')
       * })
       *
       * CultureBot.contains('trigger', async ($bot, msg) => {
       *  $bot.send('About to trigger the hi trigger')
       *  $bot.trigger('hi', msg)
       * })
       *
       * ```
       */
      addSecrets(secrets) {
        this.secrets = Object.assign(Object.assign({}, this.secrets), secrets);
      }
      /**
       * Retrieve a secret set on your Speedybot bot instance. Note bot tokens are special are are still set by {@link setToken}
       * **Note:** Once you add a secret it is accessible on the instance so be careful
       *
       * ## Example
       *
       * ```ts
       *
       * import { Speedybot } from 'speedybot-mini'
       * type MySecrets = 'special_token1' | 'special_token2'
       *
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // Add secret (can happen anytime to keep bots portable)
       *
       * CultureBot.addSecret('special_token1', 'xxx-yyy')
       * CultureBot.getSecret('special_token1') // 'xxx-yyy'
       *
       * CultureBot.addSecrets({'special_token2':'aaa-bbb'})
       * CultureBot.getSecret('special_token2') // 'aaa-bbb'
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  $bot.send('This is the hi greeting handler!')
       * })
       *
       * CultureBot.contains('trigger', async ($bot, msg) => {
       *  $bot.send('About to trigger the hi trigger')
       *  $bot.trigger('hi', msg)
       * })
       *
       * ```
       */
      getSecret(key) {
        return this.secrets[key];
      }
      exposeToken() {
        return this._config.token || "";
      }
      checkStrings(check, incoming, flag) {
        const { exact = false, fuzzy = false } = flag || {};
        if (exact)
          return check === incoming;
        if (fuzzy)
          return incoming.toLowerCase().includes(check.toLowerCase());
        const [first] = incoming.toLowerCase().split(" ");
        return first === check.toLocaleLowerCase();
      }
      /**
       *
       * Register a handler that "fuzzily" matches input from a user
       *
       * Any fuzzy matches occur **anywhere** in the input from the user (if you want only the 1st word see {@link Speedybot.contains})
       *
       *
       * ```ts
       *
       * // This agent will match for ex.  hi, hi!!, here is a sentence hi and bye
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.fuzzy(["hi", "hey"], async ($bot, msg) => {
       *   $bot.send('You matched!')
       * })
       * ```
       */
      fuzzy(keyword, cb) {
        const nextIdx = this.rootList.length;
        this.handlers[nextIdx] = cb;
        if (typeof keyword === "string") {
          this.rootList.push({ FUZZY: keyword.toLowerCase() });
        } else {
          const payload = keyword.map((kw) => {
            return { FUZZY: kw.toLowerCase() };
          });
          this.rootList.push(payload);
        }
      }
      /**
       *
       * Register a handler thats matches on a string or list of strings
       *
       *  Note: This will match if the target phrase is the 1st or only word in a sentence
       *
       * **Important:** If you want to match on the input phrase located *anywhere* in an input phrase,
       * use .fuzzy. If .fuzzy and .contains contain the same matching word, the first registered handler will take precedence
       * Any fuzzy matches occur **anywhere** in the input from the user (if you want only the 1st word see .contains)
       *
       *
       * ```ts
       *
       * // This agent will match for ex.  hi, hey how's it going, hey
       * // Will not match: hi!!, heya how are you?
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *   $bot.send('You matched!')
       * })
       * ```
       */
      contains(keyword, cb) {
        const nextIdx = this.rootList.length;
        this.handlers[nextIdx] = cb;
        if (typeof keyword === "string") {
          this.rootList.push(keyword.toLowerCase());
        } else {
          this.rootList.push(keyword.map((kw) => kw.toLowerCase()));
        }
      }
      /**
       *
       * Register a handler thats matches on a string **exactly**
       *
       *  Note: This will match if the target phrase has a case-sensitive match
       *
       *
       * ```ts
       *
       * // This agent will match for only 'Hi'
       * // Will not match: hi, hi!!, heya how are you?
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.exact("hi", async ($bot, msg) => {
       *   $bot.send('You matched!')
       * })
       * ```
       */
      exact(keyword, cb) {
        this.handlers[this.rootList.length] = cb;
        this.rootList.push({ EXACT: keyword });
      }
      /**
       *
       * 🌟SPECIAL🌟 Conversational Design convenience handler
       *
       * Use this handler to send user input to a NLP/NLU
       *
       * Any registered keywords handled with your agent will be ignored and not sent to the NLU system
       *
       * ```ts
       *
       * // This agent will match for ping, pong, anything else will be sent to a
       * // 3rd-party service for content and conversation design
       *
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["ping","pong"], async ($bot, msg) => {
       *   $bot.send('You matched!')
       * })
       *
       *
       * CultureBot.nlu("hi", async ($bot, msg, api) => {
       *   const payload = await api('https://www.nluservice.com', { text: msg.text }, )
       *   const res = await payload.text()
       *   $bot.send(`Response: ${text}`)
       * })
       *
       * ```
       */
      nlu(cb) {
        this.nluHandler = cb;
      }
      /**
       *
       * Register a handler thats matches based on a Regular Expression
       *
       * ```ts
       *
       * // This agent will match for only 'Hi'
       * // Will not match: hi, hi!!, heya how are you?
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.regex(new RegExp('x'), async ($bot, msg) => {
       *   $bot.send('You matched because you said a word containing x!')
       * })
       * ```
       *
       */
      regex(rx, cb) {
        this.handlers[this.rootList.length] = cb;
        this.rootList.push(rx);
      }
      /**
       *
       * Register a handler when there is no matching handler for a user's input
       *
       * If you're not using an NLU system, it's a good idea to acknowledge a user's
       * request isn't servicable rather than leaving them hanging
       *
       * ```ts
       *
       * // This agent will match for only 'Hi'
       * // Will not match: hi, hi!!, heya how are you?
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.noMatch(async ($bot, msg) => {
       *   $bot.send(`Bummer, no match for ${msg.text}`)
       * })
       * ```
       *
       */
      noMatch(handler) {
        this.handlers["NO_MATCH"] = handler;
      }
      /**
       *
       * Register a handler that runs on **EVERY** message sent to an agent
       * Note: You can optionally pass in a list of keywords to skip
       *
       * ```ts
       *
       * // This agent will match for only 'Hi'
       * // Will not match: hi, hi!!, heya how are you?
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       *
       * CultureBot.contains(['bingo', 'bongo'], ($bot, msg) => {
       *  if (msg.text === 'bingo') {
       *    $bot.send('bongo')
       *  } else {
       *    $bot.send('bingo')
       *  }
       * })
       *
       * // Run on every input except the words 'bingo' and 'bongo'
       * CultureBot.every(async ($bot, msg) => {
       *   $bot.send('You matched because you said a word containing x!')
       * }).config({skipList: ['bingo', 'bongo']})
       *
       * ```
       *
       */
      every(handler, skipList = []) {
        this.handlers["ALL"] = handler;
        if (skipList.length) {
          skipList.forEach((skip) => {
            var _a;
            return (_a = this._config.features) === null || _a === void 0 ? void 0 : _a.catchAll.skipList.push(skip);
          });
        }
        const ref = this;
        return {
          config(catchallConfig) {
            if (catchallConfig.skipList && catchallConfig.skipList.length) {
              catchallConfig.skipList.forEach((skip) => {
                var _a;
                return (_a = ref._config.features) === null || _a === void 0 ? void 0 : _a.catchAll.skipList.push(skip);
              });
            }
          }
        };
      }
      setConfig(route, data) {
        if (this._config && this._config.features) {
          this._config.features[route] = data;
        }
      }
      /**
       * Camera handler-- will trigger by default for png, jpeg, & jpg
       * @param handler
       *
       * ```ts
       * import { Speedybot } from "speedybot-mini";
       * // 1) Initialize your bot
       * const CultureBot = new Speedybot("__REPLACE__MEE__");
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // Add a camera handler
       * CultureBot.onCamera(($bot, msg, fileData) => {
       *    const { fileName, extension, type } = fileData;
       *    $bot.send(`You sent a photo: ${fileName} ${extension} ${type}`);
       *    // file data available under fileData.data
       * });
       * ```
       */
      onCamera(handler) {
        this.setHandler("camera", handler);
      }
      setHandler(handlerType, handler) {
        this.handlers[handlerType] = handler;
      }
      /**
       *
       * Register a handler when a user uploads a file to an agent
       *
       * With optional confi
       * - matchText: boolean-- should any text attached to file upload also be processed? (default false)
       * - excludeFiles: string[]-- any files not to exclude from handling
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.onFile(async ($bot, msg, fileData) => {
       *    const { fileName, extension, type } = fileData;
       *    $bot.send(`You sent a file: ${fileName} ${extension} ${type}`);
       *    // file data available under fileData.data
       * }).config({matchText: true})
       *
       *
       * ```
       *
       */
      onFile(handler) {
        this.setHandler("file", handler);
        const ref = this;
        return {
          config(fileConfig) {
            var _a;
            if (ref._config.features !== void 0) {
              ref._config.features.files = Object.assign(((_a = ref._config.features) === null || _a === void 0 ? void 0 : _a.files) || {}, fileConfig);
            }
          }
        };
      }
      /**
       *
       * Register a handler when a user sends data from an Adaptive Card. Any attached data will be available under `msg.data.inputs`
       *
       *
       * In the example below this is the data available on card submission: `{"cardName":"mySpecialCard7755","inputData":"My opinion is 123"}`:
       *
       *
       * ```ts
       * import { Speedybot } from 'speedybot-mini'
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot(config);
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains("card", ($bot) => {
       *  $bot.send('Here is a card to share your opinion')
       *  $bot.send(
       *  $bot
       *    .card({ title: "Here is a card" })
       *    .setData({ cardName: "mySpecialCard7755" })
       *    .setInput("What is your opinion?")
       *  );
       *
       * })
       *
       * CultureBot.onSubmit(async ($bot, msg, fileData) => {
       *   $bot.send(`You submitted ${JSON.stringify(msg.data.inputs)}`);
       * })
       * ```
       *
       */
      onSubmit(handler) {
        this.setHandler("submit", handler);
        const ref = this;
        return {
          config(fileConfig) {
            ref.setConfig("files", fileConfig);
          }
        };
      }
      setWelcome(handler) {
      }
      detectType(envelope) {
        var _a;
        let type;
        if (envelope.resource === "messages") {
          if ("files" in envelope.data && ((_a = envelope.data.files) === null || _a === void 0 ? void 0 : _a.length)) {
            const { files = [] } = envelope.data;
            if (files && files.length) {
              type = "FILE";
            }
          } else {
            type = "TEXT";
          }
        }
        if (envelope.resource === "attachmentActions") {
          type = "AA";
        }
        return type;
      }
      processIncoming(envelope) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
          const type = this.detectType(envelope);
          const { personId, roomId } = envelope.data;
          const isHuman = yield this.isHuman(personId);
          if (!isHuman)
            return { incomingProcessed: true };
          const { author, details } = yield this.buildDetails(type, envelope);
          const botTrigger = {
            id: details.id,
            authorId: personId,
            data: details,
            author
          };
          const bot_config = {
            token: this.getToken(),
            roomId,
            locales: this._config.locales,
            SpeedybotInst: this
          };
          if (type === "TEXT" || type === "FILE") {
            const isGroup = "roomType" in details && details.roomType !== "direct";
            if (type === "FILE") {
              if ("files" in envelope.data) {
                const { files } = envelope.data;
                const [url] = files;
                const botInst = new bot_1.BotInst(bot_config, this.makeRequest);
                const res = yield botInst.getFile(url);
                const { extension } = res;
                if (this.handlers.camera) {
                  const formats = ((_b = (_a = this._config.features) === null || _a === void 0 ? void 0 : _a.camera) === null || _b === void 0 ? void 0 : _b.files) || [];
                  const photos = ["png", "jpg", "jpeg", ...formats];
                  if (photos.includes(extension)) {
                    const camHandler = this.handlers.camera;
                    if (camHandler) {
                      yield camHandler(botInst, botTrigger, res);
                    }
                  } else {
                    const handler = this.handlers.file;
                    const exclusionList = ((_c = this._config.features) === null || _c === void 0 ? void 0 : _c.files.excludeFiles) || [];
                    if (handler && !exclusionList.includes(extension)) {
                      yield handler(botInst, botTrigger, res);
                    }
                  }
                } else if (this.handlers.file) {
                  const handler = this.handlers.file;
                  const exclusionList = ((_d = this._config.features) === null || _d === void 0 ? void 0 : _d.files.excludeFiles) || [];
                  if (handler && !exclusionList.includes(extension)) {
                    yield handler(botInst, botTrigger, res);
                  }
                }
              }
            }
            const { text } = details;
            const doText = text && (type === "TEXT" || ((_e = this._config.features) === null || _e === void 0 ? void 0 : _e.files.matchText));
            if (doText) {
              const tidyText = isGroup ? text.split(" ").slice(1).join(" ") : text;
              const handler = this.processText(tidyText);
              if (handler) {
                const botInst = new bot_1.BotInst(bot_config, this.makeRequest);
                yield handler(botInst, Object.assign(Object.assign({}, botTrigger), { text }));
              }
              const catchall = this.handlers.ALL;
              if (catchall && !((_f = this._config.features) === null || _f === void 0 ? void 0 : _f.catchAll.skipList.includes(text))) {
                yield catchall(new bot_1.BotInst(bot_config), Object.assign(Object.assign({}, botTrigger), { text }));
              }
              const nlu = this.nluHandler;
              const skip = this.checkList(text) > -1;
              if (nlu && !skip) {
                yield nlu(new bot_1.BotInst(bot_config), Object.assign(Object.assign({}, botTrigger), { text }), this.makeRequest);
              }
            }
          }
          if (type === "AA") {
            const handler = this.processSubmit(details);
            if (handler) {
              const botInst = new bot_1.BotInst(bot_config, this.makeRequest);
              yield handler(botInst, Object.assign(Object.assign({}, botTrigger), "inputs" in details && details.inputs.chip_action && {
                text: details.inputs.chip_action
              }));
              if ("inputs" in details && details.inputs.chip_action) {
                const text = details.inputs.chip_action;
                const catchall = this.handlers.ALL;
                if (catchall && !((_g = this._config.features) === null || _g === void 0 ? void 0 : _g.catchAll.skipList.includes(text))) {
                  yield catchall(new bot_1.BotInst(bot_config), Object.assign(Object.assign({}, botTrigger), { text }));
                }
              }
            }
          }
          return {
            incomingProcessed: true
          };
        });
      }
      processSubmit(details) {
        const data = details.inputs;
        if ("chip_action" in data) {
          const text = data.chip_action;
          return this.processText(text);
        }
        if (common_1.constants.actionKeyword in data) {
          this.actionHandler(details);
          return null;
        }
        return this.handlers.submit;
      }
      // if chip, rejigger and use this.process(text)
      /**
       * If worst case (user enters text
       *  and we need to search for it)
       * Check the list and find a 1-1 match or "contains"
       *
       * Note: All queries are lower-cased
       *
       * @param incoming
       *
       *
       */
      processText(incoming = "", skipNoMatchFallback = false) {
        const target = this.checkList(incoming);
        if (target >= 0) {
          return this.handlers[target] && typeof this.handlers[target] === "function" ? this.handlers[target] : null;
        } else if (this.handlers["NO_MATCH"]) {
          return typeof this.handlers["NO_MATCH"] === "function" && !skipNoMatchFallback ? this.handlers["NO_MATCH"] : null;
        }
        return null;
      }
      /**
       * Returns look up index of matching handler if one exists
       * @param incoming
       * @returns
       */
      checkList(incoming = "") {
        let target = -1;
        this.rootList.forEach((item, idx) => {
          let match = false;
          if (typeof item === "string") {
            match = this.checkStrings(item, incoming);
          }
          if (typeof item === "object" && "EXACT" in item) {
            const { EXACT } = item;
            match = this.checkStrings(EXACT, incoming, { exact: true });
          }
          if (typeof item === "object" && "FUZZY" in item) {
            const { FUZZY } = item;
            match = this.checkStrings(FUZZY, incoming, { fuzzy: true });
          }
          if (item instanceof RegExp) {
            match = item.test(incoming.toLowerCase());
          }
          if (match && target < 0) {
            target = idx;
          }
          if (Array.isArray(item)) {
            item.forEach((kw) => {
              if (target < 0) {
                if (typeof kw === "string") {
                  match = this.checkStrings(kw, incoming);
                } else if (kw instanceof RegExp) {
                  match = kw.test(incoming.toLowerCase());
                } else if ("EXACT" in kw) {
                  const { EXACT } = kw;
                  match = this.checkStrings(EXACT, incoming, { exact: true });
                } else if ("FUZZY" in kw) {
                  const { FUZZY } = kw;
                  match = this.checkStrings(FUZZY, incoming, { fuzzy: true });
                }
                if (match) {
                  target = idx;
                }
              }
            });
          }
        });
        return target;
      }
      actionHandler(details) {
        return __awaiter(this, void 0, void 0, function* () {
          const root = details.inputs;
          const { speedybot_action = "" } = root;
          if (speedybot_action === "delete") {
            const { messageId } = details;
            yield this.deleteMessage(messageId);
          }
        });
      }
      deleteMessage(msgId) {
        return __awaiter(this, void 0, void 0, function* () {
          const url = `${common_1.API.deleteMessage}/${msgId}`;
          const res = yield this.makeRequest(url, {}, {
            token: this.getToken(),
            method: "DELETE"
          });
          return res;
        });
      }
      /**
       * Add a bot token used to authenticate to APIs
       *
       * ## Example
       *
       * ```ts
       *
       * // 1) Initialize your bot w/ config
       * const CultureBot = new Speedybot('__REPLACE__ME__');
       *
       * // 2) Export your bot
       * export default CultureBot;
       *
       * CultureBot.exposeToken() // '__REPLACE__ME__'
       *
       * CultureBot.setToken('__REPLACE__ME__NEW_TOKEN!')
       *
       *  CultureBot.exposeToken() // __REPLACE__ME__NEW_TOKEN
       * // Add secret (can happen anytime to keep bots portable)
       *
       * CultureBot.addSecret('special_token1', 'xxx-yyy')
       * CultureBot.getSecret('special_token1') // 'xxx-yyy'
       *
       * CultureBot.addSecrets({'special_token2':'aaa-bbb'})
       * CultureBot.getSecret('special_token2') // 'aaa-bbb'
       *
       * // 3) Do whatever you want!
       *
       * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
       *  $bot.send('This is the hi greeting handler!')
       * })
       *
       * CultureBot.contains('trigger', async ($bot, msg) => {
       *  $bot.send('About to trigger the hi trigger')
       *  $bot.trigger('hi', msg)
       * })
       *
       * ```
       */
      setToken(token) {
        this._config.token = token;
      }
      getToken() {
        var _a;
        return (_a = this._config) === null || _a === void 0 ? void 0 : _a.token;
      }
      buildDetails(type, envelope) {
        return __awaiter(this, void 0, void 0, function* () {
          const [author, data] = yield Promise.all([
            this.getAuthor(envelope.data.personId),
            this.getData(type, envelope)
          ]);
          return {
            author,
            details: data
          };
        });
      }
      getAuthor(personId) {
        return __awaiter(this, void 0, void 0, function* () {
          const url = `${common_1.API.getPersonDetails}/${personId}`;
          const res = yield this.makeRequest(url, {}, {
            method: "GET",
            token: this.getToken()
          });
          const json = res ? yield res.json() : {};
          return json;
        });
      }
      isHuman(personId, fullPayload = false) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = yield this.getSelf();
          const { id } = data;
          if (fullPayload) {
            return data;
          }
          return id !== personId;
        });
      }
      getSelf() {
        return __awaiter(this, void 0, void 0, function* () {
          const url = common_1.API.getSelf;
          const res = yield this.makeRequest(url, {}, {
            method: "GET",
            token: this.getToken()
          });
          const json = yield res.json();
          return json;
        });
      }
      getData(type, envelope) {
        return __awaiter(this, void 0, void 0, function* () {
          let url = common_1.API.getMessage_Details;
          if (type === "AA") {
            url = common_1.API.getAttachmentDetails;
          }
          const { data } = envelope;
          const { id } = data;
          url = `${url}/${id}`;
          const init = {
            method: "GET",
            token: this.getToken()
          };
          const res = yield this.makeRequest(url, {}, init);
          const json = yield res.json();
          if (type === "AA") {
            return json;
          }
          if (type === "TEXT") {
            return json;
          }
          if (type === "FILE") {
            return json;
          }
          return json;
        });
      }
      /**
       * Cheap way to get content-dispoition header & content-type and get extension
       * @param url
       * @returns
       */
      peekFile(url) {
        return __awaiter(this, void 0, void 0, function* () {
          return (0, common_1.peekFile)(this._config.token, url);
        });
      }
      isEnvelope(candidate) {
        return "targetUrl" in candidate && "resource" in candidate && "appId" in candidate;
      }
    };
    exports.Speedybot = Speedybot;
  }
});

// node_modules/speedybot-mini/dist/src/index.js
var require_src = __commonJS({
  "node_modules/speedybot-mini/dist/src/index.js"(exports) {
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BotInst = exports.WebhookBot = exports.logoRoll = exports.finale = exports.Speedybot = void 0;
    __exportStar(require_payloads_types(), exports);
    var speedybot_1 = require_speedybot();
    Object.defineProperty(exports, "Speedybot", { enumerable: true, get: function() {
      return speedybot_1.Speedybot;
    } });
    var common_1 = require_common();
    Object.defineProperty(exports, "finale", { enumerable: true, get: function() {
      return common_1.finale;
    } });
    Object.defineProperty(exports, "logoRoll", { enumerable: true, get: function() {
      return common_1.logoRoll;
    } });
    var bot_1 = require_bot();
    Object.defineProperty(exports, "WebhookBot", { enumerable: true, get: function() {
      return bot_1.WebhookBot;
    } });
    var bot_2 = require_bot();
    Object.defineProperty(exports, "BotInst", { enumerable: true, get: function() {
      return bot_2.BotInst;
    } });
  }
});
export default require_src();
//# sourceMappingURL=speedybot-mini.js.map
