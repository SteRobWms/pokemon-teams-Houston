const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

fetch("http://localhost:3000/trainers")
    .then(res => res.json())
    .then(trainers => {
        trainers.forEach(trainer => {
            createCard(trainer)
        });
    })

const main = document.querySelector("main")


function createCard(trainer) {
    const ul = document.createElement("ul")
    const div = document.createElement("div")
    div.className = ("card");
    div.setAttribute("data-id",trainer.id)
    
    const p = document.createElement("p")
    p.innerText = trainer.name
    
    const addBtn = document.createElement("button")
    addBtn.setAttribute("data-trainer-id", trainer.id)
    addBtn.innerText = "Add Pokemon"


        addBtn.addEventListener("click", () => {
            if (ul.children.length < 6) {
            fetch("http://localhost:3000/pokemons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "trainer_id": trainer.id
                })
            })
            .then(res => res.json())
            .then(newPokemon => {
                const releaseBtn = document.createElement("button")
                releaseBtn.className = "release"
                releaseBtn.setAttribute("data-pokemon-id", `${newPokemon.id}`)
                releaseBtn.innerText = "Release"
                
                releaseBtn.addEventListener("click", () => {
                    fetch("http://localhost:3000/pokemons/"+newPokemon.id, {
                        method: "DELETE"
                    })
                    .then(res => res.json())
                    .then(data => li.remove())
                })
        
                    let li = document.createElement("li")
                    
                    ul.append(li)
                    li.innerText = `${newPokemon.nickname} (${newPokemon.species})`
                    li.append(releaseBtn)
            
            })
        }
        })
    


    // function createPokemon(pokemon) {
    //     const releaseBtn = document.createElement("button")
    //         releaseBtn.className = "release"
    //         releaseBtn.setAttribute("data-pokemon-id", `${pokemon.id}`)
    //         releaseBtn.innerText = "Release"
            
    //         releaseBtn.addEventListener("click", () => {
    //             fetch("http://localhost:3000/pokemons"+pokemon.id, {
    //                 method: "DELETE"
    //             })
    //             .then(res => res.json())
    //             .then(data => li.remove())
    //         })

    //         let li = document.createElement("li")
            
    //         ul.append(li)
    //         li.innerText = `${pokemon.nickname} (${pokemon.species})`
    //         li.append(releaseBtn)
    //     }


    const pokemons = trainer.pokemons //object of many pokemons belonging to trainer
    

    trainer.pokemons.forEach((pokemon) => {
        const releaseBtn = document.createElement("button")
        releaseBtn.className = "release"
        releaseBtn.setAttribute("data-pokemon-id", `${pokemon.id}`)
        releaseBtn.innerText = "Release"
        
        releaseBtn.addEventListener("click", () => {
            fetch("http://localhost:3000/pokemons/"+pokemon.id, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => li.remove())
        })

        let li = document.createElement("li")
        
        ul.append(li)
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.append(releaseBtn)
    })

    div.append(p, addBtn, ul)
    main.append(div)

}





})