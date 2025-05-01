<script>
    import { onMount } from "svelte";

    const screenUp = () => {
        window.scrollTo(0, 0);
    };

    onMount(() => {
        const handleScroll = () => {
            const color = document.getElementsByClassName("scrollToTop")[0];
            if (color) {
                window.scrollY > 100
                    ? (color.style.display = "flex")
                    : (color.style.display = "none");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<a href="#!" on:click={screenUp}>
    <div class="scrollToTop">
        <span class="arrow"><i class="ri-arrow-up-s-fill fs-20"></i></span>
    </div>
</a>
