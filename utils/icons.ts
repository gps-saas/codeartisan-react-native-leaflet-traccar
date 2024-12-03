const bicycle = require("../resources/newIcons/bicycle.png");
const boat = require("../resources/newIcons/boat.png");
const bus = require("../resources/newIcons/bus.png");
const car = require("../resources/newIcons/car.png");
const camper = require("../resources/newIcons/camper.png");
const crane = require("../resources/newIcons/crane.png");
const helicopter = require("../resources/newIcons/helicopter.png");
const motorcycle = require("../resources/newIcons/motorcycle.png");
const offroad = require("../resources/newIcons/offroad.png");
const person = require("../resources/newIcons/person.png");
const pickup = require("../resources/newIcons/pickup.png");
const plane = require("../resources/newIcons/plane.png");
const scooter = require("../resources/newIcons/scooter.png");
const ship = require("../resources/newIcons/ship.png");
const tractor = require("../resources/newIcons/tractor.png");
const train = require("../resources/newIcons/train.png");
const tram = require("../resources/newIcons/tram.png");
const trolleybus = require("../resources/newIcons/trolleybus.png");
const truck = require("../resources/newIcons/truck.png");
const van = require("../resources/newIcons/van.png");
const fallback = require("../resources/newIcons/default.png");
const animal = require("../resources/newIcons/animal.png");

export const getIconForCategory = (category: string): string => {
    const icons: Record<string, string> = {
      bicycle,
      boat,
      bus,
      car,
      camper,
      crane,
      helicopter,
      motorcycle,
      offroad,
      person,
      pickup,
      plane,
      scooter,
      ship,
      tractor,
      train,
      tram,
      trolleybus,
      truck,
      van,
      animal,
    };
  
    return icons[category] || fallback;
  };
