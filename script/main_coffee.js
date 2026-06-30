const api_url = "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json"

let cafeList = []

async function fetchcafe() {
    try {
        const response = await fetch(api_url);
        cafeList = await response.json();
        renderCafes(cafeList);
    } catch (error) {
        console.error("Error al obtener datos caferteria", error);
    }
}

function renderCafes(list) {
    const grid = document.getElementById('cafe_grill');
    grid.innerHTML = "";

    list.forEach(cafe => {
        const card = document.createElement("div");
        card.className = "cafe_card";

        card.innerHTML = `
            ${cafe.popular ? `<span class="insig_pop">Popular</span>` : ""}
            <img src="${cafe.image}" alt="${cafe.name}" class="cafe_img">
            <div class="cafe_info">
                <h3 class="cafe_nombre">${cafe.name}</h3>
                <span class="cafe_precio">${cafe.price}</span>
            </div>
            <div class="cafe_pie">
                <div class="cal_box">
                    <span>${cafe.rating ? "⭐" : "      "}</span>
                    <span>${cafe.rating ? cafe.rating : '<span style="color: #6F757C;">Sin Calificación</span>'}</span>
                    <span class="votes">${cafe.votes ? `(${cafe.votes} Calificaciones)` : ""}</span>
                </div>
                ${cafe.available ? "" : `<span class="sold-out">Sin Stock</span>`}
            </div>
        `
        grid.appendChild(card)
    })
}

const botTod = document.getElementById("bot_todo");
const botDisp = document.getElementById("bot_disp");

botTod.addEventListener("click", ()=> {
    botTod.classList.add("active");
    botDisp.classList.remove("active");
    renderCafes(cafeList)
});

botDisp.addEventListener("click", ()=> {
    botDisp.classList.add("active");
    botTod.classList.remove("active");


    const dispSol = cafeList.filter(cafe => cafe.available === true);
    renderCafes(dispSol);

});

fetchcafe();