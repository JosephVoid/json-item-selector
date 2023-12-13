type PlainObject = Record<string, {}>;
export class JsonItemSelector {
    private choice_tree: string[];
    private json: PlainObject;
    
    constructor (json_object: PlainObject) {
        this.json = json_object;
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

    public select_option (option: string, step?: number):boolean {
        if (!this.list_options().includes(option))
            return false;
        this.choice_tree.push(option);
        return true
    }

    public get_selected ():string[] {
        return [""]
    }

    public get_last_selected ():void {}

    private static access_value (choice_tree: string[], obj: PlainObject, depth: number): any {
        if (depth > choice_tree.length - 1) 
            return obj;
        else {
            return this.access_value(choice_tree, obj[choice_tree[depth]], ++depth);
        } 
    }
}