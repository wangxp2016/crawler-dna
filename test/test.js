let data = [
    'Interior loop (  1, 70) CG; (  2, 69) AU:  -210',
    'Interior loop (  2, 69) AU; (  3, 68) AU:   -90',
    'Interior loop (  3, 68) AU; (  4, 67) GU:   -60',
    'Interior loop (  4, 67) GU; (  5, 66) AU:  -130',
    'Interior loop (  5, 66) AU; (  6, 65) CG:  -220',
    'Interior loop (  6, 65) CG; (  7, 64) AU:  -210',
    'Interior loop (  7, 64) AU; ( 10, 63) UA:   380',
    'Interior loop ( 10, 63) UA; ( 11, 62) CG:  -240',
    'Interior loop ( 11, 62) CG; ( 12, 61) UG:  -210',
    'Interior loop ( 12, 61) UG; ( 13, 60) UA:   -60',
    'Interior loop ( 13, 60) UA; ( 14, 53) UG:   540',
    'Interior loop ( 14, 53) UG; ( 15, 52) AU:  -100',
    'Interior loop ( 15, 52) AU; ( 16, 51) UG:  -140',
    'Interior loop ( 16, 51) UG; ( 17, 50) AU:  -100',
    'Interior loop ( 17, 50) AU; ( 18, 49) GC:  -210',
    'Interior loop ( 18, 49) GC; ( 20, 48) AU:   140',
    'Interior loop ( 20, 48) AU; ( 21, 47) AU:   -90',
    'Interior loop ( 21, 47) AU; ( 22, 46) AU:   -90',
    'Interior loop ( 22, 46) AU; ( 23, 45) GU:   -60',
    'Interior loop ( 23, 45) GU; ( 27, 41) AU:   220',
    'Interior loop ( 27, 41) AU; ( 28, 40) UA:  -110',
    'Interior loop ( 28, 40) UA; ( 29, 39) CG:  -240',
    'Interior loop ( 29, 39) CG; ( 30, 38) AU:  -210',
    'Hairpin  loop ( 30, 38) AU              :   570']
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
for (const d of data) {
    matchFn(d.match(regex)[0]);
}
const dna = "CAAGACAAAUCUUUAUAGUAAAGUAUAUCAUUUACACUGAUUUUUUUUCUGUGCAAUUCAGGAUGUUUUGA".split("");

//LGGSGLGAA  TLYTYGYGF DGGG SDADGTLGUUUACACUUUCAAUUCA
//LGGSGLGAATLYTYGYGFDGGGSDADGTLNDDDARARDDDRAADDRA
//LGGSGLGAATLYTYGYGFDGGGSDADGTLNDDDARARDDDRAADDRA
//LGGSGLGAATLYTYGYGFDGGGSDADGTLNDDDARARDDDRAADDRA
let index = 0;
function changeDNAByKey () {
    for (const i in dna) {
        console.log(i)
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

    console.log(dna.join(""));
}
changeDNAByKey();
// console.log(dnaObj);