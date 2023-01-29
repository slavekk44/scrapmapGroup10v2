var stickyOffset = $("#sticky").offset();
var $contentDivs = $(".content");
$(document).scroll(function() {
    $contentDivs.each(function(k) {
        var _thisOffset = $(this).offset();
        var _actPosition = _thisOffset.top - $(window).scrollTop();
        if (_actPosition < stickyOffset.top && _actPosition + $(this).height() > 0) {
            $("#current").html("Current div under sticky is: " + $(this).attr("class"));
            $("#sticky").removeClass("light dark").addClass($(this).hasClass("light") ? "light" : "dark");
            return false;
        }
    });
});