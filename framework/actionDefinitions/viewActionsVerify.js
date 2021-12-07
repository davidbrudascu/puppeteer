// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Pages
const viewPage = require('~pages/viewPage');
const commonPage = require('~pages/commonPage');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const verifyAttribute = require('~actions/attributesVerify');
const commonVerify = require('~actions/commonVerify');

module.exports = {
  verifyViewInPortal(primaryAttDN) {
    I.waitForVisible(viewPage.label.primaryAttributeField, constants.SHORT_WAIT);
    I.waitForVisible(locate('h5').withText(primaryAttDN).inside(locate('div').withAttr({ id:'listViewContainerId'})), constants.SHORT_WAIT);
    I.see('No data', viewPage.label.noDataLabel);
  },

  verifyEditAttribute(primaryAttr, secondaryAttr){
    I.waitForVisible(locate('div').withText(primaryAttr).inside(locate('td').withAttr({ 'aria-label':'Column '+ primaryAttr})), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(secondaryAttr).inside(locate('td').withAttr({ 'aria-label':'Column '+ secondaryAttr})), constants.SHORT_WAIT);
    I.see('No data', viewPage.label.noDataLabel);
  },

  verifyAndEditAttributeInPortal(){
    I.waitForVisible(locate('input').withAttr({maxlength: '600'}).inside(locate('div').withAttr({ id:'ebsContainerContent_EditDNAndReq'})), constants.SHORT_WAIT);
    I.seeNumberOfElements(commonPage.properties.mandatoryProperties, 1);
    I.waitForVisible(locate('div').withText('EditDNAndReq_Updated'), constants.SHORT_WAIT);
    I.waitForVisible(locate('input').withAttr({'aria-readonly': 'true'}).inside(locate('div').withAttr({ id:'ebsContainerContent_EditReadOnly'})), constants.SHORT_WAIT);
    I.waitForVisible(locate('input').withAttr({type: 'text'}).inside(locate('div').withAttr({ id:'ebsContainerContent_Name'})), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({type: 'text'}).inside(locate('div').withAttr({ id:'ebsContainerContent_Name'})), 'Autotest1');
    I.fillField(locate('input').withAttr({'aria-readonly': 'true'}).inside(locate('div').withAttr({ id:'ebsContainerContent_EditReadOnly'})), 'Test1');
    I.fillField(locate('input').withAttr({maxlength: '600'}).inside(locate('div').withAttr({ id:'ebsContainerContent_EditDNAndReq'})), 'EditDNAndReq');
  },

  verifyCreateDataViewInPortal(newDisplayName, columnName, columnAge,
    recordAuto3, recordAuto4, recordAuto2, recordAuto1) {
    // Check view Display Name "New View DN"
    // Check your columns (Name and Age)
    I.waitForVisible(locate('h5').withText(newDisplayName).inside(locate('div').withAttr({ class: 'ftos-container' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnName).inside(locate('td').withAttr({ 'aria-label': 'Column Name' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnAge).inside(locate('td').withAttr({ 'aria-label': 'Column Age' })), constants.SHORT_WAIT);
    // Check records order: (Auto Test 3, 4, 2, 1)
    I.waitForVisible(locate('td').withText(recordAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(recordAuto4).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(recordAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '3' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(recordAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '4' })), constants.SHORT_WAIT);
  },

  verifyCreateColumnsViewInPortal(columnProductName, columnProductCode, columnProductValue, nameAT_CreateViewColumnList) {
    // 18. Check your columns (Product Name and Product Code) Check if Value column is not displayed
    //    Check if the View Name is "AT_CreateViewColumn's List"
    I.waitForVisible(locate('h5').withText(nameAT_CreateViewColumnList).inside(locate('div').withAttr({ class: 'ftos-container' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnProductName).inside(locate('td').withAttr({ 'aria-label': 'Column Product Name' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnProductCode).inside(locate('td').withAttr({ 'aria-label': 'Column Product Code' })), constants.SHORT_WAIT);
    I.waitForInvisible(locate('div').withText(columnProductValue).inside(locate('td').withAttr({ 'aria-label': 'Column Product Value' })), constants.SHORT_WAIT);
  },

  verifyCreateFetchViewInPortal(nameAT_CreateViewFetchList, columnName, columnValue,
    columnCrncyCode, nameAutoTest1, nameAutoTest2, codeUSD) {
    // 20  Check your columns (Value, Name, Crncy Code )
    // 21	Check the List name (AT_CreateViewFetch's List)
    I.waitForVisible(locate('h5').withText(nameAT_CreateViewFetchList).inside(viewPage.container.defaultContainer), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnValue).inside(viewPage.table.columnValueTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnName).inside(viewPage.table.columnNameTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(columnCrncyCode).inside(viewPage.table.columnCrncyCodeTable), constants.SHORT_WAIT);
    // 22	Check if there are 2 results (Auto Test 1 and Auto Test 2)
    // 23	Both of them has Currency: USD
    I.waitForVisible(locate('td').withText(nameAutoTest1).withAttr({ 'aria-colindex': '3' }).inside(viewPage.table.firstElementRowOfTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameAutoTest2).withAttr({ 'aria-colindex': '3' }).inside(viewPage.table.secondElementRowOfTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(codeUSD).withAttr({ 'aria-colindex': '4' }).inside(viewPage.table.firstElementRowOfTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(codeUSD).withAttr({ 'aria-colindex': '4' }).inside(viewPage.table.secondElementRowOfTable), constants.SHORT_WAIT);
  },

  async verifyCreateDisplayOptionsViewInPortal(nameAT_CreateViewDisplayOptionsList, nameAutoTest1, nameAutoTest2, notEditable, codeAT1, updateCode, checkTitleAutoTest, checkBodyAT, checkButtonATYes, checkButtonATNO) {
    // 15. "Check your view:
    //       Column header is not displayed
    //       Filter row is not displayed
    //       only 5 result are displayed per page"
    I.waitForVisible(locate('h5').withText(nameAT_CreateViewDisplayOptionsList), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameAutoTest1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.field.tableColumnHeader, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.field.filterRowNotVisible, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.firstElementRowOfTable);
    I.seeElement(viewPage.table.fifthElementRowOfTable);
    I.dontSeeElement(viewPage.table.sixthElementRowOfTable);
    I.seeElement(viewPage.table.secondPageTable);
    // 16. Check if 1st Column is not editable
    // 17. Check if 2nd Column is editable
    // 18. Update the Code
    I.click(locate('td').withText(nameAutoTest1));
    I.fillField(locate('td').withText(nameAutoTest1), notEditable);
    I.click(locate('td').withText(codeAT1));
    I.fillField(viewPage.table.thirdColumnFieldTable, updateCode);
    I.click(viewPage.table.fifthElementRowOfTable);
    I.click(viewPage.table.firstViewLinkFromFirstRowTable);
    I.waitForVisible(viewPage.field.waitForNameDivVisible, constants.SHORT_WAIT);
    await verifyAttribute.verifyInputDetailFromAuditPage(viewPage.field.inputNNameViewField, nameAutoTest1);
    await verifyAttribute.verifyInputDetailFromAuditPage(viewPage.field.inputCodeViewField, updateCode);
    commonActions.goBackToPreviousPage();
    // 19. Check 1st record (Auto Test 1) and click on "delete"
    I.waitForVisible(locate('td').withText(nameAutoTest2).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.click(commonPage.buttons.deleteButton);
    // 20. "Check the message:
    //     1. Message title: Auto Test
    //     2. message body: AT Are you sure?
    //     3. Yes button: ""AT Yes""
    //     4. No button: ""AT NO"""
    I.waitForVisible(locate('h3').withText(checkTitleAutoTest), constants.SHORT_WAIT);
    I.waitForVisible(locate('p').withText(checkBodyAT).inside(locate('div').withAttr({ class: 'dx-popup-content' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(checkButtonATYes).inside(locate('div').withAttr({ 'aria-label': 'AT Yes' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('span').withText(checkButtonATNO).inside(locate('div').withAttr({ 'aria-label': 'AT NO' })), constants.SHORT_WAIT);
    // 21. Click on "AT Yes"
    I.click(locate('span').withText(checkButtonATYes).inside(locate('div').withAttr({ 'aria-label': 'AT Yes' })));
    // 22. Check if your record was deleted
    // 23. Check if you have only 5 results per page
    I.waitForInvisible(locate('td').withText(nameAutoTest1), constants.SHORT_WAIT);
    I.dontSeeElement(viewPage.table.secondPageTable);
    I.seeElement(viewPage.table.fifthElementRowOfTable);
    I.dontSeeElement(viewPage.table.sixthElementRowOfTable);
  },

  verifySearchBoolViewInPortal(nameAT, nameAT1, nameAutomation, nameAutomation5Auto, nameAutomation2) {
    // 3 Search by Major: Yes
    I.waitForVisible(viewPage.selector.selectSearchMajor, constants.SHORT_WAIT);
    I.click(viewPage.selector.selectSearchMajor);
    I.waitForVisible(viewPage.field.waitForTrueDivVisible, constants.SHORT_WAIT);
    I.click(viewPage.field.waitForTrueDivVisible);
    // 4 Check if 1st result is AT
    I.waitForVisible(locate('td').withText(nameAT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 5 Check if 8 results are displayed
    I.dontSeeElement(viewPage.table.secondPageTable);
    I.seeElement(viewPage.table.eighthElementRowOfTable);
    I.dontSeeElement(viewPage.table.ninthElementRowOfTable);
    // 6 Search by Major : No
    I.click(viewPage.selector.selectSearchMajor);
    I.waitForVisible(viewPage.field.waitForFalseDivVisible, constants.SHORT_WAIT);
    I.click(viewPage.field.waitForFalseDivVisible);
    I.waitForVisible(locate('td').withText(nameAT1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 7 Check if 9 results are displayed
    I.dontSeeElement(viewPage.table.secondPageTable);
    I.seeElement(viewPage.table.ninthElementRowOfTable);
    I.dontSeeElement(viewPage.table.tenthElementRowOfTable);
    // 8 Search by Name Automation and Major: Yes
    I.click(viewPage.selector.selectSearchMajor);
    I.waitForVisible(viewPage.field.waitForTrueDivVisible, constants.SHORT_WAIT);
    I.click(viewPage.field.waitForTrueDivVisible);
    I.fillField(viewPage.field.inputSearchByName, nameAutomation);
    // 9 Check if 2 results are displayed
    I.waitForVisible(locate('td').withText(nameAutomation5Auto), constants.SHORT_WAIT);
    I.dontSeeElement(viewPage.table.secondPageTable);
    I.seeElement(viewPage.table.secondElementRowOfTable);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 10 Search by Name Automation and Major: Show all
    I.fillField(viewPage.field.inputSearchByName, nameAutomation);
    I.click(viewPage.selector.selectSearchMajor);
    I.waitForVisible(viewPage.field.waitForAllDivVisible, constants.SHORT_WAIT);
    I.click(viewPage.field.waitForAllDivVisible);
    // 11 Click on Major Column
    I.click(viewPage.table.majorColumnHeaderTable);
    // 12 Check if 1st result is Automation 2, Major: null
    I.waitForVisible(locate('td').withText(nameAutomation2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.checkbox.majorColumnNullFirstRowCheckbox, constants.SHORT_WAIT);
    // 13 Click again on Major column
    I.click(viewPage.table.majorColumnHeaderTable);
    // 14 Check if 1st result is Automation 5 Auto, Major: true
    I.waitForVisible(locate('td').withText(nameAutomation5Auto).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.checkbox.majorColumnTrueFirstRowCheckbox, constants.SHORT_WAIT);
  },

  verifySearchTextViewInPortal(nameNon, nameNonAuto, nameAT, nameAuto, nameAT1Auto, nameAuto1, nameNonAuto5, nameSRL) {
    // 3 Search by Name (default): non
    I.waitForVisible(viewPage.field.inputSearchByName, constants.SHORT_WAIT);
    I.fillField(viewPage.field.inputSearchByName, nameNon);
    // 4 Check if 5 results are displayed
    I.waitForVisible(locate('td').withText(nameNonAuto).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.fifthElementRowOfTable);
    I.waitForInvisible(viewPage.table.sixthElementRowOfTable, constants.SHORT_WAIT);
    // 5 Check if 1st result is "NonAuto"
    I.waitForVisible(locate('td').withText(nameNonAuto).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 6 Search by Name (does not contain): auto
    I.waitForVisible(viewPage.selector.selectColumnName, constants.SHORT_WAIT);
    I.moveCursorTo(viewPage.selector.selectColumnName);
    I.click(viewPage.selector.selectDoesNotContainFilter);
    I.fillField(viewPage.field.inputSearchByName, nameAuto);
    // 7 Check if 6 results are displayed
    I.waitForVisible(locate('td').withText(nameAT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.sixthElementRowOfTable);
    I.waitForInvisible(viewPage.table.seventhElementRowOfTable, constants.SHORT_WAIT);
    // 8 Search by Name (starts with) AT
    I.moveCursorTo(viewPage.selector.selectColumnName);
    I.click(viewPage.selector.selectStartsWithFilter);
    I.fillField(viewPage.field.inputSearchByName, nameAT);
    // 9 Check if 7 results are displayed
    I.waitForVisible(locate('td').withText(nameAT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.seventhElementRowOfTable);
    I.waitForInvisible(viewPage.table.eighthElementRowOfTable, constants.SHORT_WAIT);
    // 10 Search by Name (ends with) Auto
    I.moveCursorTo(viewPage.selector.selectColumnName);
    I.click(viewPage.selector.selectEndsWithFilter);
    I.fillField(viewPage.field.inputSearchByName, nameAuto);
    // 11 Check if 5 results are displayed
    I.waitForVisible(locate('td').withText(nameAT1Auto).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.fifthElementRowOfTable);
    I.waitForInvisible(viewPage.table.sixthElementRowOfTable, constants.SHORT_WAIT);
    // 12 Search by Name (equal) Auto 1
    I.moveCursorTo(viewPage.selector.selectColumnName);
    I.click(viewPage.selector.selectEqualsFilter);
    I.fillField(viewPage.field.inputSearchByName, nameAuto1);
    // 13 Check if 3 results are displayed
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.thirdElementRowOfTable);
    I.waitForInvisible(viewPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    // 14 Search by Name (does not equal) Auto 1
    I.moveCursorTo(viewPage.selector.selectColumnName);
    I.click(viewPage.selector.selectDoesNotEqualsFilter);
    I.fillField(viewPage.field.inputSearchByName, nameAuto1);
    // 15 Click on Name column
    I.click(viewPage.table.nameColumnTable);
    // 16 Check if 1st result is AT
    I.waitForVisible(locate('td').withText(nameAT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameSRL).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 17 Click again on Name column
    I.click(viewPage.table.nameColumnTable);
    // 18 Check if 1st result is NonAuto 5
    I.waitForVisible(locate('td').withText(nameNonAuto5).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 19 Click on 3rd page
    I.click(viewPage.table.thirdPageTable);
    // 20 Check if the last result is AT
    I.waitForVisible(locate('td').withText(nameAT).inside(locate('tr').withAttr({ 'aria-rowindex': '26' })), constants.SHORT_WAIT);
    // 21 Check if there are 6 results on page
    I.seeElement(viewPage.table.twentysixthElementRowOfTable);
    I.waitForInvisible(viewPage.table.twentyseventhElementRowOfTable, constants.SHORT_WAIT);
  },

  verifySearchOptionSetViewInPortal(typeSA, nameAuto, nameAutomation5Auto, nameAuto1) {
    // 3 Search by Type: SA
    I.waitForVisible(viewPage.field.inputSearchByColumnType, constants.SHORT_WAIT);
    I.fillField(viewPage.field.inputSearchByColumnType, typeSA);
    // 4 Check if 6 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.sixthElementRowOfTable);
    I.waitForInvisible(viewPage.table.seventhElementRowOfTable, constants.SHORT_WAIT);
    // 5 Search by Name: Auto and Type: SA
    I.fillField(viewPage.field.inputSearchByName, nameAuto);
    I.fillField(viewPage.field.inputSearchByColumnType, typeSA);
    // 6 Check if 5 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.fifthElementRowOfTable);
    I.waitForInvisible(viewPage.table.sixthElementRowOfTable, constants.SHORT_WAIT);
    // 7 Search by Name "Auto" and click on Type column selectTypeOptionSet
    I.click(viewPage.selector.selectTypeOptionSet);
    I.fillField(viewPage.field.inputSearchByName, nameAuto);
    // 8 Check if 1st result is Automation 5 Auto
    I.click(viewPage.field.inputSearchByColumnType);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.waitForVisible(locate('td').withText(nameAutomation5Auto).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 9 Go to last page
    I.click(viewPage.table.thirdPageTable);
    // 10 Check if last result is Auto 1
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '23' })), constants.SHORT_WAIT);
    // 11   Check there are only 3 results on page
    I.seeElement(viewPage.table.twentyfirstElementRowOfTable);
    I.seeElement(viewPage.table.twentysecondElementRowOfTable);
    I.seeElement(viewPage.table.twentythirdElementRowOfTable);
    I.waitForInvisible(viewPage.table.twentyfourthElementRowOfTable, constants.SHORT_WAIT);
  },

  verifySearchLookupViewInPortal(countryCodeITA, nameAuto11, cityMilano, nameAuto4, nameAuto, nameAuto6, cityBrasov, cityRoma) {
    // 3  Search by Country Code: ITA
    I.waitForVisible(viewPage.field.inputSearchByCountryCode, constants.SHORT_WAIT);
    I.fillField(viewPage.field.inputSearchByCountryCode, countryCodeITA);
    // 4  Check if 6 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.sixthElementRowOfTable);
    I.waitForInvisible(viewPage.table.seventhElementRowOfTable, constants.SHORT_WAIT);
    // 5  Check if 1st record is Auto 11
    I.waitForVisible(locate('td').withText(nameAuto11).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 6  Search by Country Code: ITA and City: Milano
    I.fillField(viewPage.field.inputSearchByCity, cityMilano);
    // 7  Check if 4 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.seeElement(viewPage.table.fourthElementRowOfTable);
    I.waitForInvisible(viewPage.table.fifthElementRowOfTable, constants.SHORT_WAIT);
    // 8  Check if 1st record is Auto 4
    I.waitForVisible(locate('td').withText(nameAuto4).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 9  Search by Name: Auto
    I.click(viewPage.field.inputSearchByCountryCode);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.click(viewPage.field.inputSearchByCity);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.inputSearchByName, nameAuto);
    // 10  Click on "City" column
    I.click(viewPage.selector.selectColumnCity);
    // 11  Check if 1st result is Auto 6, Brasov
    I.waitForVisible(locate('td').withText(nameAuto6).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(cityBrasov).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 12  Click again on City column
    I.click(viewPage.selector.selectColumnCity);
    // 13  Check if 1st result is Auto 11, Roma
    I.waitForVisible(locate('td').withText(nameAuto11).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(cityRoma).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 14  Click on 3rd page
    I.click(viewPage.table.thirdPageTable);
    // 15  Check if 3 results are displayed
    I.seeElement(viewPage.table.twentyfirstElementRowOfTable);
    I.seeElement(viewPage.table.twentysecondElementRowOfTable);
    I.seeElement(viewPage.table.twentythirdElementRowOfTable);
    I.waitForInvisible(viewPage.table.twentyfourthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.twentythElementRowOfTable, constants.SHORT_WAIT);
    // 16  Check if the last record is Auto, Brasov
    I.waitForVisible(locate('td').withText(nameAuto).inside(locate('tr').withAttr({ 'aria-rowindex': '23' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(cityBrasov).inside(locate('tr').withAttr({ 'aria-rowindex': '23' })), constants.SHORT_WAIT);
  },

  verifySearchWholeNumberViewInPortal(age25, age32, age44, age50, nameAuto1, nameAuto3, nameAuto6, nameAuto7, nameAuto8) {
    // 3 Search by Age: 25(equal) -> 2 results
    I.waitForVisible(viewPage.selector.selectColumnAge, constants.SHORT_WAIT);
    I.moveCursorTo(viewPage.selector.selectColumnAge);
    I.click(viewPage.selector.selectEqualsFilter);
    I.fillField(viewPage.field.inputSearchByAgeField, age25);
    // 4 Check if 2 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 5 Search by Age: 25 (does not equal) -> 6 results
    I.moveCursorTo(viewPage.selector.selectColumnAge);
    I.click(viewPage.selector.selectDoesNotEqualsFilter);
    // 6 Check if 6 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.sixthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.seventhElementRowOfTable, constants.SHORT_WAIT);
    // 7 Search by Age: 25 (less than)
    I.moveCursorTo(viewPage.selector.selectColumnAge);
    I.click(viewPage.selector.selectLessFilter);
    // 8 Check if 2 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 9 Search by Age: 25 (greater than)
    I.moveCursorTo(viewPage.selector.selectColumnAge);
    I.click(viewPage.selector.selectGreaterFilter);
    // 10 Check if 4results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.fifthElementRowOfTable, constants.SHORT_WAIT);
    // 11 Search by Age: 25 (less than or equal)
    I.moveCursorTo(viewPage.selector.selectColumnAge);
    I.click(viewPage.selector.selectLessThanOrEqual);
    // 12 Check if 4 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.fifthElementRowOfTable, constants.SHORT_WAIT);
    // 13 Search by Age: 25 (greater than or equal)
    I.moveCursorTo(viewPage.selector.selectColumnAge);
    I.click(viewPage.selector.selectGreaterThanOrEqual);
    // 14 Check if 6 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.sixthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.seventhElementRowOfTable, constants.SHORT_WAIT);
    // 15 Search by Age: 25-50 (between)
    I.moveCursorTo(viewPage.selector.selectColumnAge);
    I.click(viewPage.selector.selectBetweenFilter);
    I.fillField(viewPage.field.inputRangeStartFilter, age25);
    I.fillField(viewPage.field.inputRangeEndFilter, age50);
    // 16 Check if 5 results are displayed
    I.waitForInvisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.fifthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.sixthElementRowOfTable, constants.SHORT_WAIT);
    // 17 Click on Age column
    I.click(viewPage.table.ageDateColumnHeaderTable);
    // 18 Check if 1st result is Auto 1 , Age is 25
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(age25).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 19 Check if 2nd result is Auto 6 , Age is 25
    I.waitForVisible(locate('td').withText(nameAuto6).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(age25).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    // 20 Check if 3rd result is Auto 7 , Age is 32
    I.waitForVisible(locate('td').withText(nameAuto7).inside(locate('tr').withAttr({ 'aria-rowindex': '3' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(age32).inside(locate('tr').withAttr({ 'aria-rowindex': '3' })), constants.SHORT_WAIT);
    // 21 Check if 4th result is Auto 3 , Age is 32
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '4' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(age32).inside(locate('tr').withAttr({ 'aria-rowindex': '4' })), constants.SHORT_WAIT);
    // 22 Check if 5th result is Auto 8 , Age is 44
    I.waitForVisible(locate('td').withText(nameAuto8).inside(locate('tr').withAttr({ 'aria-rowindex': '5' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(age44).inside(locate('tr').withAttr({ 'aria-rowindex': '5' })), constants.SHORT_WAIT);
  },

  async verifySearchNumericViewInPortal(value0, nameAuto1, value2200, nameAuto2, value220001, value3000, nameAuto4, value320000) {
    // 3  Search by Value: 0 (equal)
    I.waitForVisible(viewPage.field.inputSearchByValueField, constants.SHORT_WAIT);
    I.fillField(viewPage.field.inputSearchByValueField, value0);
    // 4  Check if 1 result is displayed: Auto 1
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 5  Search by Value: 2200 (equal)
    I.fillField(viewPage.field.inputSearchByValueField, value2200);
    // 6  Check if 1 result is displayed : Auto 2
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 7  Search by Value: 2200 .01(equal)
    I.fillField(viewPage.field.inputSearchByValueField, value220001);
    // 8  Check if 1 result is displayed : Auto 4
    I.waitForVisible(locate('td').withText(nameAuto4).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 9  Search by Value: 2200.01 (less than)
    I.moveCursorTo(viewPage.selector.selectColumnValue);
    I.click(viewPage.selector.selectLessFilter);
    // 10  Check if 3 results are displayed
    I.waitForVisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    // 11  Search by Value: 2200.01 (greater than)
    I.moveCursorTo(viewPage.selector.selectColumnValue);
    I.click(viewPage.selector.selectGreaterFilter);
    // 12  Check if 2 results are displayed
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 13  Search by Value: 2200.01 (less than or equal)
    I.moveCursorTo(viewPage.selector.selectColumnValue);
    I.click(viewPage.selector.selectLessThanOrEqual);
    // 14  Check if 4 results are displayed
    I.waitForVisible(viewPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.fifthElementRowOfTable, constants.SHORT_WAIT);
    // 15  Search by Value: 2200.01 (greater than or equal)
    I.moveCursorTo(viewPage.selector.selectColumnValue);
    I.click(viewPage.selector.selectGreaterThanOrEqual);
    // 16  Check if 3 results are displayed
    I.waitForVisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.fourthElementRowOfTable, constants.SHORT_WAIT);
    // 17  Search by Value: 2200.01-3000 (between)
    I.moveCursorTo(viewPage.selector.selectColumnValue);
    I.click(viewPage.selector.selectBetweenFilter);
    I.fillField(viewPage.field.inputRangeStartFilter, value220001);
    I.fillField(viewPage.field.inputRangeEndFilter, value3000);
    I.click(viewPage.container.defaultContainer);
    // 18  Check if 2 results are displayed
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 19  Reset Search and Click on "Value" column
    I.click(viewPage.table.valueColumnHeaderTable);
    I.moveCursorTo(viewPage.selector.selectColumnValue);
    I.click(viewPage.selector.selectDefaultFilter);
    // 20  Check if 1st result value is empty
    const value = (await I.grabTextFrom(viewPage.table.verify5ColumnFromFirstRowTable)).trim();
    I.assert(value, '');
    I.waitForVisible(viewPage.table.verify5ColumnFromFirstRowTable, constants.SHORT_WAIT);
    // 21  Click again on "Value" column
    I.click(viewPage.table.valueColumnHeaderTable);
    // 22  Check if 1st result value is 3,200.00
    I.waitForVisible(locate('td').withText(value320000).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  verifySearchDateViewInPortal(date01012000, nameAuto1, nameAuto2, nameAuto3, date01022010, date01022020, date31121999, date31122010) {
    // 3 Search by DoB (less than): 01/01/2000
    I.waitForVisible(viewPage.field.inputSearchByDoBField, constants.SHORT_WAIT);
    I.moveCursorTo(viewPage.selector.selectColumnDoB);
    I.click(viewPage.selector.selectLessFilter);
    I.fillField(viewPage.field.inputSearchByDoBField, date01012000);
    I.click(viewPage.field.defaultContainerField);
    // 4 Check if only 1 result is displayed (Auto 3)
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 5 Search by Dob (greater than): 01/01/2000
    I.moveCursorTo(viewPage.selector.selectColumnDoB);
    I.click(viewPage.selector.selectGreaterFilter);
    I.fillField(viewPage.field.inputSearchByDoBField, date01012000);
    I.click(viewPage.field.defaultContainerField);
    // 6 Check if 2 results are displayed Auto 1 and Auto 2
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 7 Search by DoB (between: 01/02/2010 - 01/02/2020)
    I.moveCursorTo(viewPage.selector.selectColumnDoB);
    I.click(viewPage.selector.selectBetweenFilter);
    I.fillField(viewPage.field.inputRangeStartFilter, date01022010);
    I.fillField(viewPage.field.inputRangeEndFilter, date01022020);
    I.click(viewPage.field.defaultContainerField);
    // 8 Check if 1 result is displayed (Auto 2)
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 9 Click on DoB column
    I.click(viewPage.table.doBColumnHeaderTable);
    I.moveCursorTo(viewPage.selector.selectColumnDoB);
    I.click(viewPage.selector.selectDefaultFilter);
    // 10 Check if 1st record is Auto 3, 31/12/1999
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(date31121999).withAttr({ 'aria-colindex': '4' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 11 Click again on DoB
    I.click(viewPage.table.doBColumnHeaderTable);
    // 12 Check if 1st record is Auto 2, 31/12/2010
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(date31122010).withAttr({ 'aria-colindex': '4' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  verifySearchDateTimeViewInPortal(time01_01_2000_00_00, nameAuto1, nameAuto2, nameAuto3, time01_02_2010_00_00, time01_02_2020_00_00, time31_12_1999_12_00, time31_12_2010_12_00) {
    // 3 Search by Time (less than): 01/01/2000 00:00
    I.waitForVisible(viewPage.field.inputSearchByTimeField, constants.SHORT_WAIT);
    I.moveCursorTo(viewPage.selector.selectColumnTime);
    I.click(viewPage.selector.selectLessFilter);
    I.fillField(viewPage.field.inputSearchByTimeField, time01_01_2000_00_00);
    I.click(viewPage.field.defaultContainerField);
    // 4 Check if only 1 result is displayed (Auto 3)
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 5 Search by Time (greater than): 01/01/2000 00:00
    I.moveCursorTo(viewPage.selector.selectColumnTime);
    I.click(viewPage.selector.selectGreaterFilter);
    I.fillField(viewPage.field.inputSearchByTimeField, time01_01_2000_00_00);
    I.click(viewPage.field.defaultContainerField);
    // 6 Check if 2 results are displayed Auto 1 and Auto 2
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 7 Search by Time (between: 01/02/2010 00:00 - 01/02/2020 00:00)
    I.moveCursorTo(viewPage.selector.selectColumnTime);
    I.click(viewPage.selector.selectBetweenFilter);
    I.fillField(viewPage.field.inputRangeStartFilter, time01_02_2010_00_00);
    I.fillField(viewPage.field.inputRangeEndFilter, time01_02_2020_00_00);
    I.click(viewPage.field.defaultContainerField);
    // 8 Check if 1 result is displayed (Auto 2)
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 9 Click on Time column
    I.click(viewPage.table.timeColumnHeaderTable);
    I.moveCursorTo(viewPage.selector.selectColumnTime);
    I.click(viewPage.selector.selectDefaultFilter);
    // 10 Check if 1st record is Auto 3, 31/12/1999 12:00
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(time31_12_1999_12_00).withAttr({ 'aria-colindex': '5' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 11 Click again on Time
    I.click(viewPage.table.timeColumnHeaderTable);
    // 12 Check if 1st record is Auto 2, 31/12/2010 12:00
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(time31_12_2010_12_00).withAttr({ 'aria-colindex': '5' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  verifySearchInvariantDateViewInPortal(nameAuto1, nameAuto2, nameAuto3, date01_01_2000, date01_02_2010, date01_02_2020, date31_12_2000, date31_12_2010, date31_12_1999) {
    // 3  Search by InvariantDate (less than): 01/01/2000
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.selector.selectColumnInvariantDate, constants.SHORT_WAIT);
    I.moveCursorTo(viewPage.selector.selectColumnInvariantDate);
    I.click(viewPage.selector.selectColumnInvariantDate);
    I.click(viewPage.selector.selectLessFilter);
    I.fillField(viewPage.field.inputSearchByInvariantDateField, date01_01_2000);
    I.click(viewPage.field.defaultContainerField);
    // 4  Check if only 1 result is displayed (Auto 3)
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 5  Search by InvariantDate (greater than): 01/01/2000
    I.moveCursorTo(viewPage.selector.selectColumnInvariantDate);
    I.click(viewPage.selector.selectGreaterFilter);
    I.fillField(viewPage.field.inputSearchByInvariantDateField, date01_01_2000);
    I.click(viewPage.field.defaultContainerField);
    // 6  Check if 2 results are displayed Auto 1 and Auto 2
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 7  Search by Invariant Date (between: 01/02/2010 - 01/02/2020)
    I.moveCursorTo(viewPage.selector.selectColumnInvariantDate);
    I.click(viewPage.selector.selectBetweenFilter);
    I.fillField(viewPage.field.inputRangeStartFilter, date01_02_2010);
    I.fillField(viewPage.field.inputRangeEndFilter, date01_02_2020);
    I.click(viewPage.field.defaultContainerField);
    // 8  Check if 1 result is displayed (Auto 2)
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 9  Search by InvariantDate (equal): 31/12/2000
    I.moveCursorTo(viewPage.selector.selectColumnInvariantDate);
    I.click(viewPage.selector.selectEqualsFilter);
    I.fillField(viewPage.field.inputSearchByInvariantDateField, date31_12_2000);
    I.click(viewPage.field.defaultContainerField);
    // 10  Check if only 1 result is displayed (Auto 1)
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.firstElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    // 11  Search by Invariant Date (does not equal: 31/12/2010)
    I.moveCursorTo(viewPage.selector.selectColumnInvariantDate);
    I.click(viewPage.selector.selectDoesNotEqualsFilter);
    I.fillField(viewPage.field.inputSearchByInvariantDateField, date31_12_2010);
    I.click(viewPage.field.defaultContainerField);
    // 12  Check if 2 result are displayed (Auto 1 and Auto 3)
    I.waitForVisible(locate('td').withText(nameAuto1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.secondElementRowOfTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirdElementRowOfTable, constants.SHORT_WAIT);
    // 13  Click on Invariant Date column
    I.click(viewPage.table.invariantDateColumnHeaderTable);
    I.moveCursorTo(viewPage.selector.selectColumnInvariantDate);
    I.click(viewPage.selector.selectDefaultFilter);
    // 14  Check if 1st record is Auto 3, 31/12/1999
    I.waitForVisible(locate('td').withText(nameAuto3).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(date31_12_1999).withAttr({ 'aria-colindex': '5' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 15  Click again on Invariant Date
    I.click(viewPage.table.invariantDateColumnHeaderTable);
    // 16  Check if 1st record is Auto 2, 31/12/2010
    I.waitForVisible(locate('td').withText(nameAuto2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(date31_12_2010).withAttr({ 'aria-colindex': '5' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  },

  verifyInlineEditingCelViewInPortal(nameLaptop2, nameLptUpdate, codeLPT, price2000_27, price0, currencyLeu, currencyEuro) {
    // 3 Check if all columns are displayed (Name, Code, Price, Currency, Bool)
    I.waitForVisible(viewPage.table.nameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.codeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.priceColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.currencyColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.boolColumnTable, constants.SHORT_WAIT);
    // 4 Verify Name: Laptop 2
    I.waitForVisible(locate('td').withText(nameLaptop2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 5 Update Name: Lpt Update -> a success message is displayed
    I.click(locate('td').withText(nameLaptop2).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.firstInputFromRowTable, nameLptUpdate);
    I.click(viewPage.container.defaultEntityContainer);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 6 Verify Code: LPT
    I.waitForVisible(locate('td').withText(codeLPT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 7 Check if Code is not updatable
    I.click(locate('td').withText(codeLPT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    I.waitForInvisible(viewPage.field.firstInputFromRowTable, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(codeLPT).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 8 Verify Price: 2,000.27
    I.waitForVisible(locate('td').withText(price2000_27).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 9 Update Price: leave it empty (0) -> a success message is displayed
    I.click(locate('td').withText(price2000_27).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.firstInputFromRowTable, price0);
    // 10 Verify Bool: yes
    I.waitForVisible(viewPage.checkbox.hostUserColumnRowCheckbox, constants.SHORT_WAIT);
    // 11 Update Bool: no -> a success message is displayed
    I.click(viewPage.checkbox.defaultCheckbox);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 12 Verify Currency: Leu
    I.waitForVisible(locate('td').withText(currencyLeu).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 13 Click on "Currency" field -> a drop-down is opened
    I.click(locate('td').withText(currencyLeu).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    I.click(viewPage.selector.selectDropdownAT_InlineEditingCell);
    // 14 Update Currency: Euro  -> a success message is displayed
    I.click(locate('td').withText(currencyEuro).inside(locate('div').withAttr({ id: 'lookupedit_base_AT_ForInlineEditingCurrencyId_displayname_0_dataGrid' })));
    I.click(viewPage.container.defaultEntityContainer);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async verifyInlineEditingRowViewInPortal(nameLaptop, nameLptUpdate, nameLPT1, currencyLeu, currencyEuro, sizeS, sizeL, price2000_25, price2_55, tva0_19) {
    // 3 Check if all columns are displayed (Name, Code, Currency, Price, Size and TVA)
    I.waitForVisible(viewPage.table.nameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.codeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.currencyColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.priceColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.sizeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.tvaColumnTable, constants.SHORT_WAIT);
    // 4 Click on "Edit" link
    I.waitForVisible(viewPage.link.editTextLinkPos8, constants.SHORT_WAIT);
    I.click(viewPage.link.editTextLinkPos8);
    I.waitForVisible(viewPage.link.cancelTextLink, constants.SHORT_WAIT);
    // 5 Verify Name: Laptop
    await commonVerify.verifyValueExistsInInput(viewPage.field.verifyNameInSecondColumnTable, nameLaptop);
    // 6 Update Name: Lpt Update
    I.click(viewPage.field.verifyNameInSecondColumnTable);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.verifyNameInSecondColumnTable, nameLptUpdate);
    // 7 Verify Code: LPT1
    await commonVerify.verifyValueExistsInInput(viewPage.field.verifyCodeInSecondColumnTable, nameLPT1);
    // 8 Update Code: leave it empty
    I.click(viewPage.field.verifyCodeInSecondColumnTable);
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.verifyCodeInSecondColumnTable, '');
    // 9 Verify Currency: Leu
    await commonVerify.verifyValueExistsInInput(viewPage.field.verifyCurrencyInSecondColumnTable, currencyLeu);
    // 10 Click on "lookup" field -> a new window is opened
    I.click(viewPage.selector.selectFromDropdownIcon);
    I.waitForVisible(viewPage.button.cancelCurrencyPopupTableAT_InlineEditingRowButton, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.removeCurrencyPopupTableAT_InlineEditingRowButton, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.insertCurrencyPopupTableAT_InlineEditingRowButton, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.okPopupInlineEditingButton, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.container.currencyAT_InlineEditingRowContainer, constants.SHORT_WAIT);
    // 10 Update Currency: Euro
    I.waitForVisible(locate('td').withText(currencyEuro).inside(locate('.dx-datagrid-table-fixed')), constants.SHORT_WAIT);
    I.click(locate('td').withText(currencyEuro).inside(locate('.dx-datagrid-table-fixed')));
    I.click(viewPage.button.okPopupInlineEditingButton);
    // 13 Verify Price: 2,000,25
    I.waitForVisible(locate('input').withAttr({ 'aria-valuenow': price2000_25 }), constants.SHORT_WAIT);
    // 14 Update Price: 2.55
    I.click(locate('input').withAttr({ 'aria-valuenow': price2000_25 }));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(locate('input').withAttr({ 'aria-valuenow': price2000_25 }), price2_55);
    // 15 Verify Size: S
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputSizeViewField, sizeS);
    // 16 Update Size: L
    I.click(viewPage.selector.selectDropdownSize);
    I.waitForVisible(locate('p').withText(sizeL).inside('.dx-list-item-content'), constants.SHORT_WAIT);
    I.click(locate('p').withText(sizeL).inside('.dx-list-item-content'));
    // 17 Verify TVA: 0.19
    I.waitForVisible(locate('td').withText(tva0_19), constants.SHORT_WAIT);
    // 18 Check if TVA is not editable
    I.waitForInvisible(locate('td').withText(tva0_19).withAttr({ class: 'dx-editor-cell' }), constants.SHORT_WAIT);
    // 19 Click on Save
    I.click(viewPage.button.saveInlineEditingButton);
    // 20 A success message is displayed
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  verifyInlineEditingBatchViewInPortal(nameProduct1a, nameProduct2a, nameProduct3a, nameProduct1k, nameProduct2k, nameProduct3k, codePRa, codePRk, currencyLeu, currencyEuro, date22_01_2020, date25_01_2020, userHost) {
    // 3 Check if all columns are displayed
    // (Name, Code, Currency, Date and User)
    I.waitForVisible(viewPage.table.nameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.codeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.currencyColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.dateColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.userColumnTable, constants.SHORT_WAIT);
    // 4 Verify Name1: Product1a
    I.waitForVisible(locate('td').withText(nameProduct1a), constants.SHORT_WAIT);
    // 5 Update Name1: Product2a
    I.click(locate('td').withText(nameProduct1a));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.inputUpdateNameField, nameProduct2a);
    // 6 Verify Code1: Pra
    I.waitForVisible(locate('td').withText(codePRa), constants.SHORT_WAIT);
    I.click(locate('td').withText(codePRa));
    // 7 Check if Code1 is not editable
    I.waitForVisible(viewPage.table.checkIfSelectedRowNotEditable, constants.SHORT_WAIT);
    // 8 Verify Currency1: Leu
    I.waitForVisible(locate('td').withText(currencyLeu).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(locate('.dx-select-checkboxes-hidden')), constants.SHORT_WAIT);
    // 9 Update Currency1: Euro
    I.click(locate('td').withText(currencyLeu).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(locate('.dx-select-checkboxes-hidden')));
    I.waitForVisible(viewPage.selector.selectFromDropdownIcon, constants.SHORT_WAIT);
    I.click(viewPage.selector.selectFromDropdownIcon);
    I.waitForVisible(locate('td').withText(currencyEuro).inside(locate('.dx-datagrid-table-fixed')), constants.SHORT_WAIT);
    I.click(locate('td').withText(currencyEuro).inside(locate('.dx-datagrid-table-fixed')));
    I.click(viewPage.button.okPopupInlineEditingButton);
    // 10 Verify Date1: 22/01/2020
    I.waitForClickable(locate('td').withText(date22_01_2020).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(locate('.dx-select-checkboxes-hidden')), constants.SHORT_WAIT);
    // 11 Update Date1: 25/01/2020
    I.click(locate('td').withText(date22_01_2020).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(locate('.dx-select-checkboxes-hidden')));
    I.fillField(viewPage.field.firstInputRowTableNotEditable, date25_01_2020);
    // 12 Verify User1: host
    I.waitForVisible(locate('td').withText(userHost).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(locate('.dx-select-checkboxes-hidden')), constants.SHORT_WAIT);
    // 13 Check if User1 is not updatable
    I.click(locate('td').withText(userHost).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })).inside(locate('.dx-select-checkboxes-hidden')));
    I.waitForVisible(viewPage.checkbox.hostUserColumnRowCheckbox, constants.SHORT_WAIT);
    // 14 Go to 2nd page
    I.waitForVisible(viewPage.table.secondPageTable, constants.SHORT_WAIT);
    I.click(viewPage.table.secondPageTable);
    // 15 Verify Name11 from 2nd page: Product1k
    I.waitForVisible(locate('td').withText(nameProduct1k), constants.SHORT_WAIT);
    // 16 Update Name11: Product2k
    I.click(locate('td').withText(nameProduct1k));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.inputUpdateNameField, nameProduct2k);
    I.pressKey(constants.KEY_ENTER);
    // 17 Verify Code11: PRk
    I.waitForClickable(locate('td').withText(codePRk), constants.SHORT_WAIT);
    // 18 Check if Code11 is not editable
    I.click(locate('td').withText(codePRk));
    I.waitForVisible(viewPage.checkbox.hostUserColumnRowCheckbox, constants.SHORT_WAIT);
    // 19 Click on "Save" icon ->a success message is displayed
    I.waitForVisible(viewPage.button.saveBatchViewButton, constants.SHORT_WAIT);
    I.click(viewPage.button.saveBatchViewButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 20 Check if there are 2 results on 2nd page (Product2a and Product2k)
    I.waitForVisible(locate('td').withText(nameProduct2a).inside(locate('tr').withAttr({ 'aria-rowindex': '11' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameProduct2k).inside(locate('tr').withAttr({ 'aria-rowindex': '12' })), constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.thirteenthElementRowOfTable, constants.SHORT_WAIT);
    // 21 Check the Currency for both of them: Eur and Leu
    I.waitForVisible(locate('td').withText(currencyEuro).inside(locate('tr').withAttr({ 'aria-rowindex': '11' })).inside(locate('.dx-select-checkboxes-hidden')), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(currencyEuro).inside(locate('tr').withAttr({ 'aria-rowindex': '12' })).inside(locate('.dx-select-checkboxes-hidden')), constants.SHORT_WAIT);
    // 22 Check the date for Product2a (25/01/2020)
    I.waitForVisible(locate('td').withText(date25_01_2020).inside(locate('tr').withAttr({ 'aria-rowindex': '11' })).inside(locate('.dx-select-checkboxes-hidden')), constants.SHORT_WAIT);
    // 23 Click on Product2a and update name: Product3a
    I.click(locate('td').withText(nameProduct2a));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.inputUpdateNameField, nameProduct3a);
    // 24 Click on Product2k and update name: Product3k
    I.click(locate('td').withText(nameProduct2k));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.inputUpdateNameField, nameProduct3k);
    // 25 Click on "Discard changes" icon
    I.click(viewPage.button.discardButton);
    // 26 Verify again Name11: Product 2a
    // 27 Verify again Name12: Product 2k
    I.waitForVisible(locate('td').withText(nameProduct2a).inside(locate('tr').withAttr({ 'aria-rowindex': '11' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameProduct2k).inside(locate('tr').withAttr({ 'aria-rowindex': '12' })), constants.SHORT_WAIT);
  },

  async verifyInlineEditingFormViewInPortal(nameProduct1a, nameProduct2a, nameProduct3z, descriptionShort, currencyLeu, currencyEuro, userHost, codePRa, price2000_25, price0_50, sizeS) {
    // 3 Check if all columns are displayed
    // (Name, Code, Description, Price, Currency, Size and User)
    I.waitForVisible(viewPage.table.nameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.codeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.descriptionColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.priceColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.currencyColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.sizeColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.userColumnTable, constants.SHORT_WAIT);
    // 4 Click on "Edit" link -> a form is displayed
    I.click(viewPage.link.editTextLinkPos10);
    // 5 Verify Name: Product1a
    const locatorName = viewPage.field.locatorNameField;
    const idName = await I.grabAttributeFrom(locatorName, 'for');
    I.waitForVisible(locate('input').withAttr({ id: idName }), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ id: idName }), nameProduct1a);
    // 6 Update name: Product2a
    I.click(locate('input').withAttr({ id: idName }));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(locate('input').withAttr({ id: idName }), nameProduct2a);
    // 7 Verify Description: short
    const locatorDescription = viewPage.field.locatorDescriptionField;
    const idDescription = await I.grabAttributeFrom(locatorDescription, 'for');
    I.waitForVisible(locate('input').withAttr({ id: idDescription }), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ id: idDescription }), descriptionShort);
    // 8 Verify Currency: Leu
    I.waitForVisible(viewPage.field.inputCurrencyViewField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputCurrencyViewField, currencyLeu);
    // 9 Update Currency: Euro
    I.waitForVisible(viewPage.selector.selectFromDropdownIcon, constants.SHORT_WAIT);
    I.click(viewPage.selector.selectFromDropdownIcon);
    I.waitForVisible(locate('td').withText(currencyEuro).inside(locate('.dx-datagrid-table-fixed')), constants.SHORT_WAIT);
    I.click(locate('td').withText(currencyEuro).inside(locate('.dx-datagrid-table-fixed')));
    I.click(viewPage.button.okPopupInlineEditingButton);
    // 10 Verify User: host
    const locatorUser = viewPage.field.locatorUserField;
    const idUser = await I.grabAttributeFrom(locatorUser, 'for');
    I.waitForVisible(locate('input').withAttr({ id: idUser }), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ id: idUser }), userHost);
    // 11 Check if User is not editable
    I.click(locate('input').withAttr({ id: idUser }));
    I.waitForInvisible(locate('div').withAttr({ class: '.dx-state-focused' }).after(locate('input').withAttr({ id: idUser })), constants.SHORT_WAIT);
    // 12 Verify Code: PRa
    const locatorCode = viewPage.field.locatorCodeField;
    const idCode = await I.grabAttributeFrom(locatorCode, 'for');
    I.waitForVisible(locate('input').withAttr({ id: idCode }), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ id: idCode }), codePRa);
    // 13 Check if Code is not editable
    I.click(locate('input').withAttr({ id: idCode }));
    I.waitForInvisible(locate('div').withAttr({ class: '.dx-state-focused' }).after(locate('input').withAttr({ id: idCode })), constants.SHORT_WAIT);
    // 14 Verify Price: 2000.25
    const locatorPrice = viewPage.field.locatorPriceField;
    const idPrice = await I.grabAttributeFrom(locatorPrice, 'for');
    I.waitForVisible(locate('input').withAttr({ id: idPrice }), constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ id: idPrice }), price2000_25);
    // 15 Update Price: 0.50
    I.click(locate('input').withAttr({ id: idPrice }));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(locate('input').withAttr({ id: idPrice }), price0_50);
    // 16 Verify Size: S
    I.waitForVisible(viewPage.field.inputSizeDisplayName, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputSizeDisplayName, sizeS);
    // 17 Click on Save
    I.click(viewPage.button.saveSpanButton);
    // 18 A success message is displayed
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 19 Verify Name: Product2a
    I.waitForVisible(locate('td').withText(nameProduct2a).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 20 Verify Code: PRa
    I.waitForVisible(locate('td').withText(codePRa).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 21 Verify Description: short
    I.waitForVisible(locate('td').withText(descriptionShort).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 22 Verify Price: 0.50
    I.waitForVisible(locate('td').withText(price0_50).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 23 Verify Size: S
    I.waitForVisible(locate('td').withText(sizeS).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 24 Verify User: host
    I.waitForVisible(locate('td').withText(userHost).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 25 Click again on "edit'
    I.click(viewPage.link.editTextLinkPos10);
    // 26 Update Name: Product3z
    const locatorName3z = viewPage.field.locatorNameField;
    const idName3z = await I.grabAttributeFrom(locatorName3z, 'for');
    I.waitForVisible(locate('input').withAttr({ id: idName3z }), constants.SHORT_WAIT);
    I.click(locate('input').withAttr({ id: idName3z }));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(locate('input').withAttr({ id: idName3z }), nameProduct3z);
    // 27 Click on "Cancel" button - form is closed
    I.click(viewPage.button.cancelButton);
    // 28 Check again Name: Product2a
    I.waitForVisible(locate('td').withText(nameProduct2a).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    // 29 Click again on "edit"
    I.click(viewPage.link.editTextLinkPos10);
    // 30 Update Name: Product3z
    const locatorName3zb = viewPage.field.locatorNameField;
    const idName3zb = await I.grabAttributeFrom(locatorName3zb, 'for');
    I.waitForVisible(locate('input').withAttr({ id: idName3zb }), constants.SHORT_WAIT);
    I.click(locate('input').withAttr({ id: idName3zb }));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(locate('input').withAttr({ id: idName3zb }), nameProduct3z);
    // 31 Click on "View full item" -> form is displayed
    I.click(viewPage.link.fullItemDetailsLink);
    I.waitForVisible(viewPage.field.waitForFormAT_InlineEditingField, constants.SHORT_WAIT);
    // 32 Check Name: Product2a
    I.waitForVisible(viewPage.field.inputNNameViewField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(viewPage.field.inputNNameViewField, nameProduct2a);
  },

  async verifyInlineEditing1toNViewInPortal(nameChild1, codeCH1, nameChild1Updated, formEditAT_InlineRelChild, formAT_InlineRelChild) {
    // 4	Check  the relationship table (Name and Code column; Value is not displayed)
    I.waitForVisible(viewPage.table.nameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.codeColumnTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.valueColumnTable, constants.SHORT_WAIT);
    // 5	Check if "Child1" is editable
    // 6	Check if "CH1" is not editable
    I.waitForVisible(viewPage.table.notSelectedRowTable, constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(codeCH1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameChild1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.click(locate('td').withText(codeCH1));
    I.waitForVisible(viewPage.table.selectedRowTable, constants.SHORT_WAIT);
    I.click(locate('td').withText(nameChild1).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
    I.pressKey(constants.KEY_SELECT_ALL);
    I.pressKey(constants.KEY_DELETE);
    I.fillField(viewPage.field.inputUpdateNameField, nameChild1Updated);
    I.waitForVisible(viewPage.field.inputNNameViewField, constants.SHORT_WAIT);
    I.click(viewPage.field.inputNNameViewField);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 7	Update "Child1" to "Child 1 Updated"
    // 8	Click on "View" link
    I.waitForVisible(viewPage.link.viewTextLink, constants.SHORT_WAIT);
    I.click(viewPage.link.viewTextLink);
    // 9	Form is displayed
    I.waitForVisible(locate('span').withText(formEditAT_InlineRelChild), constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(formAT_InlineRelChild), constants.SHORT_WAIT);
    // 10	Check if Name is "Child 1 Updated"
    const value = await I.grabValueFrom(viewPage.field.inputNNameViewField);
    I.assert(value, nameChild1Updated);
  },

  async verifyInlineEditingRowNtoNViewInPortal(codeREC1, nameRecord1Updated, price200_00, nameRecord2, nameRecord2Updated) {
    // 4	Check  the relationship table (Name and Code column; Value is not displayed)
    I.waitForVisible(viewPage.table.nameColumnTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.codeColumnTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.valueColumnTable, constants.SHORT_WAIT);
    // 5	Click on "Edit" link
    I.click(viewPage.link.editTextLinkPos4);
    // 6	Check if only Code is not editable
    I.waitForInvisible(locate('td').withText(codeREC1).withAttr({ class: 'dx-editor-cell' }), constants.SHORT_WAIT);
    // 7	Update Name from "Record1" to "Record 1 Updated"
    I.click(viewPage.field.inputSecondColumnField);
    I.fillField(viewPage.field.inputSecondColumnField.last(), nameRecord1Updated);
    I.waitForVisible(viewPage.field.inputNNameViewField, constants.SHORT_WAIT);
    I.click(viewPage.field.inputNNameViewField);
    // 8	Click Save link
    I.click(viewPage.button.saveButton);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 9	Click on "Insert" button
    I.click(viewPage.button.insertNewAT_InlineEditRel1Button);
    // 10	Check the view (Name and Value are displayed; Code is not displayed)
    I.waitForVisible(viewPage.table.columnNameNtoNTable, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.table.columnValueNtoNTable, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.table.columnCodeNtoNTable, constants.SHORT_WAIT);
    // 11	Check if Name is editable
    // 12	Check if Code is not editable
    I.waitForVisible(viewPage.table.notSelectedRowTable.withAttr({ 'aria-rowindex': '2' }), constants.SHORT_WAIT);
    I.click(locate('td').withText(price200_00));
    I.waitForVisible(viewPage.table.selectedRowTable.withAttr({ 'aria-rowindex': '2' }), constants.SHORT_WAIT);
    // 13	Update "Record 2" to "Record 2 Updated"
    I.click(locate('td').withText(nameRecord2));
    I.fillField(viewPage.field.inputFromSecondRowTable, nameRecord2Updated);
    I.pressKey(constants.KEY_ENTER);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    // 14	Select "Record 2 Updated"
    // 15	Click "Ok"
    I.waitForClickable(viewPage.button.okPopupNtoNButton, constants.SHORT_WAIT);
    I.click(viewPage.button.okPopupNtoNButton);
    I.waitForInvisible(viewPage.button.okPopupNtoNButton, constants.SHORT_WAIT);
    // 16	Check if Record1 Updated and Record2 Updated are displayed in your relationship table
    I.waitForVisible(locate('td').withText(nameRecord1Updated).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText(nameRecord2Updated).inside(locate('tr').withAttr({ 'aria-rowindex': '2' })), constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async verifyPageSizes(number) {
    // Verify Element is visible
    I.waitForVisible(locate('div').withAttr({ 'aria-label': `Display ${number} items on page` }), constants.SHORT_WAIT);
    I.moveCursorTo(locate('div').withAttr({ 'aria-label': `Display ${number} items on page` }));
    // Verify Text
    const pageSizeText = await I.grabTextFrom(locate('div').withAttr({ 'aria-label': `Display ${number} items on page` }).inside(locate('div').withAttr({ class: 'dx-page-sizes' })));
    I.assert(pageSizeText, number);
  },

  verifyFirst5PageSizesAndSeparatorAreDisplayedPagination() {
    within(locate('div').withAttr({ class: 'dx-pages' }), () => {
      I.waitForVisible(viewPage.button.page1Button, constants.SHORT_WAIT);
      I.waitForVisible(viewPage.button.page2Button, constants.SHORT_WAIT);
      I.waitForVisible(viewPage.button.page3Button, constants.SHORT_WAIT);
      I.waitForVisible(viewPage.button.page4Button, constants.SHORT_WAIT);
      I.waitForVisible(viewPage.button.page5Button, constants.SHORT_WAIT);
      I.waitForVisible(viewPage.button.pageNumberSeparatorButton, constants.SHORT_WAIT);
    });
  },

  verifySelectedPage(number) {
    I.waitForVisible(locate('div').withAttr({ class: 'dx-page dx-selection' }).withAttr({ 'aria-label': `Page ${number}` }));
  },

  verifyPagesAndSeparatorAreDisplayedPagination() {
    I.waitForVisible(viewPage.button.page1Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.pageNumberSeparatorButton.first(), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page3Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page4Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page5Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page6Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.pageNumberSeparatorButton.last(), constants.SHORT_WAIT);
  },

  verifyFirst7PageNumbersAreDisplayed() {
    I.waitForVisible(viewPage.button.page1Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page2Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page2Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page3Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page4Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page5Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page6Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page7Button, constants.SHORT_WAIT);
    I.waitForInvisible(viewPage.button.pageNumberSeparatorButton, constants.SHORT_WAIT);
  },

  verifyCertainPagesAndSeparatorAreDisplayedPagination() {
    I.waitForVisible(viewPage.button.page1Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.pageNumberSeparatorButton.first(), constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page6Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page7Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page8Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.page9Button, constants.SHORT_WAIT);
    I.waitForVisible(viewPage.button.pageNumberSeparatorButton.last(), constants.SHORT_WAIT);
  },

  verify2ValuesDoesntExistInTableDltRecords(record1, record2) {
    commonVerify.verifyValueDontExistsInTable(commonPage.container.containerContent, record1);
    commonVerify.verifyValueDontExistsInTable(commonPage.container.containerContent, record2);
  },

  verify2ValuesDoesExistInTableDltRecords(record1, record2) {
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, record1);
    commonVerify.verifyValueExistsInTable(commonPage.container.containerContent, record2);
  },

  verifyIf2CheckboxesAreSelected(row1, row2) {
    commonVerify.verifyIfCheckboxRowIsSelected(row1);
    commonVerify.verifyIfCheckboxRowIsSelected(row2);
  },

  // Verify if page size options and page buttons are displayed
  async verifyPageSizesAndSelectedPageSize(firstPageSize, secondPageSize, thirdPageSize) {
    // 3	Verify if "5", "10" and "20" options are displayed
    await this.verifyPageSizes(firstPageSize);
    await this.verifyPageSizes(secondPageSize);
    await this.verifyPageSizes(thirdPageSize);
    // 4	Verify if "10" is selected
    I.waitForVisible(locate('div').withAttr({ 'aria-label': `Display ${secondPageSize} items on page` }).withAttr({ class: 'dx-page-size dx-selection' }), constants.SHORT_WAIT);
    // 5	Verify if 5 pages are available and "..." sign is displayed
    this.verifyFirst5PageSizesAndSeparatorAreDisplayedPagination();
  },

  verifyFetchViewPortal(firstRecordFetchView, secondRecordFetchView, currencyEUR){
    I.waitForVisible(locate('td').withText( firstRecordFetchView).inside(viewPage.table.firstElementRowOfTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText( currencyEUR).inside(viewPage.table.firstElementRowOfTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText( secondRecordFetchView).inside(viewPage.table.secondElementRowOfTable), constants.SHORT_WAIT);
    I.waitForVisible(locate('td').withText( currencyEUR).inside(viewPage.table.secondElementRowOfTable), constants.SHORT_WAIT);
  },
};
