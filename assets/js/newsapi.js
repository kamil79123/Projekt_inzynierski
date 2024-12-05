async function fetchNews(search, language, prioritydomain, search_fields, country, sort) {
    const loadingSpinner = document.getElementById('loader');
    loadingSpinner.style.display = 'block';  // Pokaż animację wczytywania
    const container = document.getElementById('row-3');  // Element HTML, gdzie będą wyświetlane artykuły
    $('#found').html('');
    $(container).html('');
    let i = 0;
    let params = {
        query: search,
        language: language,
        prioritydomain: prioritydomain,
        country: country
    };
    // Tworzenie zapytania do serwera PHP
    let query = new URLSearchParams(params).toString();
    let apiUrl;
    if ($('#search-titles').is(':checked')) {
        apiUrl = "../../proxy-title.php?" + query;
    }
    else {
        apiUrl = "../../proxy.php?" + query;
    }
    let str = '';  // Zmienna przechowująca wygenerowany HTML
    try {
        // Pobranie danych z serwera PHP
        const response = await fetch(apiUrl);
        if (!response.ok) {
            loadingSpinner.style.display = 'none';
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Przetwarzanie odpowiedzi JSON
        const data = await response.json();
        let articles = data.results;
        if (!articles) {
            loadingSpinner.style.display = 'none';
            throw new Error('Brak artykułów w odpowiedzi z API');
        }
        if (sort == 'new') {
            loadingSpinner.style.display = 'none';
            articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        }
        else {
            loadingSpinner.style.display = 'none';
            articles.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
        }
        // Iteracja po artykułach i generowanie HTML
        for (let article of articles) {
            let icon = article.source_icon || './assets/media/news-icon.png';
            let description = article.description || 'Więcej treści po kliknięciu w link prowadzący do artykułu';
            let articleHTML = `<div class="mx-auto col-xs-10 col-sm-5 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 anim flex my-3 text-center"><div class="card"><img src="${article.image_url}" class="card-img-top" alt="..."><span class="category">${article.category}</span><img class="icon" src="${icon}"><span class="country">${article.country}, ${article.source_url}</span><div class="card-body"><h5 class="card-title">${article.title}</h5><p class="card-text">${description}</p><p class="date mb-5">${article.pubDate}</p><div style="margin-top: 5vh"><a href="${article.link}" target="_blank" class="position-absolute bottom-0 translate-middle article-btn btn btn-primary">Czytaj dalej</a></div></div></div></div>`;
            str += articleHTML;
            i++;
        }
        // Dodanie wygenerowanego HTML do kontenera
        container.innerHTML = str;
        $('#found').html('Znaleziono ' + i + ' artykułów');
    } catch (error) {
        // Obsługa błędów, np. problem z pobraniem danych
        loadingSpinner.style.display = 'none';
        console.error("Błąd podczas pobierania lub przetwarzania danych:", error);
        container.innerHTML = "<p>Nie udało się załadować artykułów. Spróbuj ponownie później.</p>";
    }
}
