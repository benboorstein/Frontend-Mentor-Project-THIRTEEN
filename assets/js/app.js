/* LEFT OFF HERE
- For "Select Reward" buttons: upon click of button, the "Back this project" modal should open WITH the chosen reward already checked.
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge (this involves the Continue btn, I think).
- See the number of total backers increment by one after confirming a pledge.
*/




// trigger "Back this project" modal
document.querySelector('.back-proj-btn').addEventListener('click', () => {
    document.querySelector('.back-proj-modal').style.display = 'block'
})

// close "Back this project" modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.querySelector('.back-proj-modal').style.display = 'none'
})

// trigger the selected pledge by checking the checkbox
document.querySelectorAll('.check-to-choose').forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            // Note: I had to do it in this roundabout way because I needed to get the specific '.enter-pledge' div *that corresponds to the specific checkbox being clicked*.
            checkbox.closest('.pledge').lastElementChild.classList.remove('is-hidden')
         } else {
            checkbox.closest('.pledge').lastElementChild.classList.add('is-hidden')
         }
    })      
})

// trigger the selected pledge and check the checkbox by clicking the h3
document.querySelectorAll('.pledge h3').forEach(heading => {
    heading.addEventListener('click', () => {
        heading.closest('.pledge').lastElementChild.classList.remove('is-hidden')
        heading.closest('ul').firstElementChild.firstElementChild.firstElementChild.checked = 'true'
    })
})

// trigger "Thanks..." modal
document.querySelectorAll('.pledge-continue-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (+(btn.closest('ul').firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.value) > 0) {
            document.querySelector('.back-proj-modal').style.display = 'none'
            document.querySelector('.thank-you-modal').style.display = 'block'
        } else {
            btn.closest('ul').firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.value = 'can\'t be 0'
        }
    })
})

// close "Thanks..." modal
document.querySelector('.got-it-btn').addEventListener('click', () => {
    document.querySelector('.thank-you-modal').style.display = 'none'
})

// on click of "Bookmark" button, change text content of it
const bookmarkBtn = document.querySelector('.bookmark-btn') // global variable
bookmarkBtn.addEventListener('click', () => {
    bookmarkBtn.textContent === 'Bookmark' ? bookmarkBtn.textContent = 'Bookmarked' : bookmarkBtn.textContent = 'Bookmark'
})

let stats = { // global variable
    of100K: 89914,
    totalBackers: 5007,
    daysLeft: 56
}

function setStatsText(val, el) {
    if (val.toString().length < 4) {
        el.textContent = val.toString()
        // console.log('if: ' + el.textContent)
    } else if (val.toString().length >= 4 && val.toString().length < 7) {
        el.textContent = val.toString().slice(0, -3) + ',' + val.toString().slice(-3)
        // console.log('else if 1: ' + el.textContent)
    } else if (val.toString().length === 7) {
        el.textContent = val.toString().slice(0, -6) + ',' + val.toString().slice(-6, -3) + ',' + val.toString().slice(-3)
        // console.log('else if 2: ' + el.textContent)
    } else {
        el.textContent = val.toString()
        // console.log('else: ' + el.textContent)
    }
}
setStatsText(stats.of100K, document.querySelector('.dollars-raised'))
setStatsText(stats.totalBackers, document.querySelector('.num-of-backers'))
setStatsText(stats.daysLeft, document.querySelector('.days-left'))

function setRangeSlider() {
    document.getElementById('points').value = stats.of100K / 1000 // Why '/ 1000'? Because there are only 100 points on the range slider
}
setRangeSlider()

// the number left of each reward...the Bamboo Stand, the Black Edition Stand, and the Mahogany Special Edition, respectively
const numLeftOfReward = [101, 64, 0] // global variable

const spans = Array.from(document.querySelectorAll('.num-remaining')) // global variable
const modalSpans = Array.from(document.querySelectorAll('.modal-num-remaining')) // global variable

function setNumsAndStyle() {
    setNums(spans)
    setNums(modalSpans)
    styleCardsIfZero()
    styleModalCardsIfZero()
}
setNumsAndStyle()

function setNums(theSpans) {
    numLeftOfReward.forEach((num, index) => {
        theSpans[index].textContent = num.toString()
    })
}

function styleCardsIfZero() {
    for (let i = 0; i < numLeftOfReward.length; i++) {
        if (spans[i].textContent === '0') {
            spans[i].closest('.reward').style.backgroundColor = 'red'
            spans[i].closest('li').nextElementSibling.firstChild.textContent = 'Out of Stock'
            spans[i].closest('li').nextElementSibling.firstChild.disabled = 'true'
        }
    }
}

function styleModalCardsIfZero() {
    for (let i = 0; i < numLeftOfReward.length; i++) {
        if (modalSpans[i].textContent === '0') {
            modalSpans[i].closest('.pledge').style.backgroundColor = 'red'
            modalSpans[i].closest('ul').firstElementChild.firstElementChild.firstElementChild.style.visibility = 'hidden'
            modalSpans[i].closest('ul').firstElementChild.firstElementChild.firstElementChild.disabled = 'true'
            modalSpans[i].closest('ul').firstElementChild.nextElementSibling.firstElementChild.style.cursor = 'auto'
        }
    }
}


/////////////////////////////////////////////////

// bbbbbb works but is not ideal because there must be some way to make this work more concisely with loops
// bbbbbb Upon click of a "Select Reward" button, the "Back this project" modal should open and should do so WITH the chosen reward already checked.
document.querySelectorAll('.select-reward-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.back-proj-modal').style.display = 'block' // bbbbbb this is working but I'll have to fix how high the modal presents itself
        ///// above this is all good
        if (btn.closest('div').classList.contains('reward-for-25')) { /////
            document.querySelectorAll('.check-to-choose').forEach(checkbox => {
                if (checkbox.closest('div').classList.contains('bamboo-stand-reward')) { /////
                    checkbox.checked = true
                    checkbox.closest('.pledge').lastElementChild.classList.remove('is-hidden')
                }
            })
        } else if (btn.closest('div').classList.contains('reward-for-75')) { /////
            document.querySelectorAll('.check-to-choose').forEach(checkbox => {
                if (checkbox.closest('div').classList.contains('black-stand-reward')) { /////
                    checkbox.checked = true
                    checkbox.closest('.pledge').lastElementChild.classList.remove('is-hidden')
                }
            })
        } else { /////
            document.querySelectorAll('.check-to-choose').forEach(checkbox => {
                if (checkbox.closest('div').classList.contains('mahogany-special-reward')) { /////
                    checkbox.checked = true
                    checkbox.closest('.pledge').lastElementChild.classList.remove('is-hidden')
                }
            })
        }
    })
})

/////////////////////////////////////////////////


// /////////////////////////////////////////////////////////////////////

// const selectRewardBtns = Array.from(document.querySelectorAll('.select-reward-btn')) // global variable
// const rewardDivs = Array.from(document.querySelectorAll('.reward')) // global variable
// const pledgeDivs = Array.from(document.querySelectorAll('.pledge-with-reward')) // global variable

// // bbbbbb Upon click of a "Select Reward" button, the "Back this project" modal should open and should do so WITH the chosen reward already checked.
// selectRewardBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         document.querySelector('.back-proj-modal').style.display = 'block' // bbbbbb this is working but I'll have to fix how high modal presents itself
//         ///// above this is all good
        

//     })
// })

// /////////////////////////////////////////////////////////////////////