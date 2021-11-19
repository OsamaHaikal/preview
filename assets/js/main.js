		$(".toggle-mode").on('click', function () {
			            $("body").toggleClass("dark");
			
			            updateIcon();
			        });
			        function toggleTheme() {
			            updateIcon();
			        }
			        toggleTheme();
			        var logo_black = "assets/images/Logo.png";
			        var logo_white = "assets/images/logo-bg-none.png";
			
			        //this function will be used to change image source whenever button is clicked.
			        function changeImage(i) {
			            if (i === "logo_black") {
			                $(".logo_photo").attr("src", "assets/images/Logo.png");
			                $(".logo_photo").attr("width", "55");
			                $(".logo_photo").attr("height", "55");
			
			            }
			            else {
			                $(".logo_photo").attr("src", "assets/images/logo-bg-none.png");
			                $(".logo_photo").attr("width", "40");
			                $(".logo_photo").attr("height", "40");
			
			            }
			        }
			        function updateIcon() {
			            if ($("body").hasClass("dark")) {
			                $(".toggle-mode i").removeClass("fa-moon");
			                $(".toggle-mode i").addClass("fa-sun");
			                changeImage("logo_white");
			            }
			            else {
			                $(".toggle-mode i").removeClass("fa-sun");
			                $(".toggle-mode i").addClass("fa-moon");
			
			                changeImage("logo_black");
			
			            }
			        }
			    "use strict";
			
			    const sectionsContainer = document.querySelector('.page-sections');
			    const sections = document.querySelectorAll('.page-section');
			    const nav = document.querySelector('.nav-sections');
			    const menu = nav.querySelector('.menu');
			    const links = nav.querySelectorAll('.menu-item-link');
			    const activeLine = nav.querySelector('.active-line');
			    const sectionOffset = nav.offsetHeight + 24;
			    const activeClass = 'active';
			    let activeIndex = 0;
			    let isScrolling = true;
			    let userScroll = true;
			
			    const setActiveClass = () => {
			    links[activeIndex].classList.add(activeClass);
			    };
			
			    const removeActiveClass = () => {
			    links[activeIndex].classList.remove(activeClass);
			    };
			
			    const moveActiveLine = () => {
			    const link = links[activeIndex];
			    const linkX = link.getBoundingClientRect().x;
			    const menuX = menu.getBoundingClientRect().x;
			    activeLine.style.transform = `translateX(${menu.scrollLeft - menuX + linkX}px)`;
			    activeLine.style.width = `${link.offsetWidth}px`;
			    };
			
			    const setMenuLeftPosition = position => {
			    menu.scrollTo({
			        left: position,
			        behavior: 'smooth'
			    });
			    };
			
			    const checkMenuOverflow = () => {
			    const activeLink = links[activeIndex].getBoundingClientRect();
			    const offset = 30;
			
			    if (Math.floor(activeLink.right) > window.innerWidth) {
			        setMenuLeftPosition(menu.scrollLeft + activeLink.right - window.innerWidth + offset);
			    } else if (activeLink.left < 0) {
			        setMenuLeftPosition(menu.scrollLeft + activeLink.left - offset);
			    }
			    };
			
			    const handleActiveLinkUpdate = current => {
			    removeActiveClass();
			    activeIndex = current;
			    checkMenuOverflow();
			    setActiveClass();
			    moveActiveLine();
			    };
			
			    const init = () => {
			    moveActiveLine(links[0]);
			    document.documentElement.style.setProperty('--section-offset', sectionOffset);
			    };
			
			    links.forEach((link, index) => link.addEventListener('click', () => {
			    userScroll = false;
			    handleActiveLinkUpdate(index);
			    }));
			    window.addEventListener("scroll", () => {
			    const currentIndex = sectionsContainer.getBoundingClientRect().top < 0 ? sections.length - 1 - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - sectionOffset * 2) : 0;
			
			    if (userScroll && activeIndex !== currentIndex) {
			        handleActiveLinkUpdate(currentIndex);
			    } else {
			        window.clearTimeout(isScrolling);
			        isScrolling = setTimeout(() => userScroll = true, 100);
			    }
			    });
			    init();