const cards = document.getElementById('cards')
const cardsArray = [];
let loadedCount = 0;
let cardsData = [];
let likedIndex = {};


let monthNames =["Jan","Feb","Mar","Apr",
    "May","Jun","Jul","Aug",
    "Sep", "Oct","Nov","Dec"];

const likeCard = (index) => {
    if(likedIndex[index]) {
        cardsData[index].likes = parseInt(cardsData[index].likes) - 1;
        likedIndex[index] = false;
    }else{
        cardsData[index].likes = parseInt(cardsData[index].likes) + 1;
        likedIndex[index] = true;
    }


    generateCards();
    renderCards();
}

const generateCardHtml = (cardDataElement, idx) => {
    const date = new Date(cardDataElement.date);
    const dateString = `${date.getDay()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
    return `
                <div class="responsive">
                    <div class="instagram-card">
                        <div class="instagram-card-header">
                            <div class="inline-block" style="margin-right: 5px">
                                <img src="${cardDataElement.profile_image}" class="instagram-card-user-image"/>
                            </div>
                            <div class="inline-block">
                                <a class="instagram-card-user-name">${cardDataElement.name}</a>
                                    <a href=${cardDataElement.source_link}>
                                        <img class="source-type" src="${
                                            cardDataElement.source_type === "facebook"
                                                ? "/images/facebook.svg"
                                                : "images/instagram-logo.svg"
                                        }" alt="Social Media Link">
                                </a>
                                <div class="instagram-card-date">${dateString}</div>
                            </div>
                        </div>
                        <div class="instagram-card-image">
                            <img class="instagram-card-image-main" src="${cardDataElement.image}"/>
                        </div>
                        <div class="instagram-card-content">
                            <p class="instagram-card-content-user">${cardDataElement.caption}</p>
                            <hr>
                            <div class="likes-heart">
                                <img class="heart-button" src=${likedIndex[idx] ? "/images/heartFull.svg" : "/images/heart.svg"} onclick="likeCard(${idx})">
                                <p class="likes" >${cardDataElement.likes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
}

const generateCards = () => {
    cardsArray.splice(0, cardsArray.length)
    for (let i = 0; i < loadedCount; i++) {
        let card = generateCardHtml(cardsData[i], i);
        cardsArray.push(card);
    }
}

const renderCards = () => {
    cards.innerHTML="";
    cardsArray.forEach(card => {
        cards.innerHTML += card
    })
}

const loadCards = () => {
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            const arrLength = cardsArray.length;
            const totalLength = data.length;
            let toLoad = 4;
            if (totalLength - arrLength <= 4) {
                toLoad = totalLength - arrLength;
                const button = document.getElementsByClassName("load-button")[0];
                button.style.display = "none";
            }
            for (let i = arrLength; i < arrLength + toLoad; i++) {
                const card = generateCardHtml(data[i], i);
                loadedCount += 1;
                cardsArray.push(card);
            }
            cardsData = data;
            renderCards();
        });
};

window.addEventListener("load", () => {
    loadCards()
})