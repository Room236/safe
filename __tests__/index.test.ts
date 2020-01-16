import {safe} from "../src";

const obj = {
    "badFunction": () => {
        throw new Error("you should not have called this function, it is very very bad >:(");
    },
    "foo": "bar",
    "obj": {
        "explicitlyUndefined": undefined,
        "thisIsNull": null
    }
};

it("returns the original value when defined", () => {
    expect(safe(() => obj.foo)).toBe(obj.foo);
});

it("returns null when null", () => {
    expect(safe(() => obj.obj.thisIsNull)).toBeNull();
});

it("returns undefined when explicitly undefined", () => {
    expect(safe(() => obj.obj.explicitlyUndefined)).toBeUndefined();
});

it("returns undefined when implicitly undefined", () => {
    expect(safe(() => (obj as any).obj.implicitlyUndefined)).toBeUndefined();
});

it("returns a default value when undefined", () => {
    expect(safe(() => (obj as any).obj.implicitlyUndefined, "hello")).toBe("hello");
});

it("throws an exception when a function throws an exception", () => {
    expect(() => safe(() => obj.badFunction())).toThrowError();
});
