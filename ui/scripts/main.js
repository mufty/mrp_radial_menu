$(document).ready(function() {
    var nbOptions = 8; // number of menus
    var angleStart = -360; // start angle

    // jquery rotate animation
    function rotate(li, d) {
        $({
            d: angleStart
        }).animate({
            d: d
        }, {
            step: function(now) {
                $(li)
                    .css({
                        transform: 'rotate(' + now + 'deg)'
                    })
                    .find('label')
                    .css({
                        transform: 'rotate(' + (-now) + 'deg)'
                    });
                $(li).find('div')
                    .css({
                        transform: 'rotate(' + (-now) + 'deg)'
                    });
            },
            duration: 0
        });
    }

    // show / hide the options
    function toggleOptions(s) {
        $(s).toggleClass('open');
        var li = $(s).find('li');
        var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
        for (var i = 0; i < li.length; i++) {
            var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg;
            $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
        }

        if ($(s).hasClass('open')) {
            $(s).show();
        } else {
            $(s).hide();
            $.post('https://mrp_radial_menu/close', JSON.stringify({}));
        }
    }

    $('.selector button').click(function(e) {
        toggleOptions($(this).parent());
    });

    $(document).keydown(function(e) {
        //on ESC close
        if ($('.selector').hasClass('open') && e.keyCode == 27) {
            toggleOptions('.selector');
        }
    });

    /*setTimeout(function() {
        toggleOptions('.selector');
    }, 100);*/

    $('.selector').hide();

    function addSubmenu(elm, item) {
        let mainDiv = $('<div class="submenu"></div>');

        for (let submenu of item.submenu) {
            let html = '<a href="#" id="' + submenu.id + '">' + submenu.text + '</a>';
            mainDiv.append(html);
            mainDiv.find("#" + submenu.id).click(() => {
                $.post(submenu.action, JSON.stringify({
                    id: submenu.id
                }));
                $('.submenu').hide();
                toggleOptions('.selector');
            });
        }

        elm.append(mainDiv);
    }

    function addItem(item) {
        if (!item || $('#' + item.id).length > 0)
            return;

        let html = '<li>' +
            '<input id="' + item.id + '" type="checkbox">' +
            '<label for = "' + item.id + '">' + item.text + '</label>' +
            '</li>';
        html = $(html);
        if (item.submenu) {
            addSubmenu(html, item);
        }
        $('.selector ul').append(html);
        $('.selector ul #' + item.id).change(() => {
            if (!item.submenu) {
                $.post(item.action, JSON.stringify({
                    id: item.id
                }));
                toggleOptions('.selector');
            } else {
                //toggle submenu
                $('.selector ul #' + item.id).parent().find('.submenu').toggle();
            }
        });
    }

    function removeItem(item) {
        $('#' + item.id).parent().remove();
    }

    window.addEventListener('message', (event) => {
        var data = event.data;
        switch (data.type) {
            case "toggle":
                toggleOptions('.selector');
                break;
            case "addItem":
                addItem(data.item);
                break;
            case "removeItem":
                removeItem(data.item);
                break;
            default:
                break;
        }
    });
});