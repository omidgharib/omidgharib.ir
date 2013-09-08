function loadPage(link){
    if ($(window).width() > 980){var delay = 600;}
    else {var delay = 0}

    $(".page .wrapper").removeClass("active");
    $(".page .container").stop().delay(delay).queue(function(nxt) {

        $.ajax({
            url: link,
            //dataType : "html",
            beforeSend: function(){
                $(".page .loader").addClass("active");
            },
            success: function (data) {
                $(".page .container").html(data);
                $(".page .wrapper").addClass("active");

                $(".page .container .portfolio .group:first").addClass("active");
                $(".page .loader").removeClass("active");

                Resizer();
            }
        });
        nxt();
    });

}

function setPosition(item, angle, fulldiameter){
    var itemDistance = 0.35 * fulldiameter;
    var px = Math.cos(angle)*itemDistance + fulldiameter/2;
    var py = Math.sin(angle)*itemDistance + fulldiameter/2;
    item.css("top", py+"px");
    item.css("left", px+"px");
}

function Regulation(count){
    var num = 0;
    $(".mainmenu .menuitem").each(function(){
        var item = $(this);
        var angle = 360*Math.PI/180/count*num;
        var fulldiameter = $(".mainmenu").width(); //width(height) of menu circle

        setPosition(item, angle, 440);
        num++;
    });
}

function Rotate(item, angle){
    var angledeg = 'rotate(' + angle + 'deg)';
    item.css({
        "-webkit-transform": angledeg,
        "-moz-transform": angledeg,
        "-o-transform": angledeg,
        "-ms-transform": angledeg,
        "transform": angledeg
    });
}

function MakeMenu(itemsCount){
    Regulation(itemsCount);
    Rotate($(".mainmenu #linecontainer .overwrapper"), Math.floor(180 - 360/itemsCount));
}

function Resizer(){
    if ($(window).width() > 980){
    $(".page .wrapper").height($(window).height()); //Fix for FireFox
    }

    if($(".page .container .portfolio .group.active").height() > 100){
    $(".page .container .portfolio .all-items").css("min-height", $(".page .container .portfolio .group.active").outerHeight()+"px");
    } else {
        $(".page .container .portfolio .all-items").css("min-height", $(".page .container").width()-100);
    }
}

function SlideNext(){
    if($(".portfolio .all-items .active").is(":last-child") == false){
        $(".portfolio .all-items .active").next().toggleClass('active');
        $(".portfolio .all-items .active:first").toggleClass('active');
    }
    Resizer();
}

function SlidePrev(){
    if($(".portfolio .all-items .active").is(":first-child") == false){
        $(".portfolio .all-items .active").prev().toggleClass('active');
        $(".portfolio .all-items .active:last").toggleClass('active');
    }
    Resizer();
}

$(document).ready(function(){

    $("a[href*='/']").on("click", function(e){
        var anchor = $(this);
        var locate =  $.attr(this, 'href');
        window.location.hash = locate;
    });

    $(".mainmenu .menu-items").on("click", ".menuitem", function(){
        if(!$(this).hasClass("active")){
            Rotate($(".mainmenu #linecontainer"), (360/$(".mainmenu .menu-items > .menuitem").length/2)+(360/$(".mainmenu .menu-items > .menuitem").length*$(this).index()));
            $(".mainmenu .menu-items .active").removeClass("active");
            $(this).addClass("active");
            loadPage($(this).attr("href"));
            console.log($(this).attr("href"));
        }
        return false;
    });

    $(".page .container").on("click", "a.innerlink", function(){
        loadPage($(this).attr("href"));

        return false;
    });

    $(".page .container").on("focusin", ".contacts input", function(){
        $(this).siblings("i").addClass("active");
    });
    $(".page .container").on("focusout", ".contacts input", function(){
        $(this).siblings("i").removeClass("active");
    });

    MakeMenu($(".mainmenu .menu-items > .menuitem").length);

    var hashlink = window.location.hash;
    if(hashlink != ""){$('a[href*="'+hashlink.substr(1)+'"]').click();}
    else {$(".mainmenu .menu-items .menuitem:first").click();}

    $(".page .container").on("click", ".portfolio .nright", function(){
        SlideNext();
    });
    $(".page .container").on("click", ".portfolio .nleft", function(){
        SlidePrev();
    });

    Resizer();


    var Nmenu = 0;
    $(".additem").on("click", function(){

        if (Nmenu <= 8) {
        $(".mainmenu .menu-items").append("<a href='pages/demo.html' class='menuitem'><i class='icon-coffee'></i> <div class='menu-title'>Other</div></a>");
        var iCount = $(".mainmenu .menu-items > .menuitem").length;
        MakeMenu(iCount);

        $(".mainmenu .menu-items .menuitem:first").click();

        Nmenu++;
        }
        return false;
    });
});

$(window).resize(function(){
    Resizer();
});