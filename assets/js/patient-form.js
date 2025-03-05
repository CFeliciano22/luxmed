// Initialize EmailJS
(function () {
  // Replace with your actual EmailJS public key
  emailjs.init("i4RfceWFnJb69DCo-");
})();

// Form validation and submission
document.addEventListener("DOMContentLoaded", function () {
  // Show/hide allergies details
  const allergiesYes = document.getElementById("allergiesYes");
  const allergiesNo = document.getElementById("allergiesNo");
  const allergiesDetails = document.getElementById("allergiesDetails");

  allergiesYes.addEventListener("change", function () {
    allergiesDetails.style.display = this.checked ? "block" : "none";
  });

  allergiesNo.addEventListener("change", function () {
    allergiesDetails.style.display = this.checked ? "none" : "block";
  });

  // Form validation
  const form = document.getElementById("patientForm");
  const submitBtn = document.getElementById("submitBtn");
  const formSuccess = document.getElementById("formSuccess");
  const formError = document.getElementById("formError");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Add validation class to show validation feedback
    form.classList.add("was-validated");

    if (form.checkValidity()) {
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';

      // Collect form data
      const formData = {
        firstName: document.getElementById("firstName").value || "Not provided",
        lastName: document.getElementById("lastName").value || "Not provided",
        dob: document.getElementById("dob").value || "Not provided",
        email: document.getElementById("email").value || "Not provided",
        phone: document.getElementById("phone").value || "Not provided",
        address: document.getElementById("address").value || "Not provided",
        city: document.getElementById("city").value || "Not provided",
        state: document.getElementById("state").value || "Not provided",
        zip: document.getElementById("zip").value || "Not provided",
        height: document.getElementById("height").value || "Not provided",
        weight: document.getElementById("weight").value || "Not provided",
        allergies: document.querySelector('input[name="allergies"]:checked')?.value || "Not provided",
        allergiesList: document.getElementById("allergiesList").value || "Not provided",
        medications: document.getElementById("medications").value || "Not provided",
        medicalHistory: document.getElementById("medicalHistory").value || "Not provided",
        services:
          Array.from(document.querySelectorAll('input[name="services"]:checked'))
            .map((el) => el.value)
            .join(", ") || "None selected",
        goals: document.getElementById("goals").value || "Not provided",
        contactPreference: document.querySelector('input[name="contactPreference"]:checked')?.value || "Not provided",
        contactTime: document.querySelector('input[name="contactTime"]:checked')?.value || "Not provided",
        to_email: "luxmedconcierg3@hotmail.com",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      // Send email using EmailJS
      emailjs
        .send(
          "service_hgpb1nw", // Replace with your EmailJS service ID
          "template_ff3y305", // Replace with your EmailJS template ID
          formData
        )
        .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);
          formSuccess.style.display = "block";
          formError.style.display = "none";

          form.reset();
          form.classList.remove("was-validated");
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="ri-send-plane-line me-2"></i> Submit Information';

          // Scroll to success message
          formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });

          // Hide success message after 8 seconds
          setTimeout(function () {
            formSuccess.style.display = "none";
          }, 8000);
        })
        .catch(function (error) {
          console.log("FAILED...", error);
          formError.style.display = "block";
          formSuccess.style.display = "none";
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="ri-send-plane-line me-2"></i> Submit Information';

          // Scroll to error message
          formError.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }
  });

  // Service selection validation
  const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
  serviceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const checkedServices = document.querySelectorAll('input[name="services"]:checked');
      const servicesContainer = document.querySelector(".row.g-2");

      if (checkedServices.length > 0) {
        servicesContainer.classList.remove("is-invalid");
      } else {
        servicesContainer.classList.add("is-invalid");
      }
    });
  });
});