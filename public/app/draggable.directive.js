(function() {
    angular
        .module("hangmanApp")
        .directive("draggables", dragInstructions);

    function dragInstructions() {
            function linkFunc(scope, element, attributes) {
                element.draggable();
            }
            return {
                link: linkFunc
            }
    }

})();