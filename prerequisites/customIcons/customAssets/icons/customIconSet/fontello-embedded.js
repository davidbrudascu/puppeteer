! function ($) {
	if (!$.iconset_list || !$.iconset_list.length) {
			$.iconset_list = [];
	}
	/* Replace customIcon with your own icons family name */
	/* The way that the app adds your icon class to the icon container is this: class="iconClass iconClassFix-icon"
	/* The iconClass is not mandatory but we have it because some font families use it (ex. fontawesom). */
	$.iconset_icon = {
		iconFamily: "icon",
		iconClass: "icon",
		iconClassFix: "te-",
		icons: ["note","note-beamed","snow-inv","snow-heavy-inv","windy-rain-inv","hail-inv","clouds-inv"]
	}
	$.iconset_list.push('icon');
}(jQuery);