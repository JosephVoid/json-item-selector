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

        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(14);
        expect(JIS_2.clear_last(1)).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(11);
        expect(JIS_2.clear_last(1)).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(13);
    })
    test("clear_all_selected", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.clear_all_selected()).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(13);
    })
})

describe("list_no_depth", () => {
    test("list_no_depth length", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_1.list_no_depth().length).toBe(1);
        expect(JIS_2.list_no_depth().length).toBe(13);
    })

    test("list_no_depth content", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_1.list_no_depth()[0]).toBe("quiz");
        expect(JIS_2.list_no_depth()[0]).toBe("ADDIS ABABA");
        expect(JIS_2.list_no_depth()[12]).toBe("TIGRAY");
    })

    test("list_no_depth array cases", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(11);
        expect(JIS_2.list_no_depth()[0]).toBe("ADDIS KETEMA SUB CITY");
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(14);
        expect(JIS_2.list_no_depth()[0]).toBe("WOREDA 1");
        expect(JIS_2.list_no_depth()[13]).toBe("WOREDA 14");
    })

    test("list_no_depth nested", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);

        expect(JIS_1.select_no_depth(JIS_1.list_no_depth()[0])).toBe(true);
        expect(JIS_1.list_no_depth().length).toBe(2);
        expect(JIS_1.list_no_depth()[0]).toBe("sport");
        expect(JIS_1.select_no_depth(JIS_1.list_no_depth()[0])).toBe(true);
        expect(JIS_1.list_no_depth()[0]).toBe("q1");
        expect(JIS_1.select_no_depth(JIS_1.list_no_depth()[0])).toBe(true);
        expect(JIS_1.list_no_depth()[0]).toBe("question");

    })

    test("list_option overflow", () => {
        const JIS_4 = new JsonItemSelector(test_json_4);

        expect(JIS_4.select_no_depth("addis")).toBe(true);
        expect(JIS_4.select_no_depth("addis")).toBe(true);
        expect(JIS_4.get_all_selected()).toEqual(["addis", "addis"]);
        expect(JIS_4.list_no_depth().length).toBe(1);
        expect(JIS_4.select_no_depth("name")).toBe(true);
        expect(JIS_4.get_all_selected()).toEqual(["addis", "addis", "name"]);
        expect(JIS_4.list_no_depth().length).toBe(0);

    })

    test("Alternative JSON", () => {
        const JIS_3 = new JsonItemSelector(test_json_3);
        expect(JIS_3.list_no_depth().length).toBe(1);
        expect(JIS_3.select_no_depth(JIS_3.list_no_depth()[0])).toBe(true);
        expect(JIS_3.list_no_depth().length).toBe(2);
        expect(JIS_3.select_no_depth(JIS_3.list_no_depth()[0])).toBe(true);
        expect(JIS_3.list_no_depth().length).toBe(2);
        expect(JIS_3.select_no_depth(JIS_3.list_no_depth()[0])).toBe(true);
        expect(JIS_3.list_no_depth().length).toBe(2);
        expect(JIS_3.select_no_depth(JIS_3.list_no_depth()[1])).toBe(true);
        expect(JIS_3.list_no_depth().length).toBe(14);
        expect(JIS_3.list_no_depth()[8]).toBe("WOREDA 9");
        expect(JIS_3.select_no_depth(JIS_3.list_no_depth()[8])).toBe(true);
    })
})

describe("select_no_depth", () => {
    test("select_no_depth selects", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_1.select_no_depth(JIS_1.list_no_depth()[0])).toBe(true);
        expect(JIS_1.list_no_depth().length).toBe(2);
        expect(JIS_1.list_no_depth()[0]).toBe("sport");
        
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(11);
        expect(JIS_2.list_no_depth()[0]).toBe("ADDIS KETEMA SUB CITY");
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(14);
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.get_all_selected().length).toBe(3);
        expect(JIS_2.get_all_selected()).toEqual(["ADDIS ABABA", "ADDIS KETEMA SUB CITY", "WOREDA 1"]);
    })

    test("select_no_depth Not exisiting cases", () => {
        const JIS_1 = new JsonItemSelector(test_json_1);
        expect(JIS_1.select_no_depth("Not existing")).toBe(false);
        expect(JIS_1.list_no_depth().length).toBe(1);
        expect(JIS_1.list_no_depth()[0]).toBe("quiz");

    })
    
    test("select_no_depth Repeatetion", () => {
        const JIS_4 = new JsonItemSelector(test_json_4);

        expect(JIS_4.select_no_depth("addis")).toBe(true);
        expect(JIS_4.select_no_depth("addis")).toBe(true);
        expect(JIS_4.get_all_selected()).toEqual(["addis", "addis"]);
        expect(JIS_4.list_no_depth().length).toBe(1);

        expect(JIS_4.clear_all_selected()).toBe(true);
        expect(JIS_4.select_no_depth("addis", true)).toBe(true);
        expect(JIS_4.select_no_depth("addis", true)).toBe(false);
        expect(JIS_4.get_all_selected()).toEqual(["addis"]);
    })
})

describe("Getters", () => {
    test("get_all_selected", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);

        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(14);
        expect(JIS_2.get_all_selected().length).toBe(2);
    })
    test("get_last_selected", () => {
        const JIS_2 = new JsonItemSelector(test_json_2);
        
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.select_no_depth(JIS_2.list_no_depth()[0])).toBe(true);
        expect(JIS_2.list_no_depth().length).toBe(14);
        expect(JIS_2.get_last_selected()).toBe("ADDIS KETEMA SUB CITY");
    })
})

describe("Depth based", () => {
    test("list & select", () => {
        const JIS_3 = new JsonItemSelector(test_json_3);
        expect(JIS_3.list(0).length).toBe(1);
        expect(JIS_3.list(0)[0]).toBe("Africa");
        expect(JIS_3.select("Africa", 0)).toBe(true);
        // Depth: 1
        expect(JIS_3.list(1)[0]).toBe("Ethiopia");
        expect(JIS_3.select("Ethiopia", 1)).toBe(true);
        // Depth: 2
        expect(JIS_3.list(2)[0]).toBe("Addis Ababa");
        expect(JIS_3.select("Addis Ababa", 2)).toBe(true);
        // Depth: 3
        expect(JIS_3.list(3)[0]).toBe("Bole");
        expect(JIS_3.select("Bole", 3)).toBe(true);
        expect(JIS_3.get_all_selected()).toEqual(["Africa", "Ethiopia", "Addis Ababa", "Bole"]);
        // Change value at depth: 1
        expect(JIS_3.select("Ghana", 1)).toBe(true);
        expect(JIS_3.get_all_selected()).toEqual(["Africa", "Ghana"]);
        // New path at Depth: 2
        expect(JIS_3.list(2)[0]).toBe("Accra");
        expect(JIS_3.select("Accra", 2)).toBe(true);
        // New path at Depth: 3
        expect(JIS_3.list(3)[0]).toBe("Partey");
        expect(JIS_3.select("Partey", 3)).toBe(true);
        // New path at Depth: 4
        expect(JIS_3.list(4)[0]).toBe("PARTY 1");
        expect(JIS_3.select("PARTY 1", 4)).toBe(true);
        expect(JIS_3.get_all_selected()).toEqual(["Africa", "Ghana", "Accra", "Partey", "PARTY 1"]);
        // Change value again at depth: 2
        expect(JIS_3.select("BAMAKO", 2)).toBe(true);
        expect(JIS_3.get_all_selected()).toEqual(["Africa", "Ghana", "BAMAKO"]);
    });
    test("edge cases", () => {
        const JIS_3 = new JsonItemSelector(test_json_3);
        expect(JIS_3.list(-1).length).toBe(0);
        expect(JIS_3.list(10).length).toBe(0);
        expect(JIS_3.select("Africa", -1)).toBe(false);
        expect(JIS_3.select("Africa", 10)).toBe(false);
        expect(JIS_3.select("Not exists", 0)).toBe(false);
        expect(JIS_3.list(0)).toEqual(["Africa"]);
        expect(JIS_3.select("Africa", 0)).toBe(true);
    })
})