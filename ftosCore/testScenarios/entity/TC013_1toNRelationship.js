// Constants
const constants = require('~config/constants');
// Actions
const commonActions = require('~actions/commonActions');
// Data
const data = require('~data/entity/TC013_1toNRelationship');
// Pages
const commonPage = require('~pages/commonPage');
const attributePage = require('~pages/attributePage');
// Verify
const commonVerify = require('~actions/commonVerify');
const verifyBusinessEntityAction = require('~actions/businessEntityVerify');
const verifyAttributeActionsField = require('~actions/attributesVerify');

const I = actor();

// Author Victor Pana

Feature('Relationship Entity');

Scenario('User can create 1 to N relationship', async () => {
  // 1. Login using Portal
  await commonActions.loginInApp(data.urlPortal, data.username, data.password);
  // 2. Access your entity ...Main#/entity/AT_1toNParentEnt/list/
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_1toNParentEnt + data.portalViewList);
  // 3. Access a record (Parent 1)
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_1toNParentEnt + data.portalEditAttribute
    + data.AT_1TONPARENTENT_Id,
  );
  // 4. Click on "Insert " button
  I.waitForVisible(locate('div').withText('Insert'), constants.SHORT_WAIT);
  I.click(locate('div').withText('Insert'));
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.insert_AT_1toNChildEnt_AT_1toNParentEntId_AT_1toNParentEnt_Button,
  );
  // 5. Check the form -> contains only Name and Parent fields
  I.waitForVisible(locate('div').withText(data.nameName).inside(locate('.form_AT_1toNChildEnt_insertRelTable')), constants.SHORT_WAIT);
  I.waitForVisible(locate('div').withText(data.parentName).inside(locate('.form_AT_1toNChildEnt_insertRelTable')), constants.SHORT_WAIT);
  // 6. Check if Parent is "Parent 1"
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.fields.parent_AT_1toNParentEntIdField, data.Parent1_Name,
  );
  // 7. Fill in Name with: Child 1
  commonActions.fillField(attributePage.fields.name_AT_1toNParentEntIdField, data.child1_Name);
  // 8. Click Save and Close
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  I.waitForVisible(locate('td').withText(data.child1_Name).inside(locate('#ebsContainerContent_AT_1toNChildEnt_AT_1toNParentEntId_AT_1toNParentEnt')), constants.SHORT_WAIT);
  // 9. Click on "Child1" cell
  I.click(locate('td').withText(data.child1_Name).inside(locate('#ebsContainerContent_AT_1toNChildEnt_AT_1toNParentEntId_AT_1toNParentEnt')));
  // 10. Change Name to "Child1 Updated"
  I.pressKey(['CommandOrControl', 'A']);
  I.pressKey('Delete');
  I.fillField(locate('input').withAttr({ type: 'text' }).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), data.child1_NameUpdated);
  // 11. Click outside the cell -> A success message is displayed
  I.click(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ class: 'dx-editor-with-menu' })));
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 12. Open "Child 1 Updated"
  commonActions.accessByViewButton();
  // 13. Check the form -> contains only Name and Parent fields
  I.waitForVisible(attributePage.container.name_AT_1toNParentEntFieldContainer, constants.SHORT_WAIT);
  I.waitForVisible(attributePage.container.parent_AT_1toNParentEntFieldContainer, constants.SHORT_WAIT);
  // 14. Name: Child 1 Updated
  // 15. Parent: Parent1
  I.waitForVisible(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_Name' })), constants.SHORT_WAIT);
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.fields.name_AT_1toNParentEntIdField, data.child1_NameUpdated,
  );
  await verifyAttributeActionsField.verifyInputDetailFromAuditPage(
    attributePage.fields.parent_AT_1toNParentEntIdField, data.Parent1_Name,
  );
  // 16. Click on "Parent" attribute -> a new window is displayed
  commonActions.clickButtonAfterLocator(attributePage.link.parent_AT_1TONCHILDENT_link);
  commonActions.fillField(
    attributePage.fields.searchParentAT_1toNParentEntId_popupField, data.parent2Name,
  );
  // 17. Select "PArent2"
  I.waitForVisible(locate('td').withText(data.parent2Name).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_1toNParentEntId_popupLkp_lookupgrid' })), constants.SHORT_WAIT);
  I.click(locate('td').withText(data.parent2Name).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_1toNParentEntId_popupLkp_lookupgrid' })));
  I.click(locate('#ebsContainerContent_AT_1toNParentEntId_popupLkp_lookupgrid_toolbar_item_4'));
  await commonVerify.verifyValueExistsInInput(locate('input').withAttr({ type: 'text' }).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_1toNParentEntId_textBox' })), data.parent2Name)
  // 18. Click "Save and Close"
  I.waitForClickable(locate('a').withAttr({ id: 'SaveBtn' }), constants.SHORT_WAIT);
  commonActions.saveAndCloseAction();
  commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  // 19. Check if your table is empty
  I.waitForVisible(locate('span').withText(data.nameRelationshipTableNoData).inside(locate('div').withAttr({ id: 'ebsContainerContent_AT_1toNChildEnt_AT_1toNParentEntId_AT_1toNParentEnt' })), constants.SHORT_WAIT);
  // 20. Navigate to "...Main#/entity/AT_1toNParentEnt/list/"
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_1toNParentEnt + data.portalViewList);
  // 21. Access Parent2
  commonActions.accessDirectUrl(
    data.viewUrl + data.entity_AT_1toNParentEnt + data.portalEditAttribute
    + data.AT_1TONPARENTENT2_Id,
  );
  // 22. Check if contains 1 Child: "Child 1 Updated"
  commonActions.seeInField(
    attributePage.fields.childNameAT_1toNParentEntField, data.child1_NameUpdated,
  );
  // 23. Check it and click on "delete" button
  commonActions.clickButtonAfterLocator(commonPage.checkbox.selectSingleResultCheckbox);
  commonActions.clickButtonAfterLocator(
    attributePage.buttons.deleteAT_1toNChildEnt_AT_1toNParentEntButton,
  );
  // 24. Click "Yes"
  commonActions.clickButtonAfterLocator(commonPage.buttons.yesAnswerButton);
  // 25. Navigate to "...Main#/entity/AT_1toNChildEnt/list/"
  commonActions.accessDirectUrl(data.viewUrl + data.entity_AT_1toNChildEnt + data.portalViewList);
  // 26. Check if your list contain only Child 0
  I.waitForVisible(locate('td').withText(data.child0_Name).inside(locate('tr').withAttr({ 'aria-rowindex': '1' })), constants.SHORT_WAIT);
  I.waitForVisible(locate('tr').withAttr({ 'aria-rowindex': '1' }), constants.SHORT_WAIT);
  I.waitForInvisible(locate('tr').withAttr({ 'aria-rowindex': '2' }), constants.SHORT_WAIT);
  // 27. Logoff
  await commonActions.logoutFromApp();
});
