// Get references to the container element and the inner element to tilt
const card = document.getElementById('hero-container');
const hero = document.getElementById('hero');
  // On mouse move over the container, compute a 3D tilt for the hero element
  card.addEventListener('mousemove', (e) => {
    // Get the container's position and size relative to the viewport
    const rect = card.getBoundingClientRect();

    // Mouse coordinates relative to the container's top-left corner
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Compute the container's center point
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Normalize distances from center to a [-1, 1] range
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    // Apply perspective and rotate based on mouse offset
    // rotateY responds to horizontal movement (dx); rotateX to vertical (-dy)
    hero.style.transform = `perspective(600px) rotateY(${dx * 10}deg) rotateX(${ -dy * 10}deg)`;
  });
  
// Optional: reset the tilt when the mouse leaves the container.
// Uncomment the following block to snap back to the neutral orientation.
//   card.addEventListener('mouseleave', () => {
//     hero.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
//   });



const setTemporaryViewTransitionNames = async (entries, vtPromise) => {
  for (const [$el, name] of entries) {
    $el.style.viewTransitionName = name;
  }

  await vtPromise;

  for (const [$el, name] of entries) {
    $el.style.viewTransitionName = '';
  }
}

// OLD PAGE LOGIC
window.addEventListener('pageswap', async (e) => {
  if (e.viewTransition) {
    const targetUrl = new URL(e.activation.entry.url);

    // Navigating to a profile page
    if (isProfilePage(targetUrl)) {
      const profile = extractProfileNameFromUrl(targetUrl);

      // Set view-transition-name values on the clicked row
      // Clean up after the page got replaced
      setTemporaryViewTransitionNames([
        [document.querySelector(`#${profile} span`), 'name'],
        [document.querySelector(`#${profile} img`), 'avatar'],
      ], e.viewTransition.finished);
    }
  }
});

// NEW PAGE LOGIC
window.addEventListener('pagereveal', async (e) => {
  if (e.viewTransition) {
    const fromURL = new URL(navigation.activation.from.url);
    const currentURL = new URL(navigation.activation.entry.url);

    // Navigating from a profile page back to the homepage
    if (isProfilePage(fromURL) && isHomePage(currentURL)) {
      const profile = extractProfileNameFromUrl(currentURL);

      // Set view-transition-name values on the elements in the list
      // Clean up after the snapshots have been taken
      setTemporaryViewTransitionNames([
        [document.querySelector(`#${profile} span`), 'name'],
        [document.querySelector(`#${profile} img`), 'avatar'],
      ], e.viewTransition.ready);
    }
  }
});

window.addEventListener("pageswap", async (e) => {
	// Define transitionClass upfront for browsers that don’t have the Navigation API
	if (!window.navigation) {
		const transitionClass = determineTransitionClass(e.activation.from, e.activation.entry);
		console.log(`pageSwap: ${transitionClass}`);
		localStorage.setItem("transitionClass", transitionClass);
	}
});