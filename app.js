const list = document.getElementById("list");
const searchInput = document.getElementById("search");
const regionSelect = document.getElementById("region");

let countries = []; 
async function getData() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok || res.status !== 200) {
            throw new Error("Xatolik: Ma'lumot olishda muammo");
        }
        countries = await res.json();
        render(countries);
    } catch (err) {
        console.error("Xatolik:", err);
    }
}
function render(data) {
    list.innerHTML = ""; 
    if (data.length) {
        data.forEach((country) => {
            const div = document.createElement("div");
            
            div.innerHTML = `
               <a  class="aria-labell" href=${`../pages/about.html?name=${country.name.common}`}>
                <img src="${country.flags.svg}" width="264" height="160" alt="${country.flags.alt}"/>
                <b>${country.name.common}</b>
               </a>
            `;
            list.append(div);
        });
    }
}


function filterCountries() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedRegion = regionSelect.value;

    const filteredCountries = countries.filter(country => {
        const countryName = country.name.common.toLowerCase();
        const countryRegion = country.region || '';
        
        return countryName.includes(searchQuery) && (selectedRegion ? countryRegion === selectedRegion : true);
    });

    render(filteredCountries);
}


searchInput.addEventListener('input', filterCountries);
regionSelect.addEventListener('change', filterCountries);

getData();
const modeToggle = document.querySelector('.fl');
const modeText = document.getElementById('mode-text');
const body = document.body;


const savedMode = localStorage.getItem('mode');


if (savedMode === 'dark') {
    body.classList.add('dark-mode');
    modeText.textContent = 'Dark Mode';
} else {
    body.classList.remove('dark-mode');
    modeText.textContent = 'Light Mode';
}


modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        modeText.textContent = 'Dark Mode';
        localStorage.setItem('mode', 'dark'); 
    } else {
        modeText.textContent = 'Light Mode';
        localStorage.setItem('mode', 'light'); 
    }
});