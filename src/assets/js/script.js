jQuery(document).ready(function() {

    // ハンバーガーメーニュー
    jQuery("#js-header-btn").click(function() {
        jQuery(this).toggleClass("active");
        jQuery("#js-header-nav").toggleClass("active");
    });

    // スムーススクロール
    jQuery('a[href^="#"]').click(function() {

        // スクロールスピード
        let speed = 300;
        // hrefで指定されたidを取得
        let id = jQuery(this).attr("href");
        // idのの値が#だけだったらターゲットをhtmlタグにしてtopに戻るようにする
        let target = jQuery("#" == id ? "html" : id);
        // ページのトップを基準にターゲットの位置を取得
        let position = jQuery(target).offset().top;
        // ターゲットの位置までspeedの速度で移動
        if ("fixd" !== jQuery(".header").css("position")) {
            position = jQuery(target).offset().top;
        }
        if (0 > position) {
            position= 0;
        }
        jQuery("html, body").animate(
            {
                scrollTop: position - jQuery("#js-header").outerHeight()
            },
            speed
        );
        return false;
    });
});