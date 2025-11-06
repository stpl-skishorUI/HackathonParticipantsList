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
                <div class="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <div class="team-name fw-bold">${team.TeamName}</div>
                        <div class="owner-name text-muted small">${team.Owner}</div>
                    </div>
                    <div class="team-size badge bg-primary">${team.TeamSize}</div>
                </div>
            </button>
          </li>
        `;
            tabList.insertAdjacentHTML("beforeend", tabItem);

            // --- Member List ---
            const memberList = teamMembers.map(member => `
          <li class="list-group-item member-item">
            <img src="${member.Photo}" alt="${member.FullName}" class="member-photo">
            <div class="member-info">
              <div class="member-name">${member.FullName}</div>
              <div class="member-role">${member.CurrentDesignation || ''}</div>
            </div>
          </li>
        `).join("");

            // --- Tab Content ---
            const tabPane = `
          <div class="tab-pane fade ${activeClass ? "show active" : ""}" id="${teamId}-pane" role="tabpanel" aria-labelledby="${teamId}-tab" tabindex="0">
            <div class="row g-3">
              <div class="col-sm-3">
                <span class="badge bg-success-subtle text-success mb-3">${team.PrimaryDomain}</span>
                <div class="card mb-3">
                  <div class="card-header">Owner</div>
                  <div class="card-body">${team.Owner}</div>
                  <div class="card-header">Mentor</div>
                  <div class="card-body">${team.Mentor}</div>
                </div>
                <ul class="list-group">${memberList}</ul>
              </div>
              <div class="col-sm-9">
                <div class="card mb-3">
                  <div class="card-header fw-bold">Overview</div>
                  <div class="card-body">${team.Overview}</div>
                </div>
                <div class="card mb-3">
                  <div class="card-header fw-bold">Strengths</div>
                  <div class="card-body">${team.Strengths}</div>
                </div>
                <div class="card mb-3">
                  <div class="card-header fw-bold">Weaknesses</div>
                  <div class="card-body">${team.Weaknesses}</div>
                </div>
                <div class="card">
                  <div class="card-header fw-bold">Predicted Excellence Area</div>
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