// eslint-disable-next-line spaced-comment
/// <reference path="../../config/steps.d.ts" />

const I = actor();
// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/userJourney/userJourneyData');
const createHeaderData = require('~data/userJourney/userJourneyCreateHeader');
const editHeaderData = require('~data/userJourney/userJourneyEditHeader');
const headerAttrData = require('~data/userJourney/userJourneyHeaderAttrType');
const lookupAttrData = require('~data/userJourney/userJourneyHeaderLookup');

// Pages
const ujPage = require('~pages/userJourneyPage');
const menuPage = require('~pages/menuItemPage');
// Verify
const commonVerify = require('~actions/commonVerify');

module.exports = {
  portalUjVerifyEntity() {
    // Verify if the default view "Name" is displayed
    const selector = locate('div').withText(data.ujDefaultTableViewColumn1).inside(locate('td').withAttr({ 'aria-colindex': '2' }));
    I.waitForElement(selector, constants.SHORT_WAIT);
    I.seeElement(selector);
    // Verify if one record "Auto Test" is displayed
    I.seeElement(locate('td').withText(data.ujDefaultTableViewItem).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })));
  },

  portalUjVerifyNewValue() {
    // Verify if default form "Name" is displayed
    const selector = locate('div').withText(data.ujDefaultTableViewColumn1).inside(locate('div').withAttr({ class: 'row' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
  },

  portalUjVerifyNewSavedValueLink() {
    // Verify if result page is displayed
    const selector = locate('div').withText(data.ujDefaultTableViewColumn1).inside(locate('td').withAttr({ 'aria-colindex': '2' }));
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.seeElement(selector);
    // Verify if your record "AT Custom UJ Link Test" was added in list
    I.seeElement(locate('td').withText(data.ujEntityLinkName).inside(locate('tr').withAttr({ role: 'row' })));
  },

  async compareCustomUjHtmlText() {
    I.waitForElement(`${ujPage.selector.ujMenuItemsTable} h2`, constants.SHORT_WAIT);
    commonVerify.compareTwoHtmlStringsIfSame(
      await I.grabHTMLFrom(ujPage.selector.ujMenuItemsTable), data.ujCustomHtmlSample,
    );
  },

  scrollToBottomAndVerifyNewHeader() {
    I.waitForElement(locate('button').withText(createHeaderData.ujButtonNext), constants.SHORT_WAIT);
    // Scroll to bottom
    I.scrollTo(locate('button').withText(createHeaderData.ujButtonNext));
    // Check if header is still displayed
    I.seeElement(ujPage.selector.ujHeaderEmpty);
  },

  verifyNewHeaderStep2() {
    I.waitForVisible(locate('button').withText(createHeaderData.ujButtonFinish), constants.SHORT_WAIT);
    // "Check the Header info
    // Codul AT: empty
    // Numele AT: Auto Test 1"
    I.dontSeeElement(ujPage.selector.ujHeaderRowCode);
    I.dontSeeElement(ujPage.selector.ujHeaderRowCodeVal);
    I.seeElement(ujPage.selector.ujHeaderRowName);
    I.seeElement(ujPage.selector.ujHeaderRowNameVal);
  },

  verifyNewHeaderStep3() {
    I.waitForVisible(locate('button').withText(createHeaderData.ujButtonFinish), constants.SHORT_WAIT);
    // "Check the Header info:
    I.refreshPage();
    // Codul AT: AT1
    // Numele AT: Auto Test 1"
    I.waitForVisible(ujPage.selector.ujHeaderRowCode, constants.SHORT_WAIT);
    I.waitForVisible(ujPage.selector.ujHeaderRowCodeVal, constants.SHORT_WAIT);
    I.waitForVisible(ujPage.selector.ujHeaderRowName, constants.SHORT_WAIT);
    I.waitForVisible(ujPage.selector.ujHeaderRowNameVal, constants.SHORT_WAIT);
  },

  async verifyEditedHeaders() {
    I.waitForVisible(ujPage.selector.ujEditedHeader1, constants.SHORT_WAIT);
    // 20. Check Headers order
    // 21. Check Header names
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader1),
      editHeaderData.ujEditHeaderVerify1);
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader2),
      editHeaderData.ujEditHeaderVerify2);
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader3),
      editHeaderData.ujEditHeaderVerify3);
    // 22. Scroll down -> check if headers are not visible
    I.dontSeeElement(ujPage.selector.ujHeaderEmpty);
    I.scrollTo(ujPage.selector.ujEditedHeaderPageBottom);
    I.seeElement(ujPage.selector.ujHeaderEmpty);
  },

  async verifyHeaderAttrType() {
    I.waitForVisible(ujPage.selector.ujEditedHeader1, constants.SHORT_WAIT);
    // 10. "Check the Header info:
    // Date: your added time
    // Size: your selected value
    // Value: 10000.25"
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader1),
      headerAttrData.ujHeaderAttrVerify1);
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader2),
      headerAttrData.ujHeaderAttrVerify2);
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader3),
      headerAttrData.ujHeaderAttrVerify3);
  },

  async verifyLookupHeader() {
    I.waitForVisible(ujPage.selector.ujEditedHeader1, constants.SHORT_WAIT);
    // 6. Check header info (your selected value from lookup is added as header)
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader1),
      lookupAttrData.ujHeaderLookup1);
  },

  async verifyNewLookupHeader() {
    I.waitForVisible(ujPage.selector.ujEditedHeader1, constants.SHORT_WAIT);
    // 6. Check header info (your selected value from lookup is added as header)
    commonVerify.compareTwoHtmlStringsIfSame(await I.grabHTMLFrom(ujPage.selector.ujEditedHeader1),
      lookupAttrData.ujHeaderLookup2);
  },

  createUserJourneyVerifyFields(addAT_CreateWizMode, verifyAttributeCodeName, verifyAttributeDoBName, verifyStep1Name, verifyStep2Name,
  firstCodeStep1AttributeValue, secondDobStep1AttributeValue, verifyAttributeNameName, verifyAttributeValueName, firstNameStep2AttributeValue, secondValueStep2AttributeValue){
    I.waitForVisible(locate('h5').withText(addAT_CreateWizMode), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(verifyAttributeCodeName), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(verifyAttributeDoBName), constants.SHORT_WAIT);
    I.waitForVisible(locate('h5').withText(verifyStep1Name), constants.SHORT_WAIT);
    I.waitForVisible(locate('h5').withText(verifyStep2Name), constants.SHORT_WAIT);
    I.fillField(ujPage.fields.firstAttributeCodeField, firstCodeStep1AttributeValue);
    I.fillField(ujPage.fields.secondAttributeDateDobField, secondDobStep1AttributeValue);
    I.click(locate('h5').withText(verifyStep2Name));
    I.waitForVisible(locate('div').withText(verifyAttributeNameName), constants.SHORT_WAIT);
    I.waitForVisible(locate('div').withText(verifyAttributeValueName), constants.SHORT_WAIT);
    I.fillField(ujPage.fields.firstAttributeNameField, firstNameStep2AttributeValue);
    I.fillField(ujPage.fields.secondAttributeValueField, secondValueStep2AttributeValue);
  },

  wizardModeUserJourneyVerifyFields() {
    // 10 Click on "Insert" icon
    commonActions.clickSidebarButton('Insert');
    // 11 Check if Form title is displayed
    I.waitForVisible(ujPage.fields.nameInputUserJourneyField2, constants.SHORT_WAIT);
    within(ujPage.container.containerEwContent, () => {
      I.see('ADD AT_WIZMODE');
    });
    // I.seeInField(ujPage.fields.userJourneyFormNameField,"ADD AT_WIZMODE")
    // 12 Fill in all fields
    I.fillField(ujPage.fields.nameInputUserJourneyField2, 'Wizz Mode Test');
    // 13 Click on "Next" -> you are redirect to 2nd section
    I.waitForVisible(locate('button').withText('Next').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.click(locate('button').withText('Next').inside(locate('div').withAttr({ id: 'ebsContainerContent' })));
    // 14 Fill in all fields
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), constants.SHORT_WAIT);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), '1,234,442');
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })), 'Code Test');
    // 15   Verify if Previous and Next Buttons are displayed
    I.waitForVisible(locate('button').withText('Next').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.waitForVisible(locate('button').withText('Previous').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    // 16 Click on "Next" -> you are redirect to 3rd section
    I.click(locate('button').withText('Next').inside(locate('div').withAttr({ id: 'ebsContainerContent' })));
    // 17 Fill in all fields
    I.fillField(locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_DoB' })), '11/02/2020');
    // 18   Click Previous
    I.waitForVisible(locate('button').withText('Previous').inside(locate('div').withAttr({ id: 'ebsContainerContent' })), constants.SHORT_WAIT);
    I.click(locate('button').withText('Previous').inside(locate('div').withAttr({ id: 'ebsContainerContent' })));
    // 19   Click on Yes button
    I.waitForVisible(locate('span').withText('Yes').inside(locate('.dx-popup-content')), constants.SHORT_WAIT);
    I.click(locate('span').withText('Yes').inside(locate('.dx-popup-content')));
    // 20   Verify if all fields are saved from previous page
    I.seeInField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), '1,234,442');
    I.seeInField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })), 'Code Test');
    // 21   Click on "Next" -> you are redirect to 3rd section
    I.click(locate('button').withText('Next').inside(locate('div').withAttr({ id: 'ebsContainerContent' })));
    // 22   Verify if all fields are saved from 3rd section
    I.seeInField(locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_DoB' })), '11/02/2020');
    // 23 Click "Finish"
    I.click(locate('button').withText('Finish').inside(locate('div').withAttr({ id: 'ebsContainerContent' })));
    // 24 Click "Go back"
    commonActions.goBackToPreviousPage();
    // 25 Check if your records was added
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText('Wizz Mode Test')), constants.SHORT_WAIT);
    I.seeElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText('Wizz Mode Test')));
  },

  wizardOptionsUserJourneyVerifyFields(nameTest, codeTest, valueTest, doBDateValue) {
    // 11 Click on "Insert" icon
    commonActions.clickSidebarButton('Insert');
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })), constants.SHORT_WAIT);
    // 12 Check if Form title is not displayed
    // within(ujPage.container.containerEwContent, () => {
    //        I.dontSee("ADD AT_UJUPDATESTEPS")
    // })
    // 13 Check the button name/color
    // 14 Check if Form title is not displayed
    // 15 Fill in all fields
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })), nameTest);
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })), codeTest);
    // 16 Click on "Go fw" -> you are redirect to 2nd section
    I.click(locate('button').withText('Go fw').withAttr({ class: 'btn-next btn btn-fill btn-blue' }));
    // 17 Check button name/color
    I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), constants.SHORT_WAIT);
    I.seeElement(locate('button').withText('Go back').withAttr({ class: 'btn-prev btn btn-fill btn-pink' }));
    I.seeElement(locate('button').withText('Go fw').withAttr({ class: 'btn-next btn btn-fill btn-blue' }));
    // 18 Fill in all fields
    I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), valueTest);
    // 19 Click on "Go fw" -> you are redirect to 3rd section
    I.click(locate('button').withText('Go fw').withAttr({ class: 'btn-next btn btn-fill btn-blue' }));
    // 20   Check button name/color
    I.waitForVisible(locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_DoB' })), constants.SHORT_WAIT);
    I.seeElement(locate('button').withText('Go back').withAttr({ class: 'btn-prev btn btn-fill btn-pink' }));
    I.seeElement(locate('button').withText('End').withAttr({ class: 'btn-next btn btn-fill btn-green' }));
    // 21 Fill in all fields
    I.fillField(locate('input').withAttr({ role: 'combobox' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_DoB' })), doBDateValue);
    // 22 Click "End"
    I.click(locate('button').withText('End').withAttr({ class: 'btn-next btn btn-fill btn-green' }));
    // 23 Click "Go back"
    I.click(locate('button').withText('Go back').withAttr({ class: 'btn-prev btn btn-fill btn-pink' }));
    // 24 Check if your records was added
    I.seeInField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Value' })), valueTest);
    I.click(locate('button').withText('Go back').withAttr({ class: 'btn-prev btn btn-fill btn-pink' }));
    I.seeInField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })), nameTest);
    I.seeInField(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Code' })), codeTest);
    commonActions.goBackToPreviousPage();
    I.waitForElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(nameTest)), constants.SHORT_WAIT);
    I.seeElement(locate('tr').withAttr({ role: 'row' }).withChild(locate('td').withText(nameTest)));
  },

  async verifyCUJDltFromMenuItems(url, customUJ, columnCustomJourney) {
    // 11 Navigate to Menu item "...Main#/entity/menuitem/edit/2b817f0d-0f2d-4e50-9747-476308152c1c"
    commonActions.accessDirectUrl(url);
    // 12 Verify if your CUJ is not displayed in the list (Search in Custom user Journey by: "AT_CustomUJ_Menu_TBD")
    await this.verifyCUJFromMenuItems(columnCustomJourney, customUJ, menuPage.container.childrenMenuItemsContainer);
    commonVerify.verifyEmptyTableData();
  },

  async verifyCUJFromMenuItems(columnName, searchAfter, anchorContainer) {
    I.waitForVisible(locate('td').withAttr({ 'aria-label': 'Column ' + columnName }).inside(anchorContainer), constants.SHORT_WAIT);
    const row = await I.grabAttributeFrom(locate('td').withAttr({ 'aria-label': 'Column ' + columnName }).inside(anchorContainer), 'aria-colindex');
    const selector = locate('input').withAttr({ role: 'textbox' }).inside(locate('td').withAttr({ 'aria-colindex': row })).inside(anchorContainer);
    I.waitForVisible(selector, constants.SHORT_WAIT);
    I.fillField(selector, searchAfter);
  },

  verifyUpdatedEntriesEditDlt(urlCustomUJ) {
    // 15 Access your CustomUJ
    commonActions.accessDirectUrl(urlCustomUJ);
    // 16 Verify the Display Name - is the new one
    I.waitForVisible(ujPage.labels.customActionTitlePortalUJTBU, constants.SHORT_WAIT);
    // 17 Verify the HTML - is the new one
    I.waitForVisible(ujPage.labels.customFormPortalUJTBU, constants.SHORT_WAIT);
  },

  async verifyStepsDJ(firstStepDN01, secondStepDN01, firstStepDN02, secondStepDN02, nameFirstStep, l, picture) {
    I.waitForVisible(ujPage.tabs.digitalJourneyMap, constants.SHORT_WAIT);
    I.click(ujPage.tabs.digitalJourneyMap);
    commonActions.waitForLoadersToFinish();
    I.wait(3);
    // Verify diagram
    I.waitForElement(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDN01}']]`, constants.SHORT_WAIT);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDN01}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepDN01}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDN02}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${secondStepDN02}']]`);
    I.seeElementInDOM(`//*[local-name()='text'][*[local-name()='tspan' and text()='${l}']]`);
    I.saveScreenshot(picture);
    I.seeVisualDiff(picture, { tolerance: 6, prepareBaseImage: false });
    I.click(`//*[local-name()='text'][*[local-name()='tspan' and text()='${firstStepDN01}']]`);
    I.click(ujPage.buttons.detailsDJButton);
    I.waitForVisible(ujPage.fields.nameInputUserJourneyField, constants.SHORT_WAIT);
    await commonVerify.verifyValueExistsInInput(ujPage.fields.nameInputUserJourneyField, nameFirstStep);
    await commonVerify.verifyValueExistsInInput(ujPage.fields.displayNameInputUserJourneyField, `${firstStepDN01}` + 'l');
    },
};
