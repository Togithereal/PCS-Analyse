const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const addNodeBtn = document.getElementById('addNodeBtn');
const deleteNodeBtn = document.getElementById('deleteNodeBtn');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result');

let nodes = [];
let edges = [];
let selectedNode = null;

// Add a node
addNodeBtn.addEventListener('click', () => {
    const id = nodes.length + 1;
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    nodes.push({ id, x, y, text: `Task ${id}` });
    draw();
});

// Delete a node
deleteNodeBtn.addEventListener('click', () => {
    if (selectedNode) {
        nodes = nodes.filter(node => node !== selectedNode);
        edges = edges.filter(edge => edge.from !== selectedNode && edge.to !== selectedNode);
        selectedNode = null;
        draw();
    }
});

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = selectedNode === node ? '#FFA500' : '#0078D7';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fillStyle = '#FFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.text, node.x, node.y);
    });
}

// Find a node by position
function findNode(x, y) {
    return nodes.find(node => Math.hypot(node.x - x, node.y - y) < 20);
}

// Select and connect nodes
canvas.addEventListener('click', (e) => {
    const { offsetX: x, offsetY: y } = e;
    const node = findNode(x, y);

    if (node) {
        if (selectedNode) {
            if (selectedNode !== node) {
                edges.push({ from: selectedNode, to: node });
                selectedNode = null;
            }
        } else {
            selectedNode = node;
        }
    } else {
        selectedNode = null;
    }

    draw();
});

// Add text to nodes
canvas.addEventListener('dblclick', (e) => {
    const { offsetX: x, offsetY: y } = e;
    const node = findNode(x, y);

    if (node) {
        const newText = prompt('Text für den Kreis eingeben:', node.text);
        if (newText) {
            node.text = newText;
        }
        draw();
    }
});

// Calculate optimal Durchlaufanzahl
calculateBtn.addEventListener('click', () => {
    const stepCount = nodes.length; // Placeholder logic
    result.textContent = `Minimale Durchlaufanzahl: ${stepCount}`;
});
