type JsonObject = Record<string, {}>;
declare class JsonItemSelector {
    private choice_tree;
    private json;
    constructor(json_object: JsonObject);
    list_no_depth(): string[];
    list(at_depth: number): string[];
    select_no_depth(option: string, deny_repeats?: boolean): boolean;
    select(option: string, at_depth: number, deny_repeats?: boolean): boolean;
    get_all_selected(): string[];
    get_last_selected(): string;
    clear_last(step: number): boolean;
    clear_all_selected(): boolean;
    private static access_value;
    private static transform_json;
}

export { JsonItemSelector };
