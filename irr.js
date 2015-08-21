///////
// Adverigo start
///////

function initCaptcha(is_popup)
{
  if (!isAdverigoAllowed()) {
    return;
  }

  var wrapper = $('#advertCreate #adverigo-wrapper');
  if (is_popup && wrapper.length) {
    duplicateAdverigo();
  } else {
    var script = document.createElement('script');
    script.src = 'http://js.adverigo.com/26a6e39dbbdacc1f.js';
    document.body.appendChild(script);
  }

  window.captcha_loading = true;
  setCaptchaTimeLimit();
}

function setCaptchaTimeLimit()
{
  $('.internal-captcha').hide();
  $('.adverigo-captcha').hide();
  setTimeout(function(){
    if (!isAdverigoSet()) {
      $('.internal-captcha').show();
    } else {
      $('.adverigo-captcha').show();
      duplicateAdverigo();
    }
    window.captcha_loading = false;
  }, 1500);
}

function refreshAdverigoCaptcha()
{
  if (window.captcha_loading || !isAdverigoAllowed()) {
    return;
  }

  window.captcha_loading = true;

  if (typeof Captcha == 'undefined' || $('#adverigo-wrapper img').length == 0) {
    initCaptcha();
  } else {
    $('.adverigo-wrapper img, #adverigo-wrapper img').each(function(){
      $(this).attr('src', '');
    });
    Captcha.refresh();
    $('.internal-captcha').hide();
    $('.adverigo-captcha').show();
    setCaptchaTimeLimit();
  }
}

function duplicateAdverigo()
{
  var wrapper = $('#advertCreate #adverigo-wrapper');
  if (wrapper.length) {
    $('.adverigo-wrapper').each(function ()
    {
      $(this).html(wrapper.html());
    });
  }
}

function isAdverigoSet()
{
  var src = $('#adverigo-wrapper img').attr('src');
  return (src && typeof window.AdvCaptchaID != 'undefined');
}

function isAdverigoAllowed()
{
  return $('#adverigo-wrapper').length > 0;
}

$(window).bind('adverigo', function(){
  if (typeof Captcha != 'undefined') {
    Captcha.setDiv('adverigo-wrapper');
    Captcha.init();
  }
});

$('.adverigo-captcha .recaptcha').live("click", function(){
  refreshAdverigoCaptcha();
});