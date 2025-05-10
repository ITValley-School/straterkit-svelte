function isAllWhitespaces(nod) {
  // Use ECMA-262 Edition 3 String and RegExp features
  return !/[^\t\n\r ]/.test(nod.textContent);
}
function isIgnorable(nod) {
  return (
    nod.nodeType == 8 || // A comment node
    (nod.nodeType == 3 && isAllWhitespaces(nod))
  ); // a text node, all ws
}
export function nodeBefore(sib) {
  while ((sib = sib.previousSibling)) {
    if (!isIgnorable(sib)) return sib;
  }
  return null;
}
