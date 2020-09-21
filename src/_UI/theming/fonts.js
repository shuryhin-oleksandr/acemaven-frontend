const helveticaNeu = (
  fontSize = 30,
  lineHeight = 30,
  letterSpacing = 0,
  fontWeight = 400
) => `
    font-family: Helvetica Neue;
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

const helvetica = (
    fontSize = 30, lineHeight = 30, letterSpacing = 0, fontWeight = 400,
) => `
    font-family: HelveticaNeu;
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
    letter-spacing: ${letterSpacing}px;
  `;


export default {
  archivoBlack,
  asap,
  raleway,
  helvetica
};
