// src/index.ts
var JsonItemSelector = class _JsonItemSelector {
  choice_tree;
  json;
  constructor(json_object) {
    this.json = _JsonItemSelector.transform_json(json_object);
    this.choice_tree = [];
  }
  list_no_depth() {
    const option_list = [];
    if (this.choice_tree.length === 0) {
      for (const key in this.json) {
        if (Object.prototype.hasOwnProperty.call(this.json, key)) {
          option_list.push(key);
        }
      }
    } else {
      const next_object = _JsonItemSelector.access_value(this.choice_tree, this.json, 0);
      if (Array.isArray(next_object)) {
        for (let i = 0; i < next_object.length; i++) {
          option_list.push(next_object[i]);
        }
      } else if (typeof next_object === "object") {
        for (const key in next_object) {
          if (Object.prototype.hasOwnProperty.call(next_object, key)) {
            option_list.push(key);
          }
        }
      } else {
        option_list.length = 0;
      }
    }
    return option_list;
  }
  list(at_depth) {
    const option_list = [];
    if (at_depth < 0 || at_depth > this.choice_tree.length)
      return [];
    if (this.choice_tree.length === 0) {
      for (const key in this.json) {
        if (Object.prototype.hasOwnProperty.call(this.json, key)) {
          option_list.push(key);
        }
      }
    } else {
      const next_object = _JsonItemSelector.access_value(this.choice_tree.slice(0, at_depth), this.json, 0);
      if (Array.isArray(next_object)) {
        for (let i = 0; i < next_object.length; i++) {
          option_list.push(next_object[i]);
        }
      } else if (typeof next_object === "object") {
        for (const key in next_object) {
          if (Object.prototype.hasOwnProperty.call(next_object, key)) {
            option_list.push(key);
          }
        }
      } else {
        option_list.length = 0;
      }
    }
    return option_list;
  }
  select_no_depth(option, deny_repeats = false) {
    if (!this.list_no_depth().includes(option))
      return false;
    if (deny_repeats && this.choice_tree.includes(option))
      return false;
    this.choice_tree.push(option);
    return true;
  }
  select(option, at_depth, deny_repeats = false) {
    if (!this.list(at_depth).includes(option))
      return false;
    if (deny_repeats && this.choice_tree.includes(option))
      return false;
    if (at_depth < 0 || at_depth > this.choice_tree.length)
      return false;
    this.choice_tree.splice(at_depth);
    this.choice_tree[at_depth] = option;
    return true;
  }
  get_all_selected() {
    return this.choice_tree;
  }
  get_last_selected() {
    return this.choice_tree[this.choice_tree.length - 1];
  }
  clear_last(step) {
    this.choice_tree.length = this.choice_tree.length - step;
    return true;
  }
  clear_all_selected() {
    this.choice_tree = [];
    return true;
  }
  static access_value(choice_tree, obj, depth) {
    if (depth > choice_tree.length - 1)
      return obj;
    else {
      return this.access_value(choice_tree, obj[choice_tree[depth]], ++depth);
    }
  }
  static transform_json(inp_json) {
    try {
      const str_json = JSON.stringify(inp_json) ?? "";
      let out_str = [];
      let elim_str = [];
      for (let i = 0; i < str_json.length; i++) {
        if (str_json[i] === "[" && str_json[i + 1] === "{") {
          elim_str.push(str_json[i]);
        } else if (str_json[i] === "]" && str_json[i - 1] === "}") {
          elim_str.push(str_json[i]);
        } else if (str_json[i] === "}" && str_json[i + 1] === "," && str_json[i + 2] === "{" || str_json[i] === "," && str_json[i + 1] === "{" && str_json[i - 1] === "{" || str_json[i] === "{" && str_json[i - 1] === "," && str_json[i - 2] === "}") {
          elim_str.push(str_json[i]);
        } else {
          out_str.push(str_json[i]);
        }
      }
      return JSON.parse(out_str.join(""));
    } catch (error) {
      return {};
    }
  }
};
export {
  JsonItemSelector
};
