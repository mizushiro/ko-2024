

$(function(){
    kmController.setPageCommon();

    $("[data-pageType]").each(function(){
        let pageType = $(this).attr("data-pageType");
        kmController[pageType]();
    });
});


var kmController = {

    /*
    * ********************************************** 공통 설정 ************************************************
    * */
    setPageCommon: function(){
        /*
        * *** 팝업버튼 클릭 시 해당 슬라이드로 이동
        * */
        $(".popBtn").on("click", function(){
            if($(this).attr("data-targetSlideNum")){
                var popNum = $(this).attr("data-popup-btn");
                var targetNum = $(this).attr("data-targetSlideNum");

                $(".popup_container [data-popup-page="+popNum+"]").find(".basicSlider_circle_tabs li").eq(targetNum-1).trigger("click");
            }
        });

        // /*
        // * *** close 클릭시 btn에 popupOn class 지워주기 (클릭시 안열리는거 방지)
        // * */
        //
        // $("body").on('click', ".popup_closeBtn", function (){
        //     $('.popBtn').removeClass('popupOn');
        // });


        /*
        * *** 오디오버튼 클릭 시
        * */
        $('.balloon').hide();
        // $('.popBtn.speech').on('click',function (){
        //
        // });

        $(".popBtn.speech").on("click", function(){
            let audioPath = $(this).attr("data-audio");
            if($(this).hasClass('on')){
                KmAudioPlayer.stop();
                $(this).removeClass('on');
                $(this).parents('.balloonBox').find('.balloon').hide();
            }else{
                $(this).addClass('on');
                $(this).parents('.balloonBox').find('.balloon').show();
                KmAudioPlayer.stop();
                KmAudioPlayer.play(audioPath);
            }

        });




    },


    /*
    * *********************************************** checkCommon ********************************************
    * */
    checkCommon: function(){
        $('.check_view .check_box').on('click',function (){
            if ($(this).parents('.check_view').find(".check_box").length > 0) {
                $(this).parents('.check_view').find(".check_box").find("p").remove();
            }
            let redClick = $(this)
                .find("p")
                .attr("class");
            if (redClick === "red_check") {
                $(this)
                    .find("p")
                    .remove();
            } else {
                $(this).append("<p class='red_check'></p>");
            }
        })
    },


    /*
    * *********************************************** checkWithEx ********************************************
    * */
    checkWithEx: function(){
        kmController.checkCommon();

        $('.examViewBtn').on('click',function (){
            if ($(this).hasClass("reset")) {
                $(this).removeClass("reset");
                $(this).parents("li").find(".check_view").removeAttr("style");
                $(this).parents("li").find(".check_view .check_box p").remove();
            } else {
                $(this).addClass("reset");
                $(this).parents("li").find(".check_view").css("pointer-events", "none");
                $(this).parents("li").find(".check_view .check_box p").remove();
                $(this).parents("li").find(".check_view .check_box.check_ans").append("<p class='blue_check'></p>");
            }
        })
    },


    /*
    * *********************************************** checkAlone ********************************************
    * */
    checkAlone: function(){
        kmController.checkCommon();


    },



}



/*
* *** 오디오 플레이 설정
* */
var KmAudioPlayer = {
    audioObj : null,

    play : function(_src, _callback){
        audioObj = new Audio(_src);
        audioObj.play();
        audioObj.addEventListener("ended", function(){
            if(typeof(_callback) == "function"){
                _callback();
            }
        });
    },

    setVolume : function(_volume){
        audioObj.volume = _volume;
    },

    stop : function(){
        try{
            audioObj.pause();
        }catch (error){

        }
    },

    playGroup : function(_arrSound, _callback, _betweenGap){
        var numSound = _arrSound.length;
        var currentTurn = 1;
        var betweenGap = (_betweenGap == undefined) ? 1000 : _betweenGap;

        playSound();

        function playSound(){
            audioObj = new Audio(_arrSound[currentTurn-1]);
            audioObj.play();
            audioObj.addEventListener("ended", function(){
                if(typeof(_callback) == "function"){
                    if(_callback != null){
                        _callback();
                    }
                }else{
                    currentTurn++;
                    setTimeout(function(){
                        playSound();
                    }, betweenGap);
                }
            });
        }
    },//playGroup

    //버튼 클릭음
    buttonClick : function(){
        var snd;
        snd = new Audio("media/effect/event_click.mp3");
        snd.play();
    },

};//AudioPlayer




//
// $(document).on("click", ".examViewBtn", function () {
//     // efSound('./media/tab_click.mp3');
//     // textReset();
//     if ($(this).hasClass("reset")) {
//         $(this).addClass("reset");
//
//         $(this).parents("li").find(".check_view").css("pointer-events", "none");
//         $(this).parents("li").find(".check_view .check_box p").remove();
//         $(this).parents("li").find(".check_view .check_box.check_ans").append("<p class='blue_check'></p>");
//     } else {
//         $(this).removeClass("reset");
//         $(this).parents("li").find(".check_view").removeAttr("style");
//         $(this).parents("li").find(".check_view .check_box p").remove();
//     }
// });

// $(function (){
//     $(document)
//         .find(".check_view .check_box")
//         .on("click", function () {
//             // efSound("./media/click.mp3");
//             if ($(this).parent().siblings(".check_view").find(".check_box").children().length > 0) {
//                 $(this)
//                     .parent()
//                     .siblings(".check_view")
//                     .find(".check_box")
//                     .find("p")
//                     .remove();
//             }
//             let redClick = $(this)
//                 .find("p")
//                 .attr("class");
//             if (redClick === "red_check") {
//                 $(this)
//                     .find("p")
//                     .remove();
//             } else {
//                 $(this).append("<p class='red_check'></p>");
//             }
//         });
// })
//




