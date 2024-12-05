$(document).ready(function () {
    var sort = 'new';
    $('#new').click(function () {
        if (sort != 'new') {
            $('#old').toggleClass('active');
            $('#new').toggleClass('active');
            sort = 'new';
            szukaj(sort);
        }
    });
    $('#old').click(function () {
        if (sort != 'old') {
            $('#new').toggleClass('active');
            $('#old').toggleClass('active');
            sort = 'old';
            szukaj(sort);
        }
    });
    $('#search-prioritydomain').click(function () {
        szukaj(sort);
    });

    $('#search-titles').click(function () { // Wychwytujemy kliknięcie przycisku
        szukaj(sort);
    });
    $("#search-submit").click(function () { 
        szukaj(sort);
    });
});

function szukaj(sort) {
    let search = $('#search-keyword').val(); // Zmienna z zapytaniem
    let search_fields = 'title,main_text'; // Zmienna wskazująca, gdzie szukamy w artykule
    if ($('#search-titles').is(':checked')) {
        search_fields = 'title'; // Jeśli checkbox zaznaczony to szukamy tylko w tytule
    }
    let prioritydomain = 'low';
    if ($('#search-prioritydomain').is(':checked')) {
        prioritydomain = 'medium';
    }
    const selectLanguage = document.getElementById('language');
    const selectedLanguage = Array.from(selectLanguage.selectedOptions);
    const language = selectedLanguage.map(option => option.value).join(',');
    const selectCountry = document.getElementById('country');
    const selectedCountry = Array.from(selectCountry.selectedOptions);
    let country = selectedCountry.map(option => option.value).join(',');
    if (search != '' && selectedLanguage != '' && selectedCountry != '') {
        fetchNews(search, language, prioritydomain, search_fields, country, sort);
    }
    else {
        $('#found').html('<p style="color: red; font-weight: bold">Proszę uzupełnić formularz</p>');
    }
}