// https://github.com/taye/interact.js/issues/885
import '@interactjs/auto-start/index.prod';
import '@interactjs/inertia/index.prod';
import '@interactjs/modifiers/index.prod';
import '@interactjs/actions/drag/index.prod';
import '@interactjs/dev-tools/index.prod';
import _interact from '@interactjs/interact/index.prod';

/**
 * init interact feature
 */
async function interact() {
  // fast click fix
  _interact('a[href]').on('tap', (e) => {
    window.location.href = e.currentTarget.href;
    e.preventDefault();
  });

  // drag feature
  const pos = { x: 0, y: 0 };

  _interact('.draggable')
    .styleCursor(false)
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        _interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],

      listeners: {
        move(e) {
          pos.x += e.dx;
          pos.y += e.dy;
          e.target.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        },
      },
    });
}

export default interact;
