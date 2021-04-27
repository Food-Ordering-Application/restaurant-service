import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  Order,
  OrderItem,
  OrderItemTopping,
  OrderStatus,
  PaymentType,
} from './entities';
import { PType, State, Status } from './enums';
import { ICreateOrderResponse } from './interfacets';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderItemTopping)
    private orderItemToppingRepository: Repository<OrderItemTopping>,
    @InjectRepository(PaymentType)
    private paymentTypeRepository: Repository<PaymentType>,
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async createOrderAndFirstOrderItem(
    createOrderDto: CreateOrderDto,
  ): Promise<ICreateOrderResponse> {
    const {
      orderItem: {
        menuItemId,
        price: orderItemPrice,
        quantity: orderItemQuantity,
        orderItemToppings,
      },
      restaurantId,
      customerId,
    } = createOrderDto;
    try {
      // Tạo và lưu orderItem
      const addOrderItem = new OrderItem();
      addOrderItem.menuItemId = menuItemId;
      addOrderItem.price = orderItemPrice;
      addOrderItem.quantity = orderItemQuantity;

      let totalPriceToppings = 0;
      // Tạo và lưu orderItemTopping
      if (orderItemToppings) {
        const addOrderItemToppings: OrderItemTopping[] = [];
        orderItemToppings.forEach((orderItemTopping) => {
          const addOrderItemTopping = new OrderItemTopping();
          addOrderItemTopping.menuItemToppingId =
            orderItemTopping.menuItemToppingId;
          addOrderItemTopping.price = orderItemTopping.price;
          addOrderItemTopping.quantity = orderItemTopping.quantity;
          addOrderItemTopping.state = State.IN_STOCK;
          this.orderItemToppingRepository.save(addOrderItemTopping);
          addOrderItemToppings.push(addOrderItemTopping);
          totalPriceToppings +=
            orderItemTopping.price * orderItemTopping.quantity;
        });
        addOrderItem.orderItemToppings = addOrderItemToppings;
      }

      this.orderItemRepository.save(addOrderItem);
      const addOrderItems: OrderItem[] = [];
      addOrderItems.push(addOrderItem);

      // Tạo và lưu order
      const order = new Order();
      order.customerId = customerId;
      order.restaurantId = restaurantId;
      // paymentType mặc định là COD, status là DRAFT
      const values = await Promise.all([
        this.paymentTypeRepository.findOne({
          name: PType.COD,
        }),
        this.orderStatusRepository.findOne({
          name: Status.DRAFT,
        }),
      ]);
      order.paymentType = values[0];
      order.status = values[1];
      order.orderItems = addOrderItems;
      order.serviceFee = 2000;
      order.shippingFee = 15000;
      order.subTotal = orderItemPrice * orderItemQuantity + totalPriceToppings;
      order.grandTotal = order.serviceFee + order.shippingFee + order.subTotal;
      await this.orderRepository.save(order);
      return {
        status: HttpStatus.CREATED,
        message: 'Order created successfully',
        order,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        order: null,
      };
    }
  }
}
