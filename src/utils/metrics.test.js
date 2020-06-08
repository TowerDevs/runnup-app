/**
 * 
 * Metrics test module.
 * @module
 */
import { METRICS } from '../constants/Metrics';
import { RouteMetrics } from './metrics';

describe("RouteMetrics tests", () => {
  test("create metrics with a set of fields", async () => {
    // Instantiate metrics
    const metrics: RouteMetrics = new RouteMetrics();

    // They all start at 0
    expect(metrics.distance).toBe(0);
    expect(metrics.pace).toBe(0);
    expect(metrics.calories).toBe(0);
    expect(metrics.duration).toBe(0);
  });

  test("get a list of editable fields", async () => {
    // Instantiate metrics
    const metrics: RouteMetrics = new RouteMetrics();

    // Check the list of editable fields
    const editable = metrics.getEditable();

    expect(editable).toContain(metrics.get(METRICS.PACE));
    expect(editable).toContain(metrics.get(METRICS.DURATION));
    expect(editable).toContain(metrics.get(METRICS.CALORIES));
  });

  test("set field locked", async () => {
    // Instantiate metrics
    const metrics: RouteMetrics = new RouteMetrics();

    metrics.setLocked(METRICS.PACE);

    expect(metrics.get(METRICS.PACE).locked).toBe(true);
  });

  test("test update distance", async () => {
    // Instantiate metrics
    const metrics: RouteMetrics = new RouteMetrics();

    // Update distance metric to 5km
    metrics.update(METRICS.DISTANCE, 5.0);

    // Make sure it was set
    expect(metrics.distance).toBe(5.0);

    // Check that all fields are still not locked
    metrics.getAll().forEach((field) => {
      expect(field.locked).toBe(false);
    });
  });

  test("test update pace", async () => {
    // Instantiate metrics
    const metrics: RouteMetrics = new RouteMetrics();

    // Update distance metric to 5 km
    metrics.update(METRICS.DISTANCE, 5.0);

    // Update pace metric to 6 min 30 sec
    metrics.update(METRICS.PACE, 6 * 60 + 30);
  
    // Check that resulting metrics are as expected
    expect(metrics.duration).toBe(1950);
    expect(metrics.calories).toBe(760);
  });

  test("test loadState", async () => {
    // Instantiate metrics
    const metrics: RouteMetrics = new RouteMetrics();

    // Update distance metric to 5 km
    metrics.update(METRICS.DISTANCE, 5.0);

    // Update pace metric to 6 min 30 sec
    metrics.update(METRICS.PACE, 6 * 60 + 30);
  
    // Check that resulting metrics are as expected
    expect(metrics.duration).toBe(1950);
    expect(metrics.calories).toBe(760);
  });

  test("test toState", async () => {
    // Instantiate metrics
    const metrics: RouteMetrics = new RouteMetrics();

    // Update distance metric to 5 km
    metrics.update(METRICS.DISTANCE, 5.0);

    // Update pace metric to 6 min 30 sec
    metrics.update(METRICS.PACE, 6 * 60 + 30);
  
    // Check that resulting metrics are as expected
    expect(metrics.duration).toBe(1950);
    expect(metrics.calories).toBe(760);
  });
});
