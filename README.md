# json-item-selector
[![Tests](https://github.com/JosephVoid/json-item-selector/actions/workflows/test.yml/badge.svg)](https://github.com/JosephVoid/json-item-selector/actions/workflows/test.yml)

A package that allow you to create choice logic based on a json file. It helps with choice implementations which depend on an external json file and are heavily nested, mostly for use cases like location selection or game dialog mapping. A basic example below
```
// ESM
import {JsonItemSelector} from "json-item-selector";
// CommonJS
const {JsonItemSelector} = require("json-item-selector");

const json = {
    "galaxy": {
        "milky-way": {
            "earth": [
                "africa",
                "asia",
                "aurope",
            ],
            "venus": [
                "valnaes",
            ],
        },
        "andromeda": {
            "pegasus":[],
            "cassopia":[]
        }
    }
}

const JIS = new JsonItemSelector(json);

console.log(JIS.list_options()); // ["galaxy"]

JIS.select_option("galaxy"); // returns true if successful

console.log(JIS.list_options()); // ["milky-way", "andromeda"]

JIS.select_option("milky-way");

console.log(JIS.list_options()); // ["earth", "venus"]

JIS.select_option("earth");

console.log(JIS.list_options()); // ["africa", "asia", "europe"]

console.log(JIS.get_all_selected()); // ["galaxy", "milky-way", "earth"]


```

# Installation
```
npm install json-item-selector
```

# Methods
| Name | Description | Params | Defaults | Returns |
| ------ | ------ | ------ | ------ | ------ |
| list_options | List all the possible options to select, starting from the first level/ highest depth  | - | | `string []` |
| select_option | Choose from the available options from the current level/depth, after selecting the next list of option will go to the next level/depth of properties  | `option: string` `deny_repeats?: boolean` | `deny_repeats: false`| `boolean` |
| get_all_selected | Lists all the options selected so far | - | | `string []` |
| get_last_selected | Gets the last selected option | - | | `string` |
| clear_last | Remove the last selected option and go back up a level/higher in depth | - | | `boolean` |
| clear_all_selected | Remove all selection and return to the first level | - | | `boolean` |
