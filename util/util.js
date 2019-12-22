var regex = /\((.+?)(;|:)/g
let dnaObj = {};
const DNAKAY = {
    A: "A", AA: "C", CA: "H", GA: "M", UA: "T",
    C: "R", AC: "Q", CC: "I", GC: "F", UC: "W",
    G: "N", AG: "E", CG: "L", GG: "P", UG: "Y",
    U: "D", AU: "G", CU: "K", GU: "S", UU: "V"
}
function matchFn (str) {
    str = str.replace(/(\(|\s|;|:)/g, "").split(")");
    dnaObj[str[0]] = str[1]
}

function changeDNAByKey (dna) {
    dna = dna.split("");
    for (const i in dna) {
        for (const key in dnaObj) {
            let keyArr = key.split(",")
            if (keyArr[0] - 1 == i) {
                dna[keyArr[0] - 1] = DNAKAY[dnaObj[key]];
                dna.splice(keyArr[1] - 1, 1);
                delete dnaObj[key]
                break;
            } else {
                dna[i] = DNAKAY[dna[i]];
                break;
            }
        }
        if (JSON.stringify(dnaObj) == "{}") {
            dna[i] = DNAKAY[dna[i]];
        }
    }

    return dna.join("");
}

function mianFn (data) {
    for (const d of data.content) {
        matchFn(d.match(regex)[0]);
    }
    return changeDNAByKey(data.SEQUENCE_RNA);
}
module.exports.mianFn = mianFn