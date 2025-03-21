// Project constants
const PROJECT_FILE = 'data/projects.json'
const SKILLS_FILE = 'data/skills.json'

$(document).ready(function() {
    // Function to load HTML snippets and populate HTML sections
    function loadSection(id, filename) {
        $.get(filename, function(data) {
            $(`#${id}`).html(data);
        });
    }

    // Function to load project data from JSON file and populate modal
    function loadProjectData(projectFile, projectId) {
        $.getJSON(projectFile, function(data) {
            console.log(data.projects);
            var project = data.projects.find(p => p.id === projectId);
            if (project) {
                $('#projectModal .title').text(project.title);
                $('#projectModal .location').text(project.location);
                $('#projectModal .short-description').text(project.short_description);
                $('#projectModal .modal-img').attr('src', `assets/img/portfolio/${project.image}`);
                $('#projectModal .description').html(project.description);
                $('#projectModal .scope').html(`<b>Key responsibilities:</b> ${project.scope.join(', ')}`);
                
                const techLogos = project.tech_logos ? project.tech_logos.map(logo => `<img src="assets/img/logo/${logo}" alt="${logo}" class="me-2" style="height: 75px;">`).join('') : '';
                
                $('#projectModal .modal-logos').html(techLogos);
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

    function populateSkill(skill, template) {
        const skills = skill.skills.map(skill => `<span class="skill-badge bg-dark">${skill}</span>`).join(' ');

            // Use the loaded card template and populate with project details
            var cardHtml = template
                .replace('{{name}}', skill.name)
                .replace('{{description}}', skill.description ? `${skill.description}` : '')
                .replace('{{image}}', `assets/img/skills/${skill.image}`)
                .replace('{{imageAlt}}', skill.name)
                .replace('{{skills}}', skills);

        return cardHtml;
    }  

    // Function to load skills data into skills grid
    function loadSkills(filename, template) {
        $.getJSON(filename, function(data) {
            const industrySkills = $('#industrySkills');
            const programmingSkills = $('#programmingSkills');
            const personalSkills = $('#personalSkills');
            var cardHtml;
            
            
            // Load the card template HTML
            $.get(template, function(template) {
                data.skills_industry.forEach(function(skill) {
                    // Use the loaded card template and populate with skills data
                    cardHtml = populateSkill(skill, template);
                    // Append the generated card HTML to the container
                    industrySkills.append(cardHtml);
                });

                data.skills_programming.forEach(function(skill) {
                    // Use the loaded card template and populate with skills data
                    cardHtml = populateSkill(skill, template);
                    // Append the generated card HTML to the container
                    programmingSkills.append(cardHtml);
                });

                data.skills_personal.forEach(function(skill) {
                    // Use the loaded card template and populate with skills data
                    cardHtml = populateSkill(skill, template);
                    // Append the generated card HTML to the container
                    personalSkills.append(cardHtml);
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
    loadSection('content-skills', 'components/skills2.html');
    loadProjects(PROJECT_FILE, 'components/project-card.html');
    loadSkills(SKILLS_FILE, 'components/skill-component.html');
    loadSection('content-modal', 'components/project-modal.html');
});



