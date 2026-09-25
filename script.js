let aktuelleKategorie = "alle";


// =========================
// PRODUKTSUCHE
// =========================

function filterProdukte(kategorie) {
    aktuelleKategorie = kategorie;
    produkteAnzeigen();
}

function sucheProdukte() {
    produkteAnzeigen();
}

function produkteAnzeigen() {

    const suchfeld = document.getElementById("produktsuche");

    if (!suchfeld) {
        return;
    }

    const suchbegriff = suchfeld.value.toLowerCase();

    const produkte = document.querySelectorAll(".product-card");

    let anzahl = 0;

    produkte.forEach(function(produkt) {

        const name = produkt
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const kategorie =
            produkt.dataset.kategorie.toLowerCase();

        const passtZurSuche =
            name.includes(suchbegriff) ||
            kategorie.includes(suchbegriff);

        const passtZurKategorie =
            aktuelleKategorie === "alle" ||
            kategorie === aktuelleKategorie;

        if (passtZurSuche && passtZurKategorie) {
            produkt.style.display = "block";
            anzahl++;
        } else {
            produkt.style.display = "none";
        }

    });

    const anzeige =
        document.getElementById("produktAnzahl");

    if (anzeige) {
        anzeige.textContent =
            anzahl +
            (anzahl === 1
                ? " Produkt gefunden"
                : " Produkte gefunden");
    }
}


// =========================
// FAVORIT SPEICHERN
// =========================

function favoritSetzen(produkt, button) {

    let favoriten =
        JSON.parse(localStorage.getItem("favoriten")) || [];

    if (!favoriten.includes(produkt)) {
        favoriten.push(produkt);
    }

    localStorage.setItem(
        "favoriten",
        JSON.stringify(favoriten)
    );

    button.textContent = "⭐ Ausgewählt";

    favoritAnzeigen();
}


// =========================
// FAVORIT ANZEIGEN
// =========================

function favoritAnzeigen() {

    const favoriten =
        JSON.parse(localStorage.getItem("favoriten")) || [];

    const anzeige =
        document.getElementById("favoriteAnzeige");

    if (!anzeige) {
        return;
    }

    if (favoriten.length === 0) {

        anzeige.innerHTML =
            "⭐ Du hast noch keine Favoriten ausgewählt.";

        return;
    }

    anzeige.innerHTML = "";

    favoriten.forEach(function(produkt) {

        const zeile =
            document.createElement("div");

        zeile.innerHTML =
            "⭐ " + produkt +
            ' <button onclick="favoritEntfernen(\'' +
            produkt +
            '\')">❌</button>';

        anzeige.appendChild(zeile);
    });
}


// =========================
// FAVORIT ENTFERNEN
// =========================

function favoritEntfernen(produkt) {

    let favoriten =
        JSON.parse(localStorage.getItem("favoriten")) || [];

    favoriten = favoriten.filter(function(favorit) {
        return favorit !== produkt;
    });

    localStorage.setItem(
        "favoriten",
        JSON.stringify(favoriten)
    );

    favoritAnzeigen();
}


// =========================
// WARENKORB
// =========================

function inWarenkorb(produkt, preis) {

    let warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    warenkorb.push({
        name: produkt,
        preis: preis
    });

    localStorage.setItem(
        "warenkorb",
        JSON.stringify(warenkorb)
    );

    alert(produkt + " wurde zum Warenkorb hinzugefügt!");
}


// =========================
// WARENKORB
// =========================

function inWarenkorb(produkt, preis) {

    let warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    const vorhandenerArtikel =
        warenkorb.find(function(artikel) {
            return artikel.name === produkt;
        });

    if (vorhandenerArtikel) {

        vorhandenerArtikel.menge++;

    } else {

        warenkorb.push({
            name: produkt,
            preis: preis,
            menge: 1
        });
    }

    localStorage.setItem(
        "warenkorb",
        JSON.stringify(warenkorb)
    );
warenkorbAnzahlAnzeigen();
    
}


// =========================
// WARENKORB ANZEIGEN
// =========================

function warenkorbAnzeigen() {
function mengeAendern(index, aenderung) {

    let warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    warenkorb[index].menge += aenderung;

    if (warenkorb[index].menge <= 0) {
        warenkorb.splice(index, 1);
    }

    localStorage.setItem(
        "warenkorb",
        JSON.stringify(warenkorb)
    );

    warenkorbAnzeigen();
}
    const anzeige =
        document.getElementById("warenkorbAnzeige");

    const summe =
        document.getElementById("warenkorbSumme");

    if (!anzeige) {
        return;
    }

    const warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    if (warenkorb.length === 0) {

        anzeige.textContent =
            "Dein Warenkorb ist leer.";

        if (summe) {
            summe.textContent = "";
        }

        return;
    }

    anzeige.innerHTML = "";

    let gesamtpreis = 0;

    warenkorb.forEach(function(artikel, index) {

        const zeile =
            document.createElement("div");

            zeile.className = "cart-item";

        zeile.innerHTML =
    '<div>' +
        '<div class="cart-item-name">🛒 ' +
        artikel.name +
        '</div>' +
        '<div class="cart-item-price">' +
        artikel.preis.toFixed(2) +
        ' €</div>' +
    '</div>';

const minusButton =
    document.createElement("button");

minusButton.textContent = "➖";

minusButton.onclick = function() {
    mengeAendern(index, -1);
};

const mengeAnzeige =
    document.createElement("span");

mengeAnzeige.textContent =
    " " + artikel.menge + " ";

const plusButton =
    document.createElement("button");

plusButton.textContent = "➕";

plusButton.onclick = function() {
    mengeAendern(index, 1);
};

const entfernenButton =
    document.createElement("button");

entfernenButton.textContent = "❌ Entfernen";

entfernenButton.onclick = function() {
    artikelEntfernen(index);
};

zeile.appendChild(minusButton);
zeile.appendChild(mengeAnzeige);
zeile.appendChild(plusButton);
zeile.appendChild(entfernenButton);

anzeige.appendChild(zeile);

        

        anzeige.appendChild(zeile);

        gesamtpreis += artikel.preis * artikel.menge;
    });

    if (summe) {

        summe.textContent =
            "💰 Gesamtsumme: " +
            gesamtpreis.toFixed(2) +
            " €";
    }
}


// =========================
// ARTIKEL ENTFERNEN
// =========================

function artikelEntfernen(index) {

    let warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    warenkorb.splice(index, 1);

    localStorage.setItem(
        "warenkorb",
        JSON.stringify(warenkorb)
    );

    warenkorbAnzeigen();
}
function warenkorbAnzahlAnzeigen() {

    const link =
        document.getElementById("warenkorbLink");

    if (!link) {
        return;
    }

    const warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    let anzahl = 0;

    warenkorb.forEach(function(artikel) {
        anzahl += artikel.menge;
    });

    link.textContent =
        "🛒 Warenkorb (" + anzahl + ")";
}

// =========================
// BEIM LADEN
// =========================

favoritAnzeigen();
warenkorbAnzeigen();
warenkorbAnzahlAnzeigen();
// =========================
// KASSE
// =========================

function kasseAnzeigen() {

    const anzeige =
        document.getElementById("kassenAnzeige");

    const summe =
        document.getElementById("kassenSumme");

    if (!anzeige) {
        return;
    }

    const warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    if (warenkorb.length === 0) {

        anzeige.textContent =
            "Dein Warenkorb ist leer.";

        if (summe) {
            summe.textContent = "";
        }

        return;
    }

    anzeige.innerHTML = "";

    let gesamtpreis = 0;

    warenkorb.forEach(function(artikel) {

        const zeile =
            document.createElement("div");

        zeile.className = "checkout-item";

        const preis =
            artikel.preis * artikel.menge;

        zeile.innerHTML =
            "<span>" +
            artikel.name +
            " × " +
            artikel.menge +
            "</span>" +
            "<strong>" +
            preis.toFixed(2) +
            " €</strong>";

        anzeige.appendChild(zeile);

        gesamtpreis += preis;
    });

    if (summe) {

        summe.textContent =
            "💰 Gesamtsumme: " +
            gesamtpreis.toFixed(2) +
            " €";
    }
}


// =========================
// BESTELLUNG ABSCHLIESSEN
// =========================

function bestellungAbschliessen() {

    const warenkorb =
        JSON.parse(localStorage.getItem("warenkorb")) || [];

    if (warenkorb.length === 0) {
        return;
    }

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const adresse =
        document.getElementById("adresse").value.trim();

    const ort =
        document.getElementById("ort").value.trim();

    const zahlung =
        document.getElementById("zahlung").value;

    if (!name || !email || !adresse || !ort) {

        alert("Bitte fülle alle Lieferdaten aus.");

        return;
    }

    if (zahlung === "karte") {

        const kartennummer =
            document.getElementById("kartennummer").value.trim();

        const ablaufdatum =
            document.getElementById("ablaufdatum").value.trim();

        const cvc =
            document.getElementById("cvc").value.trim();

        if (!kartennummer || !ablaufdatum || !cvc) {

            alert("Bitte fülle die Demo-Kartendaten aus.");

            return;
        }
    }

    const bestellnummer =
        "TD-" + Math.floor(100000 + Math.random() * 900000);
let bestellteProdukte = "";
let bestellGesamtpreis = 0;

warenkorb.forEach(function(artikel) {

    const artikelPreis =
        artikel.preis * artikel.menge;

    bestellGesamtpreis += artikelPreis;

    bestellteProdukte +=
        "<div class=\"ordered-product\">" +
            "<span>" +
                artikel.name +
                " × " +
                artikel.menge +
            "</span>" +
            "<strong>" +
                artikelPreis.toFixed(2) +
                " €" +
            "</strong>" +
        "</div>";
});
    localStorage.removeItem("warenkorb");

    warenkorbAnzahlAnzeigen();

    const anzeige =
        document.getElementById("kassenAnzeige");

    const summe =
        document.getElementById("kassenSumme");

    const button =
        document.querySelector(".order-button");

    if (anzeige) {

    anzeige.innerHTML =
        '<div class="success-message">' +
            '<div class="success-icon">✅</div>' +
            '<h2>Bestellung abgeschlossen!</h2>' +
            '<p>Vielen Dank für deine Demo-Bestellung.</p>' +

            '<p><strong>Bestellnummer: ' +
            bestellnummer +
            '</strong></p>' +

            '<div class="ordered-products">' +
                '<h3>🧾 Deine Bestellung</h3>' +
                bestellteProdukte +
                '<div class="ordered-total">' +
                    'Gesamtsumme: ' +
                    bestellGesamtpreis.toFixed(2) +
                    ' €' +
                '</div>' +
            '</div>' +

            '<p>Es wurde keine echte Bestellung aufgegeben.</p>' +

            '<a href="produkte.html" class="back-to-products">' +
                '🛍️ Zurück zu den Produkten' +
            '</a>' +

        '</div>';
}

    if (summe) {
        summe.textContent = "";
    }

    if (button) {
        button.style.display = "none";
    }
}
// =========================
// ZAHLUNGSART
// =========================

function zahlungsartAendern() {

    const zahlung =
        document.getElementById("zahlung");

    const kartenDaten =
        document.getElementById("kartenDaten");

    if (!zahlung || !kartenDaten) {
        return;
    }

    if (zahlung.value === "karte") {
        kartenDaten.style.display = "block";
    } else {
        kartenDaten.style.display = "none";
    }
}