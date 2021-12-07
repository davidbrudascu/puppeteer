module.exports = {
  buttons: {
    profilePanelButton: locate('span').withText('My profile').inside(locate('div').withAttr({ class: 'account-footer' })),
    profilePanelLink: locate('a').withAttr({ id: 'userPanelMyAccountLink' }).inside(locate('div').withAttr({ class: 'account-footer' })),
    logOffButton: locate('a').withAttr({ class: 'log-off-link' }).inside(locate('div').withAttr({ class: 'account-footer' })),
  },
  dropdown: {
    profileDropdown: locate('a').withAttr({ 'data-toggle': 'dropdown' }),
  },
};
