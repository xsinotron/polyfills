/**
 * @Author contact@alexis-collin.fr
 * placeholder.js
 */
(function (window) {
    /**
     * Mise en place du placeholder ou du comportement équivalent en JS (pour IE)
     * @param {Array}  elt    : sélecteur CSS de l'input cible.
     * @param {Object} params : 
     */
    var ua  = {brut: /(MSIE)\s([\d\.]+)/.exec(navigator.userAgent)},
        set = function(elt) {
        // http://www.cssnewbie.com/cross-browser-support-for-html5-placeholder-text-in-forms
        var canUse   = 'placeholder' in document.createElement('input'),
            exist    = elt.attr('placeholder') === undefined || elt.attr('placeholder') !== "",
            edited   = elt.val() !== "" && elt.attr('placeholder') !== elt.val();

        console.log("placeholder.set() > ", elt.length, canUse, exist, edited);
        if (canUse) {
            if (!exist) {
                elt.attr('placeholder', elt.val());
            }
            if (!edited) {
                elt.val(null);
            }
        } else {
            elt.val(elt.attr("placeholder"));
            elt.off().addClass('holder')
            // IN
                .on('focusin', function () {
                    if ($(this).val() === $(this).attr("placeholder")) {
                        $(this).val('').removeClass('holder');
                    }
                })
            // OUT
                .on('focusout change', function () {
                    if ($(this).val() === '') {
                        $(this).val($(this).attr("placeholder")).addClass('holder');
                    }
                });
        }
    };
    ua.browser = ua.brut[1];
    ua.version = parseInt(ua.brut[2], 10);
    if (ua.browser == "MSIE" && ua.version < 10) {
        var fields = $('input[placeholder]');
        var i      = 0;
        for (i = 0; i < fields.length; i++) {
            set($(fields[i]));
        }
    }
}(window));