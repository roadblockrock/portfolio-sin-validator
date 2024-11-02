const EXPECTED_SIN_LENGTH = 9;

const DIGITS_ONLY_REGEX = /^[0-9]*$/;

export type SINValidationResult = {
  valid: boolean;
  errorCode?: SINValidationErrorCode;
};

export enum SINValidationErrorCode {
  INCORRECT_LENGTH = 'INCORRECT_LENGTH',
  INVALID_CHARACTER = 'INVALID_CHARACTER',
  INVALID_CHECKSUM = 'INVALID_CHECKSUM'
}

export const validateSin = (sin: string): SINValidationResult => {
  const makeResult = (isValid: boolean, code?: SINValidationErrorCode): SINValidationResult => ({
    valid: isValid,
    errorCode: code
  });

  // check that SIN contains only digits
  if (!DIGITS_ONLY_REGEX.test(sin)) {
    return makeResult(false, SINValidationErrorCode.INVALID_CHARACTER);
  }

  // Check that the SIN has exactly 9 digits
  // (this could be done in the Regex step beforehand, but this way we can have a different error)
  if (!sin || sin.length != EXPECTED_SIN_LENGTH) {
    return makeResult(false, SINValidationErrorCode.INCORRECT_LENGTH);
  }

  // iterate through digits of SIN and apply luhn algorithm
  let checksumTotal = 0;
  for (let i = 0; i < sin.length; i++) {
    const thisDigit = parseInt(sin[i]);

    // for every odd-indexed digit, we double it
    if (i % 2 !== 0) {
      // odd-indexed, we double it before adding
      const doubledDigit = thisDigit * 2;
      if (doubledDigit >= 10) {
        // have to add the tens and ones place separately
        // note that doubledDigit cannot be >= 20 as we know it is a single decimal digit
        checksumTotal += 1; // tens place
        checksumTotal += doubledDigit % 10; // ones place
      } else {
        checksumTotal += doubledDigit;
      }
    } else {
      // even-indexed, just add directly to the running total
      checksumTotal += thisDigit;
    }
  }

  // Validate via Luhn algorithm
  if (checksumTotal % 10 != 0) {
    return makeResult(false, SINValidationErrorCode.INVALID_CHECKSUM);
  }

  return makeResult(true);
};
