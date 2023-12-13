import test_json_1 from "./test-1.json"
import test_json_2 from "./test-2.json"
import {JsonItemSelector} from "../src/index"

describe("Access Value", () => {
    test("Value", () => {
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

describe("list_options", () => {
    const JIS_1 = new JsonItemSelector(test_json_1);
    const JIS_2 = new JsonItemSelector(test_json_2);
    
    test("list_options length", () => {
        expect(JIS_1.list_options().length).toBe(1);
        expect(JIS_2.list_options().length).toBe(13);
    })

    test("list_options content", () => {
        expect(JIS_1.list_options()[0]).toBe("quiz");
        expect(JIS_2.list_options()[0]).toBe("ADDIS ABABA");
        expect(JIS_2.list_options()[12]).toBe("TIGRAY");
    })

    test("list_options array cases", () => {
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(11);
        expect(JIS_2.list_options()[0]).toBe("ADDIS KETEMA SUB CITY");
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(14);
        expect(JIS_2.list_options()[0]).toBe("WOREDA 1");
        expect(JIS_2.list_options()[13]).toBe("WOREDA 14");
    })

    test("list_options nested", () => {
        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options().length).toBe(2);
        expect(JIS_1.list_options()[0]).toBe("sport");
        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options()[0]).toBe("q1");
        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options()[0]).toBe("question");

    })
})

describe("select_option", () => {
    const JIS_1 = new JsonItemSelector(test_json_1);
    const JIS_2 = new JsonItemSelector(test_json_2);

    test("select_option selects", () => {
        expect(JIS_1.select_option(JIS_1.list_options()[0])).toBe(true);
        expect(JIS_1.list_options().length).toBe(2);
        expect(JIS_1.list_options()[0]).toBe("sport");
        
        expect(JIS_2.select_option(JIS_2.list_options()[0])).toBe(true);
        expect(JIS_2.list_options().length).toBe(11);
        expect(JIS_2.list_options()[0]).toBe("ADDIS KETEMA SUB CITY");
    })
})