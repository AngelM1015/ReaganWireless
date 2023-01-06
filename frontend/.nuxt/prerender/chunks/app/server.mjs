import { getCurrentInstance, inject, computed, defineComponent, provide, h, Suspense, Transition, reactive, useSSRContext, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, resolveComponent, watchEffect, markRaw, toDisplayString, openBlock, createBlock, Fragment as Fragment$1, renderList, shallowRef, createCommentVNode, createApp, toRef, isRef, effectScope, defineAsyncComponent, onErrorCaptured, watch, isReactive, toRaw, nextTick, onUnmounted, toRefs } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/vue/index.mjs';
import { $fetch } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/ohmyfetch/dist/node.mjs';
import { joinURL, hasProtocol, isEqual, parseURL } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/ufo/dist/index.mjs';
import { createHooks } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/hookable/dist/index.mjs';
import { getContext, executeAsync } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/unctx/dist/index.mjs';
import { RouterView, createMemoryHistory, createRouter } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/vue-router/dist/vue-router.node.mjs';
import { createError as createError$1, sendRedirect } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/h3/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/defu/dist/defu.mjs';
import { isFunction } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/@vue/shared/index.js';
import { Carousel, Slide, Pagination, Navigation } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/vue3-carousel/dist/carousel.js';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderSuspense } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/vue/server-renderer/index.mjs';
import axios from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/axios/index.js';
import { SidebarMenu } from 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/vue-sidebar-menu/dist/vue-sidebar-menu.js';
import { a as useRuntimeConfig$1 } from '../nitro/nitro-prerenderer.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/iquit/Desktop/Reagan/frontend/node_modules/unstorage/dist/drivers/fs.mjs';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$5 = defineNuxtLink({ componentName: "NuxtLink" });
const inlineConfig = {};
defuFn(inlineConfig);
function useHead(meta2) {
  const resolvedMeta = isFunction(meta2) ? computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "renderPriority" || key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var stringifyAttrName = (str) => str.replace(/[\s"'><\/=]/g, "").replace(/[^a-zA-Z0-9_-]/g, "");
var stringifyAttrValue = (str) => str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = stringifyAttrName(key);
    if (value !== true) {
      attribute += `="${stringifyAttrValue(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var tagDedupeKey = (tag) => {
  if (!["meta", "base", "script", "link"].includes(tag.tag)) {
    return false;
  }
  const { props, tag: tagName } = tag;
  if (tagName === "base") {
    return "base";
  }
  if (tagName === "link" && props.rel === "canonical") {
    return "canonical";
  }
  if (props.charset) {
    return "charset";
  }
  const name = ["key", "id", "name", "property", "http-equiv"];
  for (const n of name) {
    let value = void 0;
    if (typeof props.getAttribute === "function" && props.hasAttribute(n)) {
      value = props.getAttribute(n);
    } else {
      value = props[n];
    }
    if (value !== void 0) {
      return `${tagName}-${n}-${value}`;
    }
  }
  return false;
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: { key: "default", ...obj[key] } });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: unref(item) });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a, _b;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document2),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute(
    "content",
    "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length)
  );
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const deduping = {};
      const titleTemplate = allHeadObjs.map((i) => unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs, headObjectIdx) => {
        const tags = headObjToTags(unref(objs));
        tags.forEach((tag, tagIdx) => {
          tag._position = headObjectIdx * 1e4 + tagIdx;
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(
              titleTemplate,
              tag.props.children
            );
          }
          const dedupeKey = tagDedupeKey(tag);
          if (dedupeKey) {
            deduping[dedupeKey] = tag;
          } else {
            deduped.push(tag);
          }
        });
      });
      deduped.push(...Object.values(deduping));
      return deduped.sort((a, b) => a._position - b._position);
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags.sort(sortTags)) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  if (tag.props.renderPriority) {
    delete tag.props.renderPriority;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var sortTags = (aTag, bTag) => {
  const tagWeight = (tag) => {
    if (tag.props.renderPriority) {
      return tag.props.renderPriority;
    }
    switch (tag.tag) {
      case "base":
        return -1;
      case "meta":
        if (tag.props.charset) {
          return -2;
        }
        if (tag.props["http-equiv"] === "content-security-policy") {
          return 0;
        }
        return 10;
      default:
        return 10;
    }
  };
  return tagWeight(aTag) - tagWeight(bTag);
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags.sort(sortTags)) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs({
        ...htmlAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      });
    },
    get bodyAttrs() {
      return stringifyAttrs({
        ...bodyAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      });
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    watchEffect(() => {
      head.updateDOM();
    });
  });
  nuxtApp._useHead = (_meta) => {
    const meta2 = ref(_meta);
    const headObj = computed(() => {
      const overrides = { meta: [] };
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => {
      const meta2 = renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
      };
    };
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const NoScript = defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((props) => {
    const meta2 = { ...props };
    if (meta2.httpEquiv) {
      meta2["http-equiv"] = meta2.httpEquiv;
      delete meta2.httpEquiv;
    }
    return {
      meta: [meta2]
    };
  })
});
const Style = defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  NoScript,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const appHead = { "meta": [{ "name": "description", "content": "The most reliable wholesale and retail mobile phone store. If you are looking for a trusted shop, you can come to us!" }], "link": [{ "rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" }], "style": [], "script": [], "noscript": [], "htmlAtrs": { "lang": "en" }, "title": "Reagan Wireless - The most reliable wholesale and retail mobile phone store", "charset": "utf-8", "viewport": "width=device-width, initial-scale=1" };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appKeepalive = false;
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2 = defineNuxtPlugin((nuxtApp) => {
  useHead(markRaw({ title: "", ...appHead }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = inject(isNestedKey, false);
    provide(isNestedKey, true);
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const transitionProps = (_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition;
          return _wrapIf(
            Transition,
            transitionProps,
            wrapInKeepAlive(
              (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive,
              isNested && nuxtApp.isHydrating ? h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) : h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) })
            )
          ).default();
        }
      });
    };
  }
});
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const DanielKaufmanImg = "" + globalThis.__buildAssetsURL("Daniel Kaufman.62d8900e.jpg");
const MarkLafflerImg = "" + globalThis.__buildAssetsURL("Mark Laffler.fb773395.jpg");
const MartinGarciaImg = "" + globalThis.__buildAssetsURL("Martin Garcia.76d71115.jpg");
const FelixCaulderoImg = "" + globalThis.__buildAssetsURL("Felix Cauldero.7f0ac2da.jpg");
const GarySmall = "" + globalThis.__buildAssetsURL("GarySmall.1a2409ea.jpg");
const _sfc_main$g = defineComponent({
  data() {
    return {
      teamMembers: [
        {
          name: "Daniel Kaufman",
          picturePath: DanielKaufmanImg,
          job: "President & Chief Executive Officer",
          Detail: []
        },
        {
          name: "Mark Laffler",
          picturePath: MarkLafflerImg,
          job: "Chief Operating Officer",
          Detail: []
        },
        {
          name: "J. Martin Garcia",
          picturePath: MartinGarciaImg,
          job: "Director of Operations",
          Detail: []
        },
        {
          name: "Felix Cauldero",
          picturePath: FelixCaulderoImg,
          job: "Production Manager",
          Detail: []
        },
        {
          name: "Gary Small",
          picturePath: GarySmall,
          job: "Director of Marketing",
          Detail: []
        }
      ],
      settings: {
        itemsToShow: 1,
        transition: 200,
        snapAlign: "start"
      },
      breakpoints: {
        200: {
          itemsToShow: 1,
          snapAlign: "start"
        },
        700: {
          itemsToShow: 2,
          snapAlign: "start"
        },
        1024: {
          itemsToShow: 4,
          snapAlign: "start"
        }
      }
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_carousel = resolveComponent("carousel");
  const _component_slide = resolveComponent("slide");
  const _component_navigation = resolveComponent("navigation");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "container box-border" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_carousel, {
    settings: _ctx.settings,
    breakpoints: _ctx.breakpoints
  }, {
    addons: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_navigation, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_navigation)
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.teamMembers, (member, i) => {
          _push2(ssrRenderComponent(_component_slide, { key: i }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<div class="carousel_item flex shadow rounded-md select-none mx-auto"${_scopeId2}><img${ssrRenderAttr("src", member.picturePath)} class="carousel_item" alt="member-picture" height="300px" width="100%"${_scopeId2}><div class="p-5 flex align-center flex-col"${_scopeId2}><div${_scopeId2}><p class="text-lg lg:text-xl font-semibold"${_scopeId2}>${ssrInterpolate(member.name)}</p><p class="text-sm lg:text-base h-12 font-semibold text-gray-400"${_scopeId2}>${ssrInterpolate(member.job)}</p><button class="text-sm text-blue-primary mt-4"${_scopeId2}>More Detailis -&gt;</button></div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "carousel_item flex shadow rounded-md select-none mx-auto" }, [
                    createVNode("img", {
                      src: member.picturePath,
                      class: "carousel_item",
                      alt: "member-picture",
                      height: "300px",
                      width: "100%"
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "p-5 flex align-center flex-col" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-lg lg:text-xl font-semibold" }, toDisplayString(member.name), 1),
                        createVNode("p", { class: "text-sm lg:text-base h-12 font-semibold text-gray-400" }, toDisplayString(member.job), 1),
                        createVNode("button", { class: "text-sm text-blue-primary mt-4" }, "More Detailis ->")
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment$1, null, renderList(_ctx.teamMembers, (member, i) => {
            return openBlock(), createBlock(_component_slide, { key: i }, {
              default: withCtx(() => [
                createVNode("div", { class: "carousel_item flex shadow rounded-md select-none mx-auto" }, [
                  createVNode("img", {
                    src: member.picturePath,
                    class: "carousel_item",
                    alt: "member-picture",
                    height: "300px",
                    width: "100%"
                  }, null, 8, ["src"]),
                  createVNode("div", { class: "p-5 flex align-center flex-col" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-lg lg:text-xl font-semibold" }, toDisplayString(member.name), 1),
                      createVNode("p", { class: "text-sm lg:text-base h-12 font-semibold text-gray-400" }, toDisplayString(member.job), 1),
                      createVNode("button", { class: "text-sm text-blue-primary mt-4" }, "More Detailis ->")
                    ])
                  ])
                ])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TeamCarousel.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$f = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center" }, _attrs))}><div role="status"><svg class="inline mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg></div></div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ButtonSpiner.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$7]]);
const _imports_0$2 = "" + globalThis.__buildAssetsURL("girl_with_phone.7387dd32.png");
axios.defaults.headers["Content-Type"] = "application/json";
const apiClient = axios.create({
  baseURL: "http://localhost:4000/api"
});
class googleSheetApiService {
  getProducts() {
    return apiClient.get(`/google/getProducts`);
  }
  getSheetName(req) {
    return apiClient.get(`/google/getSheetName?sheetName=${req.sheetName}`);
  }
  getProductByDeviceName(req) {
    return apiClient.get(
      `/google/getProductByDeviceName?deviceName=${req.deviceName}`
    );
  }
  postSubscribers(req) {
    return apiClient.post(`/google/subscribers`, req);
  }
  postContact(req) {
    return apiClient.post(`/google/postContact`, req);
  }
  postLeads(req) {
    return apiClient.post(`/google/postLeads`, req);
  }
}
const googleSheetApiService$1 = new googleSheetApiService();
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Subscribe",
  __ssrInlineRender: true,
  setup(__props) {
    const subscribeEmail = ref("");
    const sending = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ButtonSpiner = __nuxt_component_0$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "p-5 py-10 gap-5 container mx-auto" }, _attrs))}><div class="grid lg:grid-cols-2 bg-blue-primary px-5 md:px-0 pt-5 lg:pt-0 rounded-md"><div class="flex flex-col gap-3 m-auto text-center"><p class="text-xl md:text-3xl lg:text-4xl text-center lg:text-left text-white font-bold">Stay Updated!</p><p class="text-sm md:text-base lg:text-lg text-center text-blue-200 font-semibold lg:text-left text-white">Subscribe to our newsletter</p><form class="flex justify-center m-auto md:m-0"><input${ssrRenderAttr("value", subscribeEmail.value)} class="h-10 md:h-12 rounded-l-lg pl-5 outline-0 text-sm w-4/5 text-xs font-semibold md:font-medium md:text-sm" type="email" placeholder="Enter Your Email"><button class="flex items-center h-10 md:h-12 bg-red-primary rounded-r-lg text-white p-1.5 md:p-2 text-xs md:text-sm font-medium md:font-normal" type="submit">`);
      if (sending.value) {
        _push(ssrRenderComponent(_component_ButtonSpiner, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` Subscribe </button></form></div><div class="pt-6"><img${ssrRenderAttr("src", _imports_0$2)} alt="subscribe-image" width="320" height="300" class="flex m-auto" loading="lazy"></div></div></section>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Subscribe.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const meta$8 = void 0;
const meta$7 = void 0;
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Accordion",
  __ssrInlineRender: true,
  props: {
    items: null
  },
  setup(__props) {
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<div class="${ssrRenderClass([{
          "bg-red-primary rounded-md": activeIndex.value === index
        }, "flex flex-col w-full p-4 lg:p-5 border-b"])}"><div class="flex gap-2"><h1 class="${ssrRenderClass([{
          "text-white": activeIndex.value === index,
          "text-gray-500": activeIndex.value !== index
        }, "font-bold grow text-left mb-2 p-1 md:p-2 text-sm md:text-base font-semibold"])}">${ssrInterpolate(item.title)}</h1><button class="${ssrRenderClass([{
          "text-white": activeIndex.value === index,
          "text-gray-600": activeIndex.value !== index
        }, "text-white grid place-content-center"])}"><div class="${ssrRenderClass([{
          "i-mdi-expand-more": activeIndex.value !== index,
          "i-mdi-expand-less": activeIndex.value === index
        }, "text-xl"])}"></div></button></div>`);
        if (activeIndex.value === index) {
          _push(`<div class="text-red-100 text-left text-sm md:text-base p-1 md:p-2">${ssrInterpolate(item.content)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Accordion.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const meta$6 = void 0;
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    secondary: { type: Boolean },
    third: { type: Boolean },
    href: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["gap-3 items-center px-5 py-3 rounded font-bold text-center", {
          "bg-red-500": !__props.secondary,
          "text-white": !__props.secondary,
          "border-2": __props.secondary,
          "border-blue-600": __props.secondary,
          "text-blue-600": __props.secondary,
          flex: !__props.third
        }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Button.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const heroCarouselImage = "" + globalThis.__buildAssetsURL("hero.047490e8.svg");
const _sfc_main$b = defineComponent({
  data() {
    return {
      sliders: [
        {
          photo: heroCarouselImage
        },
        {
          photo: heroCarouselImage
        },
        {
          photo: heroCarouselImage
        },
        {
          photo: heroCarouselImage
        },
        {
          photo: heroCarouselImage
        }
      ],
      settings: {
        itemsToShow: 1,
        snapAlign: "center"
      },
      breakpoints: {
        700: {
          itemsToShow: 1,
          snapAlign: "center"
        },
        1024: {
          itemsToShow: 1,
          snapAlign: "center"
        }
      }
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_carousel = resolveComponent("carousel");
  const _component_slide = resolveComponent("slide");
  const _component_pagination = resolveComponent("pagination");
  _push(ssrRenderComponent(_component_carousel, mergeProps({
    settings: _ctx.settings,
    breakpoints: _ctx.breakpoints,
    wrapAround: true,
    transition: 500,
    autoplay: 3e3
  }, _attrs), {
    addons: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_pagination, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_pagination)
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.sliders, (slider, i) => {
          _push2(ssrRenderComponent(_component_slide, { key: i }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<img${ssrRenderAttr("src", slider.photo)} width="450" height="450" alt="hero"${_scopeId2}>`);
              } else {
                return [
                  createVNode("img", {
                    src: slider.photo,
                    width: "450",
                    height: "450",
                    alt: "hero"
                  }, null, 8, ["src"])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment$1, null, renderList(_ctx.sliders, (slider, i) => {
            return openBlock(), createBlock(_component_slide, { key: i }, {
              default: withCtx(() => [
                createVNode("img", {
                  src: slider.photo,
                  width: "450",
                  height: "450",
                  alt: "hero"
                }, null, 8, ["src"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroCarousel.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$c;
      const _component_HeroCarousel = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="grid place-items-center text-center p-5 gap-5 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] container mx-auto lg:p-10"><div class="flex flex-col md:text-left gap-5 items-center md:items-start"><p>We Make Sales Happen!</p><h1 class="text-5xl font-poppins leading-tight"><div class="font-bold text-blue-600">Apple IPhone</div><div>13, Pro &amp; Pro Max</div></h1><p> The most reliable wholesale and retail mobile phone store.<br> If you are looking for a trusted shop, you can come to us! </p>`);
      _push(ssrRenderComponent(_component_Button, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Buy Now <div class="text-xl i-mdi-arrow-right-thin"${_scopeId}></div>`);
          } else {
            return [
              createTextVNode("Buy Now "),
              createVNode("div", { class: "text-xl i-mdi-arrow-right-thin" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_HeroCarousel, null, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center" }, _attrs))}><div role="status"><svg class="inline mr-2 w-12 h-12 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg><span class="sr-only">Loading...</span></div></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Spinner.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    carousel: { type: Boolean },
    title: null,
    type: null,
    originalPrice: null,
    price: null,
    productInfo: null
  },
  setup(__props) {
    const props = __props;
    const imgNo = ref(0);
    Object.keys(JSON.parse(props.productInfo.Photos));
    const photoUrls = Object.values(JSON.parse(props.productInfo.Photos));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["m-1 bg-white p-5 border rounded-xl border-gray-300 shadow-lg flex flex-col gap-3 relative hover:border-green-700 cursor-pointer", {
          "h-[98%]": __props.carousel
        }]
      }, _attrs))}><img${ssrRenderAttr("src", unref(photoUrls)[0][imgNo.value])} width="294" height="294" alt="product" class="w-full"><div class="flex justify-between gap-2"><div class="text-left"><span class="uppercase text-xs font-semibold text-gray-400">PHONE</span><h3 class="font-bold text-sm md:text-sm lg:text-base">${ssrInterpolate(__props.title)}</h3></div><div class="text-right flex flex-col"><div class="inline-block text-red-600 text-sm line-through"> $ ${ssrInterpolate(__props.originalPrice.toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))}</div><div class="inline-block text-blue-600 text-xl font-semibold whitespace-nowrap"> $ ${ssrInterpolate(__props.price.toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))}</div></div></div></article>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = defineComponent({
  props: {
    bestSellerLists: Array
  },
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: "start"
      },
      breakpoints: {
        300: {
          itemsToShow: 2,
          snapAlign: "start"
        },
        700: {
          itemsToShow: 3,
          snapAlign: "start"
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "start"
        }
      }
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_carousel = resolveComponent("carousel");
  const _component_slide = resolveComponent("slide");
  const _component_ProductCard = _sfc_main$8;
  const _component_navigation = resolveComponent("navigation");
  _push(ssrRenderComponent(_component_carousel, mergeProps({
    settings: _ctx.settings,
    breakpoints: _ctx.breakpoints,
    "items-to-show": 1.5
  }, _attrs), {
    addons: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_navigation, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_navigation)
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.bestSellerLists, (product, i) => {
          _push2(ssrRenderComponent(_component_slide, { key: i }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_ProductCard, {
                  title: product.Device,
                  price: product.A,
                  "original-price": product.Regular_Price,
                  productInfo: product,
                  type: "phone",
                  carousel: ""
                }, null, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_ProductCard, {
                    title: product.Device,
                    price: product.A,
                    "original-price": product.Regular_Price,
                    productInfo: product,
                    type: "phone",
                    carousel: ""
                  }, null, 8, ["title", "price", "original-price", "productInfo"])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment$1, null, renderList(_ctx.bestSellerLists, (product, i) => {
            return openBlock(), createBlock(_component_slide, { key: i }, {
              default: withCtx(() => [
                createVNode(_component_ProductCard, {
                  title: product.Device,
                  price: product.A,
                  "original-price": product.Regular_Price,
                  productInfo: product,
                  type: "phone",
                  carousel: ""
                }, null, 8, ["title", "price", "original-price", "productInfo"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BestSellerCarousel.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$4]]);
const stiveSmithImg = "" + globalThis.__buildAssetsURL("Stive Smith.9879f7f2.jpg");
const ArishaSultanaImg = "" + globalThis.__buildAssetsURL("Arisha Sultana.d29f6e3f.svg");
const WiliumsonImg = "" + globalThis.__buildAssetsURL("Wiliusmson.83a06b99.jpg");
const _sfc_main$6 = defineComponent({
  data() {
    return {
      customers: [
        {
          name: "Stive Smith",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: stiveSmithImg,
          job: "Customer",
          rating: 5
        },
        {
          name: "Arisha Sultana",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: ArishaSultanaImg,
          job: "Customer",
          rating: 5
        },
        {
          name: "Wiliumson",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: WiliumsonImg,
          job: "Customer",
          rating: 5
        },
        {
          name: "Stive Smith",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: stiveSmithImg,
          job: "Customer",
          rating: 5
        },
        {
          name: "Arisha Sultana",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: ArishaSultanaImg,
          job: "Customer",
          rating: 5
        },
        {
          name: "Wiliumson",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: WiliumsonImg,
          job: "Customer",
          rating: 5
        }
      ],
      settings: {
        itemsToShow: 1,
        snapAlign: "center"
      },
      breakpoints: {
        700: {
          itemsToShow: 2,
          snapAlign: "center"
        },
        1024: {
          itemsToShow: 3,
          snapAlign: "start"
        }
      }
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_carousel = resolveComponent("carousel");
  const _component_slide = resolveComponent("slide");
  const _component_navigation = resolveComponent("navigation");
  _push(ssrRenderComponent(_component_carousel, mergeProps({
    settings: _ctx.settings,
    breakpoints: _ctx.breakpoints,
    "items-to-show": 1.5,
    "wrap-around": true
  }, _attrs), {
    addons: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_navigation, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_navigation)
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.customers, (customer, i) => {
          _push2(ssrRenderComponent(_component_slide, { key: i }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<div class="flex flex-col border rounded-md p-5 mx-4"${_scopeId2}><p class="text-left pb-10 text-black-600 text-sm"${_scopeId2}>${ssrInterpolate(customer.content)}</p><div class="flex justify-between items-end"${_scopeId2}><div class="flex gap-2"${_scopeId2}><img loading="lazy"${ssrRenderAttr("src", customer.photo)} width="60" height="60" alt="customer-photo"${_scopeId2}><div${_scopeId2}><p class="text-left text-sm md:text-base font-semibold font-medium"${_scopeId2}>${ssrInterpolate(customer.name)}</p><p class="text-left text-sm font-semibold text-gray-400"${_scopeId2}>${ssrInterpolate(customer.job)}</p></div></div><div class="flex items-center justify-bottom"${_scopeId2}><div class="text-sm md:text-lg i-mdi-star text-yellow-400"${_scopeId2}></div><div class="text-sm md:text-lg i-mdi-star text-yellow-400"${_scopeId2}></div><div class="text-sm md:text-lg i-mdi-star text-yellow-400"${_scopeId2}></div><div class="text-sm md:text-lg i-mdi-star text-yellow-400"${_scopeId2}></div><div class="text-sm md:text-lg i-mdi-star text-yellow-400"${_scopeId2}></div></div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col border rounded-md p-5 mx-4" }, [
                    createVNode("p", { class: "text-left pb-10 text-black-600 text-sm" }, toDisplayString(customer.content), 1),
                    createVNode("div", { class: "flex justify-between items-end" }, [
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("img", {
                          loading: "lazy",
                          src: customer.photo,
                          width: "60",
                          height: "60",
                          alt: "customer-photo"
                        }, null, 8, ["src"]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-left text-sm md:text-base font-semibold font-medium" }, toDisplayString(customer.name), 1),
                          createVNode("p", { class: "text-left text-sm font-semibold text-gray-400" }, toDisplayString(customer.job), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center justify-bottom" }, [
                        createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                        createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                        createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                        createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                        createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" })
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment$1, null, renderList(_ctx.customers, (customer, i) => {
            return openBlock(), createBlock(_component_slide, { key: i }, {
              default: withCtx(() => [
                createVNode("div", { class: "flex flex-col border rounded-md p-5 mx-4" }, [
                  createVNode("p", { class: "text-left pb-10 text-black-600 text-sm" }, toDisplayString(customer.content), 1),
                  createVNode("div", { class: "flex justify-between items-end" }, [
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("img", {
                        loading: "lazy",
                        src: customer.photo,
                        width: "60",
                        height: "60",
                        alt: "customer-photo"
                      }, null, 8, ["src"]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-left text-sm md:text-base font-semibold font-medium" }, toDisplayString(customer.name), 1),
                        createVNode("p", { class: "text-left text-sm font-semibold text-gray-400" }, toDisplayString(customer.job), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-bottom" }, [
                      createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                      createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                      createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                      createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" }),
                      createVNode("div", { class: "text-sm md:text-lg i-mdi-star text-yellow-400" })
                    ])
                  ])
                ])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CustomerReview.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$3]]);
const meta$5 = void 0;
const meta$4 = void 0;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
const isVue2 = false;
/*!
  * pinia v2.0.23
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol("pinia") ;
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration") ;
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!hot)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? toRefs(ref(state ? state() : {}).value) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[\u{1F34D}]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!hot)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = () => {
    throw new Error(`\u{1F34D}: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
  } ;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
    },
    partialStore
  ) );
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? computed(() => {
          setActivePinia(pinia);
          return getter.call(store, store);
        }) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance();
    pinia = (pinia) || currentInstance && inject(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[\u{1F34D}]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const useProductPageStore = defineStore("productPageStore", {
  state: () => {
    return {
      searchWord: "",
      displayCount: 45,
      selectedType: "",
      sortByProperty: "Name",
      brandList: [],
      selectedBrand: ""
    };
  },
  getters: {
    getSearchWord(state) {
      return state.searchWord;
    },
    getSelectedType(state) {
      return state.selectedType;
    }
  },
  actions: {
    setSearchWord(value) {
      this.searchWord = value;
    },
    setType(value) {
      this.selectedType = value;
    },
    setSortByProperty(value) {
      this.sortByProperty = value;
    },
    setBrandList(value) {
      this.brandList = value;
    },
    setSelectedBrand(value) {
      this.selectedBrand = value;
    }
  }
});
const _sfc_main$5 = defineComponent({
  setup() {
    const store = useProductPageStore();
    return {
      store
    };
  },
  props: {
    bestSellerLists: Array
  },
  data() {
    return {
      menu: [],
      loading: true,
      isOpenSidebar: false
    };
  },
  components: {
    SidebarMenu
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (string == "case" || string == "headphone" || string == "speaker" || string == "Phone" || string == "tablet") {
        return string.charAt(0).toUpperCase() + string.slice(1).concat("s");
      } else if (string == "Phone" || string == "watch" || string == "tablet") {
        return string.charAt(0).toUpperCase() + string.slice(1).concat("es");
      }
    },
    onToggleCollapse(collapsed) {
    },
    onItemClick(event, item) {
      this.store.setType(item.value);
      this.store.setSelectedBrand("");
      this.store.setSortByProperty("Name");
    }
  },
  mounted() {
    googleSheetApiService$1.getProducts().then((response) => {
      let allTypeList = response.data.map((product) => {
        return product.Type;
      });
      let uniqueList = allTypeList.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.store.setType(uniqueList);
      let mainMenu = [];
      let subMenu = [];
      uniqueList.forEach((type) => {
        if (type == "case" || type == "headphone" || type == "speaker") {
          subMenu.push({
            title: this.capitalizeFirstLetter(type),
            href: "/products",
            value: type
          });
        } else {
          mainMenu.push({
            title: this.capitalizeFirstLetter(type),
            href: "/products",
            value: type
          });
        }
      });
      mainMenu.unshift({
        title: "Accessories",
        href: "/products",
        value: ["case", "headphone", "speaker"],
        child: subMenu
      });
      mainMenu.unshift({
        title: "View All Products",
        href: "/products",
        value: uniqueList
      });
      this.menu = mainMenu;
      this.loading = false;
    }).catch((e) => {
      console.log(e);
    });
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Spinner = __nuxt_component_0$2;
  const _component_sidebar_menu = resolveComponent("sidebar-menu");
  _push(`<!--[-->`);
  if (_ctx.loading) {
    _push(ssrRenderComponent(_component_Spinner, { class: "mt-96" }, null, _parent));
  } else {
    _push(ssrRenderComponent(_component_sidebar_menu, {
      menu: _ctx.menu,
      theme: "white-theme",
      width: "100%",
      onItemClick: _ctx.onItemClick,
      class: ["drawer md:-translate-x-0", {
        "-translate-x-full": !_ctx.isOpenSidebar,
        "-translate-x-0": _ctx.isOpenSidebar
      }]
    }, null, _parent));
  }
  _push(`<button class="fixed top-36 left-0 bg-gray-400 md:hidden p-1 border rounded-r-full"><div class="i-mdi-menu-right text-lg"></div></button><!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/products/SideBar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$2]]);
const meta$3 = void 0;
const meta$2 = void 0;
const meta$1 = void 0;
const meta = void 0;
const _routes = [
  {
    name: "company",
    path: "/company",
    file: "/Users/iquit/Desktop/Reagan/frontend/pages/company.vue",
    children: [],
    meta: meta$8,
    alias: [],
    component: () => import('./_nuxt/company.1589677a.mjs').then((m) => m.default || m)
  },
  {
    name: "contact",
    path: "/contact",
    file: "/Users/iquit/Desktop/Reagan/frontend/pages/contact.vue",
    children: [],
    meta: meta$7,
    alias: [],
    component: () => import('./_nuxt/contact.a09f3269.mjs').then((m) => m.default || m)
  },
  {
    name: "faq",
    path: "/faq",
    file: "/Users/iquit/Desktop/Reagan/frontend/pages/faq.vue",
    children: [],
    meta: meta$6,
    alias: [],
    component: () => import('./_nuxt/faq.9df64455.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    file: "/Users/iquit/Desktop/Reagan/frontend/pages/index.vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => import('./_nuxt/index.a7e023ed.mjs').then((m) => m.default || m)
  },
  {
    name: "my-id",
    path: "/my/:id(.*)*",
    file: "/Users/iquit/Desktop/Reagan/frontend/pages/my/[...id].vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => import('./_nuxt/_...id_.cae0e431.mjs').then((m) => m.default || m)
  },
  {
    path: "/products",
    file: "/Users/iquit/Desktop/Reagan/frontend/pages/products.vue",
    children: [
      {
        name: "products-id",
        path: ":id(.*)*",
        file: "/Users/iquit/Desktop/Reagan/frontend/pages/products/[...id].vue",
        children: [],
        meta: meta$2,
        alias: [],
        component: () => import('./_nuxt/_...id_.5dea2c7d.mjs').then((m) => m.default || m)
      },
      {
        name: "products",
        path: "",
        file: "/Users/iquit/Desktop/Reagan/frontend/pages/products/index.vue",
        children: [],
        meta: meta$1,
        alias: [],
        component: () => import('./_nuxt/index.94e36b4e.mjs').then((m) => m.default || m)
      }
    ],
    meta: meta$3,
    alias: [],
    component: () => import('./_nuxt/products.f6cef1fe.mjs').then((m) => m.default || m)
  },
  {
    name: "wholesale",
    path: "/wholesale",
    file: "/Users/iquit/Desktop/Reagan/frontend/pages/wholesale.vue",
    children: [],
    meta,
    alias: [],
    component: () => import('./_nuxt/wholesale.48874e51.mjs').then((m) => m.default || m)
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const route_45global = defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path && false) {
    window.scrollTo(0, 0);
  }
});
const globalMiddleware = [
  route_45global
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c, _d;
  let __temp, __restore;
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b = (_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) != null ? _b : createMemoryHistory(routerBase);
  const routes = (_d = (_c = routerOptions.routes) == null ? void 0 : _c.call(routerOptions, _routes)) != null ? _d : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a2, _b2, _c2, _d2;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a2, _b2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a2 = initialLayout.value) != null ? _a2 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq = defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const _nuxt_unocss_mjs_MzCDxu9LMj = defineNuxtPlugin(() => {
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq,
  _nuxt_unocss_mjs_MzCDxu9LMj
];
const _sfc_main$4 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.81379b18.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0$1 = "" + globalThis.__buildAssetsURL("logo.26dc095d.svg");
const _imports_1$1 = "" + globalThis.__buildAssetsURL("whatsapp.fd5fbed4.svg");
const _imports_2$1 = "" + globalThis.__buildAssetsURL("earth.dcfa6bcd.svg");
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Nav",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isOpenNav = ref(false);
    watchEffect(() => console.log("Path:", route.path));
    const navLinks = [
      {
        title: "Home",
        href: "/"
      },
      {
        title: "Products",
        href: "/products"
      },
      {
        title: "Company",
        href: "/company"
      },
      {
        title: "Contact",
        href: "/contact"
      },
      {
        title: "FAQ",
        href: "/faq"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed z-20 w-full" }, _attrs))} data-v-e1eabc03><nav class="flex justify-between p-5 bg-white items-center" data-v-e1eabc03>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0$1)} alt="logo" width="140" height="50" data-v-e1eabc03${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0$1,
                alt: "logo",
                width: "140",
                height: "50"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative flex items-center" data-v-e1eabc03>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/wholesale" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="md:hidden gap-3 items-center text-center w-32 py-2 text-white rounded font-medium text-sm bg-blue-500 border mx-2" data-v-e1eabc03${_scopeId}>How To Buy</button>`);
          } else {
            return [
              createVNode("button", { class: "md:hidden gap-3 items-center text-center w-32 py-2 text-white rounded font-medium text-sm bg-blue-500 border mx-2" }, "How To Buy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass([{
        "i-mdi-close": isOpenNav.value,
        "i-mdi-menu": !isOpenNav.value
      }, "md:hidden cursor-pointer text-2xl text-blue-600 i-mdi-close"])}" data-v-e1eabc03></div>`);
      if (isOpenNav.value) {
        _push(`<div class="${ssrRenderClass([{
          "opacity-full": isOpenNav.value
        }, "opacity-0 transition-opacity text-sm duration-300 md:hidden absolute z-20 right-0 top-14 border border-blue-300 rounded-lg p-1 gap-1 bg-white flex flex-col items-center"])}" data-v-e1eabc03><!--[-->`);
        ssrRenderList(navLinks, ({ title, href, sublinks }) => {
          _push(ssrRenderComponent(_component_NuxtLink, { to: href }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (href) {
                  _push2(`<div class="${ssrRenderClass([{
                    "bg-[#4E80EE] rounded-md hover:bg-[#4E80EE] text-white": unref(route).path === href
                  }, "select-none hover:bg-blue-200 cursor-pointer rounded-md w-36 py-2 text-center"])}" data-v-e1eabc03${_scopeId}><span class="${ssrRenderClass({
                    "font-semibold": unref(route).path === href
                  })}" data-v-e1eabc03${_scopeId}>${ssrInterpolate(title)}</span>`);
                  if (sublinks) {
                    _push2(`<div class="flex gap-1 items-center" data-v-e1eabc03${_scopeId}><span data-v-e1eabc03${_scopeId}>${ssrInterpolate(title)}</span><span class="i-mdi-expand-more" data-v-e1eabc03${_scopeId}></span></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  href ? (openBlock(), createBlock("div", {
                    key: title,
                    class: ["select-none hover:bg-blue-200 cursor-pointer rounded-md w-36 py-2 text-center", {
                      "bg-[#4E80EE] rounded-md hover:bg-[#4E80EE] text-white": unref(route).path === href
                    }]
                  }, [
                    createVNode("span", {
                      class: {
                        "font-semibold": unref(route).path === href
                      }
                    }, toDisplayString(title), 3),
                    sublinks ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex gap-1 items-center"
                    }, [
                      createVNode("span", null, toDisplayString(title), 1),
                      createVNode("span", { class: "i-mdi-expand-more" })
                    ])) : createCommentVNode("", true)
                  ], 2)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden md:flex lg:flex gap-8" data-v-e1eabc03><div class="flex items-start gap-3" data-v-e1eabc03><img${ssrRenderAttr("src", _imports_1$1)} width="24" height="24" alt="whatsapp" data-v-e1eabc03><div class="flex flex-col" data-v-e1eabc03><span class="font-semibold text-sm lg:text-md" data-v-e1eabc03>WhatsApp</span><span class="text-sm font-semibold text-stone-500 lg:text-black lg:font-normal md:text-md lg:text-lg" data-v-e1eabc03>+1-754-600-9064 </span></div></div><div class="flex items-start gap-3" data-v-e1eabc03><img${ssrRenderAttr("src", _imports_2$1)} width="24" height="24" alt="number" data-v-e1eabc03><div class="flex flex-col" data-v-e1eabc03><span class="font-semibold text-sm lg:text-md" data-v-e1eabc03>International</span><span class="text-sm font-semibold text-stone-500 lg:text-black lg:font-normal md:text-md lg:text-lg" data-v-e1eabc03>+1-954-596-2355</span></div></div></div></nav><div class="hidden md:flex lg:flex justify-center bg-blue-600 text-white custom-gradient" data-v-e1eabc03><div class="p-3 lg:p-5 gap-7 flex w-full items-center" data-v-e1eabc03><div class="marquee justify-self-start whitespace-nowrap overflow-hidden" data-v-e1eabc03><p class="text-xs lg:text-sm font-semibold lg:font-normal text-yellow-300 max-w-[50ch] inline-block" data-v-e1eabc03> Please call our Sales Team at 1-877-724-3266 for current inventory and pricing. WE ARE NOT AN E-COMMERCE COMPANY. Wholesale only. Our website is not regularly updated. </p></div><ul class="flex justify-self-end gap-3 lg:font-medium text-blue-300 lg:gap-5 text-xs lg:text-sm items-center" data-v-e1eabc03><!--[-->`);
      ssrRenderList(navLinks, ({ title, href, sublinks }) => {
        _push(`<li data-v-e1eabc03>`);
        if (href) {
          _push(ssrRenderComponent(_component_NuxtLink, { to: href }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="${ssrRenderClass({
                  "text-white": unref(route).path === href
                })}" data-v-e1eabc03${_scopeId}>${ssrInterpolate(title)}</span>`);
              } else {
                return [
                  createVNode("span", {
                    class: {
                      "text-white": unref(route).path === href
                    }
                  }, toDisplayString(title), 3)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (sublinks) {
          _push(`<div class="flex gap-1 items-center" data-v-e1eabc03><span data-v-e1eabc03>${ssrInterpolate(title)}</span><span class="i-mdi-expand-more" data-v-e1eabc03></span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--><li data-v-e1eabc03>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/wholesale" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="min-w-[100px] text-white h-8 lg:h-12 text-xs lg:text-sm text-center py-4 lg:px-4 md:py-1 rounded font-semibold border bg-blue-500 hover:bg-blue-400 active:bg-blue-600" data-v-e1eabc03${_scopeId}> How To Buy </button>`);
          } else {
            return [
              createVNode("button", { class: "min-w-[100px] text-white h-8 lg:h-12 text-xs lg:text-sm text-center py-4 lg:px-4 md:py-1 rounded font-semibold border bg-blue-500 hover:bg-blue-400 active:bg-blue-600" }, " How To Buy ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Nav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e1eabc03"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const socials = [
      { link: "#", iconPath: "_nuxt/assets/images/facebook.svg", ariaLabel: "Facebook Page Link" },
      { link: "#", iconPath: "_nuxt/assets/images/twitter.svg", ariaLabel: "Twitter Account Link" },
      { link: "#", iconPath: "_nuxt/assets/images/pinterest.svg", ariaLabel: "Pinterest Link" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-b border-cyan-300 custom-gradient" }, _attrs))}><footer class="grid p-5 text-white flex-col py-20 gap-5 container mx-auto"><div class="gap-x-10 gap-y-10 mt-5 md:mt-0 grid grid-cols-[repeat(auto,minmax(12rem,1fr))] w-full md:grid-cols-[repeat(4,minmax(8rem,1fr))]"><div class="flex flex-col gap-5 text-sm items-center md:items-start text-center md:text-left"><img loading="lazy"${ssrRenderAttr("src", _imports_0$1)} alt="logo" class="max-w-full w-[13rem] mx-auto md:m-0" width="167" height="60"><p>720 South Powerline Rd. Suite D Deerfield Beach FL 33442</p><div class="flex gap-3 flex-wrap"><span> Follow Us </span><!--[-->`);
      ssrRenderList(socials, (social, i) => {
        _push(`<a${ssrRenderAttr("href", social.link)}${ssrRenderAttr("aria-label", social.ariaLabel)}><img loading="lazy"${ssrRenderAttr("src", social.iconPath)} alt="social-icon" width="24" height="24"></a>`);
      });
      _push(`<!--]--></div></div><div class="flex flex-col gap-3"><h3 class="text-md font-semibold text-center md:text-left">How to buy</h3><ul class="flex flex-col font-medium text-center text-sm md:text-left leading-7 footer-text"><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/wholesale",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Wholesale Application`);
          } else {
            return [
              createTextVNode("Wholesale Application")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/company",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About Us`);
          } else {
            return [
              createTextVNode("About Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/contact",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact Us`);
          } else {
            return [
              createTextVNode("Contact Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/company",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Environmental`);
          } else {
            return [
              createTextVNode("Environmental")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/company",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Management Team`);
          } else {
            return [
              createTextVNode("Management Team")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/company",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Press Releases`);
          } else {
            return [
              createTextVNode("Press Releases")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/company",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Social Responsibility`);
          } else {
            return [
              createTextVNode("Social Responsibility")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/company",
        class: "footer-text-hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Recycling`);
          } else {
            return [
              createTextVNode("Recycling")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="flex flex-col gap-3 text-center md:text-left"><h3 class="text-md font-semibold text-center md:text-left">Privacy Policy</h3><ul class="flex flex-col font-medium text-center text-sm md:text-left leading-7 footer-text"><li>Returns</li><li>Terms</li><li>GDPR</li></ul></div><div class="flex flex-col gap-3"><h3 class="text-md font-semibold text-center md:text-left">Contact</h3><ul class="flex flex-col font-medium text-center md:text-left text-sm leading-7 footer-text"><li class="leading-5 mb-4"><span class="text-blue-300 font-medium">Toll Free</span><p class="select-all" title="Click to select all">877-724-3266</p></li><li class="leading-5 mb-4"><span class="text-blue-300 font-medium">International</span><p class="select-all" title="Click to select all">1-954-596-2355</p></li><li class="leading-5 mb-4"><span class="text-blue-300 font-medium">WhatsApp</span><p class="select-all" title="Click to select all">1-754-600-9064</p></li><li class="leading-5 mb-4"><span class="text-blue-300 font-medium">Timings</span><p class=""> Mon \u2013 Fri <br> 9:00am \u2013 5:30pm </p></li><br></ul></div></div></footer></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "" + globalThis.__buildAssetsURL("r2-e1621868304497.e4f9c4e3.svg");
const _imports_1 = "" + globalThis.__buildAssetsURL("iso-14001-2015-2-150x150.6d50e443.svg");
const _imports_2 = "" + globalThis.__buildAssetsURL("iso-45001-2018-2-1-150x150.a1562465.svg");
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-blue-5 border-t border-blue-primary 0 p-6" }, _attrs))}><div class="container mx-auto flex justify-between md:px-36 lg:px-80"><img loading="lazy" width="150px" height="150px" alt="certified-logos"${ssrRenderAttr("src", _imports_0)}><img loading="lazy" width="80px" height="80px" alt="certified-logos"${ssrRenderAttr("src", _imports_1)}><img loading="lazy" width="80px" height="80px" alt="certified-logos"${ssrRenderAttr("src", _imports_2)}></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/FooterBottom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Nav = __nuxt_component_0;
  const _component_NuxtPage = resolveComponent("NuxtPage");
  const _component_Footer = _sfc_main$2;
  const _component_FooterBottom = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Nav, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtPage, { class: "pt-24 md:pt-36 lg:pt-44" }, null, _parent));
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(ssrRenderComponent(_component_FooterBottom, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$4);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { __nuxt_component_0$4 as _, _sfc_main$e as a, __nuxt_component_0$3 as b, _sfc_main$d as c, _sfc_main$a as d, entry$1 as default, _sfc_main$c as e, __nuxt_component_0$2 as f, __nuxt_component_3 as g, _sfc_main$8 as h, __nuxt_component_5 as i, _export_sfc as j, useRoute as k, useProductPageStore as l, googleSheetApiService$1 as m, __nuxt_component_0$1 as n, __nuxt_component_0$5 as o, useHead as u };
//# sourceMappingURL=server.mjs.map
