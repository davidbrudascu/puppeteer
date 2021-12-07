const excelJs = require('exceljs');
const fs = require('fs');
const path = require('path');
// Actions
const commonActions = require('~actions/commonActions');
// Constants
const constants = require('~config/constants');
// Pages
const dataImExPage = require('~pages/dataImportExportPage');

const I = actor();

module.exports = {

  verifyDataImportLogs(nrOfTotalEntries, array) {
    // Wait for table
    I.waitForVisible(dataImExPage.selector.dataImExDataImportLogsTable);
    // Total number of expected data logs
    I.seeNumberOfElements(locate('tr').withAttr({ role: 'row' }).inside(dataImExPage.selector.dataImExDataImportLogsTable).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })), nrOfTotalEntries);
    // Text for each data log
    array.forEach((element) => {
      I.seeElement(locate('td').withAttr({ role: 'gridcell' }).withText(element).inside(locate('div').withAttr({ class: 'dx-datagrid-content' })));
    });
  },

  async verifyValuesInTableFromExcelFile(anchor, excelFilePath) {
    // Array with columns
    const mappedColumns = await this.extractAndMapColumnsFromExcelFile(excelFilePath);
    // Current active column
    let currentColumn;
    // Current column's number
    let currentColumnNumber;

    I.waitForVisible(anchor, constants.SHORT_WAIT);
    I.waitForClickable(anchor, constants.SHORT_WAIT);
    // Begin verification
    // Since columns in the actual table are not in order, we find the column number
    // for the header, grab it, and use it to expect the rest of the data on the same column

    // For each column
    for (let i = 0; i < mappedColumns.length; i += 1) {
      currentColumn = mappedColumns[i];
      I.say(`Table column name: ${JSON.parse(currentColumn[1])}`);
      // I see and grab the column number from the actual table
      // FIXME withText collision can hit multiple values, ex. Date, InvariantDate, so we do first();
      const currentHeader = locate('td').withAttr({ role: 'columnheader' })
        .withChild(locate('div').withText(JSON.parse(currentColumn[1])))
        .inside(anchor)
        .first();
      I.waitForVisible(currentHeader, constants.SHORT_WAIT);
      I.seeElement(currentHeader);
      // eslint-disable-next-line no-await-in-loop
      currentColumnNumber = await I.grabAttributeFrom(currentHeader, 'aria-colindex');

      // And for each data row of the active column
      for (let y = 2; y < currentColumn.length; y += 1) {
        I.say(`Table column position ${currentColumnNumber}, row ${y - 1} - ${JSON.parse(currentColumn[y])}`);
        // I see the value on the exact row number and I determine its selector based on type
        // y-1 because we substract the previous header
        let nr = 0;
        switch (typeof (JSON.parse(currentColumn[y]))) {
          // Boolean
          // true, false
          case 'boolean':
            I.seeElement(locate('td').withAttr({ 'aria-colindex': currentColumnNumber })
              .withChild(locate('div').withAttr({ role: 'checkbox' }).withAttr({ 'aria-checked': `${JSON.parse(currentColumn[y])}` }))
              .inside(locate('tr').withAttr({ 'aria-rowindex': `${y - 1}` }))
              .inside(anchor));
            break;
          // Number
          // 5,000, 5,000.1234, 0.0000 => 5000, 5000.1234, 0
          case 'number':
            // eslint-disable-next-line no-await-in-loop
            nr = await I.grabTextFrom(locate('td').withAttr({ 'aria-colindex': currentColumnNumber })
              .inside(locate('tr').withAttr({ 'aria-rowindex': `${y - 1}` }))
              .inside(anchor));
            // We format the number because on the page we extract with locale, we compare without
            I.assert(JSON.parse(currentColumn[y]), this.parseNumber(nr));
            break;
          // String
          case 'string':
            // TODO Maybe add date exception and handling ( Ex, timezone format)
            I.seeElement(locate('td').withAttr({ 'aria-colindex': currentColumnNumber })
              .withText(JSON.parse(currentColumn[y]))
              .inside(locate('tr').withAttr({ 'aria-rowindex': `${y - 1}` }))
              .inside(anchor));
            break;
          default:
            I.say(`Cannot parse value of type ${typeof (JSON.parse(currentColumn[y]))} : ${JSON.parse(currentColumn[y])}`);
        }
      }
    }
    // End verification
  },

  // Extracts columns from an excel file and maps them to an array of key:[rows]
  async extractAndMapColumnsFromExcelFile(excelFilePath) {
    // Begin extraction of XLSX

    // Store columns used to test values later
    let processedColumn = [];
    const totalColumns = [];
    // Load excel file in memory
    const buffer = fs.readFileSync(excelFilePath);
    // Create a workbook to work with
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.load(buffer)
      .then(() => {
        // For each worksheet
        workbook.eachSheet((worksheet) => {
          // For each of the columns
          for (let i = 1; i <= worksheet.actualColumnCount.toString(); i += 1) {
            const currentColumn = worksheet.getColumn(i);
            // Iterate through all cells
            // eslint-disable-next-line no-loop-func
            currentColumn.eachCell((cell, rowNumber) => {
              // And if cell value is not empty (null)
              if (cell.value != null) {
                // Map our column
                processedColumn[rowNumber] = JSON.stringify(cell.value);
              }
            });
            // Add our column to the total
            totalColumns.push(processedColumn);
            // Reset our mapped column
            processedColumn = [];
          }
          I.say(`Extracted from: ${path.basename(excelFilePath)} the following:\n${Object.entries(totalColumns)}`);
        });
      });
    // End extraction of XLSX
    return totalColumns;
  },

  // Strip all non numeric characters
  // https://stackoverflow.com/questions/11665884/how-can-i-parse-a-string-with-a-comma-thousand-separator-to-a-number
  parseNumber(string) {
    let strg = string || '';
    let decimal = '.';
    strg = strg.replace(/[^0-9$.,]/g, '');
    if (strg.indexOf(',') > strg.indexOf('.')) decimal = ',';
    if ((strg.match(new RegExp(`\\${decimal}`, 'g')) || []).length > 1) decimal = '';
    if (decimal !== '' && (strg.length - strg.indexOf(decimal) - 1 === 3) && strg.indexOf(`0${decimal}`) !== 0) decimal = '';
    strg = strg.replace(new RegExp(`[^0-9$${decimal}]`, 'g'), '');
    strg = strg.replace(',', '.');
    return parseFloat(strg);
  },

  verifyEmptyDataTable() {
    commonActions.waitForLoadersToFinish();
    const selector = locate('span').withText('No data').inside(locate('div').withAttr({ 'aria-rowcount': '0' }));
    I.waitForElement(selector, constants.SHORT_WAIT);
  },

};
