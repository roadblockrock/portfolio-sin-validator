import { SINValidationErrorCode, SINValidationResult, validateSin } from "./sin-validator";

const makeResult = (isValid: boolean, code?: SINValidationErrorCode): SINValidationResult => ({
    valid: isValid,
    errorCode: code
})

test('validates correct SIN', () => {
    expect(validateSin("201543816")).toEqual(makeResult(true));
    expect(validateSin("547305318")).toEqual(makeResult(true));
    expect(validateSin("544861842")).toEqual(makeResult(true));
  });

test("SINs which contain invalid characters are invalid", () => {
    expect(validateSin(undefined as unknown as string)).toEqual(makeResult(false, SINValidationErrorCode.INVALID_CHARACTER));
    expect(validateSin("123abc456")).toEqual(makeResult(false, SINValidationErrorCode.INVALID_CHARACTER));
    expect(validateSin("         ")).toEqual(makeResult(false, SINValidationErrorCode.INVALID_CHARACTER));
});

test("SINs which are the incorrect length are invalid", () => {
    expect(validateSin("")).toEqual(makeResult(false, SINValidationErrorCode.INCORRECT_LENGTH));
    expect(validateSin("12345678")).toEqual(makeResult(false, SINValidationErrorCode.INCORRECT_LENGTH));
    expect(validateSin("12345678910")).toEqual(makeResult(false, SINValidationErrorCode.INCORRECT_LENGTH));
});

test("SINs with incorrect checksums are invalid", () => {
    expect(validateSin("000000001")).toEqual(makeResult(false, SINValidationErrorCode.INVALID_CHECKSUM));
    expect(validateSin("547305328")).toEqual(makeResult(false, SINValidationErrorCode.INVALID_CHECKSUM));
    expect(validateSin("544861832")).toEqual(makeResult(false, SINValidationErrorCode.INVALID_CHECKSUM));
})