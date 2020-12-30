// Кастомные стили для пина
const styles = [
  {
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#f5f5f5"
      }
    ]
  },
  {
    "elementType":"labels.icon",
    "stylers":[
      {
        "visibility":"off"
      }
    ]
  },
  {
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#616161"
      }
    ]
  },
  {
    "elementType":"labels.text.stroke",
    "stylers":[
      {
        "color":"#f5f5f5"
      }
    ]
  },
  {
    "featureType":"administrative.land_parcel",
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#bdbdbd"
      }
    ]
  },
  {
    "featureType":"poi",
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#eeeeee"
      }
    ]
  },
  {
    "featureType":"poi",
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#757575"
      }
    ]
  },
  {
    "featureType":"poi.park",
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#e5e5e5"
      }
    ]
  },
  {
    "featureType":"poi.park",
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#9e9e9e"
      }
    ]
  },
  {
    "featureType":"road",
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#ffffff"
      }
    ]
  },
  {
    "featureType":"road.arterial",
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#757575"
      }
    ]
  },
  {
    "featureType":"road.highway",
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#dadada"
      }
    ]
  },
  {
    "featureType":"road.highway",
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#616161"
      }
    ]
  },
  {
    "featureType":"road.local",
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#9e9e9e"
      }
    ]
  },
  {
    "featureType":"transit.line",
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#e5e5e5"
      }
    ]
  },
  {
    "featureType":"transit.station",
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#eeeeee"
      }
    ]
  },
  {
    "featureType":"water",
    "elementType":"geometry",
    "stylers":[
      {
        "color":"#c9c9c9"
      }
    ]
  },
  {
    "featureType":"water",
    "elementType":"labels.text.fill",
    "stylers":[
      {
        "color":"#9e9e9e"
      }
    ]
  }
]

const image = '/app/themes/Capitals/resources/assets/img/custom-pin.svg';

export const map = () => {
  // google.maps.event.addDomListener(window, 'load', initMap);

  window.onload = () => {
    initMap()
  }

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
      styles: styles,
    });
    addMarker(myLatLng)

    // Инициализация новых маркеров
    function addMarker(location) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: image
      });
      markers.push(marker);
    }

    // Добавляем маркер на карту
    function setMapOnAll(map) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // Удаляем все маркеры с карты
    function clearMarkers() {
      setMapOnAll(null);
    }

    list.addEventListener(`click`, (e) => {
      const item = e.target;
      if (item.tagName === 'LI') {

        // Инициализация нового центра карты/пина
        const coords = item.getAttribute(`data-coordinates`).split(`,`)

        // Очищаем карту от пинов
        clearMarkers()

        // Добавляем новый маркер активного города и центруем карту
        addMarker({ lat: +coords[0], lng: +coords[1] })
        map.setCenter({ lat: +coords[0], lng: +coords[1] })
      }
    })
  }
}
