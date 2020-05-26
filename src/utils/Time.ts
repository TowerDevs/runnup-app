/**
 * Time utils module.
 * 
 * @module
 */

/**
 * Time is a class used for store and converting times.
 * 
 * @property {Number} seconds total seconds in the Time
 * @property {Number} m the time split into minutes
 * @property {Number} s remaining seconds after splitting the time into minutes
 * 
 * @example
 * let time = Time(200)
 * time.seconds // 200
 * time.m // 3
 * time.s // 20
 */
export class Time {
  seconds: number;
  m: number;
  s: number;
  /**
   * Initialize Time.
   * @param {Number} seconds
   */
  constructor(seconds) {
    // Total seconds
    this.seconds = seconds;

    // Time split into minutes and seconds
    this.m = Math.floor(seconds / 60);
    this.s = Math.floor(seconds % 60);
  }

  /**
   * fromMinutes takes a number of minutes and seconds and returns
   * a Time instance.
   * @param {Number} minutes
   * @param {Number} seconds
   *
   * @returns {Time}
   */
  static fromMinutes(minutes, seconds = 0) {
    let totalSeconds = Math.floor(minutes * 60 + seconds);
    return new Time(totalSeconds);
  }

  /**
   * minuteString returns a string formatted as mm:ss.
   * 
   * @returns {string} the formatted minute string
   */
  minuteString() {
    return `${this.m}:${this.s}`;
  }
}