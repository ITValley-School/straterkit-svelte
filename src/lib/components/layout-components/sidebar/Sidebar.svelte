<script>
  import { Svroller } from "svrollbar";
  import { menuData } from "./nav.js";
  import RecursiveMenu from "./RecursiveMenu.svelte";
  import { writable } from "svelte/store";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount, onDestroy } from "svelte";
  import { themeStore } from "../switcher/switcher.js";

  let level = 0;
  // console.log("HoverToggleInnerMenuFn triggered for:", menuData);
  let userdata = themeStore.userData;
  // Create a writable store to hold the menu state
  let openMenu = writable(menuData);

  const basePath = __BASE_PATH__;

  // console.log(basePath)
  // Start of Toggle menu event
  function toggleSubmenu(event, targetObject, MenuData = $openMenu, level = 0) {
    let html = document.documentElement;
    let element = event.target;
    if (
      (html.getAttribute("data-nav-style") != "icon-hover" &&
        html.getAttribute("data-nav-style") != "menu-hover") ||
      window.innerWidth < 992 ||
      (html.getAttribute("data-nav-layout") != "horizontal" &&
        html.getAttribute("data-toggled") != "icon-hover-closed" &&
        html.getAttribute("data-toggled") != "menu-hover-closed")
    ) {
      for (const item of MenuData) {
        if (item === targetObject) {
          if (
            html.getAttribute("data-vertical-style") == "doublemenu" &&
            item.active
          ) {
            item.active = !item.active;
            return;
          }
          item.active = !item.active;
          if (item.active) {
            closeOtherMenus(MenuData, item);
          } else {
            if (html.getAttribute("data-vertical-style") == "doublemenu") {
              html.setAttribute("data-toggled", "double-menu-close");
            }
          }
          setAncestorsActive(MenuData, item);
        } else if (!item.active) {
          if (html.getAttribute("data-vertical-style") != "doublemenu") {
            item.active = false; // Set active to false for items not matching the target
          }
        }
        if (item.children && item.children.length > 0) {
          toggleSubmenu(event, targetObject, item.children, level++);
        }
      }
      if (targetObject?.children && targetObject.active) {
        if (
          html.getAttribute("data-vertical-style") == "doublemenu" &&
          html.getAttribute("data-toggled") != "double-menu-open"
        ) {
          html.setAttribute("data-toggled", "double-menu-open");
        }
      }

      if (
        element &&
        html.getAttribute("data-nav-layout") == "horizontal" &&
        (html.getAttribute("data-nav-style") == "menu-click" ||
          html.getAttribute("data-nav-style") == "icon-click")
      ) {
        let listItem = element.closest("li");
        if (listItem) {
          // Find the first sibling <ul> element
          let siblingUL = listItem.querySelector("ul");
          let outterUlWidth = 0;
          let listItemUL = listItem.closest("ul:not(.main-menu)");
          while (listItemUL) {
            listItemUL = listItemUL.parentElement.closest("ul:not(.main-menu)");
            if (listItemUL) {
              outterUlWidth += listItemUL.clientWidth;
            }
          }
          if (siblingUL) {
            // You've found the sibling <ul> element
            let siblingULRect = listItem.getBoundingClientRect();
            if (html.getAttribute("dir") == "rtl") {
              if (
                siblingULRect.left - siblingULRect.width - outterUlWidth + 150 <
                  0 &&
                outterUlWidth < window.innerWidth &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                  window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            } else {
              if (
                outterUlWidth + siblingULRect.right + siblingULRect.width + 50 >
                  window.innerWidth &&
                siblingULRect.right >= 0 &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                  window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            }
          }
        }
      }
    }
    openMenu.update((arr) => [...arr]);
  }

  afterNavigate(() => {
    Baselocation = $page.url.pathname;
    const updatedMenu = updateMenu($openMenu);
    openMenu.set(updatedMenu);
  });

  let Baselocation = $page.url.pathname;

  const updateMenu = (menu) => {
    const normalizePath = (path) => {
      return path && path.endsWith("/") ? path.slice(0, -1) : path;
    };

    const pathName = normalizePath(Baselocation);
    // console.log(pathName);
    return menu?.map((menuItem) => {
      const menuItemPath = normalizePath(basePath + menuItem?.path);
      // console.log(pathName, menuItemPath);

      if (menuItemPath === pathName) {
        menuItem.active = true;
        menuItem.selected = true;
      } else if (menuItem.children) {
        menuItem.children = updateMenu(menuItem.children);
        if (menuItem.children.some((subMenu) => subMenu.active)) {
          menuItem.active = true;
          menuItem.selected = true; // Parent gets selected if any child is active
        } else {
          menuItem.active = false;
          menuItem.selected = false;
        }
      } else {
        menuItem.active = false;
        menuItem.selected = false;
      }
      return menuItem;
    });
  };

  function setAncestorsActive(menuData, targetObject) {
    let html = document.documentElement;
    const parent = findParent(menuData, targetObject);
    if (parent) {
      parent.active = true;
      if (parent.active) {
        html.setAttribute("data-toggled", "double-menu-open");
      }
      setAncestorsActive(menuData, parent);
    } else {
      if (html.getAttribute("data-vertical-style") == "doublemenu") {
        html.setAttribute("data-toggled", "double-menu-close");
      }
    }
  }
  function closeOtherMenus(menuData, targetObject) {
    for (const item of menuData) {
      if (item !== targetObject) {
        item.active = false;
        if (item.children && item.children.length > 0) {
          closeOtherMenus(item.children, targetObject);
        }
      }
    }
  }
  function findParent(MenuData = menuData, targetObject) {
    for (const item of MenuData) {
      if (item.children && item.children.includes(targetObject)) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const parent = findParent(MenuData=item.children, targetObject);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }
  // End of Toggle menu event
  function HoverToggleInnerMenuFn(event, item) {
    let html = document.documentElement;
    let element = event.target;
    if (
      element &&
      html.getAttribute("data-nav-layout") == "horizontal" &&
      (html.getAttribute("data-nav-style") == "menu-hover" ||
        html.getAttribute("data-nav-style") == "icon-hover")
    ) {
      const listItem = element.closest("li");
      if (listItem) {
        // Find the first sibling <ul> element
        const siblingUL = listItem.querySelector("ul");
        let outterUlWidth = 0;
        let listItemUL = listItem.closest("ul:not(.main-menu)");
        while (listItemUL) {
          listItemUL = listItemUL.parentElement.closest("ul:not(.main-menu)");
          if (listItemUL) {
            outterUlWidth += listItemUL.clientWidth;
          }
        }
        if (siblingUL) {
          // You've found the sibling <ul> element
          let siblingULRect = listItem.getBoundingClientRect();
          if (html.getAttribute("dir") == "rtl") {
            if (
              siblingULRect.left - siblingULRect.width - outterUlWidth + 150 <
                0 &&
              outterUlWidth < window.innerWidth &&
              outterUlWidth + siblingULRect.width + siblingULRect.width <
                window.innerWidth
            ) {
              item.dirchange = true;
            } else {
              item.dirchange = false;
            }
          } else {
            if (
              outterUlWidth + siblingULRect.right + siblingULRect.width + 50 >
                window.innerWidth &&
              siblingULRect.right >= 0 &&
              outterUlWidth + siblingULRect.width + siblingULRect.width <
                window.innerWidth
            ) {
              item.dirchange = true;
            } else {
              item.dirchange = false;
            }
          }
        }
      }
    }
  }

  // Store for pathname and previous URL tracking
  let previousUrl = writable("/");
  let currentPath = writable("");

  // You may need to initialize these variables based on your Svelte routing setup
  let hasParent = false;
  let hasParentLevel = 1;

  // Start of Set menu Active event

  function setSubmenu(event, targetObject, menuData = $openMenu) {
    const html = document.documentElement;

    // Check conditions based on data-nav-style
    if (
      (window.screen.availWidth <= 992 ||
        html.getAttribute("data-nav-style") != "icon-hover") &&
      (window.screen.availWidth <= 992 ||
        html.getAttribute("data-nav-style") != "menu-hover")
    ) {
      if (!event?.ctrlKey) {
        // Loop through each menu item
        for (const item of menuData) {
          if (item === targetObject) {
            item.active = true;
            item.selected = true;
            setMenuAncestorsActive(item);
          } else if (!item.active && !item.selected) {
            item.active = false; // Set active to false for items not matching the target
            item.selected = false; // Set active to false for items not matching the target
          } else {
            removeActiveOtherMenus(item);
          }
          if (item.children && item.children.length > 0) {
            setSubmenu(event, targetObject, item.children);
          }
        }
      }
    }
    // Trigger an update to the openMenu store
    openMenu.update((arr) => [...arr]);
  }

  // function setSubmenu(event, targetObject, menuData = $openMenu) {
  //   let html = document.documentElement;
  //   if (
  //     html.getAttribute("data-nav-style") != "icon-hover" &&
  //     html.getAttribute("data-nav-style") != "menu-hover"
  //   ) {
  //     if (!event?.ctrlKey) {
  //       this.setMenu = true;
  //       for (const item of menuData) {
  //         if (item === targetObject) {
  //           item.active = true;
  //           item.selected = true;
  //           setMenuAncestorsActive(item);
  //         } else if (!item.active && !item.selected) {
  //           item.active = false; // Set active to false for items not matching the target
  //           item.selected = false; // Set active to false for items not matching the target
  //         } else {
  //           removeActiveOtherMenus(item);
  //         }
  //         if (item.children && item.children.length > 0) {
  //           setSubmenu(event, targetObject, item.children);
  //         }
  //       }
  //       setMenu = false;
  //     }
  //   }
  // }

  function getParentObject(obj, childObject) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          typeof obj[key] === "object" &&
          JSON.stringify(obj[key]) === JSON.stringify(childObject)
        ) {
          return obj; // Return the parent object
        }
        if (typeof obj[key] === "object") {
          const parentObject = getParentObject(obj[key], childObject);
          if (parentObject !== null) {
            return parentObject;
          }
        }
      }
    }
    return null; // Object not found
  }

  // Recursive function to set ancestors as active
  function setMenuAncestorsActive(targetObject) {
    const parent = getParentObject(menuData, targetObject);
    let html = document.documentElement;

    if (parent) {
      if (hasParentLevel > 2) {
        hasParent = true;
      }
      parent.active = true;
      parent.selected = true;

      hasParentLevel += 1;

      setMenuAncestorsActive(parent);
    } else if (!hasParent) {
      hasParentLevel = 0;
      if (html.getAttribute("data-vertical-style") === "doublemenu") {
        html.setAttribute("data-toggled", "double-menu-close");
      } else {
        hasParentLevel = 0;
        hasParent = false;
      }
    }
  }
  function removeActiveOtherMenus(item) {
    if (item) {
      if (Array.isArray(item)) {
        for (const val of item) {
          val.active = false;
          val.selected = false;
        }
      }
      item.active = false;
      item.selected = false;

      if (item.children && item.children.length > 0) {
        removeActiveOtherMenus(item.children);
      }
    } else {
      // return;
    }
  }
  // End of Set menu Active event

  const setMenuUsingUrl = (currentPath) => {
    hasParent = false;
    hasParentLevel = 1;

    const setSubmenuRecursively = (items) => {
      items?.forEach((item) => {
        if (item.path == "") {
        } else if (item.path === currentPath) {
          setSubmenu(null, item);
        }
        setSubmenuRecursively(item.children);
      });
    };
    openMenu.update((currentMenuData) => {
      setSubmenuRecursively(currentMenuData);
      return [...currentMenuData];
    });
  };

  // Handle attribute changes in mutation observer
  const handleAttributeChange = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-nav-layout"
      ) {
        const newValue = mutation.target.getAttribute("data-nav-layout");
        if (newValue === "vertical") {
          let currentPathVal = window.location.pathname.endsWith("/")
            ? window.location.pathname.slice(0, -1).replace(basePath, "")
            : window.location.pathname.replace(basePath, "");
          currentPathVal = !currentPathVal
            ? "/dashboards/ecommerce"
            : currentPathVal;
          currentPath.set(currentPathVal); // Update current path in the store
          setMenuUsingUrl(currentPathVal);
        } else {
          closeMenuFn(); // Ensure you define closeMenu logic elsewhere
        }
      }
    }
  };

  // Use Svelte's onMount to create and observe mutations
  onMount(() => {
    const targetElement = document.documentElement;

    const observer = new MutationObserver(handleAttributeChange);
    const config = { attributes: true };

    observer.observe(targetElement, config);

    return () => {
      observer.disconnect();
    };
  });

  $: {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      const path = Baselocation.endsWith("/")
        ? Baselocation.slice(0, -1)
        : Baselocation;

      if (path !== $previousUrl) {
        currentPath.set(path); // Update current path
        setMenuUsingUrl(path);
        previousUrl.set(path); // Update previous URL
      }
    }
  }

  function switcherArrowFn() {
    // Used to remove is-expanded class and remove class on clicking arrow buttons
    function slideClick() {
      const slide = document.querySelectorAll(".slide");
      const slideMenu = document.querySelectorAll(".slide-menu");

      slide.forEach((element) => {
        if (element.classList.contains("is-expanded")) {
          element.classList.remove("is-expanded");
        }
      });

      slideMenu.forEach((element) => {
        if (element.classList.contains("open")) {
          element.classList.remove("open");
          element.style.display = "none";
        }
      });
    }

    slideClick();
  }

  function leftArrowFn() {
    // Used to move the slide of the menu in Horizontal and also remove the arrows after click  if there was no space
    // Used to Slide the menu to Left side
    let slideLeft = document.querySelector(".slide-left");
    let slideRight = document.querySelector(".slide-right");
    let menuNav = document.querySelector(".main-menu");
    let mainContainer1 = document.querySelector(".main-sidebar");
    let marginRightValue = Math.ceil(
      Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0]),
    );
    let mainContainer1Width = mainContainer1.offsetWidth;
    if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
      if (
        marginRightValue < 0 &&
        !(Math.abs(marginRightValue) < mainContainer1Width)
      ) {
        menuNav.style.marginInlineStart =
          Number(menuNav.style.marginInlineStart.split("px")[0]) +
          Math.abs(mainContainer1Width) +
          "px";
        slideRight.classList.remove("d-none");
      } else if (marginRightValue >= 0) {
        menuNav.style.marginInlineStart = "0px";
        slideLeft.classList.add("d-none");
        slideRight.classList.remove("d-none");
      } else {
        menuNav.style.marginInlineStart = "0px";
        slideLeft.classList.add("d-none");
        slideRight.classList.remove("d-none");
      }
    } else {
      menuNav.style.marginInlineStart = "0px";
      slideLeft.classList.add("d-none");
    }

    let element = document.querySelector(".main-menu > .slide.open");
    let element1 = document.querySelector(".main-menu > .slide.open >ul");
    if (element) {
      element.classList.remove("open");
    }
    if (element1) {
      element1.style.display = "none";
    }
    // switcherArrowFn()
  }
  function rightArrowFn() {
    // Used to move the slide of the menu in Horizontal and also remove the arrows after click  if there was no space
    // Used to Slide the menu to Right side
    let slideLeft = document.querySelector(".slide-left");
    let slideRight = document.querySelector(".slide-right");
    let menuNav = document.querySelector(".main-menu");
    let mainContainer1 = document.querySelector(".main-sidebar");
    let marginRightValue = Math.ceil(
      Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0]),
    );
    let check = menuNav.scrollWidth - mainContainer1.offsetWidth;
    let mainContainer1Width = mainContainer1.offsetWidth;
    if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
      if (Math.abs(check) > Math.abs(marginRightValue)) {
        if (
          !(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)
        ) {
          mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
          slideRight.classList.add("d-none");
        }
        menuNav.style.marginInlineStart =
          Number(menuNav.style.marginInlineStart.split("px")[0]) -
          Math.abs(mainContainer1Width) +
          "px";
        slideLeft.classList.remove("d-none");
      }
    }

    let element = document.querySelector(".main-menu > .slide.open");
    let element1 = document.querySelector(".main-menu > .slide.open >ul");
    if (element) {
      element.classList.remove("open");
    }
    if (element1) {
      element1.style.display = "none";
    }
    // switcherArrowFn()
    // checkHoriMenu();
  }

  function checkHoriMenu() {
    let menuNav = document.querySelector(".main-sidebar");
    let mainMenu = document.querySelector(".main-menu");
    let slideLeft = document.querySelector(".slide-left");
    let slideRight = document.querySelector(".slide-right");

    // Show/Hide the arrows
    if (mainMenu && menuNav && slideRight && slideLeft) {
      let marginRightValue = Math.ceil(
        Number(
          window.getComputedStyle(mainMenu).marginInlineStart.split("px")[0],
        ),
      );
      if (mainMenu?.scrollWidth > menuNav?.offsetWidth) {
        slideRight?.classList.remove("d-none");
        slideLeft?.classList.add("d-none");
      } else {
        slideRight?.classList.add("d-none");
        slideLeft?.classList.add("d-none");
        mainMenu.style.marginLeft = "0px";
        mainMenu.style.marginRight = "0px";
      }
      if (marginRightValue == 0) {
        slideLeft?.classList.add("d-none");
      } else {
        slideLeft?.classList.remove("d-none");
      }
    }
  }

  function menuClose() {
    let html = document.documentElement;
    if (window.innerWidth <= 992) {
      html.setAttribute("data-toggled", "close");
    }
    let overlayElement = document.querySelector("#responsive-overlay");
    if (overlayElement) {
      overlayElement.classList.remove("active");
    }
    if (
      html.getAttribute("data-nav-layout") == "horizontal" ||
      html.getAttribute("data-nav-style") == "menu-click" ||
      html.getAttribute("data-nav-style") == "icon-click" ||
      html.getAttribute("data-nav-style") == "icon-hover"
    ) {
      closeMenuFn();
    }
  }

  function closeMenuFn() {
    const closeMenuRecursively = (items) => {
      items?.forEach((item) => {
        item.active = false;
        if (item.children) closeMenuRecursively(item.children);
      });
    };
    openMenu.update((currentMenuData) => {
      closeMenuRecursively(currentMenuData);
      return [...currentMenuData];
    });
  }
  // End of Menu Close functionality
  // Start of Resize check for menu

  let windowWidth;

  // Check if we are in a browser environment before accessing window
  if (typeof window !== "undefined") {
    // Set the initial width
    windowWidth = window.innerWidth;

    const updateWidth = () => {
      windowWidth = window.innerWidth;
      let html = document.documentElement;
      if (window.innerWidth < 992) {
        html.setAttribute("data-toggled", "close");
      }
      const overlayElement = document.querySelector("#responsive-overlay");
      if (overlayElement) {
        overlayElement.classList.remove("active");
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", updateWidth);

    // Cleanup the event listener on component destroy

    onDestroy(() => {
      window.removeEventListener("resize", updateWidth);
    });
  }

  let WindowPreSize = typeof window !== "undefined" ? [window.innerWidth] : [];

  function menuResizeFn() {
    WindowPreSize.push(window.innerWidth);
    if (WindowPreSize.length > 2) {
      WindowPreSize.shift();
    }
    if (WindowPreSize.length > 1) {
      if (
        WindowPreSize[WindowPreSize.length - 1] < 992 &&
        WindowPreSize[WindowPreSize.length - 2] >= 992
      ) {
        // less than 992;
        let html = document.documentElement;
        html.setAttribute("data-toggled", "close");
      }

      if (
        WindowPreSize[WindowPreSize.length - 1] >= 992 &&
        WindowPreSize[WindowPreSize.length - 2] < 992
      ) {
        let html = document.documentElement;
        // greater than 992
        if (html.getAttribute("data-vertical-style") == "doublemenu") {
          html.setAttribute("data-toggled", "double-menu-open");
        } else {
          html.removeAttribute("data-toggled");
        }
      }
    }
  }

  // End of Resize check for menu

  onMount(() => {
    let html = document.documentElement;
    window.addEventListener("resize", menuResizeFn);
    window.addEventListener("resize", checkHoriMenu);
    let mainContent = document.querySelector(".main-content");
    if (window.innerWidth < 992) {
      if (mainContent) {
        html.setAttribute("data-toggled", "close");
      }
    } else if (html.getAttribute("data-nav-layout") == "horizontal") {
      closeMenuFn();
    }
    // if (mainContent) {
    //   mainContent.addEventListener("click", menuClose);
    // }
    mainContent.addEventListener("click", menuClose);
    return () => {
      window.removeEventListener("resize", menuResizeFn);
      window.removeEventListener("resize", checkHoriMenu);
    };
  });

  //  prevent the reload or refresh

  const handleClick = (event) => {
    event.preventDefault(); // Prevents the default anchor behavior (navigation)
  };
</script>

<a href="#!" on:click={menuClose}>
  <div id="responsive-overlay"></div>
</a>
<aside class="app-sidebar sticky" id="sidebar">
  <!-- Start::main-sidebar-header -->
  <div class="main-sidebar-header">
    <a href={`${basePath}/dashboards/crm`} class="header-logo">
      <img
        src={`${basePath}/images/brand-logos/desktop-logo.png`}
        alt="logo"
        class="desktop-logo"
      />
      <img
        src={`${basePath}/images/brand-logos/toggle-logo.png`}
        alt="logo"
        class="toggle-logo"
      />
      <img
        src={`${basePath}/images/brand-logos/desktop-dark.png`}
        alt="logo"
        class="desktop-dark"
      />
      <img
        src={`${basePath}/images/brand-logos/toggle-dark.png`}
        alt="logo"
        class="toggle-dark"
      />
      <img
        src={`${basePath}/images/brand-logos/desktop-white.png`}
        alt="logo"
        class="desktop-white"
      />
      <img
        src={`${basePath}/images/brand-logos/toggle-white.png`}
        alt="logo"
        class="toggle-white"
      />
    </a>
  </div>
  <!-- End::main-sidebar-header -->

  <!-- Start::main-sidebar -->
  <div class="main-sidebar" id="sidebar-scroll">
    <Svroller width="100%" height="100%">
      <!-- Start::nav -->
      <nav class="main-menu-container nav nav-pills flex-column sub-open">
        <!-- Left Arrow -->
        <a href="#!" on:click={leftArrowFn} role="button">
          <div class="slide-left" id="slide-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#7b8191"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
              ></path>
            </svg>
          </div>
        </a>
        <!-- Menu List -->

        <ul class="main-menu">
          {#each $openMenu || [] as levelone, index}
            <li
              class={`${
                levelone?.menuTitle ? "slide__category" : ""
              } ${levelone?.type === "link" ? "slide" : ""} ${
                levelone?.type === "empty" ? "slide" : ""
              } ${levelone?.type === "sub" ? "slide has-sub" : ""} ${
                levelone?.active ? "open" : ""
              } ${levelone?.selected ? "active" : ""}`}
              key={index}
            >
              {#if levelone?.menuTitle}
                <span class="category-name">{levelone.menuTitle}</span>
              {/if}
              {#if levelone?.type === "link"}
                <a
                  href={`${basePath}${levelone.path}`}
                  class="side-menu__item {levelone.selected ? 'active' : ''}"
                >
                  <i class="{levelone.icon} side-menu__icon"></i>
                  <span class="side-menu__label">
                    {levelone.title}
                    {#if levelone.badge}
                      <span class="badge {levelone.badgeColor} ms-1"
                        >{levelone.badge}</span
                      >
                    {/if}
                  </span>
                </a>
              {/if}
              {#if levelone?.type === "empty"}
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a href="#!" class="side-menu__item" on:click={handleClick}>
                  <i class="{levelone.icon} side-menu__icon"></i>
                  <span class="side-menu__label">
                    {levelone.title}
                    {#if levelone.badge}
                      <span class="badge {levelone.badgeColor} ms-1"
                        >{levelone.badge}</span
                      >
                    {/if}
                  </span>
                </a>
              {/if}
              {#if levelone?.type === "sub"}
                {#if levelone.children}
                  <RecursiveMenu
                    menuData={levelone}
                    {toggleSubmenu}
                    {HoverToggleInnerMenuFn}
                    level={level + 1}
                  />
                {/if}
              {/if}
            </li>
          {/each}
        </ul>
        <!-- Right Arrow -->
        <a href="#!" role="button" on:click={rightArrowFn}>
          <div class="slide-right" id="slide-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#7b8191"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
              ></path>
            </svg>
          </div>
        </a>
      </nav>
      <!-- End::nav -->
    </Svroller>
  </div>
  <!-- End::main-sidebar -->
</aside>

<style>
</style>
