class Header {
    constructor() {
        this.header = document.querySelector('header')
        this.navMenu = document.querySelector('.menu')
        this.isClassAdded = false

        if (this.header)
            this.event()
    }

    event() {
        window.addEventListener('scroll', this.processScrollEvent.bind(this) )
    }

    processScrollEvent() {
        let scrollY = window.scrollY
        
        if (scrollY > 10 && !this.isClassAdded) {
            this.header.classList.add('header--with-bg')
            this.isClassAdded = true
        } else if (scrollY <= 10 && this.isClassAdded) {
            this.header.classList.remove('header--with-bg')
            this.isClassAdded = false
        }
    }
}

class Accordion {
    constructor() {
        this.accordionHeaders = document.querySelectorAll('.accordion__header')
        
        if (this.accordionHeaders.length) {
            this.currentAccordion = document.querySelectorAll('.accordion')[0]
            this.currentAccordion.classList.add('accordion--active')
            let accordionBody = this.currentAccordion.querySelector('.accordion__body')
            accordionBody.style.height = accordionBody.scrollHeight + 'px'

            this.event()
        }
    }

    event() {
        this.accordionHeaders.forEach(element => {
            element.addEventListener('click', this.processEvent.bind(this))
        })
    }

    processEvent( event ) {
        let accordionBody = '',
            clickedAccordion = event.target.closest('.accordion')

        if (this.currentAccordion !== null) {
            accordionBody = this.currentAccordion.querySelector('.accordion__body')
            accordionBody.style.height = 0 + 'px'
            this.currentAccordion.classList.remove('accordion--active')
        }

        if (this.currentAccordion === null || clickedAccordion !== this.currentAccordion) {
            clickedAccordion.classList.add('accordion--active')
            accordionBody = clickedAccordion.querySelector('.accordion__body')
            accordionBody.style.height = accordionBody.scrollHeight + 'px'
            this.currentAccordion = clickedAccordion
        } else {
            this.currentAccordion = null
        }
    }
}

class ScrollingWithSideMenu {
    constructor() {
        this.sideMenuLinks = document.querySelectorAll('.side-menu__link')

        if (this.sideMenuLinks.length)
            this.event()
    }

    event() {
        window.addEventListener('scroll', this.processEvent.bind(this))
    }

    processEvent() {
        let fromTop = window.scrollY

        this.sideMenuLinks.forEach(link => {
            let section = document.querySelector(link.hash)
            let sectionOffset = section.offsetTop - 162

            if (
                sectionOffset <= fromTop &&
                sectionOffset + (section.offsetHeight + 80) > fromTop
            ) {
                link.classList.add('side-menu__link--active')
            } else {
                link.classList.remove('side-menu__link--active')
            }
        })
    }
}

new Header()
new Accordion()
new ScrollingWithSideMenu()