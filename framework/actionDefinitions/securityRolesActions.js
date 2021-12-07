// Constants
const constants = require('~config/constants');
const loginPage = require('~pages/loginPage');
// Actions
const commonActions = require('~actions/commonActions');
// Verify
const commonVerify = require('~actions/commonVerify');
// Pages
const commonPage = require('~pages/commonPage');
const securityRolesPage = require('~pages/securityRolesPage');
const accountPanelPage = require('~pages/accountPanelPage');

const I = actor();

module.exports = {
  // Add a security role for custom flow
  addSecurityRolesCustomFlow(customFlowSecurityRole1) {
    I.waitForVisible(securityRolesPage.buttons.insertExistingCustomActionBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.insertExistingCustomActionBtn);
    I.waitForVisible(securityRolesPage.fields.inputSearchByNameCASecurityRole, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputSearchByNameCASecurityRole, customFlowSecurityRole1);
    I.waitForVisible(locate('td').withText(customFlowSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableCustomActionSecurityRole), constants.SHORT_WAIT);
    I.click(locate('td').withText(customFlowSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableCustomActionSecurityRole));
    I.waitForVisible(securityRolesPage.buttons.okPopupSecRolesButton, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.okPopupSecRolesButton);
    I.waitForInvisible(securityRolesPage.buttons.okPopupSecRolesButton, constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addSecurityRolesDashboard(dashboardSecurityRole1) {
    I.waitForVisible(securityRolesPage.buttons.insertExistingDashboardBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.insertExistingDashboardBtn);
    I.waitForVisible(securityRolesPage.fields.inputSearchByNameDashboardSR, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputSearchByNameDashboardSR, dashboardSecurityRole1);
    I.waitForVisible(locate('td').withText(dashboardSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableDashboardSecurityRole), constants.SHORT_WAIT);
    I.click(locate('td').withText(dashboardSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableDashboardSecurityRole));
    I.waitForVisible(securityRolesPage.buttons.okPopupDashboardSecRolesBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.okPopupDashboardSecRolesBtn);
    I.waitForInvisible(securityRolesPage.buttons.okPopupDashboardSecRolesBtn, constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addSecurityRolesFormStep(formStepSecurityRole1) {
    I.waitForVisible(securityRolesPage.buttons.insertExistingFormSectionBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.insertExistingFormSectionBtn);
    I.waitForVisible(securityRolesPage.fields.inputSearchByNameFormSectionSR, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputSearchByNameFormSectionSR, formStepSecurityRole1);
    I.waitForVisible(locate('td').withText(formStepSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSectionSecurityRole), constants.SHORT_WAIT);
    I.click(locate('td').withText(formStepSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSectionSecurityRole));
    I.waitForVisible(securityRolesPage.buttons.okPopupFormSecSecRolesBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.okPopupFormSecSecRolesBtn);
    I.waitForInvisible(securityRolesPage.buttons.okPopupFormSecSecRolesBtn, constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addSecurityRolesForm(formSecurityRole1) {
    I.waitForVisible(securityRolesPage.buttons.insertExistingFormBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.insertExistingFormBtn);
    I.waitForVisible(securityRolesPage.fields.inputSearchByNameFormSR, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputSearchByNameFormSR, formSecurityRole1);
    I.waitForVisible(locate('td').withText(formSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSecurityRole), constants.SHORT_WAIT);
    I.click(locate('td').withText(formSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSecurityRole));
    I.waitForVisible(securityRolesPage.buttons.okPopupFormSecRolesBtn, constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.buttons.okPopupFormSecRolesBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.okPopupFormSecRolesBtn);
    I.waitForInvisible(securityRolesPage.buttons.okPopupFormSecRolesBtn, constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addNewTypeSecurityRole(clickToInsert, addTypeField1) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(securityRolesPage.fields.inputTypeField, constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.fields.inputTypeField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputTypeField, addTypeField1);
  },

  async addNewEntryEntityExtension(clickToInsert, addNameField1, addTypeField1) {
    commonActions.clickSidebarButton(clickToInsert);
    I.waitForVisible(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.waitForClickable(securityRolesPage.fields.inputNameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputNameField, addNameField1);
    I.click(securityRolesPage.buttons.addLookupAttributeBtn);
    I.waitForVisible(locate('td').withText(addTypeField1).inside(securityRolesPage.table.tableAT_LookupAttribute), constants.SHORT_WAIT);
    I.click(locate('td').withText(addTypeField1).inside(securityRolesPage.table.tableAT_LookupAttribute));
    I.click(securityRolesPage.buttons.okPopupLookupExtensionBtn);
    await commonVerify.verifyValueExistsInInput(securityRolesPage.fields.inputLookupAttributeType, addTypeField1);
  },

  addSecurityRolesFDFStep(fDFStepSecurityRole1) {
    I.waitForVisible(securityRolesPage.buttons.insertExistingFormSectionBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.insertExistingFormSectionBtn);
    I.waitForVisible(securityRolesPage.fields.inputSearchByNameFormSectionSR, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputSearchByNameFormSectionSR, fDFStepSecurityRole1);
    I.waitForVisible(locate('td').withText(fDFStepSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSectionSecurityRole), constants.SHORT_WAIT);
    I.click(locate('td').withText(fDFStepSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSectionSecurityRole));
    I.waitForVisible(securityRolesPage.buttons.okPopupFormSecSecRolesBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.okPopupFormSecSecRolesBtn);
    I.waitForInvisible(securityRolesPage.buttons.okPopupFormSecSecRolesBtn, constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  addSecurityRolesFDF(fDFSecurityRole1) {
    I.waitForVisible(securityRolesPage.buttons.insertExistingFormBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.insertExistingFormBtn);
    I.waitForVisible(securityRolesPage.fields.inputSearchByNameFormSR, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.inputSearchByNameFormSR, fDFSecurityRole1);
    I.waitForVisible(locate('td').withText(fDFSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSecurityRole), constants.SHORT_WAIT);
    I.click(locate('td').withText(fDFSecurityRole1).inside(securityRolesPage.table.firstTableRow).inside(securityRolesPage.table.tableFormSecurityRole));
    I.waitForVisible(securityRolesPage.buttons.okPopupFormSecRolesBtn, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.okPopupFormSecRolesBtn);
    I.waitForInvisible(securityRolesPage.buttons.okPopupFormSecRolesBtn, constants.SHORT_WAIT);
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
  },

  async editSRFieldsDesigner(securityRoleEntity, businessUnitRecord, updatedEmail, updatedPhoneNumber, updatedDisplayName) {
    I.waitForVisible(securityRolesPage.fields.searchByUsernameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.searchByUsernameField, securityRoleEntity);
    commonActions.doubleClickValueFromTable(securityRolesPage.container.defaultContainerContent, securityRoleEntity);
    I.waitForVisible(securityRolesPage.buttons.dropdownArrowBusinessUnitButton, constants.SHORT_WAIT);
    I.click(securityRolesPage.buttons.dropdownArrowBusinessUnitButton);
    commonActions.selectARowFromTableAfterText(businessUnitRecord);
    I.click(securityRolesPage.buttons.okButtonBusinessUnit);
    I.waitForVisible(securityRolesPage.fields.emailInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.emailInputField, updatedEmail);
    I.fillField(securityRolesPage.fields.phoneNumberInputField, updatedPhoneNumber);
    I.fillField(securityRolesPage.fields.displayNameInputField, updatedDisplayName);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    I.scrollTo(securityRolesPage.fields.emailInputField);
    await commonVerify.verifyValueExistsInInput(securityRolesPage.fields.emailInputField, updatedEmail);
    await commonVerify.verifyValueExistsInInput(securityRolesPage.fields.phoneNumberInputField, updatedPhoneNumber);
    commonActions.refreshPage();
    await commonVerify.verifyValueExistsInInput(securityRolesPage.fields.displayNameInputField, updatedDisplayName);
  },

  async editSRFieldsPortal(updatedDisplayName, updatedDisplayNamePortal, updatedPhoneNumberPortal, updatedEmailPortal) {
    // Verify if the user display name is updated
    I.waitForVisible(locate('span').withText(updatedDisplayName).inside(locate('a').withAttr({ 'data-toggle': 'dropdown' })), constants.SHORT_WAIT);
    I.waitForClickable(locate('span').withText(updatedDisplayName).inside(locate('a').withAttr({ 'data-toggle': 'dropdown' })));
    I.click(locate('span').withText(updatedDisplayName).inside(locate('a').withAttr({ 'data-toggle': 'dropdown' })));
    I.waitForVisible(commonPage.buttons.myProfileButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.myProfileButton);
    I.waitForVisible(securityRolesPage.fields.displayNameInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.displayNameInputField, updatedDisplayNamePortal);
    I.fillField(securityRolesPage.fields.emailInputField, updatedEmailPortal);
    I.fillField(securityRolesPage.fields.phoneNumberInputField, updatedPhoneNumberPortal);
    I.click(commonPage.buttons.saveAndRefreshButton);
    // Using wait because is taking too long to refresh the page
    I.wait('5');
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    await commonVerify.verifyValueExistsInInput(securityRolesPage.fields.emailInputField, updatedEmailPortal);
    await commonVerify.verifyValueExistsInInput(securityRolesPage.fields.phoneNumberInputField, updatedPhoneNumberPortal);
    await commonVerify.verifyValueExistsInInput(securityRolesPage.fields.displayNameInputField, updatedDisplayNamePortal);
    // Verify if the user display name is updated
    I.waitForVisible(locate('span').withText(updatedDisplayNamePortal).inside(locate('a').withAttr({ 'data-toggle': 'dropdown' })), constants.SHORT_WAIT);
    I.seeElement(locate('span').withText(updatedDisplayNamePortal).inside(locate('a').withAttr({ 'data-toggle': 'dropdown' })));
  },

  createSysUser(usernameSysUser, rootBusinessUnit, email, phoneNumber, displayName, backOfficeSystemUser, password) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(securityRolesPage.fields.userNameInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.userNameInputField, usernameSysUser);
    I.click(securityRolesPage.buttons.dropdownArrowBusinessUnitButton);
    commonActions.selectARowFromTableAfterText(rootBusinessUnit);
    I.click(securityRolesPage.buttons.okButtonBusinessUnit);
    I.waitForVisible(securityRolesPage.fields.emailInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.emailInputField, email);
    I.fillField(securityRolesPage.fields.phoneNumberInputField, phoneNumber);
    I.fillField(securityRolesPage.fields.displayNameInputField, displayName);
    I.click(securityRolesPage.buttons.dropdowArrowSystemUserTypeButton);
    commonActions.selectARowFromTableAfterText(backOfficeSystemUser);
    I.click(securityRolesPage.buttons.okButtonSystemUserType);
    I.waitForVisible(securityRolesPage.fields.passwordInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.passwordInputField, password);
    I.fillField(securityRolesPage.fields.confirmPasswordInputField, password);
  },

  async createAdminSysUser(usernameSysUser, rootBusinessUnit, email, phoneNumber, displayName, backOfficeSystemUser, password, urlDesigner) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(securityRolesPage.fields.userNameInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.userNameInputField, usernameSysUser);
    I.click(securityRolesPage.buttons.dropdownArrowBusinessUnitButton);
    commonActions.selectARowFromTableAfterText(rootBusinessUnit);
    I.click(securityRolesPage.buttons.okButtonBusinessUnit);
    I.waitForClickable(securityRolesPage.checkbox.adminCheckBox, constants.SHORT_WAIT);
    I.click(securityRolesPage.checkbox.adminCheckBox);
    I.waitForVisible(securityRolesPage.fields.emailInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.emailInputField, email);
    I.fillField(securityRolesPage.fields.phoneNumberInputField, phoneNumber);
    I.fillField(securityRolesPage.fields.displayNameInputField, displayName);
    I.click(securityRolesPage.buttons.dropdowArrowSystemUserTypeButton);
    commonActions.selectARowFromTableAfterText(backOfficeSystemUser);
    I.click(securityRolesPage.buttons.okButtonSystemUserType);
    I.waitForVisible(securityRolesPage.fields.passwordInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.passwordInputField, password);
    I.fillField(securityRolesPage.fields.confirmPasswordInputField, password);
    commonActions.saveAndRefreshAction();
    commonVerify.verifyToastMessage(commonPage.messagePopup.successMessage, constants.TOAST_VANISH);
    const sysUserUrl = await I.grabCurrentUrl();
    await commonActions.logoutFromApp();
    // Login as admin user
    this.loginNoInteractiveTutorial(urlDesigner, usernameSysUser, password);
    commonActions.accessDirectUrl(sysUserUrl);
    // Verify that no toast message appears
    I.waitForInvisible(commonPage.messagePopup.errorMessage, constants.SHORT_WAIT);
    I.dontSeeElement(commonPage.messagePopup.errorMessage);
  },

  createSysUserIsNotAuthorized(urlDesigner, urlPortal, password, sysUserName, urlSysUsers, rootBusinessUnit, email, phoneNumber, displayName, backOfficeSystemUser) {
    I.waitForVisible(commonPage.buttons.insertButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.insertButton);
    I.waitForVisible(securityRolesPage.fields.userNameInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.userNameInputField, sysUserName);
    I.click(securityRolesPage.buttons.dropdownArrowBusinessUnitButton);
    commonActions.selectARowFromTableAfterText(rootBusinessUnit);
    I.click(securityRolesPage.buttons.okButtonBusinessUnit);
    I.waitForClickable(securityRolesPage.checkbox.isAuthorizedCheckBox, constants.SHORT_WAIT);
    I.click(securityRolesPage.checkbox.isAuthorizedCheckBox);
    I.waitForVisible(securityRolesPage.fields.emailInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.emailInputField, email);
    I.fillField(securityRolesPage.fields.phoneNumberInputField, phoneNumber);
    I.fillField(securityRolesPage.fields.displayNameInputField, displayName);
    I.click(securityRolesPage.buttons.dropdowArrowSystemUserTypeButton);
    commonActions.selectARowFromTableAfterText(backOfficeSystemUser);
    I.click(securityRolesPage.buttons.okButtonSystemUserType);
    I.waitForVisible(securityRolesPage.fields.passwordInputField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.passwordInputField, password);
    I.fillField(securityRolesPage.fields.confirmPasswordInputField, password);
  },

  deleteSysUser(sysUser) {
    I.waitForVisible(securityRolesPage.fields.searchByUsernameField, constants.SHORT_WAIT);
    I.fillField(securityRolesPage.fields.searchByUsernameField, sysUser);
    commonActions.selectARowFromTableAfterText(sysUser);
    I.click(commonPage.buttons.deleteButton);
    I.waitForVisible(commonPage.buttons.yesAnswerButton, constants.SHORT_WAIT);
    I.click(commonPage.buttons.yesAnswerButton);
  },

  logInAccessDenied(url, sysUserName, password) {
    I.amOnPage(url);
    I.waitForVisible(loginPage.fields.usernameField, constants.SHORT_WAIT);
    I.fillField(loginPage.fields.usernameField, sysUserName);
    I.fillField(loginPage.fields.passwordField, password);
    I.waitForClickable(loginPage.buttons.submitButton, constants.SHORT_WAIT);
    I.click(loginPage.buttons.submitButton);
    // Verify that the following text appears: "Access is denied. User is unauthorized."
    I.waitForVisible(securityRolesPage.errors.unauthorizedLogIn, constants.SHORT_WAIT);
  },

  logInIncorrect(url, sysUserName, password) {
    I.amOnPage(url);
    I.waitForVisible(loginPage.fields.usernameField, constants.SHORT_WAIT);
    I.fillField(loginPage.fields.usernameField, sysUserName);
    I.fillField(loginPage.fields.passwordField, password);
    I.waitForClickable(loginPage.buttons.submitButton, constants.SHORT_WAIT);
    I.click(loginPage.buttons.submitButton);
    // Verify that the following text appears: "Access is denied. User is unauthorized."
    I.waitForVisible(securityRolesPage.errors.incorrectLogin, constants.SHORT_WAIT);
  },

  loginNoInteractiveTutorial(url, username, password) {
    I.amOnPage(url);
    commonActions.waitForLoadersToFinish();
    I.waitForVisible(loginPage.fields.usernameField, constants.SHORT_WAIT);
    I.fillField(loginPage.fields.usernameField, username);
    I.fillField(loginPage.fields.passwordField, password);
    I.waitForClickable(loginPage.buttons.submitButton, constants.SHORT_WAIT);
    I.click(loginPage.buttons.submitButton);
    I.waitForElement(accountPanelPage.buttons.profilePanelButton, constants.LONG_WAIT);
  },
};
