const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const { mianFn } = require("./util/util")
const url = 'http://rna.tbi.univie.ac.at//cgi-bin/RNAWebSuite/RNAeval.cgi'
const data = require('./data/dna.json')


function load (url, data) {
    var postData = {
        PAGE: "2",
        SEQUENCE: data.SEQUENCE,
        STRUCTURE: data.STRUCTURE,
        dangling: "d2",
        param: "rna2004",
        Temp: "37",
        proceed: ""
    }
    return new Promise((resolve, reject) => {
        let opts = {
            url,
            method: "POST",
            formData: postData
        }
        request(opts, (error, response, body) => {
            console.log(`数据${data.DNANAME}抓取成功`);
            if (error) {
                //return console.log(error);
                reject(error);
            }
            resolve(body)
        })
    })
}

//load(url);
function load$ (html) {
    return cheerio.load(html, { decodeEntities: false })
}

async function main () {
    const promiseAll = []
    data.forEach((item, idx) => {
        promiseAll.push(new Promise(async (resolve, reject) => {
            load(url, item).then(html => {
                const $ = load$(html);
                const finalData = item;
                const content = $("#contentmain div textarea").val();
                const SEQUENCE_RNA = $("#SEQUENCE").val();
                let contentArr = content.split("\n");
                finalData["content"] = contentArr.slice(1, contentArr.length - 3);
                finalData["SEQUENCE_RNA"] = SEQUENCE_RNA;
                resolve(finalData)
            }).catch(err => {
                reject(err)
            })
        }))
    })

    Promise.all(promiseAll).then(pages => {
        pages.forEach(page => {
            console.log(`数据${page.DNANAME}转换成功`);
            page["result"] = mianFn(page);
            delete page["content"];
        })
        fs.writeFile('./result/dna_result.json', JSON.stringify(pages), () => {
            console.log("数据保存成功");
            process.exit(0)
        })
    }).catch(err => {
        console.error(err)
        process.exit(1)
    })
}

main().catch(err => {
    console.error(err)
    console.log(`下载错误`)
})
