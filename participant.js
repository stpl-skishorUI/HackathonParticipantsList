window.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then((res) => res.json())
        .then((data) => populateCarousel(data))
        .catch((err) => console.error("Error loading JSON:", err));
});

function populateCarousel(developers) {
    const carouselInner = document.querySelector(".carousel-inner");
    carouselInner.innerHTML = ""; // Clear any existing slides

    developers.forEach((dev, index) => {
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        if (index === 0) item.classList.add("active"); // Make first item active

        item.innerHTML = `
      <div class="card card-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="photo">
              <img src="${dev.Photo}" class="dev-photo" alt="${dev.FullName}">
            </div>
          </div>
          <div class="col-sm-8">
            <div class="d-flex justify-content-between align-items-center">
              <h1>${dev.FullName}</h1>
              <span class="badge bg-light-subtle text-dark">${dev.TotalExperience} Years Experience</span>
            </div>
            <h5>${dev.CurrentDesignation}</h5>

            <div class="row g-3">
              <div class="col-sm-12">
                <div class="dev-card-section h-100">
                  <div class="dev-label">Key Skills :</div>
                  <div class="dev-skills">${dev.KeySkills}</div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="dev-card-section h-100">
                  <div class="dev-label">Primary Skills:</div>
                  <div class="dev-skills">${dev.PrimarySkills}</div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="dev-card-section h-100">
                  <div class="dev-label">Secondary Skills:</div>
                  <div class="dev-skills">${dev.SecondarySkills}</div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="dev-card-section h-100">
                  <div class="dev-label">Preferred Role :</div>
                  <div class="dev-skills">${dev.PreferredRole}</div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="dev-card-section h-100">
                  <div class="dev-label">Preferred Domain :</div>
                  <div class="dev-skills">${dev.PreferredDomain}</div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="dev-card-section h-100">
                  <div class="dev-label">Previous Hackathon Experience :</div>
                  <div class="dev-skills">${dev.PreviousHackathonExperience}</div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="dev-card-section h-100">
                  <div class="dev-label">Base Price</div>
                  <h2 class="fw-bold mb-0 text-danger">CP ${dev.BasePrice}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

        carouselInner.appendChild(item);
    });
}
