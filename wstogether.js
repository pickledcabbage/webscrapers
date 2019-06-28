const Nightmare = require('nightmare');
const cheerio = require('cheerio');

// true will make it slow but will show scraping
const nightmare = Nightmare({ show: true });

card_name = "Tarmogoyf";

const base_url = 'https://shop.tcgplayer.com'
const find_url = '/magic/product/show?ProductName=';
const find_url_end = '&IsProductNameExact=true&viewAllVersions=true';
card_name = encodeURIComponent(card_name);

setData = [];

// first stage for scrape
nightmare
    .goto(base_url + find_url + card_name + find_url_end)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then( response => {
        
        setData = getSetData(response);
        iterAndPrint(setData);
    }).catch( err => {
        console.log(err);
    });



let getSetData = html => {
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