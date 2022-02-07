/* From FEM:
Your users should be able to:

View the optimal layout depending on their device's screen size
See hover states for interactive elements
Make a selection of which pledge to make
See an updated progress bar and total money raised based on their pledge total after confirming a pledge
See the number of total backers increment by one after confirming a pledge
Toggle whether or not the product is bookmarked
*/




// trigger "Back this project" modal
document.querySelector('.back-proj-btn').addEventListener('click', () => {
    document.querySelector('.back-proj-modal').style.display = 'block'
})

// close "Back this project" modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.querySelector('.back-proj-modal').style.display = 'none'
})









// trigger the selected pledge
document.querySelectorAll('.check-to-choose').forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            document.querySelector('.enter-pledge').classList.remove('is-hidden') // PROB LINE // What I WANT is to 'get' the '.enter-pledge' element that corresponds to the specific checkbox being clicked (checked in this case)
         } else {
            document.querySelector('.enter-pledge').classList.add('is-hidden') // PROB LINE // What I WANT is to 'get' the '.enter-pledge' element that corresponds to the specific checkbox being clicked (unchecked in this case)
         }
    })
    // document.querySelectorAll('.enter-pledge').forEach(section => {
        
    // })      
})









// trigger "Thanks..." modal
document.querySelectorAll('.pledge-continue-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.back-proj-modal').style.display = 'none'
        document.querySelector('.thank-you-modal').style.display = 'block'
    })
})

// close "Thanks..." modal
document.querySelector('.got-it-btn').addEventListener('click', () => {
    document.querySelector('.thank-you-modal').style.display = 'none'
})