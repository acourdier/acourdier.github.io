$(document).ready(function() {
// Function to load HTML snippets and populate HTML sections
function loadSection(id, filename) {
    $.get(filename, function(data) {
        $(`#${id}`).html(data);
    });
}

// Function to load project data from JSON file and populate modal
function loadProjectData(projectId) {
$.getJSON('data/projects.json', function(data) {
    var project = data.projects.find(p => p.id === projectId);
    if (project) {
        $('#projectModal .modal-title').text(project.title);
        $('#projectModal .modal-body').html('<p>Description: ' + project.description + '</p><p>Skills: ' + project.skills.join(', ') + '</p>');
    } else {
        console.log('Project not found!');
    }
});
}

// Event listener for showing modal and loading project data
$('[data-toggle="modal"]').on('click', function() {
    var projectId = 1; // Replace with the ID of the project you want to display
    loadProjectData(projectId);
});

// Load HTML snippets and create skill cards
loadSection('content-navbar', 'components/navbar.html');
loadSection('content-footer', 'components/footer.html');
loadSection('content-masthead', 'components/masthead.html');
loadSection('content-modal', 'components/project-modal.html');
});