const archivoBlack = (
  fontSize = 30, lineHeight = 30, letterSpacing = 0, fontWeight = 400,
) => `
    font-family: ArchivoBlack;
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
    letter-spacing: ${letterSpacing}px;
  `;

const asap = (
  fontSize = 30, lineHeight = 30, letterSpacing = 0, fontWeight = 400,
) => `
    font-family: Asap;
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
    letter-spacing: ${letterSpacing}px;
  `;

const raleway = (
  fontSize = 30, lineHeight = 30, letterSpacing = 0, fontWeight = 400,
) => `
    font-family: Raleway;
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
    letter-spacing: ${letterSpacing}px;
  `;


export default {
  archivoBlack,
  asap,
  raleway
};
