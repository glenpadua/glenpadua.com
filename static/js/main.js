console.log('Main.js loaded');

$('#create-questionnaire').click(function() {
    console.log('Clicked..');
    var data = {};
    data.text = $('#title').val();
    data.description = $('#description').val();
    data.questions = [];
    data.results = [];

    // Iterate each question
    $('.question-wrapper').each(function(index) {
        var question = {};
        question.text = $(this).find('.text').val();
        question.description = $(this).find('.description').val();
        question.answers = [];

        // Iterate each option
        $(this).find('.option').each(function(index) {
            question.answers.push($(this).val());
        });

        data.questions.push(question);
    });

    // Iterate each result
    $('.result').each(function(index) {
        var result = {};
        result.text = $(this).find('.text').val();
        result.description = $(this).find('.description').val();
        result.answer_set = $(this).find('.answer-set').val();

        data.results.push(result);
    });

    var payload = {
        'data': data
    };
    console.log(payload);

    $.ajax({
        type: 'POST',
        url: '/api/v1/questionnaires',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: 'json',
        success: function(payload) {
            $('#status').find('.body').html('Questionnaire created!');
        }
    });
});

$('#submit-answers').click(function() {
    var answerSet = '';
    $('.question').each(function() {
        answerSet += $(this).find('input[type=radio]:checked').val().toString();
        answerSet += ',';
    });
    answerSet = answerSet.slice(0, -1);

    var payload = {
        'data': {
            'answer_set': answerSet,
        }
    };
    console.log(payload);

    $.ajax({
        type: 'POST',
        url: '/api/v1/questionnaires/' + questionnaire_id,
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: 'json',
        success: function(payload) {
            console.log(payload);
            $('#status').find('.head').html(payload.data.text);
            $('#status').find('.body').html(payload.data.description);
        }
    });
});

$('#login').click(function() {
    console.log('Login started');
    var payload = {
        'data': {
            'email': $('#email').val(),
            'password': $('#password').val(),
        }
    };
    console.log(payload);

    $.ajax({
        type: 'POST',
        url: '/ajax/login',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: 'json',
        success: function(payload) {
            console.log(payload);
            $('#status-login').show().find('.alert').text(payload.message);
            location.reload();
        }
    });
});

$('#register').click(function() {
    console.log('Registration started');
    var payload = {
        'data': {
            'name': $('#name').val(),
            'email': $('#new-email').val(),
            'password': $('#new-password').val(),
        }
    };
    console.log(payload);

    $.ajax({
        type: 'POST',
        url: '/ajax/register',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: 'json',
        success: function(payload) {
            console.log(payload);
            $('#status-reg').show().find('.alert').text(payload.message);
            $('#account-exists').hide();
        }
    });
});

$('#upvote, #downvote').click(function(e) {
    if ($(e.target).attr('id') == 'upvote') {
        console.log('Upvoting');
        var vote = 1;
    } else {
        console.log('Downvoting');
        var vote = -1;
    }
    var payload = {
        'data': {
            'vote': vote,
        }
    };
    console.log(payload);

    $.ajax({
        type: 'POST',
        url: '/api/v1/questionnaires/' + questionnaire_id + '/vote',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: 'json',
        success: function(payload) {
            if (vote == 1) {
                $('#upvote').val('Upvoted!').attr('data-voted', 'true');
            } else {
                $('#downvote').val('Downvoted!').attr('data-voted', 'true');
            }
            console.log(payload);
        }
    });
});

/* Adding and Deleting Questions and Options */

var max_questions_count = 20;
var max_options_count = 6;

// Add an option
$('div.questions').on('click', 'div.option-add', function() {
    var optnum = $(this).closest('.question-wrapper').find('.option').length; // Get the current number of options
    var option_html = '<div class="option"> <div class="col-md-8"> <span class="input input--ruri"> <input class="input__field input__field--ruri" type="text" id="title"/> <label class="input__label input__label--ruri" for="input-26"> <span class="input__label-content input__label-content--ruri"><i class="fa fa-circle-thin"></i> Option '+ (optnum + 1) +'</span> </label> </span> </div><div class="col-md-2 option-del"> <i class="fa fa-times-circle fa-2x" title="Remove"></i> </div></div>';
    if (optnum < max_options_count - 1) {
        $(this).prev().before(option_html);
    }
    else {
        $(this).prev().before(option_html);
        $(this).hide(); // Hide the add button if 6 options reached
    }
});

// Remove an option
$('div.questions').on('click', 'div.option-del', function() {
    var add_option = $(this).closest('.question-wrapper').find('.option-add');
    if (!add_option.is(':visible')) {
        add_option.show(); // Show the add option button if it is hidden
    }
    $(this).closest('.option').remove();
});

// Add a question
$('.question-add').click(function() {
    //event.preventDefault();
    var questnum = $(this).closest('.questions').find('.question-wrapper').length;
    var question_html = '<div class="question-wrapper"> <div class="question col-md-11"> <span class="input input--ruri"> <input class="input__field input__field--ruri" type="text" id="title"/> <label class="input__label input__label--ruri" for="input-26"> <span class="input__label-content input__label-content--ruri">Question '+ (questnum + 1) +'</span> </label> </span> </div><div class="question-del col-md-1"> <i class="fa fa-times-circle fa-2x" title="Remove Question"></i> </div><div class="options col-md-12"> <div class="option"> <div class="col-md-8"> <span class="input input--ruri"> <input class="input__field input__field--ruri" type="text" id="title"/> <label class="input__label input__label--ruri" for="input-26"> <span class="input__label-content input__label-content--ruri"><i class="fa fa-circle-thin"></i> Option 1</span> </label> </span> </div><div class="col-md-2 option-del"> <i class="fa fa-times-circle fa-2x" title="Remove"></i> </div></div><div class="clearfix"></div><div class="col-md-2 option-add"> <i class="fa fa-plus-circle"></i> Add Option </div></div></div><hr class="divider">';

     if (questnum < max_questions_count - 1) {
        $(this).before(question_html);
    }
    else {
        $(this).before(question_html);
        $(this).hide(); // Hide the add button if 20 questions reached
    }
});

$('div.questions').on('click', 'div.question-del', function() {
    //console.log('clicked');
    var question = $(this).closest('.question-wrapper');
    var add_question = $(this).closest('.questions').find('.question-add');
    if (!add_question.is(':visible')) {
        add_question.show(); // Show the add option button if it is hidden
    }
    question.next().remove();
    question.remove();
});


// Add a result
$('.result-add').click(function() {
    //event.preventDefault();
    var resnum = $(this).closest('.results').find('.result-wrapper').length;
    var result_html = '<div class="result-wrapper result"> <div class="col-md-8"> <span class="input input--ruri"> <input class="input__field input__field--ruri" type="text" id="title"/> <label class="input__label input__label--ruri" for="input-26"> <span class="input__label-content input__label-content--ruri">Result '+ (resnum + 1) +'</span> </label> </span> </div><div class="result-del col-md-1"> <i class="fa fa-times-circle fa-2x" title="Remove Result"></i> </div><div class="col-md-12"> <span class="input input--ruri"> <input class="input__field input__field--ruri" type="text" id="title"/> <label class="input__label input__label--ruri" for="input-26"> <span class="input__label-content input__label-content--ruri">Description</span> </label> </span> </div><div class="col-md-12"> <span class="input input--ruri"> <input class="input__field input__field--ruri" type="text" id="title"/> <label class="input__label input__label--ruri" for="input-26"> <span class="input__label-content input__label-content--ruri">Answer set (Eg: 3,2,3)</span> </label> </span> </div></div><hr class="divider">';

    $(this).before(result_html);
});

// Delete a result
$('div.results').on('click', 'div.result-del', function() {
    //console.log('clicked');
    var result = $(this).closest('.result-wrapper');
    result.next().remove();
    result.remove();
});


// Function for inputs
(function() {
                // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
                if (!String.prototype.trim) {
                    (function() {
                        // Make sure we trim BOM and NBSP
                        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                        String.prototype.trim = function() {
                            return this.replace(rtrim, '');
                        };
                    })();
                }

                [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
                    // in case the input is already filled..
                    if( inputEl.value.trim() !== '' ) {
                        classie.add( inputEl.parentNode, 'input--filled' );
                    }

                } );

                // events:

                $('body').on('focus', 'input.input__field', function() {
                    //console.log('clicked');
                    $(this).parent().addClass('input--filled');
                });

                $('body').on('blur', 'input.input__field', function() {
                    console.log('clicked');
                    console.log($(this));
                    if ($(this).val().length === 0 ) {
                        $(this).parent().removeClass('input--filled');
                    }

                });

            })();
