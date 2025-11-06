document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [teamRes, devRes] = await Promise.all([
            fetch("ai-analysis.json"),
            fetch("randomized_sorted_data.json")
        ]);
        const teams = await teamRes.json();
        const devs = await devRes.json();

        const tabList = document.getElementById("myTab");
        const tabContent = document.getElementById("myTabContent");

        teams.forEach((team, index) => {
            const teamId = team.TeamName.replace(/\s+/g, "-").toLowerCase();
            const activeClass = index === 0 ? "active" : "";

            // --- Match developers to team ---
            const teamMembers = [];
            if (team.TeamMembers && Array.isArray(team.TeamMembers)) {
                team.TeamMembers.forEach(name => {
                    const match = devs.find(d => d.FullName.toLowerCase().includes(name.toLowerCase()));
                    if (match) teamMembers.push(match);
                });
            }

            // --- Tab Button ---
            const tabItem = `
          <li class="nav-item" role="presentation">
            <button class="nav-link ${activeClass}" id="${teamId}-tab" data-bs-toggle="tab" data-bs-target="#${teamId}-pane"
                type="button" role="tab" aria-controls="${teamId}-pane" aria-selected="${index === 0}">
                <div class="team-size">${team.TeamSize}</div>
                <div>
                    ${team.TeamName}
                </div>
            </button>
          </li>
        `;
            tabList.insertAdjacentHTML("beforeend", tabItem);

            // --- Member List ---
            const memberList = teamMembers.map(member => `
          <li class="list-group-item member-item">
          <div class="d-flex gap-2 align-items-center">
            <img src="${member.Photo}" alt="${member.FullName}" class="member-photo">
            <div class="member-info">
              <div class="member-name">${member.FullName}</div>
              <div class="member-role">${member.CurrentDesignation || ''}</div>
            </div>
            </div>
          </li>
        `).join("");

            // --- Tab Content ---
            const tabPane = `
          <div class="tab-pane fade ${activeClass ? "show active" : ""}" id="${teamId}-pane" role="tabpanel" aria-labelledby="${teamId}-tab" tabindex="0">
            <div class="row g-3">
              <div class="col-sm-3">
                <ul class="list-group mb-3">
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-4">Owner</div>
                            <div class="col-8 text-end fw-bold text-warning">${team.Owner}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-4">Mentor</div>
                            <div class="col-8 text-end fw-bold text-danger">${team.Mentor}</div>
                        </div>
                    </li>
                </ul>
                
                <ul class="list-group">${memberList}</ul>
              </div>
              <div class="col-sm-9">
                <div class="card mb-3 card-section">
                  <div class="card-header fw-bold text-warning">Overview</div>
                  <div class="card-body">${team.Overview}</div>
                </div>
                <div class="card mb-3 card-section">
                  <div class="card-header fw-bold text-warning">Strengths</div>
                  <div class="card-body">${team.Strengths}</div>
                </div>
                <div class="card card-section">
                  <div class="card-header fw-bold text-warning">
                    <div class="d-flex justify-content-between align-items-center">
                        <span>Predicted Excellence Area</span>
                        <span class="badge bg-warning-subtle text-dark">${team.PrimaryDomain}</span>
                    </div>
                  </div>
                  <div class="card-body">${team.PredictedExcellenceArea}</div>
                </div>
              </div>
            </div>
          </div>
        `;
            tabContent.insertAdjacentHTML("beforeend", tabPane);
        });
    } catch (err) {
        console.error("Error loading JSON:", err);
    }
});