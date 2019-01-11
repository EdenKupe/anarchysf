$(document).ready(function () {
  sideBarClick ();
})


function sideBarClick () {
	$("#sidebar").on("click", ".canOpen", function (){
		var hasExpanded = $(this).data("expanded") == "true";
		var nextGetsOpened = $(this).next(".getsOpened");
		var childCanOpen = nextGetsOpened.find(".canOpen");
		if (hasExpanded) {
			$(this).removeClass("activeitem");
			childCanOpen.removeClass("activeitem");
			$(this).data("expanded", "false");
			nextGetsOpened.slideUp(500);
			nextGetsOpened.find(".getsOpened").slideUp(500);
			childCanOpen.data("expanded", "false");
		} else {
			$(".itemdetails").removeClass("activeitem");
			$(this).addClass("activeitem")
			$(this).data("expanded", "true");
			$(this).next(".getsOpened").slideDown(500);
	};
	return false;
});
};
