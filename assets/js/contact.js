!function(exports) {
  exports.submitGoogleForm = submitGoogleForm;

  function submitGoogleForm(form) {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';

    try {
      var data = [].slice.call(form).map(function(control) {
        return 'value' in control && control.name ?
          control.name + '=' + (control.value === undefined ? '' : control.value) :
          '';
      }).join('&');
      var xhr = new XMLHttpRequest();

      xhr.open('POST', form.action + '/formResponse', true);
      xhr.setRequestHeader('Accept',
          'application/xml, text/xml, */*; q=0.01');
      xhr.setRequestHeader('Content-type',
          'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.send(data);
    } catch(e) {}

    form.parentNode.className += ' submitted';

    $('#contact-form').on('submit', function(e){
      $('#registrationClosed').modal('show');
      e.preventDefault();
    });

    var res = confirm("Thank you for your message. \n\nWe will respond to you as soon as possible. \n\nKind regards, \nDreamShot Team");
    if (res == true)
    {
      window.location.replace("https://dreamshot.dreamspace.academy/");
    }

    return false;
  }
}(typeof module === 'undefined' ? window : module.exports);

