const populate = async (base) => {
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_YuCNeb7h9Crge0W8A5ysd30bsK8GbqaKWl6NFZod&base_currency=${base}`

    const quantity = Number(document.getElementById('quantity').value)

    let response = await fetch(url)
    let json = await response.json()
    // console.log(json)

    document.getElementById('table').style.display = 'table'

    for (const key of Object.keys(json.data)) {
        console.log(key)
        document.getElementById('output').innerHTML +=
            `<tr>
          <td>${key}</td>
          <td>${json.data[key].value}</td>
          <td>${Math.floor(json.data[key].value * quantity * 100) / 100}</td>
        </tr>`
    }

    // fetch(url)
    // .then(response => response.json())
    // .then(Data => {

    //   document.getElementById('output').innerHTML = `<tr>
    //               <td>${Math.floor(quantity * Data.data["INR"].value * 100) / 100}</td>
    //               <td>${Math.floor(quantity * Data.data["USD"].value * 100) / 100}</td>
    //               <td>${Math.floor(quantity * Data.data["EUR"].value * 100) / 100}</td>
    //           </tr>`
    // })
}
const output = document.getElementById('output')

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault()

    const base = document.getElementById('base').value
    populate(base)
})