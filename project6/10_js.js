function showFilter() {
    const filterMenu = document.getElementById('filterContent');
    const addArticleForm = document.getElementById('newContent');

    if (filterMenu.style.display === 'block') {
        filterMenu.style.display = 'none';
    } else {
        filterMenu.style.display = 'block';
        addArticleForm.style.display = 'none';
    }
}


function showAddNew() {
    const addArticleForm = document.getElementById('newContent');
    const filterMenu = document.getElementById('filterContent');

    if (addArticleForm.style.display === 'flex') {
        addArticleForm.style.display = 'none';
    } else {
        addArticleForm.style.display = 'flex';
        filterMenu.style.display = 'none';
    }
}
function filterArticles() {
    const showOpinion = document.getElementById('opinionCheckbox').checked;
    const showRecipe = document.getElementById('recipeCheckbox').checked;
    const showUpdate = document.getElementById('updateCheckbox').checked;

    const opinions = document.querySelectorAll('article.opinion');
    const recipes = document.querySelectorAll('article.recipe');
    const updates = document.querySelectorAll('article.update');

    opinions.forEach(article => article.style.display = showOpinion ? 'block' : 'none');
    recipes.forEach(article => article.style.display = showRecipe ? 'block' : 'none');
    updates.forEach(article => article.style.display = showUpdate ? 'block' : 'none');
}

function addNewArticle() {
    const title = document.getElementById('inputHeader').value;
    const text = document.getElementById('inputArticle').value;

    let typeClass = "";
    let markerText = "";

    if (document.getElementById('opinionRadio').checked) {
        typeClass = "opinion";
        markerText = "Opinion";
    } else if (document.getElementById('recipeRadio').checked) {
        typeClass = "recipe";
        markerText = "Recipe";
    } else if (document.getElementById('lifeRadio').checked) {
        typeClass = "update";
        markerText = "Update"; 
    } else {
        alert("Please select an article type.");
        return;
    }

    if (title.trim() === "" || text.trim() === "") {
        alert("Please enter a title and text for your article.");
        return;
    }

    const newArticle = document.createElement('article');
    newArticle.className = typeClass;

    const marker = document.createElement('span');
    marker.className = "marker";
    marker.textContent = markerText;

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const p = document.createElement('p');
    p.textContent = text;

    newArticle.appendChild(marker);
    newArticle.appendChild(h2);
    newArticle.appendChild(p);

    document.getElementById('articleList').appendChild(newArticle);

    document.getElementById('newContent').reset();
}