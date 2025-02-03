const div = document.querySelector('.sdf')

const getCountryByCapital = async (name) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)        
        return await response.json()
    } catch (error) {
     console.log(error);
    }
}

getCountryByCapital(location.search.split('=')[1]).then(res=>{

    const country = res[0];
    console.log(country);
    
    const firstDiv = `<div style="background-color: white;" class="s1">

            </div>
            <div style="background-color: white;" class="ss">

                <div style="background-color: white;" class="s2">
                    <b>${country.name.common}</b>
                    <p>Native Name: België
                        Population: 11,319,511
                        Region: ${country.region}
                        Sub Region: ${country.subregion}
                        Capital: ${country.capital[0]}
                </div>
                <div style="background-color: white;" class="s3">
                    <p>Top Level Domain: .be
                        Currencies: Euro
                        Languages: Dutch, French, German</p>
                </div>
            </div>`
    div.insertAdjacentHTML('afterbegin',firstDiv)
})
