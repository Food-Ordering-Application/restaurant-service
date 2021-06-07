export class Position {
  latitude: number;
  longitude: number;
  static GeometryToPosition(geometry: {
    type: string;
    coordinates: number[];
  }): Position {
    const { type, coordinates = [] } = geometry;
    if (
      type != 'Point' ||
      !Array.isArray(coordinates) ||
      coordinates.length < 2
    )
      return null;

    const latitude = coordinates[1];
    const longitude = coordinates[0];
    return {
      latitude,
      longitude,
    };
  }

  static PositionToGeometry(
    position: Position,
  ): {
    type: 'Point';
    coordinates: number[];
  } {
    const { latitude, longitude } = position;
    return {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
  }
}
