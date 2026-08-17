(function () {
  "use strict";

  var widget = document.querySelector(".whatsapp-chat");
  if (!widget) return;

  var toggle = widget.querySelector(".whatsapp-chat__toggle");
  var close = widget.querySelector(".whatsapp-chat__close");
  var panel = widget.querySelector(".whatsapp-chat__panel");
  var form = widget.querySelector(".whatsapp-chat__form");
  var input = widget.querySelector("#whatsapp-message");
  var badge = toggle.querySelector("b");

  function setOpen(open) {
    widget.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    if (open) {
      badge.hidden = true;
      window.setTimeout(function () { input.focus(); }, 180);
    } else {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!widget.classList.contains("is-open"));
  });
  close.addEventListener("click", function () { setOpen(false); });

  widget.querySelectorAll(".whatsapp-chat__quick-replies button").forEach(function (button) {
    button.addEventListener("click", function () {
      input.value = button.textContent.trim();
      input.focus();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var message = input.value.trim();
    if (!message) return;

    var phone = widget.getAttribute("data-phone").replace(/\D/g, "");
    var path = phone ? phone : "";
    var whatsappUrl = "https://wa.me/" + path + "?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && widget.classList.contains("is-open")) setOpen(false);
  });
}());
