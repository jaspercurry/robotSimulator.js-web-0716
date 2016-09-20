'use strict';

function Robot() {
  var cardinals = ["north", "east", "south", "west"]

  this.orient = function(direction) {
    if (cardinals.includes(direction)) {
      this.bearing = direction
    } else {
      var shade = new Error("Invalid Robot Bearing")
      throw shade
    }
  }

  this.turnRight = function() {
    var currentDirectionIndex = cardinals.findIndex(function(element, index,
      array) {

      return element == this.bearing
    }.bind(this))

    if (currentDirectionIndex !== 3) {
      this.bearing = cardinals[currentDirectionIndex + 1]
    } else {
      this.bearing = cardinals[0]
    }
  }

  this.turnLeft = function() {
    var currentDirectionIndex = cardinals.findIndex(function(element, index,
      array) {

      return element == this.bearing
    }.bind(this))

    if (currentDirectionIndex !== 0) {
      this.bearing = cardinals[currentDirectionIndex - 1]
    } else {
      this.bearing = cardinals[3]
    }
  }

  this.at = function(x, y) {
    this.coordinates = [x, y]
  }

  this.advance = function() {
    if (this.bearing === "north") {
      this.coordinates[1]++
    } else if (this.bearing === "south") {
      this.coordinates[1]--
    } else if (this.bearing === "west") {
      this.coordinates[0]--
    } else if (this.bearing === "east") {
      this.coordinates[0]++
    }
  }


  this.place = function(placement) {
    this.at(placement.x, placement.y)
    this.orient(placement.direction)
  }


  this.instructions = function(directionString) {
    var letterArray = directionString.split("")
    var commandArrray = []
    letterArray.forEach(function(letter, index, array) {
      if (letter === "A") {
        commandArrray.push("advance")
      } else if (letter === "R") {
        commandArrray.push("turnRight")
      } else if (letter === "L") {
        commandArrray.push("turnLeft")
      }
    })
    return commandArrray
  }

  this.evaluate = function(directionString) {

    var commandArrray = this.instructions(directionString)

    commandArrray.forEach(function(ele, index, array) {
      this[ele]()
    }.bind(this))

  }

  // this is the end bracket
}
