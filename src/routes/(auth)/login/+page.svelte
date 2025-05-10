<script>
  import { notificationData } from "$lib/store/notificationStore";
  import { post, browserSet, browserGet } from "$lib/utils/requestUtils";
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
  // Check the environment (development or production)
  const basePath = __BASE_PATH__;

  let email = "";
  let password = "";
  let err = "";
  let show_password = false;
  $: type = show_password ? "text" : "password";
  let value = password;

  function onInput(event) {
    value = event.target.value;
  }
  // Using writable store to manage the password visibility

  // Reactive type for password input

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      email = value;
    } else if (name === "password") {
      password = value;
    }
    err = ""; // Reset error message on every change
  };

  const Login = async (e) => {
    e.preventDefault();
    if (browserGet("refreshToken")) {
      localStorage.removeItem("refreshToken");
    }
    const [jsonRes] = await post(fetch, "/auth/login", {
      email: email,
      password: password,
    });
    const response = jsonRes;

    if (response.access_token) {
      Cookies.set("refreshToken", response.access_token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      browserSet("refreshToken", response.access_token);
      notificationData.update(() => {
        "Login successful...";
      });
      await goto("/");
    }
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="container">
  <div
    class="row justify-content-center align-items-center authentication authentication-basic h-100"
  >
    <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12">
      <div class="my-5 d-flex justify-content-center">
        <a href={`${basePath}/dashboards/crm/`}>
          <img
            src={`${basePath}/images/brand-logos/desktop-logo.png`}
            alt="logo"
            class="desktop-logo"
          />
          <img
            src={`${basePath}/images/brand-logos/desktop-dark.png`}
            alt="logo"
            class="desktop-dark"
          />
        </a>
      </div>
      <div class="card custom-card">
        <div class="card-body p-5">
          <p class="h5 fw-semibold mb-2 text-center">Sign In</p>
          <p class="mb-4 text-muted op-7 fw-normal text-center">
            Welcome back Jhon !
          </p>
          <div class="row gy-3">
            <div class="col-xl-12">
              <label for="signin-username" class="form-label text-default"
                >User Name</label
              >
              <input
                type="text"
                class="form-control form-control-lg"
                id="signin-username"
                placeholder="user name"
                name="email"
                bind:value={email}
                on:input={changeHandler}
              />
            </div>
            <div class="col-xl-12 mb-2">
              <label
                for="signin-password"
                class="form-label text-default d-block"
                >Password<a
                  href="reset-password-basic.html"
                  class="float-end text-danger">Forget password ?</a
                ></label
              >
              <div class="input-group">
                <input
                  {type}
                  {value}
                  name="password"
                  class="form-control form-control-lg"
                  id="signin-password"
                  placeholder="password"
                  on:input={changeHandler}
                />
                <button
                  class="btn btn-light"
                  type="button"
                  id="button-addon2"
                  on:input={onInput}
                  on:click={() => (show_password = !show_password)}
                  ><i
                    class={`${show_password ? "ri-eye-line" : "ri-eye-off-line"} align-middle`}
                  ></i>
                </button>
              </div>
              <div class="mt-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label
                    class="form-check-label text-muted fw-normal"
                    for="defaultCheck1"
                  >
                    Remember password ?
                  </label>
                </div>
              </div>
            </div>
            <div class="col-xl-12 d-grid mt-2">
              <button
                type="button"
                on:click={Login}
                class="btn btn-lg btn-primary">Sign In</button
              >
            </div>
          </div>
          <div class="text-center">
            <p class="fs-12 text-muted mt-3">
              Dont have an account? <a
                href="sign-up-basic.html"
                class="text-primary">Sign Up</a
              >
            </p>
          </div>
          <div class="text-center my-3 authentication-barrier">
            <span>OR</span>
          </div>
          <div class="btn-list text-center">
            <button class="btn btn-icon btn-light">
              <i class="ri-facebook-line fw-bold text-dark op-7"></i>
            </button>
            <button class="btn btn-icon btn-light">
              <i class="ri-google-line fw-bold text-dark op-7"></i>
            </button>
            <button class="btn btn-icon btn-light">
              <i class="ri-twitter-x-line fw-bold text-dark op-7"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
