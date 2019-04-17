
var metro_colors = [
    'black', 'white', 'lime', 'green', 'emerald', 'teal', 'blue', 'cyan', 'cobalt', 'indigo', 'violet',
    'pink', 'magenta', 'crimson', 'red', 'orange', 'amber', 'yellow', 'brown', 'olive',
    'steel', 'mauve', 'taupe', 'gray', 'dark', 'darker', 'darkBrown', 'darkCrimson',
    'darkMagenta', 'darkIndigo', 'darkCyan', 'darkCobalt', 'darkTeal', 'darkEmerald',
    'darkGreen', 'darkOrange', 'darkRed', 'darkPink', 'darkViolet', 'darkBlue',
    'lightBlue', 'lightRed', 'lightGreen', 'lighterBlue', 'lightTeal', 'lightOlive',
    'lightOrange', 'lightPink', 'grayDark', 'grayDarker', 'grayLight', 'grayLighter'
];

var adBlock = false;

jQuery(document).ready(function($){
    "use strict";

    $("<div/>").load("header.html").insertBefore($(".page-content"));
    $("<div/>").load("footer.html", function(){
        if (window.location.hostname == 'localhost') {
            $("div[data-text='sponsor']").remove();
        }
    }).insertAfter($(".page-content"));
});

(function($){
    "use strict";

    $("h1 .nav-button").addClass('transform');
})(jQuery);

jQuery(document).ready(function($){
    if (window.location.hostname !== 'localhost') {
        var gb = $('.adsbygoogle');
        $.each(gb, function () {
            var block = $(this);
            if (block.css('display') == 'none' || block.css('height') == 0) {
                adBlock = true;
            }
        });
        if (gb.length === 0 || adBlock) {
            var b = $("<div/>").addClass('padding10 bg-red fg-white text-accent');
            b.html('Advertising on the website of the project allows the project to evolve. Support the project, please disable ad blocker.');
            var target = window.location.pathname == '/' ? $('.metro-title') : $('.page-content > h1:nth-child(1)');
            b.insertAfter(target);
        }
    }
});

