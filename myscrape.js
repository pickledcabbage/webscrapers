const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: false })
const url = 'https://shop.tcgplayer.com/magic/future-sight/tarmogoyf';

nightmare
    .goto(url)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        console.log(getData(response));
      }).catch(err => {
        console.log(err);
      });


let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $('section.product-listings div.product-listing').each( (row, raw_element) => {
    data.push({
        seller : $(raw_element).find('div.product-listing__seller div a.seller__name').text(),
        condition : $(raw_element).find('div a.condition').text(),
        price : $(raw_element).find('div.product-listing__pricing span.product-listing__price').text(),
        shipping : $(raw_element).find('div.product-listing__pricing span.product-listing__shipping').text().trim(),
    })
  });
  return data;
}