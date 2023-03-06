const replacer = (input) => input
  .replaceAll('&quot;', '"')
  .replaceAll('&#039;', '\'', 'é')
  .replaceAll(' &eacute;', 'é')
  .replaceAll('&ntilde;', 'ñ')
  .replaceAll('&rsquo;', '’')
  .replaceAll('&lsquo;', '‘')
  .replaceAll('&rdquo;', '”')
  .replaceAll('&ldquo;', '“')
  .replaceAll('&amp;', '&');

// const x = 'What was Dorothy&#039;s surname in &#039;The Wizard Of Oz&#039;?';
// const xx = 'China (People&#039;s Republic of)';

// console.log(replacer(xx));
export default replacer;
