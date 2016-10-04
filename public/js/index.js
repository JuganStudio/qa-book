(function () {
    'use strict';

    var $questionInput;
    var $submitBtn;

    function postQuestion(question, cb) {
        var url = '/api/question';

        var request;

        if (window.ActiveXObject) {
            request = new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            alert('You are using too old browser!');
            return;
        }

        request.open('POST', url, true);
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/json');

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) cb(null, JSON.parse(request.responseText));
                else cb({
                    status: request.status,
                    message: JSON.parse(request.responseText)
                });
            }
        };

        request.send(JSON.stringify({ question: question }));
    }

    function submitQuestion() {
        var question = $questionInput.value;

        postQuestion(question, function (error) {
            if (!error) {
                location.href = '/result';
            }
        });
    }

    function boot() {
        $questionInput = document.getElementById('questionInput');
        $submitBtn = document.getElementById('submit');

        if ($submitBtn.addEventListener) {
            $submitBtn.addEventListener('click', submitQuestion);
        } else if ($submitBtn.attachEvent) {
            $submitBtn.attachEvent('onclick', submitQuestion);
        }
    }

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', boot, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', boot);
    } else {
        alert('You are using too old browser!');
    }
})();
