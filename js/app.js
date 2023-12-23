// Project constants
const PROJECT_FILE = 'data/projects.json'

$(document).ready(function() {
    // Function to load HTML snippets and populate HTML sections
    function loadSection(id, filename) {
        $.get(filename, function(data) {
            $(`#${id}`).html(data);
        });
    }

    // Function to load project data from JSON file and populate modal
    function loadProjectData(projectFile, projectId) {
        console.log("LOADDATA");
        $.getJSON(projectFile, function(data) {
            console.log(data.projects);
            var project = data.projects.find(p => p.id === projectId);
            if (project) {
                $('#projectModal .title').text(project.title);
                $('#projectModal .modal-img').attr('src', `assets/img/portfolio/${project.image}`);
                $('#projectModal .description').text(project.description);
                $('#projectModal .scope').html(`<b>Key responsibilities:</b> ${project.scope.join(', ')}`);
            } else {
                console.log('Project not found!');
            }
        });
    }

    // Function to load project data into portfolio grid
    function loadProjects(filename, template) {
        $.getJSON(filename, function(data) {
            const projectCards = $('#projectGrid');
            
            
            // Load the card template HTML
            $.get(template, function(cardTemplate) {
                data.projects.forEach(function(project) {
                    const skillsTech = project.tech_skills.map(skill => `<span class="badge rounded-pill bg-success">${skill}</span>`).join(' ');
                    const skillsSystem = project.system_skills.map(skill => `<span class="badge rounded-pill bg-danger">${skill}</span>`).join(' ');
                    const skillsIndustry = project.industry_skills.map(skill => `<span class="badge rounded-pill bg-dark">${skill}</span>`).join(' ');

                    // Use the loaded card template and populate with project details
                    var cardHtml = cardTemplate
                        .replace('{{project-id}}', project.id)
                        .replace('{{title}}', project.title)
                        .replace('{{short-description}}', project.short_description)
                        .replace('{{short-scope}}', project.short_scope)
                        .replace('{{image}}', `assets/img/portfolio/${project.image}`)
                        .replace('{{tech-skills}}', skillsTech)
                        .replace('{{system-skills}}', skillsSystem)
                        .replace('{{industry-skills}}', skillsIndustry);

                    // Append the generated card HTML to the container
                    projectCards.append(cardHtml);
                });
            });
        });
    }

    // Event listener for loading project data
    $('#portfolio').on('click', '.card', function(){
        const projectId = $(this).attr('project-id')
        loadProjectData(PROJECT_FILE, projectId);
    });

    // Load HTML snippets and create skill cards
    loadSection('content-navbar', 'components/navbar.html');
    loadSection('content-footer', 'components/footer.html');
    loadSection('content-masthead', 'components/masthead.html');
    loadSection('content-skills', 'components/skills.html');
    loadProjects(PROJECT_FILE, 'components/project-card.html');
    loadSection('content-modal', 'components/project-modal.html');
});



