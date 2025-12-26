export class OrderDto {
    public readonly id!: string;
    public readonly from!: string;
    public readonly to!: string;
    public readonly merchantName!: string;
    public readonly carrierName!: string;
    public readonly clientName!: string;
    public readonly phoneNumber!: string;
    public readonly status!: string;
    public readonly shipmentDate!: Date;
    public readonly deliveryDate!: Date;
}
