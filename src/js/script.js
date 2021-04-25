// *** BURGER MENU *** //
let BurgerIcon = document.querySelector(".screen_icon"),
    menu = document.querySelector(".header_menu"),
    body = document.querySelector("body"),
    logo = document.querySelector(".header_logo"),
    menuItems = document.querySelectorAll(".top_nav li")

BurgerIcon.onclick = toggleNav

function toggleNav() {
    logo.classList.toggle("invisible")
    BurgerIcon.classList.toggle("responsive")
    menu.classList.toggle("responsive")
    body.classList.toggle("lock")
}

menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        logo.classList.remove("invisible")
        BurgerIcon.classList.toggle("responsive")
        menu.classList.toggle("responsive")
    })
})

// *** SCROLL TO TOP FOR NORMAL BROWSERS *** //
let arrowTop = document.createElement("span")

arrowTop.id = 'scrollTop'
window.onscroll = function () {
    if (window.pageYOffset > window.innerHeight) {
        arrowTop.style.opacity = "1"
    } else {
        arrowTop.style.opacity = "0"
    }
}
arrowTop.onclick = function () {
    if (navigator.userAgent.indexOf("Trident") > -1) {
        ieTop()
    } else {
        window.scrollTo(0, 0)
    }
}

// *** SCROLL TO TOP FOR LOVELY IE *** //
function ieTop() {
    let top = window.pageYOffset
    window.scrollTo(0, top - 50)
    setTimeout(function () {
        if (top <= 0) {
            window.scrollTo(0, 0)
        } else {
            ieTop()
        }
    }, 10)
}

document.body.appendChild(arrowTop)

// *** MAIN SLIDER WITH DEVELOPERS *** //
let prev = document.querySelector("#prev_btn"),
    next = document.querySelector("#next_btn"),
    sliderItem = document.querySelectorAll(".slider_item"),
    slideWidth = document.querySelector(".slider_item").getBoundingClientRect().width,
    slider = document.querySelector(".slider"),
    currentPosition = 0

prev.onclick = scrollPic
next.onclick = scrollPic

// sliderItem.forEach ((item) => {
//     item.addEventListener('touchstart', monction)
// })
//
// sliderItem.forEach ((item) => {
//     item.addEventListener('touchmove', scrollPic)
// })
//
// function monction() {
//     console.log("monction")
// }

function scrollPic(event) {
    event.preventDefault()
    let lastElem = slider.lastElementChild,
        firstElem = slider.firstElementChild
    if (event.target.id === "prev_btn") {
        currentPosition -= slideWidth
        if (currentPosition <= 0) {
            lastElem.remove()
            slider.insertBefore(lastElem, firstElem)
            currentPosition += slideWidth
        }
    } else if (event.target.id === "next_btn") {
        currentPosition += slideWidth
        if (currentPosition >= (slider.scrollWidth - slider.clientWidth)) {
            firstElem.remove()
            slider.appendChild(firstElem)
            currentPosition -= slideWidth
        }
    }
    slider.scroll(currentPosition, 0)
}

// *** JOB`S POP *** //
let jobsPic = document.querySelectorAll(".jobs_pic"),
    categories = document.querySelectorAll(".latest_works_list")

categories.forEach((category) => {
    category.addEventListener('click', jobsPop)
})

function jobsPop(event) {
    jobsPic.forEach((elem) => {
        let selected = document.querySelector(".selected")
        if (selected) selected.classList.remove("selected")
        event.target.classList.add("selected")
        elem.classList.remove("invisible")
        if (!elem.dataset.category.match(event.target.dataset.trend) && event.target.dataset.trend !== 'All') {
            elem.classList.add("invisible")
            localStorage.setItem('last category', event.target.dataset.trend)
        }
    })
}

// *** SLIDER OF CLIENTS LOGO FOR MOBILE VERSION *** //
let mediaSlides = document.querySelectorAll(".full_media"),
    activeMedia = 0

mediaSlides[0].classList.add("active_media")

mediaSlides.forEach((brand) => {
    brand.onclick = changeBrand
})

setInterval(changeBrand, 2500)

function changeBrand(event) {
    event ? event.preventDefault() : null
    mediaSlides[activeMedia].classList.remove("active_media")
    if (activeMedia + 1 == mediaSlides.length) {
        activeMedia = 0
    } else {
        activeMedia++
    }
    mediaSlides[activeMedia].classList.add("active_media")
}

// *** TEXT SLIDER *** //
let slides = document.querySelectorAll(".quote_slides"),
    quoteContainer = document.querySelector(".quote_container"),
    dotsContainer = document.createElement("div"),
    dots

slides[0].classList.add("active_quote")
dotsContainer.classList.add("dots_container")
quoteContainer.appendChild(dotsContainer)

slides.forEach((quote, index) => {
    quote.dataset.order = index
    dotsContainer.innerHTML += `<span class='dots' data-dot='${index}' onclick='changeSlide(this)'></span>`
})

dots = document.querySelectorAll(".dots")
dots[0].classList.add("active_dot")

function changeSlide(elem) {
    dots.forEach((dot) => {
        dot.classList.remove("active_dot")
    })
    elem.classList.add("active_dot")
    slides.forEach((quote, index) => {
        quote.classList.remove("active_quote")
        if (elem.getAttribute("data-dot") == index) {
            quote.classList.add("active_quote")
        }
    })
}

// *** GET`N`SET FORM DATA *** //
let form = document.querySelector("#jsContactForm"),
    fieldName = document.querySelector("#formName"),
    fieldEmail = document.querySelector("#formEmail"),
    fieldPhone = document.querySelector("#formPhone"),
    fieldCompany = document.querySelector("#formCompany")

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const userData = {
        name: fieldName.value,
        email: fieldEmail.value,
        phone: fieldPhone.value,
        company: fieldCompany.value
    }
    localStorage.setItem('user', JSON.stringify(userData))
})

let lastUserData = JSON.parse(localStorage.getItem('user'))
if (lastUserData) {
    fieldName.value = lastUserData.name
    fieldEmail.value = lastUserData.email
    fieldPhone.value = lastUserData.phone
    fieldCompany.value = lastUserData.company
}

// *** VALIDATION OF FORM USER PHONE NUMBER *** //
let phonePattern = (/^[+]?[\s|0-9]*[(]?[0-9]{1,4}[)]?[-\s|0-9]*$/),
    wrongNumber = document.createElement("p")
wrongNumber.className = "errorForm"
fieldPhone.addEventListener('blur', phoneValidate)
fieldPhone.addEventListener('focus', (event) => {
    if (document.querySelector(".errorForm")) {
        form.removeChild(wrongNumber)
        fieldPhone.style.borderColor = "#555"

    }
})

function phoneValidate(event) {
    let phoneNumb = fieldPhone.value
    if (!phonePattern.test(phoneNumb)) {
        fieldPhone.style.borderColor = "#A41D00"
        form.appendChild(wrongNumber)
        form.style.position = "relative"
        wrongNumber.style.position = "absolute"
        wrongNumber.style.width = "200px"
        wrongNumber.style.height = "30px"
        wrongNumber.style.top = "30%"
        wrongNumber.style.left = "0%"
        wrongNumber.style.justifyContent = "center"
        wrongNumber.style.alignItems = "center"
        wrongNumber.style.color = "#A41D00"
        wrongNumber.style.fontSize = "12px"
        wrongNumber.style.fontWeight = "400"
        wrongNumber.innerHTML = "Invalid number format"
        return false
    }
}

// *** VISITS COUNTER *** //
if (localStorage.visits === undefined || isNaN(localStorage.visits)) {
    localStorage.visits = 0
}
localStorage.setItem("visits", ++localStorage.visits)

// *** LAST VISIT DATE *** //
let headerBlock = document.querySelector(".welcome"),
    blockWithAlert = document.createElement("p")

blockWithAlert.style.position = "absolute"
blockWithAlert.style.color = "#dec4a9"
blockWithAlert.style.top = "0%"
blockWithAlert.style.left = "10%"
blockWithAlert.style.right = "10%"
blockWithAlert.classList.add("withalert")

window.onbeforeunload = () => {
    let date = new Date().toDateString()
    localStorage.setItem('lastVisit', date)
}
if (localStorage.lastVisit !== undefined) {
    let lastDate = localStorage.getItem('lastVisit')
    if ((Date.now()) - (new Date(lastDate).getTime()) > 86400000) {
        console.log(Date.now())
        console.log(new Date(lastDate).getTime())//сім нулів
        console.log((Date.now()) - (new Date(lastDate).getTime()))//сім нулів
        headerBlock.style.position = "relative"
        headerBlock.appendChild(blockWithAlert)
        blockWithAlert.innerHTML = `Your last visit was on ${lastDate}`
    }
} else {
    headerBlock.style.position = "relative"
    headerBlock.appendChild(blockWithAlert)
    blockWithAlert.innerHTML = `It\`s your first time on this site. Welcome!`
}

setTimeout(function removeLastVisit() {
    blockWithAlert.style.opacity = "0"
    blockWithAlert.style.transform = "translateX(-30%)"
    blockWithAlert.style.transition = "2s"
    setTimeout(() => {
        if (document.querySelector(".withalert")) {
            headerBlock.removeChild(blockWithAlert)
        }
    }, 2000)
}, 3000)

// *** HIDE DETAILS SUMMARY, WHEN IT OPEN *** //
let blogSummaries = document.querySelectorAll("summary")

blogSummaries.forEach((summary) => {
    summary.addEventListener('click', hideSummaries)
})

function hideSummaries(event) {
    event.target.classList.toggle("invisible")
}

// *** POPUP ***//
let popupLink = document.querySelector(".popup_link"),
    popup = document.querySelector(".popup_body"),
    popupCloseIcon = document.querySelector(".popup_close"),
    header = document.querySelector("header"),
    popupCover = document.createElement("div")

popupLink.addEventListener('click', () => {
    event.preventDefault()
    bodyLock()
    popupOpen()
})

popupCloseIcon.addEventListener('click', () => {
    event.preventDefault()

    popupClose()
})

popupCover.addEventListener('click', () => {
    if (event.target !== document.querySelector(".popup_content")) {
        popupClose()
    }
})

function popupOpen() {
    popupCover.style.position = "fixed"
    popupCover.style.width = "100vw"
    popupCover.style.height = "100vh"
    popupCover.style.backgroundColor = "rgba(0, 0, 0, .8)"
    popupCover.style.top = "0"
    popupCover.style.left = "0"
    popupCover.style.overflow = "hidden"
    body.appendChild(popupCover)
    popup.classList.add("popup_open")
}

function popupClose() {
    popup.classList.remove("popup_open")
    body.removeChild(popupCover)
    bodyUnlock()
}

function bodyLock() {
    header.style.paddingRight = window.innerWidth - body.offsetWidth + "px"
    body.classList.add("lock")
}

function bodyUnlock() {
    header.style.paddingRight = "0px"
    body.classList.remove("lock")
}

document.addEventListener('keydown', (event) => {
    if (event.which === 27) {
        let popupActive = document.querySelector(".popup_open")
        popupClose(popupActive)
    }
})

// *** DRAG AND DROP FOR POPUP *** //
popup.addEventListener('mousedown', drag)

function drag(event) {
    let shiftX = event.clientX - popup.getBoundingClientRect().left,
        shiftY = event.clientY - popup.getBoundingClientRect().top
    popup.style.zIndex = "1000"
    popup.style.transform = "translate(0,0)"


    movePopup(event.pageX, event.pageY)

    function movePopup(pageX, pageY) {
        popup.style.left = pageX - shiftX + "px"
        popup.style.top = pageY - shiftY + "px"
    }

    function onMouseMove(event) {
        movePopup(event.pageX, event.pageY)
    }

    document.addEventListener('mousemove', onMouseMove)
    popup.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove)
        popup.onmouseup = null
    }
}

// *** DRAG FOR SIGN IN BUTTON *** //
let popUpButton = document.querySelector("#js_popup_button"),
    wrapPopUp = document.querySelector(".wrapper"),
    figures = document.querySelectorAll(".square"),
    levels = document.querySelectorAll(".level"),
    welcome = document.querySelector(".welcome h1"),
    dragObject,
    dropPoint,
    dropPoints = [],
    keys = [[5, 3, 8], [7], [2, 4], [6, 1]]

popUpButton.addEventListener('click', smallCheck)

function smallCheck() {
    event.preventDefault()
    let xhr = new XMLHttpRequest(),
        inputLogin = document.querySelector("#jsNamePopup"),
        inputPass = document.querySelector("#jsPhonePopup"),
        params = `login=${inputLogin.value}&pass=${inputPass.value}`

    xhr.open("POST", "php/login.php", true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(params)
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return
        if (xhr.status !== 200) {
            console.log(xhr.status + "" + xhr.statusText)
        } else {
            if (xhr.responseText) {
                popupClose()
                wrapPopUp.classList.add("flex")
                wrapPopUp.style.display = "flex"
                wrapPopUp.style.backgroundColor = "white"
                wrapPopUp.style.position = "absolute"
                wrapPopUp.style.top = "50%"
                wrapPopUp.style.left = "50%"
                wrapPopUp.style.zIndex = "1500"
                wrapPopUp.style.transform = "translate(-50%, -50%)"
                popupCover.style.position = "fixed"
                popupCover.style.width = "100vw"
                popupCover.style.height = "100vh"
                popupCover.style.backgroundColor = "rgba(0, 0, 0, .8)"
                popupCover.style.top = "0"
                popupCover.style.left = "0"
                popupCover.style.overflow = "hidden"
                body.appendChild(popupCover)
            }
            else alert("go away!")
        }
    }

}

figures.forEach((figure) => {
    figure.style.backgroundColor = figure.getAttribute("data-color")
    figure.style.cursor = "pointer"
    figure.insertAdjacentHTML("beforebegin", "<div class='drop_point'></div>")
    dropPoints.push(figure.previousElementSibling)
    figure.addEventListener('dragstart', startDrag)
    figure.addEventListener('dragend', function () {
        figure.classList.remove("hide")
    })
})

dropPoints.forEach((point) => {
    point.addEventListener('dragenter', function () {
        event.preventDefault()
        if (event.target === point) {
            point.classList.add("drop_point_hover")
        }
    })
    point.addEventListener('dragleave', function () {
        point.classList.remove("drop_point_hover")
    })
    point.addEventListener('drop', function () {
        point.insertAdjacentElement('beforebegin', dragObject)
        setTimeout(() => {
            point.classList.remove("drop_point_hover")
        }, 0)
    })
})

function startDrag() {
    dragObject = this
    setTimeout(() => {
        dragObject.classList.add("hide")
        dropPoint = dragObject.previousElementSibling
        dropPoint.classList.add("hide")

    }, 0)
}

levels.forEach((level) => {
    level.addEventListener('dragenter', function (event) {
        event.preventDefault()
        level.classList.add("dashed")

    })
    level.addEventListener('dragover', function (event) {
        event.preventDefault()
    })
    level.addEventListener('dragleave', function (event) {
        level.classList.remove("dashed")
    })
    level.addEventListener('drop', function (event) {
        level.classList.remove("dashed")
        if (!document.querySelector(".drop_point_hover")) {
            level.appendChild(dragObject)
        }
        dragObject.insertAdjacentElement("beforebegin", dropPoint)
        dropPoint.classList.remove("hide")
        checkBandit()
    })
})

function checkBandit() {
    let level0 = levels[0].querySelectorAll(".square"),
        level1 = levels[1].querySelectorAll(".square"),
        level2 = levels[2].querySelectorAll(".square"),
        level3 = levels[3].querySelectorAll(".square"),
        correct = 0
    level0.forEach((el, index) => {
        if (el.getAttribute("data-number") != keys[0][index]) {
            console.log("wrong")
            return false
        } else correct++
    })
    level1.forEach((el, index) => {
        if (el.getAttribute("data-number") != keys[1][index]) {
            console.log("wrong1")
            return false
        } else correct++
    })
    level2.forEach((el, index) => {
        if (el.getAttribute("data-number") != keys[2][index]) {
            console.log("wrong2")
            return false
        } else correct++
    })
    level3.forEach((el, index) => {
        if (el.getAttribute("data-number") != keys[3][index]) {
            console.log("wrong3")
            return false
        } else correct++
    })
    if (correct === figures.length) {
        welcome.innerText = "WELCOME KATYA!"
        wrapPopUp.classList.remove("flex")
        wrapPopUp.style.display = "none"
        body.removeChild(popupCover)
    }
}


