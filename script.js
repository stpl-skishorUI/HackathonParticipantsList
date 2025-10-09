let developers = [];

// Load data on page load
window.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            developers = data;
            populateDomainFilter(data);
            displayProfiles(data);
        })
        .catch(err => console.error('Error loading JSON:', err));

    document.getElementById('searchBox').addEventListener('input', applyFilters);
    document.getElementById('domainFilter').addEventListener('change', applyFilters);
});

/**
 * Get badge class based on domain
 */
function getBadgeClass(domain) {
    if (domain.includes('Functional (Developers)')) {
        return 'bg-primary-subtle text-primary';
    } else if (domain.includes('Non-Functional (Support Team / Business)')) {
        return 'bg-danger-subtle text-danger';
    } else {
        return 'bg-success-subtle text-success'; // fallback for any other domains
    }
}

/**
 * Display developer profiles
 */
function displayProfiles(devList) {
    const container = document.getElementById('profilesContainer');
    container.innerHTML = '';

    if (devList.length === 0) {
        container.innerHTML = `
    <div class="card card-body p-0 border-0 rounded-4">
          <img src="images/not-found.svg" class="img-fluid mx-auto rounded-4">
        </div>
    `;
        return;
    }

    devList.forEach(dev => {
        const card = document.createElement('div');
        card.classList.add('profile-card');
        const badgeClass = getBadgeClass(dev.CurrentDomain);

        card.innerHTML = `
                    <div class="position-relative">
                        <img src="images/bg.jpg" class="card-img-top rounded-4 rounded-bottom-0" alt="...">
                        <div class="experience">
                            ${dev.TotalExperience} Years Experience
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="profile-name">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                  <img src="${dev.Photo}" class="profile-photo" alt="${dev.FullName}"/>
                                </div>
                                <div class="flex-grow-1 ms-3 py-2">
                                    <span class="profile-badge ${badgeClass}">
                                      <i class="fa-solid fa-code"></i>
                                        ${dev.CurrentDomain}
                                    </span>
                                    <h3 class="name">${dev.FullName}</h3>
                                    <div class="designation">${dev.CurrentDesignation}</div>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush other-details">
                            <li class="list-group-item border-bottom-0 py-1">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <i class="fa-solid fa-graduation-cap"></i>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="data">${dev.Qualification}</div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item border-bottom-0 py-1">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <i class="fa-solid fa-envelope"></i>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="data">${dev.EmailID}</div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item border-bottom-0 py-1">
                                <div class="d-flex">
                                    <div class="flex-shrink-0">
                                        <i class="fa-solid fa-code"></i>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="label">Primary Skills :</div>
                                        <div class="data text-break">
                                            ${dev.PrimarySkills}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item border-bottom-0 py-1">
                                <div class="d-flex">
                                    <div class="flex-shrink-0">
                                        <i class="fa-solid fa-laptop-code"></i>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="label">Secondary Skills :</div>
                                        <div class="data">
                                            ${dev.SecondarySkills}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item border-bottom-0 py-1">
                                <div class="d-flex">
                                    <div class="flex-shrink-0">
                                        <i class="fa-solid fa-terminal"></i>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <div class="label">Key Skills :</div>
                                        <div class="data">
                                            ${dev.KeySkills}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="row g-3 mx-2">
                            <div class="col-sm-6">
                                <div class="preferred h-100">
                                    <div class="label">Preferred Role :</div>
                                    <div class="data">
                                        ${dev.PreferredRole}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="preferred h-100">
                                    <div class="label">Preferred Domain :</div>
                                    <div class="data">
                                        ${dev.PreferredDomain}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="label">Previous Hackathon Experience :</div>
                                <div class="data">${dev.PreviousHackathonExperience}</div>
                            </div>
                        </div>
                    </div>`;

        container.appendChild(card);
    });
}

/**
 * Apply filters (search + domain)
 */
function applyFilters() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const selectedDomain = document.getElementById('domainFilter').value.toLowerCase();

    const filtered = developers.filter(dev => {
        const matchesSearch =
            dev.FullName.toLowerCase().includes(searchTerm) ||
            dev.PreferredRole.toLowerCase().includes(searchTerm) ||
            dev.PrimarySkills.toLowerCase().includes(searchTerm) ||
            dev.SecondarySkills.toLowerCase().includes(searchTerm);

        const matchesDomain =
            selectedDomain === '' ||
            dev.CurrentDomain.toLowerCase() === selectedDomain;

        return matchesSearch && matchesDomain;
    });

    displayProfiles(filtered);
}

/**
 * Populate domain dropdown dynamically
 */
function populateDomainFilter(data) {
    const domainSelect = document.getElementById('domainFilter');
    const domains = [...new Set(data.map(d => d.CurrentDomain))];

    domains.forEach(domain => {
        const option = document.createElement('option');
        option.value = domain;
        option.textContent = domain;
        domainSelect.appendChild(option);
    });
}
