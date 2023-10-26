const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    navItems.forEach((navItem) => {
      navItem.classList.remove("active-nav-link");
    });
    item.classList.add("active-nav-link");
  });
});
