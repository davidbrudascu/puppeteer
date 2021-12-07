module.exports = {
    fields: {
        nameBasicFDFInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_AT_BasicFDF_B2C'),
        emailBasicFDFInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_Email'),
        ageBasicFDFInputField: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_Age'),
        nameInputFieldLocalization: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_AT_LocalizationFDF_B2C'),
        addressInputFieldLocalization: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_Address'),
        nameInputFieldFirstFDFCheckForm: locate('input').withAttr({ type: 'text' }).inside('#ebsContainerContent_AT_CheckForm_B2C_1'),
    },
    buttons: {
        nextButton: locate('button').withText('Next'),
        finishButton: locate('button').withText('Finish'),
        nextButtonRO: locate('button').withText('Inainte'),
        finishButtonRO: locate('button').withText('Finalizeaza'),
        checkFormLookupButtonFirstFDF: '#ebsContainerContent_attr_lookup_1_button',
        okButtonLookupFirstFDFCheckForm: '#ebsContainerContent_attr_lookup_1_popupLkp_lookupgrid_toolbar_item_4',
        checkFormLookupButtonSecondFDF: '#ebsContainerContent_attr_lookup_2_button',
    },
    checkbox: {
        newsletterBasicFDFInputField: '#ebsContainerContent_Newsletter',
        checkedCheckbox: locate('div').withAttr({ role: 'checkbox' }).withAttr({ 'aria-checked': 'true'}),
    },
    selector: {
        ageColumnHeader: locate('td').withAttr({ 'aria-label': 'Column Age'}),
        nameColumnHeader: locate('td').withAttr({ 'aria-label': 'Column Name'}),
        emailColumnHeader: locate('td').withAttr({ 'aria-label': 'Column Email'}),
        newsletterColumnHeader: locate('td').withAttr({ 'aria-label': 'Column Newsletter'}),
    },
    container: {
        defaultContainer: '#ebsContainerContent',
    },
    labels: {
        checkFormNameLabelFirstFDF: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_AT_CheckForm_B2C_1' }).withText('Name'),
        checkFormLookupLabelFirstFDF: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_attr_lookup_1' }).withText('attr_lookup_1'),
        checkFormNameLabelSecondFDF: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_AT_CheckForm_B2C_2' }).withText('Name'),
        checkFormLookupLabelSecondFDF: locate('div').withAttr({ 'data-label-for': 'ebsContainerContent_attr_lookup_2' }).withText('attr_lookup_2'),
    }
};
