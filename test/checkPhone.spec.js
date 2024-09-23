import CheckPhone from "../src/lib/checkPhone"

describe("testPhoneNumber",()=>{
    test("test1",()=>{
        expect(CheckPhone("0900000000")).toBe(true)
    })
    test("test2",()=>{
        expect(CheckPhone("1234567890")).toBe(false)
    })
    test("test3",()=>{
        expect(CheckPhone("091234567")).toBe(false)
    })
    test("test4",()=>{
        expect(CheckPhone("0955733abc")).toBe(false)
    })
    test("test5",()=>{
        expect(CheckPhone("0977888999")).toBe(true)
    })
})