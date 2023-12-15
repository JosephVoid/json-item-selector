type PlainObject = Record<string, {}>;
export class JsonItemSelector {
    private choice_tree: string[];
    private json: PlainObject;
    
    constructor (json_object: PlainObject) {
        this.json = JsonItemSelector.transform_json(json_object);
        this.choice_tree = [];
    }

    public list_options ():string[] {
        const option_list: string[] = [];
        if (this.choice_tree.length === 0) {
            for (const key in this.json) {
                if (Object.prototype.hasOwnProperty.call(this.json, key)) {
                    option_list.push(key);
                }
            }
        }
        else {
            const next_object = JsonItemSelector.access_value(this.choice_tree, this.json, 0);
            if (Array.isArray(next_object)) {
                for(let i = 0; i < next_object.length; i++) {
                    option_list.push(next_object[i]);
                }
            } 
            else if (typeof next_object === "string") {
                option_list.length = 0;
            }
            else {
                for (const key in next_object) {
                    if (Object.prototype.hasOwnProperty.call(next_object, key)) {
                        option_list.push(key);
                    }
                }
            }
        }
        return option_list;
    }

    public select_option (option: string, deny_repeats: boolean = false):boolean {
        if (!this.list_options().includes(option))
            return false;
        if (deny_repeats && this.choice_tree.includes(option))
            return false;
        this.choice_tree.push(option);
        return true
    }

    public get_all_selected ():string[] {
        return this.choice_tree;
    }

    public get_last_selected ():string {
        return this.choice_tree[this.choice_tree.length - 1];
    }

    public clear_last (step: number):boolean {
        this.choice_tree.length = this.choice_tree.length - step;
        return true;
    }

    public clear_all_selected ():boolean {
        this.choice_tree = [];
        return true;
    }

    private static access_value (choice_tree: string[], obj: PlainObject, depth: number): any {
        if (depth > choice_tree.length - 1) 
            return obj;
        else {
            return this.access_value(choice_tree, obj[choice_tree[depth]], ++depth);
        } 
    }

    private static transform_json (inp_json: any):any {
        try {
            const str_json = JSON.stringify(inp_json) ?? "";
            let out_str:string[] = [];
            let elim_str:string[] = [];
            for (let i = 0; i < str_json.length; i++) {
                if (str_json[i] === "[" && str_json[i+1] === "{") {
                    elim_str.push(str_json[i]);
                }
                else if (str_json[i] === "]" && str_json[i-1] === "}") {
                    elim_str.push(str_json[i]);
                }
                else if (
                    str_json[i] === "}" && str_json[i+1] === "," && str_json[i+2] === "{" || 
                    str_json[i] === "," && str_json[i+1] === "{" && str_json[i-1] === "{" ||
                    str_json[i] === "{" && str_json[i-1] === "," && str_json[i-2] === "}"
                ){
                    elim_str.push(str_json[i]);
                }            
                else {
                    out_str.push(str_json[i]);
                }
            }
            return JSON.parse(out_str.join(""));
        } catch (error) {
            return {};
        }
        
    }
}