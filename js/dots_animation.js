const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Color schemes
const colorSchemes = {
    'default': { background: '#0f0f1a', dotColor: '#ffffff', lineColor: 'rgba(255, 255, 255, OPACITY)', gravityLineColor: 'rgba(0, 150, 255, OPACITY)', gravityVectorColor: 'rgba(100, 200, 255, 0.8)' },
    'space': { background: '#000010', dotColor: '#e0e0ff', lineColor: 'rgba(180, 180, 255, OPACITY)', gravityLineColor: 'rgba(255, 100, 150, OPACITY)', gravityVectorColor: 'rgba(255, 150, 200, 0.8)' },
    'ember': { background: '#1a0800', dotColor: '#ffccaa', lineColor: 'rgba(255, 180, 130, OPACITY)', gravityLineColor: 'rgba(255, 80, 0, OPACITY)', gravityVectorColor: 'rgba(255, 120, 50, 0.8)' },
    'forest': { background: '#051a05', dotColor: '#c0ffc0', lineColor: 'rgba(150, 255, 150, OPACITY)', gravityLineColor: 'rgba(50, 200, 50, OPACITY)', gravityVectorColor: 'rgba(100, 220, 100, 0.8)' },
    'ocean': { background: '#001020', dotColor: '#aaddff', lineColor: 'rgba(150, 200, 255, OPACITY)', gravityLineColor: 'rgba(0, 100, 200, OPACITY)', gravityVectorColor: 'rgba(50, 150, 220, 0.8)' },
    'golden': { background: '#201a00', dotColor: '#fff0b3', lineColor: 'rgba(255, 220, 100, OPACITY)', gravityLineColor: 'rgba(255, 180, 0, OPACITY)', gravityVectorColor: 'rgba(255, 200, 50, 0.8)' }
};

// Configuration
const config = {
    numDots: 60, dotRadius: 2, /* lineOpacityBase removed */ lineWidth: 0.7,
    dotConnectionIntensity: 0.4, // NEW: Base intensity for lines between dots
    maxLineDistance: 150, // Renamed from connectionDistance
    speedFactor: 0.8, curveIntensity: 0.5, // curvePower renamed
    randomnessFactor: 0.1, // Renamed from noiseStrength
    nodeGravity: 0.8, // Renamed from pointGravity
    gravityFieldVisible: true, gravityFieldResolution: 10, gravityWarpScale: 1.0, // gravityFieldStrength renamed
    trailsVisible: false,
    colorScheme: 'default', // Default scheme
    gravityLineIntensity: 0.35, // Base intensity for gravity lines
    gravityFieldMaxMagnitude: 0.1,
    gravityGridCurveFactor: 15
};

// --- Global Variables ---
let mouseX = null, mouseY = null, mouseRadius = 200;
let dots = [];
let gravityGridPoints = [];

// --- Initialization & Canvas --- --
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    calculateGravityGrid(); // Recalculate grid on resize
}

function initDots() {
    dots = [];
    for (let i = 0; i < config.numDots; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * config.speedFactor * 2,
            vy: (Math.random() - 0.5) * config.speedFactor * 2,
            radius: config.dotRadius,
            pulseOffset: Math.random() * Math.PI * 2 // For pulsating effect
        });
    }
}

// --- Physics and Updates --- --
function getPulsatingRadius(dot, time) {
    // Simple sine wave pulsation
    return dot.radius * (1 + Math.sin(time * 0.002 + dot.pulseOffset) * 0.3);
}

function updateDots() {
    const time = Date.now();
    dots.forEach(dot => {
        // Apply velocity
        dot.x += dot.vx;
        dot.y += dot.vy;

        // --- Mouse Interaction --- --
        if (mouseX !== null && mouseY !== null) {
            const dx = dot.x - mouseX;
            const dy = dot.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius) {
                const forceFactor = (mouseRadius - dist) / mouseRadius;
                const angle = Math.atan2(dy, dx);
                // Move away from mouse
                dot.vx += Math.cos(angle) * forceFactor * 0.5;
                dot.vy += Math.sin(angle) * forceFactor * 0.5;
            }
        }

        // --- Node Gravity (simplified attraction/repulsion) --- --
        dots.forEach(otherDot => {
            if (dot === otherDot) return;
            const dx = otherDot.x - dot.x;
            const dy = otherDot.y - dot.y;
            const distSq = dx * dx + dy * dy;
            const minDist = 10; // Minimum distance to prevent extreme forces

            if (distSq < config.maxLineDistance * config.maxLineDistance && distSq > minDist * minDist) {
                const dist = Math.sqrt(distSq);
                const force = (config.nodeGravity / distSq) * (dist - config.maxLineDistance * 0.5); // Attract/repel based on distance
                dot.vx += (dx / dist) * force * 0.01; // Adjusted multiplier
                dot.vy += (dy / dist) * force * 0.01;
            }
        });

        // --- Boundary Check (Wrap around) --- --
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        // --- Damping / Friction --- --
        dot.vx *= 0.99;
        dot.vy *= 0.99;

        // Apply randomness
        dot.vx += (Math.random() - 0.5) * config.randomnessFactor;
        dot.vy += (Math.random() - 0.5) * config.randomnessFactor;

        // Update radius for pulsation
        dot.pulsatingRadius = getPulsatingRadius(dot, time);
    });
}

// --- Gravity Field Calculation --- --
function getGravityForceAt(px, py) {
    let totalForceX = 0;
    let totalForceY = 0;
    let maxMagnitudeSq = 0;

    dots.forEach(dot => {
        const dx = dot.x - px;
        const dy = dot.y - py;
        const distSq = dx * dx + dy * dy;
        if (distSq < 1) distSq = 1; // Avoid division by zero

        const dist = Math.sqrt(distSq);
        const forceMagnitude = config.nodeGravity / distSq;

        // Apply force towards the dot
        totalForceX += (dx / dist) * forceMagnitude;
        totalForceY += (dy / dist) * forceMagnitude;

        const currentMagnitudeSq = totalForceX * totalForceX + totalForceY * totalForceY;
        if(currentMagnitudeSq > maxMagnitudeSq) {
            maxMagnitudeSq = currentMagnitudeSq;
        }
    });

    // --- Mouse Influence on Gravity --- --
    if (mouseX !== null && mouseY !== null) {
        const dx = px - mouseX;
        const dy = py - mouseY;
        const distSq = dx * dx + dy * dy;
        const mouseInfluenceRadiusSq = (mouseRadius*1.5)*(mouseRadius*1.5); // Larger influence radius

        if (distSq < mouseInfluenceRadiusSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const forceMagnitude = (1 - dist / (mouseRadius*1.5)) * config.nodeGravity * 3; // Stronger repulsion
            totalForceX += (dx / dist) * forceMagnitude;
            totalForceY += (dy / dist) * forceMagnitude;
             const currentMagnitudeSq = totalForceX * totalForceX + totalForceY * totalForceY;
             if(currentMagnitudeSq > maxMagnitudeSq) {
                maxMagnitudeSq = currentMagnitudeSq;
             }
        }
    }

    // --- Limit the force magnitude --- --
    const magnitude = Math.sqrt(maxMagnitudeSq);
    if (magnitude > config.gravityFieldMaxMagnitude) {
        const scale = config.gravityFieldMaxMagnitude / magnitude;
        totalForceX *= scale;
        totalForceY *= scale;
    }

    return { x: totalForceX, y: totalForceY };
}

// Calculate the positions of the INVERTED warped grid points
function calculateGravityGrid() {
    gravityGridPoints = [];
    const stepX = canvas.width / config.gravityFieldResolution;
    const stepY = canvas.height / config.gravityFieldResolution;

    for (let i = 0; i <= config.gravityFieldResolution; i++) {
        for (let j = 0; j <= config.gravityFieldResolution; j++) {
            const gridX = i * stepX;
            const gridY = j * stepY;

            const force = getGravityForceAt(gridX, gridY);

            // Apply INVERSE warp: move points OPPOSITE to the force
            const warpedX = gridX - force.x * config.gravityWarpScale * 1000; // Increased scale for visibility
            const warpedY = gridY - force.y * config.gravityWarpScale * 1000;

            gravityGridPoints.push({ x: gridX, y: gridY, warpedX: warpedX, warpedY: warpedY });
        }
    }
}

// --- Drawing --- --
function drawDots() {
    const scheme = colorSchemes[config.colorScheme] || colorSchemes['default'];
    const dotColor = scheme.dotColor;
    const lineColorBase = scheme.lineColor; // Template with OPACITY placeholder
    const gravityLineColorBase = scheme.gravityLineColor;
    const gravityVectorColor = scheme.gravityVectorColor;

    // Clear canvas (or apply trails effect)
    if (config.trailsVisible) {
        ctx.fillStyle = `rgba(${parseInt(scheme.background.slice(1, 3), 16)}, ${parseInt(scheme.background.slice(3, 5), 16)}, ${parseInt(scheme.background.slice(5, 7), 16)}, 0.1)`; // Trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ensure background is set if not using trails
        canvas.style.backgroundColor = scheme.background;
    }

    ctx.lineWidth = config.lineWidth;

    // --- Draw Gravity Field (Warped Grid) --- --
    if (config.gravityFieldVisible && gravityGridPoints.length > 0) {
        const gridRes = config.gravityFieldResolution;
        for (let i = 0; i <= gridRes; i++) {
            for (let j = 0; j <= gridRes; j++) {
                const current = gravityGridPoints[i * (gridRes + 1) + j];

                // Draw lines to right neighbor
                if (i < gridRes) {
                    const right = gravityGridPoints[(i + 1) * (gridRes + 1) + j];
                    const opacity = Math.max(0.05, config.gravityLineIntensity * (1 - Math.hypot(current.warpedX - right.warpedX, current.warpedY - right.warpedY) / (canvas.width / gridRes) * 0.5));
                    ctx.strokeStyle = gravityLineColorBase.replace('OPACITY', opacity.toFixed(3));
                    ctx.beginPath();
                    ctx.moveTo(current.warpedX, current.warpedY);
                    // Apply curve
                    const midX = (current.warpedX + right.warpedX) / 2;
                    const midY = (current.warpedY + right.warpedY) / 2;
                    const cpx = midX + (current.y - midY) * config.gravityGridCurveFactor * 0.1; // Adjust curve factor
                    const cpy = midY + (midX - current.x) * config.gravityGridCurveFactor * 0.1;
                    ctx.quadraticCurveTo(cpx, cpy, right.warpedX, right.warpedY);
                    ctx.stroke();
                }

                // Draw lines to bottom neighbor
                if (j < gridRes) {
                    const bottom = gravityGridPoints[i * (gridRes + 1) + (j + 1)];
                    const opacity = Math.max(0.05, config.gravityLineIntensity * (1 - Math.hypot(current.warpedX - bottom.warpedX, current.warpedY - bottom.warpedY) / (canvas.height / gridRes) * 0.5));
                    ctx.strokeStyle = gravityLineColorBase.replace('OPACITY', opacity.toFixed(3));
                    ctx.beginPath();
                    ctx.moveTo(current.warpedX, current.warpedY);
                    // Apply curve
                    const midX = (current.warpedX + bottom.warpedX) / 2;
                    const midY = (current.warpedY + bottom.warpedY) / 2;
                    const cpx = midX + (bottom.y - midY) * config.gravityGridCurveFactor * 0.1; // Adjust curve factor
                    const cpy = midY + (midX - bottom.x) * config.gravityGridCurveFactor * 0.1;
                    ctx.quadraticCurveTo(cpx, cpy, bottom.warpedX, bottom.warpedY);
                    ctx.stroke();
                }
            }
        }
    }

    // --- Draw Dots and Connections --- --
    dots.forEach((dot, i) => {
        // Draw dot
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.pulsatingRadius || dot.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines to other dots
        for (let j = i + 1; j < dots.length; j++) {
            const otherDot = dots[j];
            const dx = dot.x - otherDot.x;
            const dy = dot.y - otherDot.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.maxLineDistance) {
                // Calculate opacity based on distance AND base intensity
                const opacity = Math.max(0, (1 - dist / config.maxLineDistance) * config.dotConnectionIntensity);
                ctx.strokeStyle = lineColorBase.replace('OPACITY', opacity.toFixed(3)); // Use template

                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);

                // Calculate control point for curve
                const midX = (dot.x + otherDot.x) / 2;
                const midY = (dot.y + otherDot.y) / 2;
                const angle = Math.atan2(dy, dx);
                const curveFactor = dist * config.curveIntensity * 0.2; // Scale curve by distance & intensity
                const cpx = midX + Math.sin(angle) * curveFactor;
                const cpy = midY - Math.cos(angle) * curveFactor;

                ctx.quadraticCurveTo(cpx, cpy, otherDot.x, otherDot.y);
                ctx.stroke();
            }
        }
    });
}

// --- Event Listeners and Controls --- --
function setupMouseInteraction() {
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    canvas.addEventListener('mouseleave', () => {
        mouseX = null;
        mouseY = null;
    });
}

function setupControls() {
    // Make sure controls exist before adding listeners
    if (!document.getElementById('dots')) return; // Exit if controls aren't in the DOM

    // Node/Connection/Physics Controls
    document.getElementById('dots').addEventListener('input', function() { config.numDots = parseInt(this.value); document.getElementById('dots-value').textContent = config.numDots; initDots(); });
    document.getElementById('distance').addEventListener('input', function() { config.maxLineDistance = parseInt(this.value); document.getElementById('distance-value').textContent = config.maxLineDistance; });
    // Listener for NEW Dot Connection Intensity Slider
    document.getElementById('dotLineIntensity').addEventListener('input', function() { config.dotConnectionIntensity = parseFloat(this.value); document.getElementById('dotLineIntensity-value').textContent = config.dotConnectionIntensity.toFixed(2); });
    document.getElementById('speed').addEventListener('input', function() { config.speedFactor = parseFloat(this.value); document.getElementById('speed-value').textContent = config.speedFactor.toFixed(1); });
    document.getElementById('curve').addEventListener('input', function() { config.curveIntensity = parseFloat(this.value); document.getElementById('curve-value').textContent = config.curveIntensity.toFixed(1); });
    document.getElementById('physics').addEventListener('input', function() { /* Physics intensity handled elsewhere, maybe remove slider or rethink */ document.getElementById('physics-value').textContent = this.value; });
    document.getElementById('randomness').addEventListener('input', function() { config.randomnessFactor = parseFloat(this.value); document.getElementById('randomness-value').textContent = config.randomnessFactor.toFixed(3); });
    // Gravity Controls
    document.getElementById('gravity').addEventListener('input', function() { config.nodeGravity = parseFloat(this.value); document.getElementById('gravity-value').textContent = config.nodeGravity.toFixed(3); });
    document.getElementById('gravityRes').addEventListener('input', function() { config.gravityFieldResolution = parseInt(this.value); document.getElementById('gravityRes-value').textContent = config.gravityFieldResolution; calculateGravityGrid(); });
    document.getElementById('gravityWarp').addEventListener('input', function() { config.gravityWarpScale = parseFloat(this.value); document.getElementById('gravityWarp-value').textContent = config.gravityWarpScale; });
    document.getElementById('gridCurve').addEventListener('input', function() { config.gravityGridCurveFactor = parseFloat(this.value); document.getElementById('gridCurve-value').textContent = config.gravityGridCurveFactor; });

    // Toggles
    document.getElementById('toggle-gravity-field').addEventListener('click', function() { config.gravityFieldVisible = !config.gravityFieldVisible; this.classList.toggle('active', config.gravityFieldVisible); this.textContent = config.gravityFieldVisible ? 'Hide Gravity Field' : 'Show Gravity Field'; if(config.gravityFieldVisible && gravityGridPoints.length === 0) calculateGravityGrid(); });
    document.getElementById('toggle-trails').addEventListener('click', function() { config.trailsVisible = !config.trailsVisible; this.classList.toggle('active', config.trailsVisible); this.textContent = config.trailsVisible ? 'Hide Trails' : 'Show Trails'; });

    // Color Schemes
    const schemeElements = document.querySelectorAll('.color-scheme');
    schemeElements.forEach(el => { el.addEventListener('click', function() { schemeElements.forEach(s => s.classList.remove('active')); this.classList.add('active'); config.colorScheme = this.getAttribute('data-scheme'); canvas.style.backgroundColor = colorSchemes[config.colorScheme].background; initDots(); }); });

    // Initialize display values
    document.getElementById('dots-value').textContent = config.numDots;
    document.getElementById('distance-value').textContent = config.maxLineDistance;
    document.getElementById('dotLineIntensity-value').textContent = config.dotConnectionIntensity.toFixed(2); // Init new slider display
    document.getElementById('speed-value').textContent = config.speedFactor.toFixed(1);
    document.getElementById('curve-value').textContent = config.curveIntensity.toFixed(1);
    document.getElementById('physics-value').textContent = "0.5"; // Placeholder or needs connection
    document.getElementById('randomness-value').textContent = config.randomnessFactor.toFixed(3);
    document.getElementById('gravity-value').textContent = config.nodeGravity.toFixed(3);
    document.getElementById('gravityRes-value').textContent = config.gravityFieldResolution;
    document.getElementById('gravityWarp-value').textContent = config.gravityWarpScale;
    document.getElementById('gridCurve-value').textContent = config.gravityGridCurveFactor;

    // Activate default color scheme button
    const defaultSchemeButton = document.querySelector(`.color-scheme[data-scheme="${config.colorScheme}"]`);
    if (defaultSchemeButton) defaultSchemeButton.classList.add('active');

    // Initial call to set background color
    if (colorSchemes[config.colorScheme]) {
      canvas.style.backgroundColor = colorSchemes[config.colorScheme].background;
    }
}

// --- Main Execution --- --
function animate() { updateDots(); drawDots(); requestAnimationFrame(animate); }
function init() {
    // Only proceed if canvas exists
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    resizeCanvas();
    initDots();
    setupControls();
    setupMouseInteraction();
    animate();
}
window.addEventListener('resize', resizeCanvas);
// Delay init slightly to ensure DOM is ready, especially the canvas
document.addEventListener('DOMContentLoaded', init);
