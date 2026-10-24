   
        const menuToggle = document.getElementById("menuToggle");
        const navbar = document.getElementById("navbar");
        const menuIcon = menuToggle.querySelector("i");

        menuToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");

                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            });
        });

        document.getElementById("currentYear").textContent =
            new Date().getFullYear();
 