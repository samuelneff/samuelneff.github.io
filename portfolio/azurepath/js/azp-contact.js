$(function() {

    var $form = $('form.azp-contact-form');

    $form.submit(function(e) {

        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;

        sendMail();

        return false;
    });

    function sendMail() {
        var $name = $('input[name=name]');
        var $email = $('input[name=email]');
        var $content = $('textarea[name=message]');

        var name = $name.val() || '';
        var email = $email.val() || '';
        var content = $content.val() || '';

        if (name.length === 0) {
            $name.focus();
            return;
        }

        if (email.length === 0) {
            $email.focus();
            return;
        }


        if ($content.length === 0) {
            content = 'Inquiring about weekly webinar.';
        } else if (content.length === 0) {
            $content.focus();
            return;
        }

        var mail = {
            name: name,
            email: email,
            content: content
        };

        var host = location.hostname === '' || location.hostname === 'localhost' ? 'azp' : 'azurepath';
                   
        var req = {
            type: 'POST',
            url: 'https://website-contact.' + host + '.com/website-contact',
            crossDomain: true,
            data: JSON.stringify(mail),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        };

        $.ajax(req);


        var $parent = $form.parent();
        var msg = $form.attr('data-success');

        $form.remove();
        $parent.append($('<div class="submit-success"></div>').text(msg));
    }

});

