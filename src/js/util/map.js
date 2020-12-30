export const map = () => {
  google.maps.event.addDomListener(window, 'load', initMap);
  let markers = [];

  function initMap() {
    // Список городов для переключения
    const list = document.querySelector(`.contacts__list`);
    // Активный элемент при загрузке страницы
    const startCity = list.querySelector(`.tabs__item--active`);
    // получаем дата атрибут этого элемента
    const startCoords = startCity.getAttribute(`data-coordinates`).split(`,`);

    // Начальные координаты для карты
    const myLatLng = { lat: +startCoords[0], lng: +startCoords[1] };

    const map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      zoom: 10,
    });
    addMarker(myLatLng)

    // Инициализация новых маркеров
    function addMarker(location) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      markers.push(marker);
    }

    // Добавляем маркер на карту
    function setMapOnAll(map) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    function clearMarkers() {
      setMapOnAll(null);
    }

    list.addEventListener(`click`, (e) => {
      const item = e.target;
      if (item.tagName === 'LI') {

        const coords = item.getAttribute(`data-coordinates`).split(`,`)

        clearMarkers()

        addMarker({ lat: +coords[0], lng: +coords[1] })
        map.setCenter({ lat: +coords[0], lng: +coords[1] })
      }
    })
  }
}
