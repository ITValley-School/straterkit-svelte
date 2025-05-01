<script>
  import {
    Button,
    Offcanvas,
    OffcanvasBody,
    TabContent,
    TabPane,
  } from "@sveltestrap/sveltestrap";
  import { themeStore } from "./switcher.js";
  import { onMount } from "svelte";
  import { menuData } from "../sidebar/nav.js";
  import { writable } from "svelte/store";
  import SpkTooltips from "$lib/@spk/uielements/Tooltips/SpkTooltips.svelte";

  let openMenu = writable(menuData);
  let userData = themeStore.userData;
  // Log userData whenever it changes

  // console.log($userData); // This will log whenever the userData store is updated

  // console.log("Current layoutStyles:", $userData.layoutStyles);

  let endOpen = false;
  const toggleEnd = () => (endOpen = !endOpen);

  function primaryColorFn(color) {
    if (!color || color === "#") {
      color = "#000000";
    }

    let primaryRgb = convertRgbToIndividual(color);
    themePrimaryFn(primaryRgb);
  }

  let initialColor = "";

  function dynamicBackgroundColorFn(color) {
    let bgRgb = convertRgbToIndividual(color);
    let bgRgb2 = convertRgbToIndividual(color);
    let bg1Update = bgRgb.split(", ").join(", ");
    let bg2Update = bgRgb2.split(", ");
    bg2Update[0] = Number(bg2Update[0]) + 14;
    bg2Update[1] = Number(bg2Update[1]) + 14;
    bg2Update[2] = Number(bg2Update[2]) + 14;
    themeBackgroundFn(bg1Update, bg2Update.join(", "));
  }

  function convertRgbToIndividual(hex) {
    hex = hex.replace("#", "");

    // If the hex is empty or invalid, return a default RGB value
    if (hex.length !== 6 || !/^([0-9A-Fa-f]{6})$/.test(hex)) {
      return "0, 0, 0"; // Default to black
    }

    // Extract the red, green, and blue values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  }

  function toggleTheme(newTheme) {
    themeStore.updateColorThemeFn(newTheme);
    localStorage.setItem("ynexcolortheme", newTheme);
    localStorage.removeItem("ynexMenu");
    localStorage.removeItem("ynexHeader");
    localStorage.removeItem("ynexbodylightRGB");
    localStorage.removeItem("ynexbodyBgRGB");
  }

  function directionFn(value) {
    themeStore.UpdateDirectionFn(value);
    localStorage.setItem("ynexdirection", value);
  }
  function navigationStylesFn(value) {
    themeStore.updateNavigationStylesFn(value);
    localStorage.setItem("ynexnavstyles", value);

    if (value === "horizontal") {
      setTimeout(() => {
        document.querySelector(".main-content")?.click();
      }, 100);
      closeMenuFn();
    }
    localStorage.removeItem("ynexmenuStyles");
  }

  function closeMenuFn() {
    const closeMenuRecursively = (items) => {
      items?.forEach((item) => {
        item.active = false;
        if (item.children) {
          closeMenuRecursively(item.children);
        }
      });
    };
    closeMenuRecursively($openMenu);
  }

  function closeMenu() {
    const closeMenudata = (items) => {
      items?.forEach((item) => {
        item.active = false;
        closeMenudata(item.children);
      });
    };
    closeMenudata($openMenu);
  }

  function menuStylesFn(value) {
    themeStore.updateMenuStylesFn(value);
    localStorage.setItem("ynexmenuStyles", value);
    localStorage.removeItem("ynexverticalstyles");
    if (value == "menu-hover" || value == "icon-hover") {
      setTimeout(() => {
        document.querySelector(".main-content")?.click();
      }, 100);
      closeMenu();
    }
  }
  function layoutStylesFn(value) {
    themeStore.updateLayoutStylesFn(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("ynexverticalstyles", value);
    }
    if (value == "horizontal") {
      closeMenuFn();
    }
  }

  function pageStylesFn(value) {
    themeStore.updatePageStylesFn(value);
    localStorage.setItem("ynexpageStyle", value);
  }

  function widthStylesFn(value) {
    themeStore.updateWidthStylesFn(value);
    localStorage.setItem("ynexwidthStyles", value);
  }

  function menuPositionFn(value) {
    themeStore.updateMenuPositionFn(value);
    localStorage.setItem("ynexmenuposition", value);
  }

  function headerPositionFn(value) {
    themeStore.updateHeaderPositionFn(value);
    localStorage.setItem("ynexheaderposition", value);
  }

  function menuColorFn(value) {
    themeStore.updateMenuColorFn(value);
    localStorage.setItem("ynexMenu", value);
  }

  function headerColorFn(value) {
    themeStore.updateHeaderColorFn(value);
    localStorage.setItem("ynexHeader", value);
  }

  function themePrimaryFn(value) {
    themeStore.updateThemePrimaryFn(value);
    localStorage.setItem("ynexprimaryRGB", value);
  }

  function themeBackgroundFn(val1, val2) {
    themeStore.updateThemeBackgroundFn(val1, val2);
    localStorage.setItem("ynexbodyBgRGB", val1);
    localStorage.setItem("ynexbodylightRGB", val2);
    localStorage.removeItem("ynexcolortheme");
    localStorage.removeItem("ynexHeader");
    localStorage.removeItem("ynexMenu");
  }

  function backgroundImageFn(value) {
    themeStore.updateBackgroundImageFn(value);
    localStorage.setItem("ynexbgimg", value);
  }

  function reset() {
    themeStore.reset();
    themeStore.userData.update((current) => {
      return {
        ...current,
        themeBackground: "",
      };
    });
  }

  function retrieveFromLocalStorage() {
    themeStore.retrieveUserLocalStorage();
  }

  // Cleanup subscriptions on component destroy
  onMount(() => {
    retrieveFromLocalStorage();
    return () => {};
  });
</script>

<Button
  color=""
  on:click={() => (endOpen = !endOpen)}
  href="#!"
  class="header-link switcher-icon"
>
  <i class="bx bx-cog header-link-icon"></i>
</Button>
<Offcanvas
  isOpen={endOpen}
  toggle={toggleEnd}
  placement="end"
  header="Switcher"
  id="switcher-canvas"
>
  <OffcanvasBody>
    <TabContent id="nav-tabContent" class="nav-justified">
      <TabPane tabId="alpha" tab="Theme Styles" active class=" fade border-0">
        <div class="">
          <p class="switcher-style-head">Theme Color Mode:</p>
          <div class="row switcher-style gx-0">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-light-theme">
                  Light
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="theme-style"
                  id="switcher-light-theme"
                  on:click={() => toggleTheme("light")}
                  checked={$userData.colortheme === "light"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-dark-theme">
                  Dark
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="theme-style"
                  id="switcher-dark-theme"
                  on:click={() => toggleTheme("dark")}
                  checked={$userData.colortheme === "dark"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="switcher-style-head">Directions:</p>
          <div class="row switcher-style gx-0">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-ltr"> LTR </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="direction"
                  id="switcher-ltr"
                  on:change={() => directionFn("ltr")}
                  checked={$userData.direction === "ltr"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-rtl"> RTL </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="direction"
                  id="switcher-rtl"
                  on:change={() => directionFn("rtl")}
                  checked={$userData.direction === "rtl"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="switcher-style-head">Navigation Styles:</p>
          <div class="row switcher-style gx-0">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-vertical">
                  Vertical
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="navigation-style"
                  id="switcher-vertical"
                  on:change={() => navigationStylesFn("vertical")}
                  checked={$userData.navigationStyles === "vertical"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-horizontal">
                  Horizontal
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="navigation-style"
                  id="switcher-horizontal"
                  on:change={() => navigationStylesFn("horizontal")}
                  checked={$userData.navigationStyles === "horizontal"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-menu-styles">
          <p class="switcher-style-head">Vertical & Horizontal Menu Styles:</p>
          <div class="row switcher-style gx-0 pb-2 gy-2">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-menu-click">
                  Menu Click
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="navigation-menu-styles"
                  id="switcher-menu-click"
                  on:change={() => menuStylesFn("menu-click")}
                  checked={$userData.menuStyles === "menu-click"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-menu-hover">
                  Menu Hover
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="navigation-menu-styles"
                  id="switcher-menu-hover"
                  on:change={() => menuStylesFn("menu-hover")}
                  checked={$userData.menuStyles === "menu-hover"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-icon-click">
                  Icon Click
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="navigation-menu-styles"
                  id="switcher-icon-click"
                  on:change={() => menuStylesFn("icon-click")}
                  checked={$userData.menuStyles === "icon-click"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-icon-hover">
                  Icon Hover
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="navigation-menu-styles"
                  id="switcher-icon-hover"
                  on:change={() => menuStylesFn("icon-hover")}
                  checked={$userData.menuStyles === "icon-hover"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="sidemenu-layout-styles">
          <p class="switcher-style-head">Sidemenu Layout Styles:</p>
          <div class="row switcher-style gx-0 pb-2 gy-2">
            <div class="col-sm-6">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-default-menu">
                  Default Menu
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="sidemenu-layout-styles"
                  id="switcher-default-menu"
                  on:change={() => layoutStylesFn("default-menu")}
                  checked={$userData.layoutStyles === "default-menu"}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-closed-menu">
                  Closed Menu
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="sidemenu-layout-styles"
                  id="switcher-closed-menu"
                  on:change={() => layoutStylesFn("closed-menu")}
                  checked={$userData.layoutStyles === "closed-menu"}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-icontext-menu">
                  Icon Text
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="sidemenu-layout-styles"
                  id="switcher-icontext-menu"
                  on:change={() => layoutStylesFn("icontext-menu")}
                  checked={$userData.layoutStyles === "icontext-menu"}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-icon-overlay">
                  Icon Overlay
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="sidemenu-layout-styles"
                  id="switcher-icon-overlay"
                  on:change={() => layoutStylesFn("icon-overlay")}
                  checked={$userData.layoutStyles === "icon-overlay"}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-detached">
                  Detached
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="sidemenu-layout-styles"
                  id="switcher-detached"
                  on:change={() => layoutStylesFn("detached")}
                  checked={$userData.layoutStyles === "detached"}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-double-menu">
                  Double Menu
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="sidemenu-layout-styles"
                  id="switcher-double-menu"
                  on:change={() => layoutStylesFn("double-menu")}
                  checked={$userData.layoutStyles === "double-menu"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="switcher-style-head">Page Styles:</p>
          <div class="row switcher-style gx-0">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-regular">
                  Regular
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="page-styles"
                  id="switcher-regular"
                  on:change={() => pageStylesFn("regular")}
                  checked={$userData.pageStyles === "regular"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-classic">
                  Classic
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="page-styles"
                  id="switcher-classic"
                  on:change={() => pageStylesFn("classic")}
                  checked={$userData.pageStyles === "classic"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-modern">
                  Modern
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="page-styles"
                  id="switcher-modern"
                  on:change={() => pageStylesFn("modern")}
                  checked={$userData.pageStyles === "modern"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="switcher-style-head">Layout Width Styles:</p>
          <div class="row switcher-style gx-0">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-full-width">
                  Full Width
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="layout-width"
                  id="switcher-full-width"
                  on:change={() => widthStylesFn("full-width")}
                  checked={$userData.widthStyles === "full-width"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-boxed">
                  Boxed
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="layout-width"
                  id="switcher-boxed"
                  on:change={() => widthStylesFn("boxed")}
                  checked={$userData.widthStyles === "boxed"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="switcher-style-head">Menu Positions:</p>
          <div class="row switcher-style gx-0">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-menu-fixed">
                  Fixed
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="menu-positions"
                  id="switcher-menu-fixed"
                  on:change={() => menuPositionFn("fixed")}
                  checked={$userData.menuPosition === "fixed"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-menu-scroll">
                  Scrollable
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="menu-positions"
                  id="switcher-menu-scroll"
                  on:change={() => menuPositionFn("scrollable")}
                  checked={$userData.menuPosition === "scrollable"}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="switcher-style-head">Header Positions:</p>
          <div class="row switcher-style gx-0">
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-header-fixed">
                  Fixed
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="header-positions"
                  id="switcher-header-fixed"
                  on:change={() => headerPositionFn("fixed")}
                  checked={$userData.headerPosition === "fixed"}
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-check switch-select">
                <label class="form-check-label" for="switcher-header-scroll">
                  Scrollable
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="header-positions"
                  id="switcher-header-scroll"
                  on:change={() => headerPositionFn("scrollable")}
                  checked={$userData.headerPosition === "scrollable"}
                />
              </div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane tabId="bravo" tab="Theme Colors" class=" fade border-0">
        <div>
          <div class="theme-colors">
            <p class="switcher-style-head">Menu Colors:</p>
            <div class="d-flex switcher-style pb-2">
              <div class="form-check switch-select me-3" id="light-menu">
                <input
                  class="form-check-input color-input color-white"
                  type="radio"
                  name="menu-colors"
                  id="switcher-menu-light"
                  on:change={() => menuColorFn("light")}
                  checked={$userData.menuColor === "light"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="light-menu"
                  content="Light Menu"
                />
              </div>
              <div class="form-check switch-select me-3" id="dark-menu">
                <input
                  class="form-check-input color-input color-dark"
                  type="radio"
                  name="menu-colors"
                  id="switcher-menu-dark"
                  on:change={() => menuColorFn("dark")}
                  checked={$userData.menuColor === "dark"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="dark-menu"
                  content="Dark Menu"
                />
              </div>
              <div class="form-check switch-select me-3" id="color-menu">
                <input
                  class="form-check-input color-input color-primary"
                  type="radio"
                  name="menu-colors"
                  id="switcher-menu-primary"
                  on:change={() => menuColorFn("color")}
                  checked={$userData.menuColor === "color"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="color-menu"
                  content="Color Menu"
                />
              </div>
              <div class="form-check switch-select me-3" id="gradient-menu">
                <input
                  class="form-check-input color-input color-gradient"
                  type="radio"
                  name="menu-colors"
                  id="switcher-menu-gradient"
                  on:change={() => menuColorFn("gradient")}
                  checked={$userData.menuColor === "gradient"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="gradient-menu"
                  content="Gradient Menu"
                />
              </div>
              <div class="form-check switch-select me-3" id="transparent-menu">
                <input
                  class="form-check-input color-input color-transparent"
                  type="radio"
                  name="menu-colors"
                  id="switcher-menu-transparent"
                  on:change={() => menuColorFn("transparent")}
                  checked={$userData.menuColor === "transparent"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="transparent-menu"
                  content="Transparent Menu"
                />
              </div>
            </div>
            <div class="px-4 pb-3 text-muted fs-11">
              Note:If you want to change color Menu dynamically change from
              below Theme Primary color picker
            </div>
          </div>
          <div class="theme-colors">
            <p class="switcher-style-head">Header Colors:</p>
            <div class="d-flex switcher-style pb-2">
              <div class="form-check switch-select me-3" id="light-Header">
                <input
                  class="form-check-input color-input color-white"
                  type="radio"
                  name="header-colors"
                  id="switcher-header-light"
                  on:change={() => headerColorFn("light")}
                  checked={$userData.headerColor === "light"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="light-Header"
                  content="Light Header"
                />
              </div>
              <div class="form-check switch-select me-3" id="dark-header">
                <input
                  class="form-check-input color-input color-dark"
                  type="radio"
                  name="header-colors"
                  id="switcher-header-dark"
                  on:change={() => headerColorFn("dark")}
                  checked={$userData.headerColor === "dark"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="dark-Header"
                  content="Dark Header"
                />
              </div>
              <div class="form-check switch-select me-3" id="color-header">
                <input
                  class="form-check-input color-input color-primary"
                  type="radio"
                  name="header-colors"
                  id="switcher-header-primary"
                  on:change={() => headerColorFn("color")}
                  checked={$userData.headerColor === "color"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="color-Header"
                  content="Color Header"
                />
              </div>
              <div class="form-check switch-select me-3" id="gradient-header">
                <input
                  class="form-check-input color-input color-gradient"
                  type="radio"
                  name="header-colors"
                  id="switcher-header-gradient"
                  on:change={() => headerColorFn("gradient")}
                  checked={$userData.headerColor === "gradient"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="gradient-Header"
                  content="Gradient Header"
                />
              </div>
              <div
                class="form-check switch-select me-3"
                id="transparent-Header"
              >
                <input
                  class="form-check-input color-input color-transparent"
                  type="radio"
                  name="header-colors"
                  id="switcher-header-transparent"
                  on:change={() => headerColorFn("transparent")}
                  checked={$userData.headerColor === "transparent"}
                />
                <SpkTooltips
                  placement="top"
                  targetId="transparent-Header"
                  content="Transparent Header"
                />
              </div>
            </div>
            <div class="px-4 pb-3 text-muted fs-11">
              Note:If you want to change color Header dynamically change from
              below Theme Primary color picker
            </div>
          </div>
          <div class="theme-colors">
            <p class="switcher-style-head">Theme Primary:</p>
            <div class="d-flex flex-wrap align-items-center switcher-style">
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-primary-1"
                  type="radio"
                  name="theme-primary"
                  id="switcher-primary"
                  on:change={() => themePrimaryFn("58, 88, 146")}
                  checked={$userData.themePrimary === "58, 88, 146"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-primary-2"
                  type="radio"
                  name="theme-primary"
                  id="switcher-primary1"
                  on:change={() => themePrimaryFn("92, 144, 163")}
                  checked={$userData.themePrimary === "92, 144, 163"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-primary-3"
                  type="radio"
                  name="theme-primary"
                  id="switcher-primary2"
                  on:change={() => themePrimaryFn("161, 90, 223")}
                  checked={$userData.themePrimary === "161, 90, 223"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-primary-4"
                  type="radio"
                  name="theme-primary"
                  id="switcher-primary3"
                  on:change={() => themePrimaryFn("78, 172, 76")}
                  checked={$userData.themePrimary === "78, 172, 76"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-primary-5"
                  type="radio"
                  name="theme-primary"
                  id="switcher-primary4"
                  on:change={() => themePrimaryFn("223, 90, 90")}
                  checked={$userData.themePrimary === "223, 90, 90"}
                />
              </div>
              <div
                class="form-check switch-select ps-0 mt-1 color-primary-light"
              >
                <div class="theme-container-primary"></div>
                <div class="pickr-container-primary">
                  <div class="pickr">
                    <input
                      type="color"
                      class="pcr-button"
                      role="button"
                      aria-label="toggle color picker dialog"
                      style="--pcr-color: rgba(132, 90, 223, 1);"
                      bind:value={initialColor}
                      on:input={(event) => primaryColorFn(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="theme-colors">
            <p class="switcher-style-head">Theme Background:</p>
            <div class="d-flex flex-wrap align-items-center switcher-style">
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-bg-1"
                  type="radio"
                  name="theme-background"
                  id="switcher-background"
                  on:change={() =>
                    themeBackgroundFn("20, 30, 96", "25, 38, 101")}
                  checked={$userData.themeBackground ===
                    "20, 30, 96, 25, 38, 101"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-bg-2"
                  type="radio"
                  name="theme-background"
                  id="switcher-background1"
                  on:change={() =>
                    themeBackgroundFn("8, 78, 115", "13, 86, 120")}
                  checked={$userData.themeBackground ===
                    "8, 78, 115, 13, 86, 120"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-bg-3"
                  type="radio"
                  name="theme-background"
                  id="switcher-background2"
                  on:change={() =>
                    themeBackgroundFn("90, 37, 135", "95, 45, 140")}
                  checked={$userData.themeBackground ===
                    "90, 37, 135, 95, 45, 140"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-bg-4"
                  type="radio"
                  name="theme-background"
                  id="switcher-background3"
                  on:change={() =>
                    themeBackgroundFn("24, 101, 51", "29, 109, 56")}
                  checked={$userData.themeBackground ===
                    "24, 101, 51, 29, 109, 56"}
                />
              </div>
              <div class="form-check switch-select me-3">
                <input
                  class="form-check-input color-input color-bg-5"
                  type="radio"
                  name="theme-background"
                  id="switcher-background4"
                  on:change={() =>
                    themeBackgroundFn("120, 66, 20", "125, 74, 25")}
                  checked={$userData.themeBackground ===
                    "120, 66, 20, 125, 74, 25"}
                />
              </div>
              <div
                class="form-check switch-select ps-0 mt-1 tooltip-static-demo color-bg-transparent"
              >
                <div class="theme-container-background"></div>
                <div class="pickr-container-background">
                  <div class="pickr">
                    <input
                      type="color"
                      class="pcr-button"
                      role="button"
                      style="--pcr-color: rgba(132, 90, 223, 1);"
                      bind:value={initialColor}
                      on:input={(event) =>
                        dynamicBackgroundColorFn(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-image mb-3">
            <p class="switcher-style-head">Menu With Background Image:</p>
            <div class="d-flex flex-wrap align-items-center switcher-style">
              <div class="form-check switch-select m-2">
                <input
                  class="form-check-input bgimage-input bg-img1"
                  type="radio"
                  name="theme-bg"
                  id="switcher-bg-img"
                  on:click={() => backgroundImageFn("bgimg1")}
                  on:change={() => {}}
                />
              </div>
              <div class="form-check switch-select m-2">
                <input
                  class="form-check-input bgimage-input bg-img2"
                  type="radio"
                  name="theme-bg"
                  id="switcher-bg-img1"
                  on:click={() => backgroundImageFn("bgimg2")}
                  on:change={() => {}}
                />
              </div>
              <div class="form-check switch-select m-2">
                <input
                  class="form-check-input bgimage-input bg-img3"
                  type="radio"
                  name="theme-bg"
                  id="switcher-bg-img2"
                  on:click={() => backgroundImageFn("bgimg3")}
                  on:change={() => {}}
                />
              </div>
              <div class="form-check switch-select m-2">
                <input
                  class="form-check-input bgimage-input bg-img4"
                  type="radio"
                  name="theme-bg"
                  id="switcher-bg-img3"
                  on:click={() => backgroundImageFn("bgimg4")}
                  on:change={() => {}}
                />
              </div>
              <div class="form-check switch-select m-2">
                <input
                  class="form-check-input bgimage-input bg-img5"
                  type="radio"
                  name="theme-bg"
                  id="switcher-bg-img4"
                  on:click={() => backgroundImageFn("bgimg5")}
                  on:change={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </TabPane>
    </TabContent>
    <div class="d-flex justify-content-between canvas-footer">
      <a
        href="#!"
        id="reset-all"
        class="btn btn-danger w-100 "
        on:click={() => reset()}>Reset</a
      >
    </div>
  </OffcanvasBody>
</Offcanvas>
