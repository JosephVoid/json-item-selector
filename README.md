## test
# json-item-selector
[![Tests](https://github.com/JosephVoid/json-item-selector/actions/workflows/test.yml/badge.svg)](https://github.com/JosephVoid/json-item-selector/actions/workflows/test.yml)

A package that allow you to create choice logic based on a json file. It helps with choice implementations which depend on an external json file and are heavily nested, mostly for use cases like location selection or game dialog mapping. A basic example below
```
// ESM
import {JsonItemSelector} from "json-item-selector";
// CommonJS
const {JsonItemSelector} = require("json-item-selector");

const galaxy = {
    // Depth: 0
    "milky-way": {
        // Depth: 1
        "earth": [
            // Depth: 2
            "africa",
            "asia",
            "aurope",
        ],
        // Depth: 1
        "venus": [
            // Depth: 2
            "valnaes",
        ],
    },
    // Depth: 0
    "andromeda": {
        // Depth: 1
        "pegasus":[
          // Depth: 2
          "perg",
          "gaort"
        ],
        // Depth: 1
        "cassopia":[
           // Depth: 2
          'epian',
          'siltron'
        ]
    }
}

const JIS = new JsonItemSelector(galaxy);

console.log(JIS.list(0)); // ["milky-way", "andromeda"] --> List options at 0 depth 

JIS.select("milky-way", 0); // --> Selects from options at 0 depth

console.log(JIS.list(1)); // ["earth", "venus"] --> List options at depth 1

JIS.select("earth", 1); // --> Selects from options at depth 1

console.log(JIS.list(2)); // ["africa", "asia", "europe"]

JIS.select("africa", 2);

console.log(JIS.get_all_selected()); // ["milky-way", "earth", "africa"]

```
[CodePen Example](https://codepen.io/Yoseph-Tenaw/pen/GRzVZzO)

# Installation
```
npm install json-item-selector
```

# Methods
| Name | Description | Params | Defaults | Returns |
| ------ | ------ | ------ | ------ | ------ |
| list | List all the possible options to select at a given depth in the object | `depth: number` | | `string []` |
| select | Choose from the available options from the given depth | `option: string` `deny_repeats?: boolean` `depth: number` | `deny_repeats: false`| `boolean` |
| list_no_depth | List all the possible options to select, starting from the first level/ highest depth  | - | | `string []` |
| select_no_depth | Choose from the available options from the current level/depth, after selecting the next list of option will go to the next level/depth of properties  | `option: string` `deny_repeats?: boolean` | `deny_repeats: false`| `boolean` |
| get_all_selected | Lists all the options selected so far | - | | `string []` |
| get_last_selected | Gets the last selected option | - | | `string` |
| clear_last | Remove the last selected option and go back up a level/higher in depth | - | | `boolean` |
| clear_all_selected | Remove all selection and return to the first level | - | | `boolean` |
