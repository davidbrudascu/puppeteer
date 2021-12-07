// Data
const data = require('~data/extendedModelCustomData');

module.exports = {
  fields: {
    emcInput1: '#ebsContainerContent_Name div div input',
    emcInput2: '#ebsContainerContent_extensionType_list div div div input',
    emcVaInput1: '#ebsContainerContent_name div div input',
    emcVaInput2: '#ebsContainerContent_displayName div div input',
    emcVaInput3: '#ebsContainerContent_attributeTypeId_list div div div input',
    emcVaInput4: '#ebsContainerContent_length div div input',
    emcVaInput5: '#ebsContainerContent_requiredLevelId_list div div div input',
  },
  selector: {
    emcOptionSet1: { title: data.emcAttribData2 },
    emcVaOptionSet1: { title: data.emcVaAttribData3 },
    emcVaOptionSet2: { title: data.emcVaAttribData5 },
  },
};
