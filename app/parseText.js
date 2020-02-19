module.exports = class ParseText{
    constructor(){}
    row_exceptions = (row_text, words) => {
        let w = words.filter(m=>row_text.indexOf(m) > -1);
        return w.length === 0 ? -1 : 1;
    }

    tableizeString = (data, colHeadLabels) => {
        let rows = data.split("\r\n");
        let final = [];
        rows.forEach(row => {
            if(row.indexOf('[sudo] password for') < 0 && this.row_exceptions(row, colHeadLabels) < 0){
                let cols = row.split(' ');
                final.push(row);
            }
        });
        return final;
    }
}