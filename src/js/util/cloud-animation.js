  export const cloudAnimation = (it) => {

    const cloudBox = it.querySelector(`.page-info__cloud-wrapper`);

    const startCloudCoords = {
      x: cloudBox.offsetLeft,
      y: cloudBox.offsetTop
    }

    let shiftCount = {
      x: 0,
      y: 0
    }

    it.addEventListener(`mouseenter`, (e) => {
      let startCoords = {
        x: e.clientX,
        y: e.clientY
      }

      const mouseMoveHandler = (moveEvent) => {
        moveEvent.preventDefault();

        const shift = {
          x: (moveEvent.clientX - startCoords.x),
          y: moveEvent.clientY - startCoords.y
        }

        shiftCount = {
          x: shiftCount.x + shift.x,
          y: shiftCount.y + shift.y
        }

        startCoords = {
          x: moveEvent.clientX,
          y: moveEvent.clientY
        }

        const newCloudCoords = {
          x: cloudBox.offsetLeft - shift.x,
          y: cloudBox.offsetTop - shift.y
        }

        if (Math.abs(shiftCount.x) >= 80) {
          cloudBox.style.left = newCloudCoords.x + 'px';
          shiftCount.x = 0;
        }

        if (Math.abs(shiftCount.y) >= 80) {
          cloudBox.style.top = newCloudCoords.y + 'px';
          shiftCount.y = 0;
        }
      }

      const mouseLeaveHandler = (leaveEvent) => {
        leaveEvent.preventDefault();

        cloudBox.style = "transition:1s;"

        cloudBox.style.left = startCloudCoords.x + 'px';
        cloudBox.style.top = startCloudCoords.y + 'px';

        it.removeEventListener('mousemove', mouseMoveHandler);
        it.removeEventListener('mouseleave', mouseLeaveHandler);

        setTimeout(()=> {cloudBox.style = "transition:0s;"}, 1000)
      }

      it.addEventListener('mousemove', mouseMoveHandler);
      it.addEventListener('mouseleave', mouseLeaveHandler);
    })
  }
