// store.js
import { writable } from 'svelte/store';
const createUserStore = () => {
    // Initialize the state with localStorage values or default values
    const userData = writable({
        colortheme: (typeof window !== 'undefined' && localStorage.getItem('ynexcolortheme')) || 'light', // light, dark
        direction: (typeof window !== 'undefined' && localStorage.getItem('ynexdirection')) || 'ltr', // ltr, rtl
        navigationStyles: (typeof window !== 'undefined' && localStorage.getItem('ynexnavstyles')) || 'vertical', // vertical, horizontal
        menuStyles: (typeof window !== 'undefined' && localStorage.getItem('ynexnavstyles') === 'horizontal')
            ? (localStorage.getItem('ynexmenuStyles') || 'menu-click')
            : '',// menu-click, menu-hover, icon-click, icon-hover
        layoutStyles: (typeof window !== 'undefined' && localStorage.getItem('ynexverticalstyles')) || 'default-menu', // double-menu, detached, icon-overlay, icontext-menu, closed-menu, default-menu
        pageStyles: 'regular', // regular, classic, modern
        widthStyles: 'full-width', // fullwidth, boxed
        menuPosition: 'fixed', // fixed, scrollable
        headerPosition: 'fixed', // fixed, scrollable
        menuColor: (typeof window !== 'undefined' && localStorage.getItem('ynexMenu')) || 'dark', // light, dark, color, gradient, transparent
        headerColor: (typeof window !== 'undefined' && localStorage.getItem('ynexHeader')) || 'light', // light, dark, color, gradient, transparent
        themePrimary: '', // '58, 88, 146', '92, 144, 163', '161, 90, 223', '78, 172, 76', '223, 90, 90'
        themeBackground: '',
        backgroundImage: '', // bgimg1, bgimg2, bgimg3, bgimg4, bgimg5
    });

    // Subscribe to userData store to log changes to the console
    userData.subscribe(value => {
        // console.log(value)
    });

    return {
        userData,

        // Update theme (light/dark)
        updateColorThemeFn(newTheme) {
            let html = document.querySelector('html');
            userData.update((data) => {
                const updatedState = { ...data, colortheme: newTheme };
                if (newTheme === 'dark') {
                    updatedState.menuColor = localStorage.getItem('ynexMenu') || 'dark';
                    updatedState.headerColor = localStorage.getItem('ynexHeader') || 'dark';
                } else {
                    updatedState.menuColor = 'dark';  // Set a default for light theme, or adjust accordingly
                    updatedState.headerColor = 'light';  // Set a default for light theme, or adjust accordingly
                }
                // localStorage.setItem('ynexcolortheme', newTheme);
                return updatedState;
            });

            if (newTheme === 'light') {
                html.setAttribute('data-theme-mode', 'light');
                html.setAttribute('data-header-styles', 'light');

                if (html.getAttribute('data-nav-layout') === 'horizontal') {
                    html.setAttribute('data-menu-styles', 'light');
                } else {
                    html.setAttribute('data-menu-styles', 'dark');
                }
                html.style.removeProperty('--body-bg-rgb');
                html.style.removeProperty('--body-bg-rgb2');
                html.style.removeProperty('--light-rgb');
                html.style.removeProperty('--form-control-bg');
                html.style.removeProperty('--input-border');
            }

            if (newTheme === 'dark') {
                html.setAttribute('data-theme-mode', 'dark');
                html.setAttribute('data-header-styles', 'dark');
                html.setAttribute('data-menu-styles', 'dark');
                html.style.removeProperty('--body-bg-rgb');
                html.style.removeProperty('--body-bg-rgb2');
                html.style.removeProperty('--light-rgb');
                html.style.removeProperty('--form-control-bg');
                html.style.removeProperty('--input-border');
            }
        },

        UpdateDirectionFn(value) {
            let html = document.querySelector('html');
            userData.update((current) => {
                const updatedState = { ...current, direction: value }
                if (value === 'rtl') {
                    html.setAttribute("dir", "rtl");
                } else {
                    html.setAttribute("dir", "ltr");
                }
                return updatedState

            });
        },
        // Update navigation layout (vertical/horizontal)
        updateNavigationStylesFn(value) {

            let html = document.querySelector('html');
            let mainMenu = document.querySelector('.main-menu');
            if (mainMenu) {
                mainMenu.style.marginInlineStart = '0px';
            }

            userData.update((current) => {

                const updatedState = { ...current, navigationStyles: value, menuStyles: value === 'horizontal' ? 'menu-click' : '', layoutStyles: value === 'vertical' ? 'default-menu' : '' };

                return updatedState;
            });
            const menuColor = localStorage.getItem('ynexMenu') ? localStorage.getItem('ynexMenu') : "light"
            const themeDark = localStorage.getItem('ynexMenu') ? localStorage.getItem('ynexMenu') : "dark"
            if (value === 'horizontal') {
                html.setAttribute('data-nav-layout', 'horizontal');
                if (html.getAttribute('data-theme-mode') === 'dark') {
                    html.setAttribute('data-menu-styles', themeDark)
                } else {
                    html.setAttribute('data-menu-styles', menuColor)
                }
                html.removeAttribute('data-vertical-style');
                if (!html.getAttribute('data-nav-style')) {
                    html.setAttribute('data-nav-style', 'menu-click');
                }
            } else {

                html.setAttribute('data-nav-layout', 'vertical');
                html.setAttribute('data-menu-styles', themeDark)
                html.setAttribute('data-vertical-style', 'overlay');
                html.removeAttribute('data-nav-style');
                html.removeAttribute('data-toggled')
            }
        },
        updateLayoutStylesFn(value) {
            let html = document.querySelector('html');
            if (!value) {
                value = 'default-menu';
            }
            userData.update((current) => {
                const updatedState = { ...current, layoutStyles: value, menuStyles: '' };
                return updatedState;
            });
            let appSidebar = document.querySelector('.app-sidebar');
            let mainMenu = document.querySelector('.main-menu');
            let mainContentDiv = document.querySelector('.main-content');
            appSidebar?.removeEventListener('mouseenter', this.iconoverLayoutHoverFn);
            appSidebar?.removeEventListener('mouseleave', this.iconoverLayoutHoverFn);
            appSidebar?.removeEventListener('click', this.icontextOpenFn);
            mainContentDiv?.removeEventListener('click', this.icontextCloseFn);
            localStorage.removeItem('ynexmenuStyles');
            html.removeAttribute('data-nav-style');
            if (mainMenu) {
                mainMenu.style.marginInlineStart = '0';
            }

            // Using only if conditions without else if
            if (value === 'default-menu') {
                html.setAttribute('data-vertical-style', 'overlay');
                if (window.innerWidth < 992) {
                    html.setAttribute('data-toggled', 'close')
                } else {
                    html.removeAttribute('data-toggled');
                }

                html.setAttribute('data-nav-layout', 'vertical');
                document.querySelectorAll(".main-menu>li.open").forEach((ele) => {
                    if (!ele?.classList.contains('active')) {
                        ele.classList.remove('open');
                        ele.querySelector('ul').style.display = 'none';
                    }
                });
                appSidebar?.addEventListener('mouseenter', this.iconoverLayoutHoverFn);
                appSidebar?.addEventListener('mouseleave', this.iconoverLayoutHoverFn);

            }

            if (value === 'closed-menu') {
                html.setAttribute('data-nav-layout', 'vertical');
                html.setAttribute('data-toggled', 'close-menu-close');
                html.setAttribute('data-vertical-style', 'closed');
                document.querySelectorAll(".main-menu>li.open").forEach((ele) => {
                    if (!ele?.classList.contains('active')) {
                        ele.classList.remove('open');
                        ele.querySelector('ul').style.display = 'none';
                    }
                });
            }

            if (value === 'detached') {
                html.setAttribute('data-nav-layout', 'vertical');
                html.setAttribute('data-toggled', 'detached-close');
                html.setAttribute('data-vertical-style', 'detached');
                appSidebar?.addEventListener('mouseenter', this.iconoverLayoutHoverFn);
                appSidebar?.addEventListener('mouseleave', this.iconoverLayoutHoverFn);
            }

            if (value === 'icontext-menu') {
                html.setAttribute('data-nav-layout', 'vertical');
                html.setAttribute('data-toggled', 'icon-text-close');
                html.setAttribute('data-vertical-style', 'icontext');
                appSidebar?.addEventListener('click', this.icontextOpenFn);
                mainContentDiv?.addEventListener('click', this.icontextCloseFn);
            }

            if (value === 'icon-overlay') {
                html.setAttribute('data-nav-layout', 'vertical');
                html.setAttribute('data-toggled', 'icon-overlay-close');
                html.setAttribute('data-vertical-style', 'overlay');
                document.querySelectorAll(".main-menu>li.open").forEach((ele) => {
                    if (!ele?.classList.contains('active')) {
                        ele.classList.remove('open');
                        ele.querySelector('ul').style.display = 'none';
                    }
                });
                appSidebar.addEventListener('mouseenter', this.iconoverLayoutHoverFn);
                appSidebar.addEventListener('mouseleave', this.iconoverLayoutHoverFn);
            }

            if (value === 'double-menu') {
                html.setAttribute('data-nav-layout', 'vertical');
                html.setAttribute('data-toggled', 'double-menu-open');
                html.setAttribute('data-vertical-style', 'doublemenu');
                const menuSlideItem = document.querySelectorAll(".main-menu > li > .side-menu__item");

                // Create the tooltip element
                const tooltip = document.createElement("div");
                tooltip.className = "custome-tooltip";
                tooltip.style.setProperty("position", "fixed");
                tooltip.style.setProperty("display", "none");
                tooltip.style.setProperty("padding", "0.5rem");
                tooltip.style.setProperty("white-space", "nowrap");
                tooltip.style.setProperty("font-weight", "500");
                tooltip.style.setProperty("font-size", "0.75rem");
                tooltip.style.setProperty("background-color", "rgb(15, 23 ,42)");
                tooltip.style.setProperty("color", "rgb(255, 255 ,255)");
                tooltip.style.setProperty("margin-inline-start", "135px");
                tooltip.style.setProperty("border-radius", "0.25rem");
                tooltip.style.setProperty("z-index", "99");

                let sidemenulink = document.querySelectorAll('.main-menu li > .side-menu__item');
                sidemenulink?.forEach(ele => ele.removeEventListener('click', this.doubleClickFn));

                menuSlideItem.forEach((e) => {
                    // Add event listener to show tooltip
                    e?.addEventListener("mouseenter", () => {
                        tooltip.style.setProperty("display", "block");
                        let value = e.querySelector(".side-menu__label")?.childNodes?.[0]?.nodeValue;
                        tooltip.textContent = value;
                        if (document.querySelector("html").getAttribute("data-vertical-style") === "doublemenu") {
                            e.appendChild(tooltip);
                        }
                    });

                    // Add event listener to hide tooltip
                    e.addEventListener("mouseleave", () => {
                        tooltip.style.setProperty("display", "none");
                        tooltip.textContent = e.querySelector(".side-menu__label")?.textContent;
                        if (document.querySelector("html").getAttribute("data-vertical-style") === "doublemenu") {
                            e.removeChild(tooltip);
                        }
                    });
                });

                if (!document.querySelector('.double-menu-active')) {
                    html.setAttribute('data-toggled', 'double-menu-close');
                }
            }
        }
        ,
        iconoverLayoutHoverFn(event) {
            let html = document.documentElement;
            if (html.getAttribute('data-toggled') === 'icon-overlay-close' || html.getAttribute('data-toggled') === 'detached-close') {
                if (event.type == 'mouseenter') {
                    html.setAttribute('data-icon-overlay', 'open');
                }
                if (event.type == 'mouseleave') {
                    html.removeAttribute('data-icon-overlay');
                }
            }
        },
        icontextOpenFn() {
            let html = document.documentElement;
            if (html.getAttribute('data-toggled') === 'icon-text-close') {
                html.setAttribute('data-icon-text', 'open');
            }
        },
        icontextCloseFn() {
            let html = document.documentElement;
            if (html.getAttribute('data-toggled') === 'icon-text-close') {
                html.removeAttribute('data-icon-text');
            }
        },
        doubleClickFn() {
            var $this = this;
            let html = document.querySelector('html');
            var checkElement = $this.nextElementSibling;
            if (checkElement) {
                if (!checkElement.classList.contains('double-menu-active')) {
                    if (document.querySelector('.slide-menu')) {
                        let slidemenu = document.querySelectorAll('.slide-menu');
                        slidemenu.forEach(e => {
                            if (e?.classList.contains('double-menu-active')) {
                                e.classList.remove('double-menu-active');
                                html.setAttribute('data-toggled', 'double-menu-close');
                            }
                        })
                    }
                    checkElement?.classList.add('double-menu-active');
                    html.setAttribute('data-toggled', 'double-menu-open');
                }
            }
        },
        updateMenuStylesFn(value) {
            let html = document.querySelector('html');
            if (!value) {
                value = ''
            }
            userData.update((current) => {
                const updatedState = { ...current, menuStyles: value, layoutStyles: '' }
                return updatedState
            })
            let mainMenu = document.querySelector('.main-menu');
            html.removeAttribute('data-vertical-style');
            html.removeAttribute('data-hor-style');

            if (mainMenu) {
                mainMenu.style.marginInlineStart = '0';
            }
            switch (value) {
                case 'menu-click':
                    html.setAttribute('data-nav-style', 'menu-click');
                    html.setAttribute('data-toggled', 'menu-click-closed');
                    this.checkHoriMenu()
                    break;
                case 'menu-hover':
                    html.setAttribute('data-nav-style', 'menu-hover');
                    html.setAttribute('data-toggled', 'menu-hover-closed');
                    this.checkHoriMenu()
                    break;
                case 'icon-click':
                    html.setAttribute('data-nav-style', 'icon-click');
                    html.setAttribute('data-toggled', 'icon-click-closed');
                    this.checkHoriMenu()
                    break;
                case 'icon-hover':
                    html.setAttribute('data-nav-style', 'icon-hover');
                    html.setAttribute('data-toggled', 'icon-hover-closed');
                    // this.checkHoriMenu()
                    break;
            }
        },
        checkHoriMenu() {
            let menuNav = document.querySelector('.main-sidebar');
            let mainMenu = document.querySelector('.main-menu');
            let slideLeft = document.querySelector('.slide-left');
            let slideRight = document.querySelector('.slide-right');
            let marginRightValue = mainMenu && Math.ceil(Number(window.getComputedStyle(mainMenu).marginInlineStart.split('px')[0]));
            // Show/Hide the arrows
            if (mainMenu && menuNav && slideRight && slideLeft) {
                if (mainMenu.scrollWidth > menuNav.offsetWidth) {
                    slideRight?.classList.remove('d-none');
                    slideLeft?.classList.add('d-none');
                }
                else {
                    slideRight?.classList.add('d-none');
                    slideLeft?.classList.add('d-none');
                    mainMenu.style.marginLeft = '0px';
                    mainMenu.style.marginRight = '0px';
                }
                if (marginRightValue == 0) {
                    slideLeft?.classList.add('d-none');
                }
                else {
                    slideLeft?.classList.remove('d-none');
                }
            }
        },
        updatePageStylesFn(value) {
            let html = document.querySelector('html');
            if (value) {
                userData.update((current) => {
                    const updatedState = { ...current, pageStyles: value, }
                    return updatedState
                })
                html.setAttribute('data-page-style', value);
            }
        },
        updateWidthStylesFn(value) {
            let html = document.querySelector('html');
            if (value) {
                userData.update((current) => {
                    const updatedState = { ...current, widthStyles: value, }
                    return updatedState
                })
                html.setAttribute('data-width', value);
            }
        },
        updateMenuPositionFn(value) {
            let html = document.querySelector('html');
            if (value) {
                userData.update((current) => {
                    const updatedState = { ...current, menuPosition: value, }
                    return updatedState
                })
                html.setAttribute('data-menu-position', value);
            }
        },
        updateHeaderPositionFn(value) {
            let html = document.querySelector('html');
            if (value) {
                userData.update((current) => {
                    const updatedState = { ...current, headerPosition: value, }
                    return updatedState
                })
                html.setAttribute('data-header-position', value);
            }
        },
        updateMenuColorFn(value) {
            let html = document.querySelector('html');
            if (value) {
                userData.update((current) => {
                    const updatedState = { ...current, menuColor: value, }
                    return updatedState
                })
                html.setAttribute('data-menu-styles', value);
            }
        },
        updateHeaderColorFn(value) {
            let html = document.querySelector('html');
            if (value) {
                userData.update((current) => {
                    const updatedState = { ...current, headerColor: value, }
                    return updatedState
                })
                html.setAttribute('data-header-styles', value);
            }
        },
        updateThemePrimaryFn(value) {
            let html = document.querySelector('html');
            let primaryrgb = value ? value : localStorage.ynexprimaryRGB;
            if (primaryrgb) {
                userData.update((current) => {
                    const updatedState = { ...current, themePrimary: primaryrgb, }
                    return updatedState
                })
                html.style.setProperty('--primary-rgb', primaryrgb)
            }
        },
        updateThemeBackgroundFn(val1, val2) {
            let html = document.querySelector('html');

            userData.update(currentState => {
                const updatedState = { ...currentState, themeBackground: `${val1}, ${val2}` ?? '', colortheme: 'dark', menuColor: 'dark', headerColor: 'dark' }
                return updatedState
            });

            let bgrgb = val1 ? val1 : localStorage.ynexbodyBgRGB;
            let bgrgb2 = val2 ? val2 : localStorage.ynexbodylightRGB;

            html.setAttribute('data-theme-mode', 'dark');
            html.setAttribute('data-menu-styles', 'dark');
            html.setAttribute('data-header-styles', 'dark');

            html.style.setProperty('--body-bg-rgb', bgrgb);
            html.style.setProperty('--body-bg-rgb2', bgrgb2);
            html.style.setProperty('--light-rgb', bgrgb2);
            html.style.setProperty('--form-control-bg', `rgb(${bgrgb2})`);
            html.style.setProperty('--input-border', "rgba(255,255,255,0.1)");


            themeStore.colortheme = 'dark';
            // if (!localStorage.getItem('ynexMenu') || localStorage.getItem('ynexMenu') == 'dark') {
            themeStore.menuColor = 'dark'
            // } if (!localStorage.getItem('ynexHeader') || localStorage.getItem('ynexHeader') == 'dark') {
            themeStore.headerColor = 'dark'
            // }
            // console.log(val1, val2, this.colortheme, this.menuColor, this.headerColor)
        },
        updateBackgroundImageFn(value) {
            let html = document.querySelector('html');
            userData.update((current) => {
                const updatedState = { ...current, backgroundImage: value, }
                return updatedState
            })
            html.setAttribute('data-bg-img', value);
        },
        reset() {
            let html = document.querySelector('html');
            let mainMenuEle = document.querySelector(".main-menu");
            if (localStorage.getItem("ynexnavstyles") == "horizontal" && mainMenuEle) {
                mainMenuEle.style.display = "block"
            }

            // clearing localstorage
            localStorage.clear();

            // reseting to light
            this.updateColorThemeFn('light');

            //To reset the light-rgb
            html.removeAttribute("style")

            // clearing attibutes
            // removing header, menu, pageStyle & boxed
            html.removeAttribute('data-nav-style');
            html.removeAttribute('data-menu-position');
            html.removeAttribute('data-header-position');
            html.removeAttribute('data-width');
            html.removeAttribute('data-page-style');

            // removing theme styles
            html.removeAttribute('data-bg-img');

            // clear primary & bg color
            html.style.removeProperty(`--primary-rgb`);
            html.style.removeProperty(`--body-bg-rgb`);

            // reseting to ltr
            this.UpdateDirectionFn('ltr');
            // reseting to default-menu
            this.updateLayoutStylesFn('default-menu');
            // reseting to vertical
            this.updateNavigationStylesFn('vertical');

            // resetting the menu Color
            this.updateMenuColorFn('dark');

            //  resetting the page Style Menu

            this.updatePageStylesFn('regular')

            // resetting the widthStyles
            this.updateWidthStylesFn('full-width')
            // resetting the menuPosition
            this.updateMenuPositionFn('fixed')
            // resetting the headerPosition
            this.updateHeaderPositionFn('fixed')

            // resetting the theme primary function 
            userData.update((current) => {
                const updatedState = { ...current, themePrimary: '', themeBackground: '' }
                return updatedState
            })

            // to reset horizontal menu scroll
            mainMenuEle ? mainMenuEle.style.marginLeft = "0px" : '';
            mainMenuEle ? mainMenuEle.style.marginRight = "0px" : '';
        },

        // Retrieve settings from localStorage if available
        retrieveUserLocalStorage() {
            const savedTheme = localStorage.getItem('ynexcolortheme') || 'light';
            if (savedTheme) this.updateColorThemeFn(savedTheme);

            const savedDirection = localStorage.getItem('ynexdirection');
            if (savedDirection) this.UpdateDirectionFn(savedDirection);

            const savedNavigationStyles = localStorage.getItem('ynexnavstyles') || 'vertical';
            if (savedNavigationStyles) this.updateNavigationStylesFn(savedNavigationStyles);

            const savedPages = localStorage.getItem("ynexpageStyle");
            if (savedPages) this.updatePageStylesFn(savedPages);

            const savedwidthStyles = localStorage.getItem("ynexwidthStyles");
            if (savedwidthStyles) this.updateWidthStylesFn(savedwidthStyles);

            const savedMenuPosition = localStorage.getItem("ynexmenuposition");
            if (savedMenuPosition) this.updateMenuPositionFn(savedMenuPosition);

            const savedHeaderPosition = localStorage.getItem("ynexheaderposition");
            if (savedHeaderPosition) this.updateHeaderPositionFn(savedHeaderPosition);

            const savedThemePrimary = localStorage.getItem("ynexprimaryRGB");
            if (savedThemePrimary) this.updateThemePrimaryFn(savedThemePrimary);

            const savedBackgroundImage = localStorage.getItem("ynexbgimg");
            if (savedBackgroundImage) this.updateBackgroundImageFn(savedBackgroundImage);

            const savedThemeBackground = localStorage.getItem("ynexbodyBgRGB");
            const savedLightBackground = localStorage.getItem("ynexbodylightRGB");
            // if (savedThemeBackground) this.updateThemeBackgroundFn(savedThemeBackground);
            if (savedThemeBackground) {
                this.updateThemeBackgroundFn(savedThemeBackground, savedLightBackground);
                this.colortheme = 'dark';
                this.menuColor = 'dark';
                this.headerColor = 'dark';
            }

            const savedMenuColors = localStorage.getItem('ynexMenu') ? localStorage.getItem('ynexMenu') :
                (savedTheme === 'dark' ? 'dark' : localStorage.getItem('ynexMenu'));
            if (savedMenuColors) this.updateMenuColorFn(savedMenuColors);

            let savedHeaderColors = localStorage.getItem('ynexHeader') ? localStorage.getItem('ynexHeader') :
                (savedTheme === 'dark' ? 'dark' : localStorage.getItem('ynexHeader')); // Similarly for header colors
            if (savedHeaderColors) this.updateHeaderColorFn(savedHeaderColors);

            const savedMenuStyles = localStorage.getItem("ynexmenuStyles");
            if (!localStorage.getItem('ynexverticalstyles')) {
                this.updateMenuStylesFn(savedMenuStyles);
            }

            const savedLayoutStyles = localStorage.getItem("ynexverticalstyles");
            if (!localStorage.getItem('ynexmenuStyles') && localStorage.getItem('ynexnavstyles') !== 'horizontal') {
                this.updateLayoutStylesFn(savedLayoutStyles);
            }
        }
        ,
        custompageLocalStorage() {

            let savedColorTheme = localStorage.getItem('ynexcolortheme') || 'light';
            if (savedColorTheme) this.updateColorThemeFn(savedColorTheme);
            let savedDirection = localStorage.getItem('ynexdirection')
            if (savedDirection) this.UpdateDirectionFn(savedDirection);
            let savedNavigationStyle = 'horizontal'
            if (savedNavigationStyle) this.updateNavigationStylesFn(savedNavigationStyle);
            let savedThemePrimary = localStorage.getItem("ynexprimaryRGB");
            if (savedThemePrimary) this.updateThemePrimaryFn(savedThemePrimary);

            let html = document.querySelector('html');
            html.removeAttribute('data-menu-styles')
            html.removeAttribute('data-header-styles')
            // const savedMenuColors = 'light';
            // if (savedMenuColors) this.updateMenuColorFn(savedMenuColors);

            // i commented this for when i navigate to and i return the data-menu-styles attrbute is removing so addd the menu color to dark i removed that 

            // document.documentElement.removeAttribute("data-menu-styles");
        },
        custompageReset() {
            let html = document.querySelector('html');
            // clearing localstorage
            localStorage.clear();

            // reseting to light
            this.updateColorThemeFn('light');
            this.updateLayoutStylesFn('overlay');
            //To reset the light-rgb
            html.removeAttribute("style")

            // clearing attibutes
            // removing header, menu, pageStyle & boxed
            html.removeAttribute('data-nav-style');
            html.removeAttribute('data-menu-position');
            html.removeAttribute('data-header-position');
            html.removeAttribute('data-width');
            html.removeAttribute('data-page-style');

            // removing theme styles
            html.removeAttribute('data-bg-img');

            // clear primary & bg color
            html.style.removeProperty(`--primary-rgb`);
            html.style.removeProperty(`--body-bg-rgb`);

            // reseting to ltr
            this.UpdateDirectionFn('ltr');

            // reseting to vertical
            this.updateNavigationStylesFn('horizontal');

            userData.update((current) => {
                const updatedState = { ...current, themePrimary: '' }
                return updatedState
            })
            // resetting the menu Colot
            document.documentElement.removeAttribute("data-menu-styles");
        },
    };
};

// Create and export the store with the functions
export const themeStore = createUserStore();


