
(function() {

    var result = {};

    result.load = function() {
        $(document).on("submit", "#container[page='list'] #filter-form", function() {
            location.hash = "list?" + $("#seach-input").val().trim();
            return false;
        });
    };

    result.rerender = function(q) {
        return "";
    };

    applications("list", function() {
        return result;
    });

})();