const Nightmare = require('nightmare');
const cheerio = require('cheerio');

// true will make it slow but will show scraping
const nightmare = Nightmare({ show: false });

card_name = "Tarmogoyf";

const base_url = 'https://shop.tcgplayer.com';
const find_url = '/magic/product/show?ProductName=';
const find_url_end = '&IsProductNameExact=true&viewAllVersions=true';


const sets = [ { set_name: 'Modern Masters 2015 (Magic)',
set_href: '/magic/modern-masters-2015',
full_href:
 '/magic/modern-masters-2015/tarmogoyf?xid=i3710e2e5d73d45838fdbcdfba89caea4' },
{ set_name: 'Ultimate Masters (Magic)',
set_href: '/magic/ultimate-masters',
full_href:
 '/magic/ultimate-masters/tarmogoyf?xid=i3710e2e5d73d45838fdbcdfba89caea4' },
{ set_name: 'Modern Masters 2017 (Magic)',
set_href: '/magic/modern-masters-2017',
full_href:
 '/magic/modern-masters-2017/tarmogoyf?xid=i3710e2e5d73d45838fdbcdfba89caea4' },
{ set_name: 'Modern Masters (Magic)',
set_href: '/magic/modern-masters',
full_href:
 '/magic/modern-masters/tarmogoyf?xid=i3710e2e5d73d45838fdbcdfba89caea4' },
{ set_name: 'Future Sight (Magic)',
set_href: '/magic/future-sight',
full_href:
 '/magic/future-sight/tarmogoyf?xid=i3710e2e5d73d45838fdbcdfba89caea4' },
{ set_name: 'Ultimate Masters: Box Toppers (Magic)',
set_href: '/magic/ultimate-masters-box-toppers',
full_href:
 '/magic/ultimate-masters-box-toppers/tarmogoyf?xid=i3710e2e5d73d45838fdbcdfba89caea4' } ]


const fullq = 'https://shop.tcgplayer.com/magic/modern-masters-2015/tarmogoyf';
console.log(fullq);
nightmare
    .goto(base_url + sets[0]['full_href'])
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then( response => {
        console.log(getPriceData(response, sets[0]['set_name']));
    }).catch( err => {
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

 let getPriceData = (html, set_name) => {
    data = [];
    const $ = cheerio.load(html);
    $('section.product-listings div.product-listing').each( (row, raw_element) => {
      data.push({
          set : set_name,
          seller : $(raw_element).find('div.product-listing__seller div a.seller__name').text(),
          condition : $(raw_element).find('div a.condition').text(),
          price : $(raw_element).find('div.product-listing__pricing span.product-listing__price').text(),
          shipping : $(raw_element).find('div.product-listing__pricing span.product-listing__shipping').text().trim(),
      })
    });
    return data;
  }

let iterAndPrint = (sd) => {
    accumulate_prices = [];
    for (var i in sd)
    {
        console.log(base_url + sd[i]['full_href']);
        nightmare2
            .goto(base_url + sd[i]['full_href'])
            .wait('body')
            .evaluate(() => document.querySelector('body').innerHTML)
            .end()
            .then( response => {
                console.log('works tho');
                accumulate_prices.concat(getPriceData(response, sd[i]['set_name']));
                console.log(getPriceData(response, sd[i]['set_name']));
            }).catch( err => {
                console.log(err);
            });
    }
}