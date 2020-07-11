/**
 * @example
 * import styled from "styled-components";
 * import {bp, atAndBelow} from '../path/to/file';
 *
 * const Text = styled.p`
 *   font-size: 20px;
 *
 *   ${atAndBelow(bp.s, (css) => css`
 *     font-size: 18px;
 *   `)}
 * `
 */

import { css } from "styled-components";

const xs = "450px";
const s = "768px";
const m = "1170px";
const l = "1440px";

export const bp = {
  xs,
  s,
  m,
  l,
};

export function atAndBelow(breakpoint, styles) {
  return css`
    @media screen and (max-width: ${breakpoint}) {
      ${styles(css)}
    }
  `;
}

export function atAndAbove(breakpoint, styles) {
  return css`
    @media screen and (min-width: ${breakpoint}) {
      ${styles(css)}
    }
  `;
}

export function between(min, max, styles, inclusive = true) {
  if (inclusive) {
    return css`
      @media screen and (min-width: ${min}) and (max-width: ${max}) {
        ${styles(css)}
      }
    `;
  }

  return css`
    @media screen and (min-width: calc(${min} - 1px)) and (max-width: calc(${max}) + 1px) {
      ${styles(css)}
    }
  `;
}
