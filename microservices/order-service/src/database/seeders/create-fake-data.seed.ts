import { Order, OrderItem, OrderItemTopping } from '../../order/entities';
import { Factory, Seeder } from 'typeorm-seeding';
import { PType, Status } from '../../order/enums';

export default class CreateFakeData implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const firstOrders = await factory(Order)({
      paymentType: PType.COD,
      orderStatus: Status.DRAFT,
    }).createMany(30);
    const secondOrders = await factory(Order)({
      paymentType: PType.COD,
      orderStatus: Status.WAITING_DRIVER,
    }).createMany(30);
    const thirdOrders = await factory(Order)({
      paymentType: PType.COD,
      orderStatus: Status.CHECKING,
    }).createMany(30);
    const fourthOrders = await factory(Order)({
      paymentType: PType.COD,
      orderStatus: Status.PICKING,
    }).createMany(30);
    const fifthOrders = await factory(Order)({
      paymentType: PType.COD,
      orderStatus: Status.DELIVERING,
    }).createMany(30);
    const sixthOrders = await factory(Order)({
      paymentType: PType.COD,
      orderStatus: Status.CANCELLED,
    }).createMany(30);
    const seventhOrders = await factory(Order)({
      paymentType: PType.PAYPAL,
      orderStatus: Status.DRAFT,
    }).createMany(30);
    const eighthOrders = await factory(Order)({
      paymentType: PType.PAYPAL,
      orderStatus: Status.DRAFT,
    }).createMany(30);
    const ninethOrders = await factory(Order)({
      paymentType: PType.PAYPAL,
      orderStatus: Status.DRAFT,
    }).createMany(30);
    const tenthOrders = await factory(Order)({
      paymentType: PType.PAYPAL,
      orderStatus: Status.DRAFT,
    }).createMany(30);
    const eleventhOrders = await factory(Order)({
      paymentType: PType.PAYPAL,
      orderStatus: Status.DRAFT,
    }).createMany(30);
    const twelvethOrders = await factory(Order)({
      paymentType: PType.PAYPAL,
      orderStatus: Status.DRAFT,
    }).createMany(30);

    const orders = [
      ...firstOrders,
      ...secondOrders,
      ...thirdOrders,
      ...fourthOrders,
      ...fifthOrders,
      ...sixthOrders,
      ...seventhOrders,
      ...eighthOrders,
      ...ninethOrders,
      ...tenthOrders,
      ...eleventhOrders,
      ...twelvethOrders,
    ];

    // Với mỗi Order tạo nhiều OrderItems
    for (const order of orders) {
      const orderItems = await factory(OrderItem)({
        order: order,
      }).createMany(5);

      // Với mỗi OrderItem tạo nhiều OrderItemToppings
      for (const orderItem of orderItems) {
        await factory(OrderItemTopping)({
          orderItem: orderItem,
        }).createMany(Math.floor(Math.random() * 4));
      }
    }
  }
}
