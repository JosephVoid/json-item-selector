import test_json_1 from "./test-1.json"
import test_json_2 from "./test-2.json"
import test_json_3 from "./test-3.json"
import test_json_4 from "./test-4.json"

import {JsonItemSelector} from "../src/index"

describe("Access Value", () => {
    test("access_value", () => {
        expect(JsonItemSelector['access_value'](["quiz", "sport", "q1"], test_json_1, 0)?.question)
            .toBe('Which one is correct team name in NBA?');
        expect(JsonItemSelector['access_value'](["quiz", "maths", "q2"], test_json_1, 0)?.answer)
            .toBe('4');
        expect(JsonItemSelector['access_value'](["quiz", "sport", "q1", "options"], test_json_1, 0)?.length)
            .toBe(4);
        expect(JsonItemSelector['access_value'](["ADDIS ABABA", "ADDIS KETEMA SUB CITY"], test_json_2, 0)?.length)
            .toBe(14);
        expect(JsonItemSelector['access_value'](["SNNPR", "GEDEO"], test_json_2, 0)?.[0])
            .toBe("BULE");
    })
})

describe ("Reset & Clearing", () => {
    test("clear_last", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(14);
        expect(JIS_2.clear_last(1)).toBe(true);
        expect(JIS_2.list_options().length).toBe(11);
        expect(JIS_2.clear_last(1)).toBe(true);
        expect(JIS_2.list_options().length).toBe(13);
    })
    test("clear_all_selected", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.clear_all_selected()).toBe(true);
        expect(JIS_2.list_options().length).toBe(13);
    })
})

describe("list_options", () => {
    test("list_options length", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_1.list_options().length).toBe(1);
        expect(JIS_2.list_options().length).toBe(13);
    })

    test("list_options content", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_1.list_options()[0]).toBe("quiz");
        expect(JIS_2.list_options()[0]).toBe("ADDIS ABABA");
        expect(JIS_2.list_options()[12]).toBe("TIGRAY");
    })

    test("list_options array cases", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(11);
        expect(JIS_2.list_options()[0]).toBe("ADDIS KETEMA SUB CITY");
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(14);
        expect(JIS_2.list_options()[0]).toBe("WOREDA 1");
        expect(JIS_2.list_options()[13]).toBe("WOREDA 14");
    })

    test("list_options nested", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);

        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options().length).toBe(2);
        expect(JIS_1.list_options()[0]).toBe("sport");
        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options()[0]).toBe("q1");
        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options()[0]).toBe("question");

    })

    test("list_option overflow", () => {
        const JIS_4 = new JsonItemSelector(test_json_4);

        expect(JIS_4.select_option("addis")).toBe(true);
        expect(JIS_4.select_option("addis")).toBe(true);
        expect(JIS_4.get_all_selected()).toEqual(["addis", "addis"]);
        expect(JIS_4.list_options().length).toBe(1);
        expect(JIS_4.select_option("name")).toBe(true);
        expect(JIS_4.get_all_selected()).toEqual(["addis", "addis", "name"]);
        expect(JIS_4.list_options().length).toBe(0);

    })

    test("Alternative JSON", () => {
        const JIS_3 = new JsonItemSelector(test_json_3);
        expect(JIS_3.list_options().length).toBe(1);
        expect(JIS_3.select_option(JIS_3.list_options()[0])).toBe(true);
        expect(JIS_3.list_options().length).toBe(2);
        expect(JIS_3.select_option(JIS_3.list_options()[0])).toBe(true);
        expect(JIS_3.list_options().length).toBe(2);
        expect(JIS_3.select_option(JIS_3.list_options()[0])).toBe(true);
        expect(JIS_3.list_options().length).toBe(2);
        expect(JIS_3.select_option(JIS_3.list_options()[1])).toBe(true);
        expect(JIS_3.list_options().length).toBe(14);
        expect(JIS_3.list_options()[8]).toBe("WOREDA 9");
        expect(JIS_3.select_option(JIS_3.list_options()[8])).toBe(true);
    })
})

describe("select_option", () => {
    test("select_option selects", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options().length).toBe(2);
        expect(JIS_1.list_options()[0]).toBe("sport");
        
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(11);
        expect(JIS_2.list_options()[0]).toBe("ADDIS KETEMA SUB CITY");
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(14);
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.get_all_selected().length).toBe(3);
        expect(JIS_2.get_all_selected()).toEqual(["ADDIS ABABA", "ADDIS KETEMA SUB CITY", "WOREDA 1"]);
    })

    test("select_option Not exisiting cases", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        expect(JIS_1.select_option("Not existing")).toBe(false);
        expect(JIS_1.list_options().length).toBe(1);
        expect(JIS_1.list_options()[0]).toBe("quiz");

    })
    
    test("select_option Repeatetion", () => {
        const JIS_4 = new JsonItemSelector(test_json_4);

        expect(JIS_4.select_option("addis")).toBe(true);
        expect(JIS_4.select_option("addis")).toBe(true);
        expect(JIS_4.get_all_selected()).toEqual(["addis", "addis"]);
        expect(JIS_4.list_options().length).toBe(1);

        expect(JIS_4.clear_all_selected()).toBe(true);
        expect(JIS_4.select_option("addis", true)).toBe(true);
        expect(JIS_4.select_option("addis", true)).toBe(false);
        expect(JIS_4.get_all_selected()).toEqual(["addis"]);
    })
})

describe("Getters", () => {
    test("get_all_selected", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(14);
        expect(JIS_2.get_all_selected().length).toBe(2);
    })
    test("get_last_selected", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);
        
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(14);
        expect(JIS_2.get_last_selected()).toBe("ADDIS KETEMA SUB CITY");
    })
})