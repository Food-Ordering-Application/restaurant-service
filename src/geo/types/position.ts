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

  static validPosition(position: Position): boolean {
    const { latitude, longitude } = position || {};
    if (latitude === undefined || longitude === undefined) {
      return false;
    }
    return Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
  }
}
