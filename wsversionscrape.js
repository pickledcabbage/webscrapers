const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: true });

const url = 'https://shop.tcgplayer.com/magic/product/show?ProductName=';
const urlend = '&IsProductNameExact=true&viewAllVersions=true';

const searchterm = encodeURIComponent('Wooded Foothills');

nightmare
    .goto(url + searchterm + urlend)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then( response => {
        console.log(getData(response));
    }).catch( err => {
        console.log(err);
    });

let getData = html => {
    data = [];
    const $ = cheerio.load(html);
    $('section.products.products--list div.product__card').each((row, raw_element) => {
        data.push({
            set_name : $(raw_element).find('div.product__summary a.product__group').text().trim(),
            set_href : $(raw_element).find('div.product__summary a.product__group').attr('href'),
            full_href : $(raw_element).find('div.product__summary a.product__name').attr('href'),
        });
    });
    return data;
}