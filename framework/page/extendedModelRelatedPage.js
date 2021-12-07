// Data
const data = require('~data/extendedModelRelatedData');

module.exports = {
  fields: {
    emrInput1: '#ebsContainerContent_Name div div input',
    emrInput2: '#ebsContainerContent_extensionType_list div div div input',
    emrInput3: '#ebsContainerContent_relationAttributeId_dropDownBox div div div input',
    emrVaInput1: '#relatedEntityAttributesSelect div div div input',
    emrVaInput2: '#ebsContainerContent_displayName div div input',
    emrVaInput3: '#ebsContainerContent_updatable',
    emrVaInput4: '#ebsContainerContent_attributeTypeId_list div div div input',
    emrVaInput5: '#ebsContainerContent_length div div input',
    emrVaInput6: '#ebsContainerContent_requiredLevelId_list div div div input',
  },
  buttons: {
    insertBusinessEntityExtensions: locate('div').withAttr({ id: 'ebsContainerContent_sys_entityForm_entityExtension_toolbar_item_1' })
  },
  selector: {
    emrIsOwnerForRelation: '#ebsContainerContent_OwnsRelation',
    emrOptionSet1: { title: data.emrAttribData2 },
    emrVaOptionSet1: data.emrVaAttribData1,
    emrVaOptionSet2: data.emrVaAttribData5,
  },
};
