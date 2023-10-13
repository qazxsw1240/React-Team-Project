/**
 * @typedef {?string} Reason The reason of error
 * 
 * @typedef {[Reason,boolean]} ErrorHandler
 * 
 * 오류를 좀 더 절차적으로 다룰 수 있게 만든 튜플입니다. 튜플의 각 원소는 
 * 오류 발생 이유와 성공 여부를 나타냅니다. 만약 성공 여부가 false라면 반드시 
 * 오류 발생 이유가 문자열로 제공돼야 합니다. 반대로 성공 여부가 true라면
 * 오류 발생 이유는 null이어야 합니다. 튜플을 직접 생성하기보다 {@link success} 함수와
 * {@link fail} 함수를 활용하는 것이 좋습니다.
 * 
 * @see {success}
 * @see {fail}
 */

/**
 * @type {ErrorHandler}
 */
const _success = [null, true];

/**
 * @returns {ErrorHandler}
 * 
 * @example
 * 
 * const [reason, success] = anErrorhandlerCreate();
 * if (!success) { // 오류 발생
 *   console.log(reason);
 *   return;
 * }
 * // ...
 */
export function success() {
  return _success;
}

/**
 * @param {string} reason 
 * @returns {ErrorHandler}
 * @example
 * 
 * const [reason, success] = anErrorhandlerCreate();
 * if (!success) { // 오류 발생
 *   console.log(reason);
 *   return;
 * }
 * // ...
 */
export function fail(reason) {
  return [reason, false];
}
