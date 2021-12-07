// Constants
const constants = require('~config/constants');
// Page
const uiDesignerPage = require('~pages/uiDesignerPage');

const I = actor();

module.exports = {
  verifyContainersPortal() {
    I.waitForVisible(uiDesignerPage.containers.container12Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container3and9Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container4and8Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container6and6Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container8and4Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container9and3Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container10and2Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container4x3Portal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.containers.container3x4Portal, constants.SHORT_WAIT);
  },

  verifyLabelAttributesPortal() {
    I.waitForVisible(uiDesignerPage.dataTemplates.firstLabelAttributeTemplatePortal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.dataTemplates.secondLabelAttributeTemplatePortal, constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.dataTemplates.thirdLabelAttributeTemplatePortal, constants.SHORT_WAIT);
  },

  verifyAttributePortal(numericAttribute) {
    I.waitForVisible(locate('div').withText(numericAttribute).inside(uiDesignerPage.containers.container), constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.fields.numericAttributeInputField, constants.SHORT_WAIT);
  },

  verifyVAttributePortal(virtualAttribute) {
    I.waitForVisible(locate('div').withText(virtualAttribute).inside(uiDesignerPage.containers.container), constants.SHORT_WAIT);
    I.waitForVisible(uiDesignerPage.fields.numericVAttributeInputField, constants.SHORT_WAIT);
  },

  verifyHeadingPortal(text) {
    I.waitForVisible(uiDesignerPage.selector.testHeading.withText(text).inside(uiDesignerPage.containers.container), constants.SHORT_WAIT);
  },

  verifyChartPortal(chartType) {
    I.waitForVisible(locate(`#ebsContainerContent_${chartType}`).inside(uiDesignerPage.containers.container), constants.SHORT_WAIT);
  },

  verifyButtonPortal(classButton, idButton) {
    I.waitForVisible(locate('button').withAttr({ class: classButton }).withAttr({ id: idButton }).inside(uiDesignerPage.containers.container), constants.SHORT_WAIT);
  },

  verifyCustomButtonPortal(textButton, idButton) {
    I.waitForVisible(locate('button').withText(textButton).withAttr({ id: idButton }).inside(uiDesignerPage.containers.container), constants.SHORT_WAIT);
  },

  verifyCustomProcessorButtonPortal(text, idButton, customProcessorOption) {
    I.waitForVisible(locate('button')
      .withText(text).withAttr({ id: idButton })
      .withAttr({ 'data-endpoint-name': `${customProcessorOption}[${customProcessorOption}]` }), constants.SHORT_WAIT);
  },

  verifyFormActionButtonPortal(idButton, text) {
    I.waitForVisible(locate('button').withAttr({ id: idButton }).withText(text), constants.SHORT_WAIT);
  },

  verifyRelationPortal(relationName) {
    I.waitForVisible(locate('div').withAttr({ 'data-component-label-for': relationName }), constants.SHORT_WAIT);
  },

  verifyDataFormAttrPortal(relationshipEntity) {
    I.waitForVisible(uiDesignerPage.fields.userIDInputField, constants.SHORT_WAIT);
    I.waitForVisible(locate('h4').withText(relationshipEntity).inside(uiDesignerPage.selector.relationshipContainer), constants.SHORT_WAIT);
  },
};
