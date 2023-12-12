import { EntityFragment } from 'src/graphql/_generated/types';

const AiSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 18 18"><path d="M4.45 9.824a.314.314 0 0 1-.29-.193l-.698-1.626a3.247 3.247 0 0 0-1.67-1.7l-1.6-.709a.32.32 0 0 1-.168-.173.327.327 0 0 1 .168-.418l1.6-.71a3.248 3.248 0 0 0 1.67-1.698L4.16.971a.32.32 0 0 1 .171-.17.312.312 0 0 1 .24 0 .32.32 0 0 1 .17.17l.698 1.626c.325.761.923 1.368 1.671 1.699l1.6.709a.32.32 0 0 1 .168.174.327.327 0 0 1 0 .244.32.32 0 0 1-.168.173l-1.6.71a3.247 3.247 0 0 0-1.67 1.699L4.741 9.63a.321.321 0 0 1-.292.193ZM11.07 15.001a.251.251 0 0 1-.234-.155l-.42-.979a1.89 1.89 0 0 0-.972-.988l-.963-.426a.257.257 0 0 1-.134-.14.263.263 0 0 1 0-.195.257.257 0 0 1 .134-.14l.963-.426a1.89 1.89 0 0 0 .972-.989l.42-.978a.257.257 0 0 1 .137-.136.25.25 0 0 1 .192 0c.061.025.11.074.137.136l.42.978c.189.443.537.797.973.99l.962.426a.263.263 0 0 1 .134.335.257.257 0 0 1-.134.139l-.962.427a1.89 1.89 0 0 0-.972.988l-.42.978a.258.258 0 0 1-.234.155ZM13.069 3.926a.21.21 0 0 1-.194-.13l-.29-.677a1.27 1.27 0 0 0-.655-.665l-.666-.295a.218.218 0 0 1 0-.395l.667-.294c.292-.13.526-.366.653-.663l.29-.678A.214.214 0 0 1 13.07 0a.21.21 0 0 1 .194.13l.29.677c.127.297.36.535.654.664l.666.295c.05.023.09.064.111.116.021.052.021.11 0 .163a.214.214 0 0 1-.111.116l-.667.295c-.293.13-.527.367-.654.665l-.29.677a.214.214 0 0 1-.193.128Z"/></svg>';

const defaultWrap = (mark: EntityFragment) =>
  `<mark data-entity-type="${mark.type}"><button ${
    !Boolean(mark.linkedData) ? 'disabled' : ''
  } title="${
    Boolean(mark.linkedData) ? 'Open entity details' : ''
  }" onclick="(function() { const event = new CustomEvent('entityDetails',{ detail:
      { items: '${mark.linkedData.map(
        ld => ld.source + ' ' + ld.link.id + ' ' + ld.link.url
      )}'},
});
  window.dispatchEvent(event);})()"><span class="icon-wrapper">${AiSvg}</span>${
    mark.literal
  }</button></mark>`;

export const enrichMarkupWithEntities = (
  htmlString: string | undefined | null,
  marks: EntityFragment[],
  property: 'description' | 'title' = 'description',
  wrap = defaultWrap
) => {
  if (marks.length === 0 || !htmlString) return htmlString;

  const sortedMarks = marks
    .slice()
    .sort((a, b) => a.startPosition - b.startPosition)
    .filter(mark => mark.property === property);

  const map = sortedMarks.reduce<(string | EntityFragment)[]>(
    (acc, curr, index) => {
      const startPrev = index === 0 ? 0 : sortedMarks[index - 1].endPosition;

      const endPrev = curr.startPosition;

      // Cuts out the text and makes space for entities
      const matchPrev = htmlString.slice(startPrev, endPrev);

      const nextMap = [...acc, matchPrev, curr];

      if (index + 1 === sortedMarks.length) {
        nextMap.push(htmlString.slice(curr.endPosition, htmlString.length));
      }

      return nextMap;
    },
    []
  );

  return map
    .map(entry => {
      if (typeof entry === 'string') return entry;
      return wrap(entry);
    })
    .join('');
};
