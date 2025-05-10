<script>
  import { onMount } from "svelte";
  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    ModalFooter,
  } from "@sveltestrap/sveltestrap";
  import { writable } from "svelte/store";
  import Select from "svelte-select";
  import Switcher from "../switcher/Switcher.svelte";
  import { menuData } from "$lib/components/layout-components/sidebar/nav.js"; // Adjust the path as needed
  import { themeStore } from "../switcher/switcher.js";
  import { userData } from "$lib/store/userStore.js";
  const basePath = __BASE_PATH__;
  export const Data1 = [
    { value: "1", label: "Argentina" },
    { value: "2", label: "Argentina" },
    { value: "3", label: "France" },
    { value: "4", label: "Germany" },
    { value: "5", label: "Italy" },
    { value: "6", label: "Netherlands" },
    { value: "7", label: "Spain" },
    { value: "8", label: "United States" },
  ];
  export const Data2 = [
    { value: "1", label: "English (En)" },
    { value: "2", label: "Española (ES)" },
    { value: "3", label: "Français (FR)" },
    { value: "4", label: "Deutsch (DE)" },
    { value: "5", label: "Italiana (IT)" },
    { value: "6", label: "Русский (RU)" },
    { value: "7", label: "عربي (AR)" },
    { value: "8", label: "한국인 (KO)" },
  ];

  let isFullscreen = false; // Declare a variable to keep track of fullscreen state

  function toggleFullscreen() {
    if (!isFullscreen) {
      // Check for various fullscreen methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }

    // Toggle the fullscreen state
    isFullscreen = !isFullscreen;
  }
  //

  let open = false;
  const toggle = () => (open = !open);

  ///
  let search = false;
  const toggleSearch = () => {
    search = !search;
  };

  // Reactive variables
  let show1 = false;
  let inputValue = "";

  const clearSearch = () => {
    inputValue = "";
  };

  const getTitlesWithPaths = (menuItems) => {
    let titles = [];

    menuItems.forEach((item) => {
      if (item.path) {
        titles.push({ title: item.title, path: item.path });
      }
      if (item.children && Array.isArray(item.children)) {
        titles.push(...getTitlesWithPaths(item.children));
      }
    });
    return titles;
  };

  const filterSuggestions = getTitlesWithPaths(menuData);

  // Reactive search logic
  $: searchLower = inputValue.toLowerCase();
  $: suggestions = filterSuggestions.filter((item) =>
    item.title.toLowerCase().includes(searchLower)
  );
  $: suggestion = suggestions.filter((item) =>
    item.title.toLowerCase().startsWith(searchLower)
  );

  // Event handlers
  function handleInputChange(e) {
    inputValue = e.target.value;
    show1 = inputValue.length > 0;
  }

  function handleSuggestionClick(suggestion) {
    inputValue = suggestion.title;
    show1 = false;
    search = false;
    inputValue = "";
  }

  // Toggle functions for recent searches
  let showRecent = [true, true, true];

  function myFunction(value) {
    inputValue = value;
    show1 = value.length > 0; // Show search results if there's input
  }

  function toggleShowRecent(index) {
    showRecent[index] = !showRecent[index];
  }

  const searches = writable([
    { name: "Notifications", link: `${basePath}/pages/notifications/` },
    { name: "Alerts", link: `${basePath}/uielements/alerts/` },
    { name: "Mail", link: `${basePath}/pages/email/mail-app` },
  ]);
  function deleteSearch(index) {
    searches.update((current) => current.filter((_, i) => i !== index));
  }
  //

  // A function to toggle the theme
  const toggleTheme = (value) => {
    // Assuming themeStore.colorthemeFn is already defined elsewhere
    themeStore.updateColorThemeFn(value);
    localStorage.setItem("ynexcolortheme", value);
    localStorage.removeItem("ynexMenu");
    localStorage.removeItem("ynexHeader");
    localStorage.removeItem("ynexbodylightRGB");
    localStorage.removeItem("ynexbodyBgRGB");
  };

  function toggleSidebar() {
    let html = document.querySelector("html");

    // Check the window width
    if (window.innerWidth <= 992) {
      let dataToggled = html.getAttribute("data-toggled");

      if (dataToggled == "open") {
        html.setAttribute("data-toggled", "close");
      } else {
        html.setAttribute("data-toggled", "open");
      }
    } else {
      let menuNavLayoutType = html.getAttribute("data-nav-style");
      let verticalStyleType = html.getAttribute("data-vertical-style");

      if (menuNavLayoutType) {
        let dataToggled = html.getAttribute("data-toggled");
        if (dataToggled) {
          html.removeAttribute("data-toggled");
        } else {
          html.setAttribute("data-toggled", menuNavLayoutType + "-closed");
        }
      } else if (verticalStyleType) {
        let dataToggled = html.getAttribute("data-toggled");

        if (verticalStyleType == "doublemenu") {
          if (
            html.getAttribute("data-toggled") === "double-menu-open" &&
            document.querySelector(".double-menu-active")
          ) {
            html.setAttribute("data-toggled", "double-menu-close");
          } else {
            if (document.querySelector(".double-menu-active")) {
              html.setAttribute("data-toggled", "double-menu-open");
            }
          }
        } else if (dataToggled) {
          html.removeAttribute("data-toggled");
        } else {
          switch (verticalStyleType) {
            case "closed":
              html.setAttribute("data-toggled", "close-menu-close");
              break;
            case "icontext":
              html.setAttribute("data-toggled", "icon-text-close");
              break;
            case "overlay":
              html.setAttribute("data-toggled", "icon-overlay-close");
              break;
            case "detached":
              html.setAttribute("data-toggled", "detached-close");
              break;
            default:
          }
        }
      }
    }
  }
  const WindowPreSize =
    typeof window !== "undefined" ? [window.innerWidth] : [];
  function menuResizeFn() {
    if (typeof window === "undefined") {
      // Handle the case where window is not available (server-side rendering)
      return;
    }

    WindowPreSize.push(window.innerWidth);
    if (WindowPreSize.length > 2) {
      WindowPreSize.shift();
    }

    // const theme = getState();
    const currentWidth = WindowPreSize[WindowPreSize.length - 1];
    const prevWidth = WindowPreSize[WindowPreSize.length - 2];

    if (WindowPreSize.length > 1) {
      if (currentWidth < 992 && prevWidth >= 992) {
        themeStore.userData.update((current) => ({
          ...current,
          toggled: "close",
        }));
      }

      if (currentWidth >= 992 && prevWidth < 992) {
        themeStore.userData.update((current) => ({
          ...current,
          toggled:
            themeStore.userData.layoutStyles === "doublemenu"
              ? "double-menu-open"
              : "",
        }));
      }
    }
  }
  // Adding resize event to handle dynamically changing window width
  onMount(() => {
    window.addEventListener("resize", menuResizeFn);

    return () => {
      window.removeEventListener("resize", menuResizeFn);
    };
  });

  // Sample tags
  let tags = writable([
    { id: 1, icon: "fe-user", name: "People" },
    { id: 2, icon: "fe-file-text", name: "Pages" },
    { id: 3, icon: "fe-align-left", name: "Articles" },
    { id: 4, icon: "fe-server", name: "Tags" },
  ]);

  // Function to delete a tag
  function deleteTag(id) {
    tags.update((currentTags) => currentTags.filter((tag) => tag.id !== id));
  }

  let cartItems = [
    {
      id: 1,
      name: "SomeThing Phone",
      price: "1,299.00",
      image: "1.jpg",
      details: ["Metallic Blue", "6GB RAM"],
    },
    {
      id: 2,
      name: "Stop Watch",
      price: "179.29",
      image: "3.jpg",
      details: ["Analog"],
      offer: ["Free shipping"],
      offercolor: ["bg-pink-transparent"],
    },
    {
      id: 3,
      name: "Photo Frame",
      price: "29.0",
      image: "5.jpg",
      details: ["Decorative"],
    },
    {
      id: 4,
      name: "Kikon Camera",
      price: "4,999.0",
      image: "4.jpg",
      details: ["Black", "50MM"],
    },
    {
      id: 5,
      name: "Canvas Shoes",
      price: "129.00",
      image: "6.jpg",
      details: ["Gray", "Sports"],
    },
  ];

  // Function to handle the deletion of an item from the cart
  function removeItem(itemId) {
    cartItems = cartItems.filter((item) => item.id !== itemId);
  }

  // To get the total number of items in the cart
  $: cartItemCount = cartItems.length;

  // Notification data array (simulating the data you have)
  let notifications = [
    {
      id: 1,
      title: "Your Order Has Been Shipped",
      description: "Order No: 123456 Has Shipped To Your Delivery Address",
      icon: "ti-gift",
      color: "primary",
    },
    {
      id: 2,
      title: "Discount Available",
      description: "Discount Available On Selected Products",
      icon: "ti-discount-2",
      color: "secondary",
    },
    {
      id: 3,
      title: "Account Has Been Verified",
      description: "Your Account Has Been Verified Successfully",
      icon: "ti-user-check",
      color: "pink",
    },
    {
      id: 4,
      title: "Order Placed",
      description: "Order Placed Successfully",
      icon: "ti-circle-check",
      color: "warning",
      subTitle: "ID: #1116773",
      subTitleClass: "warning",
    },
    {
      id: 5,
      title: "Order Delayed",
      description: "Order Delayed Unfortunately",
      icon: "ti-clock",
      color: "success",
      subTitle: "D: 7731116",
      subTitleClass: "success",
    },
  ];

  // Function to delete a notification by ID
  function deleteNotification(id) {
    notifications = notifications.filter(
      (notification) => notification.id !== id
    );
  }
</script>

<header class="app-header">
  <!-- Start::main-header-container -->
  <div class="main-header-container container-fluid">
    <!-- Start::header-content-left -->
    <div class="header-content-left">
      <!-- Start::header-element -->
      <div class="header-element">
        <div class="horizontal-logo">
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
      </div>
      <!-- End::header-element -->

      <!-- Start::header-element -->
      <div class="header-element">
        <!-- Start::header-link -->
        <a
          aria-label="Hide Sidebar"
          class="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
          data-bs-toggle="sidebar"
          href="#!"
          on:click={toggleSidebar}><span></span></a
        >
        <!-- End::header-link -->
      </div>
      <!-- End::header-element -->
    </div>
    <!-- End::header-content-left -->

    <!-- Start::header-content-right -->
    <div class="header-content-right">
      <!-- Start::header-element -->
      <div class="header-element header-search">
        <!-- Start::header-link -->
        <a
          color=""
          on:click={toggleSearch}
          href="#!"
          class="header-link"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <i class="bx bx-search-alt-2 header-link-icon"></i>
        </a>
        <!-- End::header-link -->
      </div>
      <!-- End::header-element -->

      <!-- Start::header-element -->
      <div class="header-element country-selector">
        <!-- Start::header-link -->
        <a
          color=""
          on:click={toggle}
          href="#!"
          class="header-link"
          data-bs-toggle="modal"
          data-bs-target="#countryModal"
        >
          <img
            src={`${basePath}/images/flags/us_flag.jpg`}
            alt="img"
            class="rounded-circle header-link-icon"
          />
          <span class="fw-semibold mb-0 lh-1">EN</span>
        </a>
      </div>
      <!-- End::header-element -->

      <!-- Start::header-element -->
      <div class="header-element header-theme-mode">
        <!-- Start::header-link|layout-setting -->
        <a href="#!" class="header-link layout-setting" onscroll="false">
          <!-- svelte-ignore a11y-interactive-supports-focus -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class="light-layout"
            role="button"
            on:click={() => toggleTheme("dark")}
          >
            <!-- Start::header-link-icon -->
            <i class="bx bx-moon header-link-icon"></i>
            <!-- End::header-link-icon -->
          </span>

          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span class="dark-layout" on:click={() => toggleTheme("light")}>
            <!-- Start::header-link-icon -->
            <i class="bx bx-sun header-link-icon"></i>
            <!-- End::header-link-icon -->
          </span>
        </a>
        <!-- End::header-link|layout-setting -->
      </div>
      <!-- End::header-element -->

      <!-- Cart -->
      <!-- Start::header-element -->
      <Dropdown class="header-element cart-dropdown">
        <!-- Start::header-link|dropdown-toggle -->
        <DropdownToggle
          color=""
          class="header-link dropdown-toggle"
          data-bs-auto-close="outside"
          data-bs-toggle="dropdown"
        >
          <i class="bx bx-cart header-link-icon"></i>
          <span
            class="badge bg-primary rounded-pill header-icon-badge"
            id="cart-icon-badge">{cartItemCount}</span
          >
        </DropdownToggle>
        <!-- End::header-link|dropdown-toggle -->
        <!-- Start::main-header-dropdown -->
        <DropdownMenu
          class="main-header-dropdown dropdown-menu dropdown-menu-end"
          data-popper-placement="none"
          end
        >
          <div class="p-3">
            <div class="d-flex align-items-center justify-content-between">
              <p class="mb-0 fs-17 fw-semibold">Cart Items</p>
              <span class="badge bg-success-transparent" id="cart-data"
                >{cartItemCount} Items</span
              >
            </div>
          </div>
          <div><hr class="dropdown-divider" /></div>
          <ul class="list-unstyled mb-0" id="header-cart-items-scroll">
            {#each cartItems as item (item.id)}
              <DropdownItem class="dropdown-item" key={item.id}>
                <div class="d-flex align-items-start cart-dropdown-item">
                  <img
                    src={`${basePath}/images/ecommerce/jpg/${item.image}`}
                    alt="img"
                    class="avatar avatar-sm avatar-rounded br-5 me-3"
                  />
                  <div class="flex-grow-1">
                    <div
                      class="d-flex align-items-start justify-content-between mb-0"
                    >
                      <div class="mb-0 fs-13 text-dark fw-semibold">
                        <a href={"#!"}>{item.name}</a>
                      </div>
                      <div>
                        <span class="text-black mb-1">${item.price}</span>
                        <a
                          href="#!"
                          class="header-cart-remove float-end dropdown-item-close"
                          on:click={() => removeItem(item.id)}
                        >
                          <i class="ti ti-trash"></i>
                        </a>
                      </div>
                    </div>
                    <div
                      class="min-w-fit-content d-flex align-items-start justify-content-between"
                    >
                      <ul class="header-product-item d-flex">
                        {#each item.details as detail}
                          <li>{detail}</li>
                          {#if item.offer}
                            <li>
                              <span class="badge {item.offercolor} fs-10"
                                >{item.offer}</span
                              >
                            </li>
                          {/if}
                        {/each}
                      </ul>
                    </div>
                  </div>
                </div>
              </DropdownItem>
            {/each}
          </ul>
          {#if cartItemCount > 0}
            <div class="p-3 empty-header-item border-top">
              <div class="d-grid">
                <a href="#!" class="btn btn-primary">Proceed to checkout</a>
              </div>
            </div>
          {:else}
            <div class="p-5 empty-item">
              <div class="text-center">
                <span
                  class="avatar avatar-xl avatar-rounded bg-warning-transparent"
                >
                  <i class="ri-shopping-cart-2-line fs-2"></i>
                </span>
                <h6 class="fw-bold mb-1 mt-3">Your Cart is Empty</h6>
                <span class="mb-3 fw-normal fs-13 d-block"
                  >Add some items to make me happy :)</span
                >
                <a href="#!" class="btn btn-primary btn-wave btn-sm m-1"
                  >Continue shopping <i class="bi bi-arrow-right ms-1"></i></a
                >
              </div>
            </div>
          {/if}
        </DropdownMenu>
        <!-- End::main-header-dropdown -->
      </Dropdown>
      <!-- End::header-element -->

      <!-- Notificatiion -->

      <!-- Start::header-element -->
      <Dropdown class="header-element notifications-dropdown">
        <!-- Start::header-link|dropdown-toggle -->
        <DropdownToggle
          color=""
          href="#!"
          class="header-link dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="messageDropdown"
          aria-expanded="false"
        >
          <i class="bx bx-bell header-link-icon"></i>
          <span
            class="badge bg-secondary rounded-pill header-icon-badge pulse pulse-secondary"
            id="notification-icon-badge">{notifications.length}</span
          >
        </DropdownToggle>
        <!-- End::header-link|dropdown-toggle -->
        <!-- Start::main-header-dropdown -->
        <DropdownMenu
          class="main-header-dropdown dropdown-menu dropdown-menu-end"
          data-popper-placement="none"
          end
        >
          <div class="p-3">
            <div class="d-flex align-items-center justify-content-between">
              <p class="mb-0 fs-17 fw-semibold">Notifications</p>
              <span
                class="badge bg-secondary-transparent"
                id="notifiation-data"
              >
                {notifications.length} Unread
              </span>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <ul class="list-unstyled mb-0" id="header-notification-scroll">
            {#each notifications as notification (notification.id)}
              <DropdownItem class="dropdown-item" key={notification.id}>
                <div class="d-flex align-items-start">
                  <div class="pe-2">
                    <span
                      class={`avatar avatar-md bg-${notification.color}-transparent avatar-rounded`}
                    >
                      <i class={`ti ${notification.icon}  fs-18`}></i>
                    </span>
                  </div>
                  <div
                    class="flex-grow-1 d-flex align-items-center justify-content-between"
                  >
                    <div>
                      <p class="mb-0 fw-semibold">
                        <a href="#!"
                          >{notification.title}
                          {#if notification.subTitle}
                            <span class={`text-${notification.subTitleClass}`}
                              >{notification.subTitle}</span
                            >
                          {/if}
                        </a>
                      </p>
                      <span
                        class="text-muted fw-normal fs-12 header-notification-text"
                        >{notification.description}</span
                      >
                    </div>
                    <div>
                      <a
                        href="#!"
                        class="min-w-fit-content text-muted me-1 dropdown-item-close1"
                        on:click={() => deleteNotification(notification.id)}
                      >
                        <i class="ti ti-x fs-16"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </DropdownItem>
            {/each}
          </ul>
          {#if notifications.length === 0}
            <div class="p-5 empty-item1">
              <div class="text-center">
                <span
                  class="avatar avatar-xl avatar-rounded bg-secondary-transparent"
                >
                  <i class="ri-notification-off-line fs-2"></i>
                </span>
                <h6 class="fw-semibold mt-3">No New Notifications</h6>
              </div>
            </div>
          {:else}
            <div class="p-3 empty-header-item1 border-top">
              <div class="d-grid">
                <a href="#!" class="btn btn-primary">View All</a>
              </div>
            </div>
          {/if}
        </DropdownMenu>
        <!-- End::main-header-dropdown -->
      </Dropdown>
      <!-- End::header-element -->

      <!--Related Apps-->
      <!-- Start::header-element -->
      <Dropdown class="header-element header-shortcuts-dropdown">
        <!-- Start::header-link|dropdown-toggle -->
        <DropdownToggle
          color=""
          href="#!"
          class="header-link dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="notificationDropdown"
          aria-expanded="false"
        >
          <i class="bx bx-grid-alt header-link-icon"></i>
        </DropdownToggle>
        <!-- End::header-link|dropdown-toggle -->
        <!-- Start::main-header-dropdown -->
        <DropdownMenu
          class="main-header-dropdown header-shortcuts-dropdown dropdown-menu pb-0 dropdown-menu-end"
          aria-labelledby="notificationDropdown"
          end
        >
          <div class="p-3">
            <div class="d-flex align-items-center justify-content-between">
              <p class="mb-0 fs-17 fw-semibold">Related Apps</p>
            </div>
          </div>
          <div class="dropdown-divider mb-0"></div>
          <div class="main-header-shortcuts p-2" id="header-shortcut-scroll">
            <div class="row g-2">
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img src={`${basePath}/images/apps/figma.png`} alt="" />
                    </span>
                    <span class="d-block fs-12">Figma</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img
                        src={`${basePath}/images/apps/microsoft-powerpoint.png`}
                        alt=""
                      />
                    </span>
                    <span class="d-block fs-12">Power Point</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img
                        src={`${basePath}/images/apps/microsoft-word.png`}
                        alt=""
                      />
                    </span>
                    <span class="d-block fs-12">MS Word</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img
                        src={`${basePath}/images/apps/calender.png`}
                        alt=""
                      />
                    </span>
                    <span class="d-block fs-12">Calendar</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img src={`${basePath}/images/apps/sketch.png`} alt="" />
                    </span>
                    <span class="d-block fs-12">Sketch</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img
                        src={`${basePath}/images/apps/google-docs.png`}
                        alt=""
                      />
                    </span>
                    <span class="d-block fs-12">Docs</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img src={`${basePath}/images/apps/google.png`} alt="" />
                    </span>
                    <span class="d-block fs-12">Google</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img
                        src={`${basePath}/images/apps/translate.png`}
                        alt=""
                      />
                    </span>
                    <span class="d-block fs-12">Translate</span>
                  </div>
                </a>
              </div>
              <div class="col-4">
                <a href="#!">
                  <div class="text-center p-3 related-app">
                    <span class="avatar avatar-sm avatar-rounded">
                      <img
                        src={`${basePath}/images/apps/google-sheets.png`}
                        alt=""
                      />
                    </span>
                    <span class="d-block fs-12">Sheets</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="p-3 border-top">
            <div class="d-grid">
              <a href="#!" class="btn btn-primary">View All</a>
            </div>
          </div>
        </DropdownMenu>
        <!-- End::main-header-dropdown -->
      </Dropdown>
      <!-- End::header-element -->

      <!-- Full Screen -->
      <!-- Start::header-element -->
      <div class="header-element header-fullscreen">
        <!-- Start::header-link -->

        <a
          href={"#!"}
          class="header-link"
          on:click|preventDefault={toggleFullscreen}
        >
          {#if isFullscreen}
            <i class="bx bx-exit-fullscreen full-screen-close header-link-icon"
            ></i>
          {:else}
            <i class="bx bx-fullscreen full-screen-open header-link-icon"></i>
          {/if}
        </a>
        <!-- End::header-link -->
      </div>
      <!-- End::header-element -->

      <!-- Profile -->
      <!-- Start::header-element -->
      <Dropdown class="header-element">
        <!-- Start::header-link|dropdown-toggle -->
        <DropdownToggle
          color=""
          href="#!"
          class="header-link dropdown-toggle"
          id="mainHeaderProfile"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          <div class="d-flex align-items-center">
            <div class="me-sm-2 me-0">
              <img
                src={`${basePath}/images/faces/9.jpg`}
                alt="img"
                width="32"
                height="32"
                class="rounded-circle"
              />
            </div>
            <div class="d-sm-block d-none">
              <p class="fw-semibold mb-0 lh-1">{$userData.fullName}</p>
              <span class="op-7 fw-normal d-block fs-11">Web Designer</span>
            </div>
          </div>
        </DropdownToggle>
        <!-- End::header-link|dropdown-toggle -->
        <DropdownMenu
          class="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
          aria-labelledby="mainHeaderProfile"
          end
        >
          <li>
            <DropdownItem class="dropdown-item d-flex" href="#!"
              ><i class="ti ti-user-circle fs-18 me-2 op-7"
              ></i>Profile</DropdownItem
            >
          </li>
          <li>
            <DropdownItem class="dropdown-item d-flex" href="#!"
              ><i class="ti ti-inbox fs-18 me-2 op-7"></i>Inbox
              <span class="badge bg-success-transparent ms-auto">25</span
              ></DropdownItem
            >
          </li>
          <li>
            <DropdownItem
              class="dropdown-item d-flex border-block-end"
              href="#!"
              ><i class="ti ti-clipboard-check fs-18 me-2 op-7"></i>Task Manager</DropdownItem
            >
          </li>
          <li>
            <DropdownItem class="dropdown-item d-flex" href="#!"
              ><i class="ti ti-adjustments-horizontal fs-18 me-2 op-7"
              ></i>Settings</DropdownItem
            >
          </li>
          <li>
            <DropdownItem
              class="dropdown-item d-flex border-block-end"
              href="#!"
              ><i class="ti ti-wallet fs-18 me-2 op-7"></i>Bal: $7,12,950</DropdownItem
            >
          </li>
          <li>
            <DropdownItem class="dropdown-item d-flex" href="#!"
              ><i class="ti ti-headset fs-18 me-2 op-7"
              ></i>Support</DropdownItem
            >
          </li>
          <li>
            <DropdownItem class="dropdown-item d-flex" href="#!"
              ><i class="ti ti-logout fs-18 me-2 op-7"></i>Log Out</DropdownItem
            >
          </li>
        </DropdownMenu>
      </Dropdown>
      <!-- End::header-element -->

      <!-- Switcher -->
      <!-- Start::header-element -->
      <div class="header-element">
        <!-- Start::header-link|switcher-icon -->
        <Switcher />
        <!-- End::header-link|switcher-icon -->
      </div>
      <!-- End::header-element -->
    </div>
    <!-- End::header-content-right -->
  </div>
  <!-- End::main-header-container -->
</header>

<!--Country Modal Popup-->
<Modal
  isOpen={open}
  {toggle}
  id="countryModal"
  tabindex="-1"
  aria-labelledby="countryModal"
>
  <ModalBody class="modal-body p-4">
    <label for="" class="form-label fs-16">Select Location</label>
    <Select
      items={Data1}
      value={Data1[0].value}
      class="form-control choices-images"
      showChevron
      clearable={false}
    />

    <label for="" class="form-label fs-16 mt-4">Select Language</label>
    <Select
      items={Data2}
      value={Data2[0].value}
      class="form-control"
      showChevron
      clearable={false}
    />
  </ModalBody>
  <ModalFooter class="modal-footer">
    <button
      type="button"
      class="btn btn-primary-light"
      data-bs-dismiss="modal"
      on:click={toggle}>Close</button
    >
    <button type="button" class="btn btn-primary">Save changes</button>
  </ModalFooter>
</Modal>
<!--Country Modal Popup-->

<!--Modal Search-->
<Modal isOpen={search} toggle={toggleSearch} id="searchModal">
  <ModalBody class="modal-body">
    <div class="input-group mb-3">
      <a href="#!" class="input-group-text" id="Search-Grid">
        <i class="fe fe-search header-a-icon fs-18"></i>
      </a>
      <input
        type="search"
        class="form-control px-2"
        placeholder="Search"
        aria-label="Search"
        bind:value={inputValue}
        on:input={handleInputChange}
        autoComplete="off"
      />
      <a href="#!" class="input-group-text" id="voice-search">
        <i class="fe fe-mic header-a-icon"></i>
      </a>
      <Dropdown>
        <DropdownToggle
          color=""
          class="btn btn-light btn-icon no-caret rounded-0"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fe fe-more-vertical"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="#!">Action</DropdownItem>
          <DropdownItem href="#!">Another action</DropdownItem>
          <DropdownItem href="#!">Something else here</DropdownItem>
          <Dropdown Divider />
          <DropdownItem href="#!">Separated a</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    {#if show1}
      <Card class="search-result position-relative z-index-9 border mt-1 w-100">
        <CardHeader class="border-bottom">
          <div class="me-2 text-break card-title mb-0">
            Search result of {inputValue}
          </div>
        </CardHeader>
        <ListGroup class="p-3">
          {#if suggestion.length > 0}
            {#each suggestion.slice(0, 7) as e}
              <ListGroupItem
                class="search-result-item"
                on:click={() => handleSuggestionClick(e)}
              >
                <a href={`#!`}>{e.title}</a>
              </ListGroupItem>
            {/each}
          {:else}
            <b class="text-danger">There is no component with this name</b>
          {/if}
        </ListGroup>
      </Card>
    {/if}

    <div class="mt-4">
      <p class="font-weight-semibold text-muted mb-2">Are You Looking For...</p>
      {#each $tags as tag (tag.id)}
        <span class="search-tags me-1">
          <i class="fe {tag.icon} me-2"></i>{tag.name}
          <a href="#!" class="tag-addon" on:click={() => deleteTag(tag.id)}>
            <i class="fe fe-x"></i>
          </a>
        </span>
      {/each}
    </div>

    <div class="my-4">
      <p class="font-weight-semibold text-muted mb-2">Recent Search :</p>
      {#each $searches as search, index}
        <div
          class="alert p-2 border br-5 d-flex align-items-center text-muted mb-2"
        >
          <a href="#!" on:click={toggleSearch}>
            <span>{search.name}</span>
          </a>
          <a
            href="#!"
            on:click={() => deleteSearch(index)}
            class="ms-auto lh-1"
          >
            <i class="fe fe-x text-muted"></i>
          </a>
        </div>
      {/each}
    </div>
  </ModalBody>
  <ModalFooter class="modal-footer">
    <div class="btn-group ms-auto">
      <button type="button" class="btn btn-sm btn-primary-light">Search</button>
      <button
        type="button"
        class="btn btn-sm btn-primary"
        on:click={clearSearch}>Clear Recents</button
      >
    </div>
  </ModalFooter>
</Modal>
