const getNewHero = document.getElementById('newhero')
const heroimgDiv = document.getElementById('heroimg')
const searchDiv = document.getElementById('search')
const nameDiv = document.getElementById('name')
const herostatsDiv = document.getElementById('herostats')

const getSuperHero = (id) => {
  fetch(`https://superheroapi.com/api.php/10223569763528853/${id}`)
    .then(response => response.json())
      .then(json => {
        const img = json.image.url
        // console.log(getstatsHTML(json))
        
        heroimgDiv.innerHTML = `<h2>${json.name}</h2><img src="${img}"/ height=200 width=200>`
        herostatsDiv.innerText = ``

        const arr = Object.keys(json.powerstats)
        
        for(const i of arr){
          herostatsDiv.innerHTML += `<p>${stattoemoji[i]} ${i} : ${json.powerstats[i]}</p>`
        }
      })
}

const stattoemoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}

const getstatsHTML = (character) => {
  const arr = Object.keys(character.powerstats)

  
}

getNewHero.onclick = () => {
  getSuperHero(Math.floor(Math.random() * 731) + 1)
}

const getHero = (name) => {
  fetch(`https://superheroapi.com/api.php/10223569763528853/search/${name}`)
    .then(response => response.json())
      .then(json => {
        const img = json.results[0].image.url
        heroimgDiv.innerHTML = `<h2>${json.results[0].name}</h2><img src="${img}" height=200 width=200/>`

        herostatsDiv.innerText = ``

        const arr = Object.keys(json.results[0].powerstats)

        for(const i of arr){
          herostatsDiv.innerHTML += `<p>${stattoemoji[i]} ${i} : ${json.results[0].powerstats[i]}</p>`
        }
      })
}

searchDiv.onclick = () => {
  const name = nameDiv.value
  getHero(name)
}