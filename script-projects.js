const projectContainer = document.getElementById('project-container');

projectContainer.addEventListener('mousemove', (e) => {
    const rect = projectContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    const project = document.querySelectorAll('.project-wrapper>.project-card>.imgBox');
    project.forEach(project => {
        project.style.transform = `perspective(600px) rotateY(${dx * 3}deg) rotateX(${ -dy * 1}deg)`;
    });
    console.log(`perspective(600px) rotateY(${dx * 10}deg) rotateX(${ -dy * 10}deg)`);
});