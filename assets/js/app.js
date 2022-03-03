// trigger "Back this project" modal
document.querySelector('.back-proj-btn').addEventListener('click', () => {
    document.querySelector('.back-proj-modal').style.display = 'block'
    window.scrollTo(0, 0)
})

// close "Back this project" modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.querySelector('.back-proj-modal').style.display = 'none'
})

// in the "Back this project" modal, trigger the selected pledge by checking the checkbox
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

// in the "Back this project" modal, trigger the selected pledge and check the checkbox by clicking the h3 instead of the checkbox
document.querySelectorAll('.pledge h3').forEach(heading => {
    heading.addEventListener('click', () => {
        heading.closest('.pledge').lastElementChild.classList.remove('is-hidden')
        heading.closest('ul').firstElementChild.firstElementChild.firstElementChild.checked = 'true'
    })
})

// on click of "Bookmark" button, change text content of it
const bookmarkBtn = document.querySelector('.bookmark-btn') // global variable
bookmarkBtn.addEventListener('click', () => {
    bookmarkBtn.textContent === 'Bookmark' ? bookmarkBtn.textContent = 'Bookmarked' : bookmarkBtn.textContent = 'Bookmark'
})

const stats = { // global variable
    of100K: 0,
    totalBackers: 0,
    daysLeft: 100
}

// format text relating to 'stats' object
function formatStatsText(val, el) {
    if (val.toString().length < 4) {
        el.textContent = val.toString()
    } else {
        el.textContent = val.toString().slice(0, -3) + ',' + val.toString().slice(-3)
    }
}

// setting text content or values on load
formatStatsText(stats.of100K, document.querySelector('.dollars-raised'))
formatStatsText(stats.totalBackers, document.querySelector('.num-of-backers'))
formatStatsText(stats.daysLeft, document.querySelector('.days-left'))
document.getElementById('points').value = 0

// decrementing stats.daysLeft by 1 every 24 hours, setting '.days-left' text accordingly, and disabling pledge-related buttons
let intervalID = setInterval(decrementDaysLeft, 86400000) // this is the number of milliseconds in a day; in reality I'd find some better way of doing this

function decrementDaysLeft() {
    stats.daysLeft -= 1
    formatStatsText(stats.daysLeft, document.querySelector('.days-left'))

    if (stats.daysLeft <= 0) {
        clearInterval(intervalID)
        disablePledgeButtons()
    }
}

function disablePledgeButtons() {
    document.querySelector('.back-proj-btn').disabled = 'true'
    document.querySelectorAll('.select-reward-btn').forEach(btn => {
        btn.disabled = 'true'
    })
}

// the number left of each reward (Bamboo Stand, Black Edition Stand, and Mahogany Special Edition, respectively) at the beginning
const numLeftOfRewards = [300, 150, 50] // global variable

const spans = Array.from(document.querySelectorAll('.num-remaining')) // global variable
const modalSpans = Array.from(document.querySelectorAll('.modal-num-remaining')) // global variable

document.querySelectorAll('.pledge-continue-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let dollarsPledgedAsNum = +(btn.closest('ul').firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.value)

        // trigger "Thanks..." modal, and update money raised number and text, backers number and text, and progress bar
        if (dollarsPledgedAsNum > 0) {
            document.querySelector('.back-proj-modal').style.display = 'none'
            document.querySelector('.thank-you-modal').style.display = 'block'
            window.scrollTo(0, 0)

            stats.of100K += dollarsPledgedAsNum
            formatStatsText(stats.of100K, document.querySelector('.dollars-raised'))

            stats.totalBackers += 1
            formatStatsText(stats.totalBackers, document.querySelector('.num-of-backers'))

            document.getElementById('points').value = stats.of100K / 1000 // why '/ 1000'? Because the progress bar only has 100 points
        } else {
            btn.closest('ul').firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.value = 'can\'t be 0'
        }

        // when stats.of100K reaches 100000, freeze stats.of100K number and set applicable text, freeze stats.daysLeft number, disable pledge-related buttons
        if (stats.of100K >= 100000) {
            stats.of100K = 100000
            formatStatsText(stats.of100K, document.querySelector('.dollars-raised'))
            clearInterval(intervalID)
            disablePledgeButtons()
        }
        
        // see the number of rewards left diminish by one
        for (let i = 0; i < numLeftOfRewards.length; i++) {
            if (btn.closest('.pledge').classList.contains('pledge-with-reward')) { // this is excluding the card with class 'no-reward'

                let pledgeOptionSpan = btn.closest('.pledge').firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild

                if (dollarsPledgedAsNum >= +(pledgeOptionSpan.textContent) && pledgeOptionSpan.closest('li').nextElementSibling.firstElementChild === modalSpans[i]) { // the code on this line after the '&&' is what is mapping the indices of 'numLeftOfRewards' to 'spans' and 'modalSpans'
                    numLeftOfRewards[i] -= 1
                    spans[i].textContent = (numLeftOfRewards[i]).toString()
                    modalSpans[i].textContent = (numLeftOfRewards[i]).toString()
                }
            }            
        }
    })
})

// close "Thanks..." modal
document.querySelector('.got-it-btn').addEventListener('click', () => {
    document.querySelector('.thank-you-modal').style.display = 'none'
})

function setNumsAndStyleCards() {
    setNums(spans)
    setNums(modalSpans)
    styleCardsIfZero()
    styleModalCardsIfZero()
}
setNumsAndStyleCards()

function setNums(theSpans) {
    numLeftOfRewards.forEach((num, index) => {
        theSpans[index].textContent = num.toString()
    })
}

function styleCardsIfZero() {
    for (let i = 0; i < numLeftOfRewards.length; i++) {
        if (spans[i].textContent === '0') {
            spans[i].closest('.reward').style.backgroundColor = 'red'
            spans[i].closest('li').nextElementSibling.firstChild.textContent = 'Out of Stock'
            spans[i].closest('li').nextElementSibling.firstChild.disabled = 'true'
        }
    }
}

function styleModalCardsIfZero() {
    for (let i = 0; i < numLeftOfRewards.length; i++) {
        if (modalSpans[i].textContent === '0') {
            modalSpans[i].closest('.pledge').style.backgroundColor = 'red'
            modalSpans[i].closest('ul').firstElementChild.firstElementChild.firstElementChild.style.visibility = 'hidden'
            modalSpans[i].closest('ul').firstElementChild.firstElementChild.firstElementChild.disabled = 'true'
            modalSpans[i].closest('ul').firstElementChild.nextElementSibling.firstElementChild.style.cursor = 'auto'
        }
    }
}

// on click of any of the "Select Reward" buttons, the "Back this project" modal opens and does so *with* the chosen reward card already checked *and* that reward card's '.enter-pledge' div visible / extended downward
document.querySelectorAll('.select-reward-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.back-proj-modal').style.display = 'block'
        window.scrollTo(0, 0)
        if (btn.closest('div').classList.contains('reward-for-25')) {
            document.querySelectorAll('.check-to-choose').forEach(checkbox => {
                if (checkbox.closest('div').classList.contains('bamboo-stand-reward')) {
                    checkbox.checked = true
                    checkbox.closest('.pledge').lastElementChild.classList.remove('is-hidden')
                }
            })
        } else if (btn.closest('div').classList.contains('reward-for-75')) {
            document.querySelectorAll('.check-to-choose').forEach(checkbox => {
                if (checkbox.closest('div').classList.contains('black-stand-reward')) {
                    checkbox.checked = true
                    checkbox.closest('.pledge').lastElementChild.classList.remove('is-hidden')
                }
            })
        } else {
            document.querySelectorAll('.check-to-choose').forEach(checkbox => {
                if (checkbox.closest('div').classList.contains('mahogany-special-reward')) {
                    checkbox.checked = true
                    checkbox.closest('.pledge').lastElementChild.classList.remove('is-hidden')
                }
            })
        }
    })
})