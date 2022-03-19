const slides = document.querySelectorAll('section div.split');

slides.forEach((slide) => {
	let current = 0;
	let z = 1000;

	const images = slide.querySelectorAll('img');

	images.forEach((image) => {
		z = z - 1;
		image.style.zIndex = z;
	});

	gsap.set(images, { opacity: 0 });

	imagesLoaded(images, () => {
		const timeline = gsap.timeline();

		timeline
			.set(images, {
				x: () => 500 * Math.random() - 250,
				y: '500%',
				rotation: () => 90 * Math.random() - 45,
				opacity: 1
			})
			.to(images, { x: 0, y: 0, stagger: -0.25 })
			.to(images, {
				rotation: () => 16 * Math.random() - 8
			});
	});

	slide.addEventListener('click', () => {
		z = z - 1;

		let direction = '150%';
		let midAngle = 15;

		if (Math.random() > 0.5) {
			direction = '-150%';
			midAngle = -15;
		}

		const currentImage = images[current];

		const flipTimeline = gsap.timeline();

		flipTimeline
			.set(currentImage, { x: 0 })
			.to(currentImage, { x: direction, rotation: midAngle, scale: 1.1 })
			.set(currentImage, { zIndex: z })
			.to(currentImage, {
				x: 0,
				rotation: () => 16 * Math.random() - 8,
				scale: 1
			});

		current = current + 1;
		current = current % images.length;
	});
});
