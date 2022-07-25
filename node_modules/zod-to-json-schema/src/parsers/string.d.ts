import { ZodStringDef } from "zod";
export declare type JsonSchema7StringType = {
    type: "string";
    minLength?: number;
    maxLength?: number;
    format?: "email" | "uri" | "uuid";
    pattern?: string;
};
export declare function parseStringDef(def: ZodStringDef): JsonSchema7StringType;
